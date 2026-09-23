/* Independent Points app loader V1.3.2
   Loads the existing app.js, but routes all window.ethereum access
   directly through window.IPTWalletConnectBridge.
   This avoids Trust Wallet Android versions where injected
   window.ethereum is read-only / non-configurable.
*/
"use strict";

(async () => {
  const STATUS_ID = "status";

  function show(msg, bad = false) {
    const el = document.getElementById(STATUS_ID);
    if (!el) return;
    el.textContent = msg;
    if (bad) el.style.color = "#bd2929";
  }

  try {
    if (!window.IPTWalletConnectBridge) {
      throw new Error("WalletConnect Bridge 尚未載入。");
    }

    // Cache-bust app.js itself.
    const res = await fetch("./app.js?v=132", { cache: "no-store" });
    if (!res.ok) {
      throw new Error("app.js 載入失敗：HTTP " + res.status);
    }

    let code = await res.text();

    // Route the existing application to the dedicated WalletConnect bridge.
    // This preserves the existing app.js logic while removing dependency on
    // Trust Wallet's injected window.ethereum object.
    code = code.replace(
      /window\.ethereum/g,
      "window.IPTWalletConnectBridge"
    );

    // Helpful source label for browser diagnostics.
    code += "\n//# sourceURL=app.walletconnect-v1.3.2.js\n";

    const run = new Function(code);
    run();

  } catch (e) {
    show(
      "V1.3.2 載入失敗：" + (e?.message || String(e)),
      true
    );

    const btn = document.getElementById("connectBtn");
    if (btn) btn.disabled = true;
  }
})();
