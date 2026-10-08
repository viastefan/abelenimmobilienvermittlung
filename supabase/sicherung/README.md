# Sicherung der Inhalte

`inhalte.json` ist eine Kopie der Geschäftsinhalte aus der Datenbank
(Objekte und Referenzen), damit sie erhalten bleiben, während das Projekt
ruht. Das Schema selbst liegt in `../migrations/`.

**Nicht enthalten:** die Anfragen (Tabelle `inquiries`). Sie enthalten
personenbezogene Daten von Interessenten und gehören nicht ins Repository.

## Warum es das gibt

Von Sommer 2026 an ruht das Projekt (die Auftraggeberin wünscht die Website
vorerst nicht). Der Code bleibt vollständig auf GitHub. Supabase legt
kostenlose Projekte nach einer Woche ohne Zugriff schlafen; über viele Monate
kann ein pausiertes Projekt verloren gehen. Diese Datei stellt sicher, dass
die Inhalte allein aus dem Repository wiederhergestellt werden können —
unabhängig davon, was mit dem Supabase-Projekt passiert.

## Wiederherstellen

1. Supabase-Projekt wieder starten (oder ein neues anlegen) und die
   Migrationen aus `../migrations/` anwenden.
2. In der App unter `/admin` anmelden und die Objekte und Referenzen aus
   `inhalte.json` neu anlegen — oder die Einträge per SQL in die Tabellen
   `properties` und `reference_objects` einfügen (die Feldnamen in der JSON
   entsprechen den Spalten; `features`, `energy`, `description`, `equipment`,
   `images` und `testimonial` sind JSON- bzw. Array-Spalten).

Die Bild-Adressen zeigen auf den bisherigen Wix-Server; die Kopien der Bilder
liegen zusätzlich im Repository unter `public/images/wix/`.
