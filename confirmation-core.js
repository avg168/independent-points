/* Pure helper: chain depth is a *provisional* confirmation threshold, NOT absolute finality.
 * A receipt is refetched each time to guard against reorgs and absent transactions. */
(function (root, factory) {
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  else root.PointsConfirmationCore = api;
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  'use strict';
  function assess(receipt, latestBlock, minimum = 3) {
    if (!Number.isSafeInteger(latestBlock) || latestBlock < 0 ||
        !Number.isSafeInteger(minimum) || minimum < 1 || minimum > 100)
      throw Error('區塊高度或確認門檻不正確。');
    if (!receipt) return Object.freeze({ state: 'pending', confirmations: 0, minimum });
    if (receipt.status !== 0 && receipt.status !== 1) throw Error('交易收據狀態異常。');
    if (!Number.isSafeInteger(receipt.blockNumber) || receipt.blockNumber < 0 ||
        receipt.blockNumber > latestBlock)
      return Object.freeze({ state: 'unverifiable', confirmations: 0, minimum });
    const confirmations = latestBlock - receipt.blockNumber + 1;
    if (receipt.status === 0) return Object.freeze({ state: 'failed', confirmations, minimum });
    return Object.freeze({
      state: confirmations >= minimum ? 'threshold_met' : 'confirming', confirmations, minimum
    });
  }
  return Object.freeze({ assess });
});
