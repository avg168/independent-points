/* Pure transaction-receipt verifier. No secrets, browser data, or network calls. */
(function (root, factory) {
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  else root.PointsReceiptCore = api;
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  'use strict';
  function verifyReceipt(receipt, contractAddress, walletAddress, decodeLog, formatUnits) {
    if (typeof contractAddress !== 'string' || typeof walletAddress !== 'string' ||
        typeof decodeLog !== 'function' || typeof formatUnits !== 'function') throw Error('交易驗證參數錯誤。');
    if (!receipt) return { state: 'pending', events: [] };
    const blockNumber = receipt.blockNumber;
    if (receipt.status !== 1) return { state: 'failed', blockNumber, events: [] };
    const relevant = [];
    for (const log of receipt.logs || []) {
      if (!log || typeof log.address !== 'string' || log.address.toLowerCase() !== contractAddress.toLowerCase()) continue;
      let parsed;
      try { parsed = decodeLog(log); } catch (_) { continue; }
      if (!parsed || parsed.name !== 'Transfer' || !parsed.args || parsed.args.length < 3) continue;
      const [from, to, value] = parsed.args;
      if (typeof from !== 'string' || typeof to !== 'string' || typeof value !== 'bigint' || value <= 0n) continue;
      if (from.toLowerCase() !== walletAddress.toLowerCase() && to.toLowerCase() !== walletAddress.toLowerCase()) continue;
      relevant.push(Object.freeze({ from, to, amount: formatUnits(value, 2) }));
    }
    return Object.freeze({ state: 'success', blockNumber, events: Object.freeze(relevant) });
  }
  return Object.freeze({ verifyReceipt });
});
