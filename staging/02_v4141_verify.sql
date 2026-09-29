-- V4.14.1 READ-ONLY verification
select routine_name,grantee,privilege_type
from information_schema.routine_privileges
where routine_schema='public'
  and routine_name in (
    'platform_admin_withdrawal_context',
    'platform_admin_list_ipt_withdrawals',
    'platform_admin_review_ipt_withdrawal',
    'platform_admin_submit_ipt_withdrawal_tx',
    'platform_complete_ipt_withdrawal',
    'platform_fail_ipt_withdrawal'
  )
order by routine_name,grantee;

select conname,pg_get_constraintdef(oid) as definition
from pg_constraint
where connamespace='public'::regnamespace
  and conrelid='public.wallet_ledger_entries'::regclass
  and conname='wallet_ledger_entries_entry_type_check';

select * from public.platform_wallets
where available_units < 0 or locked_units < 0;

select w.user_id,sum(w.ipt_units) as active_withdrawal_units,pw.locked_units
from public.platform_ipt_withdrawals w
join public.platform_wallets pw on pw.user_id=w.user_id and pw.asset_code='IPT'
where w.status in ('pending','approved','tx_submitted')
group by w.user_id,pw.locked_units
having sum(w.ipt_units) <> pw.locked_units;

select w.id,w.status,w.tx_hash,w.tx_block_number,count(le.id) as ledger_entries
from public.platform_ipt_withdrawals w
left join public.wallet_ledger_entries le
  on le.reference_type='platform_ipt_withdrawal'
 and le.reference_id=w.id
 and le.entry_type='withdrawal'
where w.status='completed'
group by w.id,w.status,w.tx_hash,w.tx_block_number
having w.tx_hash is null or w.tx_block_number is null or count(le.id) <> 1;
