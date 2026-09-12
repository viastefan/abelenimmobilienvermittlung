-- Referenzobjekte: vermittelte Häuser und Wohnungen, die auf /referenzen
-- gezeigt werden. Struktur und Sicherheitsmodell spiegeln `properties`:
-- anonym nur veröffentlichte Datensätze lesbar, angemeldete Redaktion
-- (Supabase Auth) darf alles.

create table if not exists public.reference_objects (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  region text not null,
  category text not null default 'verkauf',
  type_label text not null default '',
  living_space numeric not null default 0,
  rooms integer not null default 0,
  year integer,
  plot numeric,
  parking integer,
  images text[] not null default '{}',
  summary text not null default '',
  description text[] not null default '{}',
  equipment text[] not null default '{}',
  location text not null default '',
  published boolean not null default true,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint reference_objects_category_check check (category in ('verkauf', 'vermietet'))
);

create index if not exists reference_objects_published_idx
  on public.reference_objects (published, sort_order, created_at desc);

alter table public.reference_objects enable row level security;

drop policy if exists "Referenzen öffentlich lesbar" on public.reference_objects;
create policy "Referenzen öffentlich lesbar"
  on public.reference_objects
  for select
  to anon
  using (published = true);

drop policy if exists "Referenzen Vollzugriff für Redaktion" on public.reference_objects;
create policy "Referenzen Vollzugriff für Redaktion"
  on public.reference_objects
  for all
  to authenticated
  using (true)
  with check (true);

-- updated_at automatisch pflegen
create or replace function public.set_updated_at()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists reference_objects_set_updated_at on public.reference_objects;
create trigger reference_objects_set_updated_at
  before update on public.reference_objects
  for each row execute function public.set_updated_at();
