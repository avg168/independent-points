/* Confirm the exact token movement expected from a submitted transaction.
 * A successful receipt is not, by itself, proof of the intended ERC-20 transfer.
 * Stateless and testable in Node; NO wallet credentials. */
(function (root, factory) {
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  else root.PointsTxCore = api;
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  'use strict';
  const ADDRESS = /^0x[0-9a-fA-F]{40}$/;
  const HASH = /^0x[0-9a-fA-F]{64}$/;
  function checkedAddress(value) {
    if (typeof value !== 'string' || !ADDRESS.test(value)) throw Error('地址格式錯誤。');
    return value.toLowerCase();
  }
  function validatePending(item) {
    if (!item || typeof item !== 'object' || !HASH.test(item.hash) ||
        !['send', 'mint', 'burn', 'pause', 'unpause', 'owner_propose', 'owner_accept'].includes(item.kind) ||
        !Number.isSafeInteger(item.createdAt) || item.createdAt <= 0 ||
        !Number.isSafeInteger(item.chainId) || item.chainId !== 11155111) throw Error('待確認交易資料格式錯誤。');
    checkedAddress(item.contract); checkedAddress(item.wallet);
    if (['send', 'mint', 'burn'].includes(item.kind)) {
      checkedAddress(item.from); checkedAddress(item.to);
      if (typeof item.units !== 'string' || !/^[1-9][0-9]{0,76}$/.test(item.units)) throw Error('交易數量格式錯誤。');
    }
    if (['owner_propose', 'owner_accept'].includes(item.kind)) {
      checkedAddress(item.from); checkedAddress(item.to);
      if (item.units !== null && item.units !== undefined) throw Error('管理權交接不得包含點數數量。');
      if (item.from.toLowerCase() === item.to.toLowerCase()) throw Error('新舊管理者必須不同。');
      if (item.kind === 'owner_propose' && item.wallet.toLowerCase() !== item.from.toLowerCase()) throw Error('提出交接者必須是原管理者。');
      if (item.kind === 'owner_accept' && item.wallet.toLowerCase() !== item.to.toLowerCase()) throw Error('接任者必須是新管理者。');
    }
    return { hash: item.hash, kind: item.kind, createdAt: item.createdAt,
      chainId: item.chainId, contract: item.contract, wallet: item.wallet,
      from: item.from || null, to: item.to || null, units: item.units || null };
  }
  function verifyExpectedTransfer(receipt, expected, decodeLog) {
    const tx = validatePending(expected);
    if (typeof decodeLog !== 'function') throw Error('缺少交易解析函式。');
    if (!receipt) return { state: 'pending', blockNumber: null };
    if (receipt.status !== 1) return { state: 'failed', blockNumber: receipt.blockNumber };
    // Wallet transaction replacement must not be mistaken for the original hash.
    if (typeof receipt.hash === 'string' && receipt.hash.toLowerCase() !== tx.hash.toLowerCase())
      return { state: 'mismatch', blockNumber: receipt.blockNumber };
    if (tx.kind === 'pause' || tx.kind === 'unpause') {
      const name = tx.kind === 'pause' ? 'Paused' : 'Unpaused';
      for (const log of receipt.logs || []) {
        if (!log || typeof log.address !== 'string' || log.address.toLowerCase() !== tx.contract.toLowerCase()) continue;
        let decoded;
        try { decoded = decodeLog(log); } catch (_) { continue; }
        if (decoded && decoded.name === name && decoded.args &&
            typeof decoded.args[0] === 'string' && decoded.args[0].toLowerCase() === tx.wallet.toLowerCase())
          return { state: 'confirmed', blockNumber: receipt.blockNumber };
      }
      return { state: 'mismatch', blockNumber: receipt.blockNumber };
    }
    const from = checkedAddress(tx.from), to = checkedAddress(tx.to);
    if (tx.kind === 'owner_propose' || tx.kind === 'owner_accept') {
      const name = tx.kind === 'owner_propose' ? 'OwnershipTransferStarted' : 'OwnershipTransferred';
      for (const log of receipt.logs || []) {
        if (!log || typeof log.address !== 'string' || log.address.toLowerCase() !== tx.contract.toLowerCase()) continue;
        let decoded;
        try { decoded = decodeLog(log); } catch (_) { continue; }
        if (decoded && decoded.name === name && decoded.args &&
            typeof decoded.args[0] === 'string' && typeof decoded.args[1] === 'string' &&
            decoded.args[0].toLowerCase() === from && decoded.args[1].toLowerCase() === to)
          return { state: 'confirmed', blockNumber: receipt.blockNumber };
      }
      return { state: 'mismatch', blockNumber: receipt.blockNumber };
    }
    const amount = BigInt(tx.units);
    for (const log of receipt.logs || []) {
      if (!log || typeof log.address !== 'string' || log.address.toLowerCase() !== tx.contract.toLowerCase()) continue;
      let decoded;
      try { decoded = decodeLog(log); } catch (_) { continue; }
      if (!decoded || decoded.name !== 'Transfer' || !decoded.args || decoded.args.length < 3) continue;
      const [actualFrom, actualTo, actualUnits] = decoded.args;
      if (typeof actualFrom === 'string' && typeof actualTo === 'string' &&
          actualFrom.toLowerCase() === from && actualTo.toLowerCase() === to && actualUnits === amount) {
        return { state: 'confirmed', blockNumber: receipt.blockNumber };
      }
    }
    return { state: 'mismatch', blockNumber: receipt.blockNumber };
  }
  return Object.freeze({ verifyExpectedTransfer, validatePending });
});
