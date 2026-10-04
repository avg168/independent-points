(() => {
  "use strict";
  const STORAGE_KEY="ipt_language";
  const SUPPORTED=["zh-TW","zh-CN","en"];
  const DICT={
    "zh-CN":{"Independent Points V4.14.2｜正式整合首頁":"Independent Points V4.14.2｜正式整合首页","會員、錢包、IPT 資產、交易與管理，一個正式入口完成。":"会员、钱包、IPT 资产、交易与管理，一个正式入口完成。","快速導覽":"快速导航","首頁":"首页","我的資產":"我的资产","IPT 轉帳":"IPT 转账","管理中心":"管理中心","這組導覽是一般頁面內容，不會被 Android 瀏覽器底部工具列蓋住。":"这组导航是一般页面内容，不会被 Android 浏览器底部工具栏盖住。","我的帳戶":"我的账户","正在確認登入狀態…":"正在确认登录状态…","重新整理":"重新整理","會員登入／主錢包":"会员登录／主钱包","我的 IPT":"我的 IPT","目前餘額":"当前余额","累計轉入":"累计转入","累計轉出":"累计转出","交易筆數":"交易笔数","為避免手機首頁卡住，完整鏈上統計改為手動更新。":"为避免手机首页卡住，完整链上统计改为手动更新。","更新完整資產摘要":"更新完整资产摘要","尚未更新完整資產摘要。":"尚未更新完整资产摘要。","會員功能":"会员功能","餘額、轉入轉出、CSV、PDF 報表":"余额、转入转出、CSV、PDF 报表","查看點數":"查看点数","進入 IPT 錢包查看鏈上餘額":"进入 IPT 钱包查看链上余额","前置檢查後由 Trust Wallet 核准":"前置检查后由 Trust Wallet 核准","收款":"收款","回到主錢包頁使用收款功能":"回到主钱包页使用收款功能","交易紀錄":"交易记录","查看自己的 IPT 鏈上交易明細":"查看自己的 IPT 链上交易明细","資產中心":"资产中心","會員／管理員報表統一入口":"会员／管理员报表统一入口","系統資訊":"系统信息","版本、網路、合約與更新資訊":"版本、网络、合约与更新信息","維運中心":"运维中心","版本、快取、Supabase、Sepolia 與合約健康檢查":"版本、缓存、Supabase、Sepolia 与合约健康检查","資產彙總":"资产汇总","會員資產、區間報表、CSV、PDF":"会员资产、区间报表、CSV、PDF","會員管理":"会员管理","回主系統進入會員管理功能":"回主系统进入会员管理功能","管理者發行 IPT":"管理员发行 IPT","暫停／恢復":"暂停／恢复","管理 IPT 合約交易狀態":"管理 IPT 合约交易状态","管理權":"管理权","Owner / pendingOwner 交接":"Owner / pendingOwner 交接","進階功能":"高级功能","回到完整 IPT 系統操作頁":"回到完整 IPT 系统操作页","系統更新":"系统更新","版本、備份、更新檢查與快速回復":"版本、备份、更新检查与快速恢复","安全與權限":"安全与权限","管理員、停權、錢包驗證與稽核":"管理员、停权、钱包验证与稽核","營運安全":"运营安全","高風險操作保護、錢包切換與安全事件":"高风险操作保护、钱包切换与安全事件","事件與通知":"事件与通知","營運事件、管理稽核、未讀與裝置通知":"运营事件、管理稽核、未读与设备通知","正式營運安全":"正式运营安全","安裝 Independent Points":"安装 Independent Points","直接安裝 App":"直接安装 App","用 Chrome 開啟安裝":"用 Chrome 打开安装","複製正式網址":"复制正式网址","正在檢查此瀏覽器的安裝能力…":"正在检查此浏览器的安装能力…","返回首頁":"返回首页","返回 V4.14.2 首頁":"返回 V4.14.2 首页","管理員驗證":"管理员验证","事件總覽":"事件总览","全部事件":"全部事件","未讀":"未读","重要／警告":"重要／警告","近 24 小時":"近 24 小时","裝置通知":"设备通知","啟用系統通知":"启用系统通知","啟用頁面內提醒":"启用页面内提醒","測試通知":"测试通知","事件篩選":"事件筛选","全部來源":"全部来源","全部等級":"全部等级","全部狀態":"全部状态","全部標記已讀":"全部标记已读","匯出 CSV":"导出 CSV","事件列表":"事件列表","載入更多會員管理稽核":"加载更多会员管理稽核","高風險安全":"高风险安全","管理稽核":"管理稽核","系統／鏈上":"系统／链上","重要":"重要","警告":"警告","一般":"一般","正常":"正常","已讀":"已读","快速入口":"快速入口","營運事件與通知中心":"运营事件与通知中心","帳戶安全與權限中心":"账户安全与权限中心","安全總覽":"安全总览","會員總數":"会员总数","正常會員":"正常会员","停權會員":"停权会员","錢包已驗證":"钱包已验证","錢包未驗證":"钱包未验证","管理員權限":"管理员权限","會員安全管理":"会员安全管理","錢包驗證狀態":"钱包验证状态","高風險操作入口":"高风险操作入口","會員安全明細／稽核":"会员安全明细／稽核","營運安全中心":"运营安全中心","正式營運狀態":"正式运营状态","帳戶安全摘要":"账户安全摘要","高風險操作紀錄（本機）":"高风险操作记录（本机）","最近管理稽核":"最近管理稽核","快速安全維運":"快速安全运维","版本更新中心":"版本更新中心","版本狀態":"版本状态","系統健康檢查":"系统健康检查","PWA 與快取維護":"PWA 与缓存维护","診斷資訊":"诊断信息","更新前檢查":"更新前检查","更新後健康驗證":"更新后健康验证","正式發佈檔案清單":"正式发布文件清单","版本更新歷程":"版本更新历史","Service Worker / 快取":"Service Worker / 缓存","異常回復":"异常恢复","正式產品化里程碑":"正式产品化里程碑","網路":"网络","Chain ID":"Chain ID","IPT 合約":"IPT 合约","錢包流程":"钱包流程","重新讀取鏈上資料":"重新读取链上数据","連接錢包":"连接钱包","連接 Trust Wallet":"连接 Trust Wallet","目前錢包":"当前钱包","安全角色":"安全角色","操作視窗":"操作窗口","保護規則":"保护规则","未啟用":"未启用","啟用 60 秒操作視窗":"启用 60 秒操作窗口","查看營運安全紀錄":"查看运营安全记录","管理中心：發行 IPT":"管理中心：发行 IPT","管理中心：暫停／恢復":"管理中心：暂停／恢复","管理中心：管理權交接":"管理中心：管理权交接","準備操作":"准备操作","鏈上 paused 狀態":"链上 paused 状态","目前 Owner":"当前 Owner","目前 pendingOwner":"当前 pendingOwner","無候任管理者":"无候任管理员","候任管理者錢包地址":"候任管理员钱包地址","會員":"会员","角色／狀態":"角色／状态","最近登入":"最近登录","錢包驗證":"钱包验证","主錢包":"主钱包","已驗證":"已验证","尚未綁定錢包":"尚未绑定钱包","搜尋":"搜索","清除":"清除","重新檢查":"重新检查","重新載入":"重新加载","開啟維運中心":"打开运维中心","開啟版本更新中心":"打开版本更新中心","開啟安全與權限中心":"打开安全与权限中心","開啟營運安全中心":"打开运营安全中心","開啟事件與通知中心":"打开事件与通知中心","正式版本":"正式版本","回復版本":"恢复版本","更新通道":"更新通道","目前頁面版本":"当前页面版本","App 模式":"App 模式","檢查 App 更新":"检查 App 更新","清除網站快取":"清除网站缓存","返回系統":"返回系统","語言":"语言","V4.14.2 操作體驗整合":"V4.14.2 操作体验整合","V4.14.2 防卡版：首頁會員資料先完成，完整鏈上統計改為需要時才更新。":"V4.14.2 防卡版：首页会员资料先完成，完整链上统计改为需要时才更新。","V4.14.2 已作為正式統一首頁，新增帳戶安全與權限管理中心。原本通過驗證的錢包核心保留在 wallet-core-v4.10.html；會員與管理員資產報表已統一為目前正式報表模組。":"V4.14.2 已作为正式统一首页，新增账户安全与权限管理中心。已验证的钱包核心保留在 wallet-core-v4.10.html；会员与管理员资产报表已统一为当前正式报表模块。","V4.14.2 正式營運版：新增事件與通知中心，集中管理高風險事件、管理稽核、鏈上營運狀態與裝置通知。":"V4.14.2 正式运营版：新增事件与通知中心，集中管理高风险事件、管理稽核、链上运营状态与设备通知。","若目前瀏覽器支援 PWA，可直接安裝；Trust Wallet／WebView 不支援時，可一鍵改用 Chrome 開啟正式安裝頁。":"若当前浏览器支持 PWA，可直接安装；Trust Wallet／WebView 不支持时，可一键改用 Chrome 打开正式安装页。"},
    "en":{"Independent Points V4.14.2｜正式整合首頁":"Independent Points V4.14.2 | Unified Home","會員、錢包、IPT 資產、交易與管理，一個正式入口完成。":"Members, wallets, IPT assets, transactions and administration in one unified entry point.","快速導覽":"Quick Navigation","首頁":"Home","我的資產":"My Assets","IPT 轉帳":"IPT Transfer","管理中心":"Admin Center","這組導覽是一般頁面內容，不會被 Android 瀏覽器底部工具列蓋住。":"This navigation is part of the page, so it will not be covered by Android browser controls.","我的帳戶":"My Account","正在確認登入狀態…":"Checking sign-in status…","重新整理":"Refresh","會員登入／主錢包":"Member Sign-in / Primary Wallet","我的 IPT":"My IPT","目前餘額":"Current Balance","累計轉入":"Total In","累計轉出":"Total Out","交易筆數":"Transactions","為避免手機首頁卡住，完整鏈上統計改為手動更新。":"To keep mobile responsive, full on-chain statistics update only when requested.","更新完整資產摘要":"Update Full Asset Summary","尚未更新完整資產摘要。":"Full asset summary has not been updated yet.","會員功能":"Member Features","餘額、轉入轉出、CSV、PDF 報表":"Balance, transfers, CSV and PDF reports","查看點數":"View Points","進入 IPT 錢包查看鏈上餘額":"Open the IPT wallet to view the on-chain balance","前置檢查後由 Trust Wallet 核准":"Pre-check first, then approve in Trust Wallet","收款":"Receive","回到主錢包頁使用收款功能":"Use the primary wallet page to receive IPT","交易紀錄":"Transaction History","查看自己的 IPT 鏈上交易明細":"View your IPT on-chain transaction history","資產中心":"Asset Center","會員／管理員報表統一入口":"Unified member/admin reporting","系統資訊":"System Info","版本、網路、合約與更新資訊":"Version, network, contract and update information","維運中心":"Operations Center","版本、快取、Supabase、Sepolia 與合約健康檢查":"Version, cache, Supabase, Sepolia and contract health checks","資產彙總":"Asset Summary","會員資產、區間報表、CSV、PDF":"Member assets, period reports, CSV and PDF","會員管理":"Member Management","回主系統進入會員管理功能":"Open member management in the main system","管理者發行 IPT":"Admin IPT issuance","暫停／恢復":"Pause / Unpause","管理 IPT 合約交易狀態":"Manage IPT contract transfer status","管理權":"Ownership","Owner / pendingOwner 交接":"Owner / pendingOwner handover","進階功能":"Advanced","回到完整 IPT 系統操作頁":"Open the full IPT operations page","系統更新":"System Updates","版本、備份、更新檢查與快速回復":"Versions, backups, update checks and rollback","安全與權限":"Security & Access","管理員、停權、錢包驗證與稽核":"Admins, suspensions, wallet verification and audit","營運安全":"Operations Security","高風險操作保護、錢包切換與安全事件":"High-risk protection, wallet changes and security events","事件與通知":"Events & Alerts","營運事件、管理稽核、未讀與裝置通知":"Operational events, admin audit, unread items and device alerts","正式營運安全":"Production Security","安裝 Independent Points":"Install Independent Points","直接安裝 App":"Install App","用 Chrome 開啟安裝":"Open in Chrome to Install","複製正式網址":"Copy Official URL","正在檢查此瀏覽器的安裝能力…":"Checking installation support…","返回首頁":"Back to Home","返回 V4.14.2 首頁":"Back to V4.14.2 Home","管理員驗證":"Admin Verification","事件總覽":"Event Overview","全部事件":"All Events","未讀":"Unread","重要／警告":"Critical / Warning","近 24 小時":"Last 24 Hours","裝置通知":"Device Alerts","啟用系統通知":"Enable System Notifications","啟用頁面內提醒":"Enable In-page Alerts","測試通知":"Test Alert","事件篩選":"Event Filters","全部來源":"All Sources","全部等級":"All Levels","全部狀態":"All Statuses","全部標記已讀":"Mark All Read","匯出 CSV":"Export CSV","事件列表":"Event List","載入更多會員管理稽核":"Load More Member Audit Logs","高風險安全":"High-risk Security","管理稽核":"Admin Audit","系統／鏈上":"System / On-chain","重要":"Critical","警告":"Warning","一般":"Info","正常":"Normal","已讀":"Read","快速入口":"Quick Links","營運事件與通知中心":"Operations Events & Alerts","帳戶安全與權限中心":"Account Security & Access","安全總覽":"Security Overview","會員總數":"Members","正常會員":"Active Members","停權會員":"Suspended Members","錢包已驗證":"Verified Wallets","錢包未驗證":"Unverified Wallets","管理員權限":"Admin Access","會員安全管理":"Member Security","錢包驗證狀態":"Wallet Verification","高風險操作入口":"High-risk Operations","會員安全明細／稽核":"Member Security Details / Audit","營運安全中心":"Operations Security Center","正式營運狀態":"Production Status","帳戶安全摘要":"Account Security Summary","高風險操作紀錄（本機）":"High-risk Events (Local)","最近管理稽核":"Recent Admin Audit","快速安全維運":"Security Operations","版本更新中心":"Version Update Center","版本狀態":"Version Status","系統健康檢查":"System Health Check","PWA 與快取維護":"PWA & Cache Maintenance","診斷資訊":"Diagnostics","更新前檢查":"Pre-update Check","更新後健康驗證":"Post-update Health Check","正式發佈檔案清單":"Release File List","版本更新歷程":"Release History","Service Worker / 快取":"Service Worker / Cache","異常回復":"Recovery","正式產品化里程碑":"Production Milestone","網路":"Network","Chain ID":"Chain ID","IPT 合約":"IPT Contract","錢包流程":"Wallet Flow","重新讀取鏈上資料":"Reload On-chain Data","連接錢包":"Connect Wallet","連接 Trust Wallet":"Connect Trust Wallet","目前錢包":"Current Wallet","安全角色":"Security Role","操作視窗":"Operation Window","保護規則":"Protection Rule","未啟用":"Inactive","啟用 60 秒操作視窗":"Enable 60-second Window","查看營運安全紀錄":"View Security Events","管理中心：發行 IPT":"Admin: Mint IPT","管理中心：暫停／恢復":"Admin: Pause / Unpause","管理中心：管理權交接":"Admin: Ownership Handover","準備操作":"Prepare Operation","鏈上 paused 狀態":"On-chain paused Status","目前 Owner":"Current Owner","目前 pendingOwner":"Current pendingOwner","無候任管理者":"No pending owner","候任管理者錢包地址":"Pending Owner Wallet Address","會員":"Member","角色／狀態":"Role / Status","最近登入":"Last Sign-in","錢包驗證":"Wallet Verification","主錢包":"Primary Wallet","已驗證":"Verified","尚未綁定錢包":"No Wallet Linked","搜尋":"Search","清除":"Clear","重新檢查":"Recheck","重新載入":"Reload","開啟維運中心":"Open Operations Center","開啟版本更新中心":"Open Version Update Center","開啟安全與權限中心":"Open Security & Access","開啟營運安全中心":"Open Operations Security","開啟事件與通知中心":"Open Events & Alerts","正式版本":"Production Version","回復版本":"Rollback Version","更新通道":"Update Channel","目前頁面版本":"Current Page Version","App 模式":"App Mode","檢查 App 更新":"Check App Update","清除網站快取":"Clear Site Cache","返回系統":"Back to System","語言":"Language","V4.14.2 操作體驗整合":"V4.14.2 Unified Experience","V4.14.2 防卡版：首頁會員資料先完成，完整鏈上統計改為需要時才更新。":"V4.14.2 mobile-safe mode: member data loads first; full on-chain statistics update only when requested.","V4.14.2 已作為正式統一首頁，新增帳戶安全與權限管理中心。原本通過驗證的錢包核心保留在 wallet-core-v4.10.html；會員與管理員資產報表已統一為目前正式報表模組。":"V4.14.2 is the unified production home. The verified wallet core remains in wallet-core-v4.10.html, and member/admin reports use the current production reporting modules.","V4.14.2 正式營運版：新增事件與通知中心，集中管理高風險事件、管理稽核、鏈上營運狀態與裝置通知。":"V4.14.2 production release adds the Events & Alerts Center for high-risk events, admin audit, on-chain operational status and device alerts.","若目前瀏覽器支援 PWA，可直接安裝；Trust Wallet／WebView 不支援時，可一鍵改用 Chrome 開啟正式安裝頁。":"If this browser supports PWA installation, install directly. If Trust Wallet/WebView does not, open the official install page in Chrome."}
  };

  let applying=false;
  let observer=null;

  function getLang(){
    const saved=localStorage.getItem(STORAGE_KEY);
    return SUPPORTED.includes(saved)?saved:"zh-TW";
  }
  function setHtmlLang(lang){
    document.documentElement.lang=lang==="zh-CN"?"zh-Hans":lang==="en"?"en":"zh-Hant";
  }

  function translateDynamic(text,lang){
    if(lang==="zh-TW") return null;

    const errorPrefix=String(text).match(/^(檢查失敗|送出失敗|讀取失敗)：\s*(.+)$/s);
    if(errorPrefix){
      const labels={"檢查失敗":["检查失败","Check failed"],"送出失敗":["发送失败","Submission failed"],"讀取失敗":["读取失败","Read failed"]};
      const tail=translateExact(errorPrefix[2],lang);
      return labels[errorPrefix[1]][lang==="en"?1:0]+(lang==="en"?": ":"：")+tail;
    }
    const insufficient=String(text).match(/^IPT 餘額不足。現在餘額：([0-9.,]+) IPT$/);
    if(insufficient) return lang==="en"?`Insufficient IPT balance. Current balance: ${insufficient[1]} IPT`:`IPT 余额不足。当前余额：${insufficient[1]} IPT`;

    let platformMatch=String(text).match(/^(平台 IPT|P) 餘額不足。目前可用 ([0-9.,]+) (IPT|P)。$/);
    if(platformMatch) return lang==="en"?`Insufficient ${platformMatch[1]==="平台 IPT"?"platform IPT":"P"} balance. Available: ${platformMatch[2]} ${platformMatch[3]}.`:`${platformMatch[1]} 余额不足。当前可用 ${platformMatch[2]} ${platformMatch[3]}。`;
    platformMatch=String(text).match(/^(將轉出|轉帳完成：已轉) ([0-9.,]+) IPT 給 (.+)（(IPT-\d+)）。$/);
    if(platformMatch) return lang==="en"?`${platformMatch[1]==="將轉出"?"Transfer":"Transfer completed:"} ${platformMatch[2]} IPT to ${platformMatch[3]} (${platformMatch[4]}).`:`${platformMatch[1]==="將轉出"?"将转出":"转账完成：已转"} ${platformMatch[2]} IPT 给 ${platformMatch[3]}（${platformMatch[4]}）。`;
    platformMatch=String(text).match(/^(轉帳結果尚未確認|兌換尚未確認完成)：(.+)。系統將重新讀取伺服器餘額，請勿連續點擊。$/s);
    if(platformMatch) return lang==="en"?`${platformMatch[1]==="轉帳結果尚未確認"?"Transfer result":"Conversion result"} is not yet confirmed: ${platformMatch[2]}. Server balances will be reloaded. Please do not tap repeatedly.`:`${platformMatch[1]==="轉帳結果尚未確認"?"转账结果尚未确认":"兑换尚未确认完成"}：${platformMatch[2]}。系统将重新读取服务器余额，请勿连续点击。`;
    platformMatch=String(text).match(/^(查詢失敗|資產讀取失敗|會員編號已複製)：(.+)$/s);
    if(platformMatch){const labels={"查詢失敗":["查询失败","Lookup failed"],"資產讀取失敗":["资产读取失败","Asset loading failed"],"會員編號已複製":["会员编号已复制","Member number copied"]};return labels[platformMatch[1]][lang==="en"?1:0]+(lang==="en"?": ":"：")+platformMatch[2];}

    let withdrawalMatch=String(text).match(/^將申請 ([0-9.,]+) IPT，成功後改為鎖定，等待後續管理員／鏈上流程。$/);
    if(withdrawalMatch) return lang==="en"?`Request ${withdrawalMatch[1]} IPT. Once successful, it will be locked pending the admin / on-chain process.`:`将申请 ${withdrawalMatch[1]} IPT，成功后转为锁定，等待后续管理员／链上流程。`;
    withdrawalMatch=String(text).match(/^可用平台 IPT 不足。目前可用 ([0-9.,]+) IPT。$/);
    if(withdrawalMatch) return lang==="en"?`Insufficient available platform IPT. Available: ${withdrawalMatch[1]} IPT.`:`可用平台 IPT 不足。当前可用 ${withdrawalMatch[1]} IPT。`;
    withdrawalMatch=String(text).match(/^(無法確認目前 JWT AAL|讀取提領資料失敗|送出前 JWT 驗證失敗|取消失敗|目前無法安全確認登入狀態)：(.*)$/s);
    if(withdrawalMatch){const labels={"無法確認目前 JWT AAL":["无法确认当前 JWT AAL","Could not verify the current JWT AAL"],"讀取提領資料失敗":["读取提领数据失败","Withdrawal data loading failed"],"送出前 JWT 驗證失敗":["提交前 JWT 验证失败","JWT verification failed before submission"],"取消失敗":["取消失败","Cancellation failed"],"目前無法安全確認登入狀態":["当前无法安全确认登录状态","Could not securely verify sign-in status"]};return labels[withdrawalMatch[1]][lang==="en"?1:0]+(lang==="en"?": ":"：")+translateExact(withdrawalMatch[2],lang);}
    withdrawalMatch=String(text).match(/^目前送出的 JWT 仍是 (.+)，不是 aal2$/);
    if(withdrawalMatch) return lang==="en"?`The JWT being sent is still ${withdrawalMatch[1]}, not aal2`:`当前提交的 JWT 仍是 ${withdrawalMatch[1]}，不是 aal2`;
    withdrawalMatch=String(text).match(/^申請未建立：(.*)。目前沒有扣款或鎖定；若需要 MFA，請完成 AAL2 後再試。$/s);
    if(withdrawalMatch) return lang==="en"?`Request not created: ${translateExact(withdrawalMatch[1],lang)}. No debit or lock was reported. If MFA is required, complete AAL2 and try again.`:`申请未创建：${translateExact(withdrawalMatch[1],lang)}。当前没有扣款或锁定；如需 MFA，请完成 AAL2 后重试。`;

    const mfaError=String(text).match(/^(讀取 MFA 狀態失敗|MFA 驗證失敗)：(.*)$/s);
    if(mfaError) return (lang==="en"?(mfaError[1]==="讀取 MFA 狀態失敗"?"MFA status loading failed: ":"MFA verification failed: "):(mfaError[1]==="讀取 MFA 狀態失敗"?"读取 MFA 状态失败：":"MFA 验证失败："))+translateExact(mfaError[2],lang);
    let m;

    // Home signed-in status.
    m=text.match(/^(V[\d.]+) 已登入：會員功能與管理中心均已開放。$/);
    if(m) return lang==="en"
      ? `${m[1]} Signed in: Member Features and Admin Center are available.`
      : `${m[1]} 已登录：会员功能与管理中心均已开放。`;

    m=text.match(/^(V[\d.]+) 已登入：會員功能已開放。$/);
    if(m) return lang==="en"
      ? `${m[1]} Signed in: Member Features are available.`
      : `${m[1]} 已登录：会员功能已开放。`;

    // Member asset loaded status.
    m=text.match(/^(V[\d.]+) 已載入｜([^｜]+)｜(.+)$/);
    if(m) return lang==="en"
      ? `${m[1]} Loaded | ${m[2]} | ${m[3]}`
      : `${m[1]} 已加载｜${m[2]}｜${m[3]}`;

    // Wallet session box.
    m=text.match(/^Session：已建立\s*錢包：(.+?)\s*Chain：(.+?)\s*([✓✗].+)$/s);
    if(m) return lang==="en"
      ? `Session: Established\nWallet: ${m[1]}\nChain: ${m[2]}\n${m[3]}`
      : `Session：已建立\n钱包：${m[1]}\nChain：${m[2]}\n${m[3]}`;

    // Home current primary wallet.
    m=text.match(/^主錢包：(.+)$/);
    if(m) return lang==="en" ? `Primary Wallet: ${m[1]}` : `主钱包：${m[1]}`;

    // Last updated.
    m=text.match(/^最後更新：(.+)$/);
    if(m) return lang==="en" ? `Last Updated: ${m[1]}` : `最后更新：${m[1]}`;

    // Latest transaction summary.
    m=text.match(/^最近交易時間：(.+?)｜轉入\s*(\d+)\s*筆｜轉出\s*(\d+)\s*筆。$/);
    if(m) return lang==="en"
      ? `Latest Transaction: ${m[1]} | Incoming ${m[2]} | Outgoing ${m[3]}`
      : `最近交易时间：${m[1]}｜转入 ${m[2]} 笔｜转出 ${m[3]} 笔。`;

    // Filter result count.
    m=text.match(/^符合條件：(\d+)\s*筆｜轉入\s*(\d+)\s*筆｜轉出\s*(\d+)\s*筆。$/);
    if(m) return lang==="en"
      ? `Matching: ${m[1]} | Incoming ${m[2]} | Outgoing ${m[3]}`
      : `符合条件：${m[1]} 笔｜转入 ${m[2]} 笔｜转出 ${m[3]} 笔。`;

    // Loaded transaction range.
    m=text.match(/^目前鏈上共有\s*(\d+)\s*筆，本頁載入最近\s*(\d+)\s*筆；篩選結果以已載入紀錄為準。$/);
    if(m) return lang==="en"
      ? `There are ${m[1]} on-chain transactions; this page loaded the latest ${m[2]}. Filters apply to loaded records.`
      : `目前链上共有 ${m[1]} 笔，本页加载最近 ${m[2]} 笔；筛选结果以已加载记录为准。`;

    // Home unified-production paragraph with changing version/file.
    m=text.match(/^(V[\d.]+) 已作為正式統一首頁，新增帳戶安全與權限管理中心。原本通過驗證的錢包核心保留在 (wallet-core-v[\d.]+\.html)；會員與管理員資產報表已統一為目前正式報表模組。$/);
    if(m) return lang==="en"
      ? `${m[1]} is the unified production home. Account Security & Access is integrated. The verified wallet core remains in ${m[2]}, and member/admin asset reports use the current production reporting module.`
      : `${m[1]} 已作为正式统一首页，新增账户安全与权限管理中心。已验证的钱包核心保留在 ${m[2]}；会员与管理员资产报表已统一为当前正式报表模块。`;





    // Admin-members load status.
    m=text.match(/^(V[\d.]+) 會員管理已載入｜管理員：(.+)$/);
    if(m) return lang==="en"
      ? `${m[1]} Member Management loaded | Admin: ${m[2]}`
      : `${m[1]} 会员管理已加载｜管理员：${m[2]}`;


    // Member card fields.
    m=text.match(/^加入時間：(.+)$/);
    if(m) return lang==="en" ? `Joined: ${m[1]}` : `加入时间：${m[1]}`;

    if(text==="尚未綁定"){
      return lang==="en" ? "Not Linked" : "尚未绑定";
    }

    m=text.match(/^Wallet:\s*尚未綁定$/);
    if(m) return lang==="en" ? "Wallet: Not Linked" : "Wallet: 尚未绑定";

    // Generic member/security dynamic strings.
    m=text.match(/^錢包：(.+)$/);
    if(m) return lang==="en" ? `Wallet: ${m[1]}` : `钱包：${m[1]}`;

    m=text.match(/^常用收款人：(\d+) 筆$/);
    if(m) return lang==="en" ? `Saved Recipients: ${m[1]}` : `常用收款人：${m[1]} 笔`;

    m=text.match(/^Saved Recipients：(\d+) 筆$/);
    if(m) return lang==="en" ? `Saved Recipients: ${m[1]}` : `Saved Recipients：${m[1]} 笔`;

    m=text.match(/^時間：(.+)$/);
    if(m) return lang==="en" ? `Time: ${m[1]}` : `时间：${m[1]}`;

    m=text.match(/^區塊：(.+)$/);
    if(m) return lang==="en" ? `Block: ${m[1]}` : `区块：${m[1]}`;

    m=text.match(/^近 24 小時：錢包切換 (\d+) 次｜安全阻擋 (\d+) 次｜高風險送簽 (\d+) 次。$/);
    if(m) return lang==="en"
      ? `Last 24 hours: Wallet switches ${m[1]} | Security blocks ${m[2]} | High-risk signing attempts ${m[3]}.`
      : `近 24 小时：钱包切换 ${m[1]} 次｜安全阻挡 ${m[2]} 次｜高风险送签 ${m[3]} 次。`;

    m=text.match(/^已讀取 (\d+) 筆最近管理稽核；近 24 小時未發現角色／狀態異動。$/);
    if(m) return lang==="en"
      ? `Loaded ${m[1]} recent admin audit records; no role/status changes found in the last 24 hours.`
      : `已读取 ${m[1]} 笔最近管理稽核；近 24 小时未发现角色／状态异动。`;

    m=text.match(/^檢查完成：(\d+) 項失敗、(\d+) 項注意。$/);
    if(m) return lang==="en"
      ? `Check complete: ${m[1]} failed, ${m[2]} warning(s).`
      : `检查完成：${m[1]} 项失败、${m[2]} 项注意。`;

    // Security-center summary.
    m=text.match(/^需留意：(\d+) 位會員錢包尚未驗證。$/);
    if(m) return lang==="en"
      ? `Attention: ${m[1]} member wallet(s) are unverified.`
      : `需留意：${m[1]} 位会员钱包尚未验证。`;

    m=text.match(/^需留意：(\d+) 位會員錢包尚未驗證；(\d+) 位會員目前停權。$/);
    if(m) return lang==="en"
      ? `Attention: ${m[1]} member wallet(s) are unverified; ${m[2]} member(s) are suspended.`
      : `需留意：${m[1]} 位会员钱包尚未验证；${m[2]} 位会员目前停权。`;

    m=text.match(/^未綁定錢包 (\d+) 位｜已綁定但未驗證 (\d+) 位。$/);
    if(m) return lang==="en"
      ? `Wallets not linked: ${m[1]} | Linked but unverified: ${m[2]}.`
      : `未绑定钱包 ${m[1]} 位｜已绑定但未验证 ${m[2]} 位。`;

    // Operations security summaries.
    m=text.match(/^近 24 小時：錢包切換 (\d+) 次｜安全阻擋 (\d+) 次｜高風險送簽 (\d+) 次。$/);
    if(m) return lang==="en"
      ? `Last 24 hours: Wallet switches ${m[1]} | Security blocks ${m[2]} | High-risk signing attempts ${m[3]}.`
      : `近 24 小时：钱包切换 ${m[1]} 次｜安全阻挡 ${m[2]} 次｜高风险送签 ${m[3]} 次。`;

    m=text.match(/^已讀取 (\d+) 筆最近管理稽核；近 24 小時未發現角色／狀態異動。$/);
    if(m) return lang==="en"
      ? `Loaded ${m[1]} recent admin audit records; no role/status changes found in the last 24 hours.`
      : `已读取 ${m[1]} 笔最近管理稽核；近 24 小时未发现角色／状态异动。`;

    m=text.match(/^管理員驗證通過：(.+)$/);
    if(m) return lang==="en" ? `Admin verified: ${m[1]}` : `管理员验证通过：${m[1]}`;

    // Event-center stored event titles.
    if(text==="60 秒安全視窗逾時") return lang==="en" ? "60-second Security Window Expired" : "60 秒安全窗口逾时";
    if(text==="60 秒安全視窗啟用") return lang==="en" ? "60-second Security Window Enabled" : "60 秒安全窗口启用";
    if(text==="錢包安全核對失敗") return lang==="en" ? "Wallet Security Verification Failed" : "钱包安全核对失败";

    // Wallet-core combined states.
    if(text==="尚未連線或合約尚未驗證"){
      return lang==="en" ? "Not connected or contract not verified" : "尚未连接或合约尚未验证";
    }
    if(text==="鏈上資料已更新，請重新檢查管理操作。"){
      return lang==="en" ? "On-chain data has been updated. Please recheck the admin operation." : "链上数据已更新，请重新检查管理操作。";
    }
    if(text==="鏈上資料已更新，請重新檢查管理權操作。"){
      return lang==="en" ? "On-chain data has been updated. Please recheck the ownership operation." : "链上数据已更新，请重新检查管理权操作。";
    }
    if(text.startsWith("候任管理者要「接任」時，不需要輸入地址。")){
      return lang==="en"
        ? "When the pending owner accepts ownership, no address input is required. Switch Trust Wallet to the wallet matching pendingOwner, reconnect, load the contract, then run the check below."
        : "候任管理员要「接任」时，不需要输入地址。请先将 Trust Wallet 切换到 pendingOwner 对应的钱包，重新连接并读取合约，再执行下方检查。";
    }

    // Status messages with errors.
    m=text.match(/^載入失敗：(.+)$/);
    if(m) return lang==="en" ? `Load failed: ${m[1]}` : `加载失败：${m[1]}`;

    m=text.match(/^連線失敗：(.+)$/);
    if(m) return lang==="en" ? `Connection failed: ${m[1]}` : `连接失败：${m[1]}`;

    return null;
  }

  function translateExact(text,lang){
    if(lang==="zh-TW") return text;

    // Preserve visual alert/status prefixes while translating the complete sentence.
    // Example: "⚠️ 管理權交接..." -> "⚠️ Ownership handover..."
    const prefixMatch=String(text).match(/^([⚠️✅ℹ️❗❌🔒🔐📌📢]+\s*)(.+)$/s);
    if(prefixMatch){
      const prefix=prefixMatch[1];
      const core=prefixMatch[2];
      const dynamicCore=translateDynamic(core,lang);
      if(dynamicCore!==null) return prefix+dynamicCore;
      const prefixDict=DICT[lang]||{};
      if(Object.prototype.hasOwnProperty.call(prefixDict,core)){
        return prefix+prefixDict[core];
      }
    }

    const normalized=String(text).replace(/\s+/g," ").trim();

    const dynamic=translateDynamic(normalized,lang);
    if(dynamic!==null) return dynamic;
    const dict=DICT[lang]||{};
    if(Object.prototype.hasOwnProperty.call(dict,normalized)) return dict[normalized];
    if(Object.prototype.hasOwnProperty.call(dict,text)) return dict[text];

    // Translate multi-sentence CJK paragraphs sentence-by-sentence.
    // Each sentence must resolve as a complete dictionary/dynamic entry;
    // otherwise we keep the original paragraph instead of producing mixed language.
    const hasCJK=/[\u3400-\u9fff]/.test(normalized);
    if(hasCJK && /[。！？]/.test(normalized)){
      const parts=normalized.match(/[^。！？]+[。！？]?/g)?.map(s=>s.trim()).filter(Boolean) || [];
      if(parts.length>1){
        const translatedParts=[];
        let allTranslated=true;
        for(const part of parts){
          let t=translateDynamic(part,lang);
          if(t===null && Object.prototype.hasOwnProperty.call(dict,part)) t=dict[part];
          if(t===null){
            allTranslated=false;
            break;
          }
          translatedParts.push(t);
        }
        if(allTranslated){
          return lang==="en" ? translatedParts.join(" ") : translatedParts.join("");
        }
      }
    }

    // For longer CJK sentences, do not build English by replacing fragments.
    // This prevents mixed text such as "請RecheckOwnership操作".
    if(lang==="en" && hasCJK && normalized.length>18){
      return text;
    }

    // Short labels may safely use phrase replacement.
    let out=text;
    const keys=Object.keys(dict)
      .filter(k=>k && k.length>=2 && out.includes(k))
      .sort((a,b)=>b.length-a.length);
    for(const k of keys){
      if(out.includes(k)) out=out.split(k).join(dict[k]);
    }
    return out;
  }
  function translateTextNode(node,lang){
    if(!node || node.nodeType!==Node.TEXT_NODE) return;
    const parent=node.parentElement;
    if(!parent || parent.closest("script,style,code,pre,[data-ipt-i18n-skip='1'],.ipt-langbar")) return;

    // Never translate user/member data containers or technical data.
    if(parent.closest("[data-member-data='1'],[data-raw-data='1'],.member-data,.raw-data,.wallet-address,.email-address")) return;

    const raw=node.nodeValue ?? "";
    const trimmed=raw.trim();
    if(!trimmed) return;

    const last=node.__iptI18nLast;
    if(node.__iptI18nOriginal===undefined || (last!==undefined && raw!==last)){
      node.__iptI18nOriginal=raw;
    }
    const original=node.__iptI18nOriginal ?? raw;
    const core=original.trim();
    if(
      /^0x[a-fA-F0-9]{8,}$/.test(core) ||
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(core) ||
      /^IPT-\d+\s*[｜|]\s*.+$/.test(core)
    ){
      node.__iptI18nLast=raw;
      return;
    }
    const translated=translateExact(core,lang);
    const leading=(original.match(/^\s*/)||[""])[0];
    const trailing=(original.match(/\s*$/)||[""])[0];
    const next=leading+translated+trailing;
    if(node.nodeValue!==next) node.nodeValue=next;
    node.__iptI18nLast=next;
  }
  function translateAttrs(root,lang){
    const nodes=(root?.querySelectorAll?root.querySelectorAll("[placeholder],[title],[aria-label]"):[]);
    nodes.forEach(el=>{
      ["placeholder","title","aria-label"].forEach(attr=>{
        if(!el.hasAttribute(attr)) return;
        const key="iptI18nOriginal"+attr.replace(/-([a-z])/g,(_,c)=>c.toUpperCase());
        if(el.dataset[key]===undefined) el.dataset[key]=el.getAttribute(attr)||"";
        const orig=el.dataset[key];
        el.setAttribute(attr,translateExact(orig,lang));
      });
    });
  }
  function apply(root=document){
    if(applying) return;
    applying=true;
    try{
      const lang=getLang();
      setHtmlLang(lang);
      const walker=document.createTreeWalker(root===document?document.body:root,NodeFilter.SHOW_TEXT);
      let node;
      while((node=walker.nextNode())) translateTextNode(node,lang);
      translateAttrs(root===document?document:root,lang);

      if(document.title){
        if(document.documentElement.dataset.iptOriginalTitle===undefined){
          document.documentElement.dataset.iptOriginalTitle=document.title;
        }
        document.title=translateExact(document.documentElement.dataset.iptOriginalTitle,lang);
      }
      document.querySelectorAll(".ipt-langbar button[data-lang]").forEach(btn=>{
        btn.classList.toggle("active",btn.dataset.lang===lang);
        btn.setAttribute("aria-pressed",btn.dataset.lang===lang?"true":"false");
      });
    }finally{applying=false}
  }
  function setLang(lang){
    if(!SUPPORTED.includes(lang)) return;
    localStorage.setItem(STORAGE_KEY,lang);
    apply(document);
    window.dispatchEvent(new CustomEvent("ipt-language-change",{detail:{lang}}));
  }
  function t(text,lang=getLang()){return translateExact(text,lang)}

  function injectToolbar(){
    if(document.querySelector(".ipt-langbar")) return;
    const style=document.createElement("style");
    style.dataset.iptI18nSkip="1";
    style.textContent=`
      .ipt-langbar{display:flex;align-items:center;justify-content:center;gap:7px;padding:9px 12px;background:#f7f9fc;border-bottom:1px solid #dfe6ef;position:relative;z-index:5}
      .ipt-langbar .label{font-size:.78rem;color:#64748b;font-weight:800;margin-right:2px}
      .ipt-langbar button{min-height:38px!important;padding:7px 10px!important;border-radius:10px!important;border:1px solid #cbd5e1!important;background:#fff!important;color:#17365d!important;font:inherit!important;font-size:.84rem!important;font-weight:850!important;touch-action:manipulation!important}
      .ipt-langbar button.active{background:#17365d!important;color:#fff!important;border-color:#17365d!important}
      @media(max-width:380px){.ipt-langbar{gap:5px;padding:8px 6px}.ipt-langbar button{padding:6px 8px!important;font-size:.78rem!important}}
    `;
    document.head.appendChild(style);

    const bar=document.createElement("div");
    bar.className="ipt-langbar";
    bar.dataset.iptI18nSkip="1";
    bar.innerHTML=`<span class="label">🌐</span>
      <button type="button" data-lang="zh-TW">繁中</button>
      <button type="button" data-lang="zh-CN">简中</button>
      <button type="button" data-lang="en">English</button>`;
    bar.querySelectorAll("button[data-lang]").forEach(btn=>btn.addEventListener("click",()=>setLang(btn.dataset.lang)));
    document.body.insertBefore(bar,document.body.firstChild);
  }

  function startObserver(){
    if(observer) observer.disconnect();
    observer=new MutationObserver(muts=>{
      if(applying) return;
      let needed=false;
      for(const m of muts){
        if(m.type==="characterData" || m.addedNodes?.length){needed=true;break}
      }
      if(needed) queueMicrotask(()=>apply(document));
    });
    observer.observe(document.body,{subtree:true,childList:true,characterData:true});
  }

  window.IPTI18N={
    getLang,setLang,t,apply,supported:[...SUPPORTED],
    dictionaries:DICT
  };

  window.addEventListener("DOMContentLoaded",()=>{
    injectToolbar();
    apply(document);
    startObserver();
  });
})();

;(() => {
  const zh={"我的資產報表":"我的资产报表","我的 IPT 資產 × 報表篩選 × CSV 匯出 × 列印／PDF":"我的 IPT 资产 × 报表筛选 × CSV 导出 × 打印／PDF","系統狀態":"系统状态","正在讀取會員身分與 IPT 鏈上資產…":"正在读取会员身份与 IPT 链上资产…","返回會員頁":"返回会员页","我的會員資料":"我的会员资料","我的 IPT 資產":"我的 IPT 资产","目前 IPT 餘額":"当前 IPT 余额","資產淨變動":"资产净变动","交易報表篩選":"交易报表筛选","開始日期":"开始日期","結束日期":"结束日期","交易類型":"交易类型","全部交易":"全部交易","轉入":"转入","轉出":"转出","套用報表篩選":"套用报表筛选","清除條件":"清除条件","日期留空代表目前已載入的全部交易範圍。":"日期留空代表当前已加载的全部交易范围。","報表匯出":"报表导出","可將目前畫面上的篩選結果匯出成 CSV，或使用「列印／PDF」開啟手機列印功能並另存 PDF。":"可将当前画面上的筛选结果导出成 CSV，或使用「打印／PDF」打开手机打印功能并另存 PDF。","CSV 匯出／分享":"CSV 导出／分享","列印／PDF 預覽":"打印／PDF 预览","Android 手機會優先開啟原生分享／儲存介面；PDF 會先進入列印版預覽。":"Android 手机会优先打开原生分享／保存界面；PDF 会先进入打印版预览。","我的交易紀錄":"我的交易记录","Independent Points 資產中心":"Independent Points 资产中心","會員資產報表與管理員彙總報表的統一入口":"会员资产报表与管理员汇总报表的统一入口","登入狀態":"登录状态","正在確認會員登入狀態…":"正在确认会员登录状态…","選擇資產報表":"选择资产报表","查看自己的 IPT 餘額、累計轉入／轉出、交易紀錄、日期篩選，以及 CSV／PDF 報表。":"查看自己的 IPT 余额、累计转入／转出、交易记录、日期筛选，以及 CSV／PDF 报表。","進入我的資產":"进入我的资产","管理員資產彙總":"管理员资产汇总","只有管理員可進入。查看全站會員資產、區間交易彙總、搜尋篩選，以及 CSV／PDF 報表。":"只有管理员可进入。查看全站会员资产、区间交易汇总、搜索筛选，以及 CSV／PDF 报表。","進入管理員報表":"进入管理员报表","一般會員只會開放「我的資產報表」；管理員帳號會額外開放管理員彙總報表。":"一般会员只会开放「我的资产报表」；管理员账号会额外开放管理员汇总报表。","正式鏈上操作模組":"正式链上操作模块","會員點數錢包｜Ethereum Sepolia":"会员点数钱包｜Ethereum Sepolia","連接錢包後即可查看點數、轉帳與交易紀錄。":"连接钱包后即可查看点数、转账与交易记录。","查看點數":"查看点数","轉帳":"转账","交易紀錄":"交易记录","鏈上技術資料":"链上技术数据","最初部署 Owner（歷史參考）":"最初部署 Owner（历史参考）","準備操作":"准备操作","請先連接 Trust Wallet 並讀取 IPT 鏈上資料。":"请先连接 Trust Wallet 并读取 IPT 链上数据。","① 連接錢包":"① 连接钱包","尚未連線。":"尚未连接。","中斷連線／切換錢包":"断开连接／切换钱包","若要切換錢包，請先按「中斷連線／切換錢包」，再到 Trust Wallet 選擇正確錢包。":"若要切换钱包，请先按「断开连接／切换钱包」，再到 Trust Wallet 选择正确钱包。","② 我的帳戶":"② 我的账户","目前身分":"当前身份","尚未連線":"尚未连接","合約狀態":"合约状态","尚未讀取":"尚未读取","讀取 IPT 鏈上資料":"读取 IPT 链上数据","③ 我的 IPT":"③ 我的 IPT","鏈上總供給量":"链上总供应量","剩餘可發行":"剩余可发行","在 Sepolia Etherscan 查看交易紀錄":"在 Sepolia Etherscan 查看交易记录","交易紀錄由 Sepolia 區塊鏈瀏覽器顯示。若剛送出的交易尚未出現，稍候片刻再重新開啟即可。":"交易记录由 Sepolia 区块链浏览器显示。若刚送出的交易尚未出现，稍候片刻再重新打开即可。","將下方錢包地址提供給付款方即可收取 IPT。請確認對方使用 Ethereum Sepolia。":"将下方钱包地址提供给付款方即可收取 IPT。请确认对方使用 Ethereum Sepolia。","我的收款錢包地址":"我的收款钱包地址","複製錢包地址":"复制钱包地址","分享收款地址":"分享收款地址","顯示收款 QR Code":"显示收款 QR Code","請付款方確認網路為 Ethereum Sepolia，再掃描或複製地址。":"请付款方确认网络为 Ethereum Sepolia，再扫描或复制地址。","連接 Trust Wallet 後即可取得收款地址。":"连接 Trust Wallet 后即可取得收款地址。","④ IPT 轉帳":"④ IPT 转账","請確認收款地址與數量。系統會先檢查鏈上餘額與交易狀態，再交由 Trust Wallet 核准。":"请确认收款地址与数量。系统会先检查链上余额与交易状态，再交由 Trust Wallet 核准。","若畫面逾時，先重新讀取鏈上資料，不要立即重送。":"若画面超时，先重新读取链上数据，不要立即重送。","收款錢包地址":"收款钱包地址","轉移數量（IPT）":"转移数量（IPT）","先檢查轉帳":"先检查转账","連線並讀取合約後才可檢查。":"连接并读取合约后才可检查。","由 Trust Wallet 核准轉帳":"由 Trust Wallet 核准转账","⑤ 進階功能：永久銷毀 IPT":"⑤ 高级功能：永久销毁 IPT","銷毀會永久減少你的 IPT，且不能復原。只有確定要永久減少點數時才使用。":"销毁会永久减少你的 IPT，且不能恢复。只有确定要永久减少点数时才使用。","銷毀數量（IPT）":"销毁数量（IPT）","先檢查 Burn":"先检查 Burn","由 Trust Wallet 核准永久銷毀":"由 Trust Wallet 核准永久销毁","高風險交易目前鎖定。完成前置檢查後，請再啟用 60 秒操作視窗。":"高风险交易当前锁定。完成前置检查后，请再启用 60 秒操作窗口。","一次高風險送出即重新鎖定":"一次高风险送出即重新锁定","若切換錢包、變更網路或操作視窗逾時，系統會重新鎖定。鏈上交易仍需 Trust Wallet 再次核准。":"若切换钱包、变更网络或操作窗口超时，系统会重新锁定。链上交易仍需 Trust Wallet 再次核准。","⑥ 管理中心：發行 IPT":"⑥ 管理中心：发行 IPT","領取錢包地址":"领取钱包地址","發行數量（IPT）":"发行数量（IPT）","先檢查 Mint":"先检查 Mint","由 Trust Wallet 核准發行":"由 Trust Wallet 核准发行","⑦ 管理中心：暫停 / 恢復":"⑦ 管理中心：暂停 / 恢复","鏈上 paused 狀態":"链上 paused 状态","先檢查暫停合約":"先检查暂停合约","先檢查恢復合約":"先检查恢复合约","由 Trust Wallet 核准暫停":"由 Trust Wallet 核准暂停","由 Trust Wallet 核准恢復":"由 Trust Wallet 核准恢复","⑧ 管理中心：管理權交接":"⑧ 管理中心：管理权交接","目前 Owner":"当前 Owner","目前 pendingOwner":"当前 pendingOwner","候任管理者錢包地址":"候任管理员钱包地址","先檢查提出交接":"先检查提出交接","由 Trust Wallet 核准提出交接":"由 Trust Wallet 核准提出交接","先檢查接任管理權":"先检查接任管理权","由 Trust Wallet 核准接任":"由 Trust Wallet 核准接任","⑨ 合約驗證資料":"⑨ 合约验证数据","連線後按「讀取 IPT 鏈上資料」。":"连接后按「读取 IPT 链上数据」。","安全狀態":"安全状态","系統功能總覽":"系统功能总览","一般錢包：":"一般钱包：","網路：":"网络：","安全：":"安全："};
  const en={"我的資產報表":"My Asset Report","我的 IPT 資產 × 報表篩選 × CSV 匯出 × 列印／PDF":"My IPT Assets × Report Filters × CSV Export × Print / PDF","系統狀態":"System Status","正在讀取會員身分與 IPT 鏈上資產…":"Loading member identity and IPT on-chain assets…","返回會員頁":"Back to Member Page","我的會員資料":"My Member Profile","我的 IPT 資產":"My IPT Assets","目前 IPT 餘額":"Current IPT Balance","資產淨變動":"Net Asset Change","交易報表篩選":"Transaction Report Filters","開始日期":"Start Date","結束日期":"End Date","交易類型":"Transaction Type","全部交易":"All Transactions","轉入":"Incoming","轉出":"Outgoing","套用報表篩選":"Apply Filters","清除條件":"Clear Filters","日期留空代表目前已載入的全部交易範圍。":"Leave dates blank to use the full currently loaded transaction range.","報表匯出":"Report Export","可將目前畫面上的篩選結果匯出成 CSV，或使用「列印／PDF」開啟手機列印功能並另存 PDF。":"Export the current filtered results as CSV, or use Print / PDF to open mobile printing and save as PDF.","CSV 匯出／分享":"CSV Export / Share","列印／PDF 預覽":"Print / PDF Preview","Android 手機會優先開啟原生分享／儲存介面；PDF 會先進入列印版預覽。":"Android will prefer the native share/save interface; PDF opens a print preview first.","我的交易紀錄":"My Transaction History","Independent Points 資產中心":"Independent Points Asset Center","會員資產報表與管理員彙總報表的統一入口":"Unified entry for member asset reports and admin summaries","登入狀態":"Sign-in Status","正在確認會員登入狀態…":"Checking member sign-in status…","選擇資產報表":"Choose an Asset Report","查看自己的 IPT 餘額、累計轉入／轉出、交易紀錄、日期篩選，以及 CSV／PDF 報表。":"View your IPT balance, total incoming/outgoing, transaction history, date filters, and CSV/PDF reports.","進入我的資產":"Open My Assets","管理員資產彙總":"Admin Asset Summary","只有管理員可進入。查看全站會員資產、區間交易彙總、搜尋篩選，以及 CSV／PDF 報表。":"Admin only. View all member assets, period transaction summaries, search filters, and CSV/PDF reports.","進入管理員報表":"Open Admin Report","一般會員只會開放「我的資產報表」；管理員帳號會額外開放管理員彙總報表。":"Regular members can access My Asset Report; admins also get the admin summary report.","正式鏈上操作模組":"Production On-chain Operations","會員點數錢包｜Ethereum Sepolia":"Member Points Wallet | Ethereum Sepolia","連接錢包後即可查看點數、轉帳與交易紀錄。":"Connect your wallet to view points, transfer IPT, and see transaction history.","查看點數":"View Points","轉帳":"Transfer","交易紀錄":"Transactions","鏈上技術資料":"On-chain Technical Data","最初部署 Owner（歷史參考）":"Original Deployment Owner (Historical)","準備操作":"Prepare Operation","請先連接 Trust Wallet 並讀取 IPT 鏈上資料。":"Connect Trust Wallet and load IPT on-chain data first.","① 連接錢包":"① Connect Wallet","尚未連線。":"Not connected.","中斷連線／切換錢包":"Disconnect / Switch Wallet","若要切換錢包，請先按「中斷連線／切換錢包」，再到 Trust Wallet 選擇正確錢包。":"To switch wallets, disconnect first, then select the correct wallet in Trust Wallet.","② 我的帳戶":"② My Account","目前身分":"Current Identity","尚未連線":"Not Connected","合約狀態":"Contract Status","尚未讀取":"Not Loaded","讀取 IPT 鏈上資料":"Load IPT On-chain Data","③ 我的 IPT":"③ My IPT","鏈上總供給量":"On-chain Total Supply","剩餘可發行":"Remaining Mintable","在 Sepolia Etherscan 查看交易紀錄":"View Transactions on Sepolia Etherscan","交易紀錄由 Sepolia 區塊鏈瀏覽器顯示。若剛送出的交易尚未出現，稍候片刻再重新開啟即可。":"Transaction history is shown by the Sepolia block explorer. If a recent transaction is not visible yet, wait briefly and reopen it.","將下方錢包地址提供給付款方即可收取 IPT。請確認對方使用 Ethereum Sepolia。":"Share the wallet address below to receive IPT. Make sure the sender uses Ethereum Sepolia.","我的收款錢包地址":"My Receiving Wallet Address","複製錢包地址":"Copy Wallet Address","分享收款地址":"Share Receiving Address","顯示收款 QR Code":"Show Receiving QR Code","請付款方確認網路為 Ethereum Sepolia，再掃描或複製地址。":"Ask the sender to confirm Ethereum Sepolia before scanning or copying the address.","連接 Trust Wallet 後即可取得收款地址。":"Connect Trust Wallet to get your receiving address.","④ IPT 轉帳":"④ IPT Transfer","請確認收款地址與數量。系統會先檢查鏈上餘額與交易狀態，再交由 Trust Wallet 核准。":"Verify the recipient address and amount. The system checks on-chain balance and transaction status before Trust Wallet approval.","若畫面逾時，先重新讀取鏈上資料，不要立即重送。":"If the page times out, reload on-chain data before trying again.","收款錢包地址":"Recipient Wallet Address","轉移數量（IPT）":"Transfer Amount (IPT)","先檢查轉帳":"Pre-check Transfer","連線並讀取合約後才可檢查。":"Connect and load the contract before checking.","由 Trust Wallet 核准轉帳":"Approve Transfer in Trust Wallet","⑤ 進階功能：永久銷毀 IPT":"⑤ Advanced: Permanently Burn IPT","銷毀會永久減少你的 IPT，且不能復原。只有確定要永久減少點數時才使用。":"Burning permanently reduces your IPT and cannot be undone. Use only when you intentionally want to reduce your points.","銷毀數量（IPT）":"Burn Amount (IPT)","先檢查 Burn":"Pre-check Burn","由 Trust Wallet 核准永久銷毀":"Approve Permanent Burn in Trust Wallet","高風險交易目前鎖定。完成前置檢查後，請再啟用 60 秒操作視窗。":"High-risk transactions are locked. Complete the pre-check, then enable the 60-second operation window.","一次高風險送出即重新鎖定":"Relock after one high-risk submission","若切換錢包、變更網路或操作視窗逾時，系統會重新鎖定。鏈上交易仍需 Trust Wallet 再次核准。":"The system relocks if the wallet/network changes or the window expires. On-chain transactions still require Trust Wallet approval.","⑥ 管理中心：發行 IPT":"⑥ Admin: Mint IPT","領取錢包地址":"Recipient Wallet Address","發行數量（IPT）":"Mint Amount (IPT)","先檢查 Mint":"Pre-check Mint","由 Trust Wallet 核准發行":"Approve Mint in Trust Wallet","⑦ 管理中心：暫停 / 恢復":"⑦ Admin: Pause / Unpause","鏈上 paused 狀態":"On-chain paused Status","先檢查暫停合約":"Pre-check Pause","先檢查恢復合約":"Pre-check Unpause","由 Trust Wallet 核准暫停":"Approve Pause in Trust Wallet","由 Trust Wallet 核准恢復":"Approve Unpause in Trust Wallet","⑧ 管理中心：管理權交接":"⑧ Admin: Ownership Handover","目前 Owner":"Current Owner","目前 pendingOwner":"Current pendingOwner","候任管理者錢包地址":"Pending Owner Wallet Address","先檢查提出交接":"Pre-check Ownership Proposal","由 Trust Wallet 核准提出交接":"Approve Ownership Proposal in Trust Wallet","先檢查接任管理權":"Pre-check Accept Ownership","由 Trust Wallet 核准接任":"Approve Ownership Acceptance in Trust Wallet","⑨ 合約驗證資料":"⑨ Contract Verification Data","連線後按「讀取 IPT 鏈上資料」。":"After connecting, press Load IPT On-chain Data.","安全狀態":"Security Status","系統功能總覽":"System Feature Overview","一般錢包：":"Regular Wallet:","網路：":"Network:","安全：":"Security:"};
  if(window.IPTI18N?.dictionaries){Object.assign(window.IPTI18N.dictionaries['zh-CN'],zh);Object.assign(window.IPTI18N.dictionaries['en'],en);}
})();

;(() => {
  const zh={"管理員":"管理员","主錢包：":"主钱包：","最近交易時間":"最近交易时间","最近交易時間：":"最近交易时间：","筆":"笔","時間":"时间","時間：":"时间：","區塊":"区块","區塊：":"区块：","查看鏈上交易":"查看链上交易","Mint 轉入":"Mint 转入","Burn 轉出":"Burn 转出","已載入":"已加载","資產報表":"资产报表","報表篩選":"报表筛选","報表匯出":"报表导出","列印／PDF":"打印／PDF","轉入 2 筆":"转入 2 笔","轉出 3 筆":"转出 3 笔"};
  const en={"管理員":"Admin","主錢包：":"Primary Wallet:","最近交易時間":"Latest Transaction","最近交易時間：":"Latest Transaction:","筆":"tx","時間":"Time","時間：":"Time:","區塊":"Block","區塊：":"Block:","查看鏈上交易":"View On-chain Transaction","Mint 轉入":"Mint In","Burn 轉出":"Burn Out","已載入":"Loaded","資產報表":"Asset Report","報表篩選":"Report Filters","報表匯出":"Report Export","列印／PDF":"Print / PDF"};
  if(window.IPTI18N?.dictionaries){Object.assign(window.IPTI18N.dictionaries['zh-CN'],zh);Object.assign(window.IPTI18N.dictionaries['en'],en);}
})();

;(() => {const zh={"管理員資產彙總報表":"管理员资产汇总报表","管理員資產彙總":"管理员资产汇总","管理員資產總覽 × 彙總報表 × CSV 匯出 × 列印／PDF":"管理员资产总览 × 汇总报表 × CSV 导出 × 打印／PDF","正在檢查管理員登入狀態…":"正在检查管理员登录状态…","重新整理資產":"重新整理资产","返回上一頁":"返回上一页","全站資產摘要":"全站资产摘要","會員總數":"会员总数","已綁定錢包":"已绑定钱包","已驗證錢包":"已验证钱包","會員 IPT 總餘額":"会员 IPT 总余额","IPT 鏈上總發行量":"IPT 链上总发行量","尚未綁定錢包":"尚未绑定钱包","此頁只讀取資料，不執行 Mint、Transfer、Burn 或管理權交易。":"此页只读取资料，不执行 Mint、Transfer、Burn 或管理权交易。","會員資產篩選":"会员资产筛选","全部狀態":"全部状态","停權":"停权","全部角色":"全部角色","全部錢包":"全部钱包","已綁定":"已绑定","未綁定":"未绑定","全部驗證":"全部验证","未驗證":"未验证","套用篩選":"套用筛选","清除篩選":"清除筛选","尚未載入。":"尚未加载。","管理員彙總報表":"管理员汇总报表","會員搜尋":"会员搜索","產生彙總報表":"生成汇总报表","清除報表條件":"清除报表条件","尚未產生報表。日期留空代表目前可載入的全部鏈上交易範圍。":"尚未生成报表。日期留空代表当前可加载的全部链上交易范围。","產生報表後，可使用 Android 原生分享／儲存 CSV，或開啟列印／PDF 預覽。":"生成报表后，可使用 Android 原生分享／保存 CSV，或打开打印／PDF 预览。","符合會員數":"符合会员数","區間累計轉入":"区间累计转入","區間累計轉出":"区间累计转出","區間淨變動":"区间净变动","資產變動筆數":"资产变动笔数","會員區間彙總":"会员区间汇总","區間交易紀錄":"区间交易记录","會員資產列表":"会员资产列表","單一會員資產明細":"单一会员资产明细","關閉明細":"关闭明细","顯示":"显示","位會員":"位会员","沒有符合條件的會員。":"没有符合条件的会员。","已停權":"已停权","錢包已驗證":"钱包已验证","錢包未驗證":"钱包未验证","IPT 餘額":"IPT 余额","主錢包地址":"主钱包地址","查看資產明細":"查看资产明细","查看鏈上地址":"查看链上地址","目前沒有 IPT Transfer 紀錄。":"目前没有 IPT Transfer 记录。","轉入筆數":"转入笔数","轉出筆數":"转出笔数","會員管理":"会员管理","Supabase 雲端會員狀態、角色、錢包驗證與管理紀錄":"Supabase 云端会员状态、角色、钱包验证与管理记录","管理員狀態":"管理员状态","正在載入…":"正在加载…","會員摘要":"会员摘要","常用收款人":"常用收款人","搜尋會員":"搜索会员","會員列表":"会员列表","角色與停權操作會直接影響會員權限。系統會保護目前管理員自己與其他管理員，送出前仍請再次核對。":"角色与停权操作会直接影响会员权限。系统会保护当前管理员自己与其他管理员，送出前仍请再次核对。","會員完整資料":"会员完整资料","關閉詳細資料":"关闭详细资料","恢復會員":"恢复会员","降為一般會員":"降为一般会员","升級為管理員":"升级为管理员","加入時間":"加入时间","查看詳細":"查看详细","正在載入會員資料…":"正在加载会员资料…","正在更新會員狀態…":"正在更新会员状态…","正在更新會員角色…":"正在更新会员角色…","正在載入完整資料…":"正在加载完整资料…","最近管理紀錄":"最近管理记录","尚無管理紀錄":"尚无管理记录","營運事件與通知中心":"运营事件与通知中心","集中查看安全事件、錢包切換、管理員異動、鏈上營運狀態與裝置通知。":"集中查看安全事件、钱包切换、管理员异动、链上运营状态与设备通知。","正在確認管理員身分…":"正在确认管理员身份…","重新整理事件":"重新整理事件","正在整理事件…":"正在整理事件…","正在檢查通知權限…":"正在检查通知权限…","本版具備雙模式提醒：瀏覽器支援時使用 Android 系統通知；不支援時自動改用頁面內大型提醒＋震動。App 完全關閉後的背景即時推播，仍需要另外建立 Push 後端。":"本版具备双模式提醒：浏览器支持时使用 Android 系统通知；不支持时自动改用页面内大型提醒＋震动。App 完全关闭后的背景即时推送，仍需要另外建立 Push 后端。","會員很多時可能需要數秒；此操作只讀取稽核，不修改會員資料。":"会员很多时可能需要数秒；此操作只读取稽核，不修改会员资料。","無附加說明":"无附加说明","目前沒有符合條件的事件。":"目前没有符合条件的事件。","正式版本已更新":"正式版本已更新","IPT 合約已暫停":"IPT 合约已暂停","IPT 合約已恢復":"IPT 合约已恢复","出現候任管理者":"出现候任管理员","候任管理者已清除":"候任管理员已清除","鏈上營運狀態檢查失敗":"链上运营状态检查失败","正式版本資訊讀取失敗":"正式版本信息读取失败","正在載入會員稽核…":"正在加载会员稽核…","系統通知已允許。新重要／警告事件可顯示 Android 通知。":"系统通知已允许。新重要／警告事件可显示 Android 通知。","目前瀏覽器不支援 Android 系統通知；已自動改用頁面內提醒＋震動。":"当前浏览器不支持 Android 系统通知；已自动改用页面内提醒＋震动。","測試頁面內提醒已送出。":"测试页面内提醒已送出。","版本、快取、PWA、Supabase、Sepolia 與 IPT 合約健康檢查。":"版本、缓存、PWA、Supabase、Sepolia 与 IPT 合约健康检查。","正式發佈版本":"正式发布版本","讀取中…":"读取中…","檢查中…":"检查中…","正在確認版本…":"正在确认版本…","待檢查":"待检查","會員登入與資料庫連線":"会员登录与数据库连接","區塊高度與 RPC 回應":"区块高度与 RPC 响应","totalSupply / paused 可讀性":"totalSupply / paused 可读性","登入會員":"登录会员","Supabase Session / 會員資料":"Supabase Session / 会员资料","重新執行健康檢查":"重新执行健康检查","重新載入頁面":"重新加载页面","快取尚未操作。":"缓存尚未操作。","尚未產生。":"尚未生成。","複製診斷資訊":"复制诊断信息","診斷資訊已複製。":"诊断信息已复制。","集中管理管理員權限、會員停權、錢包驗證狀態、會員稽核與高風險操作入口。":"集中管理管理员权限、会员停权、钱包验证状态、会员稽核与高风险操作入口。","正在驗證管理員權限…":"正在验证管理员权限…","正在分析安全狀態…":"正在分析安全状态…","管理員可以操作會員權限與高風險功能。降級其他管理員前，系統會要求再次輸入會員編號；目前登入的管理員自己不提供角色修改按鈕。":"管理员可以操作会员权限与高风险功能。降级其他管理员前，系统会要求再次输入会员编号；当前登录的管理员自己不提供角色修改按钮。","正在整理錢包狀態…":"正在整理钱包状态…","以下功能會直接影響鏈上資產或管理權。進入後仍會使用目前正式版已驗證的前置檢查與二次確認。":"以下功能会直接影响链上资产或管理权。进入后仍会使用当前正式版已验证的前置检查与二次确认。","Mint 發行":"Mint 发行","管理權交接":"管理权交接","完整會員管理":"完整会员管理","目前帳戶":"当前账户","查看稽核":"查看稽核","目前沒有管理員資料。":"目前没有管理员资料。","安全明細":"安全明细","查看錢包明細":"查看钱包明细","會直接改變會員權限。是否繼續？":"会直接改变会员权限。是否继续？","請輸入會員編號":"请输入会员编号","會員編號不一致，操作已取消。":"会员编号不一致，操作已取消。","正在載入安全明細…":"正在加载安全明细…","最近管理稽核":"最近管理稽核","正式營運狀態、高風險操作保護、錢包切換紀錄、管理員稽核與快速維運入口。":"正式运营状态、高风险操作保护、钱包切换记录、管理员稽核与快速运维入口。","正在確認管理員權限…":"正在确认管理员权限…","正在執行正式營運安全檢查…":"正在执行正式运营安全检查…","未驗證錢包":"未验证钱包","正在分析帳戶安全狀態…":"正在分析账户安全状态…","正在讀取本機安全紀錄…":"正在读取本机安全记录…","清除本機安全紀錄":"清除本机安全记录","開啟鏈上操作":"打开链上操作","正在讀取目前管理員的稽核資訊…":"正在读取当前管理员的稽核信息…","尚無稽核紀錄。":"尚无稽核记录。","目前沒有本機高風險操作紀錄。":"目前没有本机高风险操作记录。","Independent Points 目前正式版本、鏈路與穩定元件。":"Independent Points 当前正式版本、链路与稳定组件。","目前版本":"当前版本","正式穩定整合版":"正式稳定整合版","鏈上操作中心":"链上操作中心","目前正式報表模組":"当前正式报表模块","鏈上環境":"链上环境","全系統統一版本與導覽":"全系统统一版本与导航","收款 QR Code":"收款 QR Code","首頁資產最後更新時間":"首页资产最后更新时间","風險提示與二次確認":"风险提示与二次确认","正式模組版本集中管理":"正式模块版本集中管理","更新管理":"更新管理","安全管理":"安全管理","高風險安全視窗":"高风险安全窗口","一次送簽後重新鎖定":"一次送签后重新锁定","營運事件中心":"运营事件中心","通知模式":"通知模式","裝置端｜App／頁面開啟期間監測":"设备端｜App／页面开启期间监测","更新前檢查、正式版本紀錄、發佈檔案清單、更新後驗證與快速回復。":"更新前检查、正式版本记录、发布文件清单、更新后验证与快速恢复。","管理員權限":"管理员权限","版本資訊":"版本信息","目前頁面":"当前页面","正在讀取版本資訊…":"正在读取版本信息…","執行更新前檢查":"执行更新前检查","尚未執行。":"尚未执行。","執行更新後健康驗證":"执行更新后健康验证","正在載入發佈清單…":"正在加载发布清单…","檢查 Service Worker 更新":"检查 Service Worker 更新","重設舊版 Service Worker":"重置旧版 Service Worker","尚未操作。":"尚未操作。","若新版本異常，先清除 IPT 快取並重新載入；若仍異常，再重新上傳指定回復版本，不需改動 Supabase、Owner、pendingOwner 或 paused 狀態。":"若新版本异常，先清除 IPT 缓存并重新加载；若仍异常，再重新上传指定恢复版本，不需改动 Supabase、Owner、pendingOwner 或 paused 状态。","Independent Points｜列印／PDF 預覽":"Independent Points｜打印／PDF 预览","開啟系統列印／另存 PDF":"打开系统打印／另存 PDF","返回報表":"返回报表","若 Android 沒有跳出系統列印畫面，仍可在此預覽報表；可再使用瀏覽器右上角選單的分享／列印功能。":"若 Android 没有跳出系统打印画面，仍可在此预览报表；可再使用浏览器右上角菜单的分享／打印功能。","找不到列印資料，請返回資產報表重新按「列印／PDF 預覽」。":"找不到打印资料，请返回资产报表重新按「打印／PDF 预览」。","版本：":"版本：","產生時間：":"生成时间：","會員：":"会员：","錢包：":"钱包：","篩選：":"筛选：","類型":"类型","數量":"数量","無交易紀錄":"无交易记录","會員搜尋：":"会员搜索：","區間轉入":"区间转入","區間轉出":"区间转出","淨變動":"净变动","筆數":"笔数","無會員資料":"无会员资料","營運安全保護":"运营安全保护","高風險交易目前鎖定。完成原本前置檢查後，還需要啟用一次 60 秒操作視窗。":"高风险交易当前锁定。完成原本前置检查后，还需要启用一次 60 秒操作窗口。","尚未核對":"尚未核对","⚠️ Mint 會真正改變鏈上總供給量。請再次核對領取地址與發行數量；前置檢查通過後，也不要在驗收時送出真正交易。":"⚠️ Mint 会真正改变链上总供应量。请再次核对领取地址与发行数量；前置检查通过后，也不要在验收时送出真正交易。","僅管理者可發行 IPT。請確認領取地址與數量後，再由 Trust Wallet 核准。":"仅管理员可发行 IPT。请确认领取地址与数量后，再由 Trust Wallet 核准。","只有 Owner 連線並讀取合約後才可檢查。":"只有 Owner 连接并读取合约后才可检查。","⚠️ Pause 會停止 IPT 轉帳；Unpause 會恢復交易。此操作會真正改變合約狀態，驗收時請只做前置檢查。":"⚠️ Pause 会停止 IPT 转账；Unpause 会恢复交易。此操作会真正改变合约状态，验收时请只做前置检查。","暫停會停止 IPT 交易；恢復後可繼續使用。此操作只限管理者。":"暂停会停止 IPT 交易；恢复后可继续使用。此操作只限管理员。","管理權交接屬高風險操作。候任管理者地址必須逐字核對；提出交接後，還需要 pendingOwner 使用自己的錢包簽名接任。":"管理权交接属高风险操作。候任管理员地址必须逐字核对；提出交接后，还需要 pendingOwner 使用自己的钱包签名接任。","管理權交接分兩步：現任管理者先提出候任者，候任者再用自己的錢包簽名接任。":"管理权交接分两步：现任管理员先提出候任者，候任者再用自己的钱包签名接任。","已登入":"已登录","會員功能與管理中心均已開放。":"会员功能与管理中心均已开放。","主錢包：尚未綁定":"主钱包：尚未绑定","目前先顯示上次成功讀取的資產摘要；需要最新資料時再按下方更新。":"当前先显示上次成功读取的资产摘要；需要最新资料时再按下方更新。","最後更新：":"最后更新：","檢查直接安裝":"检查直接安装","PWA 基礎已就緒。若沒有直接安裝視窗，請使用「用 Chrome 開啟安裝」。":"PWA 基础已就绪。若没有直接安装窗口，请使用「用 Chrome 打开安装」。"};const en={"管理員資產彙總報表":"Admin Asset Summary Report","管理員資產彙總":"Admin Asset Summary","管理員資產總覽 × 彙總報表 × CSV 匯出 × 列印／PDF":"Admin Asset Overview × Summary Report × CSV Export × Print / PDF","正在檢查管理員登入狀態…":"Checking admin sign-in status…","重新整理資產":"Refresh Assets","返回上一頁":"Back","全站資產摘要":"Platform Asset Summary","會員總數":"Total Members","已綁定錢包":"Wallets Linked","已驗證錢包":"Verified Wallets","會員 IPT 總餘額":"Total Member IPT Balance","IPT 鏈上總發行量":"IPT On-chain Total Supply","尚未綁定錢包":"Wallets Not Linked","此頁只讀取資料，不執行 Mint、Transfer、Burn 或管理權交易。":"This page is read-only and does not perform Mint, Transfer, Burn, or ownership transactions.","會員資產篩選":"Member Asset Filters","全部狀態":"All Statuses","停權":"Suspended","全部角色":"All Roles","全部錢包":"All Wallets","已綁定":"Linked","未綁定":"Not Linked","全部驗證":"All Verification","未驗證":"Unverified","套用篩選":"Apply Filters","清除篩選":"Clear Filters","尚未載入。":"Not loaded.","管理員彙總報表":"Admin Summary Report","會員搜尋":"Member Search","產生彙總報表":"Generate Summary Report","清除報表條件":"Clear Report Filters","尚未產生報表。日期留空代表目前可載入的全部鏈上交易範圍。":"No report generated yet. Leave dates blank to use the full available on-chain transaction range.","產生報表後，可使用 Android 原生分享／儲存 CSV，或開啟列印／PDF 預覽。":"After generating the report, use Android native share/save for CSV or open the Print/PDF preview.","符合會員數":"Matching Members","區間累計轉入":"Period Incoming","區間累計轉出":"Period Outgoing","區間淨變動":"Period Net Change","資產變動筆數":"Asset Change Count","會員區間彙總":"Member Period Summary","區間交易紀錄":"Period Transactions","會員資產列表":"Member Asset List","單一會員資產明細":"Single Member Asset Details","關閉明細":"Close Details","顯示":"Showing","位會員":"members","沒有符合條件的會員。":"No matching members.","已停權":"Suspended","錢包已驗證":"Wallet Verified","錢包未驗證":"Wallet Unverified","IPT 餘額":"IPT Balance","主錢包地址":"Primary Wallet Address","查看資產明細":"View Asset Details","查看鏈上地址":"View On-chain Address","目前沒有 IPT Transfer 紀錄。":"No IPT Transfer records.","轉入筆數":"Incoming Count","轉出筆數":"Outgoing Count","會員管理":"Member Management","Supabase 雲端會員狀態、角色、錢包驗證與管理紀錄":"Supabase member status, roles, wallet verification, and admin history","管理員狀態":"Admin Status","正在載入…":"Loading…","會員摘要":"Member Summary","常用收款人":"Saved Recipients","搜尋會員":"Search Members","會員列表":"Member List","角色與停權操作會直接影響會員權限。系統會保護目前管理員自己與其他管理員，送出前仍請再次核對。":"Role and suspension changes directly affect member access. The system protects the current admin and other admins; verify carefully before submitting.","會員完整資料":"Full Member Details","關閉詳細資料":"Close Details","恢復會員":"Reactivate Member","降為一般會員":"Demote to Member","升級為管理員":"Promote to Admin","加入時間":"Joined","查看詳細":"View Details","正在載入會員資料…":"Loading member data…","正在更新會員狀態…":"Updating member status…","正在更新會員角色…":"Updating member role…","正在載入完整資料…":"Loading full details…","最近管理紀錄":"Recent Admin History","尚無管理紀錄":"No admin history","營運事件與通知中心":"Operations Events & Alerts Center","集中查看安全事件、錢包切換、管理員異動、鏈上營運狀態與裝置通知。":"View security events, wallet switches, admin changes, on-chain operational status, and device alerts in one place.","正在確認管理員身分…":"Checking admin identity…","重新整理事件":"Refresh Events","正在整理事件…":"Preparing events…","正在檢查通知權限…":"Checking notification permission…","本版具備雙模式提醒：瀏覽器支援時使用 Android 系統通知；不支援時自動改用頁面內大型提醒＋震動。App 完全關閉後的背景即時推播，仍需要另外建立 Push 後端。":"Dual-mode alerts: Android system notifications when supported, otherwise in-page alerts with vibration. Background push while the app is fully closed still requires a Push backend.","會員很多時可能需要數秒；此操作只讀取稽核，不修改會員資料。":"This may take a few seconds with many members. It only reads audit data and does not modify member data.","無附加說明":"No additional details","目前沒有符合條件的事件。":"No events match the current filters.","正式版本已更新":"Production version updated","IPT 合約已暫停":"IPT contract paused","IPT 合約已恢復":"IPT contract resumed","出現候任管理者":"Pending owner detected","候任管理者已清除":"Pending owner cleared","鏈上營運狀態檢查失敗":"On-chain status check failed","正式版本資訊讀取失敗":"Production version check failed","正在載入會員稽核…":"Loading member audit…","系統通知已允許。新重要／警告事件可顯示 Android 通知。":"System notifications are enabled. New critical/warning events can trigger Android notifications.","目前瀏覽器不支援 Android 系統通知；已自動改用頁面內提醒＋震動。":"This browser does not support Android system notifications. In-page alerts with vibration are enabled instead.","測試頁面內提醒已送出。":"Test in-page alert sent.","版本、快取、PWA、Supabase、Sepolia 與 IPT 合約健康檢查。":"Version, cache, PWA, Supabase, Sepolia, and IPT contract health checks.","正式發佈版本":"Production Release","讀取中…":"Loading…","檢查中…":"Checking…","正在確認版本…":"Checking version…","待檢查":"Pending","會員登入與資料庫連線":"Member sign-in and database connectivity","區塊高度與 RPC 回應":"Block height and RPC response","totalSupply / paused 可讀性":"totalSupply / paused readability","登入會員":"Signed-in Member","Supabase Session / 會員資料":"Supabase Session / Member Data","重新執行健康檢查":"Run Health Check Again","重新載入頁面":"Reload Page","快取尚未操作。":"Cache has not been modified.","尚未產生。":"Not generated.","複製診斷資訊":"Copy Diagnostics","診斷資訊已複製。":"Diagnostics copied.","集中管理管理員權限、會員停權、錢包驗證狀態、會員稽核與高風險操作入口。":"Manage admin access, member suspensions, wallet verification, member audit, and high-risk operations.","正在驗證管理員權限…":"Verifying admin access…","正在分析安全狀態…":"Analyzing security status…","管理員可以操作會員權限與高風險功能。降級其他管理員前，系統會要求再次輸入會員編號；目前登入的管理員自己不提供角色修改按鈕。":"Admins can manage member access and high-risk features. Demoting another admin requires re-entering the member number. The signed-in admin cannot change their own role here.","正在整理錢包狀態…":"Preparing wallet status…","以下功能會直接影響鏈上資產或管理權。進入後仍會使用目前正式版已驗證的前置檢查與二次確認。":"The following functions directly affect on-chain assets or ownership. Existing pre-checks and secondary confirmation remain in place.","Mint 發行":"Mint IPT","管理權交接":"Ownership Handover","完整會員管理":"Full Member Management","目前帳戶":"Current Account","查看稽核":"View Audit","目前沒有管理員資料。":"No admin data available.","安全明細":"Security Details","查看錢包明細":"View Wallet Details","會直接改變會員權限。是否繼續？":"This will directly change member access. Continue?","請輸入會員編號":"Enter member number","會員編號不一致，操作已取消。":"Member number does not match. Operation cancelled.","正在載入安全明細…":"Loading security details…","最近管理稽核":"Recent Admin Audit","正式營運狀態、高風險操作保護、錢包切換紀錄、管理員稽核與快速維運入口。":"Production status, high-risk protection, wallet switch history, admin audit, and quick operations access.","正在確認管理員權限…":"Checking admin access…","正在執行正式營運安全檢查…":"Running production security checks…","未驗證錢包":"Unverified Wallets","正在分析帳戶安全狀態…":"Analyzing account security…","正在讀取本機安全紀錄…":"Loading local security events…","清除本機安全紀錄":"Clear Local Security Events","開啟鏈上操作":"Open On-chain Operations","正在讀取目前管理員的稽核資訊…":"Loading current admin audit…","尚無稽核紀錄。":"No audit records.","目前沒有本機高風險操作紀錄。":"No local high-risk operation records.","Independent Points 目前正式版本、鏈路與穩定元件。":"Current Independent Points production version, network path, and stable modules.","目前版本":"Current Version","正式穩定整合版":"Stable Production Integration","鏈上操作中心":"On-chain Operations Center","目前正式報表模組":"Current Production Reporting Module","鏈上環境":"On-chain Environment","全系統統一版本與導覽":"Unified system version and navigation","收款 QR Code":"Receiving QR Code","首頁資產最後更新時間":"Home asset last-update time","風險提示與二次確認":"Risk warnings and secondary confirmation","正式模組版本集中管理":"Centralized production module versions","更新管理":"Update Management","安全管理":"Security Management","高風險安全視窗":"High-risk Security Window","一次送簽後重新鎖定":"Relock after one signing attempt","營運事件中心":"Operations Event Center","通知模式":"Notification Mode","裝置端｜App／頁面開啟期間監測":"Device-side | Monitored while app/page is open","更新前檢查、正式版本紀錄、發佈檔案清單、更新後驗證與快速回復。":"Pre-update checks, production release history, release file list, post-update verification, and rollback.","管理員權限":"Admin Access","版本資訊":"Version Information","目前頁面":"Current Page","正在讀取版本資訊…":"Loading version information…","執行更新前檢查":"Run Pre-update Check","尚未執行。":"Not run yet.","執行更新後健康驗證":"Run Post-update Health Check","正在載入發佈清單…":"Loading release file list…","檢查 Service Worker 更新":"Check Service Worker Update","重設舊版 Service Worker":"Reset Old Service Worker","尚未操作。":"No action taken.","若新版本異常，先清除 IPT 快取並重新載入；若仍異常，再重新上傳指定回復版本，不需改動 Supabase、Owner、pendingOwner 或 paused 狀態。":"If a new version fails, clear IPT cache and reload first. If the issue remains, re-upload the specified rollback version. Do not change Supabase, Owner, pendingOwner, or paused state.","Independent Points｜列印／PDF 預覽":"Independent Points | Print / PDF Preview","開啟系統列印／另存 PDF":"Open System Print / Save PDF","返回報表":"Back to Report","若 Android 沒有跳出系統列印畫面，仍可在此預覽報表；可再使用瀏覽器右上角選單的分享／列印功能。":"If Android does not open the system print dialog, preview the report here and use the browser menu for Share / Print.","找不到列印資料，請返回資產報表重新按「列印／PDF 預覽」。":"No print data found. Return to the asset report and press Print / PDF Preview again.","版本：":"Version:","產生時間：":"Generated:","會員：":"Member:","錢包：":"Wallet:","篩選：":"Filters:","類型":"Type","數量":"Amount","無交易紀錄":"No transactions","會員搜尋：":"Member Search:","區間轉入":"Period In","區間轉出":"Period Out","淨變動":"Net Change","筆數":"Count","無會員資料":"No member data","營運安全保護":"Operations Security Guard","高風險交易目前鎖定。完成原本前置檢查後，還需要啟用一次 60 秒操作視窗。":"High-risk transactions are locked. After the existing pre-check, enable a 60-second operation window.","尚未核對":"Not Verified","⚠️ Mint 會真正改變鏈上總供給量。請再次核對領取地址與發行數量；前置檢查通過後，也不要在驗收時送出真正交易。":"⚠️ Mint changes the on-chain total supply. Recheck the recipient address and amount. During testing, do not submit a real transaction even after the pre-check passes.","僅管理者可發行 IPT。請確認領取地址與數量後，再由 Trust Wallet 核准。":"Only the administrator can mint IPT. Verify the recipient address and amount, then approve in Trust Wallet.","只有 Owner 連線並讀取合約後才可檢查。":"Only the connected Owner can perform this check after loading the contract.","⚠️ Pause 會停止 IPT 轉帳；Unpause 會恢復交易。此操作會真正改變合約狀態，驗收時請只做前置檢查。":"⚠️ Pause stops IPT transfers; Unpause restores them. This changes the contract state. During testing, run the pre-check only.","暫停會停止 IPT 交易；恢復後可繼續使用。此操作只限管理者。":"Pausing stops IPT transactions; unpausing resumes them. Admin only.","管理權交接屬高風險操作。候任管理者地址必須逐字核對；提出交接後，還需要 pendingOwner 使用自己的錢包簽名接任。":"Ownership handover is high risk. Verify the pending owner address character by character. After proposing, the pending owner must sign with their own wallet to accept.","管理權交接分兩步：現任管理者先提出候任者，候任者再用自己的錢包簽名接任。":"Ownership handover has two steps: the current owner proposes a successor, then the pending owner signs with their own wallet to accept.","已登入":"Signed In","會員功能與管理中心均已開放。":"Member features and Admin Center are available.","主錢包：尚未綁定":"Primary Wallet: Not Linked","目前先顯示上次成功讀取的資產摘要；需要最新資料時再按下方更新。":"The last successfully loaded asset summary is shown first. Press Update below when you need fresh data.","最後更新：":"Last Updated:","檢查直接安裝":"Check Direct Install","PWA 基礎已就緒。若沒有直接安裝視窗，請使用「用 Chrome 開啟安裝」。":"PWA basics are ready. If no install dialog appears, use Open in Chrome to Install."};if(window.IPTI18N?.dictionaries){Object.assign(window.IPTI18N.dictionaries['zh-CN'],zh);Object.assign(window.IPTI18N.dictionaries['en'],en);}})();

;(() => {const zh={"前置檢查後，由 Trust Wallet 核准":"前置检查后，由 Trust Wallet 核准","已建立":"已建立","待讀取鏈上 Owner":"待读取链上 Owner","管理者 Owner":"管理员 Owner","候任管理者 pendingOwner":"候任管理员 pendingOwner","一般錢包":"一般钱包","重新讀取 IPT 鏈上資料":"重新读取 IPT 链上数据","重新讀取鏈上資料":"重新读取链上数据","資料不一致":"数据不一致","讀取失敗":"读取失败","正在讀取 Sepolia…":"正在读取 Sepolia…","登入成功：已開放會員資產與管理員彙總報表。":"登录成功：已开放会员资产与管理员汇总报表。","登入成功：已開放我的資產報表。":"登录成功：已开放我的资产报表。","首頁已就緒。需要完整鏈上統計時，再按「更新完整資產摘要」。":"首页已就绪。需要完整链上统计时，再按「更新完整资产摘要」。","資產摘要已更新。首頁其餘功能不會等待鏈上交易掃描。":"资产摘要已更新。首页其余功能不会等待链上交易扫描。","正在讀取 Sepolia IPT 餘額與交易統計；其他按鈕仍可使用。":"正在读取 Sepolia IPT 余额与交易统计；其他按钮仍可使用。","資產摘要暫時無法更新，可直接使用下方功能或進入「我的資產」查看。":"资产摘要暂时无法更新，可直接使用下方功能或进入「我的资产」查看。","按下更新":"按下更新","找不到會員資料。":"找不到会员资料。","會員目前為停權狀態，會員資產入口已停用。":"会员目前为停权状态，会员资产入口已停用。","會員目前為停權狀態，資產報表入口已停用。":"会员目前为停权状态，资产报表入口已停用。"};const en={"前置檢查後，由 Trust Wallet 核准":"After the pre-check, approve in Trust Wallet","已建立":"Established","待讀取鏈上 Owner":"Waiting for on-chain Owner","管理者 Owner":"Admin Owner","候任管理者 pendingOwner":"Pending Owner","一般錢包":"Regular Wallet","重新讀取 IPT 鏈上資料":"Reload IPT On-chain Data","重新讀取鏈上資料":"Reload On-chain Data","資料不一致":"Data Mismatch","讀取失敗":"Load Failed","正在讀取 Sepolia…":"Loading Sepolia…","登入成功：已開放會員資產與管理員彙總報表。":"Signed in: My Asset Report and Admin Summary Report are available.","登入成功：已開放我的資產報表。":"Signed in: My Asset Report is available.","首頁已就緒。需要完整鏈上統計時，再按「更新完整資產摘要」。":"Home is ready. Press Update Full Asset Summary when you need full on-chain statistics.","資產摘要已更新。首頁其餘功能不會等待鏈上交易掃描。":"Asset summary updated. Other home features do not wait for the on-chain transaction scan.","正在讀取 Sepolia IPT 餘額與交易統計；其他按鈕仍可使用。":"Loading Sepolia IPT balance and transaction statistics; other buttons remain available.","資產摘要暫時無法更新，可直接使用下方功能或進入「我的資產」查看。":"The asset summary cannot be updated right now. You can still use the features below or open My Assets.","按下更新":"Tap to Update","找不到會員資料。":"Member data not found.","會員目前為停權狀態，會員資產入口已停用。":"This member is suspended. Member asset access is disabled.","會員目前為停權狀態，資產報表入口已停用。":"This member is suspended. Asset report access is disabled."};if(window.IPTI18N?.dictionaries){Object.assign(window.IPTI18N.dictionaries['zh-CN'],zh);Object.assign(window.IPTI18N.dictionaries['en'],en);}})();

;(() => {const zh={"例如 0.01":"例如 0.01","尚未連線或合約尚未驗證":"尚未连接或合约尚未验证","鏈上資料已更新，請重新檢查管理操作。":"链上数据已更新，请重新检查管理操作。","鏈上資料已更新，請重新檢查管理權操作。":"链上数据已更新，请重新检查管理权操作。","候任管理者要「接任」時，不需要輸入地址。請先切換 Trust Wallet 到 pendingOwner 對應的錢包，重新連線並讀取合約，再執行下方檢查。":"候任管理员要「接任」时，不需要输入地址。请先将 Trust Wallet 切换到 pendingOwner 对应的钱包，重新连接并读取合约，再执行下方检查。","只有現任 Owner 連線並讀取合約後，才可提出交接。":"只有当前 Owner 连接并读取合约后，才可提出交接。","只有 Owner 連線並讀取合約後才可操作。":"只有 Owner 连接并读取合约后才可操作。","目前錢包既不是現任 Owner，也不是 pendingOwner，因此管理權操作已停用。":"当前钱包既不是现任 Owner，也不是 pendingOwner，因此管理权操作已停用。","候任管理者地址已變更，請重新檢查。":"候任管理员地址已变更，请重新检查。","正在檢查提出交接…":"正在检查提出交接…","正在檢查接任管理權…":"正在检查接任管理权…","請重新檢查管理權操作。":"请重新检查管理权操作。","請重新檢查管理操作。":"请重新检查管理操作。","正在檢查管理操作…":"正在检查管理操作…","鏈上已經 paused = true。":"链上已经 paused = true。","鏈上已經 paused = false。":"链上已经 paused = false。","Owner 已改變；請重新讀取資料。":"Owner 已改变；请重新读取数据。","Owner 已改變；請重新讀取資料後再檢查 Mint。":"Owner 已改变；请重新读取数据后再检查 Mint。","目前錢包不是鏈上 Owner，不能 Mint。Owner：":"当前钱包不是链上 Owner，不能 Mint。Owner：","目前錢包不是鏈上 Owner，不能執行此管理操作。Owner：":"当前钱包不是链上 Owner，不能执行此管理操作。Owner：","請先完成對應的管理操作檢查。":"请先完成对应的管理操作检查。","請先完成 Mint 前檢查。":"请先完成 Mint 前检查。","請先完成轉帳前檢查。":"请先完成转账前检查。","收款地址已變更，請重新檢查。":"收款地址已变更，请重新检查。","轉移數量已變更，請重新檢查。":"转移数量已变更，请重新检查。","領取地址已變更，請重新檢查。":"领取地址已变更，请重新检查。","發行數量已變更，請重新檢查。":"发行数量已变更，请重新检查。","銷毀數量已變更，請重新檢查。":"销毁数量已变更，请重新检查。","等待 Trust Wallet…":"等待 Trust Wallet…","等待 Trust Wallet 交易回覆":"等待 Trust Wallet 交易回复","等待 Trust Wallet Mint 回覆":"等待 Trust Wallet Mint 回复","等待 Trust Wallet Burn 回覆":"等待 Trust Wallet Burn 回复","等待 Trust Wallet 管理交易回覆":"等待 Trust Wallet 管理交易回复","結果不明":"结果不明","正常":"正常","資料不一致":"数据不一致","待讀取鏈上 Owner":"待读取链上 Owner","管理者 Owner":"管理员 Owner","候任管理者 pendingOwner":"候任管理员 pendingOwner","無":"无","收合進階功能":"收合高级功能","進階功能":"高级功能","目前尚未取得錢包地址。":"目前尚未取得钱包地址。","錢包地址已複製。":"钱包地址已复制。","此瀏覽器不支援分享，內容已複製。":"此浏览器不支持分享，内容已复制。","分享未完成，可改用複製錢包地址。":"分享未完成，可改用复制钱包地址。","目前尚未取得有效錢包地址。":"目前尚未取得有效钱包地址。","重新產生 QR Code":"重新生成 QR Code","Mint 會真正發行 IPT。是否確定已核對地址與數量，並要送交 Trust Wallet？":"Mint 会真正发行 IPT。是否确定已核对地址与数量，并要送交 Trust Wallet？","Pause 會停止 IPT 轉帳。是否確定要送交 Trust Wallet？":"Pause 会停止 IPT 转账。是否确定要送交 Trust Wallet？","是否確定要恢復 IPT 轉帳？":"是否确定要恢复 IPT 转账？","管理權交接屬高風險操作。是否確定已再次核對候任管理者地址，並要提出交接？":"管理权交接属高风险操作。是否确定已再次核对候任管理员地址，并要提出交接？","接任管理權會讓目前錢包成為新的 Owner。是否確定要送出接任交易？":"接任管理权会让当前钱包成为新的 Owner。是否确定要送出接任交易？"};const en={"例如 0.01":"e.g. 0.01","尚未連線或合約尚未驗證":"Not connected or contract not verified","鏈上資料已更新，請重新檢查管理操作。":"On-chain data has been updated. Please recheck the admin operation.","鏈上資料已更新，請重新檢查管理權操作。":"On-chain data has been updated. Please recheck the ownership operation.","候任管理者要「接任」時，不需要輸入地址。請先切換 Trust Wallet 到 pendingOwner 對應的錢包，重新連線並讀取合約，再執行下方檢查。":"When the pending owner accepts ownership, no address input is required. Switch Trust Wallet to the wallet matching pendingOwner, reconnect, load the contract, then run the check below.","只有現任 Owner 連線並讀取合約後，才可提出交接。":"Only the current Owner can propose a handover after connecting and loading the contract.","只有 Owner 連線並讀取合約後才可操作。":"Only the Owner can perform this operation after connecting and loading the contract.","目前錢包既不是現任 Owner，也不是 pendingOwner，因此管理權操作已停用。":"The current wallet is neither the Owner nor pendingOwner, so ownership operations are disabled.","候任管理者地址已變更，請重新檢查。":"The pending owner address changed. Please run the pre-check again.","正在檢查提出交接…":"Checking ownership proposal…","正在檢查接任管理權…":"Checking ownership acceptance…","請重新檢查管理權操作。":"Please recheck the ownership operation.","請重新檢查管理操作。":"Please recheck the admin operation.","正在檢查管理操作…":"Checking admin operation…","鏈上已經 paused = true。":"On-chain state is already paused = true.","鏈上已經 paused = false。":"On-chain state is already paused = false.","Owner 已改變；請重新讀取資料。":"Owner changed. Please reload on-chain data.","Owner 已改變；請重新讀取資料後再檢查 Mint。":"Owner changed. Reload on-chain data, then recheck Mint.","目前錢包不是鏈上 Owner，不能 Mint。Owner：":"The current wallet is not the on-chain Owner and cannot Mint. Owner: ","目前錢包不是鏈上 Owner，不能執行此管理操作。Owner：":"The current wallet is not the on-chain Owner and cannot perform this admin operation. Owner: ","請先完成對應的管理操作檢查。":"Complete the matching admin pre-check first.","請先完成 Mint 前檢查。":"Complete the Mint pre-check first.","請先完成轉帳前檢查。":"Complete the transfer pre-check first.","收款地址已變更，請重新檢查。":"Recipient address changed. Please recheck.","轉移數量已變更，請重新檢查。":"Transfer amount changed. Please recheck.","領取地址已變更，請重新檢查。":"Recipient address changed. Please recheck.","發行數量已變更，請重新檢查。":"Mint amount changed. Please recheck.","銷毀數量已變更，請重新檢查。":"Burn amount changed. Please recheck.","等待 Trust Wallet…":"Waiting for Trust Wallet…","等待 Trust Wallet 交易回覆":"Waiting for Trust Wallet transaction response","等待 Trust Wallet Mint 回覆":"Waiting for Trust Wallet Mint response","等待 Trust Wallet Burn 回覆":"Waiting for Trust Wallet Burn response","等待 Trust Wallet 管理交易回覆":"Waiting for Trust Wallet admin transaction response","結果不明":"Result Unknown","正常":"Normal","資料不一致":"Data Mismatch","待讀取鏈上 Owner":"Waiting for On-chain Owner","管理者 Owner":"Admin Owner","候任管理者 pendingOwner":"Pending Owner","無":"None","收合進階功能":"Collapse Advanced Features","進階功能":"Advanced Features","目前尚未取得錢包地址。":"Wallet address is not available yet.","錢包地址已複製。":"Wallet address copied.","此瀏覽器不支援分享，內容已複製。":"This browser does not support sharing. The content was copied instead.","分享未完成，可改用複製錢包地址。":"Sharing was not completed. You can copy the wallet address instead.","目前尚未取得有效錢包地址。":"A valid wallet address is not available yet.","重新產生 QR Code":"Regenerate QR Code","Mint 會真正發行 IPT。是否確定已核對地址與數量，並要送交 Trust Wallet？":"Mint will issue IPT on-chain. Have you verified the address and amount and want to send this to Trust Wallet?","Pause 會停止 IPT 轉帳。是否確定要送交 Trust Wallet？":"Pause will stop IPT transfers. Send this operation to Trust Wallet?","是否確定要恢復 IPT 轉帳？":"Are you sure you want to resume IPT transfers?","管理權交接屬高風險操作。是否確定已再次核對候任管理者地址，並要提出交接？":"Ownership handover is high risk. Have you rechecked the pending owner address and want to submit the proposal?","接任管理權會讓目前錢包成為新的 Owner。是否確定要送出接任交易？":"Accepting ownership will make the current wallet the new Owner. Submit the acceptance transaction?"};if(window.IPTI18N?.dictionaries){Object.assign(window.IPTI18N.dictionaries['zh-CN'],zh);Object.assign(window.IPTI18N.dictionaries['en'],en);}})();

;(() => {const zh={"需留意：":"需留意：","錢包：":"钱包：","Wallet:尚未綁定":"Wallet:尚未绑定","Saved Recipients：":"Saved Recipients：","管理員驗證通過：":"管理员验证通过：","營運狀態":"运营状态","檢查失敗":"检查失败","需檢查":"需检查","近 24 小時：":"近 24 小时：","錢包切換":"钱包切换","安全阻擋":"安全阻挡","高風險送簽":"高风险送签","60 秒安全視窗逾時":"60 秒安全窗口逾时","60 秒安全視窗啟用":"60 秒安全窗口启用","錢包安全核對失敗":"钱包安全核对失败","帳戶安全與權限":"账户安全与权限","搜尋事件、會員、錢包、備註…":"搜索事件、会员、钱包、备注…","IPT 營運提醒":"IPT 运营提醒","鏈上營運狀態檢查失敗":"链上运营状态检查失败","已讀取":"已读取","筆最近管理稽核；近 24 小時未發現角色／狀態異動。":"笔最近管理稽核；近 24 小时未发现角色／状态异动。","沒有需要立即處理的項目。":"没有需要立即处理的项目。","位會員錢包尚未驗證":"位会员钱包尚未验证","位會員目前停權":"位会员目前停权","未綁定錢包":"未绑定钱包","已綁定但未驗證":"已绑定但未验证","查看錢包明細":"查看钱包明细"};const en={"需留意：":"Attention: ","錢包：":"Wallet: ","Wallet:尚未綁定":"Wallet: Not Linked","Saved Recipients：":"Saved Recipients: ","管理員驗證通過：":"Admin verified: ","營運狀態":"Operations Status","檢查失敗":"Check Failed","需檢查":"Needs Review","近 24 小時：":"Last 24 hours: ","錢包切換":"Wallet Switches","安全阻擋":"Security Blocks","高風險送簽":"High-risk Signing Attempts","60 秒安全視窗逾時":"60-second Security Window Expired","60 秒安全視窗啟用":"60-second Security Window Enabled","錢包安全核對失敗":"Wallet Security Verification Failed","帳戶安全與權限":"Security & Access","搜尋事件、會員、錢包、備註…":"Search events, members, wallets, notes…","IPT 營運提醒":"IPT Operations Alert","鏈上營運狀態檢查失敗":"On-chain status check failed","已讀取":"Loaded ","筆最近管理稽核；近 24 小時未發現角色／狀態異動。":" recent admin audit records; no role/status changes found in the last 24 hours.","沒有需要立即處理的項目。":"No items require immediate action.","位會員錢包尚未驗證":" member wallet(s) are unverified","位會員目前停權":" member(s) are suspended","未綁定錢包":"Wallet Not Linked","已綁定但未驗證":"Linked but Unverified","查看錢包明細":"View Wallet Details"};if(window.IPTI18N?.dictionaries){Object.assign(window.IPTI18N.dictionaries['zh-CN'],zh);Object.assign(window.IPTI18N.dictionaries['en'],en);}})();

;(() => {const zh={"查看 IPT 點數":"查看 IPT 点数","目前餘額與鏈上供給量":"当前余额与链上供应量","連接 Trust Wallet 並讀取鏈上資料後，即可查看 IPT 餘額。":"连接 Trust Wallet 并读取链上数据后，即可查看 IPT 余额。","IPT 轉帳":"IPT 转账","前置檢查後，由 Trust Wallet 核准":"前置检查后，由 Trust Wallet 核准","連接 Trust Wallet 並讀取鏈上資料後，即可進行轉帳前置檢查。":"连接 Trust Wallet 并读取链上数据后，即可进行转账前置检查。","IPT 收款":"IPT 收款","顯示、複製或分享你的 Sepolia 收款地址":"显示、复制或分享你的 Sepolia 收款地址","連接 Trust Wallet 後即可取得收款地址。":"连接 Trust Wallet 后即可取得收款地址。","交易紀錄":"交易记录","查看目前錢包的 Sepolia IPT 交易":"查看当前钱包的 Sepolia IPT 交易","連接 Trust Wallet 後即可查看鏈上交易紀錄。":"连接 Trust Wallet 后即可查看链上交易记录。","Mint 發行 IPT":"Mint 发行 IPT","僅 Owner 可執行":"仅 Owner 可执行","請先連接 Trust Wallet、讀取鏈上資料並確認目前錢包是 Owner。":"请先连接 Trust Wallet、读取链上数据并确认当前钱包是 Owner。","暫停／恢復 IPT":"暂停／恢复 IPT","管理合約交易狀態":"管理合约交易状态","管理權交接":"管理权交接","Owner / pendingOwner 雙步驟交接":"Owner / pendingOwner 双步骤交接","請先連接 Trust Wallet 並讀取鏈上資料；確認 Owner 或 pendingOwner 後會顯示管理權操作。":"请先连接 Trust Wallet 并读取链上数据；确认 Owner 或 pendingOwner 后会显示管理权操作。"};const en={"查看 IPT 點數":"View IPT Balance","目前餘額與鏈上供給量":"Current balance and on-chain supply","連接 Trust Wallet 並讀取鏈上資料後，即可查看 IPT 餘額。":"Connect Trust Wallet and load on-chain data to view your IPT balance.","IPT 轉帳":"IPT Transfer","前置檢查後，由 Trust Wallet 核准":"Pre-check first, then approve in Trust Wallet","連接 Trust Wallet 並讀取鏈上資料後，即可進行轉帳前置檢查。":"Connect Trust Wallet and load on-chain data to run the transfer pre-check.","IPT 收款":"Receive IPT","顯示、複製或分享你的 Sepolia 收款地址":"Show, copy, or share your Sepolia receiving address","連接 Trust Wallet 後即可取得收款地址。":"Connect Trust Wallet to get your receiving address.","交易紀錄":"Transaction History","查看目前錢包的 Sepolia IPT 交易":"View Sepolia IPT transactions for the current wallet","連接 Trust Wallet 後即可查看鏈上交易紀錄。":"Connect Trust Wallet to view on-chain transaction history.","Mint 發行 IPT":"Mint IPT","僅 Owner 可執行":"Owner only","請先連接 Trust Wallet、讀取鏈上資料並確認目前錢包是 Owner。":"Connect Trust Wallet, load on-chain data, and confirm the current wallet is the Owner.","暫停／恢復 IPT":"Pause / Unpause IPT","管理合約交易狀態":"Manage contract transfer status","管理權交接":"Ownership Handover","Owner / pendingOwner 雙步驟交接":"Two-step Owner / pendingOwner handover","請先連接 Trust Wallet 並讀取鏈上資料；確認 Owner 或 pendingOwner 後會顯示管理權操作。":"Connect Trust Wallet and load on-chain data. Ownership controls appear after confirming Owner or pendingOwner."};if(window.IPTI18N?.dictionaries){Object.assign(window.IPTI18N.dictionaries['zh-CN'],zh);Object.assign(window.IPTI18N.dictionaries['en'],en);}})();

;(() => {const zh={"時間：":"时间：","區塊：":"区块：","查看鏈上交易":"查看链上交易","會員編號／暱稱／Email／錢包地址":"会员编号／昵称／Email／钱包地址","錢包：":"钱包：","尚未綁定":"尚未绑定","常用收款人：":"常用收款人：","筆":"笔","會員目前為停權狀態":"会员目前为停权状态","安全總覽":"安全总览","需留意：":"需留意：","目前帳戶":"当前账户","未綁定錢包":"未绑定钱包","已綁定但未驗證":"已绑定但未验证","高風險操作紀錄（本機）":"高风险操作记录（本机）","近 24 小時：":"近 24 小时：","安全阻擋":"安全阻挡","高風險送簽":"高风险送签","60 秒安全視窗逾時":"60 秒安全窗口逾时","60 秒安全視窗啟用":"60 秒安全窗口启用","錢包安全核對失敗":"钱包安全核对失败","最近管理稽核":"最近管理稽核","已讀取 0 筆最近管理稽核；近 24 小時未發現角色／狀態異動。":"已读取 0 笔最近管理稽核；近 24 小时未发现角色／状态异动。","帳戶安全與權限":"账户安全与权限","快速安全維運":"快速安全运维","營運狀態":"运营状态","檢查失敗":"检查失败","需檢查":"需检查","鏈上安全狀態讀取失敗：":"链上安全状态读取失败：","管理員驗證通過：":"管理员验证通过：","版本資訊載入失敗：":"版本信息加载失败：","發佈清單載入失敗。":"发布清单加载失败。","檢查完成：":"检查完成：","項失敗":"项失败","項注意":"项注意","全部通過。":"全部通过。","已啟用":"已启用","未啟用或尚未接管頁面":"未启用或尚未接管页面","正式檔案完整性":"正式文件完整性","個必要檔案可讀":"个必要文件可读","正在檢查 Service Worker 更新…":"正在检查 Service Worker 更新…","已完成更新檢查。":"已完成更新检查。","已重設 Service Worker 與 IPT 快取。請按「重新載入」。":"已重置 Service Worker 与 IPT 缓存。请按「重新加载」。","維運中心":"运维中心","系統資訊":"系统信息","目前版本":"当前版本","正式穩定整合版":"正式稳定整合版","鏈上操作中心":"链上操作中心","正式產品化里程碑":"正式产品化里程碑","正式模組版本集中管理":"正式模块版本集中管理","更新管理":"更新管理","安全管理":"安全管理","正式營運安全":"正式运营安全","營運事件中心":"运营事件中心","裝置端｜App／頁面開啟期間監測":"设备端｜App／页面开启期间监测","搜尋事件、會員、錢包、備註…":"搜索事件、会员、钱包、备注…","高風險安全":"高风险安全","系統／鏈上":"系统／链上","未讀":"未读","重要／警告":"重要／警告","全部來源":"全部来源","全部等級":"全部等级","全部狀態":"全部状态","全部標記已讀":"全部标记已读","營運提醒":"运营提醒","鏈上營運狀態檢查失敗":"链上运营状态检查失败","版本更新中心":"版本更新中心","正式發佈檔案清單":"正式发布文件清单","版本更新歷程":"版本更新历史","異常回復":"异常恢复","回復版本":"恢复版本"};const en={"時間：":"Time: ","區塊：":"Block: ","查看鏈上交易":"View On-chain Transaction","會員編號／暱稱／Email／錢包地址":"Member number / nickname / Email / wallet address","錢包：":"Wallet: ","尚未綁定":"Not Linked","常用收款人：":"Saved Recipients: ","筆":" records","會員目前為停權狀態":"Member is suspended","安全總覽":"Security Overview","需留意：":"Attention: ","目前帳戶":"Current Account","未綁定錢包":"Wallet Not Linked","已綁定但未驗證":"Linked but Unverified","高風險操作紀錄（本機）":"High-risk Events (Local)","近 24 小時：":"Last 24 hours: ","安全阻擋":"Security Blocks","高風險送簽":"High-risk Signing Attempts","60 秒安全視窗逾時":"60-second Security Window Expired","60 秒安全視窗啟用":"60-second Security Window Enabled","錢包安全核對失敗":"Wallet Security Verification Failed","最近管理稽核":"Recent Admin Audit","已讀取 0 筆最近管理稽核；近 24 小時未發現角色／狀態異動。":"Loaded 0 recent admin audit records; no role/status changes found in the last 24 hours.","帳戶安全與權限":"Security & Access","快速安全維運":"Security Operations","營運狀態":"Operations Status","檢查失敗":"Check Failed","需檢查":"Needs Review","鏈上安全狀態讀取失敗：":"On-chain security status read failed: ","管理員驗證通過：":"Admin verified: ","版本資訊載入失敗：":"Version information load failed: ","發佈清單載入失敗。":"Release file list failed to load.","檢查完成：":"Check complete: ","項失敗":" failed","項注意":" warning(s)","全部通過。":"All checks passed.","已啟用":"Active","未啟用或尚未接管頁面":"Inactive or not controlling the page yet","正式檔案完整性":"Production File Integrity","個必要檔案可讀":" required files readable","正在檢查 Service Worker 更新…":"Checking Service Worker update…","已完成更新檢查。":"Update check completed.","已重設 Service Worker 與 IPT 快取。請按「重新載入」。":"Service Worker and IPT cache reset. Press Reload.","維運中心":"Operations Center","系統資訊":"System Info","目前版本":"Current Version","正式穩定整合版":"Stable Production Integration","鏈上操作中心":"On-chain Operations Center","正式產品化里程碑":"Production Milestone","正式模組版本集中管理":"Centralized Production Module Versions","更新管理":"Update Management","安全管理":"Security Management","正式營運安全":"Production Security","營運事件中心":"Operations Event Center","裝置端｜App／頁面開啟期間監測":"Device-side | monitored while app/page is open","搜尋事件、會員、錢包、備註…":"Search events, members, wallets, notes…","高風險安全":"High-risk Security","系統／鏈上":"System / On-chain","未讀":"Unread","重要／警告":"Critical / Warning","全部來源":"All Sources","全部等級":"All Levels","全部狀態":"All Statuses","全部標記已讀":"Mark All Read","營運提醒":"Operations Alert","鏈上營運狀態檢查失敗":"On-chain status check failed","版本更新中心":"Version Update Center","正式發佈檔案清單":"Production Release File List","版本更新歷程":"Release History","異常回復":"Recovery","回復版本":"Rollback Version"};if(window.IPTI18N?.dictionaries){Object.assign(window.IPTI18N.dictionaries['zh-CN'],zh);Object.assign(window.IPTI18N.dictionaries['en'],en);}})();

;(() => {const zh={"管理權交接屬高風險操作。候任管理者地址必須逐字核對；提出交接後，還需要 pendingOwner 使用自己的錢包簽名接任。":"管理权交接属高风险操作。候任管理员地址必须逐字核对；提出交接后，还需要 pendingOwner 使用自己的钱包签名接任。"};const en={"管理權交接屬高風險操作。候任管理者地址必須逐字核對；提出交接後，還需要 pendingOwner 使用自己的錢包簽名接任。":"Ownership handover is high risk. Verify the pending owner address character by character. After proposing the handover, pendingOwner must sign with their own wallet to accept ownership."};if(window.IPTI18N?.dictionaries){Object.assign(window.IPTI18N.dictionaries['zh-CN'],zh);Object.assign(window.IPTI18N.dictionaries['en'],en);}})();

;(() => {const zh={"會員管理已載入｜管理員：":"会员管理已加载｜管理员："};const en={"會員管理已載入｜管理員：":"Member Management loaded | Admin: "};if(window.IPTI18N?.dictionaries){Object.assign(window.IPTI18N.dictionaries['zh-CN'],zh);Object.assign(window.IPTI18N.dictionaries['en'],en);}})();

;(() => {const zh={"尚未綁定":"尚未绑定","加入時間":"加入时间","加入時間：":"加入时间：","Email：":"Email：","錢包：":"钱包：","常用收款人：":"常用收款人："};const en={"尚未綁定":"Not Linked","加入時間":"Joined","加入時間：":"Joined: ","Email：":"Email: ","錢包：":"Wallet: ","常用收款人：":"Saved Recipients: "};if(window.IPTI18N?.dictionaries){Object.assign(window.IPTI18N.dictionaries['zh-CN'],zh);Object.assign(window.IPTI18N.dictionaries['en'],en);}})();

;(() => {const zh={"錢包：尚未綁定":"钱包：尚未绑定","Wallet: 尚未綁定":"Wallet: 尚未绑定"};const en={"錢包：尚未綁定":"Wallet: Not Linked","Wallet: 尚未綁定":"Wallet: Not Linked"};if(window.IPTI18N?.dictionaries){Object.assign(window.IPTI18N.dictionaries['zh-CN'],zh);Object.assign(window.IPTI18N.dictionaries['en'],en);}})();

;(() => {const zh={"請確認收款地址與數量。系統會先檢查鏈上餘額與交易狀態，再交由 Trust Wallet 核准。 若畫面逾時，先重新讀取鏈上資料，不要立即重送。":"请确认收款地址与数量。系统会先检查链上余额与交易状态，再交由 Trust Wallet 核准。若画面超时，先重新读取链上数据，不要立即重送。"};const en={"請確認收款地址與數量。系統會先檢查鏈上餘額與交易狀態，再交由 Trust Wallet 核准。 若畫面逾時，先重新讀取鏈上資料，不要立即重送。":"Verify the recipient address and amount. The system checks the on-chain balance and transaction status before Trust Wallet approval. If the page times out, reload on-chain data before trying again."};if(window.IPTI18N?.dictionaries){Object.assign(window.IPTI18N.dictionaries['zh-CN'],zh);Object.assign(window.IPTI18N.dictionaries['en'],en);}})();

;(() => {const zh={"帳戶安全／MFA":"账户安全／MFA","登入驗證、驗證器 App、二次驗證與登出":"登录验证、验证器 App、二次验证与登出","目前尚未登入會員。請先完成會員登入。":"目前尚未登录会员。请先完成会员登录。"};const en={"帳戶安全／MFA":"Account Security / MFA","登入驗證、驗證器 App、二次驗證與登出":"Sign-in verification, authenticator app, MFA, and sign-out","目前尚未登入會員。請先完成會員登入。":"You are not signed in. Complete member sign-in first."};if(window.IPTI18N?.dictionaries){Object.assign(window.IPTI18N.dictionaries['zh-CN'],zh);Object.assign(window.IPTI18N.dictionaries['en'],en);}})();

;(() => {
  const zh={"會員登入／帳戶安全":"会员登录／账户安全"};
  const en={"會員登入／帳戶安全":"Member Sign-in / Security"};
  if(window.IPTI18N?.dictionaries){
    Object.assign(window.IPTI18N.dictionaries["zh-CN"],zh);
    Object.assign(window.IPTI18N.dictionaries["en"],en);
  }
})();

;(() => {const zh={"正式營運狀態正常：合約未暫停、目前沒有 pendingOwner。":"正式运营状态正常：合约未暂停、目前没有 pendingOwner。"};const en={"正式營運狀態正常：合約未暫停、目前沒有 pendingOwner。":"Production operations are normal: the contract is not paused and there is currently no pendingOwner."};if(window.IPTI18N?.dictionaries){Object.assign(window.IPTI18N.dictionaries['zh-CN'],zh);Object.assign(window.IPTI18N.dictionaries['en'],en);}})();


;(() => {
  const zh={"雙模式平台錢包":"双模式平台钱包","P、平台 IPT、會員互轉、QR 收款與 Trust Wallet 提領":"P、平台 IPT、会员互转、QR 收款与 Trust Wallet 提领","提領審核":"提领审核","核准平台 IPT 提領、Trust Wallet Mint 與鏈上驗證":"核准平台 IPT 提领、Trust Wallet Mint 与链上验证","Independent Points V4.14.2｜雙模式錢包":"Independent Points V4.14.2｜双模式钱包","V4.14.2 HF2｜雙模式錢包":"V4.14.2 HF2｜双模式钱包","平台錢包 Off-chain ＋ Trust Wallet On-chain，同一頁分開顯示、分開記帳。":"平台钱包 Off-chain ＋ Trust Wallet On-chain，同一页分开显示、分开记账。","返回正式首頁":"返回正式首页","重新整理資產":"重新整理资产","我的資產總覽":"我的资产总览","P 點數｜平台帳本":"P 点数｜平台账本","兌換來源：平台 P 錢包":"兑换来源：平台 P 钱包","平台 IPT｜Off-chain":"平台 IPT｜Off-chain","儲存在 Supabase 平台帳本":"储存在 Supabase 平台账本","鏈上 IPT｜On-chain":"链上 IPT｜On-chain","儲存在 Ethereum Sepolia 智能合約":"储存在 Ethereum Sepolia 智能合约","顯示合計":"显示合计","僅供資產總覽；平台與鏈上仍是兩本不同帳。":"仅供资产总览；平台与链上仍是两本不同账。","資產已更新。平台與鏈上餘額分開保存、分開記帳。":"资产已更新。平台与链上余额分开保存、分开记账。","P → 平台 IPT":"P → 平台 IPT","要兌換的 P":"要兑换的 P","預計獲得":"预计获得","確認兌換":"确认兑换","P 餘額不足。":"P 余额不足。","兌換取得的是「平台 IPT」，不會自動轉入 Trust Wallet，也不會產生 Gas。":"兑换取得的是「平台 IPT」，不会自动转入 Trust Wallet，也不会产生 Gas。","平台 IPT 收款":"平台 IPT 收款","我的平台會員編號":"我的平台会员编号","複製會員編號":"复制会员编号","分享收款資訊":"分享收款信息","QR Code 會先開啟公開收款確認頁；掃碼本身不會直接付款。":"QR Code 会先打开公开收款确认页；扫码本身不会直接付款。","對方掃描後可直接帶入你的會員編號，再確認轉帳。":"对方扫描后可直接带入你的会员编号，再确认转账。","平台 IPT 會員互轉":"平台 IPT 会员互转","平台內部轉帳，不上鏈、不需要 Trust Wallet、不產生 Gas。":"平台内部转账，不上链、不需要 Trust Wallet、不产生 Gas。","收款會員編號":"收款会员编号","查詢收款會員":"查询收款会员","轉帳數量（平台 IPT）":"转账数量（平台 IPT）","備註（選填）":"备注（选填）","確認平台轉帳":"确认平台转账","平台 IPT 轉帳紀錄":"平台 IPT 转账记录","全部":"全部","轉出":"转出","轉入":"转入","平台帳本紀錄":"平台账本记录","鏈上錢包操作":"链上钱包操作","鏈上轉帳":"链上转账","鏈上交易筆數":"链上交易笔数","目前綁定地址的 IPT 歷史":"当前绑定地址的 IPT 历史","已驗證":"已验证","未驗證":"未验证","尚未綁定 Trust Wallet":"尚未绑定 Trust Wallet","平台 IPT 提領到 Trust Wallet":"平台 IPT 提领到 Trust Wallet","提領會先鎖定平台 IPT，經管理員核准與 Sepolia 鏈上驗證完成後才正式結算。":"提领会先锁定平台 IPT，经管理员核准与 Sepolia 链上验证完成后才正式结算。","目前測試範圍":"当前测试范围","V4.14.2 正式開放：平台資產讀取、P → 平台 IPT、平台 IPT 會員互轉、平台收款 QR Code、登入後自動返回付款頁、平台轉帳明細、鏈上 IPT 唯讀整合。":"V4.14.2 正式开放：平台资产读取、P → 平台 IPT、平台 IPT 会员互转、平台收款 QR Code、登录后自动返回付款页、平台转账明细、链上 IPT 只读整合。","「平台 IPT → Trust Wallet」提領已正式開放；鏈上 IPT → 平台 IPT 與雙向 Bridge 仍未開放。":"「平台 IPT → Trust Wallet」提领已正式开放；链上 IPT → 平台 IPT 与双向 Bridge 仍未开放。","正在讀取平台錢包與鏈上 IPT…":"正在读取平台钱包与链上 IPT…","尚未讀取資產。":"尚未读取资产。","前往帳戶安全":"前往账户安全","正在驗證會員登入":"正在验证会员登录","正在確認會員身分與受信任裝置，請稍候。":"正在确认会员身份与受信任设备，请稍候。","需要有效會員登入。請先到帳戶安全重新登入。":"需要有效会员登录。请先到账户安全重新登录。","這個裝置尚未通過受信任裝置驗證。請先到帳戶安全完成驗證。":"这个设备尚未通过受信任设备验证。请先到账户安全完成验证。","正在安全處理兌換，請勿重複點擊…":"正在安全处理兑换，请勿重复点击…","兌換數量必須是 120 P 的整數倍。":"兑换数量必须是 120 P 的整数倍。","系統會同時扣除 P、增加平台 IPT，任何一步失敗都不會留下半筆交易。":"系统会同时扣除 P、增加平台 IPT，任何一步失败都不会留下半笔交易。","正在查詢收款會員…":"正在查询收款会员…","找不到收款會員":"找不到收款会员","請先輸入完整會員編號並查詢收款人。":"请先输入完整会员编号并查询收款人。","收款會員已確認，請核對姓名與會員編號後再輸入轉帳金額。":"收款会员已确认，请核对姓名与会员编号后再输入转账金额。","收款會員已由安全付款連結確認，請輸入付款金額。":"收款会员已由安全付款链接确认，请输入付款金额。","正在安全處理平台轉帳，請勿重複點擊…":"正在安全处理平台转账，请勿重复点击…","轉帳完成後會同時建立「轉出 Debit」與「轉入 Credit」兩筆 Ledger。 任一步失敗，整筆交易都會回復。":"转账完成后会同时建立「转出 Debit」与「转入 Credit」两笔 Ledger。任一步失败，整笔交易都会恢复。","收款 QR Code 只包含會員編號與正式付款連結，不包含密碼或私鑰。":"收款 QR Code 只包含会员编号与正式付款链接，不包含密码或私钥。","Independent Points V4.14.2｜平台 IPT 提領":"Independent Points V4.14.2｜平台 IPT 提领","V4.14.2｜正式提領申請":"V4.14.2｜正式提领申请","平台 IPT → Trust Wallet":"平台 IPT → Trust Wallet","V4.14.2 已整合管理員核准、Trust Wallet Owner Mint 與 Sepolia 鏈上驗證；本頁只建立或取消提領申請，不直接送鏈。":"V4.14.2 已整合管理员核准、Trust Wallet Owner Mint 与 Sepolia 链上验证；本页只建立或取消提领申请，不直接送链。","平台 IPT":"平台 IPT","可用":"可用","鎖定":"锁定","平台 IPT 已更新。鎖定餘額不能再用於平台轉帳或再次提領。":"平台 IPT 已更新。锁定余额不能再用于平台转账或再次提领。","鏈上收款錢包":"链上收款钱包","Ethereum Sepolia 主錢包":"Ethereum Sepolia 主钱包","提領只能送到會員本人已驗證的 Primary Wallet；此頁不能臨時輸入其他 0x 地址。":"提领只能发送到会员本人已验证的 Primary Wallet；此页不能临时输入其他 0x 地址。","提領安全驗證":"提领安全验证","目前 MFA 驗證等級":"当前 MFA 验证等级","提領屬於高風險資產操作，必須完成 AAL2。":"提领属于高风险资产操作，必须完成 AAL2。","目前真正要送出的 JWT 已確認為 AAL2，可以建立提領申請。":"当前真正要发送的 JWT 已确认为 AAL2，可以建立提领申请。","前往帳戶安全完成 MFA":"前往账户安全完成 MFA","申請提領":"申请提领","這一版申請成功後只會把 IPT 從「可用」移到「鎖定」。不會上鏈，也不會增加鏈上 IPT。":"这一版申请成功后只会把 IPT 从「可用」移到「锁定」。不会上链，也不会增加链上 IPT。","提領數量（平台 IPT）":"提领数量（平台 IPT）","申請提領並鎖定":"申请提领并锁定","提領申請紀錄":"提领申请记录","本版安全範圍":"本版安全范围","✓ 不保存 Owner 私鑰":"✓ 不保存 Owner 私钥","✓ 不自動 Mint":"✓ 不自动 Mint","✓ 不送 Sepolia 交易":"✓ 不发送 Sepolia 交易","✓ pending 可由會員取消並全額解鎖":"✓ pending 可由会员取消并全额解锁","這一版只做申請、鎖定與取消；不會 Mint、不會送鏈、不會呼叫 Trust Wallet 簽署。":"这一版只做申请、锁定与取消；不会 Mint、不会送链、不会调用 Trust Wallet 签名。","提領申請屬高風險操作，後端會要求 Trusted Device + TOTP MFA + AAL2。":"提领申请属于高风险操作，后端会要求 Trusted Device + TOTP MFA + AAL2。","Independent Points V4.14.2｜提領 MFA 驗證":"Independent Points V4.14.2｜提领 MFA 验证","V4.14.2｜提領安全驗證":"V4.14.2｜提领安全验证","完成 MFA AAL2":"完成 MFA AAL2","提領上鏈屬高風險資產操作，必須用目前這個 Session 完成 TOTP 驗證。":"提领上链属于高风险资产操作，必须用当前这个 Session 完成 TOTP 验证。","輸入驗證器代碼":"输入验证器代码","完成 MFA 並返回提領頁":"完成 MFA 并返回提领页","返回提領頁":"返回提领页","驗證成功後，系統會重新取得 Session，並用新的 Access Token 再確認一次 AAL2。 只有確認成功才會返回提領頁。":"验证成功后，系统会重新取得 Session，并用新的 Access Token 再确认一次 AAL2。只有确认成功才会返回提领页。","Independent Points V4.14.2｜提領審核與鏈上 Mint":"Independent Points V4.14.2｜提领审核与链上 Mint","V4.14.2｜正式管理員提領審核":"V4.14.2｜正式管理员提领审核","審核後由 Owner Trust Wallet 親自 Mint；鏈上證明通過後，平台鎖定 IPT 才正式結算。":"审核后由 Owner Trust Wallet 亲自 Mint；链上证明通过后，平台锁定 IPT 才正式结算。","管理員安全狀態":"管理员安全状态","管理員安全驗證通過。可審核提領申請。":"管理员安全验证通过。可审核提领申请。","重新整理提領佇列":"重新整理提领队列","提領佇列":"提领队列","準備 Mint":"准备 Mint","Trust Wallet Owner Mint":"Trust Wallet Owner Mint","Mint 會真正增加 Sepolia 鏈上 IPT。只有 approved 申請才能進入此區；平台 locked IPT 在鏈上證明通過前不會正式扣除。":"Mint 会真正增加 Sepolia 链上 IPT。只有 approved 申请才能进入此区；平台 locked IPT 在链上证明通过前不会正式扣除。","提領 ID":"提领 ID","數量":"数量","會員":"会员","目的錢包":"目的钱包","用 Trust Wallet 開啟此頁（推薦）":"用 Trust Wallet 打开此页（推荐）","Android Chrome 若無法叫出簽名視窗，可改用 Trust Wallet 內建 DApp Browser。 在 Trust Wallet 內開啟後，系統會優先使用錢包直接注入的 Ethereum Provider。":"Android Chrome 若无法叫出签名窗口，可改用 Trust Wallet 内置 DApp Browser。在 Trust Wallet 内打开后，系统会优先使用钱包直接注入的 Ethereum Provider。","連接 Trust Wallet Owner":"连接 Trust Wallet Owner","尚未連接 Trust Wallet。":"尚未连接 Trust Wallet。","簽名模式：尚未判定。":"签名模式：尚未判定。","先檢查 Mint":"先检查 Mint","必須先連接 Owner 並選擇 approved 申請。":"必须先连接 Owner 并选择 approved 申请。","由 Trust Wallet 核准 Mint":"由 Trust Wallet 核准 Mint","鏈上交易驗證":"链上交易验证","交易雜湊":"交易哈希","登記 tx hash":"登记 tx hash","後端驗證鏈上結果":"后端验证链上结果","至少 2 個 confirmations 後才會完成平台結算。":"至少 2 个 confirmations 后才会完成平台结算。","Independent Points V4.14.2｜平台 IPT 收款確認":"Independent Points V4.14.2｜平台 IPT 收款确认","V4.14.2｜公開收款確認":"V4.14.2｜公开收款确认","先確認收款人，再登入自己的會員帳號完成平台 IPT 付款。":"先确认收款人，再登录自己的会员账号完成平台 IPT 付款。","正在確認收款人":"正在确认收款人","正在安全解析收款連結…":"正在安全解析收款链接…","登入後付款":"登录后付款","此頁不顯示收款人的 Email、密碼、Trust Wallet 私鑰或資產餘額。 掃描 QR Code 不會直接扣款；付款前仍需登入、必要的 MFA／受信任裝置驗證，以及最後一次轉帳確認。":"此页不显示收款人的 Email、密码、Trust Wallet 私钥或资产余额。扫描 QR Code 不会直接扣款；付款前仍需登录、必要的 MFA／受信任设备验证，以及最后一次转账确认。","收款人已由伺服器確認。請核對後再登入自己的會員帳號付款。":"收款人已由服务器确认。请核对后再登录自己的会员账号付款。","這個收款連結無效或不完整。":"这个收款链接无效或不完整。","這個收款連結目前無法使用，請向收款人索取新的 QR Code。":"这个收款链接目前无法使用，请向收款人索取新的 QR Code。"};
  const en={"雙模式平台錢包":"Dual-mode Platform Wallet","P、平台 IPT、會員互轉、QR 收款與 Trust Wallet 提領":"P, platform IPT, member transfers, QR receiving and Trust Wallet withdrawals","提領審核":"Withdrawal Review","核准平台 IPT 提領、Trust Wallet Mint 與鏈上驗證":"Approve platform IPT withdrawals, Trust Wallet Mint and on-chain verification","Independent Points V4.14.2｜雙模式錢包":"Independent Points V4.14.2 | Dual-mode Wallet","V4.14.2 HF2｜雙模式錢包":"V4.14.2 HF2 | Dual-mode Wallet","平台錢包 Off-chain ＋ Trust Wallet On-chain，同一頁分開顯示、分開記帳。":"Platform wallet Off-chain + Trust Wallet On-chain, displayed and accounted for separately on one page.","返回正式首頁":"Back to Official Home","重新整理資產":"Refresh Assets","我的資產總覽":"My Asset Overview","P 點數｜平台帳本":"P Points | Platform Ledger","兌換來源：平台 P 錢包":"Conversion source: platform P wallet","平台 IPT｜Off-chain":"Platform IPT | Off-chain","儲存在 Supabase 平台帳本":"Stored in the Supabase platform ledger","鏈上 IPT｜On-chain":"On-chain IPT | On-chain","儲存在 Ethereum Sepolia 智能合約":"Stored in the Ethereum Sepolia smart contract","顯示合計":"Display Total","僅供資產總覽；平台與鏈上仍是兩本不同帳。":"For overview only; platform and on-chain balances remain separate ledgers.","資產已更新。平台與鏈上餘額分開保存、分開記帳。":"Assets updated. Platform and on-chain balances are stored and accounted for separately.","P → 平台 IPT":"P → Platform IPT","要兌換的 P":"P to Convert","預計獲得":"Expected","確認兌換":"Confirm Conversion","P 餘額不足。":"Insufficient P balance.","兌換取得的是「平台 IPT」，不會自動轉入 Trust Wallet，也不會產生 Gas。":"The conversion creates Platform IPT. It is not automatically sent to Trust Wallet and does not use Gas.","平台 IPT 收款":"Platform IPT Receive","我的平台會員編號":"My Platform Member Number","複製會員編號":"Copy Member Number","分享收款資訊":"Share Receiving Info","QR Code 會先開啟公開收款確認頁；掃碼本身不會直接付款。":"The QR Code opens the public receiving confirmation page first; scanning alone does not make a payment.","對方掃描後可直接帶入你的會員編號，再確認轉帳。":"After scanning, the payer can load your member number and then confirm the transfer.","平台 IPT 會員互轉":"Platform IPT Member Transfer","平台內部轉帳，不上鏈、不需要 Trust Wallet、不產生 Gas。":"Internal platform transfer. No blockchain transaction, Trust Wallet, or Gas is required.","收款會員編號":"Recipient Member Number","查詢收款會員":"Find Recipient","轉帳數量（平台 IPT）":"Transfer Amount (Platform IPT)","備註（選填）":"Note (Optional)","確認平台轉帳":"Confirm Platform Transfer","平台 IPT 轉帳紀錄":"Platform IPT Transfer History","全部":"All","轉出":"Sent","轉入":"Received","平台帳本紀錄":"Platform Ledger History","鏈上錢包操作":"On-chain Wallet Actions","鏈上轉帳":"On-chain Transfer","鏈上交易筆數":"On-chain Transactions","目前綁定地址的 IPT 歷史":"IPT history for the currently linked address","已驗證":"Verified","未驗證":"Unverified","尚未綁定 Trust Wallet":"Trust Wallet Not Linked","平台 IPT 提領到 Trust Wallet":"Withdraw Platform IPT to Trust Wallet","提領會先鎖定平台 IPT，經管理員核准與 Sepolia 鏈上驗證完成後才正式結算。":"A withdrawal first locks Platform IPT and is settled only after admin approval and Sepolia on-chain verification.","目前測試範圍":"Current Scope","V4.14.2 正式開放：平台資產讀取、P → 平台 IPT、平台 IPT 會員互轉、平台收款 QR Code、登入後自動返回付款頁、平台轉帳明細、鏈上 IPT 唯讀整合。":"V4.14.2 enables platform asset reads, P → Platform IPT, member transfers, platform receiving QR Codes, automatic return after sign-in, platform transfer history, and read-only on-chain IPT integration.","「平台 IPT → Trust Wallet」提領已正式開放；鏈上 IPT → 平台 IPT 與雙向 Bridge 仍未開放。":"Platform IPT → Trust Wallet withdrawals are enabled. On-chain IPT → Platform IPT and a two-way bridge are not yet enabled.","正在讀取平台錢包與鏈上 IPT…":"Loading platform wallet and on-chain IPT…","尚未讀取資產。":"Assets not loaded yet.","前往帳戶安全":"Go to Account Security","正在驗證會員登入":"Verifying member sign-in","正在確認會員身分與受信任裝置，請稍候。":"Checking member identity and trusted device. Please wait.","需要有效會員登入。請先到帳戶安全重新登入。":"A valid member session is required. Sign in again from Account Security.","這個裝置尚未通過受信任裝置驗證。請先到帳戶安全完成驗證。":"This device has not passed trusted-device verification. Complete verification in Account Security first.","正在安全處理兌換，請勿重複點擊…":"Processing the conversion securely. Do not tap again…","兌換數量必須是 120 P 的整數倍。":"The conversion amount must be a multiple of 120 P.","系統會同時扣除 P、增加平台 IPT，任何一步失敗都不會留下半筆交易。":"The system deducts P and adds Platform IPT atomically. If any step fails, no partial transaction remains.","正在查詢收款會員…":"Looking up recipient…","找不到收款會員":"Recipient not found","請先輸入完整會員編號並查詢收款人。":"Enter the full member number and look up the recipient first.","收款會員已確認，請核對姓名與會員編號後再輸入轉帳金額。":"Recipient confirmed. Verify the name and member number before entering the transfer amount.","收款會員已由安全付款連結確認，請輸入付款金額。":"Recipient confirmed by the secure payment link. Enter the payment amount.","正在安全處理平台轉帳，請勿重複點擊…":"Processing the platform transfer securely. Do not tap again…","轉帳完成後會同時建立「轉出 Debit」與「轉入 Credit」兩筆 Ledger。 任一步失敗，整筆交易都會回復。":"The transfer creates both a Debit and Credit ledger entry. If any step fails, the whole transaction is rolled back.","收款 QR Code 只包含會員編號與正式付款連結，不包含密碼或私鑰。":"The receiving QR Code contains only the member number and official payment link, never passwords or private keys.","Independent Points V4.14.2｜平台 IPT 提領":"Independent Points V4.14.2 | Platform IPT Withdrawal","V4.14.2｜正式提領申請":"V4.14.2 | Production Withdrawal Request","平台 IPT → Trust Wallet":"Platform IPT → Trust Wallet","V4.14.2 已整合管理員核准、Trust Wallet Owner Mint 與 Sepolia 鏈上驗證；本頁只建立或取消提領申請，不直接送鏈。":"V4.14.2 integrates admin approval, Trust Wallet Owner Mint and Sepolia verification. This page only creates or cancels withdrawal requests and never sends a blockchain transaction directly.","平台 IPT":"Platform IPT","可用":"Available","鎖定":"Locked","平台 IPT 已更新。鎖定餘額不能再用於平台轉帳或再次提領。":"Platform IPT updated. Locked balance cannot be used for platform transfers or another withdrawal.","鏈上收款錢包":"On-chain Receiving Wallet","Ethereum Sepolia 主錢包":"Ethereum Sepolia Primary Wallet","提領只能送到會員本人已驗證的 Primary Wallet；此頁不能臨時輸入其他 0x 地址。":"Withdrawals can only be sent to the member's verified Primary Wallet. Another 0x address cannot be entered on this page.","提領安全驗證":"Withdrawal Security Verification","目前 MFA 驗證等級":"Current MFA Assurance Level","提領屬於高風險資產操作，必須完成 AAL2。":"Withdrawals are high-risk asset operations and require AAL2.","目前真正要送出的 JWT 已確認為 AAL2，可以建立提領申請。":"The JWT that will actually be sent has been confirmed as AAL2. A withdrawal request can be created.","前往帳戶安全完成 MFA":"Go to Account Security for MFA","申請提領":"Request Withdrawal","這一版申請成功後只會把 IPT 從「可用」移到「鎖定」。不會上鏈，也不會增加鏈上 IPT。":"A successful request only moves IPT from Available to Locked. It does not go on-chain or increase on-chain IPT.","提領數量（平台 IPT）":"Withdrawal Amount (Platform IPT)","申請提領並鎖定":"Request Withdrawal and Lock","提領申請紀錄":"Withdrawal Requests","本版安全範圍":"Security Scope","✓ 不保存 Owner 私鑰":"✓ Owner private key is never stored","✓ 不自動 Mint":"✓ No automatic Mint","✓ 不送 Sepolia 交易":"✓ No Sepolia transaction is sent","✓ pending 可由會員取消並全額解鎖":"✓ Pending requests can be cancelled by the member and fully unlocked","這一版只做申請、鎖定與取消；不會 Mint、不會送鏈、不會呼叫 Trust Wallet 簽署。":"This page only requests, locks, and cancels withdrawals. It does not Mint, send on-chain transactions, or call Trust Wallet for signing.","提領申請屬高風險操作，後端會要求 Trusted Device + TOTP MFA + AAL2。":"Withdrawal requests are high-risk operations. The backend requires Trusted Device + TOTP MFA + AAL2.","Independent Points V4.14.2｜提領 MFA 驗證":"Independent Points V4.14.2 | Withdrawal MFA Verification","V4.14.2｜提領安全驗證":"V4.14.2 | Withdrawal Security Verification","完成 MFA AAL2":"Complete MFA AAL2","提領上鏈屬高風險資產操作，必須用目前這個 Session 完成 TOTP 驗證。":"On-chain withdrawal is a high-risk asset operation. Complete TOTP verification in the current session.","輸入驗證器代碼":"Enter Authenticator Code","完成 MFA 並返回提領頁":"Complete MFA and Return to Withdrawal","返回提領頁":"Back to Withdrawal","驗證成功後，系統會重新取得 Session，並用新的 Access Token 再確認一次 AAL2。 只有確認成功才會返回提領頁。":"After verification, the system refreshes the session and rechecks AAL2 with the new Access Token. It returns to the withdrawal page only after confirmation succeeds.","Independent Points V4.14.2｜提領審核與鏈上 Mint":"Independent Points V4.14.2 | Withdrawal Review & On-chain Mint","V4.14.2｜正式管理員提領審核":"V4.14.2 | Production Admin Withdrawal Review","審核後由 Owner Trust Wallet 親自 Mint；鏈上證明通過後，平台鎖定 IPT 才正式結算。":"After approval, the Owner mints personally in Trust Wallet. Locked Platform IPT is settled only after on-chain proof passes.","管理員安全狀態":"Admin Security Status","管理員安全驗證通過。可審核提領申請。":"Admin security verification passed. Withdrawal requests can be reviewed.","重新整理提領佇列":"Refresh Withdrawal Queue","提領佇列":"Withdrawal Queue","準備 Mint":"Prepare Mint","Trust Wallet Owner Mint":"Trust Wallet Owner Mint","Mint 會真正增加 Sepolia 鏈上 IPT。只有 approved 申請才能進入此區；平台 locked IPT 在鏈上證明通過前不會正式扣除。":"Mint really increases Sepolia on-chain IPT. Only approved requests can enter this section; locked Platform IPT is not finalized until on-chain proof passes.","提領 ID":"Withdrawal ID","數量":"Amount","會員":"Member","目的錢包":"Destination Wallet","用 Trust Wallet 開啟此頁（推薦）":"Open This Page in Trust Wallet (Recommended)","Android Chrome 若無法叫出簽名視窗，可改用 Trust Wallet 內建 DApp Browser。 在 Trust Wallet 內開啟後，系統會優先使用錢包直接注入的 Ethereum Provider。":"If Android Chrome cannot open the signing prompt, use Trust Wallet's built-in DApp Browser. Inside Trust Wallet, the system prefers the wallet's injected Ethereum Provider.","連接 Trust Wallet Owner":"Connect Trust Wallet Owner","尚未連接 Trust Wallet。":"Trust Wallet is not connected.","簽名模式：尚未判定。":"Signing mode: not determined.","先檢查 Mint":"Pre-check Mint","必須先連接 Owner 並選擇 approved 申請。":"Connect the Owner and select an approved request first.","由 Trust Wallet 核准 Mint":"Approve Mint in Trust Wallet","鏈上交易驗證":"On-chain Transaction Verification","交易雜湊":"Transaction Hash","登記 tx hash":"Register tx hash","後端驗證鏈上結果":"Verify On-chain Result on Server","至少 2 個 confirmations 後才會完成平台結算。":"Platform settlement completes only after at least 2 confirmations.","Independent Points V4.14.2｜平台 IPT 收款確認":"Independent Points V4.14.2 | Platform IPT Receiving Confirmation","V4.14.2｜公開收款確認":"V4.14.2 | Public Receiving Confirmation","先確認收款人，再登入自己的會員帳號完成平台 IPT 付款。":"Confirm the recipient first, then sign in to your own member account to complete the Platform IPT payment.","正在確認收款人":"Confirming recipient","正在安全解析收款連結…":"Securely parsing receiving link…","登入後付款":"Sign In to Pay","此頁不顯示收款人的 Email、密碼、Trust Wallet 私鑰或資產餘額。 掃描 QR Code 不會直接扣款；付款前仍需登入、必要的 MFA／受信任裝置驗證，以及最後一次轉帳確認。":"This page does not show the recipient's Email, password, Trust Wallet private key, or asset balance. Scanning the QR Code does not debit funds; payment still requires sign-in, any required MFA/trusted-device verification, and final transfer confirmation.","收款人已由伺服器確認。請核對後再登入自己的會員帳號付款。":"The recipient has been confirmed by the server. Verify the details, then sign in to your own member account to pay.","這個收款連結無效或不完整。":"This receiving link is invalid or incomplete.","這個收款連結目前無法使用，請向收款人索取新的 QR Code。":"This receiving link is currently unavailable. Ask the recipient for a new QR Code."};
  if(window.IPTI18N?.dictionaries){
    Object.assign(window.IPTI18N.dictionaries["zh-CN"],zh);
    Object.assign(window.IPTI18N.dictionaries["en"],en);
  }
})();


/* V4.14.2 HF3 dynamic wallet terminology additions */
;(() => {
  function install(){
    const api=window.IPTI18N;
    if(!api?.dictionaries){
      setTimeout(install,50);
      return;
    }
    Object.assign(api.dictionaries["zh-CN"],{
      "V4.14.2 HF3｜雙模式錢包":"V4.14.2 HF3｜双模式钱包",
      "Trust Wallet／鏈上 IPT":"Trust Wallet／链上 IPT",
      "綁定錢包":"绑定钱包",
      "P → IPT 兌換":"P → IPT 兑换",
      "P 發放":"P 发放",
      "平台 IPT 轉帳":"平台 IPT 转账",
      "交易":"交易",
      "對方":"对方",
      "狀態":"状态",
      "交易編號":"交易编号",
      "目前沒有平台帳本紀錄。":"目前没有平台账本记录。",
      "目前沒有符合條件的平台 IPT 轉帳紀錄。":"目前没有符合条件的平台 IPT 转账记录。"
    });
    Object.assign(api.dictionaries.en,{
      "V4.14.2 HF3｜雙模式錢包":"V4.14.2 HF3 | Dual-Mode Wallet",
      "Trust Wallet／鏈上 IPT":"Trust Wallet / On-chain IPT",
      "綁定錢包":"Linked Wallet",
      "P → IPT 兌換":"P → IPT Conversion",
      "P 發放":"P Credit",
      "平台 IPT 轉帳":"Platform IPT Transfer",
      "交易":"Transaction",
      "對方":"Counterparty",
      "狀態":"Status",
      "交易編號":"Transaction ID",
      "目前沒有平台帳本紀錄。":"No platform ledger records yet.",
      "目前沒有符合條件的平台 IPT 轉帳紀錄。":"No matching Platform IPT transfer records."
    });
    api.apply?.(document);
  }
  if(document.readyState==="loading"){
    window.addEventListener("DOMContentLoaded",install,{once:true});
  }else{
    install();
  }
})();


/* V4.14.2 HF4 multilingual final cleanup */
;(() => {
  function install(){
    const api=window.IPTI18N;
    if(!api?.dictionaries){
      setTimeout(install,50);
      return;
    }

    Object.assign(api.dictionaries["zh-CN"],{
      "V4.14.2 HF4｜雙模式錢包":"V4.14.2 HF4｜双模式钱包",
      "目前可用":"当前可用",
      "例如 IPT-00100002":"例如 IPT-00100002",
      "例如 30.00":"例如 30.00",
      "最多 200 字":"最多 200 字",
      "Trust Wallet／鏈上 IPT":"Trust Wallet／链上 IPT",
      "綁定錢包":"绑定钱包"
    });

    Object.assign(api.dictionaries.en,{
      "V4.14.2 HF4｜雙模式錢包":"V4.14.2 HF4 | Dual-Mode Wallet",
      "目前可用":"Available",
      "例如 IPT-00100002":"e.g. IPT-00100002",
      "例如 30.00":"e.g. 30.00",
      "最多 200 字":"Up to 200 characters",
      "Trust Wallet／鏈上 IPT":"Trust Wallet / On-chain IPT",
      "綁定錢包":"Linked Wallet"
    });

    // Re-apply after late dictionary additions so partially translated labels
    // such as "目前Available" are replaced from their stored original text.
    api.apply?.(document);

    // Force dynamic wallet sections to re-render with the completed dictionary.
    const lang=api.getLang?.() || localStorage.getItem("ipt_language") || "zh-TW";
    window.dispatchEvent(new CustomEvent("ipt-language-change",{detail:{lang}}));
  }

  if(document.readyState==="loading"){
    window.addEventListener("DOMContentLoaded",install,{once:true});
  }else{
    install();
  }
})();

;(() => {
  function installHF24(){
    const api=window.IPTI18N;
    if(!api?.dictionaries) return;

    Object.assign(api.dictionaries["zh-CN"],{
      "管理員 Email":"管理员 Email",
      "會員編號":"会员编号",
      "Admin 待確認":"Admin 待确认",
      "MFA AAL2 待確認":"MFA AAL2 待确认",
      "Trusted Device 待確認":"Trusted Device 待确认",
      "Admin ✅":"Admin ✅",
      "MFA AAL2 ✅":"MFA AAL2 ✅",
      "Trusted Device ✅":"Trusted Device ✅",
      "網路：":"网络：",
      "IPT 合約：":"IPT 合约：",
      "← 返回管理中心":"← 返回管理中心",
      "🏠 返回首頁":"🏠 返回首页",
      "🔐 前往完成 MFA":"🔐 前往完成 MFA",
      "🔐 MFA 已完成｜重新驗證":"🔐 MFA 已完成｜重新验证",
      "待審核":"待审核",
      "已核准":"已核准",
      "鏈上確認中":"链上确认中",
      "已完成":"已完成",
      "已取消／拒絕／失敗":"已取消／拒绝／失败",
      "已取消":"已取消",
      "已拒絕":"已拒绝",
      "失敗":"失败"
    });

    Object.assign(api.dictionaries.en,{
      "管理員 Email":"Admin Email",
      "會員編號":"Member Number",
      "Admin 待確認":"Admin Pending",
      "MFA AAL2 待確認":"MFA AAL2 Pending",
      "Trusted Device 待確認":"Trusted Device Pending",
      "Admin ✅":"Admin ✅",
      "MFA AAL2 ✅":"MFA AAL2 ✅",
      "Trusted Device ✅":"Trusted Device ✅",
      "網路：":"Network:",
      "IPT 合約：":"IPT Contract:",
      "← 返回管理中心":"← Back to Admin Center",
      "🏠 返回首頁":"🏠 Back to Home",
      "🔐 前往完成 MFA":"🔐 Complete MFA",
      "🔐 MFA 已完成｜重新驗證":"🔐 MFA Complete | Verify Again",
      "待審核":"Pending Review",
      "已核准":"Approved",
      "鏈上確認中":"On-chain Pending",
      "已完成":"Completed",
      "已取消／拒絕／失敗":"Cancelled / Rejected / Failed",
      "已取消":"Cancelled",
      "已拒絕":"Rejected",
      "失敗":"Failed"
    });

    api.apply?.(document);
    const lang=api.getLang?.() || localStorage.getItem("ipt_language") || "zh-TW";
    window.dispatchEvent(new CustomEvent("ipt-language-change",{detail:{lang}}));
  }

  if(document.readyState==="loading"){
    window.addEventListener("DOMContentLoaded",installHF24,{once:true});
  }else{
    installHF24();
  }
})();

;(() => {
  function installHF27(){
    const api=window.IPTI18N;
    if(!api?.dictionaries) return;

    Object.assign(api.dictionaries["zh-CN"],{
      "🔑 變更密碼":"🔑 更改密码",
      "V4.14.2 正式整合雙模式平台錢包、120P 兌 100 IPT、平台會員互轉、QR 收款、平台 IPT 提領、管理員核准、Trust Wallet Owner Mint 與 Sepolia 鏈上驗證；原本通過驗證的鏈上錢包核心與安全中心繼續保留。":"V4.14.2 正式整合双模式平台钱包、120P 兑 100 IPT、平台会员互转、QR 收款、平台 IPT 提领、管理员核准、Trust Wallet Owner Mint 与 Sepolia 链上验证；原本通过验证的链上钱包核心与安全中心继续保留。"
    });

    Object.assign(api.dictionaries.en,{
      "🔑 變更密碼":"🔑 Change Password",
      "V4.14.2 正式整合雙模式平台錢包、120P 兌 100 IPT、平台會員互轉、QR 收款、平台 IPT 提領、管理員核准、Trust Wallet Owner Mint 與 Sepolia 鏈上驗證；原本通過驗證的鏈上錢包核心與安全中心繼續保留。":"V4.14.2 integrates the dual-mode platform wallet, 120P-to-100 IPT conversion, member-to-member platform transfers, QR payments, Platform IPT withdrawals, admin approval, Trust Wallet Owner Mint, and Sepolia on-chain verification, while retaining the previously verified on-chain wallet core and security center."
    });

    api.apply?.(document);
  }

  if(document.readyState==="loading"){
    window.addEventListener("DOMContentLoaded",installHF27,{once:true});
  }else{
    installHF27();
  }
})();

;(() => {
  function installHF28(){
    const api=window.IPTI18N;
    if(!api?.dictionaries) return;

    Object.assign(api.dictionaries["zh-CN"],{
      "正在確認 Admin + MFA AAL2 + Trusted Device…":"正在确认 Admin + MFA AAL2 + Trusted Device…",
      "尚未讀取。":"尚未读取。",
      "Independent Points V4.14.2｜會員管理":"Independent Points V4.14.2｜会员管理",
      "← V4.14.2 首頁":"← V4.14.2 首页",
      "Independent Points V4.14.2｜管理員資產彙總報表":"Independent Points V4.14.2｜管理员资产汇总报表",
      "Independent Points V4.14.2｜帳戶安全與權限中心":"Independent Points V4.14.2｜账户安全与权限中心",
      "Independent Points V4.14.2｜營運安全中心":"Independent Points V4.14.2｜运营安全中心",
      "Independent Points V4.14.2｜營運事件與通知中心":"Independent Points V4.14.2｜运营事件与通知中心",
      "Independent Points V4.14.2｜版本更新中心":"Independent Points V4.14.2｜版本更新中心",
      "進階診斷資訊":"高级诊断信息",
      "Independent Points V4.14.2｜資產中心":"Independent Points V4.14.2｜资产中心",
      "Independent Points V4.14.2｜我的資產報表":"Independent Points V4.14.2｜我的资产报表",
      "Independent Points V4.14.2 CORE｜錢包核心":"Independent Points V4.14.2 CORE｜钱包核心",
      "⚠️ 管理權交接屬高風險操作。候任管理者地址必須逐字核對；提出交接後，還需要 pendingOwner 使用自己的錢包簽名接任。":"⚠️ 管理权交接属于高风险操作。候任管理员地址必须逐字核对；提出交接后，还需要 pendingOwner 使用自己的钱包签名接任。",
      "候任管理者要「接任」時，不需要輸入地址。請先切換 Trust Wallet 到 pendingOwner 對應的錢包， 重新連線並讀取合約，再執行下方檢查。":"候任管理员要“接任”时，不需要输入地址。请先将 Trust Wallet 切换到 pendingOwner 对应的钱包，重新连接并读取合约，再执行下方检查。",
      "已整合鏈上讀取、Transfer、Burn、Mint、Pause / Unpause 與雙簽管理權交接。":"已整合链上读取、Transfer、Burn、Mint、Pause / Unpause 与双签管理权交接。",
      "Owner 與 pendingOwner 均以目前鏈上資料動態判定，不再綁定最初部署地址。":"Owner 与 pendingOwner 均以当前链上数据动态判定，不再绑定最初部署地址。",
      "讀取餘額、Transfer、Burn。":"读取余额、Transfer、Burn。",
      "另可 Mint、Pause / Unpause、提出 Ownership Transfer。":"另可 Mint、Pause / Unpause、提出 Ownership Transfer。",
      "可自行 Accept Ownership。":"可自行 Accept Ownership。",
      "前置模擬、Nonce / Gas 多節點備援、Gas Limit 預留、5 分鐘防重複送出。":"前置模拟、Nonce / Gas 多节点备用、Gas Limit 预留、5 分钟防重复发送。",
      "V4.14.2 HF5｜雙模式錢包":"V4.14.2 HF5｜双模式钱包",
      "120 P = 100.00 平台 IPT":"120 P = 100.00 平台 IPT",
      "尚未確認":"尚未确认",
      "檢查中":"检查中",
      "正在確認 MFA 狀態。":"正在确认 MFA 状态。",
      "正在確認目前登入帳號…":"正在确认当前登录账号…",
      "正在讀取目前 Access Token 的 AAL…":"正在读取当前 Access Token 的 AAL…",
      "驗證器":"验证器",
      "6 位數 TOTP 驗證碼":"6 位数 TOTP 验证码"
    });

    Object.assign(api.dictionaries.en,{
      "正在確認 Admin + MFA AAL2 + Trusted Device…":"Checking Admin + MFA AAL2 + Trusted Device…",
      "尚未讀取。":"Not loaded yet.",
      "Independent Points V4.14.2｜會員管理":"Independent Points V4.14.2 | Member Management",
      "← V4.14.2 首頁":"← V4.14.2 Home",
      "Independent Points V4.14.2｜管理員資產彙總報表":"Independent Points V4.14.2 | Admin Asset Summary",
      "Independent Points V4.14.2｜帳戶安全與權限中心":"Independent Points V4.14.2 | Account Security & Access",
      "Independent Points V4.14.2｜營運安全中心":"Independent Points V4.14.2 | Operations Security Center",
      "Independent Points V4.14.2｜營運事件與通知中心":"Independent Points V4.14.2 | Operations Events & Alerts",
      "Independent Points V4.14.2｜版本更新中心":"Independent Points V4.14.2 | Version Update Center",
      "進階診斷資訊":"Advanced Diagnostics",
      "Independent Points V4.14.2｜資產中心":"Independent Points V4.14.2 | Asset Center",
      "Independent Points V4.14.2｜我的資產報表":"Independent Points V4.14.2 | My Asset Report",
      "Independent Points V4.14.2 CORE｜錢包核心":"Independent Points V4.14.2 CORE | Wallet Core",
      "⚠️ 管理權交接屬高風險操作。候任管理者地址必須逐字核對；提出交接後，還需要 pendingOwner 使用自己的錢包簽名接任。":"⚠️ Ownership handover is a high-risk operation. Verify the pending owner address character by character. After proposing the transfer, the pendingOwner must sign with their own wallet to accept ownership.",
      "候任管理者要「接任」時，不需要輸入地址。請先切換 Trust Wallet 到 pendingOwner 對應的錢包， 重新連線並讀取合約，再執行下方檢查。":"When the pending owner accepts ownership, no address input is required. Switch Trust Wallet to the wallet matching pendingOwner, reconnect, read the contract, and then run the checks below.",
      "已整合鏈上讀取、Transfer、Burn、Mint、Pause / Unpause 與雙簽管理權交接。":"Integrated on-chain reads, Transfer, Burn, Mint, Pause / Unpause, and two-step ownership handover.",
      "Owner 與 pendingOwner 均以目前鏈上資料動態判定，不再綁定最初部署地址。":"Owner and pendingOwner are determined dynamically from current on-chain data and are no longer tied to the original deployment address.",
      "讀取餘額、Transfer、Burn。":"Read balances, Transfer, and Burn.",
      "另可 Mint、Pause / Unpause、提出 Ownership Transfer。":"Also supports Mint, Pause / Unpause, and proposing Ownership Transfer.",
      "可自行 Accept Ownership。":"Can independently Accept Ownership.",
      "前置模擬、Nonce / Gas 多節點備援、Gas Limit 預留、5 分鐘防重複送出。":"Preflight simulation, multi-node Nonce / Gas fallback, Gas Limit buffer, and 5-minute duplicate-send protection.",
      "V4.14.2 HF5｜雙模式錢包":"V4.14.2 HF5 | Dual-Mode Wallet",
      "120 P = 100.00 平台 IPT":"120 P = 100.00 Platform IPT",
      "尚未確認":"Not confirmed yet",
      "檢查中":"Checking",
      "正在確認 MFA 狀態。":"Checking MFA status.",
      "正在確認目前登入帳號…":"Checking the current signed-in account…",
      "正在讀取目前 Access Token 的 AAL…":"Reading the current Access Token AAL…",
      "驗證器":"Authenticator",
      "6 位數 TOTP 驗證碼":"6-digit TOTP verification code"
    });

    api.apply?.(document);
  }

  if(document.readyState==="loading"){
    window.addEventListener("DOMContentLoaded",installHF28,{once:true});
  }else{
    installHF28();
  }
})();


;(() => {
  function installHF34(){
    const api=window.IPTI18N;
    if(!api?.dictionaries) return;

    Object.assign(api.dictionaries["zh-CN"],{
      "會員編號／暱稱／Email／錢包地址":"会员编号／昵称／Email／钱包地址",
      "編號／暱稱／Email／錢包":"编号／昵称／Email／钱包"
    });

    Object.assign(api.dictionaries.en,{
      "會員編號／暱稱／Email／錢包地址":"Member No. / Nickname / Email / Wallet Address",
      "編號／暱稱／Email／錢包":"Member No. / Nickname / Email / Wallet"
    });

    api.apply?.(document);
    const lang=api.getLang?.() || localStorage.getItem("ipt_language") || "zh-TW";
    window.dispatchEvent(new CustomEvent("ipt-language-change",{detail:{lang}}));
  }

  if(document.readyState==="loading"){
    window.addEventListener("DOMContentLoaded",installHF34,{once:true});
  }else{
    installHF34();
  }
})();


;(() => {
  function installHF35(){
    const api=window.IPTI18N;
    if(!api?.dictionaries) return;

    Object.assign(api.dictionaries["zh-CN"],{
      "鑄造轉入":"铸造转入",
      "銷毀轉出":"销毁转出",
      "資產明細載入失敗":"资产明细加载失败",
      "已取消分享 CSV。":"已取消分享 CSV。",
      "已送出 CSV 下載要求；同時已把 CSV 內容複製到剪貼簿，若瀏覽器沒有跳出下載，可直接貼到試算表。":"已发出 CSV 下载请求；同时已将 CSV 内容复制到剪贴板，若浏览器没有弹出下载，可直接粘贴到电子表格。",
      "已送出 CSV 下載要求。若手機仍未顯示下載，請改用支援下載的 Chrome 開啟此頁。":"已发出 CSV 下载请求。若手机仍未显示下载，请改用支持下载的 Chrome 打开此页。",
      "此瀏覽器不支援直接下載，CSV 內容已複製到剪貼簿，可貼到 Google 試算表或 Excel。":"此浏览器不支持直接下载，CSV 内容已复制到剪贴板，可粘贴到 Google 表格或 Excel。",
      "CSV 匯出失敗：":"CSV 导出失败：",
      "請先產生彙總報表。":"请先生成汇总报表。",
      "交易會員":"交易会员",
      "IPT 數量":"IPT 数量",
      "正在開啟列印／PDF 預覽…":"正在打开打印／PDF 预览…",
      "正在彙整會員鏈上資產紀錄…":"正在汇总会员链上资产记录…",
      "開始日期不能晚於結束日期。":"开始日期不能晚于结束日期。",
      "沒有符合條件且已綁定錢包的會員。":"没有符合条件且已绑定钱包的会员。",
      "報表產生失敗：":"报表生成失败：",
      "正在讀取會員資料與 Sepolia IPT 鏈上餘額…":"正在读取会员资料与 Sepolia IPT 链上余额…",
      "尚未登入雲端會員。請先完成會員登入。":"尚未登录云端会员。请先完成会员登录。",
      "需要管理員登入。":"需要管理员登录。",
      "資產報表載入失敗":"资产报表加载失败",
      "此條件下沒有交易紀錄。":"此条件下没有交易记录。",
      "此條件下沒有會員資產變動。":"此条件下没有会员资产变动。",
      "IPT 餘額":"IPT 余额",
      "主錢包地址":"主钱包地址",
      "錢包驗證":"钱包验证",
      "目前 IPT 餘額":"当前 IPT 余额",
      "累計轉入":"累计转入",
      "累計轉出":"累计转出",
      "最近交易紀錄":"最近交易记录"
    });

    Object.assign(api.dictionaries.en,{
      "鑄造轉入":"Mint In",
      "銷毀轉出":"Burn Out",
      "資產明細載入失敗":"Failed to load asset details",
      "已取消分享 CSV。":"CSV sharing was cancelled.",
      "已送出 CSV 下載要求；同時已把 CSV 內容複製到剪貼簿，若瀏覽器沒有跳出下載，可直接貼到試算表。":"CSV download requested. The CSV was also copied to the clipboard in case the browser does not start the download.",
      "已送出 CSV 下載要求。若手機仍未顯示下載，請改用支援下載的 Chrome 開啟此頁。":"CSV download requested. If no download appears, open this page in Chrome.",
      "此瀏覽器不支援直接下載，CSV 內容已複製到剪貼簿，可貼到 Google 試算表或 Excel。":"Direct download is not supported in this browser. The CSV has been copied to the clipboard for Google Sheets or Excel.",
      "CSV 匯出失敗：":"CSV export failed: ",
      "請先產生彙總報表。":"Generate the summary report first.",
      "交易會員":"Transaction Member",
      "IPT 數量":"IPT Amount",
      "正在開啟列印／PDF 預覽…":"Opening Print / PDF preview…",
      "正在彙整會員鏈上資產紀錄…":"Compiling member on-chain asset records…",
      "開始日期不能晚於結束日期。":"Start date cannot be later than end date.",
      "沒有符合條件且已綁定錢包的會員。":"No wallet-linked members match the current criteria.",
      "報表產生失敗：":"Report generation failed: ",
      "正在讀取會員資料與 Sepolia IPT 鏈上餘額…":"Loading member data and Sepolia IPT on-chain balances…",
      "尚未登入雲端會員。請先完成會員登入。":"You are not signed in. Complete member sign-in first.",
      "需要管理員登入。":"Administrator sign-in required.",
      "資產報表載入失敗":"Failed to load asset report",
      "此條件下沒有交易紀錄。":"No transactions match these criteria.",
      "此條件下沒有會員資產變動。":"No member asset changes match these criteria.",
      "IPT 餘額":"IPT Balance",
      "主錢包地址":"Primary Wallet Address",
      "錢包驗證":"Wallet Verification",
      "目前 IPT 餘額":"Current IPT Balance",
      "累計轉入":"Total Incoming",
      "累計轉出":"Total Outgoing",
      "最近交易紀錄":"Recent Transactions"
    });

    api.apply?.(document);
    const lang=api.getLang?.() || localStorage.getItem("ipt_language") || "zh-TW";
    window.dispatchEvent(new CustomEvent("ipt-language-change",{detail:{lang}}));
  }

  if(document.readyState==="loading"){
    window.addEventListener("DOMContentLoaded",installHF35,{once:true});
  }else{
    installHF35();
  }
})();


;(() => {
  function installHF36(){
    const api=window.IPTI18N;
    if(!api?.dictionaries) return;

    Object.assign(api.dictionaries["zh-CN"],{
      "0x... 交易雜湊":"0x... 交易哈希",
      "Independent Points V4.14.2｜系統資訊":"Independent Points V4.14.2｜系统信息",
      "V4.14.2｜正式穩定整合版":"V4.14.2｜正式稳定整合版",
      "Mint / Pause / Ownership 風險提示與二次確認":"Mint / Pause / Ownership 风险提示与二次确认",
      "60 秒｜一次送簽後重新鎖定":"60 秒｜一次送签后重新锁定",
      "Independent Points V4.14.2｜維運中心":"Independent Points V4.14.2｜运维中心"
    });

    Object.assign(api.dictionaries.en,{
      "0x... 交易雜湊":"0x... Transaction Hash",
      "Independent Points V4.14.2｜系統資訊":"Independent Points V4.14.2 | System Information",
      "V4.14.2｜正式穩定整合版":"V4.14.2 | Production Stable Integration",
      "Mint / Pause / Ownership 風險提示與二次確認":"Mint / Pause / Ownership Risk Warning and Secondary Confirmation",
      "60 秒｜一次送簽後重新鎖定":"60 seconds | Re-lock after one signed action",
      "Independent Points V4.14.2｜維運中心":"Independent Points V4.14.2 | Maintenance Center"
    });

    api.apply?.(document);
    const lang=api.getLang?.() || localStorage.getItem("ipt_language") || "zh-TW";
    window.dispatchEvent(new CustomEvent("ipt-language-change",{detail:{lang}}));
  }

  if(document.readyState==="loading"){
    window.addEventListener("DOMContentLoaded",installHF36,{once:true});
  }else{
    installHF36();
  }
})();


// HF50-C1: Home wallet and unified asset summary translations.
;(() => {
  function installHF50C1(){
    const api=window.IPTI18N;
    if(!api?.dictionaries) return;
    Object.assign(api.dictionaries["zh-CN"],{
  "🔗 綁定我的 Trust Wallet": "🔗 绑定我的 Trust Wallet",
  "👛 管理我的 Trust Wallet": "👛 管理我的 Trust Wallet",
  "P 點數｜平台帳本": "P 点数｜平台账本",
  "平台 IPT｜Off-chain": "平台 IPT｜Off-chain",
  "鏈上 IPT｜On-chain": "链上 IPT｜On-chain",
  "IPT 顯示合計": "IPT 显示合计",
  "更新統一資產摘要": "更新统一资产摘要",
  "尚未更新統一資產摘要。": "尚未更新统一资产摘要。",
  "目前先顯示上次成功讀取的統一資產摘要；需要最新資料時再按下方更新。": "当前先显示上次成功读取的统一资产摘要；需要最新数据时再点击下方更新。",
  "平台 IPT 與鏈上 IPT 分開保存、分開記帳；顯示合計僅供資產總覽。": "平台 IPT 与链上 IPT 分开保存、分开记账；显示合计仅供资产总览。",
  "正在更新資產摘要…": "正在更新资产摘要…",
  "正在讀取平台帳本與 Sepolia 鏈上資產；其他按鈕仍可使用。": "正在读取平台账本与 Sepolia 链上资产；其他按钮仍可使用。",
  "資產摘要暫時無法更新，可直接使用下方功能或進入「我的資產」查看。": "资产摘要暂时无法更新，可直接使用下方功能或进入“我的资产”查看。",
  "按下更新": "点击更新",
  "首頁已就緒。需要最新平台與鏈上資產時，再按「更新統一資產摘要」。": "首页已就绪。需要最新平台与链上资产时，再点击“更新统一资产摘要”。"
});
    Object.assign(api.dictionaries.en,{
  "🔗 綁定我的 Trust Wallet": "🔗 Link My Trust Wallet",
  "👛 管理我的 Trust Wallet": "👛 Manage My Trust Wallet",
  "P 點數｜平台帳本": "P Points | Platform Ledger",
  "平台 IPT｜Off-chain": "Platform IPT | Off-chain",
  "鏈上 IPT｜On-chain": "On-chain IPT",
  "IPT 顯示合計": "Combined IPT Display",
  "更新統一資產摘要": "Update Unified Asset Summary",
  "尚未更新統一資產摘要。": "The unified asset summary has not been updated yet.",
  "目前先顯示上次成功讀取的統一資產摘要；需要最新資料時再按下方更新。": "Showing the last successfully loaded unified asset summary. Use the update button below for the latest data.",
  "平台 IPT 與鏈上 IPT 分開保存、分開記帳；顯示合計僅供資產總覽。": "Platform IPT and on-chain IPT are stored in separate ledgers. The combined display is for asset overview only.",
  "正在更新資產摘要…": "Updating asset summary…",
  "正在讀取平台帳本與 Sepolia 鏈上資產；其他按鈕仍可使用。": "Loading the platform ledger and Sepolia on-chain assets. Other buttons remain available.",
  "資產摘要暫時無法更新，可直接使用下方功能或進入「我的資產」查看。": "The asset summary cannot be updated right now. Use the features below or open My Assets.",
  "按下更新": "Tap to Update",
  "首頁已就緒。需要最新平台與鏈上資產時，再按「更新統一資產摘要」。": "Home is ready. Tap Update Unified Asset Summary for the latest platform and on-chain assets."
});
    api.apply?.(document);
  }
  if(document.readyState==="loading"){
    window.addEventListener("DOMContentLoaded",installHF50C1,{once:true});
  }else{
    installHF50C1();
  }
})();


;(() => {
 const install=()=>{const api=window.IPTI18N;if(!api?.dictionaries){setTimeout(install,50);return;}
Object.assign(api.dictionaries["zh-CN"],{"IPT 錢包中心": "IPT 钱包中心", "IPT 錢包中心｜轉帳": "IPT 钱包中心｜转账", "會員主錢包一致性驗證後，由 Trust Wallet 核准": "会员主钱包一致性验证后，由 Trust Wallet 批准", "會員帳號 × 主錢包 × 鏈上錢包獨立驗證": "会员账号 × 主钱包 × 链上钱包独立验证", "平台權限": "平台权限", "會員主錢包": "会员主钱包", "會員錢包驗證": "会员钱包验证", "目前連線錢包": "当前连接钱包", "連線錢包角色": "连接钱包角色", "資產歸屬": "资产归属", "③ 會員資產": "③ 会员资产", "④ 目前連線錢包 IPT": "④ 当前连接钱包 IPT", "確認中…": "确认中…", "尚未確認": "尚未确认", "尚未綁定": "尚未绑定", "未綁定": "未绑定", "未驗證": "未验证", "尚未連接 Trust Wallet": "尚未连接 Trust Wallet", "尚未連接 Trust Wallet。": "尚未连接 Trust Wallet。", "目前連線錢包 = 會員已驗證主錢包 ✓": "当前连接钱包 = 会员已验证主钱包 ✓", "目前連線錢包與會員已驗證主錢包一致。": "当前连接钱包与会员已验证主钱包一致。", "請連接此會員已驗證的主錢包。": "请连接此会员已验证的主钱包。", "會員 IPT 只依已綁定且已驗證的主錢包認定。": "会员 IPT 只依据已绑定且已验证的主钱包认定。", "正在確認會員主錢包資料。": "正在确认会员主钱包资料。", "正在確認會員主錢包資料…": "正在确认会员主钱包资料…", "正在確認目前連線錢包與會員主錢包的關係…": "正在确认当前连接钱包与会员主钱包的关系…", "✓ 已驗證會員主錢包：目前連線地址屬於此會員，可作為會員鏈上資產來源。": "✓ 已验证会员主钱包：当前连接地址属于此会员，可作为会员链上资产来源。", "會員尚無可對應的鏈上資產": "会员尚无可对应的链上资产", "尚無可對應的鏈上資產": "尚无可对应的链上资产", "會員主錢包尚未驗證": "会员主钱包尚未验证", "外部連線錢包，不屬於目前會員資產": "外部连接钱包，不属于当前会员资产", "請以會員主錢包讀取": "请使用会员主钱包读取", "讀取鏈上資料後顯示": "读取链上数据后显示", "此會員尚未綁定 Sepolia 主錢包，因此不會把任何外部連線錢包餘額列為會員資產。": "此会员尚未绑定 Sepolia 主钱包，因此不会将外部连接钱包余额列为会员资产。", "會員主錢包尚未完成驗證，暫不認定鏈上 IPT 為會員資產。": "会员主钱包尚未完成验证，暂不认定链上 IPT 为会员资产。", "目前連線的是外部錢包。外部錢包餘額不會列入目前會員資產。": "当前连接的是外部钱包。外部钱包余额不会计入当前会员资产。", "⚠️ 外部連線錢包：此地址不是目前會員已驗證的主錢包。下方 IPT 餘額只屬於這個連線地址，不屬於目前會員資產。": "⚠️ 外部连接钱包：此地址不是当前会员已验证的主钱包。下方 IPT 余额只属于此地址，不属于当前会员资产。", "此會員尚未綁定 Sepolia 主錢包。現在連線錢包的鏈上餘額不會被認定為此會員資產，轉帳與 Burn 已鎖定。": "此会员尚未绑定 Sepolia 主钱包。当前钱包余额不计入会员资产，转账与 Burn 已锁定。", "會員主錢包尚未完成驗證。鏈上餘額暫不認定為會員資產，轉帳與 Burn 已鎖定。": "会员主钱包尚未完成验证。链上余额暂不计入会员资产，转账与 Burn 已锁定。", "目前連線的是外部 Trust Wallet，不是此會員已驗證的主錢包。下方「目前連線錢包 IPT」只屬於該外部地址，不屬於目前會員；轉帳與 Burn 已鎖定。": "当前连接的是外部 Trust Wallet，并非此会员已验证的主钱包。下方余额只属于外部地址，不属于当前会员；转账与 Burn 已锁定。", "請確認收款地址與數量。只有「目前 Trust Wallet＝會員已驗證主錢包」時才能轉帳。 系統會先檢查會員錢包一致性、鏈上餘額與交易狀態，再交由 Trust Wallet 核准。 若畫面逾時，先重新讀取鏈上資料，不要立即重送。": "请确认收款地址与数量。只有当前 Trust Wallet 与会员已验证主钱包一致时才能转账。系统会先检查钱包一致性、链上余额与交易状态，再由 Trust Wallet 批准。如果页面超时，请先重新读取链上数据，不要立即重发。", "連接 Trust Wallet 並讀取鏈上資料後，即可進行轉帳前置檢查。": "连接 Trust Wallet 并读取链上数据后，即可进行转账预检查。"});
Object.assign(api.dictionaries["en"],{"IPT 錢包中心": "IPT Wallet Center", "IPT 錢包中心｜轉帳": "IPT Wallet Center | Transfer", "會員主錢包一致性驗證後，由 Trust Wallet 核准": "Verify the member’s primary wallet, then approve in Trust Wallet", "會員帳號 × 主錢包 × 鏈上錢包獨立驗證": "Member account, primary wallet and on-chain wallet verification", "平台權限": "Platform Role", "會員主錢包": "Member Primary Wallet", "會員錢包驗證": "Member Wallet Verification", "目前連線錢包": "Connected Wallet", "連線錢包角色": "Connected Wallet Role", "資產歸屬": "Asset Ownership", "③ 會員資產": "③ Member Assets", "④ 目前連線錢包 IPT": "④ Connected Wallet IPT", "確認中…": "Checking…", "尚未確認": "Not yet confirmed", "尚未綁定": "Not linked", "未綁定": "Not linked", "未驗證": "Not verified", "尚未連接 Trust Wallet": "Trust Wallet is not connected", "尚未連接 Trust Wallet。": "Trust Wallet is not connected.", "目前連線錢包 = 會員已驗證主錢包 ✓": "Connected wallet = verified member primary wallet ✓", "目前連線錢包與會員已驗證主錢包一致。": "The connected wallet matches the member’s verified primary wallet.", "請連接此會員已驗證的主錢包。": "Connect this member’s verified primary wallet.", "會員 IPT 只依已綁定且已驗證的主錢包認定。": "Member IPT is based on the linked and verified primary wallet.", "正在確認會員主錢包資料。": "Checking the member’s primary wallet.", "正在確認會員主錢包資料…": "Checking the member’s primary wallet…", "正在確認目前連線錢包與會員主錢包的關係…": "Checking whether the connected wallet matches the member’s primary wallet…", "✓ 已驗證會員主錢包：目前連線地址屬於此會員，可作為會員鏈上資產來源。": "✓ Verified member primary wallet: this address belongs to the member and provides their on-chain assets.", "會員尚無可對應的鏈上資產": "No linked on-chain assets", "尚無可對應的鏈上資產": "No linked on-chain assets", "會員主錢包尚未驗證": "Member primary wallet is not verified", "外部連線錢包，不屬於目前會員資產": "External wallet; assets do not belong to this member", "請以會員主錢包讀取": "Load using the member’s primary wallet", "讀取鏈上資料後顯示": "Available after loading on-chain data", "此會員尚未綁定 Sepolia 主錢包，因此不會把任何外部連線錢包餘額列為會員資產。": "This member has no linked Sepolia primary wallet. External wallet balances are excluded from member assets.", "會員主錢包尚未完成驗證，暫不認定鏈上 IPT 為會員資產。": "The primary wallet is not verified. Its on-chain IPT is not yet recognized as member assets.", "目前連線的是外部錢包。外部錢包餘額不會列入目前會員資產。": "An external wallet is connected. Its balance is excluded from this member’s assets.", "⚠️ 外部連線錢包：此地址不是目前會員已驗證的主錢包。下方 IPT 餘額只屬於這個連線地址，不屬於目前會員資產。": "⚠️ External wallet: this address is not the member’s verified primary wallet. The IPT balance below belongs to this address and is excluded from member assets.", "此會員尚未綁定 Sepolia 主錢包。現在連線錢包的鏈上餘額不會被認定為此會員資產，轉帳與 Burn 已鎖定。": "No Sepolia primary wallet is linked. The connected balance is excluded from member assets. Transfer and Burn are locked.", "會員主錢包尚未完成驗證。鏈上餘額暫不認定為會員資產，轉帳與 Burn 已鎖定。": "The member’s primary wallet is not verified. Its balance is excluded from member assets. Transfer and Burn are locked.", "目前連線的是外部 Trust Wallet，不是此會員已驗證的主錢包。下方「目前連線錢包 IPT」只屬於該外部地址，不屬於目前會員；轉帳與 Burn 已鎖定。": "An external Trust Wallet is connected instead of the member’s verified primary wallet. The balance below belongs to that external address. Transfer and Burn are locked.", "請確認收款地址與數量。只有「目前 Trust Wallet＝會員已驗證主錢包」時才能轉帳。 系統會先檢查會員錢包一致性、鏈上餘額與交易狀態，再交由 Trust Wallet 核准。 若畫面逾時，先重新讀取鏈上資料，不要立即重送。": "Confirm the recipient address and amount. Transfers require Trust Wallet to match the member’s verified primary wallet. The system checks the wallet match, on-chain balance and transaction status before approval in Trust Wallet. If the page times out, reload on-chain data before trying again.", "連接 Trust Wallet 並讀取鏈上資料後，即可進行轉帳前置檢查。": "Connect Trust Wallet and load on-chain data to check the transfer."});
api.apply?.(document);}; if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",install,{once:true});else install();
})();


;(() => {const install=()=>{const api=window.IPTI18N;if(!api?.dictionaries){setTimeout(install,50);return;}
Object.assign(api.dictionaries["zh-CN"],{"收款地址格式錯誤。": "收款地址格式错误。", "收款地址不能與目前錢包相同。": "收款地址不能与当前钱包相同。", "不能把 IPT 直接轉到 IPT 合約地址。": "不能将 IPT 直接转入 IPT 合约地址。", "轉移數量必須大於 0。": "转账数量必须大于 0。", "數量格式錯誤；IPT 最多 2 位小數。": "数量格式错误；IPT 最多支持 2 位小数。", "WalletConnect 尚未連線。": "WalletConnect 尚未连接。", "目前不是 Ethereum Sepolia。": "当前网络不是 Ethereum Sepolia。", "IPT 合約不存在。": "IPT 合约不存在。", "IPT 合約目前已暫停。": "IPT 合约当前已暂停。", "請先完成轉帳前檢查。": "请先完成转账预检查。", "無法確認會員主錢包資料，已鎖定轉帳。": "无法确认会员主钱包资料，转账已锁定。", "此會員尚未綁定 Sepolia 主錢包，不能從目前錢包轉帳。": "此会员尚未绑定 Sepolia 主钱包，无法从当前钱包转账。", "會員主錢包尚未完成驗證，不能轉帳。": "会员主钱包尚未完成验证，无法转账。", "目前 Trust Wallet 不是此會員已驗證的主錢包，不能轉帳。": "当前 Trust Wallet 并非此会员已验证的主钱包，无法转账。", "防重複保護：相同收款地址與數量在 5 分鐘內已嘗試送出。請先確認鏈上結果。": "重复交易保护：相同收款地址与数量在 5 分钟内已尝试发送。请先确认链上结果。", "請切換至 Ethereum Sepolia。": "请切换至 Ethereum Sepolia。", "錢包或網路已變更，請重新讀取鏈上資料。": "钱包或网络已更改，请重新读取链上数据。"});
Object.assign(api.dictionaries["en"],{"收款地址格式錯誤。": "Invalid recipient wallet address.", "收款地址不能與目前錢包相同。": "The recipient address must differ from the connected wallet.", "不能把 IPT 直接轉到 IPT 合約地址。": "IPT cannot be transferred directly to the IPT contract address.", "轉移數量必須大於 0。": "The transfer amount must be greater than zero.", "數量格式錯誤；IPT 最多 2 位小數。": "Invalid amount. IPT supports up to 2 decimal places.", "WalletConnect 尚未連線。": "WalletConnect is not connected.", "目前不是 Ethereum Sepolia。": "The current network is not Ethereum Sepolia.", "IPT 合約不存在。": "The IPT contract was not found.", "IPT 合約目前已暫停。": "The IPT contract is paused.", "請先完成轉帳前檢查。": "Complete the transfer pre-check first.", "無法確認會員主錢包資料，已鎖定轉帳。": "The member’s primary wallet could not be verified. Transfers are locked.", "此會員尚未綁定 Sepolia 主錢包，不能從目前錢包轉帳。": "No Sepolia primary wallet is linked. Transfers from this wallet are unavailable.", "會員主錢包尚未完成驗證，不能轉帳。": "The member’s primary wallet is not verified. Transfers are unavailable.", "目前 Trust Wallet 不是此會員已驗證的主錢包，不能轉帳。": "Trust Wallet does not match the member’s verified primary wallet. Transfers are unavailable.", "防重複保護：相同收款地址與數量在 5 分鐘內已嘗試送出。請先確認鏈上結果。": "Duplicate protection: a transfer to this address for this amount was attempted within the last 5 minutes. Check its on-chain result first.", "請切換至 Ethereum Sepolia。": "Switch to Ethereum Sepolia.", "錢包或網路已變更，請重新讀取鏈上資料。": "The wallet or network changed. Reload on-chain data."});
api.apply?.(document);};if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",install,{once:true});else install();})();

;(() => {const install=()=>{const api=window.IPTI18N;if(!api?.dictionaries){setTimeout(install,50);return;}
Object.assign(api.dictionaries["zh-CN"],{"平台內部轉帳，不上鏈、不需要 Trust Wallet、不產生 Gas。": "平台内部转账，不上链、不需要 Trust Wallet、不产生 Gas。", "請先輸入完整會員編號並查詢收款人。": "请先输入完整会员编号并查询收款人。", "請輸入大於 0、最多兩位小數的 IPT 數量。": "请输入大于 0、最多两位小数的 IPT 数量。", "會員編號格式不正確，例如 IPT-00100002。": "会员编号格式不正确，例如 IPT-00100002。", "正在查詢收款會員…": "正在查询收款会员…", "收款會員已確認，請核對姓名與會員編號後再輸入轉帳金額。": "收款会员已确认，请核对姓名与会员编号后再输入转账金额。", "正在安全處理平台轉帳，請勿重複點擊…": "正在安全处理平台转账，请勿重复点击…", "正在讀取平台錢包與鏈上 IPT…": "正在读取平台钱包与链上 IPT…", "資產已更新。平台與鏈上餘額分開保存、分開記帳。": "资产已更新。平台与链上余额分别保存、分别记账。", "正在安全處理兌換，請勿重複點擊…": "正在安全处理兑换，请勿重复点击…", "兌換數量必須是 120 P 的整數倍。": "兑换数量必须是 120 P 的整数倍。", "這個收款連結屬於目前登入會員，不能轉帳給自己。": "此收款链接属于当前登录会员，不能转账给自己。", "收款會員已由安全付款連結確認，請輸入付款金額。": "收款会员已通过安全付款链接确认，请输入付款金额。", "收款連結無效或已過期，請向收款人取得新的 QR Code。": "收款链接无效或已过期，请向收款人获取新的 QR Code。", "無法自動複製，請長按會員編號手動複製。": "无法自动复制，请长按会员编号手动复制。", "收款資訊已複製，可貼到 LINE 或其他通訊軟體。": "收款信息已复制，可粘贴到 LINE 或其他通信软件。", "分享未完成，可使用「複製會員編號」。": "分享未完成，可使用“复制会员编号”。", "QR Code 會先開啟公開收款確認頁；掃碼本身不會直接付款。": "QR Code 会先打开公开收款确认页面；扫码本身不会直接付款。", "QR Code 暫時無法產生": "QR Code 暂时无法生成", "目前無法建立平台 IPT 收款連結。": "当前无法创建平台 IPT 收款链接。", "安全收款連結建立失敗，請重新整理後再試。": "安全收款链接创建失败，请刷新后重试。", "僅供資產總覽；平台與鏈上仍是兩本不同帳。": "仅供资产总览；平台与链上仍是两个独立账本。", "兌換來源：平台 P 錢包": "兑换来源：平台 P 钱包", "儲存在 Supabase 平台帳本": "存储于 Supabase 平台账本", "儲存在 Ethereum Sepolia 智能合約": "存储于 Ethereum Sepolia 智能合约"});
Object.assign(api.dictionaries["en"],{"平台內部轉帳，不上鏈、不需要 Trust Wallet、不產生 Gas。": "Transfers within the platform do not use the blockchain, Trust Wallet or gas.", "請先輸入完整會員編號並查詢收款人。": "Enter the complete member number and look up the recipient first.", "請輸入大於 0、最多兩位小數的 IPT 數量。": "Enter an IPT amount greater than zero, with up to 2 decimal places.", "會員編號格式不正確，例如 IPT-00100002。": "Invalid member number format. Example: IPT-00100002.", "正在查詢收款會員…": "Looking up the recipient…", "收款會員已確認，請核對姓名與會員編號後再輸入轉帳金額。": "Recipient confirmed. Check the name and member number before entering the amount.", "正在安全處理平台轉帳，請勿重複點擊…": "Processing the platform transfer. Please do not tap again…", "正在讀取平台錢包與鏈上 IPT…": "Loading platform wallet and on-chain IPT…", "資產已更新。平台與鏈上餘額分開保存、分開記帳。": "Assets updated. Platform and on-chain balances are stored in separate ledgers.", "正在安全處理兌換，請勿重複點擊…": "Processing the conversion. Please do not tap again…", "兌換數量必須是 120 P 的整數倍。": "The conversion amount must be a multiple of 120 P.", "這個收款連結屬於目前登入會員，不能轉帳給自己。": "This payment link belongs to the signed-in member. You cannot transfer to yourself.", "收款會員已由安全付款連結確認，請輸入付款金額。": "Recipient confirmed through the secure payment link. Enter the payment amount.", "收款連結無效或已過期，請向收款人取得新的 QR Code。": "The payment link is invalid or expired. Ask the recipient for a new QR code.", "無法自動複製，請長按會員編號手動複製。": "Automatic copying failed. Press and hold the member number to copy it.", "收款資訊已複製，可貼到 LINE 或其他通訊軟體。": "Payment details copied. Paste them into LINE or another messaging app.", "分享未完成，可使用「複製會員編號」。": "Sharing was not completed. Use Copy Member Number.", "QR Code 會先開啟公開收款確認頁；掃碼本身不會直接付款。": "The QR code opens a public recipient confirmation page. Scanning it does not send a payment.", "QR Code 暫時無法產生": "QR code is currently unavailable", "目前無法建立平台 IPT 收款連結。": "The platform IPT payment link could not be created.", "安全收款連結建立失敗，請重新整理後再試。": "The secure payment link could not be created. Refresh and try again.", "僅供資產總覽；平台與鏈上仍是兩本不同帳。": "For overview only. Platform and on-chain balances remain in separate ledgers.", "兌換來源：平台 P 錢包": "Conversion source: platform P wallet", "儲存在 Supabase 平台帳本": "Stored in the Supabase platform ledger", "儲存在 Ethereum Sepolia 智能合約": "Stored in the Ethereum Sepolia smart contract"});
api.apply?.(document);};if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",install,{once:true});else install();})();


;(() => {const api=window.IPTI18N;
Object.assign(api.dictionaries["zh-CN"],{"可用平台 IPT 不足。": "可用平台 IPT 不足。", "需要已驗證的 Sepolia Primary Wallet。": "需要已验证的 Sepolia Primary Wallet。", "確認建立提領申請？": "确认创建提领申请？", "數量：": "数量：", "目的錢包：": "目标钱包：", "網路：": "网络：", "平台 IPT": "平台 IPT", "此步只會鎖定平台 IPT，不會 Mint、不會送出鏈上交易。": "此步骤只会锁定平台 IPT，不会 Mint，也不会发送链上交易。", "確認取消這筆 pending 提領？鎖定的 IPT 會立即回到可用餘額。": "确认取消这笔待处理提领？锁定的 IPT 会立即回到可用余额。", "Access Token 格式不正確": "Access Token 格式不正确", "沒有有效 Access Token": "没有有效 Access Token", "Access Token 已過期，請重新登入": "Access Token 已过期，请重新登录", "Supabase 驗證這顆 JWT 仍不是 AAL2": "Supabase 验证此 JWT 仍不是 AAL2", "提領前必須完成 MFA AAL2。請先到上方完成安全驗證。": "提领前必须完成 MFA AAL2。请先在上方完成安全验证。", "目前沒有已驗證的 Sepolia Primary Wallet，不能建立提領申請。": "当前没有已验证的 Sepolia Primary Wallet，无法创建提领申请。", "正在建立提領申請並鎖定平台 IPT…": "正在创建提领申请并锁定平台 IPT…", "提領申請已建立。資料庫已確認 AAL2，此筆 IPT 現在是 locked，尚未上鏈。": "提领申请已创建。数据库已确认 AAL2，此笔 IPT 已锁定，尚未上链。", "提領申請已取消，鎖定 IPT 已回到可用餘額。": "提领申请已取消，锁定 IPT 已回到可用余额。", "目前沒有提領申請。": "当前没有提领申请。", "需要會員登入才能查看提領申請。": "需要会员登录才能查看提领申请。", "這個裝置尚未通過受信任裝置驗證。": "此设备尚未通过受信任设备验证。"});
Object.assign(api.dictionaries["en"],{"可用平台 IPT 不足。": "Insufficient available platform IPT.", "需要已驗證的 Sepolia Primary Wallet。": "A verified Sepolia primary wallet is required.", "確認建立提領申請？": "Create this withdrawal request?", "數量：": "Amount: ", "目的錢包：": "Destination wallet: ", "網路：": "Network: ", "平台 IPT": "Platform IPT", "此步只會鎖定平台 IPT，不會 Mint、不會送出鏈上交易。": "This step only locks platform IPT. It does not mint tokens or send an on-chain transaction.", "確認取消這筆 pending 提領？鎖定的 IPT 會立即回到可用餘額。": "Cancel this pending withdrawal? The locked IPT will immediately return to your available balance.", "Access Token 格式不正確": "Invalid access token format", "沒有有效 Access Token": "No valid access token", "Access Token 已過期，請重新登入": "The access token has expired. Sign in again", "Supabase 驗證這顆 JWT 仍不是 AAL2": "Supabase has not confirmed this JWT as AAL2", "提領前必須完成 MFA AAL2。請先到上方完成安全驗證。": "Complete MFA AAL2 before withdrawing. Use the security verification above.", "目前沒有已驗證的 Sepolia Primary Wallet，不能建立提領申請。": "No verified Sepolia primary wallet is available. A withdrawal request cannot be created.", "正在建立提領申請並鎖定平台 IPT…": "Creating the withdrawal request and locking platform IPT…", "提領申請已建立。資料庫已確認 AAL2，此筆 IPT 現在是 locked，尚未上鏈。": "Withdrawal request created. The database confirmed AAL2. This IPT is locked and has not gone on-chain.", "提領申請已取消，鎖定 IPT 已回到可用餘額。": "Withdrawal request cancelled. The locked IPT has returned to your available balance.", "目前沒有提領申請。": "No withdrawal requests yet.", "需要會員登入才能查看提領申請。": "Sign in to view withdrawal requests.", "這個裝置尚未通過受信任裝置驗證。": "This device has not passed trusted-device verification."});
})();


;(() => {const api=window.IPTI18N;
Object.assign(api.dictionaries["zh-CN"],{"V4.14.2｜提領安全驗證": "V4.14.2｜提领安全验证", "完成 MFA AAL2": "完成 MFA AAL2", "提領上鏈屬高風險資產操作，必須用目前這個 Session 完成 TOTP 驗證。": "提领上链属于高风险资产操作，必须使用当前 Session 完成 TOTP 验证。", "正在確認目前登入帳號…": "正在确认当前登录账号…", "正在讀取目前 Access Token 的 AAL…": "正在读取当前 Access Token 的 AAL…", "6 位數 TOTP 驗證碼": "6 位数 TOTP 验证码", "輸入驗證器代碼": "输入验证器代码", "完成 MFA 並返回提領頁": "完成 MFA 并返回提领页面", "返回提領頁": "返回提领页面", "驗證成功後，系統會重新取得 Session，並用新的 Access Token 再確認一次 AAL2。 只有確認成功才會返回提領頁。": "验证成功后，系统会重新获取 Session，并使用新的 Access Token 再次确认 AAL2。只有确认成功才会返回提领页面。", "目前沒有有效會員登入。請先回帳戶安全登入。": "当前没有有效会员登录。请先返回账户安全登录。", "會員身分已由伺服器確認。": "会员身份已由服务器确认。", "目前 Access Token 已是 AAL2，即將返回提領頁。": "当前 Access Token 已是 AAL2，即将返回提领页面。", "目前 Access Token 是 AAL1。請完成一次 TOTP 驗證。": "当前 Access Token 是 AAL1。请完成一次 TOTP 验证。", "這個帳號沒有 verified TOTP 驗證器，請先到帳戶安全設定 MFA。": "此账号没有已验证的 TOTP 验证器，请先在账户安全设置 MFA。", "請輸入正確的驗證器代碼。": "请输入正确的验证器代码。", "正在驗證 TOTP 並更新 Session…": "正在验证 TOTP 并更新 Session…", "MFA AAL2 已完成，新 Access Token 已明確寫回。正在返回提領頁…": "MFA AAL2 已完成，新的 Access Token 已保存。正在返回提领页面…"});
Object.assign(api.dictionaries["en"],{"V4.14.2｜提領安全驗證": "V4.14.2 | Withdrawal Security Verification", "完成 MFA AAL2": "Complete MFA AAL2", "提領上鏈屬高風險資產操作，必須用目前這個 Session 完成 TOTP 驗證。": "On-chain withdrawals require TOTP verification in the current session.", "正在確認目前登入帳號…": "Checking the signed-in account…", "正在讀取目前 Access Token 的 AAL…": "Checking the current access token’s AAL…", "6 位數 TOTP 驗證碼": "6-digit TOTP code", "輸入驗證器代碼": "Enter the authenticator code", "完成 MFA 並返回提領頁": "Complete MFA and Return to Withdrawal", "返回提領頁": "Return to Withdrawal", "驗證成功後，系統會重新取得 Session，並用新的 Access Token 再確認一次 AAL2。 只有確認成功才會返回提領頁。": "After verification, the system refreshes the session and checks AAL2 again with the new access token. It returns to the withdrawal page only after confirmation.", "目前沒有有效會員登入。請先回帳戶安全登入。": "No valid member sign-in. Sign in through Account Security first.", "會員身分已由伺服器確認。": "Member identity confirmed by the server.", "目前 Access Token 已是 AAL2，即將返回提領頁。": "The current access token is already AAL2. Returning to the withdrawal page.", "目前 Access Token 是 AAL1。請完成一次 TOTP 驗證。": "The current access token is AAL1. Complete TOTP verification.", "這個帳號沒有 verified TOTP 驗證器，請先到帳戶安全設定 MFA。": "This account has no verified TOTP authenticator. Set up MFA in Account Security first.", "請輸入正確的驗證器代碼。": "Enter a valid authenticator code.", "正在驗證 TOTP 並更新 Session…": "Verifying TOTP and updating the session…", "MFA AAL2 已完成，新 Access Token 已明確寫回。正在返回提領頁…": "MFA AAL2 completed. The new access token has been saved. Returning to the withdrawal page…"});
})();

// HF50-C18: native platform transfer and conversion dialogs.
(()=>{const api=window.IPTI18N;if(!api?.dictionaries)return;Object.assign(api.dictionaries["zh-CN"],{"請先重新查詢並確認收款會員。":"请先重新查询并确认收款会员。","請輸入正確的 IPT 數量，最多兩位小數。":"请输入正确的 IPT 数量，最多两位小数。","平台 IPT 餘額不足。":"平台 IPT 余额不足。","備註最多 200 字。":"备注最多 200 字。","兌換數量必須是 120 P 的整數倍。":"兑换数量必须是 120 P 的整数倍。","P 餘額不足。":"P 余额不足。","確認平台轉帳？":"确认平台转账？","收款人：":"收款人：","會員編號：":"会员编号：","轉出：":"转出：","平台 IPT":"平台 IPT","此為平台內部轉帳，不會上鏈，也不產生 Gas。":"此为平台内部转账，不会上链，也不产生 Gas。","確認兌換？":"确认兑换？","使用：":"使用：","獲得：":"获得：","此操作完成後會留下正式帳本紀錄。":"此操作完成后会留下正式账本记录。"});Object.assign(api.dictionaries.en,{"請先重新查詢並確認收款會員。":"Look up and confirm the recipient member again first.","請輸入正確的 IPT 數量，最多兩位小數。":"Enter a valid IPT amount with up to 2 decimal places.","平台 IPT 餘額不足。":"Insufficient Platform IPT balance.","備註最多 200 字。":"The note must be no more than 200 characters.","兌換數量必須是 120 P 的整數倍。":"The conversion amount must be a multiple of 120 P.","P 餘額不足。":"Insufficient P balance.","確認平台轉帳？":"Confirm this platform transfer?","收款人：":"Recipient: ","會員編號：":"Member number: ","轉出：":"Send: ","平台 IPT":"Platform IPT","此為平台內部轉帳，不會上鏈，也不產生 Gas。":"This is an internal platform transfer. It does not send an on-chain transaction or use gas.","確認兌換？":"Confirm this conversion?","使用：":"Use: ","獲得：":"Receive: ","此操作完成後會留下正式帳本紀錄。":"This operation will create a platform ledger record."});})();


// HF50-C19: on-chain transfer native confirmation.
(()=>{const api=window.IPTI18N;if(!api?.dictionaries)return;Object.assign(api.dictionaries["zh-CN"],{"確認在 Ethereum Sepolia 轉出":"确认在 Ethereum Sepolia 转出 ","IPT 到：":" IPT 到：","這是測試網交易，仍會消耗 Sepolia Gas。":"这是测试网交易，仍会消耗 Sepolia Gas。"});Object.assign(api.dictionaries.en,{"確認在 Ethereum Sepolia 轉出":"Confirm sending on Ethereum Sepolia: ","IPT 到：":" IPT to: ","這是測試網交易，仍會消耗 Sepolia Gas。":"This testnet transaction still uses Sepolia gas."});})();



// HF50-C20: native administrative dialogs.
(()=>{const a=window.IPTI18N;if(!a)return;const entries={"確認在 Ethereum Sepolia 永久銷毀": {"en": "Confirm permanently burning on Ethereum Sepolia:", "zh-CN": "确认在 Ethereum Sepolia 永久销毁"}, "IPT？": {"en": "IPT?", "zh-CN": "IPT？"}, "Burn 會永久減少你的 IPT 與 totalSupply，不能復原。": {"en": "Burn permanently reduces your IPT and totalSupply and cannot be undone.", "zh-CN": "Burn 会永久减少你的 IPT 与 totalSupply，不能恢复。"}, "確認在 Ethereum Sepolia 發行": {"en": "Confirm minting on Ethereum Sepolia:", "zh-CN": "确认在 Ethereum Sepolia 发行"}, "Mint 會增加 totalSupply，只有鏈上 Owner 可以執行。": {"en": "Mint increases totalSupply and can only be performed by the on-chain Owner.", "zh-CN": "Mint 会增加 totalSupply，只有链上 Owner 可以执行。"}, "確認在 Ethereum Sepolia": {"en": "Confirm on Ethereum Sepolia:", "zh-CN": "确认在 Ethereum Sepolia"}, "暫停合約": {"en": "Pause the contract", "zh-CN": "暂停合约"}, "恢復合約": {"en": "Unpause the contract", "zh-CN": "恢复合约"}, "？": {"en": "?", "zh-CN": "？"}, "目前 totalSupply：": {"en": "Current totalSupply:", "zh-CN": "当前 totalSupply："}, "操作後 paused 將變成：": {"en": "After this operation, paused will be:", "zh-CN": "操作后 paused 将变成："}, "IPT 餘額與 totalSupply 不會因這筆管理操作改變。": {"en": "This administrative operation does not change IPT balances or totalSupply.", "zh-CN": "IPT 余额与 totalSupply 不会因这笔管理操作改变。"}, "確認在 Ethereum Sepolia 提出管理權交接？": {"en": "Confirm proposing an ownership transfer on Ethereum Sepolia?", "zh-CN": "确认在 Ethereum Sepolia 提出管理权交接？"}, "目前 Owner：": {"en": "Current Owner:", "zh-CN": "当前 Owner："}, "新 pendingOwner：": {"en": "New pendingOwner:", "zh-CN": "新 pendingOwner："}, "這一步不會立即更換 Owner；候任管理者仍需自己簽名接任。": {"en": "This step does not immediately change the Owner. The proposed owner must sign to accept ownership.", "zh-CN": "这一步不会立即更换 Owner；候任管理者仍需自己签名接任。"}, "確認在 Ethereum Sepolia 接任 IPT 管理權？": {"en": "Confirm accepting IPT ownership on Ethereum Sepolia?", "zh-CN": "确认在 Ethereum Sepolia 接任 IPT 管理权？"}, "目前 pendingOwner：": {"en": "Current pendingOwner:", "zh-CN": "当前 pendingOwner："}, "核准後，連線錢包將成為新的 Owner。": {"en": "After approval, the connected wallet will become the new Owner.", "zh-CN": "批准后，连接钱包将成为新的 Owner。"}, "將啟用 60 秒高風險操作視窗。倒數只在本機執行，不會持續讀取鏈上資料。是否繼續？": {"en": "Enable the 60-second window for high-risk operations? The countdown runs locally and does not continuously read on-chain data.", "zh-CN": "将启用 60 秒高风险操作窗口。倒计时只在本机执行，不会持续读取链上数据。是否继续？"}, "請輸入目前錢包地址最後 6 碼以再次確認：": {"en": "Enter the last 6 characters of the current wallet address to confirm:", "zh-CN": "请输入当前钱包地址最后 6 位以再次确认："}, "營運安全保護尚未解鎖。請先完成前置檢查，再按「啟用 60 秒操作視窗」。": {"en": "Operational protection is locked. Complete the pre-check, then enable the 60-second operation window.", "zh-CN": "运营安全保护尚未解锁。请先完成前置检查，再启用 60 秒操作窗口。"}, "Mint 會真正發行 IPT。是否確定已核對地址與數量，並要送交 Trust Wallet？": {"en": "Mint will issue IPT. Have you checked the address and amount and want to submit to Trust Wallet?", "zh-CN": "Mint 会真正发行 IPT。是否确定已核对地址与数量，并要提交到 Trust Wallet？"}, "Pause 會停止 IPT 轉帳。是否確定要送交 Trust Wallet？": {"en": "Pause will stop IPT transfers. Submit to Trust Wallet?", "zh-CN": "Pause 会停止 IPT 转账。是否确定要提交到 Trust Wallet？"}, "是否確定要恢復 IPT 轉帳？": {"en": "Resume IPT transfers?", "zh-CN": "是否确定要恢复 IPT 转账？"}, "管理權交接屬高風險操作。是否確定已再次核對候任管理者地址，並要提出交接？": {"en": "Ownership transfer is a high-risk operation. Have you rechecked the proposed owner address and want to propose the transfer?", "zh-CN": "管理权交接属于高风险操作。是否确定已再次核对候任管理者地址，并要提出交接？"}, "接任管理權會讓目前錢包成為新的 Owner。是否確定要送出接任交易？": {"en": "Accepting ownership makes the current wallet the new Owner. Submit the acceptance transaction?", "zh-CN": "接任管理权会让当前钱包成为新的 Owner。是否确定要提交接任交易？"}, "這是測試網交易，仍會消耗 Sepolia Gas。": {"en": "This testnet transaction still uses Sepolia gas.", "zh-CN": "这是测试网交易，仍会消耗 Sepolia Gas。"}};for(const [key,value] of Object.entries(entries)){for(const [lang,text] of Object.entries(value)){a.dictionaries[lang][key]=text;}}})();


// HF50-C21: operational security text and formatted summaries.
(()=>{const a=window.IPTI18N;if(!a)return;const entries={"營運安全中心": {"en": "Operational Security Center", "zh-CN": "运营安全中心"}, "正式營運狀態、高風險操作保護、錢包切換紀錄、管理員稽核與快速維運入口。": {"en": "Operational status, protection for high-risk operations, wallet switching records, administrator audits and maintenance shortcuts.", "zh-CN": "正式运营状态、高风险操作保护、钱包切换记录、管理员审计与快速运维入口。"}, "管理員驗證": {"en": "Administrator Verification", "zh-CN": "管理员验证"}, "正在確認管理員權限…": {"en": "Checking administrator permissions…", "zh-CN": "正在确认管理员权限…"}, "重新檢查": {"en": "Recheck", "zh-CN": "重新检查"}, "正式營運狀態": {"en": "Operational Status", "zh-CN": "正式运营状态"}, "正式版本": {"en": "Release Version", "zh-CN": "正式版本"}, "IPT 合約": {"en": "IPT Contract", "zh-CN": "IPT 合约"}, "檢查中…": {"en": "Checking…", "zh-CN": "检查中…"}, "營運狀態": {"en": "Operational Status", "zh-CN": "运营状态"}, "正在執行正式營運安全檢查…": {"en": "Checking operational security…", "zh-CN": "正在执行正式运营安全检查…"}, "帳戶安全摘要": {"en": "Account Security Summary", "zh-CN": "账户安全摘要"}, "停權會員": {"en": "Suspended Members", "zh-CN": "停权会员"}, "未驗證錢包": {"en": "Unverified Wallets", "zh-CN": "未验证钱包"}, "正在分析帳戶安全狀態…": {"en": "Analyzing account security…", "zh-CN": "正在分析账户安全状态…"}, "高風險操作紀錄（本機）": {"en": "High-risk Operation Records (Local)", "zh-CN": "高风险操作记录（本机）"}, "正在讀取本機安全紀錄…": {"en": "Loading local security records…", "zh-CN": "正在读取本机安全记录…"}, "清除本機安全紀錄": {"en": "Clear Local Security Records", "zh-CN": "清除本机安全记录"}, "開啟鏈上操作": {"en": "Open On-chain Operations", "zh-CN": "打开链上操作"}, "最近管理稽核": {"en": "Recent Administrator Audits", "zh-CN": "最近管理审计"}, "正在讀取目前管理員的稽核資訊…": {"en": "Loading audits for the current administrator…", "zh-CN": "正在读取当前管理员的审计信息…"}, "快速安全維運": {"en": "Security Maintenance Shortcuts", "zh-CN": "快速安全运维"}, "帳戶安全與權限": {"en": "Account Security and Permissions", "zh-CN": "账户安全与权限"}, "維運中心": {"en": "Maintenance Center", "zh-CN": "运维中心"}, "版本更新中心": {"en": "Update Center", "zh-CN": "版本更新中心"}, "系統資訊": {"en": "System Information", "zh-CN": "系统信息"}, "事件與通知": {"en": "Events and Notifications", "zh-CN": "事件与通知"}, "錢包切換": {"en": "Wallet switched", "zh-CN": "钱包切换"}, "高風險操作視窗啟用": {"en": "High-risk operation window enabled", "zh-CN": "高风险操作窗口启用"}, "高風險操作重新鎖定": {"en": "High-risk operations locked again", "zh-CN": "高风险操作重新锁定"}, "60 秒操作視窗逾時": {"en": "60-second operation window expired", "zh-CN": "60 秒操作窗口超时"}, "安全核對失敗": {"en": "Security check failed", "zh-CN": "安全核对失败"}, "高風險操作遭阻擋": {"en": "High-risk operation blocked", "zh-CN": "高风险操作被阻止"}, "高風險送簽開始": {"en": "High-risk signing request started", "zh-CN": "高风险签名请求开始"}, "此頁只開放管理員。": {"en": "This page is available to administrators only.", "zh-CN": "此页仅供管理员使用。"}, "管理員驗證通過：": {"en": "Administrator verified: ", "zh-CN": "管理员验证通过："}, "目前管理員不是 active 狀態": {"en": "The current administrator is not active", "zh-CN": "当前管理员不是 active 状态"}, "目前管理員錢包尚未驗證": {"en": "The current administrator's wallet is unverified", "zh-CN": "当前管理员钱包尚未验证"}, "{count} 位會員錢包尚未驗證": {"en": "{count} members have unverified wallets", "zh-CN": "{count} 位会员钱包尚未验证"}, "{count} 位會員目前停權": {"en": "{count} members are suspended", "zh-CN": "{count} 位会员当前停权"}, "需留意：": {"en": "Attention: ", "zh-CN": "需留意："}, "目前帳戶安全摘要沒有需要立即處理的項目。": {"en": "No account security items currently require immediate action.", "zh-CN": "当前账户安全摘要没有需要立即处理的项目。"}, "未知": {"en": "Unknown", "zh-CN": "未知"}, "讀取失敗": {"en": "Loading failed", "zh-CN": "读取失败"}, "已暫停": {"en": "Paused", "zh-CN": "已暂停"}, "無候任管理者": {"en": "No pending owner", "zh-CN": "无候任管理员"}, "IPT 合約目前 paused = true": {"en": "The IPT contract currently has paused = true", "zh-CN": "IPT 合约当前 paused = true"}, "目前存在 pendingOwner": {"en": "A pendingOwner currently exists", "zh-CN": "当前存在 pendingOwner"}, "需注意": {"en": "Attention needed", "zh-CN": "需注意"}, "营運安全提醒：": {"en": "Operational security alert: ", "zh-CN": "运营安全提醒："}, "營運安全提醒：": {"en": "Operational security alert: ", "zh-CN": "运营安全提醒："}, "正式營運狀態正常：合約未暫停、目前沒有 pendingOwner。": {"en": "Operational status is normal: the contract is not paused and there is no pendingOwner.", "zh-CN": "正式运营状态正常：合约未暂停、当前没有 pendingOwner。"}, "檢查失敗": {"en": "Check failed", "zh-CN": "检查失败"}, "需檢查": {"en": "Check required", "zh-CN": "需检查"}, "鏈上安全狀態讀取失敗：": {"en": "Failed to load on-chain security status: ", "zh-CN": "链上安全状态读取失败："}, "近 24 小時有 {count} 筆角色／狀態相關稽核，請確認是否為預期操作。": {"en": "There were {count} role/status audit records in the last 24 hours. Check whether these operations were expected.", "zh-CN": "近 24 小时有 {count} 条角色／状态相关审计，请确认是否为预期操作。"}, "已讀取 {count} 筆最近管理稽核；近 24 小時未發現角色／狀態異動。": {"en": "Loaded {count} recent administrator audit records. No role/status changes were found in the last 24 hours.", "zh-CN": "已读取 {count} 条最近管理审计；近 24 小时未发现角色／状态变更。"}, "尚無稽核紀錄。": {"en": "No audit records yet.", "zh-CN": "暂无审计记录。"}, "目前管理員稽核讀取失敗：": {"en": "Failed to load the current administrator's audits: ", "zh-CN": "当前管理员审计读取失败："}, "管理員驗證失敗：": {"en": "Administrator verification failed: ", "zh-CN": "管理员验证失败："}, "近 24 小時：錢包切換 {wallet} 次｜安全阻擋 {blocked} 次｜高風險送簽 {sends} 次。": {"en": "Last 24 hours: wallet switches {wallet} / security blocks {blocked} / high-risk signing requests {sends}.", "zh-CN": "近 24 小时：钱包切换 {wallet} 次｜安全阻止 {blocked} 次｜高风险签名请求 {sends} 次。"}, "目前沒有本機高風險操作紀錄。": {"en": "No local high-risk operation records.", "zh-CN": "当前没有本机高风险操作记录。"}, "確定要清除這台裝置上的營運安全紀錄嗎？這不會刪除 Supabase 稽核或鏈上交易。": {"en": "Clear operational security records on this device? This does not delete Supabase audits or on-chain transactions.", "zh-CN": "确定要清除此设备上的运营安全记录吗？这不会删除 Supabase 审计或链上交易。"}};for(const [key,value] of Object.entries(entries)){for(const [lang,text] of Object.entries(value)){a.dictionaries[lang][key]=text;}}})();


// HF50-C22: account security and permission dialogs.
(()=>{const a=window.IPTI18N;if(!a)return;const entries={"帳戶安全與權限中心": {"en": "Account Security and Permissions Center", "zh-CN": "账户安全与权限中心"}, "集中管理管理員權限、會員停權、錢包驗證狀態、會員稽核與高風險操作入口。": {"en": "Manage administrator permissions, member suspensions, wallet verification, member audits and access to high-risk operations.", "zh-CN": "集中管理管理员权限、会员停权、钱包验证状态、会员审计与高风险操作入口。"}, "正在驗證管理員權限…": {"en": "Verifying administrator permissions…", "zh-CN": "正在验证管理员权限…"}, "安全總覽": {"en": "Security Overview", "zh-CN": "安全总览"}, "會員總數": {"en": "Total Members", "zh-CN": "会员总数"}, "正常會員": {"en": "Active Members", "zh-CN": "正常会员"}, "錢包已驗證": {"en": "Wallet Verified", "zh-CN": "钱包已验证"}, "錢包未驗證": {"en": "Wallet Unverified", "zh-CN": "钱包未验证"}, "正在分析安全狀態…": {"en": "Analyzing security status…", "zh-CN": "正在分析安全状态…"}, "管理員權限": {"en": "Administrator Permissions", "zh-CN": "管理员权限"}, "管理員可以操作會員權限與高風險功能。降級其他管理員前，系統會要求再次輸入會員編號；目前登入的管理員自己不提供角色修改按鈕。": {"en": "Administrators can manage member permissions and high-risk functions. Demoting another administrator requires entering their member number again. The signed-in administrator cannot change their own role on this page.", "zh-CN": "管理员可以操作会员权限与高风险功能。降级其他管理员前，系统会要求再次输入会员编号；当前登录的管理员不能在此页面修改自己的角色。"}, "會員安全管理": {"en": "Member Security Management", "zh-CN": "会员安全管理"}, "會員編號／暱稱／Email／錢包地址": {"en": "Member number / nickname / email / wallet address", "zh-CN": "会员编号／昵称／Email／钱包地址"}, "錢包驗證狀態": {"en": "Wallet Verification Status", "zh-CN": "钱包验证状态"}, "正在整理錢包狀態…": {"en": "Loading wallet status…", "zh-CN": "正在整理钱包状态…"}, "高風險操作入口": {"en": "High-risk Operations", "zh-CN": "高风险操作入口"}, "以下功能會直接影響鏈上資產或管理權。進入後仍會使用目前正式版已驗證的前置檢查與二次確認。": {"en": "These functions directly affect on-chain assets or ownership. The current release's pre-checks and additional confirmations still apply.", "zh-CN": "以下功能会直接影响链上资产或管理权。进入后仍会使用当前正式版已验证的预检查与二次确认。"}, "Mint 發行": {"en": "Mint IPT", "zh-CN": "Mint 发行"}, "暫停／恢復": {"en": "Pause / Unpause", "zh-CN": "暂停／恢复"}, "管理權交接": {"en": "Ownership Transfer", "zh-CN": "管理权交接"}, "完整會員管理": {"en": "Member Administration", "zh-CN": "完整会员管理"}, "會員安全明細／稽核": {"en": "Member Security Details and Audits", "zh-CN": "会员安全明细／审计"}, "關閉明細": {"en": "Close Details", "zh-CN": "关闭明细"}, "沒有管理員": {"en": "No administrators", "zh-CN": "没有管理员"}, "找不到目前管理員帳戶": {"en": "Current administrator account not found", "zh-CN": "找不到当前管理员账户"}, "目前管理員狀態為停權": {"en": "The current administrator is suspended", "zh-CN": "当前管理员状态为停权"}, "目前帳戶與權限狀態沒有發現需要立即處理的項目。": {"en": "No account or permission issues currently require immediate action.", "zh-CN": "当前账户与权限状态没有发现需要立即处理的项目。"}, "目前帳戶": {"en": "Current Account", "zh-CN": "当前账户"}, "降為一般會員": {"en": "Demote to Member", "zh-CN": "降为一般会员"}, "升級為管理員": {"en": "Promote to Administrator", "zh-CN": "升级为管理员"}, "恢復會員": {"en": "Restore Member", "zh-CN": "恢复会员"}, "停權會員": {"en": "Suspended Members", "zh-CN": "停权会员"}, "查看稽核": {"en": "View Audits", "zh-CN": "查看审计"}, "安全明細": {"en": "Security Details", "zh-CN": "安全明细"}, "查看錢包明細": {"en": "View Wallet Details", "zh-CN": "查看钱包明细"}, "角色／狀態": {"en": "Role / Status", "zh-CN": "角色／状态"}, "最近登入": {"en": "Last Sign-in", "zh-CN": "最近登录"}, "錢包驗證": {"en": "Wallet Verification", "zh-CN": "钱包验证"}, "尚無管理紀錄": {"en": "No administrator records yet", "zh-CN": "暂无管理记录"}, "目前沒有管理員資料。": {"en": "No administrator data is available.", "zh-CN": "当前没有管理员数据。"}, "沒有符合條件的會員。": {"en": "No matching members.", "zh-CN": "没有符合条件的会员。"}, "正在載入安全明細…": {"en": "Loading security details…", "zh-CN": "正在加载安全明细…"}, "正在載入安全與權限資料…": {"en": "Loading security and permission data…", "zh-CN": "正在加载安全与权限数据…"}, "正在更新會員狀態…": {"en": "Updating member status…", "zh-CN": "正在更新会员状态…"}, "正在更新會員角色…": {"en": "Updating member role…", "zh-CN": "正在更新会员角色…"}, "更新失敗：": {"en": "Update failed: ", "zh-CN": "更新失败："}, "載入失敗：": {"en": "Loading failed: ", "zh-CN": "加载失败："}, "會員編號不一致，操作已取消。": {"en": "The member number does not match. The operation was cancelled.", "zh-CN": "会员编号不一致，操作已取消。"}, "{action}會直接改變會員權限。是否繼續？": {"en": "{action} will directly change member permissions. Continue?", "zh-CN": "{action}会直接改变会员权限。是否继续？"}, "請輸入會員編號 {number} 以確認：": {"en": "Enter member number {number} to confirm:", "zh-CN": "请输入会员编号 {number} 以确认："}, "已驗證：": {"en": "Verified: ", "zh-CN": "已验证："}, "未驗證": {"en": "Unverified", "zh-CN": "未验证"}, "主錢包": {"en": "Primary Wallet", "zh-CN": "主钱包"}};for(const [key,value] of Object.entries(entries)){for(const [lang,text] of Object.entries(value)){a.dictionaries[lang][key]=text;}}})();


// HF50-C24: maintenance labels and native cache dialog.
(()=>{const a=window.IPTI18N;if(!a)return;const entries={"Independent Points V4.14.2｜維運中心": {"en": "Independent Points V4.14.2 | Maintenance Center", "zh-CN": "Independent Points V4.14.2｜维护中心"}, "維運中心": {"en": "Maintenance Center", "zh-CN": "维护中心"}, "版本、快取、PWA、Supabase、Sepolia 與 IPT 合約健康檢查。": {"en": "Health checks for the release, cache, PWA, Supabase, Sepolia and IPT contract.", "zh-CN": "版本、缓存、PWA、Supabase、Sepolia 与 IPT 合约健康检查。"}, "版本狀態": {"en": "Release Status", "zh-CN": "版本状态"}, "目前頁面版本": {"en": "Current Page Version", "zh-CN": "当前页面版本"}, "正式發佈版本": {"en": "Production Release", "zh-CN": "正式发布版本"}, "App 模式": {"en": "App Mode", "zh-CN": "App 模式"}, "正在確認版本…": {"en": "Checking release…", "zh-CN": "正在确认版本…"}, "系統健康檢查": {"en": "System Health Checks", "zh-CN": "系统健康检查"}, "待檢查": {"en": "Not Checked", "zh-CN": "待检查"}, "會員登入與資料庫連線": {"en": "Member sign-in and database connection", "zh-CN": "会员登录与数据库连接"}, "區塊高度與 RPC 回應": {"en": "Block height and RPC response", "zh-CN": "区块高度与 RPC 响应"}, "IPT 合約": {"en": "IPT Contract", "zh-CN": "IPT 合约"}, "totalSupply / paused 可讀性": {"en": "Read access to totalSupply / paused", "zh-CN": "totalSupply / paused 可读性"}, "登入會員": {"en": "Signed-in Member", "zh-CN": "登录会员"}, "Supabase Session / 會員資料": {"en": "Supabase session / member data", "zh-CN": "Supabase Session / 会员资料"}, "重新執行健康檢查": {"en": "Run Health Checks Again", "zh-CN": "重新执行健康检查"}, "PWA 與快取維護": {"en": "PWA and Cache Maintenance", "zh-CN": "PWA 与缓存维护"}, "檢查 App 更新": {"en": "Check App Updates", "zh-CN": "检查 App 更新"}, "重新載入頁面": {"en": "Reload Page", "zh-CN": "重新加载页面"}, "清除網站快取": {"en": "Clear Website Cache", "zh-CN": "清除网站缓存"}, "快取尚未操作。": {"en": "No cache operations yet.", "zh-CN": "尚未操作缓存。"}, "尚未產生。": {"en": "Not generated yet.", "zh-CN": "尚未生成。"}, "正在檢查 Service Worker 更新…": {"en": "Checking for Service Worker updates…", "zh-CN": "正在检查 Service Worker 更新…"}, "尚未註冊 Service Worker": {"en": "Service Worker is not registered", "zh-CN": "尚未注册 Service Worker"}, "發現新版本，重新載入後套用。": {"en": "A new version is available. Reload to apply it.", "zh-CN": "发现新版本，重新加载后应用。"}, "已完成更新檢查。": {"en": "Update check completed.", "zh-CN": "已完成更新检查。"}, "更新檢查失敗：": {"en": "Update check failed: ", "zh-CN": "更新检查失败："}, "確定要清除 Independent Points 的網站快取嗎？會員登入資料不會因此刪除，但頁面會重新下載。": {"en": "Clear the Independent Points website cache? Member sign-in data will be retained, and pages will be downloaded again.", "zh-CN": "确定要清除 Independent Points 的网站缓存吗？会员登录资料会保留，但页面会重新下载。"}, "已清除 {count} 個 IPT 快取。建議現在重新載入。": {"en": "Cleared {count} IPT caches. Reload the page now.", "zh-CN": "已清除 {count} 个 IPT 缓存。建议现在重新加载。"}, "清除快取失敗：": {"en": "Failed to clear cache: ", "zh-CN": "清除缓存失败："}, "診斷資訊已複製。": {"en": "Diagnostics copied.", "zh-CN": "诊断信息已复制。"}, "登入身分驗證失敗": {"en": "Sign-in identity verification failed", "zh-CN": "登录身份验证失败"}, "無效 decimals": {"en": "Invalid decimals", "zh-CN": "无效 decimals"}};for(const [key,value] of Object.entries(entries)){for(const [lang,text] of Object.entries(value)){a.dictionaries[lang][key]=text;}}})();


// HF50-C25: update center labels and Service Worker reset dialog.
(()=>{const a=window.IPTI18N;if(!a)return;const entries={"Independent Points V4.14.2｜版本更新中心": {"en": "Independent Points V4.14.2 | Update Center", "zh-CN": "Independent Points V4.14.2｜版本更新中心"}, "版本更新中心": {"en": "Update Center", "zh-CN": "版本更新中心"}, "更新前檢查、正式版本紀錄、發佈檔案清單、更新後驗證與快速回復。": {"en": "Pre-update checks, release history, release file list, post-update validation and recovery.", "zh-CN": "更新前检查、正式版本记录、发布文件清单、更新后验证与快速恢复。"}, "正在確認管理員身分…": {"en": "Verifying administrator identity…", "zh-CN": "正在确认管理员身份…"}, "版本資訊": {"en": "Release Information", "zh-CN": "版本信息"}, "目前頁面": {"en": "Current Page", "zh-CN": "当前页面"}, "正式版本": {"en": "Production Release", "zh-CN": "正式版本"}, "回復版本": {"en": "Rollback Release", "zh-CN": "恢复版本"}, "更新通道": {"en": "Release Channel", "zh-CN": "更新通道"}, "正在讀取版本資訊…": {"en": "Loading release information…", "zh-CN": "正在读取版本信息…"}, "更新前檢查": {"en": "Pre-update Checks", "zh-CN": "更新前检查"}, "執行更新前檢查": {"en": "Run Pre-update Checks", "zh-CN": "执行更新前检查"}, "更新後健康驗證": {"en": "Post-update Health Checks", "zh-CN": "更新后健康验证"}, "執行更新後健康驗證": {"en": "Run Post-update Health Checks", "zh-CN": "执行更新后健康验证"}, "尚未執行。": {"en": "Not run yet.", "zh-CN": "尚未执行。"}, "正式發佈檔案清單": {"en": "Production Release File List", "zh-CN": "正式发布文件清单"}, "正在載入發佈清單…": {"en": "Loading release file list…", "zh-CN": "正在加载发布清单…"}, "版本更新歷程": {"en": "Release History", "zh-CN": "版本更新历史"}, "Service Worker / 快取": {"en": "Service Worker / Cache", "zh-CN": "Service Worker / 缓存"}, "檢查 Service Worker 更新": {"en": "Check Service Worker Updates", "zh-CN": "检查 Service Worker 更新"}, "重設舊版 Service Worker": {"en": "Reset Service Worker", "zh-CN": "重置旧版 Service Worker"}, "尚未操作。": {"en": "No operations yet.", "zh-CN": "尚未操作。"}, "異常回復": {"en": "Recovery", "zh-CN": "异常恢复"}, "若新版本異常，先清除 IPT 快取並重新載入；若仍異常，再重新上傳指定回復版本，不需改動 Supabase、Owner、pendingOwner 或 paused 狀態。": {"en": "If a new release has issues, clear the IPT cache and reload. If the issue remains, upload the designated rollback release. No changes to Supabase, Owner, pendingOwner or paused state are needed.", "zh-CN": "若新版本异常，先清除 IPT 缓存并重新加载；若仍异常，再重新上传指定恢复版本，无需改动 Supabase、Owner、pendingOwner 或 paused 状态。"}, "已下載新 Service Worker，重新載入後套用。": {"en": "A new Service Worker has been downloaded. Reload to apply it.", "zh-CN": "已下载新 Service Worker，重新加载后应用。"}, "確定要重設 Independent Points 的 Service Worker 與 IPT 快取嗎？登入資料不會因此刪除，但頁面會重新下載。": {"en": "Reset the Independent Points Service Worker and IPT cache? Sign-in data will be retained, and pages will be downloaded again.", "zh-CN": "确定要重置 Independent Points 的 Service Worker 与 IPT 缓存吗？登录资料会保留，但页面会重新下载。"}, "正在重設…": {"en": "Resetting…", "zh-CN": "正在重置…"}, "已重設 Service Worker 與 IPT 快取。請按『重新載入』。": {"en": "Service Worker and IPT cache reset. Tap Reload.", "zh-CN": "已重置 Service Worker 与 IPT 缓存。请点击“重新加载”。"}, "重設失敗：": {"en": "Reset failed: ", "zh-CN": "重置失败："}, "目前頁面與正式發佈版本一致。": {"en": "The current page matches the production release.", "zh-CN": "当前页面与正式发布版本一致。"}, "目前頁面 V4.14.2｜正式版本 {version}": {"en": "Current page: V4.14.2 | Production release: {version}", "zh-CN": "当前页面 V4.14.2｜正式版本 {version}"}, "版本資訊載入失敗：": {"en": "Failed to load release information: ", "zh-CN": "版本信息加载失败："}, "發佈清單載入失敗。": {"en": "Failed to load the release file list.", "zh-CN": "发布清单加载失败。"}, "尚未登入會員": {"en": "You are not signed in", "zh-CN": "尚未登录会员"}, "管理員需要完成 MFA AAL2 驗證": {"en": "Administrators must complete MFA AAL2 verification", "zh-CN": "管理员需要完成 MFA AAL2 验证"}, "此頁只開放管理員": {"en": "This page is restricted to administrators", "zh-CN": "此页面仅向管理员开放"}, "沒有有效登入身分": {"en": "No valid sign-in identity", "zh-CN": "没有有效登录身份"}, "MFA 尚未達 AAL2": {"en": "MFA has not reached AAL2", "zh-CN": "MFA 尚未达到 AAL2"}, "不是管理員": {"en": "You are not an administrator", "zh-CN": "不是管理员"}};for(const [key,value] of Object.entries(entries)){for(const [lang,text] of Object.entries(value)){a.dictionaries[lang][key]=text;}}})();
