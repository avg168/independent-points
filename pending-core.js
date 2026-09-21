/* Read-only local tracking safeguards. Browser data is not blockchain state. */
(function (root, factory) {
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  else root.PointsPendingCore = api;
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  'use strict';
  const ADDRESS = /^0x[0-9a-fA-F]{40}$/;
  const KINDS = ['send', 'mint', 'burn', 'pause', 'unpause', 'owner_propose', 'owner_accept'];
  function normalizedAddress(value) {
    if (typeof value !== 'string' || !ADDRESS.test(value)) throw Error('待確認交易地址格式錯誤。');
    return value.toLowerCase();
  }
  function intentKey(item) {
    if (!item || !KINDS.includes(item.kind) || item.chainId !== 11155111)
      throw Error('交易類型或測試網錯誤。');
    const base = [item.chainId, normalizedAddress(item.contract), normalizedAddress(item.wallet), item.kind];
    if (['send', 'mint', 'burn'].includes(item.kind)) {
      if (typeof item.units !== 'string' || !/^[1-9][0-9]{0,76}$/.test(item.units)) throw Error('交易點數格式錯誤。');
      base.push(normalizedAddress(item.from), normalizedAddress(item.to), item.units);
    }
    if (['owner_propose', 'owner_accept'].includes(item.kind)) {
      base.push(normalizedAddress(item.from), normalizedAddress(item.to));
    }
    return base.join('|');
  }
  function findDuplicate(items, intent) {
    if (!Array.isArray(items)) throw Error('待確認清單格式錯誤。');
    const key = intentKey(intent);
    return items.find(item => intentKey(item) === key) || null;
  }
  function importTracking(existing, input, context, validatePending) {
    if (!Array.isArray(input) || !Array.isArray(existing) || input.length > 20 || existing.length > 20 || typeof validatePending !== 'function')
      throw Error('交易備份格式不正確或筆數超過 20 筆。');
    const c = normalizedAddress(context.contract), w = normalizedAddress(context.wallet);
    const merged = new Map();
    for (const raw of [...existing, ...input]) {
      const item = validatePending(raw);
      if (item.chainId !== 11155111 || normalizedAddress(item.contract) !== c || normalizedAddress(item.wallet) !== w)
        throw Error('備份不是目前 Sepolia 合約與錢包的追蹤資料，未匯入。');
      const key = item.hash.toLowerCase();
      if (merged.has(key) && JSON.stringify(merged.get(key)) !== JSON.stringify(item))
        throw Error('同一交易雜湊值含有不一致的備份資料，未匯入。');
      merged.set(key, item);
      if (merged.size > 20) throw Error('合併後超過 20 筆待確認交易，未匯入。');
    }
    return [...merged.values()];
  }
  return Object.freeze({ intentKey, findDuplicate, importTracking });
});
