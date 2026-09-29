-- Independent Points V4.14.1
-- Admin review + manual Owner Mint + server-side Sepolia proof + final settlement.
-- This migration itself DOES NOT send a blockchain transaction.

begin;

alter table public.wallet_ledger_entries
  drop constraint if exists wallet_ledger_entries_entry_type_check;

alter table public.wallet_ledger_entries
  add constraint wallet_ledger_entries_entry_type_check
  check (
    entry_type = any (
      array[
        'opening'::text,
        'conversion'::text,
        'transfer'::text,
        'adjustment'::text,
        'freeze'::text,
        'unfreeze'::text,
        'withdrawal'::text
      ]
    )
  );

create or replace function public.platform_assert_admin_withdrawal_access()
returns uuid
language plpgsql
security definer
set search_path=''
as $$
declare
  v_uid uuid;
  v_aal text;
begin
  v_uid := auth.uid();
  v_aal := auth.jwt()->>'aal';

  if v_uid is null then raise exception 'Authentication required'; end if;
  if v_aal is distinct from 'aal2' then raise exception 'Admin MFA AAL2 required'; end if;
  if public.ipt_device_access_allowed() is distinct from true then
    raise exception 'Trusted device verification required';
  end if;
  if not exists (
    select 1 from public.member_roles mr
    where mr.user_id=v_uid and mr.role='admin'
  ) then
    raise exception 'Admin role required';
  end if;
  return v_uid;
end;
$$;

revoke all on function public.platform_assert_admin_withdrawal_access()
  from public, anon, authenticated, service_role;

create or replace function public.platform_admin_withdrawal_context()
returns jsonb
language plpgsql
security definer
set search_path=''
as $$
declare
  v_admin uuid;
begin
  v_admin := public.platform_assert_admin_withdrawal_access();
  return pg_catalog.jsonb_build_object(
    'ok', true,
    'admin_user_id', v_admin,
    'aal', auth.jwt()->>'aal',
    'chain_id', 11155111,
    'contract', '0xd3fb2480aadb8b168ec7e88a0e5c847d9750cb87'
  );
end;
$$;

revoke all on function public.platform_admin_withdrawal_context()
  from public, anon, authenticated, service_role;
grant execute on function public.platform_admin_withdrawal_context()
  to authenticated;

create or replace function public.platform_admin_list_ipt_withdrawals(
  p_limit integer default 100
)
returns jsonb
language plpgsql
security definer
set search_path=''
as $$
declare
  v_admin uuid;
  v_limit integer;
  v_rows jsonb;
begin
  v_admin := public.platform_assert_admin_withdrawal_access();
  v_limit := greatest(1,least(coalesce(p_limit,100),200));

  select coalesce(
    pg_catalog.jsonb_agg(
      pg_catalog.jsonb_build_object(
        'id', w.id,
        'member_number', mp.member_number,
        'display_name', mp.display_name,
        'user_id', w.user_id,
        'wallet_address', w.wallet_address,
        'chain_id', w.chain_id,
        'ipt_units', w.ipt_units,
        'status', w.status,
        'requested_at', w.requested_at,
        'reviewed_by', w.reviewed_by,
        'reviewed_at', w.reviewed_at,
        'tx_hash', w.tx_hash,
        'tx_submitted_at', w.tx_submitted_at,
        'tx_block_number', w.tx_block_number,
        'tx_confirmed_at', w.tx_confirmed_at,
        'completed_at', w.completed_at,
        'cancelled_at', w.cancelled_at,
        'failed_at', w.failed_at,
        'failure_reason', w.failure_reason,
        'note', w.note
      ) order by w.requested_at desc
    ), '[]'::jsonb
  ) into v_rows
  from (
    select * from public.platform_ipt_withdrawals
    order by requested_at desc
    limit v_limit
  ) w
  join public.member_profiles mp on mp.id=w.user_id;

  return pg_catalog.jsonb_build_object(
    'ok', true,
    'admin_user_id', v_admin,
    'withdrawals', v_rows,
    'policy', pg_catalog.jsonb_build_object(
      'network','Ethereum Sepolia',
      'chain_id',11155111,
      'contract','0xd3fb2480aadb8b168ec7e88a0e5c847d9750cb87',
      'decimals',2,
      'min_confirmations',2,
      'server_private_key',false
    )
  );
end;
$$;

revoke all on function public.platform_admin_list_ipt_withdrawals(integer)
  from public, anon, authenticated, service_role;
grant execute on function public.platform_admin_list_ipt_withdrawals(integer)
  to authenticated;

create or replace function public.platform_admin_review_ipt_withdrawal(
  p_withdrawal_id uuid,
  p_decision text,
  p_note text default ''
)
returns jsonb
language plpgsql
security definer
set search_path=''
as $$
declare
  v_admin uuid;
  v_req public.platform_ipt_withdrawals%rowtype;
  v_wallet_id uuid;
  v_available bigint;
  v_locked bigint;
  v_decision text;
  v_note text;
begin
  v_admin := public.platform_assert_admin_withdrawal_access();
  v_decision := lower(trim(coalesce(p_decision,'')));
  v_note := left(coalesce(p_note,''),500);

  if p_withdrawal_id is null then raise exception 'Missing withdrawal id'; end if;
  if v_decision not in ('approve','reject') then
    raise exception 'Decision must be approve or reject';
  end if;

  perform pg_catalog.pg_advisory_xact_lock(pg_catalog.hashtextextended(p_withdrawal_id::text,0));

  select * into v_req
  from public.platform_ipt_withdrawals
  where id=p_withdrawal_id
  for update;
  if not found then raise exception 'Withdrawal request not found'; end if;

  if v_decision='approve' then
    if v_req.status='approved' then
      return pg_catalog.jsonb_build_object('ok',true,'idempotent_replay',true,'withdrawal_id',v_req.id,'status','approved');
    end if;
    if v_req.status<>'pending' then raise exception 'Only pending withdrawal can be approved'; end if;

    update public.platform_ipt_withdrawals
    set status='approved', reviewed_by=v_admin, reviewed_at=pg_catalog.now(), note=v_note
    where id=v_req.id;

    insert into public.platform_ipt_withdrawal_events(
      withdrawal_id,user_id,event_type,actor_type,actor_user_id,metadata
    ) values(
      v_req.id,v_req.user_id,'approved','admin',v_admin,pg_catalog.jsonb_build_object('note',v_note)
    );

    insert into public.admin_audit_log(
      admin_user_id,target_user_id,action,old_value,new_value,note
    ) values(
      v_admin,v_req.user_id,'ipt_withdrawal_approved',
      pg_catalog.jsonb_build_object('status',v_req.status),
      pg_catalog.jsonb_build_object('withdrawal_id',v_req.id,'status','approved','ipt_units',v_req.ipt_units,'wallet_address',v_req.wallet_address),
      v_note
    );

    return pg_catalog.jsonb_build_object('ok',true,'idempotent_replay',false,'withdrawal_id',v_req.id,'status','approved');
  end if;

  if v_req.status='rejected' then
    return pg_catalog.jsonb_build_object('ok',true,'idempotent_replay',true,'withdrawal_id',v_req.id,'status','rejected');
  end if;
  if v_req.status not in ('pending','approved') or v_req.tx_hash is not null then
    raise exception 'Withdrawal can no longer be rejected';
  end if;

  select id,available_units,locked_units
  into v_wallet_id,v_available,v_locked
  from public.platform_wallets
  where user_id=v_req.user_id and asset_code='IPT' and status='active'
  for update;
  if not found then raise exception 'Active platform IPT wallet not found'; end if;
  if v_locked < v_req.ipt_units then raise exception 'Locked IPT is lower than withdrawal amount'; end if;

  update public.platform_wallets
  set available_units=v_available+v_req.ipt_units,
      locked_units=v_locked-v_req.ipt_units,
      version=version+1,
      updated_at=pg_catalog.now()
  where id=v_wallet_id;

  update public.platform_ipt_withdrawals
  set status='rejected', reviewed_by=v_admin, reviewed_at=pg_catalog.now(), failure_reason=v_note, note=v_note
  where id=v_req.id;

  insert into public.platform_ipt_withdrawal_events(
    withdrawal_id,user_id,event_type,actor_type,actor_user_id,metadata
  ) values(
    v_req.id,v_req.user_id,'rejected','admin',v_admin,
    pg_catalog.jsonb_build_object(
      'note',v_note,'ipt_units',v_req.ipt_units,
      'available_before_units',v_available,'available_after_units',v_available+v_req.ipt_units,
      'locked_before_units',v_locked,'locked_after_units',v_locked-v_req.ipt_units
    )
  );

  insert into public.admin_audit_log(
    admin_user_id,target_user_id,action,old_value,new_value,note
  ) values(
    v_admin,v_req.user_id,'ipt_withdrawal_rejected',
    pg_catalog.jsonb_build_object('status',v_req.status,'available_units',v_available,'locked_units',v_locked),
    pg_catalog.jsonb_build_object('withdrawal_id',v_req.id,'status','rejected','available_units',v_available+v_req.ipt_units,'locked_units',v_locked-v_req.ipt_units),
    v_note
  );

  return pg_catalog.jsonb_build_object(
    'ok',true,'idempotent_replay',false,'withdrawal_id',v_req.id,'status','rejected',
    'available_after_units',v_available+v_req.ipt_units,
    'locked_after_units',v_locked-v_req.ipt_units
  );
end;
$$;

revoke all on function public.platform_admin_review_ipt_withdrawal(uuid,text,text)
  from public, anon, authenticated, service_role;
grant execute on function public.platform_admin_review_ipt_withdrawal(uuid,text,text)
  to authenticated;

create or replace function public.platform_admin_submit_ipt_withdrawal_tx(
  p_withdrawal_id uuid,
  p_tx_hash text
)
returns jsonb
language plpgsql
security definer
set search_path=''
as $$
declare
  v_admin uuid;
  v_req public.platform_ipt_withdrawals%rowtype;
  v_hash text;
begin
  v_admin := public.platform_assert_admin_withdrawal_access();
  v_hash := lower(trim(coalesce(p_tx_hash,'')));

  if p_withdrawal_id is null then raise exception 'Missing withdrawal id'; end if;
  if v_hash !~ '^0x[0-9a-f]{64}$' then raise exception 'Invalid transaction hash'; end if;

  perform pg_catalog.pg_advisory_xact_lock(pg_catalog.hashtextextended(p_withdrawal_id::text,0));

  select * into v_req
  from public.platform_ipt_withdrawals
  where id=p_withdrawal_id
  for update;
  if not found then raise exception 'Withdrawal request not found'; end if;

  if v_req.status='tx_submitted' and lower(coalesce(v_req.tx_hash,''))=v_hash then
    return pg_catalog.jsonb_build_object('ok',true,'idempotent_replay',true,'withdrawal_id',v_req.id,'status','tx_submitted','tx_hash',v_hash);
  end if;
  if v_req.status<>'approved' then raise exception 'Only approved withdrawal can register a transaction'; end if;

  update public.platform_ipt_withdrawals
  set status='tx_submitted', tx_hash=v_hash, tx_submitted_at=pg_catalog.now()
  where id=v_req.id;

  insert into public.platform_ipt_withdrawal_events(
    withdrawal_id,user_id,event_type,actor_type,actor_user_id,metadata
  ) values(v_req.id,v_req.user_id,'tx_submitted','admin',v_admin,pg_catalog.jsonb_build_object('tx_hash',v_hash));

  insert into public.admin_audit_log(
    admin_user_id,target_user_id,action,old_value,new_value,note
  ) values(
    v_admin,v_req.user_id,'ipt_withdrawal_tx_submitted',
    pg_catalog.jsonb_build_object('status',v_req.status),
    pg_catalog.jsonb_build_object('withdrawal_id',v_req.id,'status','tx_submitted','tx_hash',v_hash),''
  );

  return pg_catalog.jsonb_build_object('ok',true,'idempotent_replay',false,'withdrawal_id',v_req.id,'status','tx_submitted','tx_hash',v_hash);
end;
$$;

revoke all on function public.platform_admin_submit_ipt_withdrawal_tx(uuid,text)
  from public, anon, authenticated, service_role;
grant execute on function public.platform_admin_submit_ipt_withdrawal_tx(uuid,text)
  to authenticated;

create or replace function public.platform_complete_ipt_withdrawal(
  p_withdrawal_id uuid,
  p_tx_hash text,
  p_block_number bigint,
  p_proof jsonb default '{}'::jsonb
)
returns jsonb
language plpgsql
security definer
set search_path=''
as $$
declare
  v_req public.platform_ipt_withdrawals%rowtype;
  v_wallet_id uuid;
  v_available bigint;
  v_locked bigint;
  v_hash text;
begin
  v_hash := lower(trim(coalesce(p_tx_hash,'')));
  if p_withdrawal_id is null then raise exception 'Missing withdrawal id'; end if;
  if v_hash !~ '^0x[0-9a-f]{64}$' then raise exception 'Invalid transaction hash'; end if;
  if p_block_number is null or p_block_number <= 0 then raise exception 'Invalid block number'; end if;

  perform pg_catalog.pg_advisory_xact_lock(pg_catalog.hashtextextended(p_withdrawal_id::text,0));

  select * into v_req
  from public.platform_ipt_withdrawals
  where id=p_withdrawal_id
  for update;
  if not found then raise exception 'Withdrawal request not found'; end if;

  if v_req.status='completed' and lower(coalesce(v_req.tx_hash,''))=v_hash then
    return pg_catalog.jsonb_build_object('ok',true,'idempotent_replay',true,'withdrawal_id',v_req.id,'status','completed');
  end if;
  if v_req.status<>'tx_submitted' then raise exception 'Withdrawal is not waiting for chain confirmation'; end if;
  if lower(coalesce(v_req.tx_hash,''))<>v_hash then raise exception 'Transaction hash does not match request'; end if;

  select id,available_units,locked_units
  into v_wallet_id,v_available,v_locked
  from public.platform_wallets
  where user_id=v_req.user_id and asset_code='IPT' and status='active'
  for update;
  if not found then raise exception 'Active platform IPT wallet not found'; end if;
  if v_locked < v_req.ipt_units then raise exception 'Locked IPT is lower than withdrawal amount'; end if;

  update public.platform_wallets
  set locked_units=v_locked-v_req.ipt_units,
      version=version+1,
      updated_at=pg_catalog.now()
  where id=v_wallet_id;

  update public.platform_ipt_withdrawals
  set status='completed', tx_block_number=p_block_number,
      tx_confirmed_at=pg_catalog.now(), completed_at=pg_catalog.now(), failure_reason=''
  where id=v_req.id;

  insert into public.wallet_ledger_entries(
    transaction_id,user_id,wallet_id,asset_code,direction,amount_units,
    balance_after_units,entry_type,reference_type,reference_id,idempotency_key,metadata
  ) values(
    v_req.id,v_req.user_id,v_wallet_id,'IPT','debit',v_req.ipt_units,
    v_available,'withdrawal','platform_ipt_withdrawal',v_req.id,
    'withdrawal-complete:'||v_req.id::text,
    pg_catalog.jsonb_build_object(
      'tx_hash',v_hash,'block_number',p_block_number,'wallet_address',v_req.wallet_address,
      'chain_id',v_req.chain_id,'proof',coalesce(p_proof,'{}'::jsonb)
    )
  ) on conflict (transaction_id,wallet_id) do nothing;

  insert into public.platform_ipt_withdrawal_events(
    withdrawal_id,user_id,event_type,actor_type,actor_user_id,metadata
  ) values(
    v_req.id,v_req.user_id,'chain_confirmed','system',null,
    pg_catalog.jsonb_build_object('tx_hash',v_hash,'block_number',p_block_number,'proof',coalesce(p_proof,'{}'::jsonb))
  );

  insert into public.platform_ipt_withdrawal_events(
    withdrawal_id,user_id,event_type,actor_type,actor_user_id,metadata
  ) values(
    v_req.id,v_req.user_id,'completed','system',null,
    pg_catalog.jsonb_build_object(
      'ipt_units',v_req.ipt_units,'available_units',v_available,
      'locked_before_units',v_locked,'locked_after_units',v_locked-v_req.ipt_units
    )
  );

  if v_req.reviewed_by is not null then
    insert into public.admin_audit_log(admin_user_id,target_user_id,action,old_value,new_value,note)
    values(
      v_req.reviewed_by,v_req.user_id,'ipt_withdrawal_completed',
      pg_catalog.jsonb_build_object('status',v_req.status,'locked_units',v_locked),
      pg_catalog.jsonb_build_object('withdrawal_id',v_req.id,'status','completed','tx_hash',v_hash,'block_number',p_block_number,'locked_units',v_locked-v_req.ipt_units),
      'Chain proof verified by server'
    );
  end if;

  return pg_catalog.jsonb_build_object(
    'ok',true,'idempotent_replay',false,'withdrawal_id',v_req.id,'status','completed',
    'available_units',v_available,'locked_units',v_locked-v_req.ipt_units,
    'tx_hash',v_hash,'block_number',p_block_number
  );
end;
$$;

revoke all on function public.platform_complete_ipt_withdrawal(uuid,text,bigint,jsonb)
  from public, anon, authenticated;
grant execute on function public.platform_complete_ipt_withdrawal(uuid,text,bigint,jsonb)
  to service_role;

create or replace function public.platform_fail_ipt_withdrawal(
  p_withdrawal_id uuid,
  p_tx_hash text,
  p_reason text,
  p_proof jsonb default '{}'::jsonb
)
returns jsonb
language plpgsql
security definer
set search_path=''
as $$
declare
  v_req public.platform_ipt_withdrawals%rowtype;
  v_wallet_id uuid;
  v_available bigint;
  v_locked bigint;
  v_hash text;
  v_reason text;
begin
  v_hash := lower(trim(coalesce(p_tx_hash,'')));
  v_reason := left(coalesce(p_reason,'Chain transaction failed'),500);

  perform pg_catalog.pg_advisory_xact_lock(pg_catalog.hashtextextended(p_withdrawal_id::text,0));
  select * into v_req from public.platform_ipt_withdrawals where id=p_withdrawal_id for update;
  if not found then raise exception 'Withdrawal request not found'; end if;
  if v_req.status='failed' then
    return pg_catalog.jsonb_build_object('ok',true,'idempotent_replay',true,'withdrawal_id',v_req.id,'status','failed');
  end if;
  if v_req.status<>'tx_submitted' then raise exception 'Withdrawal is not in tx_submitted state'; end if;
  if lower(coalesce(v_req.tx_hash,''))<>v_hash then raise exception 'Transaction hash does not match request'; end if;

  select id,available_units,locked_units
  into v_wallet_id,v_available,v_locked
  from public.platform_wallets
  where user_id=v_req.user_id and asset_code='IPT' and status='active'
  for update;
  if not found then raise exception 'Active platform IPT wallet not found'; end if;
  if v_locked < v_req.ipt_units then raise exception 'Locked IPT is lower than withdrawal amount'; end if;

  update public.platform_wallets
  set available_units=v_available+v_req.ipt_units,
      locked_units=v_locked-v_req.ipt_units,
      version=version+1,
      updated_at=pg_catalog.now()
  where id=v_wallet_id;

  update public.platform_ipt_withdrawals
  set status='failed', failed_at=pg_catalog.now(), failure_reason=v_reason
  where id=v_req.id;

  insert into public.platform_ipt_withdrawal_events(
    withdrawal_id,user_id,event_type,actor_type,actor_user_id,metadata
  ) values(
    v_req.id,v_req.user_id,'failed','system',null,
    pg_catalog.jsonb_build_object(
      'tx_hash',v_hash,'reason',v_reason,'proof',coalesce(p_proof,'{}'::jsonb),
      'available_before_units',v_available,'available_after_units',v_available+v_req.ipt_units,
      'locked_before_units',v_locked,'locked_after_units',v_locked-v_req.ipt_units
    )
  );

  return pg_catalog.jsonb_build_object(
    'ok',true,'idempotent_replay',false,'withdrawal_id',v_req.id,'status','failed',
    'available_units',v_available+v_req.ipt_units,'locked_units',v_locked-v_req.ipt_units
  );
end;
$$;

revoke all on function public.platform_fail_ipt_withdrawal(uuid,text,text,jsonb)
  from public, anon, authenticated;
grant execute on function public.platform_fail_ipt_withdrawal(uuid,text,text,jsonb)
  to service_role;

commit;
