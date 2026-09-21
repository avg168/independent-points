/* Local browser demonstration: NO blockchain, NO authentication, NO financial value. */
'use strict';
const core = window.PointsDemoCore;
const STORAGE_KEY = 'independent-points-v05-demo';
let ledger = core.createLedger();
let storageEnabled = true;
const el = id => document.getElementById(id);
function current() { return el('currentAccount').value; }
function status(message, error = false) {
  el('status').textContent = message;
  el('status').style.color = error ? '#bd2929' : '#183b67';
}
function save() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(ledger.snapshot()));
    storageEnabled = true;
    el('storageHint').textContent = '示範資料只儲存在此裝置的這個瀏覽器，並非雲端備份或鏈上資料。';
    return true;
  } catch (_) {
    storageEnabled = false;
    el('storageHint').textContent = '瀏覽器儲存不可用：重新整理後資料可能消失，請自行下載示範備份。';
    return false;
  }
}
function render() {
  const state = ledger.snapshot();
  el('balance').textContent = core.formatAmount(state.balances[current()]);
  el('supply').textContent = `${core.formatAmount(state.supply)} DEMO`;
  el('externalBalance').textContent = `${core.formatAmount(state.balances.External)} DEMO`;
  el('receiver').value = current() === 'Alice' ? 'Bob' : 'Alice';
  const visible = core.filterHistory(state, el('filterAccount').value, el('filterType').value);
  el('historyCount').textContent = `目前顯示 ${visible.length} / ${state.history.length} 筆示範交易`;
  const history = el('history');
  history.replaceChildren();
  if (!visible.length) { history.textContent = state.history.length ? '沒有符合篩選條件的示範交易。' : '尚無示範交易。'; return; }
  for (const item of visible) {
    const row = document.createElement('div'); row.className = 'entry';
    const title = document.createElement('strong');
    title.textContent = `${item.type}　${core.formatAmount(item.units)} DEMO`;
    const detail = document.createElement('span'); detail.className = 'sub';
    detail.textContent = `${item.id}｜${item.from} → ${item.to}（瀏覽器模擬，未上鏈）`;
    row.append(title, detail); history.append(row);
  }
}
function handle(formId, action) {
  el(formId).addEventListener('submit', event => {
    event.preventDefault();
    const btn = el(formId).querySelector('button[type="submit"]');
    btn.disabled = true;
    try {
      const item = action();
      render();
      const persisted = save();
      status(`已完成 ${item.id} 示範交易：${item.from} → ${item.to}，${core.formatAmount(item.units)} DEMO（未上鏈）。${persisted ? '' : '注意：本機自動儲存失敗。'}`);
      el(formId).reset();
      if (formId === 'transferForm') el('receiver').value = current() === 'Alice' ? 'Bob' : 'Alice';
    } catch (error) { status(error.message, true); }
    finally { btn.disabled = false; }
  });
}
function downloadText(name, type, content) {
  const url = URL.createObjectURL(new Blob([content], { type }));
  const a = document.createElement('a'); a.href = url; a.download = name;
  document.body.append(a); a.click(); a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
function csvCell(value) {
  const text = String(value);
  return '"' + (/^[=+@\-\t\r]/.test(text) ? "'" + text : text).replace(/"/g, '""') + '"';
}
el('currentAccount').addEventListener('change', () => { render(); status(`已切換至示範會員 ${current()}。`); });
el('filterAccount').addEventListener('change', render);
el('filterType').addEventListener('change', render);
el('verifyBtn').addEventListener('click', () => {
  try {
    const proof = core.verifySnapshot(ledger.snapshot());
    el('verifyResult').textContent = `本機帳本格式與餘額核對一致：${proof.count} 筆示範交易，總供給與全部帳戶合計均為 ${core.formatAmount(proof.supply)} DEMO。這不能證明資料未被人為修改或已上鏈。`;
  } catch (err) { el('verifyResult').textContent = '核對失敗：' + err.message; }
});
el('resetBtn').addEventListener('click', () => {
  if (!window.confirm('確定清除本瀏覽器的示範交易？此動作不能還原，建議先下載備份。')) return;
  ledger = core.createLedger();
  try { localStorage.removeItem(STORAGE_KEY); } catch (_) { /* optional */ }
  render(); save(); status('已重設本機示範資料；這不是鏈上回復交易。');
});
el('exportCsvBtn').addEventListener('click', () => {
  const rows = core.filterHistory(ledger.snapshot(), el('filterAccount').value, el('filterType').value);
  if (!rows.length) { status('尚無交易紀錄可匯出。', true); return; }
  const cols = ['示範編號', '類型', '來源', '去向', '數量(DEMO)', '是否上鏈'];
  const data = rows.map(x => [x.id, x.type, x.from, x.to, core.formatAmount(x.units), '否']);
  downloadText('independent-points-demo-history.csv', 'text/csv;charset=utf-8', '\uFEFF' + [cols, ...data].map(r => r.map(csvCell).join(',')).join('\r\n'));
  status(`已匯出 ${rows.length} 筆示範交易 CSV（非區塊鏈紀錄）。`);
});
el('backupBtn').addEventListener('click', () => {
  downloadText('independent-points-demo-backup.json', 'application/json;charset=utf-8', JSON.stringify(ledger.snapshot(), null, 2));
  status('已下載本機示範資料備份（JSON）；這不是鏈上錢包備份，請勿放入私鑰。');
});
el('restoreInput').addEventListener('change', async e => {
  const file = e.target.files && e.target.files[0];
  e.target.value = '';
  if (!file) return;
  try {
    if (file.size > 512000) throw Error('檔案過大，僅支援 500 KB 以下的示範 JSON 備份。');
    const restored = core.createLedger(JSON.parse(await file.text()));
    if (!window.confirm('要用檔案中的示範交易覆蓋此瀏覽器的現有資料嗎？')) return;
    ledger = restored; render();
    status(`已載入 ${ledger.snapshot().history.length} 筆示範交易。${save() ? '' : '本機自動儲存失敗。'}`);
  } catch (error) { status(`匯入失敗：${error.message}`, true); }
});
handle('transferForm', () => ledger.transfer(current(), el('receiver').value, el('transferAmount').value));
handle('issueForm', () => ledger.issue(current(), el('issueAmount').value));
handle('withdrawForm', () => ledger.transfer(current(), 'External', el('withdrawAmount').value));
try {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) {
    ledger = core.createLedger(JSON.parse(saved));
    status(`已讀取本機 ${ledger.snapshot().history.length} 筆示範交易，尚未上鏈。`);
  }
} catch (err) {
  status('無法還原本機示範資料（可能已損壞或瀏覽器禁止儲存）：' + err.message, true);
}
render();
if (!storageEnabled) el('storageHint').textContent = '瀏覽器儲存不可用。';
