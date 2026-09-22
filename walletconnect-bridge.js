/* IPT WalletConnect bridge — Sepolia only.
   Replaces injected window.ethereum for the existing app.js without changing
   transaction validation, pending tracking, or contract logic.
   No private keys, seed phrases, or local wallet secrets are stored here. */
"use strict";
(() => {
  const PROJECT_ID = "80a61b62ea34b975d7d27a037fc55fa8";
  const CHAIN_ID = 11155111;
  const CHAIN_HEX = "0xaa36a7";
  const RPC = "https://ethereum-sepolia-rpc.publicnode.com";
  const DEFAULT_CONTRACT = "0xd3fb2480aadb8b168ec7e88a0e5c847d9750cb87";

  let wc = null;
  let initPromise = null;
  let sessionConnectPromise = null;
  const pendingListeners = new Map();

  function addPending(event, handler) {
    if (!pendingListeners.has(event)) pendingListeners.set(event, new Set());
    pendingListeners.get(event).add(handler);
  }

  function removePending(event, handler) {
    pendingListeners.get(event)?.delete(handler);
  }

  function forwardStoredListeners() {
    if (!wc || typeof wc.on !== "function") return;
    for (const [event, handlers] of pendingListeners.entries()) {
      for (const handler of handlers) {
        try { wc.on(event, handler); } catch (_) {}
      }
    }
  }

  async function initWalletConnect() {
    if (wc) return wc;
    if (!initPromise) {
      initPromise = (async () => {
        const mod = await import("https://esm.sh/@walletconnect/ethereum-provider@2.25.0?bundle");
        const EthereumProvider = mod.EthereumProvider;
        if (!EthereumProvider) throw new Error("WalletConnect EthereumProvider 載入失敗。");

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

        forwardStoredListeners();
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

  async function request(args) {
    const method = args?.method;
    const params = args?.params || [];

    if (!method) throw new Error("缺少 EIP-1193 method。");

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
      try { return await p.request({ method, params }); }
      catch (_) { return CHAIN_HEX; }
    }

    if (method === "wallet_switchEthereumChain") {
      const requested = params?.[0]?.chainId;
      if (requested && String(requested).toLowerCase() !== CHAIN_HEX) {
        throw new Error("Independent Points 僅允許 Ethereum Sepolia（11155111）。");
      }
      const p = await ensureSession();
      try {
        return await p.request({ method, params: [{ chainId: CHAIN_HEX }] });
      } catch (_) {
        // Session is already Sepolia-bound; returning null is safe for our Sepolia-only app.
        return null;
      }
    }

    const p = await ensureSession();
    return p.request({ method, params });
  }

  const bridge = {
    isIPTWalletConnect: true,
    isWalletConnect: true,
    request,
    on(event, handler) {
      addPending(event, handler);
      if (wc && typeof wc.on === "function") {
        try { wc.on(event, handler); } catch (_) {}
      }
      return this;
    },
    removeListener(event, handler) {
      removePending(event, handler);
      if (wc && typeof wc.removeListener === "function") {
        try { wc.removeListener(event, handler); } catch (_) {}
      }
      return this;
    },
    async disconnect() {
      const p = await initWalletConnect();
      if (p.session) await p.disconnect();
    }
  };

  let replaced = false;
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

  window.IPTWalletConnectBridge = bridge;

  document.addEventListener("DOMContentLoaded", () => {
    try {
      const input = document.getElementById("contractAddress");
      if (input) input.value = DEFAULT_CONTRACT;
      localStorage.setItem("independent-points-v07-contract", DEFAULT_CONTRACT);

      const connectBtn = document.getElementById("connectBtn");
      if (connectBtn) connectBtn.textContent = "WalletConnect 連接 Trust Wallet 並讀取合約";

      if (!replaced) {
        const status = document.getElementById("status");
        if (status) {
          status.textContent = "WalletConnect Bridge 無法取代目前瀏覽器 Provider。請改用 WalletConnect 專用頁。";
          status.style.color = "#bd2929";
        }
        if (connectBtn) connectBtn.disabled = true;
      }
    } catch (_) {}
  });
})();
