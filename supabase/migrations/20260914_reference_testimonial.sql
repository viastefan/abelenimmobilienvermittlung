-- Kundenmeinung zu einem vermittelten Objekt, wie auf dem bisherigen
-- Auftritt: Zitat, Bewertung, Einstufung, Weiterempfehlung.
alter table public.reference_objects
  add column if not exists testimonial jsonb;

comment on column public.reference_objects.testimonial is
  'Kundenmeinung: {"quote": text, "rating": number, "label": text, "recommend": boolean}. Null, wenn keine vorliegt.';
