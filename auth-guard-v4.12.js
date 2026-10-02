
/* V4.14.2 HF22 Auth Guard consistency + Admin MFA hardening */
(() => {
  "use strict";
  const SUPABASE_URL="https://uccexvgqmoxhgykkjdcy.supabase.co";
  const SUPABASE_KEY="sb_publishable_FBsN1DYTQMv2_bWhpbXHAA_qdAq7ri7";
  const path=(location.pathname.split("/").pop()||"index.html").toLowerCase();
  const route=(new URLSearchParams(location.search).get("go")||"").toLowerCase();
  const WALLET_ADMIN_ROUTES=new Set(["mint","pause","ownership","advanced"]);

  const ADMIN_PAGES=new Set([
    "admin-assets-v4.12.html",
    "admin-members-v4.12.html",
    "security-center-v4.12.html",
    "security-ops-v4.12.html",
    "event-center-v4.12.html",
    "update-center-v4.12.html",
    "withdrawal-admin-v4.14.2.html"
  ]);
  const MEMBER_PAGES=new Set([
    "wallet-core-v4.12.html",
    "member-assets-v4.12.html",
    "asset-center-v4.12.html",
    "wallet-dual-v4.14.2.html",
    "withdrawal-v4.14.2.html",
    ...ADMIN_PAGES
  ]);

  function lang(){
    try{return localStorage.getItem("ipt_language")||"zh-TW"}catch(_){return"zh-TW"}
  }
  function t(zh,cn,en){
    const l=lang(); return l==="en"?en:(l==="zh-CN"?cn:zh);
  }


  function deviceToken(){
    const key="ipt_trusted_device_token_v1";
    try{
      let token=localStorage.getItem(key)||"";
      if(/^[A-Za-z0-9_-]{32,256}$/.test(token)) return token;
      const b=new Uint8Array(32);
      crypto.getRandomValues(b);
      let raw="";
      b.forEach(x=>raw+=String.fromCharCode(x));
      token=btoa(raw).replace(/\+/g,"-").replace(/\//g,"_").replace(/=+$/,"");
      localStorage.setItem(key,token);
      return token;
    }catch(_){
      return "";
    }
  }

  function deviceName(){
    const ua=navigator.userAgent||"";
    if(/Android/i.test(ua)) return "Android 手機";
    if(/iPhone|iPad/i.test(ua)) return "iPhone / iPad";
    if(/Windows/i.test(ua)) return "Windows 裝置";
    if(/Macintosh|Mac OS X/i.test(ua)) return "Mac 裝置";
    return "目前裝置";
  }

  function addStyles(){
    if(document.getElementById("iptAuthGuardStyle")) return;
    const s=document.createElement("style");
    s.id="iptAuthGuardStyle";
    s.textContent=`
      #iptAuthGuardOverlay{position:fixed;inset:0;z-index:2147483646;background:rgba(12,28,48,.94);display:flex;align-items:center;justify-content:center;padding:20px}
      #iptAuthGuardCard{width:min(440px,100%);background:#fff;border-radius:20px;padding:20px;box-shadow:0 18px 60px rgba(0,0,0,.3);font-family:system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI","Noto Sans TC",sans-serif}
      #iptAuthGuardCard h2{margin:0 0 10px;color:#17365d;font-size:1.25rem}
      #iptAuthGuardCard p{margin:0 0 14px;color:#58677a;line-height:1.65}
      #iptAuthGuardCard .row{display:grid;grid-template-columns:1fr;gap:10px}
      #iptAuthGuardCard button{min-height:48px;border-radius:12px;border:1px solid #cbd5e1;padding:10px 12px;font:inherit;font-weight:850}
      #iptAuthGuardCard .primary{background:#176c59;color:#fff;border-color:#176c59}
      #iptAuthGuardCard .light{background:#fff;color:#29445f}
    `;
    document.head.appendChild(s);
  }

  function showOverlay(title,msg,primaryText,primaryHref,allowHome=true){
    addStyles();
    let o=document.getElementById("iptAuthGuardOverlay");
    if(!o){
      o=document.createElement("div");
      o.id="iptAuthGuardOverlay";
      document.body.appendChild(o);
    }
    o.innerHTML=`
      <div id="iptAuthGuardCard">
        <h2>${title}</h2>
        <p>${msg}</p>
        <div class="row">
          <button class="primary" id="iptGuardPrimary">${primaryText}</button>
          ${allowHome?`<button class="light" id="iptGuardHome">${t("返回首頁","返回首页","Back to Home")}</button>`:""}
        </div>
      </div>`;
    document.getElementById("iptGuardPrimary").onclick=()=>location.href=primaryHref;
    const hb=document.getElementById("iptGuardHome");
    if(hb) hb.onclick=()=>location.href="./index.html?v=4142hf22";
  }

  function hideOverlay(){
    document.getElementById("iptAuthGuardOverlay")?.remove();
  }

  async function run(){
    if(!MEMBER_PAGES.has(path)) return;

    if(path==="wallet-core-v4.12.html"){
      document.documentElement.classList.add("ipt-auth-pending");
    }

    if(!window.supabase?.createClient){
      showOverlay(
        t("無法驗證會員登入","无法验证会员登录","Unable to verify sign-in"),
        t("登入驗證元件未能載入。為安全起見，錢包功能保持鎖定。請返回帳戶安全重新登入。","登录验证组件未能加载。为安全起见，钱包功能保持锁定。请返回账户安全重新登录。","The sign-in verification component could not load. Wallet features remain locked for safety. Return to Account Security and sign in again."),
        t("前往帳戶安全","前往账户安全","Open Account Security"),
        "./auth-security-v4.14.2.html?v=4142hf22"
      );
      return;
    }

    const sb=window.supabase.createClient(SUPABASE_URL,SUPABASE_KEY,{
      auth:{persistSession:true,autoRefreshToken:true,detectSessionInUrl:true}
    });

    if(path==="wallet-core-v4.12.html"){
      showOverlay(
        t("正在驗證會員登入","正在验证会员登录","Checking member sign-in"),
        t("錢包功能需要有效的會員登入，正在向伺服器重新確認身分。","钱包功能需要有效的会员登录，正在向服务器重新确认身份。","Wallet features require a valid member sign-in. Your identity is being revalidated with the server."),
        t("驗證中…","验证中…","Checking…"),
        "./auth-security-v4.14.2.html?v=4142hf22",
        false
      );
      const checkingBtn=document.getElementById("iptGuardPrimary");
      if(checkingBtn) checkingBtn.disabled=true;
    }

    // Server-validated identity: do not trust local getSession alone.
    const {data:{user},error:userErr}=await sb.auth.getUser();
    if(userErr || !user){
      showOverlay(
        t("需要重新登入","需要重新登录","Sign-in required"),
        t("這個頁面需要有效的會員登入。系統已重新向伺服器驗證目前身分，但沒有取得有效使用者。","此页面需要有效的会员登录。系统已重新向服务器验证当前身份，但没有取得有效用户。","This page requires a valid member sign-in. Your identity was revalidated with the server, but no valid user was found."),
        t("前往帳戶安全","前往账户安全","Open Account Security"),
        "./auth-security-v4.14.2.html?v=4142hf22"
      );
      return;
    }


    // Trusted-device verification. Protection is optional; when enabled,
    // a new session is allowed only after this browser/device has been trusted.
    try{
      const token=deviceToken();
      const {data,error}=await sb.functions.invoke("device-security",{
        body:{
          action:"status",
          device_token:token,
          device_name:deviceName(),
          user_agent:navigator.userAgent||""
        }
      });
      if(error) throw error;

      if(data?.allowed!==true){
        if(path==="wallet-core-v4.12.html"){
          document.documentElement.classList.add("ipt-auth-pending");
        }
        showOverlay(
          t("新裝置需要驗證","新设备需要验证","New device verification required"),
          t("這個帳號已啟用受信任裝置保護。請先到帳戶安全完成 MFA，再將這支裝置加入受信任裝置。","这个账号已启用受信任设备保护。请先到账户安全完成 MFA，再将这台设备加入受信任设备。","Trusted-device protection is enabled. Complete MFA in Account Security, then trust this device before continuing."),
          t("前往帳戶安全","前往账户安全","Open Account Security"),
          "./auth-security-v4.14.2.html?v=4142hf22#trustedDeviceSection"
        );
        return;
      }
    }catch(deviceError){
      try{
        const {data:allowed,error:allowErr}=await sb.rpc("ipt_device_access_allowed");
        if(allowErr) throw allowErr;
        if(allowed!==true) throw deviceError;
      }catch(_){
        if(path==="wallet-core-v4.12.html"){
          document.documentElement.classList.add("ipt-auth-pending");
        }
        showOverlay(
          t("無法確認受信任裝置","无法确认受信任设备","Unable to verify trusted device"),
          t("目前無法安全確認這個裝置的登入權限。為安全起見，此頁暫時鎖定。","目前无法安全确认这个设备的登录权限。为安全起见，此页暂时锁定。","This device could not be verified safely. This page remains locked."),
          t("前往帳戶安全","前往账户安全","Open Account Security"),
          "./auth-security-v4.14.2.html?v=4142hf22#trustedDeviceSection"
        );
        return;
      }
    }

    // Administrator-sensitive pages and wallet admin routes always require verified MFA + AAL2.
    const requiresAdminMfa =
      ADMIN_PAGES.has(path) ||
      (path==="wallet-core-v4.12.html" && WALLET_ADMIN_ROUTES.has(route));

    if(requiresAdminMfa){
      const {data:aal,error:aalErr}=await sb.auth.mfa.getAuthenticatorAssuranceLevel();
      if(aalErr){
        showOverlay(
          t("無法確認二次驗證","无法确认二次验证","Unable to verify MFA"),
          t("目前無法確認管理員二次驗證狀態。為安全起見，此頁暫時鎖定。","目前无法确认管理员二次验证状态。为安全起见，此页暂时锁定。","The administrator MFA status could not be confirmed. This page is locked for safety."),
          t("前往帳戶安全","前往账户安全","Open Account Security"),
          "./auth-security-v4.14.2.html?v=4142hf22"
        );
        return;
      }

      const {data:factors,error:fErr}=await sb.auth.mfa.listFactors();
      if(fErr){
        showOverlay(
          t("MFA 狀態讀取失敗","MFA 状态读取失败","MFA status unavailable"),
          t("管理員頁面需要先確認 MFA 狀態。","管理员页面需要先确认 MFA 状态。","Administrator pages require MFA status verification."),
          t("前往帳戶安全","前往账户安全","Open Account Security"),
          "./auth-security-v4.14.2.html?v=4142hf22"
        );
        return;
      }
      const verified=(factors?.totp||[]).filter(x=>x.status==="verified");

      if(!verified.length){
        showOverlay(
          t("管理員尚未設定 MFA","管理员尚未设置 MFA","Administrator MFA not configured"),
          t("管理員敏感功能必須先設定驗證器 App（TOTP）。完成 MFA 後才能繼續。","管理员敏感功能必须先设置验证器 App（TOTP）。完成 MFA 后才能继续。","Administrator-sensitive features require an authenticator app (TOTP). Complete MFA before continuing."),
          t("立即設定 MFA","立即设置 MFA","Set up MFA"),
          "./auth-security-v4.14.2.html?v=4142hf22"
        );
        return;
      }

      if(aal?.currentLevel!=="aal2"){
        showOverlay(
          t("需要二次驗證","需要二次验证","Second-factor verification required"),
          t("你的帳號已設定 MFA，但這次登入尚未完成第二因素驗證。完成後才可進入管理員敏感頁面。","你的账号已设置 MFA，但这次登录尚未完成第二因素验证。完成后才可进入管理员敏感页面。","MFA is enrolled, but this sign-in has not completed second-factor verification. Complete MFA before accessing administrator-sensitive pages."),
          t("進行二次驗證","进行二次验证","Verify MFA"),
          "./auth-security-v4.14.2.html?v=4142hf22"
        );
        return;
      }
    }

    if(path==="wallet-core-v4.12.html"){
      document.documentElement.classList.remove("ipt-auth-pending");
    }
    hideOverlay();

    if(!window.__iptV412AuthGuardSubscribed){
      window.__iptV412AuthGuardSubscribed=true;
      sb.auth.onAuthStateChange((event)=>{
        if(event==="SIGNED_OUT"){
          if(path==="wallet-core-v4.12.html"){
            document.documentElement.classList.add("ipt-auth-pending");
          }
          run().catch(console.error);
        }
      });
    }

    try{
      sessionStorage.setItem("ipt_v412_last_server_validation",new Date().toISOString());
      sessionStorage.setItem("ipt_v412_user_id",user.id);
    }catch(_){}
  }

  if(document.readyState==="loading"){
    document.addEventListener("DOMContentLoaded",()=>run().catch(console.error),{once:true});
  }else{
    run().catch(console.error);
  }
})();
