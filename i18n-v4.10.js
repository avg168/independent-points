(() => {
  "use strict";
  const STORAGE_KEY="ipt_language";
  const SUPPORTED=["zh-TW","zh-CN","en"];
  const DICT={
    "zh-CN":{"Independent Points V4.10.2｜正式整合首頁":"Independent Points V4.10.2｜正式整合首页","會員、錢包、IPT 資產、交易與管理，一個正式入口完成。":"会员、钱包、IPT 资产、交易与管理，一个正式入口完成。","快速導覽":"快速导航","首頁":"首页","我的資產":"我的资产","IPT 轉帳":"IPT 转账","管理中心":"管理中心","這組導覽是一般頁面內容，不會被 Android 瀏覽器底部工具列蓋住。":"这组导航是一般页面内容，不会被 Android 浏览器底部工具栏盖住。","我的帳戶":"我的账户","正在確認登入狀態…":"正在确认登录状态…","重新整理":"重新整理","會員登入／主錢包":"会员登录／主钱包","我的 IPT":"我的 IPT","目前餘額":"当前余额","累計轉入":"累计转入","累計轉出":"累计转出","交易筆數":"交易笔数","為避免手機首頁卡住，完整鏈上統計改為手動更新。":"为避免手机首页卡住，完整链上统计改为手动更新。","更新完整資產摘要":"更新完整资产摘要","尚未更新完整資產摘要。":"尚未更新完整资产摘要。","會員功能":"会员功能","餘額、轉入轉出、CSV、PDF 報表":"余额、转入转出、CSV、PDF 报表","查看點數":"查看点数","進入 IPT 錢包查看鏈上餘額":"进入 IPT 钱包查看链上余额","前置檢查後由 Trust Wallet 核准":"前置检查后由 Trust Wallet 核准","收款":"收款","回到主錢包頁使用收款功能":"回到主钱包页使用收款功能","交易紀錄":"交易记录","查看自己的 IPT 鏈上交易明細":"查看自己的 IPT 链上交易明细","資產中心":"资产中心","會員／管理員報表統一入口":"会员／管理员报表统一入口","系統資訊":"系统信息","版本、網路、合約與更新資訊":"版本、网络、合约与更新信息","維運中心":"运维中心","版本、快取、Supabase、Sepolia 與合約健康檢查":"版本、缓存、Supabase、Sepolia 与合约健康检查","資產彙總":"资产汇总","會員資產、區間報表、CSV、PDF":"会员资产、区间报表、CSV、PDF","會員管理":"会员管理","回主系統進入會員管理功能":"回主系统进入会员管理功能","管理者發行 IPT":"管理员发行 IPT","暫停／恢復":"暂停／恢复","管理 IPT 合約交易狀態":"管理 IPT 合约交易状态","管理權":"管理权","Owner / pendingOwner 交接":"Owner / pendingOwner 交接","進階功能":"高级功能","回到完整 IPT 系統操作頁":"回到完整 IPT 系统操作页","系統更新":"系统更新","版本、備份、更新檢查與快速回復":"版本、备份、更新检查与快速恢复","安全與權限":"安全与权限","管理員、停權、錢包驗證與稽核":"管理员、停权、钱包验证与稽核","營運安全":"运营安全","高風險操作保護、錢包切換與安全事件":"高风险操作保护、钱包切换与安全事件","事件與通知":"事件与通知","營運事件、管理稽核、未讀與裝置通知":"运营事件、管理稽核、未读与设备通知","正式營運安全":"正式运营安全","安裝 Independent Points":"安装 Independent Points","直接安裝 App":"直接安装 App","用 Chrome 開啟安裝":"用 Chrome 打开安装","複製正式網址":"复制正式网址","正在檢查此瀏覽器的安裝能力…":"正在检查此浏览器的安装能力…","返回首頁":"返回首页","返回 V4.10.2 首頁":"返回 V4.10.2 首页","管理員驗證":"管理员验证","事件總覽":"事件总览","全部事件":"全部事件","未讀":"未读","重要／警告":"重要／警告","近 24 小時":"近 24 小时","裝置通知":"设备通知","啟用系統通知":"启用系统通知","啟用頁面內提醒":"启用页面内提醒","測試通知":"测试通知","事件篩選":"事件筛选","全部來源":"全部来源","全部等級":"全部等级","全部狀態":"全部状态","全部標記已讀":"全部标记已读","匯出 CSV":"导出 CSV","事件列表":"事件列表","載入更多會員管理稽核":"加载更多会员管理稽核","高風險安全":"高风险安全","管理稽核":"管理稽核","系統／鏈上":"系统／链上","重要":"重要","警告":"警告","一般":"一般","正常":"正常","已讀":"已读","快速入口":"快速入口","營運事件與通知中心":"运营事件与通知中心","帳戶安全與權限中心":"账户安全与权限中心","安全總覽":"安全总览","會員總數":"会员总数","正常會員":"正常会员","停權會員":"停权会员","錢包已驗證":"钱包已验证","錢包未驗證":"钱包未验证","管理員權限":"管理员权限","會員安全管理":"会员安全管理","錢包驗證狀態":"钱包验证状态","高風險操作入口":"高风险操作入口","會員安全明細／稽核":"会员安全明细／稽核","營運安全中心":"运营安全中心","正式營運狀態":"正式运营状态","帳戶安全摘要":"账户安全摘要","高風險操作紀錄（本機）":"高风险操作记录（本机）","最近管理稽核":"最近管理稽核","快速安全維運":"快速安全运维","版本更新中心":"版本更新中心","版本狀態":"版本状态","系統健康檢查":"系统健康检查","PWA 與快取維護":"PWA 与缓存维护","診斷資訊":"诊断信息","更新前檢查":"更新前检查","更新後健康驗證":"更新后健康验证","正式發佈檔案清單":"正式发布文件清单","版本更新歷程":"版本更新历史","Service Worker / 快取":"Service Worker / 缓存","異常回復":"异常恢复","正式產品化里程碑":"正式产品化里程碑","網路":"网络","Chain ID":"Chain ID","IPT 合約":"IPT 合约","錢包流程":"钱包流程","重新讀取鏈上資料":"重新读取链上数据","連接錢包":"连接钱包","連接 Trust Wallet":"连接 Trust Wallet","目前錢包":"当前钱包","安全角色":"安全角色","操作視窗":"操作窗口","保護規則":"保护规则","未啟用":"未启用","啟用 60 秒操作視窗":"启用 60 秒操作窗口","查看營運安全紀錄":"查看运营安全记录","管理中心：發行 IPT":"管理中心：发行 IPT","管理中心：暫停／恢復":"管理中心：暂停／恢复","管理中心：管理權交接":"管理中心：管理权交接","準備操作":"准备操作","鏈上 paused 狀態":"链上 paused 状态","目前 Owner":"当前 Owner","目前 pendingOwner":"当前 pendingOwner","無候任管理者":"无候任管理员","候任管理者錢包地址":"候任管理员钱包地址","會員":"会员","角色／狀態":"角色／状态","最近登入":"最近登录","錢包驗證":"钱包验证","主錢包":"主钱包","已驗證":"已验证","尚未綁定錢包":"尚未绑定钱包","搜尋":"搜索","清除":"清除","重新檢查":"重新检查","重新載入":"重新加载","開啟維運中心":"打开运维中心","開啟版本更新中心":"打开版本更新中心","開啟安全與權限中心":"打开安全与权限中心","開啟營運安全中心":"打开运营安全中心","開啟事件與通知中心":"打开事件与通知中心","正式版本":"正式版本","回復版本":"恢复版本","更新通道":"更新通道","目前頁面版本":"当前页面版本","App 模式":"App 模式","檢查 App 更新":"检查 App 更新","清除網站快取":"清除网站缓存","返回系統":"返回系统","語言":"语言","V4.10.2 操作體驗整合":"V4.10.2 操作体验整合","V4.10.2 防卡版：首頁會員資料先完成，完整鏈上統計改為需要時才更新。":"V4.10.2 防卡版：首页会员资料先完成，完整链上统计改为需要时才更新。","V4.10.2 已作為正式統一首頁，新增帳戶安全與權限管理中心。原本通過驗證的錢包核心保留在 wallet-core-v4.10.html；會員與管理員資產報表已統一為目前正式報表模組。":"V4.10.2 已作为正式统一首页，新增账户安全与权限管理中心。已验证的钱包核心保留在 wallet-core-v4.10.html；会员与管理员资产报表已统一为当前正式报表模块。","V4.10.2 正式營運版：新增事件與通知中心，集中管理高風險事件、管理稽核、鏈上營運狀態與裝置通知。":"V4.10.2 正式运营版：新增事件与通知中心，集中管理高风险事件、管理稽核、链上运营状态与设备通知。","若目前瀏覽器支援 PWA，可直接安裝；Trust Wallet／WebView 不支援時，可一鍵改用 Chrome 開啟正式安裝頁。":"若当前浏览器支持 PWA，可直接安装；Trust Wallet／WebView 不支持时，可一键改用 Chrome 打开正式安装页。"},
    "en":{"Independent Points V4.10.2｜正式整合首頁":"Independent Points V4.10.2 | Unified Home","會員、錢包、IPT 資產、交易與管理，一個正式入口完成。":"Members, wallets, IPT assets, transactions and administration in one unified entry point.","快速導覽":"Quick Navigation","首頁":"Home","我的資產":"My Assets","IPT 轉帳":"IPT Transfer","管理中心":"Admin Center","這組導覽是一般頁面內容，不會被 Android 瀏覽器底部工具列蓋住。":"This navigation is part of the page, so it will not be covered by Android browser controls.","我的帳戶":"My Account","正在確認登入狀態…":"Checking sign-in status…","重新整理":"Refresh","會員登入／主錢包":"Member Sign-in / Primary Wallet","我的 IPT":"My IPT","目前餘額":"Current Balance","累計轉入":"Total In","累計轉出":"Total Out","交易筆數":"Transactions","為避免手機首頁卡住，完整鏈上統計改為手動更新。":"To keep mobile responsive, full on-chain statistics update only when requested.","更新完整資產摘要":"Update Full Asset Summary","尚未更新完整資產摘要。":"Full asset summary has not been updated yet.","會員功能":"Member Features","餘額、轉入轉出、CSV、PDF 報表":"Balance, transfers, CSV and PDF reports","查看點數":"View Points","進入 IPT 錢包查看鏈上餘額":"Open the IPT wallet to view the on-chain balance","前置檢查後由 Trust Wallet 核准":"Pre-check first, then approve in Trust Wallet","收款":"Receive","回到主錢包頁使用收款功能":"Use the primary wallet page to receive IPT","交易紀錄":"Transaction History","查看自己的 IPT 鏈上交易明細":"View your IPT on-chain transaction history","資產中心":"Asset Center","會員／管理員報表統一入口":"Unified member/admin reporting","系統資訊":"System Info","版本、網路、合約與更新資訊":"Version, network, contract and update information","維運中心":"Operations Center","版本、快取、Supabase、Sepolia 與合約健康檢查":"Version, cache, Supabase, Sepolia and contract health checks","資產彙總":"Asset Summary","會員資產、區間報表、CSV、PDF":"Member assets, period reports, CSV and PDF","會員管理":"Member Management","回主系統進入會員管理功能":"Open member management in the main system","管理者發行 IPT":"Admin IPT issuance","暫停／恢復":"Pause / Unpause","管理 IPT 合約交易狀態":"Manage IPT contract transfer status","管理權":"Ownership","Owner / pendingOwner 交接":"Owner / pendingOwner handover","進階功能":"Advanced","回到完整 IPT 系統操作頁":"Open the full IPT operations page","系統更新":"System Updates","版本、備份、更新檢查與快速回復":"Versions, backups, update checks and rollback","安全與權限":"Security & Access","管理員、停權、錢包驗證與稽核":"Admins, suspensions, wallet verification and audit","營運安全":"Operations Security","高風險操作保護、錢包切換與安全事件":"High-risk protection, wallet changes and security events","事件與通知":"Events & Alerts","營運事件、管理稽核、未讀與裝置通知":"Operational events, admin audit, unread items and device alerts","正式營運安全":"Production Security","安裝 Independent Points":"Install Independent Points","直接安裝 App":"Install App","用 Chrome 開啟安裝":"Open in Chrome to Install","複製正式網址":"Copy Official URL","正在檢查此瀏覽器的安裝能力…":"Checking installation support…","返回首頁":"Back to Home","返回 V4.10.2 首頁":"Back to V4.10.2 Home","管理員驗證":"Admin Verification","事件總覽":"Event Overview","全部事件":"All Events","未讀":"Unread","重要／警告":"Critical / Warning","近 24 小時":"Last 24 Hours","裝置通知":"Device Alerts","啟用系統通知":"Enable System Notifications","啟用頁面內提醒":"Enable In-page Alerts","測試通知":"Test Alert","事件篩選":"Event Filters","全部來源":"All Sources","全部等級":"All Levels","全部狀態":"All Statuses","全部標記已讀":"Mark All Read","匯出 CSV":"Export CSV","事件列表":"Event List","載入更多會員管理稽核":"Load More Member Audit Logs","高風險安全":"High-risk Security","管理稽核":"Admin Audit","系統／鏈上":"System / On-chain","重要":"Critical","警告":"Warning","一般":"Info","正常":"Normal","已讀":"Read","快速入口":"Quick Links","營運事件與通知中心":"Operations Events & Alerts","帳戶安全與權限中心":"Account Security & Access","安全總覽":"Security Overview","會員總數":"Members","正常會員":"Active Members","停權會員":"Suspended Members","錢包已驗證":"Verified Wallets","錢包未驗證":"Unverified Wallets","管理員權限":"Admin Access","會員安全管理":"Member Security","錢包驗證狀態":"Wallet Verification","高風險操作入口":"High-risk Operations","會員安全明細／稽核":"Member Security Details / Audit","營運安全中心":"Operations Security Center","正式營運狀態":"Production Status","帳戶安全摘要":"Account Security Summary","高風險操作紀錄（本機）":"High-risk Events (Local)","最近管理稽核":"Recent Admin Audit","快速安全維運":"Security Operations","版本更新中心":"Version Update Center","版本狀態":"Version Status","系統健康檢查":"System Health Check","PWA 與快取維護":"PWA & Cache Maintenance","診斷資訊":"Diagnostics","更新前檢查":"Pre-update Check","更新後健康驗證":"Post-update Health Check","正式發佈檔案清單":"Release File List","版本更新歷程":"Release History","Service Worker / 快取":"Service Worker / Cache","異常回復":"Recovery","正式產品化里程碑":"Production Milestone","網路":"Network","Chain ID":"Chain ID","IPT 合約":"IPT Contract","錢包流程":"Wallet Flow","重新讀取鏈上資料":"Reload On-chain Data","連接錢包":"Connect Wallet","連接 Trust Wallet":"Connect Trust Wallet","目前錢包":"Current Wallet","安全角色":"Security Role","操作視窗":"Operation Window","保護規則":"Protection Rule","未啟用":"Inactive","啟用 60 秒操作視窗":"Enable 60-second Window","查看營運安全紀錄":"View Security Events","管理中心：發行 IPT":"Admin: Mint IPT","管理中心：暫停／恢復":"Admin: Pause / Unpause","管理中心：管理權交接":"Admin: Ownership Handover","準備操作":"Prepare Operation","鏈上 paused 狀態":"On-chain paused Status","目前 Owner":"Current Owner","目前 pendingOwner":"Current pendingOwner","無候任管理者":"No pending owner","候任管理者錢包地址":"Pending Owner Wallet Address","會員":"Member","角色／狀態":"Role / Status","最近登入":"Last Sign-in","錢包驗證":"Wallet Verification","主錢包":"Primary Wallet","已驗證":"Verified","尚未綁定錢包":"No Wallet Linked","搜尋":"Search","清除":"Clear","重新檢查":"Recheck","重新載入":"Reload","開啟維運中心":"Open Operations Center","開啟版本更新中心":"Open Version Update Center","開啟安全與權限中心":"Open Security & Access","開啟營運安全中心":"Open Operations Security","開啟事件與通知中心":"Open Events & Alerts","正式版本":"Production Version","回復版本":"Rollback Version","更新通道":"Update Channel","目前頁面版本":"Current Page Version","App 模式":"App Mode","檢查 App 更新":"Check App Update","清除網站快取":"Clear Site Cache","返回系統":"Back to System","語言":"Language","V4.10.2 操作體驗整合":"V4.10.2 Unified Experience","V4.10.2 防卡版：首頁會員資料先完成，完整鏈上統計改為需要時才更新。":"V4.10.2 mobile-safe mode: member data loads first; full on-chain statistics update only when requested.","V4.10.2 已作為正式統一首頁，新增帳戶安全與權限管理中心。原本通過驗證的錢包核心保留在 wallet-core-v4.10.html；會員與管理員資產報表已統一為目前正式報表模組。":"V4.10.2 is the unified production home. The verified wallet core remains in wallet-core-v4.10.html, and member/admin reports use the current production reporting modules.","V4.10.2 正式營運版：新增事件與通知中心，集中管理高風險事件、管理稽核、鏈上營運狀態與裝置通知。":"V4.10.2 production release adds the Events & Alerts Center for high-risk events, admin audit, on-chain operational status and device alerts.","若目前瀏覽器支援 PWA，可直接安裝；Trust Wallet／WebView 不支援時，可一鍵改用 Chrome 開啟正式安裝頁。":"If this browser supports PWA installation, install directly. If Trust Wallet/WebView does not, open the official install page in Chrome."}
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
  function translateExact(text,lang){
    if(lang==="zh-TW") return text;
    const dict=DICT[lang]||{};
    if(Object.prototype.hasOwnProperty.call(dict,text)) return dict[text];

    // Dynamic UI strings often contain dates, counts, addresses, etc.
    // Translate known phrases inside the text, longest key first.
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

    const raw=node.nodeValue ?? "";
    const trimmed=raw.trim();
    if(!trimmed) return;

    const last=node.__iptI18nLast;
    if(node.__iptI18nOriginal===undefined || (last!==undefined && raw!==last)){
      node.__iptI18nOriginal=raw;
    }
    const original=node.__iptI18nOriginal ?? raw;
    const core=original.trim();
    if(/^0x[a-fA-F0-9]{8,}$/.test(core) || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(core)){
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
