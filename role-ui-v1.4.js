/* Independent Points Role UI V1.4.1
   Freeze-safe role separation for Sepolia test mode.
   This is UI-only. Smart contract permissions remain the final authority.
*/
"use strict";

(() => {
  const EXPECTED_OWNER =
    "0xfEDF5073E6664cb0a11Cc9954AE3d1CF6F554BC4";
  const EXPECTED_CONTRACT =
    "0xd3fb2480aadb8b168ec7e88a0e5c847d9750cb87";

  const $ = id => document.getElementById(id);
  const norm = v =>
    String(v || "").trim().toLowerCase().replace(/\s+/g, "");

  let scheduled = false;
  let lastSignature = "";

  function scheduleUpdate() {
    if (scheduled) return;
    scheduled = true;
    requestAnimationFrame(() => {
      scheduled = false;
      updateRoleUI();
    });
  }

  function sectionByHeading(text) {
    const headings = [...document.querySelectorAll("section h2")];
    const h = headings.find(x =>
      (x.textContent || "").includes(text)
    );
    return h ? h.closest("section") : null;
  }

  function ensureModeBanner() {
    let box = document.getElementById("iptRoleBanner");
    if (box) return box;

    const panel = $("rolePanel");
    if (!panel) return null;

    box = document.createElement("div");
    box.id = "iptRoleBanner";
    box.style.cssText =
      "margin:12px 0;padding:13px 15px;border-radius:12px;" +
      "font:700 15px/1.45 system-ui,-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;" +
      "background:#eef3fb;color:#17365d;border:1px solid #cdd9ea";
    panel.appendChild(box);
    return box;
  }

  function setText(el, value) {
    if (el && el.textContent !== value) el.textContent = value;
  }

  function setStyle(el, prop, value) {
    if (el && el.style[prop] !== value) el.style[prop] = value;
  }

  function setVisible(el, yes) {
    if (!el) return;
    const wanted = yes ? "" : "none";
    if (el.style.display !== wanted) {
      el.style.display = wanted;
    }
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
    const isOwner =
      connected && wallet === norm(EXPECTED_OWNER);
    const contractOk =
      !contract || contract === norm(EXPECTED_CONTRACT);

    // Avoid unnecessary repeated DOM writes.
    const signature = [
      wallet,
      contract,
      connected ? "1" : "0",
      isOwner ? "1" : "0",
      contractOk ? "1" : "0"
    ].join("|");

    if (signature === lastSignature) return;
    lastSignature = signature;

    const roleLabel = $("roleLabel");
    const roleMode = $("roleModeLabel");
    const roleHint = $("roleHint");
    const banner = ensureModeBanner();

    const mintSection =
      sectionByHeading("③ 管理者發行點數");
    const ownershipSection =
      sectionByHeading("管理權交接");

    setVisible(mintSection, isOwner);
    setVisible(ownershipSection, isOwner);

    if (!connected) {
      setText(roleLabel, "尚未連線");
      setText(roleMode, "等待 WalletConnect");
      setText(
        roleHint,
        "連線後會依鏈上 owner 與目前錢包自動切換「一般會員」或「管理者」介面。"
      );

      if (banner) {
        setText(
          banner,
          "尚未連線：目前不開放任何鏈上操作。"
        );
        setStyle(banner, "background", "#eef3fb");
        setStyle(banner, "color", "#17365d");
      }
      return;
    }

    if (!contractOk) {
      setText(roleLabel, "安全檢查");
      setText(roleMode, "合約地址不一致");
      setText(
        roleHint,
        "目前合約地址與 IPT Sepolia 測試合約不一致；請停止所有交易並核對合約。"
      );

      if (banner) {
        setText(
          banner,
          "⚠ 合約地址不一致：請勿執行 Mint / Transfer / Burn。"
        );
        setStyle(banner, "background", "#fff0f0");
        setStyle(banner, "color", "#9e2b2b");
      }
      return;
    }

    if (isOwner) {
      setText(roleLabel, "管理者");
      setText(roleMode, "Owner 管理模式");
      setText(
        roleHint,
        "目前錢包與鏈上 owner 一致。管理者區塊已顯示；Mint、暫停與管理權交接仍需 Trust Wallet 簽名與合約驗證。"
      );

      if (banner) {
        setText(
          banner,
          "管理者模式：可查看一般功能與管理者功能。請確認每筆交易都是 Sepolia、0 ETH（除 Gas）。"
        );
        setStyle(banner, "background", "#e9f7ef");
        setStyle(banner, "color", "#176c4d");
      }
    } else {
      setText(roleLabel, "一般會員");
      setText(roleMode, "一般錢包模式");
      setText(
        roleHint,
        "目前錢包不是鏈上 owner。管理者功能已隱藏；可使用餘額查詢、點數轉移、自行銷毀與交易紀錄。"
      );

      if (banner) {
        setText(
          banner,
          "一般會員模式：管理者發行、暫停與管理權交接已隱藏。"
        );
        setStyle(banner, "background", "#eef3fb");
        setStyle(banner, "color", "#17365d");
      }
    }
  }

  function watch() {
    scheduleUpdate();

    // IMPORTANT:
    // Do NOT observe rolePanel itself. V1.4 observed the same
    // panel that it edited, which could create a mutation loop
    // and freeze some Android browsers.
    const targets = [
      $("walletLabel"),
      $("stateLabel"),
      $("currentOwnerLabel")
    ].filter(Boolean);

    const obs = new MutationObserver(() => {
      scheduleUpdate();
    });

    for (const n of targets) {
      obs.observe(n, {
        subtree: true,
        childList: true,
        characterData: true
      });
    }

    const contractInput = $("contractAddress");
    if (contractInput) {
      contractInput.addEventListener(
        "input",
        scheduleUpdate,
        { passive: true }
      );
      contractInput.addEventListener(
        "change",
        scheduleUpdate,
        { passive: true }
      );
    }

    // Low-frequency fallback only.
    setInterval(scheduleUpdate, 5000);
  }

  if (document.readyState === "loading") {
    document.addEventListener(
      "DOMContentLoaded",
      watch,
      { once: true }
    );
  } else {
    watch();
  }
})();
