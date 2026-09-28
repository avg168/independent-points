-- Hotfix 21 verification (read-only)

select table_name, grantee,
       string_agg(privilege_type, ', ' order by privilege_type) as privileges
from information_schema.role_table_grants
where table_schema='public'
  and grantee in ('anon','authenticated')
group by table_name,grantee
order by table_name,grantee;

select
  has_sequence_privilege('anon','public.member_number_seq','USAGE') as anon_seq_usage,
  has_sequence_privilege('authenticated','public.member_number_seq','USAGE') as authenticated_seq_usage,
  has_sequence_privilege('authenticated','public.member_number_seq','UPDATE') as authenticated_seq_update;

select trigger_name, event_manipulation, action_timing, action_statement
from information_schema.triggers
where trigger_schema='public'
  and event_object_table='member_profiles'
order by trigger_name,event_manipulation;

select p.proname,
       p.prosecdef as security_definer,
       has_function_privilege('anon',p.oid,'EXECUTE') as anon_execute,
       has_function_privilege('authenticated',p.oid,'EXECUTE') as authenticated_execute,
       has_function_privilege('public',p.oid,'EXECUTE') as public_execute
from pg_proc p
join pg_namespace n on n.oid=p.pronamespace
where n.nspname='public'
order by p.proname;
