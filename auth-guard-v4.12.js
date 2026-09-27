
(() => {
  "use strict";
  const SUPABASE_URL="https://uccexvgqmoxhgykkjdcy.supabase.co";
  const SUPABASE_KEY="sb_publishable_FBsN1DYTQMv2_bWhpbXHAA_qdAq7ri7";
  const path=(location.pathname.split("/").pop()||"index.html").toLowerCase();

  const ADMIN_PAGES=new Set([
    "admin-assets-v4.12.html",
    "admin-members-v4.12.html",
    "security-center-v4.12.html",
    "security-ops-v4.12.html",
    "event-center-v4.12.html",
    "update-center-v4.12.html"
  ]);
  const MEMBER_PAGES=new Set([
    "member-assets-v4.12.html",
    "asset-center-v4.12.html",
    ...ADMIN_PAGES
  ]);

  function lang(){
    try{return localStorage.getItem("ipt_language")||"zh-TW"}catch(_){return"zh-TW"}
  }
  function t(zh,cn,en){
    const l=lang(); return l==="en"?en:(l==="zh-CN"?cn:zh);
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
    if(hb) hb.onclick=()=>location.href="./index.html?v=4122";
  }

  function hideOverlay(){
    document.getElementById("iptAuthGuardOverlay")?.remove();
  }

  async function run(){
    if(!MEMBER_PAGES.has(path)) return;
    if(!window.supabase?.createClient) return;

    const sb=window.supabase.createClient(SUPABASE_URL,SUPABASE_KEY,{
      auth:{persistSession:true,autoRefreshToken:true,detectSessionInUrl:true}
    });

    // Server-validated identity: do not trust local getSession alone.
    const {data:{user},error:userErr}=await sb.auth.getUser();
    if(userErr || !user){
      showOverlay(
        t("需要重新登入","需要重新登录","Sign-in required"),
        t("這個頁面需要有效的會員登入。系統已重新向伺服器驗證目前身分，但沒有取得有效使用者。","此页面需要有效的会员登录。系统已重新向服务器验证当前身份，但没有取得有效用户。","This page requires a valid member sign-in. Your identity was revalidated with the server, but no valid user was found."),
        t("前往帳戶安全","前往账户安全","Open Account Security"),
        "./auth-security-v4.12.html?v=4122"
      );
      return;
    }

    // Admin pages require MFA when a verified factor exists.
    if(ADMIN_PAGES.has(path)){
      const {data:aal,error:aalErr}=await sb.auth.mfa.getAuthenticatorAssuranceLevel();
      if(aalErr){
        showOverlay(
          t("無法確認二次驗證","无法确认二次验证","Unable to verify MFA"),
          t("目前無法確認管理員二次驗證狀態。為安全起見，此頁暫時鎖定。","目前无法确认管理员二次验证状态。为安全起见，此页暂时锁定。","The administrator MFA status could not be confirmed. This page is locked for safety."),
          t("前往帳戶安全","前往账户安全","Open Account Security"),
          "./auth-security-v4.12.html?v=4122"
        );
        return;
      }

      const {data:factors,error:fErr}=await sb.auth.mfa.listFactors();
      if(fErr){
        showOverlay(
          t("MFA 狀態讀取失敗","MFA 状态读取失败","MFA status unavailable"),
          t("管理員頁面需要先確認 MFA 狀態。","管理员页面需要先确认 MFA 状态。","Administrator pages require MFA status verification."),
          t("前往帳戶安全","前往账户安全","Open Account Security"),
          "./auth-security-v4.12.html?v=4122"
        );
        return;
      }
      const verified=(factors?.totp||[]).filter(x=>x.status==="verified");

      if(!verified.length){
        showOverlay(
          t("管理員尚未設定 MFA","管理员尚未设置 MFA","Administrator MFA not configured"),
          t("V4.12 開始，管理員敏感頁面建議先設定驗證器 App（TOTP）。完成後再進入管理功能。","V4.12 开始，管理员敏感页面建议先设置验证器 App（TOTP）。完成后再进入管理功能。","Starting with V4.12, administrator-sensitive pages should use an authenticator app (TOTP). Configure MFA before continuing."),
          t("立即設定 MFA","立即设置 MFA","Set up MFA"),
          "./auth-security-v4.12.html?v=4122"
        );
        return;
      }

      if(aal?.currentLevel!=="aal2"){
        showOverlay(
          t("需要二次驗證","需要二次验证","Second-factor verification required"),
          t("你的帳號已設定 MFA，但這次登入尚未完成第二因素驗證。完成後才可進入管理員敏感頁面。","你的账号已设置 MFA，但这次登录尚未完成第二因素验证。完成后才可进入管理员敏感页面。","MFA is enrolled, but this sign-in has not completed second-factor verification. Complete MFA before accessing administrator-sensitive pages."),
          t("進行二次驗證","进行二次验证","Verify MFA"),
          "./auth-security-v4.12.html?v=4122"
        );
        return;
      }
    }

    hideOverlay();
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
