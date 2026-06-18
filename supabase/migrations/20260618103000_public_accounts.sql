do $$
begin
  if not exists (
    select 1
    from pg_type
    where typname = 'account_type'
      and typnamespace = 'public'::regnamespace
  ) then
    create type public.account_type as enum ('user', 'organization');
  end if;
end $$;

alter table public.profiles
  add column if not exists account_type public.account_type not null default 'user',
  add column if not exists locality text,
  add column if not exists whatsapp_group_opt_in boolean not null default false,
  add column if not exists privacy_terms_accepted_at timestamptz,
  add column if not exists adult_confirmed_at timestamptz,
  add column if not exists organization_review_notes text;

create policy "profiles can update own public data"
on public.profiles for update
to authenticated
using (id = auth.uid())
with check (id = auth.uid() and role = 'member');

create or replace function public.handle_new_auth_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (
    id,
    display_name,
    phone,
    role,
    account_type,
    locality,
    whatsapp_group_opt_in,
    privacy_terms_accepted_at,
    adult_confirmed_at
  )
  values (
    new.id,
    coalesce(new.raw_user_meta_data ->> 'display_name', new.raw_user_meta_data ->> 'full_name', split_part(new.email, '@', 1)),
    nullif(new.raw_user_meta_data ->> 'phone', ''),
    'member',
    coalesce(nullif(new.raw_user_meta_data ->> 'account_type', '')::public.account_type, 'user'),
    nullif(new.raw_user_meta_data ->> 'locality', ''),
    coalesce((new.raw_user_meta_data ->> 'whatsapp_group_opt_in')::boolean, false),
    case
      when coalesce((new.raw_user_meta_data ->> 'privacy_terms_accepted')::boolean, false) then now()
      else null
    end,
    case
      when coalesce((new.raw_user_meta_data ->> 'adult_confirmed')::boolean, false) then now()
      else null
    end
  )
  on conflict (id) do update
  set
    display_name = excluded.display_name,
    phone = excluded.phone,
    account_type = excluded.account_type,
    locality = excluded.locality,
    whatsapp_group_opt_in = excluded.whatsapp_group_opt_in,
    privacy_terms_accepted_at = coalesce(public.profiles.privacy_terms_accepted_at, excluded.privacy_terms_accepted_at),
    adult_confirmed_at = coalesce(public.profiles.adult_confirmed_at, excluded.adult_confirmed_at),
    updated_at = now();

  return new;
end;
$$;
