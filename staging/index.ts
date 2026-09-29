import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js@2.57.4";

const ORIGIN="https://avg168.github.io";
const CONTRACT="0xd3fb2480aadb8b168ec7e88a0e5c847d9750cb87";
const CHAIN_ID=11155111;
const MIN_CONFIRMATIONS=2;
const MINT_SELECTOR="0x40c10f19";
const TRANSFER_TOPIC0="0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef";
const ZERO_TOPIC="0x"+"0".repeat(64);
const RPCS=[
  "https://ethereum-sepolia-rpc.publicnode.com",
  "https://ethereum-sepolia.publicnode.com",
  "https://rpc.sepolia.org",
];

const H={
  "Access-Control-Allow-Origin":ORIGIN,
  "Access-Control-Allow-Headers":"authorization, apikey, content-type, x-client-info",
  "Access-Control-Allow-Methods":"POST, OPTIONS",
  "Content-Type":"application/json",
  "Cache-Control":"no-store",
};
const json=(body:unknown,status=200)=>new Response(JSON.stringify(body),{status,headers:H});
function env(name:string){const v=Deno.env.get(name);if(!v)throw new Error("Missing environment variable: "+name);return v;}
function same(a:string,b:string){return String(a||"").toLowerCase()===String(b||"").toLowerCase();}
function isTxHash(v:string){return /^0x[0-9a-fA-F]{64}$/.test(v);}

async function rpc(url:string,method:string,params:unknown[],timeoutMs=8000){
  const ctrl=new AbortController();
  const timer=setTimeout(()=>ctrl.abort(),timeoutMs);
  try{
    const res=await fetch(url,{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({jsonrpc:"2.0",id:1,method,params}),signal:ctrl.signal});
    if(!res.ok)throw new Error("RPC HTTP "+res.status);
    const body=await res.json();
    if(body?.error)throw new Error(body.error.message||"RPC error");
    return body?.result;
  }finally{clearTimeout(timer);}
}

async function rpcAny(method:string,params:unknown[]){
  let last:unknown=null;
  for(const url of RPCS){
    try{return {result:await rpc(url,method,params),url};}catch(e){last=e;}
  }
  throw last instanceof Error?last:new Error("All Sepolia RPCs failed");
}

function decodeMintInput(input:string){
  const hex=String(input||"").toLowerCase();
  if(!hex.startsWith(MINT_SELECTOR))throw new Error("Transaction is not mint(address,uint256)");
  if(hex.length<138)throw new Error("Mint calldata is incomplete");
  const addressWord=hex.slice(10,74);
  const amountWord=hex.slice(74,138);
  return {recipient:"0x"+addressWord.slice(24),amount:BigInt("0x"+amountWord)};
}
function topicForAddress(address:string){return "0x"+"0".repeat(24)+address.toLowerCase().replace(/^0x/,"");}

Deno.serve(async(req)=>{
  if(req.method==="OPTIONS")return new Response("ok",{headers:H});
  if(req.method!=="POST")return json({error:"Method not allowed"},405);
  try{
    const authHeader=req.headers.get("Authorization")||"";
    if(!authHeader.startsWith("Bearer "))return json({error:"Missing auth"},401);
    const body=await req.json().catch(()=>({}));
    const withdrawalId=String(body?.withdrawal_id||"");
    if(!/^[0-9a-fA-F-]{36}$/.test(withdrawalId))return json({error:"Invalid withdrawal id"},400);

    const url=env("SUPABASE_URL");
    const anon=env("SUPABASE_ANON_KEY");
    const service=env("SUPABASE_SERVICE_ROLE_KEY");
    const userClient=createClient(url,anon,{global:{headers:{Authorization:authHeader}},auth:{persistSession:false,autoRefreshToken:false}});

    const {data:ctx,error:ctxErr}=await userClient.rpc("platform_admin_withdrawal_context");
    if(ctxErr)return json({error:ctxErr.message,code:"ADMIN_CONTEXT_DENIED"},403);
    if(!ctx?.ok)return json({error:"Admin context denied"},403);

    const admin=createClient(url,service,{auth:{persistSession:false,autoRefreshToken:false}});
    const {data:w,error:wErr}=await admin.from("platform_ipt_withdrawals").select("id,user_id,wallet_address,chain_id,ipt_units,status,tx_hash").eq("id",withdrawalId).maybeSingle();
    if(wErr)throw wErr;
    if(!w)return json({error:"Withdrawal request not found"},404);
    if(w.chain_id!==CHAIN_ID)return json({error:"Unexpected chain id"},409);
    if(w.status==="completed")return json({ok:true,status:"completed",idempotent_replay:true,tx_hash:w.tx_hash});
    if(w.status!=="tx_submitted")return json({error:"Withdrawal is not tx_submitted"},409);

    const txHash=String(w.tx_hash||"").toLowerCase();
    if(!isTxHash(txHash))return json({error:"Withdrawal has no valid tx hash"},409);

    const [{result:tx,url:rpcTx},{result:receipt},{result:latestHex}]=await Promise.all([
      rpcAny("eth_getTransactionByHash",[txHash]),
      rpcAny("eth_getTransactionReceipt",[txHash]),
      rpcAny("eth_blockNumber",[]),
    ]);

    if(!tx||!receipt)return json({ok:false,status:"waiting_for_receipt",tx_hash:txHash},202);
    if(!same(tx.to,CONTRACT))return json({error:"Transaction target is not the IPT contract"},409);

    const decoded=decodeMintInput(tx.input||tx.data||"0x");
    if(!same(decoded.recipient,w.wallet_address))return json({error:"Mint recipient does not match withdrawal wallet"},409);
    if(decoded.amount!==BigInt(w.ipt_units))return json({error:"Mint amount does not match withdrawal amount"},409);

    if(String(receipt.status).toLowerCase()==="0x0"){
      const proof={rpc:rpcTx,receipt_status:"0x0",tx_hash:txHash};
      const {data:failed,error:failedErr}=await admin.rpc("platform_fail_ipt_withdrawal",{p_withdrawal_id:w.id,p_tx_hash:txHash,p_reason:"Sepolia transaction receipt status = 0",p_proof:proof});
      if(failedErr)throw failedErr;
      return json({ok:false,status:"failed",result:failed},409);
    }
    if(String(receipt.status).toLowerCase()!=="0x1")return json({ok:false,status:"waiting_for_receipt_status",tx_hash:txHash},202);

    const blockNumber=Number(BigInt(receipt.blockNumber));
    const latestBlock=Number(BigInt(latestHex));
    const confirmations=Math.max(0,latestBlock-blockNumber+1);
    const expectedTopic2=topicForAddress(w.wallet_address);
    const expectedAmount=BigInt(w.ipt_units);

    const mintLog=(receipt.logs||[]).find((log:any)=>{
      if(!same(log?.address,CONTRACT))return false;
      const topics=(log?.topics||[]).map((x:any)=>String(x).toLowerCase());
      if(topics.length<3||topics[0]!==TRANSFER_TOPIC0||topics[1]!==ZERO_TOPIC||topics[2]!==expectedTopic2)return false;
      try{return BigInt(log?.data||"0x0")===expectedAmount;}catch(_){return false;}
    });
    if(!mintLog)return json({error:"Expected ERC20 mint Transfer event was not found"},409);

    if(confirmations<MIN_CONFIRMATIONS){
      return json({ok:false,status:"confirming",tx_hash:txHash,block_number:blockNumber,confirmations,min_confirmations:MIN_CONFIRMATIONS},202);
    }

    const proof={rpc:rpcTx,contract:CONTRACT,chain_id:CHAIN_ID,tx_hash:txHash,tx_from:String(tx.from||""),tx_to:String(tx.to||""),recipient:w.wallet_address,ipt_units:Number(w.ipt_units),receipt_status:"0x1",block_number:blockNumber,confirmations,transfer_log_index:mintLog.logIndex??null};
    const {data:completed,error:completeErr}=await admin.rpc("platform_complete_ipt_withdrawal",{p_withdrawal_id:w.id,p_tx_hash:txHash,p_block_number:blockNumber,p_proof:proof});
    if(completeErr)throw completeErr;

    return json({ok:true,status:"completed",version:"V4.14.1",tx_hash:txHash,block_number:blockNumber,confirmations,result:completed});
  }catch(e){
    console.error(e);
    return json({error:e instanceof Error?e.message:String(e)},500);
  }
});
