/* Browser-only demonstration ledger. NOT blockchain, real wallet or an authoritative balance. */
(function (root, factory) {
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  else root.PointsDemoCore = api;
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  'use strict';
  const INITIAL = Object.freeze({ Alice: 100000n, Bob: 0n, External: 0n });
  const MAX = 100000000000n; // 1 billion demo points, 2 decimal places
  const MAX_HISTORY = 1000;
  const ACCOUNTS = Object.freeze(['Alice', 'Bob', 'External']);
  const POSITIVE = /^(?:0|[1-9]\d*)(?:\.\d{1,2})?$/;
  const CANONICAL = /^(?:0|[1-9]\d*)$/;
  function parseAmount(raw) {
    const value = String(raw).trim();
    if (!POSITIVE.test(value)) throw Error('請輸入正數，最多兩位小數，不可使用逗號或科學記號。');
    const [integer, fraction = ''] = value.split('.');
    const units = BigInt(integer) * 100n + BigInt((fraction + '00').slice(0, 2));
    if (units <= 0n) throw Error('數量必須大於 0。');
    if (units > MAX) throw Error('數量超出示範上限。');
    return units;
  }
  function formatAmount(units) {
    const value = BigInt(units);
    const sign = value < 0n ? '-' : '';
    const magnitude = value < 0n ? -value : value;
    return sign + (magnitude / 100n).toString() + '.' + (magnitude % 100n).toString().padStart(2, '0');
  }
  function createLedger(restore = null) {
    const balances = { ...INITIAL };
    const history = [];
    let supply = INITIAL.Alice + INITIAL.Bob + INITIAL.External;
    let serial = 0;
    const isAccount = account => ACCOUNTS.includes(account);
    function record(type, from, to, units) {
      if (history.length >= MAX_HISTORY) throw Error('示範已達 1,000 筆交易，請先匯出備份再重設。');
      const event = Object.freeze({ id: `SIM-${String(++serial).padStart(4, '0')}`, type, from, to, units: units.toString() });
      history.unshift(event);
      return event;
    }
    function transfer(from, to, rawAmount) {
      if (!isAccount(from) || !isAccount(to)) throw Error('請選擇有效的示範帳戶。');
      if (from === 'External') throw Error('外部帳戶僅供示範轉出，不支援操作。');
      if (from === to) throw Error('不能轉給同一個帳戶。');
      const units = parseAmount(rawAmount);
      if (balances[from] < units) throw Error('示範餘額不足。');
      if (history.length >= MAX_HISTORY) throw Error('示範交易紀錄已達上限。');
      balances[from] -= units;
      balances[to] += units;
      return record('轉移', from, to, units);
    }
    function issue(to, rawAmount) {
      if (!isAccount(to) || to === 'External') throw Error('只能發行到示範會員帳戶。');
      const units = parseAmount(rawAmount);
      if (supply + units > MAX) throw Error('超過示範發行總量上限。');
      if (history.length >= MAX_HISTORY) throw Error('示範交易紀錄已達上限。');
      balances[to] += units;
      supply += units;
      return record('管理者發行（模擬存入）', '管理者', to, units);
    }
    function snapshot() {
      return {
        version: 1,
        balances: Object.freeze(Object.fromEntries(ACCOUNTS.map(a => [a, balances[a].toString()]))),
        supply: supply.toString(),
        history: history.map(event => ({ ...event }))
      };
    }
    if (restore !== null) {
      if (!restore || typeof restore !== 'object' || Array.isArray(restore) || restore.version !== 1 || !Array.isArray(restore.history) || restore.history.length > MAX_HISTORY) {
        throw Error('備份格式不符或交易數量超出上限。');
      }
      if (!restore.balances || typeof restore.balances !== 'object' || Array.isArray(restore.balances) || typeof restore.supply !== 'string') throw Error('備份餘額格式錯誤。');
      // Rebuild all balances from the original issuance and chronological events.
      // This catches accidental corruption; a browser-only backup is NOT cryptographically authenticated.
      for (let i = restore.history.length - 1; i >= 0; i--) {
        const event = restore.history[i];
        if (!event || typeof event !== 'object' || typeof event.units !== 'string' || !CANONICAL.test(event.units)) throw Error('備份交易格式錯誤。');
        const amount = BigInt(event.units);
        if (amount <= 0n || amount > MAX) throw Error('備份交易數量錯誤。');
        const stringAmount = formatAmount(amount);
        let reconstructed;
        if (event.type === '轉移') reconstructed = transfer(event.from, event.to, stringAmount);
        else if (event.type === '管理者發行（模擬存入）' && event.from === '管理者') reconstructed = issue(event.to, stringAmount);
        else throw Error('備份含有未知交易類型。');
        for (const field of ['id', 'type', 'from', 'to', 'units']) {
          if (event[field] !== reconstructed[field]) throw Error('備份交易紀錄不一致。');
        }
      }
      const expected = snapshot();
      if (restore.supply !== expected.supply || ACCOUNTS.some(a => restore.balances[a] !== expected.balances[a])) throw Error('備份餘額與交易紀錄不一致。');
    }
    return Object.freeze({ transfer, issue, snapshot });
  }
  function filterHistory(snapshot, account = '全部', type = '全部') {
    if (account !== '全部' && !ACCOUNTS.includes(account)) throw Error('未知示範帳戶。');
    if (!['全部', '轉移', '管理者發行（模擬存入）'].includes(type)) throw Error('未知交易類型。');
    return snapshot.history.filter(item => (account === '全部' || item.from === account || item.to === account) && (type === '全部' || item.type === type));
  }
  // Replays history and checks supply, account balances and event format.
  // This is consistency checking, NOT a cryptographic proof of authenticity.
  function verifySnapshot(snapshot) {
    const replayed = createLedger(snapshot).snapshot();
    const sum = ACCOUNTS.reduce((acc, account) => acc + BigInt(replayed.balances[account]), 0n);
    if (sum !== BigInt(replayed.supply)) throw Error('示範點數總供給與帳戶合計不一致。');
    return Object.freeze({ count: replayed.history.length, supply: replayed.supply, accountSum: sum.toString() });
  }
  return Object.freeze({ createLedger, parseAmount, formatAmount, filterHistory, verifySnapshot });
});
