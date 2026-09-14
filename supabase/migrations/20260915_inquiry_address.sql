-- Adresse der Immobilie.
--
-- Das Formular des bisherigen Auftritts fragte sie ab (Feld `address` in der
-- Sammlung „ContactFormQueries"). Ohne sie ist eine Bewertungsanfrage nur
-- halb brauchbar: die Lage entscheidet über den Wert.

alter table public.inquiries
  add column if not exists address text not null default '';

alter table public.inquiries
  drop constraint if exists inquiries_length_check;

alter table public.inquiries
  add constraint inquiries_length_check check (
    char_length(first_name) between 1 and 120
    and char_length(last_name) between 1 and 120
    and char_length(email) between 5 and 200
    and char_length(phone) <= 60
    and char_length(interest) <= 40
    and char_length(object_ref) <= 200
    and char_length(address) <= 200
    and char_length(message) between 1 and 4000
    and char_length(note) <= 4000
  );
