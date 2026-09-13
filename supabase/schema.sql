-- Quattro platform schema: roles, facility access control, routing preferences.
-- Run this once in the Supabase SQL Editor (your project -> SQL Editor -> New
-- query -> paste this whole file -> Run). Safe to re-run: every statement is
-- idempotent (IF NOT EXISTS / ON CONFLICT DO NOTHING / DROP POLICY IF EXISTS).

-- ---------------------------------------------------------------------------
-- Facilities: real records for the Client dashboard (not simulated).
-- ---------------------------------------------------------------------------
create table if not exists public.facilities (
  id text primary key,
  name text not null,
  state text not null,
  type text not null,
  beds integer not null,
  risk_tier text not null check (risk_tier in ('Low', 'Moderate', 'Elevated'))
);

insert into public.facilities (id, name, state, type, beds, risk_tier) values
  ('fac-1', 'Willow Creek Skilled Nursing', 'TX', 'Skilled Nursing', 120, 'Moderate'),
  ('fac-2', 'Magnolia Springs Assisted Living', 'GA', 'Assisted Living', 85, 'Low'),
  ('fac-3', 'Cedar Ridge Memory Care', 'FL', 'Memory Care', 60, 'Elevated'),
  ('fac-4', 'Heritage Oaks', 'NC', 'CCRC', 200, 'Moderate')
on conflict (id) do nothing;

-- ---------------------------------------------------------------------------
-- Profiles: one row per authenticated user, holding their role. The id is
-- the same id Supabase Auth assigned them in auth.users.
-- ---------------------------------------------------------------------------
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null,
  role text not null check (role in ('client', 'capacity_provider')),
  created_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- Which facilities a client user is allowed to see. A simple join table, as
-- specified: one row per (user, facility) pair they're granted access to.
-- ---------------------------------------------------------------------------
create table if not exists public.user_facilities (
  user_id uuid not null references public.profiles(id) on delete cascade,
  facility_id text not null references public.facilities(id) on delete cascade,
  primary key (user_id, facility_id)
);

-- ---------------------------------------------------------------------------
-- Alert routing contact per facility + alert type. "Save routing
-- preferences" on the Client dashboard persists here.
-- ---------------------------------------------------------------------------
create table if not exists public.routing_preferences (
  facility_id text not null references public.facilities(id) on delete cascade,
  alert_type text not null,
  contact_name text not null default '',
  contact_phone text not null default '',
  updated_at timestamptz not null default now(),
  primary key (facility_id, alert_type)
);

-- ---------------------------------------------------------------------------
-- Row Level Security: this is the actual server-side access control, not
-- just hiding UI. The anon/publishable key the browser uses is subject to
-- every policy below; only the secret key (used server-side only, e.g. to
-- create users) bypasses RLS.
-- ---------------------------------------------------------------------------
alter table public.facilities enable row level security;
alter table public.profiles enable row level security;
alter table public.user_facilities enable row level security;
alter table public.routing_preferences enable row level security;

drop policy if exists "profiles_select_own" on public.profiles;
create policy "profiles_select_own" on public.profiles
  for select using (auth.uid() = id);

drop policy if exists "facilities_select_own" on public.facilities;
create policy "facilities_select_own" on public.facilities
  for select using (
    exists (
      select 1 from public.user_facilities uf
      where uf.facility_id = facilities.id and uf.user_id = auth.uid()
    )
  );

drop policy if exists "user_facilities_select_own" on public.user_facilities;
create policy "user_facilities_select_own" on public.user_facilities
  for select using (auth.uid() = user_id);

drop policy if exists "routing_select_own_facility" on public.routing_preferences;
create policy "routing_select_own_facility" on public.routing_preferences
  for select using (
    exists (
      select 1 from public.user_facilities uf
      where uf.facility_id = routing_preferences.facility_id and uf.user_id = auth.uid()
    )
  );

drop policy if exists "routing_insert_own_facility" on public.routing_preferences;
create policy "routing_insert_own_facility" on public.routing_preferences
  for insert with check (
    exists (
      select 1 from public.user_facilities uf
      where uf.facility_id = routing_preferences.facility_id and uf.user_id = auth.uid()
    )
  );

drop policy if exists "routing_update_own_facility" on public.routing_preferences;
create policy "routing_update_own_facility" on public.routing_preferences
  for update using (
    exists (
      select 1 from public.user_facilities uf
      where uf.facility_id = routing_preferences.facility_id and uf.user_id = auth.uid()
    )
  );

-- ---------------------------------------------------------------------------
-- Default routing preferences, per facility and alert type, seeded from the
-- prototype's own defaults so the panel has real starting data to edit.
-- ---------------------------------------------------------------------------
insert into public.routing_preferences (facility_id, alert_type, contact_name, contact_phone)
select f.id, a.alert_type, a.contact_name, a.contact_phone
from public.facilities f
cross join (values
  ('Elopement attempt', 'Director of Nursing', '(555) 010-2201'),
  ('Fall-risk pattern flagged', 'Director of Nursing', '(555) 010-2201'),
  ('Medication or care documentation error', 'Consultant Pharmacist', '(555) 010-2244'),
  ('Medication protocol flag', 'Medical Director', '(555) 010-2277'),
  ('Unaddressed regulatory violation', 'Administrator', '(555) 010-2200'),
  ('Slow staff response time', 'Administrator', '(555) 010-2200'),
  ('Staffing coverage gap', 'Administrator', '(555) 010-2200'),
  ('Coverage gap flagged', 'Facilities Director', '(555) 010-2288')
) as a(alert_type, contact_name, contact_phone)
on conflict (facility_id, alert_type) do nothing;
