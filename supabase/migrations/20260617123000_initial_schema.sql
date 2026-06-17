create extension if not exists pgcrypto;

create type public.app_role as enum ('member', 'editor', 'admin');
create type public.publish_status as enum ('draft', 'published', 'archived');
create type public.inquiry_type as enum ('orientation', 'activity_proposal', 'directory_submission', 'sponsorship', 'other');
create type public.inquiry_status as enum ('new', 'in_review', 'responded', 'closed');
create type public.inquiry_priority as enum ('normal', 'high', 'urgent');
create type public.directory_category as enum ('therapy_center', 'professional', 'family_business', 'company', 'resource');
create type public.verification_status as enum ('pending', 'verified', 'outdated', 'rejected');
create type public.media_visibility as enum ('public', 'private');
create type public.sponsor_campaign_status as enum ('draft', 'scheduled', 'active', 'expired', 'cancelled');

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text,
  phone text,
  role public.app_role not null default 'member',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.media_assets (
  id uuid primary key default gen_random_uuid(),
  bucket text not null,
  object_key text not null,
  public_url text,
  alt_text text,
  mime_type text not null,
  size_bytes bigint not null check (size_bytes >= 0),
  visibility public.media_visibility not null default 'public',
  owner_type text,
  owner_id uuid,
  created_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (bucket, object_key)
);

create table public.activities (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  summary text not null,
  description text,
  organizer_name text,
  starts_at timestamptz,
  ends_at timestamptz,
  location_name text,
  address text,
  modality text not null default 'to_confirm',
  status public.publish_status not null default 'draft',
  is_featured boolean not null default false,
  registration_url text,
  cover_media_id uuid references public.media_assets(id) on delete set null,
  created_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check (ends_at is null or starts_at is null or ends_at >= starts_at)
);

create table public.directory_entries (
  id uuid primary key default gen_random_uuid(),
  category public.directory_category not null,
  name text not null,
  slug text not null unique,
  summary text,
  description text,
  locality text,
  neighborhood text,
  address text,
  phone text,
  email text,
  website_url text,
  instagram_url text,
  specialties text[] not null default '{}',
  publication_status public.publish_status not null default 'draft',
  verification_status public.verification_status not null default 'pending',
  last_verified_at timestamptz,
  verification_notes text,
  logo_media_id uuid references public.media_assets(id) on delete set null,
  created_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.contact_inquiries (
  id uuid primary key default gen_random_uuid(),
  type public.inquiry_type not null default 'other',
  status public.inquiry_status not null default 'new',
  priority public.inquiry_priority not null default 'normal',
  full_name text not null,
  email text,
  phone text,
  locality text,
  subject text,
  message text not null,
  consent boolean not null default false,
  source_path text,
  assigned_to uuid references public.profiles(id) on delete set null,
  internal_notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check (email is not null or phone is not null)
);

create table public.sponsor_slots (
  id text primary key,
  placement text not null,
  label text not null,
  title text not null,
  description text not null,
  is_active boolean not null default true,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.sponsor_campaigns (
  id uuid primary key default gen_random_uuid(),
  slot_id text not null references public.sponsor_slots(id) on delete restrict,
  sponsor_name text not null,
  sponsor_url text,
  title text not null,
  description text,
  cta_label text,
  cta_url text,
  media_asset_id uuid references public.media_assets(id) on delete set null,
  status public.sponsor_campaign_status not null default 'draft',
  starts_on date,
  ends_on date,
  created_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check (ends_on is null or starts_on is null or ends_on >= starts_on)
);

create table public.audit_events (
  id uuid primary key default gen_random_uuid(),
  actor_id uuid references public.profiles(id) on delete set null,
  action text not null,
  entity_type text not null,
  entity_id text,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index activities_status_starts_at_idx on public.activities (status, starts_at);
create index directory_entries_category_status_idx on public.directory_entries (category, publication_status, verification_status);
create index contact_inquiries_status_created_at_idx on public.contact_inquiries (status, created_at desc);
create index sponsor_campaigns_slot_status_idx on public.sponsor_campaigns (slot_id, status, starts_on, ends_on);
create index media_assets_owner_idx on public.media_assets (owner_type, owner_id);
create index audit_events_entity_idx on public.audit_events (entity_type, entity_id);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger profiles_set_updated_at
before update on public.profiles
for each row execute function public.set_updated_at();

create trigger media_assets_set_updated_at
before update on public.media_assets
for each row execute function public.set_updated_at();

create trigger activities_set_updated_at
before update on public.activities
for each row execute function public.set_updated_at();

create trigger directory_entries_set_updated_at
before update on public.directory_entries
for each row execute function public.set_updated_at();

create trigger contact_inquiries_set_updated_at
before update on public.contact_inquiries
for each row execute function public.set_updated_at();

create trigger sponsor_slots_set_updated_at
before update on public.sponsor_slots
for each row execute function public.set_updated_at();

create trigger sponsor_campaigns_set_updated_at
before update on public.sponsor_campaigns
for each row execute function public.set_updated_at();

create or replace function public.is_admin()
returns boolean
language sql
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.profiles
    where id = auth.uid()
      and role = 'admin'
  );
$$;

alter table public.profiles enable row level security;
alter table public.media_assets enable row level security;
alter table public.activities enable row level security;
alter table public.directory_entries enable row level security;
alter table public.contact_inquiries enable row level security;
alter table public.sponsor_slots enable row level security;
alter table public.sponsor_campaigns enable row level security;
alter table public.audit_events enable row level security;

create policy "profiles can read own profile"
on public.profiles for select
to authenticated
using (id = auth.uid() or public.is_admin());

create policy "members can create own profile"
on public.profiles for insert
to authenticated
with check (id = auth.uid() and role = 'member');

create policy "admins manage profiles"
on public.profiles for all
to authenticated
using (public.is_admin())
with check (public.is_admin());

create policy "public reads published activities"
on public.activities for select
to anon, authenticated
using (status = 'published');

create policy "admins manage activities"
on public.activities for all
to authenticated
using (public.is_admin())
with check (public.is_admin());

create policy "public reads published directory entries"
on public.directory_entries for select
to anon, authenticated
using (publication_status = 'published');

create policy "admins manage directory entries"
on public.directory_entries for all
to authenticated
using (public.is_admin())
with check (public.is_admin());

create policy "public can create consented inquiries"
on public.contact_inquiries for insert
to anon, authenticated
with check (consent = true);

create policy "admins manage inquiries"
on public.contact_inquiries for all
to authenticated
using (public.is_admin())
with check (public.is_admin());

create policy "public reads public media"
on public.media_assets for select
to anon, authenticated
using (visibility = 'public');

create policy "admins manage media"
on public.media_assets for all
to authenticated
using (public.is_admin())
with check (public.is_admin());

create policy "public reads active sponsor slots"
on public.sponsor_slots for select
to anon, authenticated
using (is_active = true);

create policy "admins manage sponsor slots"
on public.sponsor_slots for all
to authenticated
using (public.is_admin())
with check (public.is_admin());

create policy "public reads active sponsor campaigns"
on public.sponsor_campaigns for select
to anon, authenticated
using (
  status = 'active'
  and (starts_on is null or starts_on <= current_date)
  and (ends_on is null or ends_on >= current_date)
);

create policy "admins manage sponsor campaigns"
on public.sponsor_campaigns for all
to authenticated
using (public.is_admin())
with check (public.is_admin());

create policy "admins read audit events"
on public.audit_events for select
to authenticated
using (public.is_admin());

create policy "admins create audit events"
on public.audit_events for insert
to authenticated
with check (public.is_admin());

insert into public.sponsor_slots (id, placement, label, title, description, sort_order)
values
  ('home-main-ally', 'home', 'Espacio para aliados', 'Tu apoyo puede ayudar a sostener esta web', 'Reservado para empresas, profesionales o instituciones que quieran acompanar el crecimiento de la comunidad.', 10),
  ('activities-event-ally', 'activities', 'Actividad acompanada por', 'Un aliado puede acompanar encuentros y charlas', 'Pensado para sponsors de actividades, talleres o convocatorias, siempre identificado con claridad.', 20),
  ('directory-featured-slot', 'directory', 'Destacado patrocinado', 'Espacio destacado para centros, empresas o recursos utiles', 'Los destacados ayudan a sostener la plataforma y se muestran separados de la informacion verificada del directorio.', 30),
  ('support-general-slot', 'support', 'Patrocinio disponible', 'Acompanar la plataforma tambien es colaborar', 'Espacios de apoyo para instituciones, comercios o profesionales que quieran sumar valor real.', 40),
  ('footer-ally-slot', 'footer', 'Aliados', 'Espacio institucional disponible', 'Lugar discreto para reconocer acompanamientos generales de la plataforma.', 50)
on conflict (id) do nothing;
