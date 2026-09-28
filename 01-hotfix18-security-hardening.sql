-- Independent Points V4.12.4
-- Database Security Hardening Hotfix 18
-- Purpose: least privilege + protect system-owned member identity fields.
-- This migration does NOT delete member data.

begin;

-- 1) Tables that should never be used directly by browser roles.
revoke all privileges on table public.admin_audit_log from anon, authenticated;
revoke all privileges on table public.wallet_verification_challenges from anon, authenticated;

-- 2) Anonymous users do not need direct access to member tables.
revoke all privileges on table public.member_profiles from anon;
revoke all privileges on table public.member_roles from anon;
revoke all privileges on table public.member_wallets from anon;
revoke all privileges on table public.member_contacts from anon;
revoke all privileges on table public.verified_wallets from anon;

-- 3) member_profiles:
-- Browser members may read their own row through RLS.
-- They may only edit ordinary presentation fields, never member_number or status.
revoke insert, delete, truncate, references, trigger on table public.member_profiles from authenticated;
revoke update on table public.member_profiles from authenticated;
grant select on table public.member_profiles to authenticated;
grant update (display_name, avatar_url) on table public.member_profiles to authenticated;

-- 4) member_roles:
-- Browser members may only read their own role through RLS.
revoke insert, update, delete, truncate, references, trigger on table public.member_roles from authenticated;
grant select on table public.member_roles to authenticated;

-- 5) member_wallets:
-- Preserve the existing own-row CRUD design, but remove unnecessary powerful table privileges.
revoke truncate, references, trigger on table public.member_wallets from authenticated;
grant select, insert, update, delete on table public.member_wallets to authenticated;

-- 6) member_contacts:
-- Preserve the existing own-row CRUD design, but remove unnecessary powerful table privileges.
revoke truncate, references, trigger on table public.member_contacts from authenticated;
grant select, insert, update, delete on table public.member_contacts to authenticated;

-- 7) verified_wallets:
-- Verification records are written only by the trusted Edge Function/service role.
-- Browser users may only read their own verified-wallet rows through RLS.
revoke insert, update, delete, truncate, references, trigger on table public.verified_wallets from authenticated;
grant select on table public.verified_wallets to authenticated;

-- 8) Member-number sequence is system-owned.
-- New-member creation is handled by SECURITY DEFINER handle_new_auth_user().
revoke all privileges on sequence public.member_number_seq from anon, authenticated;

-- 9) Defense in depth:
-- Even if UPDATE privileges are later broadened accidentally, block browser roles
-- from changing system-owned member identity/status fields.
create or replace function public.protect_member_profile_system_fields()
returns trigger
language plpgsql
set search_path = 'public'
as $$
declare
  jwt_role text := coalesce(current_setting('request.jwt.claim.role', true), '');
begin
  if jwt_role <> 'service_role' then
    if new.member_number is distinct from old.member_number then
      raise exception 'member_number is system-managed';
    end if;

    if new.status is distinct from old.status then
      raise exception 'member status is administrator-managed';
    end if;
  end if;

  return new;
end;
$$;

revoke all on function public.protect_member_profile_system_fields() from public, anon, authenticated;

drop trigger if exists protect_member_profile_system_fields on public.member_profiles;
create trigger protect_member_profile_system_fields
before update on public.member_profiles
for each row
execute function public.protect_member_profile_system_fields();

commit;
