/* Read-only safety preflight: not proof of recipient ownership or contract authenticity. */
(function (root, factory) {
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  else root.PointsPreflightCore = api;
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  'use strict';
  const ADDR = /^0x[0-9a-fA-F]{40}$/;
  const ZERO = '0x' + '0'.repeat(40);
  const EXPECTED_CAP_UNITS = 100_000_000_000n; // 1 billion IPT, 2 decimals
  function address(value) {
    if (typeof value !== 'string' || !ADDR.test(value)) throw Error('請輸入有效的錢包地址。');
    return value.toLowerCase();
  }
  function contractIdentity(cap, maxPoints) {
    if (typeof cap !== 'bigint' || typeof maxPoints !== 'bigint' ||
        cap !== EXPECTED_CAP_UNITS || maxPoints !== 1_000_000_000n)
      throw Error('合約發行上限不符合本測試版預期。請重新核對合約地址與原始碼。');
    return true;
  }
  function remainingSupply(cap, supply, requestUnits = 0n) {
    if (typeof cap !== 'bigint' || typeof supply !== 'bigint' ||
        typeof requestUnits !== 'bigint' || cap <= 0n || supply < 0n ||
        supply > cap || requestUnits < 0n) throw Error('鏈上發行總量或數量資料不正確。');
    const remaining = cap - supply;
    if (requestUnits > remaining) throw Error('超過合約剩餘可發行量，請減少發行數量。');
    return remaining;
  }
  function assessRecipient(from, to, code, tokenContract) {
    const src = address(from), dst = address(to), token = address(tokenContract);
    if (dst === ZERO) throw Error('不能轉帳至零地址。');
    if (dst === src) throw Error('請勿轉帳到同一個錢包地址。');
    if (dst === token) throw Error('不能直接轉帳給本 IPT 合約，這可能造成點數無法取回。');
    if (typeof code !== 'string' || !/^0x(?:[0-9a-fA-F]{2})*$/.test(code))
      throw Error('無法可靠讀取收款地址的合約程式碼，請稍後再試。');
    return Object.freeze({ isContract: code !== '0x', recipient: dst });
  }
  return Object.freeze({ contractIdentity, remainingSupply, assessRecipient });
});
