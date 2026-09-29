import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js@2.57.4";
import { JsonRpcProvider, Interface, getAddress, zeroPadValue } from "npm:ethers@6.15.0";

const ORIGIN="https://avg168.github.io";
const CONTRACT="0xd3fb2480aadb8b168ec7e88a0e5c847d9750cb87";
const CHAIN_ID=11155111;
const MIN_CONFIRMATIONS=2;
const RPC="https://ethereum-sepolia-rpc.publicnode.com";
const iface=new Interface([
  "function mint(address to,uint256 units)",
  "event Transfer(address indexed from,address indexed to,uint256 value)"
]);

const H={
  "Access-Control-Allow-Origin":ORIGIN,
  "Access-Control-Allow-Headers":"authorization, apikey, content-type, x-client-info",
  "Access-Control-Allow-Methods":"POST, OPTIONS",
  "Content-Type":"application/json",
  "Cache-Control":"no-store"
};
const json=(body:unknown,status=200)=>new Response(JSON.stringify(body),{status,headers:H});
const env=(name:string)=>{const v=Deno.env.get(name);if(!v)throw new Error("Missing "+name);return v;};
const same=(a:string,b:string)=>String(a||"").toLowerCase()===String(b||"").toLowerCase();

Deno.serve(async(req)=>{
  if(req.method==="OPTIONS") return new Response("ok",{headers:H});
  if(req.method!=="POST") return json({error:"Method not allowed"},405);

  try{
    const auth=req.headers.get("Authorization")||"";
    if(!auth.startsWith("Bearer ")) return json({error:"Missing auth"},401);

    const body=await req.json().catch(()=>({}));
    const id=String(body?.withdrawal_id||"");
    if(!/^[0-9a-fA-F-]{36}$/.test(id)) return json({error:"Invalid withdrawal id"},400);

    const url=env("SUPABASE_URL");
    const anon=env("SUPABASE_ANON_KEY");
    const service=env("SUPABASE_SERVICE_ROLE_KEY");

    const userClient=createClient(url,anon,{
      global:{headers:{Authorization:auth}},
      auth:{persistSession:false,autoRefreshToken:false}
    });
    const {data:ctx,error:ctxErr}=await userClient.rpc("platform_admin_withdrawal_context");
    if(ctxErr||!ctx?.ok) return json({error:ctxErr?.message||"Admin context denied"},403);

    const admin=createClient(url,service,{auth:{persistSession:false,autoRefreshToken:false}});
    const {data:w,error:wErr}=await admin
      .from("platform_ipt_withdrawals")
      .select("id,wallet_address,chain_id,ipt_units,status,tx_hash")
      .eq("id",id)
      .maybeSingle();

    if(wErr) throw wErr;
    if(!w) return json({error:"Withdrawal not found"},404);
    if(w.chain_id!==CHAIN_ID) return json({error:"Unexpected chain"},409);
    if(w.status==="completed") return json({ok:true,status:"completed",idempotent_replay:true,tx_hash:w.tx_hash});
    if(w.status!=="tx_submitted") return json({error:"Withdrawal is not tx_submitted"},409);

    const provider=new JsonRpcProvider(RPC,CHAIN_ID);
    const [tx,receipt,latest]=await Promise.all([
      provider.getTransaction(String(w.tx_hash)),
      provider.getTransactionReceipt(String(w.tx_hash)),
      provider.getBlockNumber()
    ]);

    if(!tx||!receipt) return json({ok:false,status:"waiting_for_receipt"},202);
    if(!same(tx.to,CONTRACT)) return json({error:"Wrong contract target"},409);

    const parsed=iface.parseTransaction({data:tx.data,value:tx.value});
    if(!parsed||parsed.name!=="mint") return json({error:"Transaction is not mint"},409);

    const recipient=getAddress(String(parsed.args[0]));
    const amount=BigInt(parsed.args[1]);
    if(!same(recipient,w.wallet_address)) return json({error:"Mint recipient mismatch"},409);
    if(amount!==BigInt(w.ipt_units)) return json({error:"Mint amount mismatch"},409);

    if(receipt.status===0){
      const {data:failed,error:failedErr}=await admin.rpc("platform_fail_ipt_withdrawal",{
        p_withdrawal_id:w.id,
        p_tx_hash:String(w.tx_hash),
        p_reason:"Sepolia receipt status = 0",
        p_proof:{receipt_status:0}
      });
      if(failedErr) throw failedErr;
      return json({ok:false,status:"failed",result:failed},409);
    }
    if(receipt.status!==1) return json({ok:false,status:"waiting_for_receipt_status"},202);

    const recipientTopic=zeroPadValue(recipient,32).toLowerCase();
    let mintEvent=false;

    for(const log of receipt.logs){
      try{
        const parsedLog=iface.parseLog({topics:[...log.topics],data:log.data});
        if(parsedLog?.name==="Transfer"){
          const from=String(parsedLog.args[0]);
          const to=String(parsedLog.args[1]);
          const value=BigInt(parsedLog.args[2]);
          if(same(from,"0x0000000000000000000000000000000000000000") &&
             same(to,recipient) &&
             value===amount &&
             same(log.address,CONTRACT)){
            mintEvent=true;
            break;
          }
        }
      }catch(_){}
    }
    if(!mintEvent) return json({error:"Expected mint Transfer event not found"},409);

    const blockNumber=receipt.blockNumber;
    const confirmations=Math.max(0,latest-blockNumber+1);
    if(confirmations<MIN_CONFIRMATIONS){
      return json({
        ok:false,status:"confirming",block_number:blockNumber,
        confirmations,min_confirmations:MIN_CONFIRMATIONS
      },202);
    }

    const proof={
      contract:CONTRACT,
      chain_id:CHAIN_ID,
      tx_hash:String(w.tx_hash),
      tx_from:tx.from,
      tx_to:tx.to,
      recipient,
      ipt_units:Number(w.ipt_units),
      receipt_status:1,
      block_number:blockNumber,
      confirmations
    };

    const {data:completed,error:completeErr}=await admin.rpc("platform_complete_ipt_withdrawal",{
      p_withdrawal_id:w.id,
      p_tx_hash:String(w.tx_hash),
      p_block_number:blockNumber,
      p_proof:proof
    });
    if(completeErr) throw completeErr;

    return json({
      ok:true,status:"completed",version:"V4.14.1",
      tx_hash:String(w.tx_hash),block_number:blockNumber,confirmations,
      result:completed
    });
  }catch(e){
    console.error(e);
    return json({error:e instanceof Error?e.message:String(e)},500);
  }
});
