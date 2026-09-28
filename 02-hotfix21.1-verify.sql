-- Hotfix 21.1 verification
select table_name, grantee,
       string_agg(privilege_type, ', ' order by privilege_type) as privileges
from information_schema.role_table_grants
where table_schema='public' and grantee in ('anon','authenticated')
group by table_name,grantee
order by table_name,grantee;

select
  has_sequence_privilege('anon','public.member_number_seq','USAGE') as anon_usage,
  has_sequence_privilege('authenticated','public.member_number_seq','USAGE') as auth_usage,
  has_sequence_privilege('authenticated','public.member_number_seq','UPDATE') as auth_update;

select trigger_name, action_timing, event_manipulation
from information_schema.triggers
where trigger_schema='public' and event_object_table='member_profiles'
order by trigger_name;
