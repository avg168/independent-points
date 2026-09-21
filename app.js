/* Independent Points — Sepolia-only client. No private keys and no local ledger. */
"use strict";
const CHAIN_ID = 11155111n;
const REQUIRED_CONFIRMATIONS = 3; // provisional depth, not economic/finality guarantee
const EXPLORER = "https://sepolia.etherscan.io/tx/";
const ZERO = "0x0000000000000000000000000000000000000000";
const ABI = [
  "function name() view returns (string)",
  "function symbol() view returns (string)",
  "function decimals() view returns (uint8)",
  "function owner() view returns (address)",
  "function pendingOwner() view returns (address)",
  "function transferOwnership(address)",
  "function acceptOwnership()",
  "function paused() view returns (bool)",
  "function balanceOf(address) view returns (uint256)",
  "function totalSupply() view returns (uint256)",
  "function cap() view returns (uint256)",
  "function MAX_POINTS() view returns (uint256)",
  "function transfer(address,uint256) returns (bool)",
  "function mint(address,uint256)",
  "function burn(uint256)",
  "function pause()",
  "function unpause()",
  "event Transfer(address indexed from,address indexed to,uint256 value)",
  "event Paused(address account)",
  "event Unpaused(address account)",
  "event OwnershipTransferStarted(address indexed previousOwner,address indexed newOwner)",
  "event OwnershipTransferred(address indexed previousOwner,address indexed newOwner)"
];
const el = id => document.getElementById(id);
let provider, signer, wallet, contract, busy = false, pausedContract = false;
let visibleHistory = [];
let onchainOwner = null, onchainPendingOwner = null;
let volatilePending = []; // Fallback when browser storage is unavailable. Not durable after closing page.
const show = (message, error = false) => {
  el("status").textContent = message;
  el("status").style.color = error ? "#bd2929" : "#183b67";
};
const short = address => `${address.slice(0, 6)}…${address.slice(-4)}`;
function toUnits(input) {
  const s = String(input).trim();
  if (!/^(?:0|[1-9]\d*)(?:\.\d{1,2})?$/.test(s)) throw Error("請輸入大於 0 的數量，最多兩位小數；勿輸入逗號或科學記號。");
  const units = ethers.parseUnits(s, 2);
  if (units <= 0n) throw Error("轉移數量必須大於 0。");
  return units;
}
function validAddress(value) {
  const s = String(value).trim();
  if (!ethers.isAddress(s) || s.toLowerCase() === ZERO) throw Error("請輸入有效且非零的 EVM 錢包地址。");
  return ethers.getAddress(s);
}
function setBusy(isBusy) {
  busy = isBusy;
  el("connectBtn").disabled = isBusy;
  el("refreshBtn").disabled = isBusy || !contract;
  el("sendBtn").disabled = isBusy || !contract || pausedContract;
  el("recipientCheckBtn").disabled = isBusy || !contract;
  el("burnBtn").disabled = isBusy || !contract || pausedContract;
  // mintButton is enabled only after refresh verifies onchain owner.
  el("mintBtn").disabled = isBusy || !contract || pausedContract || !wallet || el("ownerHint").dataset.isOwner !== "yes";
  const isOwner = el("ownerHint").dataset.isOwner === "yes";
  el("pauseBtn").disabled = isBusy || !contract || !isOwner || pausedContract;
  el("unpauseBtn").disabled = isBusy || !contract || !isOwner || !pausedContract;
  el("copyWalletBtn").disabled = !wallet;
  el("copyContractBtn").disabled = !contract;
  el("exportBtn").disabled = !visibleHistory.length;
  el("lookupBtn").disabled = isBusy || !contract;
  el("pendingBtn").disabled = isBusy || !contract;
  el("exportPendingBtn").disabled = isBusy || !contract || !readPending().length;
  el("importPendingInput").disabled = isBusy || !contract;
  el("proposeOwnerBtn").disabled = isBusy || !contract || !isOwner;
  el("acceptOwnerBtn").disabled = isBusy || !contract || !wallet || !onchainPendingOwner ||
    onchainPendingOwner.toLowerCase() !== wallet.toLowerCase();
}
function errorText(err) {
  if (err && (err.code === 4001 || err.code === "ACTION_REJECTED")) return "使用者已取消錢包授權或交易。";
  if (err && err.code === "INSUFFICIENT_FUNDS") return "錢包沒有足夠的測試網 ETH 支付 Gas。";
  return (err && (err.shortMessage || err.reason || err.message)) || "操作失敗，請稍後重試。";
}
async function checkChain() {
  const network = await provider.getNetwork();
  if (network.chainId !== CHAIN_ID) throw Error("目前不是 Sepolia 測試網；請先在錢包切換至 Sepolia（Chain ID 11155111）。");
  el("chainLabel").textContent = "Sepolia（11155111）";
}
async function connect() {
  if (!window.ethereum) throw Error("找不到相容的瀏覽器錢包。手機請使用錢包內建瀏覽器開啟本頁。瀏覽器連線需要 HTTPS 或 localhost。");
  if (!window.ethers) throw Error("ethers 程式庫載入失敗，請檢查網路或 CDN 連線。");
  const address = validAddress(el("contractAddress").value);
  contract = undefined; wallet = undefined; visibleHistory = [];
  onchainOwner = null; onchainPendingOwner = null;
  el("currentOwnerLabel").textContent = "—"; el("pendingOwnerLabel").textContent = "—";
  el("ownerHint").dataset.isOwner = "no";
  el("walletLabel").textContent = "未連線";
  el("balanceLabel").textContent = "—";
  el("supplyLabel").textContent = "—";
  el("remainingLabel").textContent = "—";
  el("contractExplorerLink").replaceChildren();
  el("recipientCheckResult").textContent = "輸入收款地址後，可先檢查是否為智慧合約。";
  el("stateLabel").textContent = "尚未載入";
  el("history").textContent = "連線後顯示交易紀錄。";
  el("lookupResult").textContent = "連線後可以查詢指定交易。";
  el("lookupLink").replaceChildren();
  el("pendingList").textContent = "連線後顯示本錢包待確認的交易。";
  provider = new ethers.BrowserProvider(window.ethereum);
  await provider.send("eth_requestAccounts", []);
  await checkChain();
  signer = await provider.getSigner();
  wallet = await signer.getAddress();
  const code = await provider.getCode(address);
  if (code === "0x") throw Error("指定地址沒有部署智慧合約，請確認地址與 Sepolia 網路。");
  const candidate = new ethers.Contract(address, ABI, signer);
  const [name, symbol, decimals, cap, maxPoints] = await Promise.all([candidate.name(), candidate.symbol(), candidate.decimals(), candidate.cap(), candidate.MAX_POINTS()]);
  if (name !== "Independent Points" || symbol !== "IPT" || decimals !== 2n) throw Error("此地址不是預期的 IPT 測試合約。請確認合約地址。");
  PointsPreflightCore.contractIdentity(cap, maxPoints);
  contract = candidate;
  const explorer = document.createElement("a");
  explorer.href = `https://sepolia.etherscan.io/address/${address}#code`;
  explorer.target = "_blank"; explorer.rel = "noopener noreferrer";
  explorer.textContent = "在 Sepolia Etherscan 核對合約地址與原始碼";
  el("contractExplorerLink").append(explorer);
  try { localStorage.setItem("independent-points-v07-contract", address); } catch (_) { /* private browsing may disable storage */ }
  el("walletLabel").textContent = wallet;
  show("錢包連線成功，已載入 Sepolia 智慧合約。請核對合約地址。");
  await refresh();
  renderPending();
}
async function refresh() {
  if (!contract) return;
  await checkChain();
  const [balance, supply, cap, owner, pendingOwner, paused] = await Promise.all([
    contract.balanceOf(wallet), contract.totalSupply(), contract.cap(), contract.owner(), contract.pendingOwner(), contract.paused()
  ]);
  const remaining = PointsPreflightCore.remainingSupply(cap, supply);
  onchainOwner = owner;
  onchainPendingOwner = pendingOwner.toLowerCase() === ZERO ? null : pendingOwner;
  el("currentOwnerLabel").textContent = owner;
  el("pendingOwnerLabel").textContent = onchainPendingOwner || "無候任管理者";
  const isOwner = wallet.toLowerCase() === owner.toLowerCase();
  el("balanceLabel").textContent = ethers.formatUnits(balance, 2);
  el("supplyLabel").textContent = `${ethers.formatUnits(supply, 2)} IPT`;
  el("remainingLabel").textContent = `${ethers.formatUnits(remaining, 2)} IPT`;
  pausedContract = paused;
  el("stateLabel").textContent = paused ? "已暫停交易" : "正常";
  el("ownerHint").textContent = isOwner ? `目前錢包具有管理者權限：${short(owner)}` : `目前錢包不是發行管理者：${short(owner)}`;
  el("ownerHint").dataset.isOwner = isOwner ? "yes" : "no";
  setBusy(busy);
  if (paused) {
    show("合約已暫停交易，請洽合約管理者。");
  }
  await loadHistory();
}
async function loadHistory() {
  const area = el("history");
  visibleHistory = [];
  el("exportBtn").disabled = true;
  area.textContent = "讀取最新交易中…";
  try {
    const current = await provider.getBlockNumber();
    const start = Math.max(0, current - 1000);
    const [outgoing, incoming] = await Promise.all([
      contract.queryFilter(contract.filters.Transfer(wallet, null), start, current),
      contract.queryFilter(contract.filters.Transfer(null, wallet), start, current)
    ]);
    const unique = new Map();
    for (const evt of [...outgoing, ...incoming]) unique.set(`${evt.transactionHash}:${evt.index}`, evt);
    const ordered = [...unique.values()].sort((a, b) => b.blockNumber - a.blockNumber || b.index - a.index).slice(0, 20);
    area.replaceChildren();
    if (!ordered.length) { area.textContent = "最近 1,000 個區塊內沒有相關交易。"; return; }
    for (const evt of ordered) {
      const [from, to, value] = evt.args;
      const isMint = from.toLowerCase() === ZERO;
      const isBurn = to.toLowerCase() === ZERO;
      const isIncoming = to.toLowerCase() === wallet.toLowerCase();
      const heading = isMint ? "點數發行（存入）" : isBurn ? "自行銷毀" : isIncoming ? "收到點數" : "轉出點數";
      visibleHistory.push({ type: heading, amount: ethers.formatUnits(value, 2), from, to, block: evt.blockNumber, txHash: evt.transactionHash });
      const row = document.createElement("div"); row.className = "entry";
      const title = document.createElement("strong"); title.textContent = `${heading}　${ethers.formatUnits(value, 2)} IPT`;
      const detail = document.createElement("span"); detail.className = "sub";
      detail.textContent = `區塊 ${evt.blockNumber} ｜ ${short(from)} → ${short(to)}`;
      const link = document.createElement("a"); link.href = `${EXPLORER}${evt.transactionHash}`;
      link.target = "_blank"; link.rel = "noopener noreferrer"; link.textContent = `交易雜湊：${short(evt.transactionHash)}（鏈上查詢）`;
      row.append(title, detail, link); area.append(row);
    }
    el("exportBtn").disabled = false;
  } catch (err) {
    visibleHistory = [];
    el("exportBtn").disabled = true;
    area.textContent = `最近交易查詢失敗：${errorText(err)}。鏈上餘額仍以合約讀取結果為準。`;
  }
}
// Manual receipt lookup is independent from the 1,000-block event window.
// Receipt status alone does not prove IPT movement: inspect Transfer logs emitted by OUR contract.
async function lookupTransaction(hashInput) {
  if (!provider || !contract || !wallet) throw Error("請先連接錢包並載入指定 IPT 合約。");
  await checkChain();
  const hash = String(hashInput).trim();
  if (!/^0x[0-9a-fA-F]{64}$/.test(hash)) throw Error("請輸入有效的 0x 開頭、共 66 字元交易雜湊值。");
  const panel = el("lookupResult");
  const linkArea = el("lookupLink");
  panel.textContent = "正在讀取交易收據…";
  linkArea.replaceChildren();
  const link = document.createElement("a");
  link.href = EXPLORER + hash;
  link.target = "_blank";
  link.rel = "noopener noreferrer";
  link.textContent = "在 Sepolia Etherscan 核對這筆交易";
  linkArea.append(link);
  const receipt = await provider.getTransactionReceipt(hash);
  if (!receipt) {
    panel.textContent = "尚未取得交易收據：可能仍在等待確認，或此網路上查無這筆交易。請在區塊瀏覽器核對。";
    return;
  }
  if (receipt.status !== 1) {
    panel.textContent = `鏈上交易執行失敗（區塊 ${receipt.blockNumber}）。這筆交易沒有完成 IPT 轉移。`;
    return;
  }
  const result = PointsReceiptCore.verifyReceipt(
    receipt, contract.target, wallet,
    log => contract.interface.parseLog({ topics: log.topics, data: log.data }),
    ethers.formatUnits
  );
  const events = result.events;
  const depth = PointsConfirmationCore.assess(receipt, await provider.getBlockNumber(), REQUIRED_CONFIRMATIONS);
  panel.replaceChildren();
  const summary = document.createElement("p");
  summary.textContent = `鏈上執行成功（區塊 ${receipt.blockNumber}）；區塊確認數：${depth.confirmations}/${depth.minimum}${depth.state === "threshold_met" ? "（已達本頁設定門檻；不代表絕對不可逆）" : "（尚未達本頁確認門檻）"}；此筆交易與目前錢包相關的 IPT Transfer 事件：${events.length} 筆。`;
  panel.append(summary);
  if (!events.length) {
    const hint = document.createElement("p");
    hint.textContent = "交易成功不等於已收到 IPT：此交易沒有指定合約與目前錢包相關的轉移事件。請檢查合約、錢包地址與交易內容。";
    panel.append(hint);
  }
  for (const item of events) {
    const row = document.createElement("div"); row.className = "entry";
    const text = document.createElement("strong");
    const flow = item.from.toLowerCase() === ZERO ? "發行存入" : item.to.toLowerCase() === ZERO ? "銷毀" : item.to.toLowerCase() === wallet.toLowerCase() ? "收到點數" : "轉出點數";
    text.textContent = `${flow}：${item.amount} IPT`;
    const detail = document.createElement("span"); detail.className = "sub";
    detail.textContent = `來源 ${item.from} → 目標 ${item.to}`;
    row.append(text, detail); panel.append(row);
  }
}

el("lookupForm").addEventListener("submit", async event => {
  event.preventDefault();
  const button = el("lookupBtn");
  if (busy || button.disabled) return;
  button.disabled = true;
  try { await lookupTransaction(el("lookupHash").value); }
  catch (err) { el("lookupResult").textContent = "查詢失敗：" + errorText(err); }
  finally { button.disabled = busy || !contract; }
});

function pendingKey() {
  if (!contract || !wallet) throw Error("請先連接錢包與合約。");
  return `independent-points-v07-pending-${contract.target.toLowerCase()}-${wallet.toLowerCase()}`;
}
function readPending() {
  const key = pendingKey();
  let source;
  try {
    source = localStorage.getItem(key);
    if (!source) return volatilePending.filter(x => x.contract.toLowerCase() === contract.target.toLowerCase() && x.wallet.toLowerCase() === wallet.toLowerCase());
    const parsed = JSON.parse(source);
    if (!Array.isArray(parsed) || parsed.length > 20) throw Error("待確認交易資料格式錯誤。");
    return parsed.map(x => PointsTxCore.validatePending(x)).filter(x => x.contract.toLowerCase() === contract.target.toLowerCase() && x.wallet.toLowerCase() === wallet.toLowerCase());
  } catch (error) {
    if (source) show(`本機交易追蹤資料無法讀取：${errorText(error)}。請依鏈上紀錄核對。`, true);
    return volatilePending.filter(x => x.contract.toLowerCase() === contract.target.toLowerCase() && x.wallet.toLowerCase() === wallet.toLowerCase());
  }
}
function savePending(items) {
  volatilePending = items;
  try { localStorage.setItem(pendingKey(), JSON.stringify(items)); return true; }
  catch (_) { return false; }
}
function renderPending() {
  const area = el("pendingList");
  area.replaceChildren();
  if (!contract || !wallet) { area.textContent = "連線後顯示待確認交易。"; return; }
  const entries = readPending();
  if (!entries.length) { area.textContent = "目前沒有此錢包保留的待確認交易。"; el("exportPendingBtn").disabled = true; return; }
  el("exportPendingBtn").disabled = busy;
  const headings = {send:"轉出點數", mint:"發行點數", burn:"永久銷毀", pause:"暫停合約", unpause:"恢復合約", owner_propose:"提出管理權交接", owner_accept:"確認接任管理權"};
  for (const tx of entries) {
    const row = document.createElement("div"); row.className = "entry";
    const title = document.createElement("strong"); title.textContent = `${headings[tx.kind]}｜待核對`;
    const sub = document.createElement("span"); sub.className = "sub";
    sub.textContent = `送出時間：${new Date(tx.createdAt).toLocaleString("zh-TW")}｜本機追蹤紀錄不是完成證明`;
    const link = document.createElement("a"); link.href = EXPLORER + tx.hash;
    link.target = "_blank"; link.rel = "noopener noreferrer";
    link.textContent = `核對 ${short(tx.hash)}（Sepolia Etherscan）`;
    row.append(title, sub, link); area.append(row);
  }
}
async function verifyOnePending(tx) {
  await checkChain();
  const receipt = await provider.getTransactionReceipt(tx.hash);
  const result = PointsTxCore.verifyExpectedTransfer(receipt, tx,
    log => contract.interface.parseLog({ topics: log.topics, data: log.data }));
  const depth = PointsConfirmationCore.assess(receipt, await provider.getBlockNumber(), REQUIRED_CONFIRMATIONS);
  return { ...result, depth };
}
async function checkPendingTransactions() {
  if (busy || !contract) return;
  setBusy(true);
  const area = el("pendingList");
  try {
    const entries = readPending();
    if (!entries.length) { renderPending(); return; }
    const remaining = [];
    const outcomes = [];
    for (const item of entries) {
      let result;
      try { result = await verifyOnePending(item); }
      catch (error) { remaining.push(item); outcomes.push(`${short(item.hash)}：無法核對（${errorText(error)}），請稍後重試或自行查詢鏈上紀錄。`); continue; }
      if (result.state === "confirmed" && result.depth.state === "threshold_met") outcomes.push(`${short(item.hash)}：區塊 ${result.blockNumber}，已達 ${result.depth.confirmations} 次區塊確認且符合預期事件（仍非絕對終局）。`);
      else if (result.state === "confirmed") {
        remaining.push(item);
        outcomes.push(`${short(item.hash)}：符合預期事件，但區塊確認數為 ${result.depth.confirmations}/${REQUIRED_CONFIRMATIONS}，繼續保留待核對。`);
      }
      else if (result.state === "failed") outcomes.push(`${short(item.hash)}：鏈上執行失敗（區塊 ${result.blockNumber}），請勿視為成功。`);
      else {
        remaining.push(item);
        outcomes.push(`${short(item.hash)}：${result.state === "pending" ? "尚無交易收據" : "交易雖成功，但未找到完全符合預期的點數事件"}，請查看區塊瀏覽器。`);
      }
    }
    const persisted = savePending(remaining);
    renderPending();
    for (const outcome of outcomes) {
      const p = document.createElement("p"); p.textContent = outcome; area.prepend(p);
    }
    if (!persisted) show("瀏覽器無法保存待確認交易；請複製鏈上交易雜湊值，自行保留並核對。", true);
    await refresh();
  } finally { setBusy(false); }
}
// Portable tracking-only backup: contains public transaction identifiers; NEVER wallet keys.
function downloadPendingBackup(items) {
  const payload = { version: 1, chainId:Number(CHAIN_ID), contract:contract.target,
    wallet, exportedAt:new Date().toISOString(), pending:items };
  const url = URL.createObjectURL(new Blob([JSON.stringify(payload, null, 2)], {type:"application/json;charset=utf-8"}));
  const link = document.createElement("a");
  link.href = url;
  link.download = "independent-points-pending-tracking.json";
  document.body.append(link); link.click(); link.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
el("exportPendingBtn").addEventListener("click", () => {
  try {
    if (!contract || !wallet) throw Error("請先連接錢包及合約。");
    const items = readPending();
    if (!items.length) throw Error("目前沒有可備份的待確認交易。");
    downloadPendingBackup(items);
    show(`已下載 ${items.length} 筆公開交易追蹤資料；這不是錢包、私鑰或點數備份。`);
  } catch (error) { show(errorText(error), true); }
});
el("importPendingInput").addEventListener("change", async event => {
  const file = event.target.files && event.target.files[0];
  event.target.value = "";
  if (!file) return;
  try {
    if (busy || !contract || !wallet) throw Error("請先連接錢包及合約，並完成目前操作。");
    if (file.size > 100000) throw Error("交易追蹤備份不得超過 100 KB。");
    const backup = JSON.parse(await file.text());
    if (!backup || backup.version !== 1 || backup.chainId !== Number(CHAIN_ID) ||
        typeof backup.contract !== "string" || typeof backup.wallet !== "string" ||
        backup.contract.toLowerCase() !== contract.target.toLowerCase() ||
        backup.wallet.toLowerCase() !== wallet.toLowerCase())
      throw Error("備份的測試網、合約或錢包不符，未匯入。");
    const existing = readPending();
    const merged = PointsPendingCore.importTracking(existing, backup.pending,
      {contract:contract.target, wallet}, PointsTxCore.validatePending);
    if (!window.confirm(`確認合併這份追蹤備份？目前 ${existing.length} 筆，合併後 ${merged.length} 筆。這不會修改鏈上餘額。`)) return;
    const saved = savePending(merged);
    renderPending();
    show(saved ? `已合併 ${merged.length} 筆待確認追蹤紀錄；請按「重新核對」。` :
      `本次已載入 ${merged.length} 筆但瀏覽器未能持久保存，請保留備份並核對鏈上交易。`, !saved);
  } catch (error) { show(`匯入追蹤資料失敗：${errorText(error)}`, true); }
});

el("pendingBtn").addEventListener("click", async () => {
  try { await checkPendingTransactions(); }
  catch (err) { show("待確認交易查詢失敗：" + errorText(err), true); }
});
async function submitTx(makeTx, expected) {
  if (busy || !contract) throw Error("請先完成合約連線，或等待前一筆操作完成。");
  await checkChain();
  const pending = readPending();
  if (pending.length >= 20) throw Error("尚有 20 筆未核對交易；請先核對鏈上狀態後再操作。");
  const activeSigner = await signer.getAddress();
  if (activeSigner.toLowerCase() !== wallet.toLowerCase()) throw Error("錢包帳戶已變更，請重新連線後再操作。");
  const intent = { ...expected, chainId:Number(CHAIN_ID), contract:contract.target, wallet,
    units: expected.units === undefined ? null : String(expected.units) };
  const duplicate = PointsPendingCore.findDuplicate(pending, intent);
  if (duplicate) throw Error(`已有相同內容的待確認交易：${duplicate.hash}。請先核對其鏈上結果；勿重複送出。`);
  setBusy(true);
  el("txLink").replaceChildren();
  let tracked = null;
  try {
    const tx = await makeTx();
    tracked = PointsTxCore.validatePending({
      hash: tx.hash, kind: expected.kind, chainId: Number(CHAIN_ID), contract: contract.target,
      wallet, createdAt: Date.now(), from: expected.from, to: expected.to,
      units: expected.units === undefined ? null : String(expected.units)
    });
    // A second browser tab may have submitted a matching intent while wallet was open.
    // This check is advisory; the wallet itself must still confirm the actual transaction.
    const saved = savePending([...readPending(), tracked]);
    renderPending();
    show(`交易已送出：${tx.hash}，尚未完成。${saved ? "已在此瀏覽器保存待確認交易。" : "瀏覽器無法保存紀錄，請自行保存交易雜湊值。"}`);
    const link = document.createElement("a");
    link.href = `${EXPLORER}${tx.hash}`; link.textContent = "在 Sepolia Etherscan 查詢本次交易";
    link.target = "_blank"; link.rel = "noopener noreferrer";
    el("txLink").append(link);
    const receipt = await tx.wait(1);
    const result = PointsTxCore.verifyExpectedTransfer(receipt, tracked,
      log => contract.interface.parseLog({ topics: log.topics, data: log.data }));
    if (result.state !== "confirmed") {
      const detail = result.state === "mismatch" ? "交易已上鏈，但沒有找到符合預期的點數轉移事件；不可當作轉帳成功。" :
        result.state === "failed" ? "鏈上交易執行失敗。" : "尚未取得確認收據。";
      show(`${detail} 請用待確認交易查詢核對。`, true);
      return false;
    }
    const depth = PointsConfirmationCore.assess(receipt, await provider.getBlockNumber(), REQUIRED_CONFIRMATIONS);
    if (depth.state !== "threshold_met") {
      renderPending();
      show(`已找到符合預期的鏈上事件（區塊 ${result.blockNumber}），但目前只有 ${depth.confirmations}/${REQUIRED_CONFIRMATIONS} 次區塊確認。請稍後用「重新核對待確認交易」查詢，勿重複轉帳。`);
      return false;
    }
    savePending(readPending().filter(x => x.hash.toLowerCase() !== tracked.hash.toLowerCase()));
    renderPending();
    show(`區塊 ${result.blockNumber}、${depth.confirmations} 次區塊確認，符合預期事件，已達本頁確認門檻（不代表絕對終局）。`);
    return true;
  } catch (error) {
    // A wallet may replace/cancel a transaction with a different hash. Never claim its original hash succeeded.
    if (tracked) {
      const replacementHash = error && error.code === "TRANSACTION_REPLACED" && error.replacement && error.replacement.hash;
      if (replacementHash && /^0x[0-9a-fA-F]{64}$/.test(replacementHash)) {
        const link = document.createElement("a");
        link.href = EXPLORER + replacementHash; link.target = "_blank"; link.rel = "noopener noreferrer";
        link.textContent = `查詢替換交易 ${short(replacementHash)}`;
        el("txLink").append("｜", link);
      }
      show(`原交易 ${short(tracked.hash)} 尚未在本頁完成核對：${errorText(error)}。錢包若替換或取消交易，須核對新交易雜湊值和最終餘額，不能假設原交易成功，也不要直接重送。`, true);
    }
    throw error;
  } finally {
    setBusy(false);
    await refresh().catch(e => show(`交易狀態需自行核對：${errorText(e)}`, true));
  }
}
el("connectBtn").addEventListener("click", async () => {
  setBusy(true);
  try { await connect(); }
  catch (err) { show(errorText(err), true); }
  finally { setBusy(false); }
});
el("refreshBtn").addEventListener("click", async () => {
  setBusy(true);
  try { await refresh(); }
  catch (err) { show(errorText(err), true); }
  finally { setBusy(false); }
});
async function inspectRecipient(to) {
  await checkChain();
  if (!contract || !wallet) throw Error("請先連接錢包與合約。");
  const code = await provider.getCode(to);
  return PointsPreflightCore.assessRecipient(wallet, to, code, contract.target);
}
el("recipientCheckBtn").addEventListener("click", async () => {
  const btn = el("recipientCheckBtn");
  if (busy || btn.disabled) return;
  btn.disabled = true;
  try {
    const to = validAddress(el("sendTo").value);
    const inspected = await inspectRecipient(to);
    el("recipientCheckResult").textContent = inspected.isContract
      ? `警告：${to} 是智慧合約地址；合約可能無法將 IPT 轉回。請確認接收方確實支援本代幣。`
      : `地址格式與目前鏈上程式碼檢查完成：${to} 目前沒有合約程式碼。這不能證明地址屬於預期收款人。`;
  } catch (error) { el("recipientCheckResult").textContent = `收款地址檢查失敗：${errorText(error)}`; }
  finally { btn.disabled = busy || !contract; }
});
el("sendTo").addEventListener("input", () => {
  el("recipientCheckResult").textContent = "收款地址已變更，請重新檢查。";
});
el("sendForm").addEventListener("submit", async evt => {
  evt.preventDefault();
  try {
    if (!contract || !wallet) throw Error("請先連接錢包及合約。");
    const to = validAddress(el("sendTo").value);
    const amount = toUnits(el("sendAmount").value);
    const inspected = await inspectRecipient(to); // Check again at submission, not only on preview.
    if (amount > await contract.balanceOf(wallet)) throw Error("點數餘額不足。");
    if (await contract.paused()) throw Error("合約目前已暫停交易。");
    const simulated = await contract.transfer.staticCall(to, amount);
    if (simulated !== true) throw Error("轉帳模擬未通過；未開啟錢包簽署。");
    const warning = inspected.isContract ? "\n【重要】這是智慧合約地址，點數可能無法取回。請另行核對合約是否支援 IPT。" : "\n此地址沒有鏈上合約程式碼，但無法證明收款人身分。";
    if (!window.confirm(`已完成交易前模擬（非成功保證）。確認轉出 ${ethers.formatUnits(amount, 2)} IPT 至 ${to}？${warning}\n鏈上轉帳不可撤銷。`)) return;
    if (await submitTx(() => contract.transfer(to, amount), {kind:"send",from:wallet,to,units:amount})) el("sendAmount").value = "";
  } catch (err) { show(errorText(err), true); }
});
el("burnForm").addEventListener("submit", async evt => {
  evt.preventDefault();
  try {
    if (!contract || !wallet) throw Error("請先連接錢包及合約。");
    const amount = toUnits(el("burnAmount").value);
    if (amount > await contract.balanceOf(wallet)) throw Error("點數餘額不足。");
    if (await contract.paused()) throw Error("合約目前已暫停交易。")
    await contract.burn.staticCall(amount); // Read-only simulation: can still fail when mined.
    if (!window.confirm(`確定永久銷毀 ${ethers.formatUnits(amount, 2)} IPT？不會轉入其他錢包、不能兌換現金，鏈上交易無法撤銷。`)) return;
    if (await submitTx(() => contract.burn(amount), {kind:"burn",from:wallet,to:ZERO,units:amount})) el("burnAmount").value = "";
  } catch (err) { show(errorText(err), true); }
});
el("mintForm").addEventListener("submit", async evt => {
  evt.preventDefault();
  try {
    if (el("ownerHint").dataset.isOwner !== "yes") throw Error("目前錢包不是合約管理者。");
    const to = validAddress(el("mintTo").value);
    const amount = toUnits(el("mintAmount").value);
    await checkChain();
    const [ownerNow, pausedNow, cap, supply] = await Promise.all([contract.owner(), contract.paused(), contract.cap(), contract.totalSupply()]);
    if (ownerNow.toLowerCase() !== wallet.toLowerCase()) throw Error("管理權已變更，請重新連線。");
    if (pausedNow) throw Error("合約目前已暫停發行。");
    PointsPreflightCore.remainingSupply(cap, supply, amount);
    await contract.mint.staticCall(to, amount); // Read-only simulation: not a confirmed mint.
    if (!window.confirm(`確認發行 ${ethers.formatUnits(amount, 2)} IPT 至 ${to}？新增發行將增加總供給量。`)) return;
    if (await submitTx(() => contract.mint(to, amount), {kind:"mint",from:ZERO,to,units:amount})) el("mintAmount").value = "";
  } catch (err) { show(errorText(err), true); }
});
el("proposeOwnerForm").addEventListener("submit", async evt => {
  evt.preventDefault();
  try {
    if (!contract || !wallet || !onchainOwner || wallet.toLowerCase() !== onchainOwner.toLowerCase()) throw Error("只有目前鏈上管理者能提出交接。");
    await refresh(); // Re-read permissions before asking for wallet signature.
    if (wallet.toLowerCase() !== onchainOwner.toLowerCase()) throw Error("管理權已變更，請重新連線。");
    const newOwner = validAddress(el("newOwnerAddress").value);
    if (newOwner.toLowerCase() === wallet.toLowerCase()) throw Error("新舊管理者必須使用不同錢包地址。");
    if (onchainPendingOwner && onchainPendingOwner.toLowerCase() === newOwner.toLowerCase()) throw Error("此地址已經是候任管理者，請等待對方確認接任。");
    const question = `確定將 IPT 合約的候任管理者指定為 ${newOwner}？\n這不是點數轉帳。候任者必須另外簽署接任交易，管理權才會變更。\n填錯地址可能造成不可逆的管理權問題。`;
    if (!window.confirm(question)) return;
    await submitTx(() => contract.transferOwnership(newOwner), {kind:"owner_propose",from:wallet,to:newOwner});
  } catch (err) { show(errorText(err), true); }
});
el("acceptOwnerBtn").addEventListener("click", async () => {
  try {
    if (!contract || !wallet) throw Error("請先連線候任管理者錢包。");
    await refresh(); // Candidate must still be the pending owner at signature time.
    if (!onchainPendingOwner || wallet.toLowerCase() !== onchainPendingOwner.toLowerCase()) throw Error("目前錢包不是最新候任管理者，不能接任。");
    if (!onchainOwner || onchainOwner.toLowerCase() === wallet.toLowerCase()) throw Error("管理者已經是此錢包，無須再接任。");
    if (!window.confirm(`確定以目前錢包 ${wallet} 接任 ${contract.target} 的管理權？\n接任後可發行、暫停及指派下一位管理者，請確認你能安全保管此錢包。`)) return;
    await submitTx(() => contract.acceptOwnership(), {kind:"owner_accept",from:onchainOwner,to:wallet});
  } catch (err) { show(errorText(err), true); }
});

if (window.ethereum && typeof window.ethereum.on === "function") {
  window.ethereum.on("accountsChanged", () => window.location.reload());
  window.ethereum.on("chainChanged", () => window.location.reload());
}

// Contract address is public configuration; only persist it, never wallet secrets.
try {
  const savedContract = localStorage.getItem("independent-points-v07-contract") || localStorage.getItem("independent-points-v06-contract") || localStorage.getItem("independent-points-v05-contract");
  if (savedContract && /^0x[0-9a-fA-F]{40}$/.test(savedContract)) el("contractAddress").value = savedContract;
} catch (_) { /* storage optional */ }
async function copyValue(value, label) {
  if (!value) throw Error(`目前沒有可複製的${label}。`);
  if (!navigator.clipboard || !window.isSecureContext) throw Error("請使用 HTTPS 或 localhost，才能複製到剪貼簿。也可以手動選取地址複製。");
  await navigator.clipboard.writeText(value);
  show(`已複製${label}。`);
}
el("copyWalletBtn").addEventListener("click", async () => {
  try { await copyValue(wallet, "錢包地址"); } catch (err) { show(errorText(err), true); }
});
el("copyContractBtn").addEventListener("click", async () => {
  try { await copyValue(contract?.target, "合約地址"); } catch (err) { show(errorText(err), true); }
});
el("pauseBtn").addEventListener("click", async () => {
  try {
    if (el("ownerHint").dataset.isOwner !== "yes") throw Error("只有管理者能操作。");
    if (!window.confirm("暫停合約？所有點數轉帳及新發行均會暫時無法執行。")) return;
    await submitTx(() => contract.pause(), {kind:"pause"});
  } catch (err) { show(errorText(err), true); }
});
el("unpauseBtn").addEventListener("click", async () => {
  try {
    if (el("ownerHint").dataset.isOwner !== "yes") throw Error("只有管理者能操作。");
    if (!window.confirm("確定恢復合約的點數轉帳與發行？")) return;
    await submitTx(() => contract.unpause(), {kind:"unpause"});
  } catch (err) { show(errorText(err), true); }
});
function csvCell(value) { return '"' + String(value).replace(/"/g, '""') + '"'; }
el("exportBtn").addEventListener("click", () => {
  if (!visibleHistory.length) { show("目前沒有可匯出的交易紀錄。", true); return; }
  const cols = ["類型", "數量(IPT)", "來源錢包", "目標錢包", "區塊編號", "交易雜湊"];
  // Quote every field and prefix spreadsheet formula triggers to prevent CSV formula injection.
  const safeCell = v => csvCell(/^[=+@\-\t\r]/.test(String(v)) ? "'" + v : v);
  const rows = visibleHistory.map(x => [x.type, x.amount, x.from, x.to, x.block, x.txHash]);
  const csv = '\uFEFF' + [cols, ...rows].map(row => row.map(safeCell).join(",")).join("\r\n");
  const url = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8" }));
  const a = document.createElement("a");
  a.href = url;
  a.download = "independent-points-recent-transactions.csv";
  document.body.appendChild(a);
  a.click(); a.remove();
  URL.revokeObjectURL(url);
  show(`已匯出目前顯示的 ${visibleHistory.length} 筆紀錄；不是全部歷史。`);
});
