/* Independent Points WalletConnect Bridge V1.2
   Sepolia-only + ambiguous-timeout recovery + duplicate-send guard.
*/
"use strict";

(() => {
  const VERSION = "1.3";
  const PROJECT_ID = "80a61b62ea34b975d7d27a037fc55fa8";
  const CHAIN_ID = 11155111;
  const CHAIN_HEX = "0xaa36a7";
  const RPC = "https://ethereum-sepolia-rpc.publicnode.com";

  const AMBIGUOUS_LOCK_MS = 5 * 60 * 1000;
  const SENT_LOCK_MS = 90 * 1000;
  const RECOVERY_WINDOW_MS = 75 * 1000;
  const RECOVERY_POLL_MS = 3500;
  const BLOCK_SCAN_DEPTH = 48;

  let wc = null;
  let initPromise = null;
  let sessionConnectPromise = null;
  const listeners = new Map();

  const now = () => Date.now();
  const lower = v => String(v || "").toLowerCase();
  const sleep = ms => new Promise(r => setTimeout(r, ms));

  function guardKey(tx) {
    const material = [
      lower(tx?.from),
      lower(tx?.to),
      lower(tx?.value || "0x0"),
      lower(tx?.data || tx?.input || "0x")
    ].join("|");

    let h = 2166136261;
    for (let i = 0; i < material.length; i++) {
      h ^= material.charCodeAt(i);
      h = Math.imul(h, 16777619);
    }
    return "ipt-v12-txguard-" + (h >>> 0).toString(16);
  }

  function readLock(key) {
    try {
      const v = JSON.parse(localStorage.getItem(key) || "null");
      return v && typeof v === "object" ? v : null;
    } catch (_) {
      return null;
    }
  }

  function writeLock(key, value) {
    try { localStorage.setItem(key, JSON.stringify(value)); } catch (_) {}
  }

  function clearLock(key) {
    try { localStorage.removeItem(key); } catch (_) {}
  }

  function isUserRejected(err) {
    const code = Number(err?.code);
    const msg = lower(err?.message || err);
    return code === 4001 ||
      msg.includes("user rejected") ||
      msg.includes("user denied") ||
      msg.includes("rejected by user") ||
      msg.includes("cancelled by user") ||
      msg.includes("canceled by user");
  }

  function statusBanner() {
    let el = document.getElementById("iptTxSafetyBanner");
    if (!el && document.body) {
      el = document.createElement("div");
      el.id = "iptTxSafetyBanner";
      el.style.cssText =
        "position:fixed;left:12px;right:12px;bottom:12px;z-index:99999;" +
        "padding:12px 14px;border-radius:12px;background:#102238;color:white;" +
        "font:600 14px/1.45 system-ui,-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;" +
        "box-shadow:0 6px 24px rgba(0,0,0,.22);display:none";
      document.body.appendChild(el);
    }
    return el;
  }

  function setSafetyStatus(message, kind = "info", persistMs = 0) {
    const el = statusBanner();
    if (!el) return;
    const bg =
      kind === "ok" ? "#176c4d" :
      kind === "warn" ? "#8a5a00" :
      kind === "err" ? "#9e2b2b" : "#102238";
    el.style.background = bg;
    el.textContent = message;
    el.style.display = "block";

    if (persistMs > 0) {
      setTimeout(() => {
        if (el.textContent === message) el.style.display = "none";
      }, persistMs);
    }
  }

  async function rpc(method, params = [], timeoutMs = 9000) {
    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), timeoutMs);

    try {
      const r = await fetch(RPC, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ jsonrpc: "2.0", id: 1, method, params }),
        signal: ctrl.signal
      });

      if (!r.ok) throw new Error("RPC HTTP " + r.status);
      const j = await r.json();
      if (j.error) throw new Error(j.error.message || JSON.stringify(j.error));
      return j.result;
    } finally {
      clearTimeout(timer);
    }
  }

  async function safeRpc(method, params = [], retries = 3) {
    let last;
    for (let i = 0; i < retries; i++) {
      try {
        return await rpc(method, params);
      } catch (e) {
        last = e;
        if (i < retries - 1) await sleep(900 + i * 650);
      }
    }
    throw last;
  }

  async function findTxBySenderNonce(from, nonceHex) {
    const wantedNonce = BigInt(nonceHex);
    const latestHex = await safeRpc("eth_blockNumber", []);
    const latest = BigInt(latestHex);

    for (let i = 0n; i < BigInt(BLOCK_SCAN_DEPTH); i++) {
      if (latest < i) break;
      const blockHex = "0x" + (latest - i).toString(16);

      let block;
      try {
        block = await safeRpc("eth_getBlockByNumber", [blockHex, true], 2);
      } catch (_) {
        continue;
      }

      const txs = Array.isArray(block?.transactions) ? block.transactions : [];
      for (const tx of txs) {
        try {
          if (lower(tx?.from) === lower(from) && BigInt(tx?.nonce) === wantedNonce) {
            return tx?.hash || null;
          }
        } catch (_) {}
      }
    }

    return null;
  }

  async function recoverAmbiguousTransaction(lock) {
    const started = now();
    const from = lock.from;
    const nonceHex = lock.nonce;

    while (now() - started < RECOVERY_WINDOW_MS) {
      setSafetyStatus(
        "交易回覆逾時，正在自動核對 Sepolia；請勿重複送出相同交易。",
        "warn"
      );

      try {
        const pendingNonce = BigInt(
          await safeRpc("eth_getTransactionCount", [from, "pending"], 2)
        );
        const beforeNonce = BigInt(nonceHex);

        if (pendingNonce > beforeNonce) {
          const hash = await findTxBySenderNonce(from, nonceHex);
          if (hash && /^0x[0-9a-fA-F]{64}$/.test(hash)) {
            setSafetyStatus(
              "已在 Sepolia 找回交易雜湊值；不需要重新送出。",
              "ok",
              10000
            );
            return hash;
          }
        }
      } catch (_) {}

      await sleep(RECOVERY_POLL_MS);
    }

    return null;
  }

  function addListener(event, handler) {
    if (!listeners.has(event)) listeners.set(event, new Set());
    listeners.get(event).add(handler);
    if (wc?.on) {
      try { wc.on(event, handler); } catch (_) {}
    }
  }

  function removeListener(event, handler) {
    listeners.get(event)?.delete(handler);
    if (wc?.removeListener) {
      try { wc.removeListener(event, handler); } catch (_) {}
    }
  }

  function forwardListeners() {
    if (!wc?.on) return;
    for (const [event, handlers] of listeners.entries()) {
      for (const handler of handlers) {
        try { wc.on(event, handler); } catch (_) {}
      }
    }
  }

  async function initWalletConnect() {
    if (wc) return wc;

    if (!initPromise) {
      initPromise = (async () => {
        const mod = await import(
          "https://esm.sh/@walletconnect/ethereum-provider@2.25.0?bundle"
        );
        const EthereumProvider = mod.EthereumProvider;
        if (!EthereumProvider) {
          throw new Error("WalletConnect EthereumProvider 載入失敗。");
        }

        wc = await EthereumProvider.init({
          projectId: PROJECT_ID,
          chains: [CHAIN_ID],
          showQrModal: true,
          methods: ["eth_sendTransaction", "personal_sign"],
          optionalMethods: [
            "eth_accounts",
            "eth_requestAccounts",
            "eth_chainId",
            "wallet_switchEthereumChain"
          ],
          events: ["chainChanged", "accountsChanged"],
          optionalEvents: ["connect", "disconnect", "message"],
          rpcMap: { [CHAIN_ID]: RPC },
          metadata: {
            name: "Independent Points",
            description: "IPT Sepolia test points wallet",
            url: "https://avg168.github.io",
            icons: []
          },
          qrModalOptions: { themeMode: "light" }
        });

        forwardListeners();
        return wc;
      })();
    }

    return initPromise;
  }

  async function ensureSession() {
    const p = await initWalletConnect();
    if (p.session) return p;

    if (!sessionConnectPromise) {
      sessionConnectPromise = p.connect({
        chains: [CHAIN_ID],
        rpcMap: { [CHAIN_ID]: RPC }
      }).finally(() => {
        sessionConnectPromise = null;
      });
    }

    await sessionConnectPromise;
    return p;
  }

  async function guardedSendTransaction(params) {
    const tx = params?.[0];
    if (!tx?.from) throw new Error("交易缺少 from 地址。");

    const p = await ensureSession();
    const key = guardKey(tx);
    const old = readLock(key);

    if (old) {
      const age = now() - Number(old.createdAt || 0);
      const maxAge = old.state === "sent" ? SENT_LOCK_MS : AMBIGUOUS_LOCK_MS;

      if (age >= 0 && age < maxAge) {
        if (old.hash && /^0x[0-9a-fA-F]{64}$/.test(old.hash)) {
          throw new Error(
            "防重複保護：相同交易剛才已送出（" +
            old.hash.slice(0, 10) +
            "…）。請先等待鏈上結果，不要再次送出。"
          );
        }

        if (old.nonce) {
          const recovered = await recoverAmbiguousTransaction(old);
          if (recovered) {
            writeLock(key, {
              ...old,
              state: "sent",
              hash: recovered,
              recoveredAt: now()
            });
            return recovered;
          }
        }

        throw new Error(
          "防重複保護：相同交易剛才可能已送出，但尚未取得交易雜湊值。" +
          "目前暫停重送 5 分鐘；請先按「更新資料」核對餘額與總供給量。"
        );
      }

      clearLock(key);
    }

    let nonceHex;
    try {
      nonceHex = await safeRpc(
        "eth_getTransactionCount",
        [tx.from, "pending"]
      );
    } catch (_) {
      throw new Error(
        "送出前無法讀取 Sepolia Nonce。為避免重複交易，本次沒有送出，請稍後再試。"
      );
    }

    const lock = {
      state: "sending",
      createdAt: now(),
      from: tx.from,
      to: tx.to || null,
      nonce: nonceHex,
      dataPrefix: String(tx.data || tx.input || "").slice(0, 18)
    };
    writeLock(key, lock);

    try {
      setSafetyStatus("等待 Trust Wallet 核准交易…", "info");

      const hash = await p.request({
        method: "eth_sendTransaction",
        params
      });

      if (!/^0x[0-9a-fA-F]{64}$/.test(String(hash || ""))) {
        throw new Error("錢包沒有回傳有效交易雜湊值。");
      }

      writeLock(key, {
        ...lock,
        state: "sent",
        hash,
        sentAt: now()
      });

      setSafetyStatus("交易已送出；已啟用防重複保護。", "ok", 8000);
      return hash;

    } catch (err) {
      if (isUserRejected(err)) {
        clearLock(key);
        setSafetyStatus("你已取消交易；沒有送出。", "info", 5000);
        throw err;
      }

      writeLock(key, {
        ...lock,
        state: "ambiguous",
        error: String(err?.message || err),
        ambiguousAt: now()
      });

      const recovered = await recoverAmbiguousTransaction({
        ...lock,
        state: "ambiguous"
      });

      if (recovered) {
        writeLock(key, {
          ...lock,
          state: "sent",
          hash: recovered,
          recoveredAt: now()
        });
        return recovered;
      }

      setSafetyStatus(
        "交易結果不明：已阻止重複送出。請先更新資料確認鏈上餘額／總供給量。",
        "warn"
      );

      throw new Error(
        "交易結果不明，已啟用防重複保護。" +
        "請勿立即重送；先按「更新資料」核對鏈上餘額與總供給量。"
      );
    }
  }

  async function request(args) {
    const method = args?.method;
    const params = args?.params || [];

    if (!method) throw new Error("缺少 EIP-1193 method。");

    if (method === "eth_sendTransaction") {
      return guardedSendTransaction(params);
    }

    if (method === "eth_requestAccounts") {
      const p = await ensureSession();
      if (Array.isArray(p.accounts) && p.accounts.length) return p.accounts;
      return p.request({ method: "eth_accounts", params: [] });
    }

    if (method === "eth_accounts") {
      const p = await initWalletConnect();
      if (!p.session) return [];
      if (Array.isArray(p.accounts) && p.accounts.length) return p.accounts;
      return p.request({ method, params });
    }

    if (method === "eth_chainId") {
      const p = await initWalletConnect();
      if (!p.session) return CHAIN_HEX;
      try {
        return await p.request({ method, params });
      } catch (_) {
        return CHAIN_HEX;
      }
    }

    if (method === "wallet_switchEthereumChain") {
      const requested = params?.[0]?.chainId;
      if (requested && lower(requested) !== CHAIN_HEX) {
        throw new Error(
          "Independent Points 僅允許 Ethereum Sepolia（11155111）。"
        );
      }

      const p = await ensureSession();
      try {
        return await p.request({
          method,
          params: [{ chainId: CHAIN_HEX }]
        });
      } catch (_) {
        return null;
      }
    }

    const p = await ensureSession();
    return p.request({ method, params });
  }

  const bridge = {
    isIPTWalletConnect: true,
    isWalletConnect: true,
    version: VERSION,
    request,

    on(event, handler) {
      addListener(event, handler);
      return this;
    },

    removeListener(event, handler) {
      removeListener(event, handler);
      return this;
    },

    async disconnect() {
      const p = await initWalletConnect();
      if (p.session) await p.disconnect();
    }
  };

  let replaced = false;
  let patchedInjectedProvider = false;

  // First choice: replace window.ethereum entirely.
  try {
    Object.defineProperty(window, "ethereum", {
      value: bridge,
      writable: false,
      configurable: true
    });
    replaced = window.ethereum === bridge;
  } catch (_) {
    try {
      window.ethereum = bridge;
      replaced = window.ethereum === bridge;
    } catch (_) {}
  }

  // Trust Wallet may expose a non-configurable window.ethereum.
  // In that case, patch only the EIP-1193 methods the existing app.js uses.
  if (!replaced && window.ethereum && typeof window.ethereum === "object") {
    const injected = window.ethereum;

    try {
      injected.request = request;
      patchedInjectedProvider =
        typeof injected.request === "function" &&
        injected.request === request;
    } catch (_) {}

    if (patchedInjectedProvider) {
      try {
        injected.isIPTWalletConnect = true;
        injected.isWalletConnect = true;
        injected.iptBridgeVersion = VERSION;
      } catch (_) {}

      // Best effort: route event registration through WalletConnect too.
      try {
        injected.on = function(event, handler) {
          addListener(event, handler);
          return injected;
        };
      } catch (_) {}

      try {
        injected.removeListener = function(event, handler) {
          removeListener(event, handler);
          return injected;
        };
      } catch (_) {}
    }
  }

  window.IPTWalletConnectBridge = bridge;

  function installWalletSwitchButton() {
    const connectBtn = document.getElementById("connectBtn");
    if (!connectBtn || document.getElementById("iptWalletSwitchBtn")) return;

    const btn = document.createElement("button");
    btn.id = "iptWalletSwitchBtn";
    btn.type = "button";
    btn.className = "secondary";
    btn.textContent = "中斷 WalletConnect／切換錢包";
    btn.style.marginTop = "10px";

    btn.addEventListener("click", async () => {
      const ok = window.confirm(
        "要中斷目前的 WalletConnect 連線嗎？\n\n中斷後頁面會重新整理，接著可重新連接另一個 Trust Wallet 錢包。"
      );
      if (!ok) return;

      btn.disabled = true;
      btn.textContent = "正在中斷 WalletConnect…";

      try {
        const p = await initWalletConnect();

        if (p && p.session) {
          await p.disconnect();
        }

        // Best-effort cleanup for WalletConnect-related local state.
        try {
          const keys = [];
          for (let i = 0; i < localStorage.length; i++) {
            const k = localStorage.key(i);
            if (k && (
              k.startsWith("wc@") ||
              k.startsWith("walletconnect") ||
              k.startsWith("WALLETCONNECT")
            )) {
              keys.push(k);
            }
          }
          keys.forEach(k => localStorage.removeItem(k));
        } catch (_) {}

        setSafetyStatus(
          "WalletConnect 已中斷。頁面即將重新整理，之後可重新連接另一個錢包。",
          "ok",
          2500
        );

        setTimeout(() => {
          location.reload();
        }, 700);

      } catch (e) {
        btn.disabled = false;
        btn.textContent = "中斷 WalletConnect／切換錢包";
        setSafetyStatus(
          "中斷失敗：" + (e?.message || String(e)),
          "err",
          8000
        );
      }
    });

    connectBtn.insertAdjacentElement("afterend", btn);
  }

  document.addEventListener("DOMContentLoaded", () => {
    const connectBtn = document.getElementById("connectBtn");
    if (connectBtn) {
      connectBtn.textContent =
        "WalletConnect 連接 Trust Wallet 並讀取合約";
    }

    const footer = document.querySelector("footer");
    if (footer && !footer.textContent.includes("交易防重複 V1.2")) {
      footer.textContent =
        footer.textContent.replace("V1.1", "V1.2") +
        " · 交易防重複 V1.2";
    }

    const providerReady = replaced || patchedInjectedProvider;

    installWalletSwitchButton();

    if (footer) {
      footer.textContent = footer.textContent
        .replace("V1.2", "V1.3")
        .replace("交易防重複 V1.3 · 一鍵切換錢包", "交易防重複 V1.3 · 一鍵切換錢包");
    }

    if (!providerReady) {
      const status = document.getElementById("status");
      if (status) {
        status.textContent =
          "WalletConnect Bridge V1.3 無法接管目前 Provider，已停用鏈上送出以避免錯誤交易。";
        status.style.color = "#bd2929";
      }
      if (connectBtn) connectBtn.disabled = true;
    } else {
      if (connectBtn) connectBtn.disabled = false;
      const status = document.getElementById("status");
      if (status && status.textContent.includes("合約已部署")) {
        status.textContent =
          "WalletConnect Bridge V1.3 已就緒；可連接 Trust Wallet 並讀取合約。";
      }
    }
  });
})();
