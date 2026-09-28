-- Independent Points V4.12.4
-- Database Least-Privilege Hardening Hotfix 21
-- Safe with Trusted Device Hotfix 19.
-- No member data is deleted.

begin;

revoke all privileges on table public.admin_audit_log from anon, authenticated;
revoke all privileges on table public.wallet_verification_challenges from anon, authenticated;

revoke all privileges on table public.member_profiles from anon;
revoke all privileges on table public.member_roles from anon;
revoke all privileges on table public.member_wallets from anon;
revoke all privileges on table public.member_contacts from anon;
revoke all privileges on table public.verified_wallets from anon;

revoke insert, delete, truncate, references, trigger on table public.member_profiles from authenticated;
revoke update on table public.member_profiles from authenticated;
grant select on table public.member_profiles to authenticated;
grant update (display_name, avatar_url) on table public.member_profiles to authenticated;

revoke insert, update, delete, truncate, references, trigger on table public.member_roles from authenticated;
grant select on table public.member_roles to authenticated;

revoke truncate, references, trigger on table public.member_wallets from authenticated;
grant select, insert, update, delete on table public.member_wallets to authenticated;

revoke truncate, references, trigger on table public.member_contacts from authenticated;
grant select, insert, update, delete on table public.member_contacts to authenticated;

revoke insert, update, delete, truncate, references, trigger on table public.verified_wallets from authenticated;
grant select on table public.verified_wallets to authenticated;

revoke all privileges on table public.member_security_settings from anon, authenticated;
revoke all privileges on table public.member_trusted_devices from anon, authenticated;
revoke all privileges on table public.member_trusted_sessions from anon, authenticated;

revoke all privileges on sequence public.member_number_seq from anon, authenticated;

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

    if new.id is distinct from old.id then
      raise exception 'member id is immutable';
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

revoke execute on function public.set_updated_at() from public, anon, authenticated;
revoke execute on function public.protect_member_wallet_verification() from public, anon, authenticated;
revoke execute on function public.handle_new_auth_user() from public, anon, authenticated;

commit;
