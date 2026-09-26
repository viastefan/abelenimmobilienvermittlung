-- Zimmerzahl der Referenzen mit Nachkommastelle.
--
-- „2,5 Zimmer“ ist bei Wohnungen üblich. `properties.rooms` ist längst
-- numeric, `reference_objects.rooms` war integer — die App hätte eine
-- solche Referenz nicht speichern können. Die Erweiterung ist verlustfrei:
-- jede ganze Zahl bleibt, was sie war.

alter table public.reference_objects
  alter column rooms type numeric using rooms::numeric;
