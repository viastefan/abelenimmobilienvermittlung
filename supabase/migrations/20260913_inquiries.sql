-- Anfragen aus dem Kontaktformular.
--
-- Sicherheitsmodell: anonym darf ausschließlich eingefügt werden (die
-- Website läuft mit dem öffentlichen Schlüssel), lesen und bearbeiten darf
-- nur die angemeldete Redaktion. Damit kann über den öffentlichen Schlüssel
-- niemand fremde Anfragen abrufen.

create table if not exists public.inquiries (
  id uuid primary key default gen_random_uuid(),
  first_name text not null,
  last_name text not null,
  email text not null,
  phone text not null default '',
  interest text not null default 'sonstiges',
  object_ref text not null default '',
  message text not null,
  status text not null default 'neu',
  note text not null default '',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint inquiries_status_check check (status in ('neu', 'in-bearbeitung', 'erledigt')),
  constraint inquiries_length_check check (
    char_length(first_name) between 1 and 120
    and char_length(last_name) between 1 and 120
    and char_length(email) between 5 and 200
    and char_length(phone) <= 60
    and char_length(interest) <= 40
    and char_length(object_ref) <= 200
    and char_length(message) between 1 and 4000
    and char_length(note) <= 4000
  )
);

create index if not exists inquiries_created_idx on public.inquiries (created_at desc);
create index if not exists inquiries_status_idx on public.inquiries (status, created_at desc);

alter table public.inquiries enable row level security;

-- Nur einfügen, und nur als frische, unkommentierte Anfrage.
drop policy if exists "Anfragen anlegen" on public.inquiries;
create policy "Anfragen anlegen"
  on public.inquiries
  for insert
  to anon, authenticated
  with check (status = 'neu' and note = '');

drop policy if exists "Anfragen lesen und bearbeiten" on public.inquiries;
create policy "Anfragen lesen und bearbeiten"
  on public.inquiries
  for select
  to authenticated
  using (true);

drop policy if exists "Anfragen aktualisieren" on public.inquiries;
create policy "Anfragen aktualisieren"
  on public.inquiries
  for update
  to authenticated
  using (true)
  with check (true);

drop policy if exists "Anfragen löschen" on public.inquiries;
create policy "Anfragen löschen"
  on public.inquiries
  for delete
  to authenticated
  using (true);

drop trigger if exists inquiries_set_updated_at on public.inquiries;
create trigger inquiries_set_updated_at
  before update on public.inquiries
  for each row execute function public.set_updated_at();
