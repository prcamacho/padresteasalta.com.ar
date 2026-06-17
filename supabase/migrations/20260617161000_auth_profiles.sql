create or replace function public.handle_new_auth_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, display_name, role)
  values (
    new.id,
    coalesce(new.raw_user_meta_data ->> 'display_name', new.raw_user_meta_data ->> 'full_name', split_part(new.email, '@', 1)),
    'member'
  )
  on conflict (id) do nothing;

  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;

create trigger on_auth_user_created
after insert on auth.users
for each row execute function public.handle_new_auth_user();

insert into public.profiles (id, display_name, role)
select
  users.id,
  coalesce(users.raw_user_meta_data ->> 'display_name', users.raw_user_meta_data ->> 'full_name', split_part(users.email, '@', 1)),
  'member'
from auth.users
where not exists (
  select 1
  from public.profiles
  where profiles.id = users.id
);
