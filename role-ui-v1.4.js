/* Independent Points Role UI V1.4
   UI-only role separation for Sepolia test mode.
   It does NOT change contract permissions. The smart contract remains the final authority.
*/
"use strict";

(() => {
  const EXPECTED_OWNER = "0xfEDF5073E6664cb0a11Cc9954AE3d1CF6F554BC4";
  const EXPECTED_CONTRACT = "0xd3fb2480aadb8b168ec7e88a0e5c847d9750cb87";

  const $ = id => document.getElementById(id);
  const norm = v => String(v || "").trim().toLowerCase().replace(/\s+/g, "");

  function sectionByHeading(text) {
    const headings = [...document.querySelectorAll("section h2")];
    const h = headings.find(x => (x.textContent || "").includes(text));
    return h ? h.closest("section") : null;
  }

  function ensureModeBanner() {
    let box = document.getElementById("iptRoleBanner");
    if (box) return box;

    box = document.createElement("div");
    box.id = "iptRoleBanner";
    box.style.cssText =
      "margin:12px 0;padding:13px 15px;border-radius:12px;" +
      "font:700 15px/1.45 system-ui,-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;" +
      "background:#eef3fb;color:#17365d;border:1px solid #cdd9ea";
    const panel = $("rolePanel");
    if (panel) panel.appendChild(box);
    return box;
  }

  function setVisible(el, yes) {
    if (!el) return;
    el.hidden = !yes;
    el.style.display = yes ? "" : "none";
  }

  function currentWallet() {
    const label = $("walletLabel");
    if (!label) return "";
    const t = norm(label.textContent);
    return /^0x[a-f0-9]{40}$/.test(t) ? t : "";
  }

  function currentContract() {
    const input = $("contractAddress");
    const t = norm(input?.value);
    return /^0x[a-f0-9]{40}$/.test(t) ? t : "";
  }

  function updateRoleUI() {
    const wallet = currentWallet();
    const contract = currentContract();
    const connected = !!wallet;
    const isOwner = connected && wallet === norm(EXPECTED_OWNER);
    const contractOk = !contract || contract === norm(EXPECTED_CONTRACT);

    const roleLabel = $("roleLabel");
    const roleMode = $("roleModeLabel");
    const roleHint = $("roleHint");
    const banner = ensureModeBanner();

    const mintSection = sectionByHeading("③ 管理者發行點數");
    const ownershipSection = sectionByHeading("管理權交接");

    // General/member-visible sections remain available:
    // balance, transfer, burn, history, lookup, pending tracking.
    setVisible(mintSection, isOwner);
    setVisible(ownershipSection, isOwner);

    if (!connected) {
      if (roleLabel) roleLabel.textContent = "尚未連線";
      if (roleMode) roleMode.textContent = "等待 WalletConnect";
      if (roleHint) roleHint.textContent =
        "連線後會依鏈上 owner 與目前錢包自動切換「一般會員」或「管理者」介面。";
      banner.textContent = "尚未連線：目前不開放任何鏈上操作。";
      banner.style.background = "#eef3fb";
      banner.style.color = "#17365d";
      return;
    }

    if (!contractOk) {
      if (roleLabel) roleLabel.textContent = "安全檢查";
      if (roleMode) roleMode.textContent = "合約地址不一致";
      if (roleHint) roleHint.textContent =
        "目前合約地址與 IPT Sepolia 測試合約不一致；請停止所有交易並核對合約。";
      banner.textContent = "⚠ 合約地址不一致：請勿執行 Mint / Transfer / Burn。";
      banner.style.background = "#fff0f0";
      banner.style.color = "#9e2b2b";
      return;
    }

    if (isOwner) {
      if (roleLabel) roleLabel.textContent = "管理者";
      if (roleMode) roleMode.textContent = "Owner 管理模式";
      if (roleHint) roleHint.textContent =
        "目前錢包與鏈上 owner 一致。管理者區塊已顯示；Mint、暫停與管理權交接仍需 Trust Wallet 簽名與合約驗證。";
      banner.textContent =
        "管理者模式：可查看一般功能與管理者功能。請確認每筆交易都是 Sepolia、0 ETH（除 Gas）。";
      banner.style.background = "#e9f7ef";
      banner.style.color = "#176c4d";
    } else {
      if (roleLabel) roleLabel.textContent = "一般會員";
      if (roleMode) roleMode.textContent = "一般錢包模式";
      if (roleHint) roleHint.textContent =
        "目前錢包不是鏈上 owner。管理者功能已隱藏；可使用餘額查詢、點數轉移、自行銷毀與交易紀錄。";
      banner.textContent =
        "一般會員模式：管理者發行、暫停與管理權交接已隱藏。";
      banner.style.background = "#eef3fb";
      banner.style.color = "#17365d";
    }
  }

  function watch() {
    updateRoleUI();

    const obs = new MutationObserver(() => updateRoleUI());
    const nodes = [
      $("walletLabel"),
      $("stateLabel"),
      $("currentOwnerLabel"),
      $("rolePanel")
    ].filter(Boolean);

    for (const n of nodes) {
      obs.observe(n, {
        subtree: true,
        childList: true,
        characterData: true,
        attributes: true
      });
    }

    const contractInput = $("contractAddress");
    if (contractInput) {
      contractInput.addEventListener("input", updateRoleUI);
      contractInput.addEventListener("change", updateRoleUI);
    }

    // WalletConnect can return to the page asynchronously.
    setInterval(updateRoleUI, 1500);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", watch);
  } else {
    watch();
  }
})();
