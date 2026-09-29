-- V4.14.1 emergency rollback.
-- Refuses rollback after any request progressed beyond pending/cancelled.
begin;

do $$
begin
  if exists (
    select 1 from public.platform_ipt_withdrawals
    where status in ('approved','tx_submitted','completed','rejected','failed')
  ) then
    raise exception 'ROLLBACK BLOCKED: V4.14.1 lifecycle data exists. Use a forward migration.';
  end if;
  if exists (select 1 from public.wallet_ledger_entries where entry_type='withdrawal') then
    raise exception 'ROLLBACK BLOCKED: withdrawal ledger entries exist.';
  end if;
end
$$;

drop function if exists public.platform_fail_ipt_withdrawal(uuid,text,text,jsonb);
drop function if exists public.platform_complete_ipt_withdrawal(uuid,text,bigint,jsonb);
drop function if exists public.platform_admin_submit_ipt_withdrawal_tx(uuid,text);
drop function if exists public.platform_admin_review_ipt_withdrawal(uuid,text,text);
drop function if exists public.platform_admin_list_ipt_withdrawals(integer);
drop function if exists public.platform_admin_withdrawal_context();
drop function if exists public.platform_assert_admin_withdrawal_access();

alter table public.wallet_ledger_entries drop constraint if exists wallet_ledger_entries_entry_type_check;
alter table public.wallet_ledger_entries add constraint wallet_ledger_entries_entry_type_check
check (entry_type = any (array['opening'::text,'conversion'::text,'transfer'::text,'adjustment'::text,'freeze'::text,'unfreeze'::text]));

commit;
