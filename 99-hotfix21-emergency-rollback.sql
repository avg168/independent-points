-- Emergency rollback for Hotfix 21.
begin;

drop trigger if exists protect_member_profile_system_fields on public.member_profiles;
drop function if exists public.protect_member_profile_system_fields();

grant all privileges on table public.member_contacts to anon, authenticated;
grant all privileges on table public.member_profiles to anon, authenticated;
grant all privileges on table public.member_wallets to anon, authenticated;
grant all privileges on table public.verified_wallets to anon;

grant all privileges on table public.member_roles to anon;
grant select, references, trigger, truncate on table public.member_roles to authenticated;

grant select, references, trigger, truncate on table public.verified_wallets to authenticated;

grant all privileges on sequence public.member_number_seq to anon, authenticated;

revoke all privileges on table public.member_security_settings from anon, authenticated;
revoke all privileges on table public.member_trusted_devices from anon, authenticated;
revoke all privileges on table public.member_trusted_sessions from anon, authenticated;
revoke all privileges on table public.admin_audit_log from anon, authenticated;
revoke all privileges on table public.wallet_verification_challenges from anon, authenticated;

commit;
