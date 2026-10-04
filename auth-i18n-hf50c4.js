// HF50-C4: Display-only translations for sign-in and account security.
(() => {
  "use strict";
  const entries=[
  [
    "確定要登出此裝置嗎？",
    "确定要登出此设备吗？",
    "Sign out on this device?"
  ],
  [
    "返回平台 IPT 付款",
    "返回平台 IPT 付款",
    "Return to Platform IPT Payment"
  ],
  [
    "正在確認登入、MFA 與受信任裝置…",
    "正在确认登录、MFA 与可信设备…",
    "Checking sign-in, MFA, and trusted device…"
  ],
  [
    "返回付款頁",
    "返回付款页",
    "Back to Payment"
  ],
  [
    "完成受信任裝置驗證",
    "完成可信设备验证",
    "Complete Trusted Device Verification"
  ],
  [
    "登入身分重新驗證逾時，請按「重新驗證登入身分」再試一次。",
    "登录身份重新验证超时，请点击“重新验证登录身份”重试。",
    "Sign-in identity verification timed out. Tap Recheck Sign-in Identity to try again."
  ],
  [
    "尚未完成 MFA 狀態讀取。",
    "尚未完成 MFA 状态读取。",
    "MFA status has not finished loading."
  ],
  [
    "請先完成會員登入。登入成功後會繼續檢查 MFA 與受信任裝置。",
    "请先完成会员登录。登录成功后会继续检查 MFA 与可信设备。",
    "Sign in as a member first. MFA and trusted device checks will continue after sign-in."
  ],
  [
    "目前無法確認 MFA 狀態，請稍後重新驗證。",
    "当前无法确认 MFA 状态，请稍后重新验证。",
    "MFA status cannot be checked right now. Please verify again later."
  ],
  [
    "此帳號已設定 MFA。請先完成本次登入的第二因素驗證。",
    "此账号已设置 MFA。请先完成本次登录的第二因素验证。",
    "MFA is configured for this account. Complete second-factor verification for this sign-in first."
  ],
  [
    "登入已完成，但這個裝置的 90 天信任期限已到期。請到受信任裝置重新信任。",
    "登录已完成，但此设备的 90 天信任期限已到期。请到可信设备重新授权。",
    "Signed in, but this device’s 90-day trust period has expired. Renew its trust in Trusted Devices."
  ],
  [
    "登入已完成，但這個瀏覽器尚未通過受信任裝置驗證。",
    "登录已完成，但此浏览器尚未通过可信设备验证。",
    "Signed in, but this browser has not passed trusted device verification."
  ],
  [
    "登入、安全驗證都已完成，即將返回原本的付款頁。",
    "登录和安全验证均已完成，即将返回原付款页。",
    "Sign-in and security verification are complete. Returning to the original payment page."
  ],
  [
    "MFA 狀態讀取失敗。",
    "MFA 状态读取失败。",
    "Failed to load MFA status."
  ],
  [
    "目前尚未恢復登入工作階段，請先在上方「會員登入」輸入密碼。登入成功後會自動顯示 MFA 驗證。",
    "当前尚未恢复登录会话，请先在上方“会员登录”输入密码。登录成功后会自动显示 MFA 验证。",
    "Your sign-in session has not been restored. Enter your password under Member Sign In above. MFA verification will appear after sign-in."
  ],
  [
    "完成會員登入後，系統會讀取 MFA 狀態並顯示 6 位數驗證欄位。",
    "完成会员登录后，系统会读取 MFA 状态并显示 6 位数验证码字段。",
    "After member sign-in, the system will load MFA status and display the 6-digit verification code field."
  ],
  [
    "已恢復登入工作階段，正在向伺服器重新驗證…",
    "已恢复登录会话，正在向服务器重新验证…",
    "Sign-in session restored. Verifying again with the server…"
  ],
  [
    "找不到有效會員身分",
    "找不到有效会员身份",
    "No valid member identity was found"
  ],
  [
    "登入工作階段仍保留，但伺服器重新驗證暫時失敗。請按「重新驗證登入身分」再試一次。",
    "登录会话仍保留，但服务器重新验证暂时失败。请点击“重新验证登录身份”重试。",
    "Your sign-in session is retained, but server verification failed temporarily. Tap Recheck Sign-in Identity to try again."
  ],
  [
    "等待登入身分重新驗證後再讀取 MFA 狀態。",
    "等待登录身份重新验证后再读取 MFA 状态。",
    "Waiting for sign-in identity verification before loading MFA status."
  ],
  [
    "MFA 狀態讀取逾時，請按「重新驗證登入身分」再試一次。",
    "MFA 状态读取超时，请点击“重新验证登录身份”重试。",
    "MFA status loading timed out. Tap Recheck Sign-in Identity to try again."
  ],
  [
    "Supabase JS 載入逾時",
    "Supabase JS 加载超时",
    "Supabase JS loading timed out"
  ],
  [
    "Supabase JS 已下載但未建立 createClient",
    "Supabase JS 已下载但未建立 createClient",
    "Supabase JS downloaded, but createClient is unavailable"
  ],
  [
    "Supabase JS 初始化失敗",
    "Supabase JS 初始化失败",
    "Supabase JS initialization failed"
  ],
  [
    "Supabase JS 載入失敗",
    "Supabase JS 加载失败",
    "Supabase JS failed to load"
  ],
  [
    "Supabase JS 無法載入",
    "Supabase JS 无法加载",
    "Supabase JS could not be loaded"
  ],
  [
    "未取得會員身分",
    "未取得会员身份",
    "No user returned"
  ],
  [
    "需要完成 AAL2 驗證",
    "需要完成 AAL2 验证",
    "AAL2 required"
  ],
  [
    "沒有可用的已驗證 MFA 驗證器",
    "没有可用的已验证 MFA 验证器",
    "No verified MFA factor available"
  ],
  [
    "登入資訊不正確",
    "登录凭据不正确",
    "Invalid login credentials"
  ],
  [
    "輸入的 TOTP 驗證碼不正確",
    "输入的 TOTP 验证码不正确",
    "Invalid TOTP code entered"
  ]
];
  const prefixes=[
  [
    "重新驗證失敗：",
    "重新验证失败：",
    "Verification failed: "
  ],
  [
    "目前無法確認受信任裝置狀態：",
    "当前无法确认可信设备状态：",
    "Unable to check trusted device status: "
  ],
  [
    "啟動失敗：",
    "启动失败：",
    "Startup failed: "
  ],
  [
    "登入失敗：",
    "登录失败：",
    "Sign-in failed: "
  ],
  [
    "密碼變更失敗：",
    "密码变更失败：",
    "Password change failed: "
  ],
  [
    "目前密碼驗證失敗：",
    "当前密码验证失败：",
    "Current password verification failed: "
  ]
];
  function translate(text,lang){
    const column=lang==="en"?2:lang==="zh-CN"?1:0;
    for(const row of entries) if(row.includes(text)) return row[column];
    for(const row of prefixes){
      for(const prefix of row){
        if(String(text).startsWith(prefix)) return row[column]+translate(String(text).slice(prefix.length),lang);
      }
    }
    const labels={
      "登入工作階段讀取":["登录会话读取","Sign-in session loading"],
      "登入身分重新驗證":["登录身份重新验证","Sign-in identity verification"],
      "MFA 狀態讀取":["MFA 状态读取","MFA status loading"],
      "安全頁初始化":["安全页初始化","Security page initialization"],
      "操作":["操作","Operation"]
    };
    const m=String(text).match(/^(.+)逾時$/);
    if(m && labels[m[1]]){
      return column===2?labels[m[1]][1]+" timed out":column===1?labels[m[1]][0]+"超时":text;
    }
    return text;
  }
  window.IPTAuthTranslate=translate;
})();
