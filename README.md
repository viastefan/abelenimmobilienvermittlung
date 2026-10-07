# Büro für Immobilien Bewertung & Vermittlung — Silke Abelen

Website für das Immobilienbüro Silke Abelen in Leverkusen.
Next.js 15 (App Router), TypeScript, Tailwind CSS, Supabase für die
Objektverwaltung, Resend für das Kontaktformular.

## Schnellstart

```bash
npm install
cp .env.example .env.local   # Werte eintragen
npm run dev                  # http://localhost:3000
```

## Fotos einbinden (wichtig)

Alle Bildplätze der Website sind an einer Stelle gebündelt:
**`src/data/imagery.ts`**.

Es gibt zwei Wege, ein Foto zu hinterlegen:

1. **Datei ablegen** — Bild unter dem dort genannten Namen in `public/images/`
   speichern, z. B. `public/images/hero-wohnstrasse.jpg`. Fertig.
2. **URL eintragen** — statt des Dateinamens eine vollständige `https://`-URL
   eintragen (z. B. ein Bild aus dem bisherigen Auftritt oder ein lizenziertes
   Foto).

Solange weder Datei noch URL vorhanden ist, zeigt die Website eine ruhige
Platzhalterfläche im Markenlook — nie ein kaputtes Bild.

| Bildplatz            | Datei                             | Format                     |
| -------------------- | --------------------------------- | -------------------------- |
| Startseite Hero      | `public/images/hero-wohnstrasse.jpg` | Querformat, ≥ 1600 × 1200  |
| Portrait Silke Abelen| `public/images/silke-abelen.jpg`  | Hochformat, ≥ 1200 × 1500  |
| Seite Bewertung      | `public/images/bewertung.jpg`     | Querformat, ≥ 1400 × 1050  |
| Seite Verkaufen      | `public/images/verkaufen.jpg`     | Querformat, ≥ 1400 × 1050  |
| Seite Vermieten      | `public/images/vermieten.jpg`     | Querformat, ≥ 1400 × 1050  |
| Seite Referenzen     | `public/images/referenzen.jpg`    | Querformat, ≥ 1400 × 1050  |

**Objekt- und Referenzfotos** werden im Admin-Panel unter `/admin` direkt
hochgeladen (Supabase Storage) und erscheinen automatisch auf den Karten und
Detailseiten.

## Die App (`/admin`)

Silke Abelen pflegt ihre Website selbst — in einer App, die auf dem Telefon
wie auf dem Rechner funktioniert und sich auf den Startbildschirm legen lässt
(eigenes Manifest `public/app.webmanifest`, Start direkt in der Übersicht).
Anmeldung per E-Mail und Passwort (Supabase Auth); die Route ist über
Middleware geschützt und wird nicht indexiert.

**Grundsatz: keine Technik in der App.** Es gibt keine Felder für Adressen
(„Slug“), Sortierzahlen oder Datenformate, und keine Fehlermeldung nennt die
Datenbank. Adressen vergibt die App selbst aus dem Titel und friert sie ein,
sobald ein Objekt online war; die Reihenfolge ändert man über „weiter nach
vorn/hinten“; Fehler stehen im Serverprotokoll, die Nutzerin liest „Bitte
versuchen Sie es noch einmal“.

| Bereich | Was dort geht |
| --- | --- |
| Übersicht | Begrüßung, wartende Anfragen, was online ist, die Objekte als Fotokarten |
| Objekte | Anlegen, bearbeiten, online/offline, Startseite, Reihenfolge, löschen |
| Referenzen | Dasselbe, mit Kundenmeinung (Zitat, Sterne, Kurzurteil, Empfehlung) |
| Anfragen | Posteingang mit Filter; Antworten per E-Mail vorbereitet, Anrufen, Stand, Notiz |
| Ihr Zugang | Passwort ändern, App auf den Startbildschirm, Hilfe, Abmelden |

Bearbeiten: eine Seite je Objekt, Leiste „Speichern“ erscheint erst bei einer
Änderung (Strg/⌘ + S geht auch). Fotos werden im Browser auf höchstens 2560
Pixel verkleinert und gehen direkt zu Vercel Blob; entfernte Fotos löscht die
App erst beim Speichern. Energieausweis und Eckdaten werden Feld für Feld
abgefragt und in das Format geschrieben, das die Website erwartet.

Die Seiten der App holen nur Daten; alles Sichtbare steht in
`src/components/admin/ansichten/`.

**Startseite:** Das große Objekt unter „Aktuell zum Verkauf“ wird automatisch
gewählt — veröffentlicht, Status nicht „verkauft“, bevorzugt das als
*hervorgehoben* markierte.

Ohne erreichbare Datenbank zeigt die Website die gepflegten Fallback-Daten aus
`src/data/fallback-properties.ts` und `src/data/fallback-references.ts`.

### Datenbank und Speicher

Schema und Sicherheitsregeln liegen in `supabase/migrations/`. Alle Tabellen
nutzen Row Level Security: anonym sind nur veröffentlichte Datensätze lesbar,
angemeldet ist alles erlaubt. Jede Server-Aktion prüft die Anmeldung zusätzlich
selbst (`src/lib/admin/sitzung.ts`) — die Datenbank lehnt Unangemeldete stumm
ab, und danach käme das Löschen von Fotos mit dem Schlüssel des Speichers.

Fotos: Vercel Blob, sobald der Speicher mit dem Projekt verbunden ist; bis
dahin und in Vorschau-Fassungen der Bucket `property-images` der Datenbank
(`src/lib/admin/speicher.ts` erklärt, warum).

Supabase schläft im kostenlosen Tarif nach sieben Tagen ohne Zugriff ein.
Ein Vercel-Cron ruft deshalb jeden Morgen `/api/cron/wachhalten` auf
(`vercel.json`).

## Struktur

```
src/
├── app/(site)/        Öffentliche Seiten
├── app/admin/         Objektverwaltung (geschützt)
├── app/api/kontakt/   Kontaktformular → Resend
├── components/        UI-, Layout- und Seitenbausteine
├── data/              Inhalte: Texte, Navigation, FAQ, Fallback-Daten
└── lib/               SEO, Schema.org, Supabase, Bildauflösung
```

## Seiten

`/` · `/bewertung` · `/verkaufen` · `/ueber-mich` ·
`/referenzen` (+ Detailseiten) · `/immobilien` (+ Detailseiten) · `/kontakt` ·
`/leistungen` · `/kaufen` · `/impressum` · `/datenschutz` · `/agb`

## Umgebungsvariablen

- `NEXT_PUBLIC_SITE_URL` — Basis-URL für Canonicals, Sitemap, Schema.org
- `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY` — Objektdatenbank
- `RESEND_API_KEY`, `CONTACT_FROM_EMAIL`, `CONTACT_TO_EMAIL` — Kontaktformular
- `BLOB_READ_WRITE_TOKEN` — Fotos aus der App; setzt Vercel selbst, sobald der
  Blob-Speicher mit dem Projekt verbunden ist
- `CRON_SECRET` — optional; ist er gesetzt, nimmt `/api/cron/wachhalten` nur
  Aufrufe von Vercel an

Ohne Supabase-Konfiguration zeigt die Website die in
`src/data/fallback-properties.ts` hinterlegten Objekte.

## Befehle

```bash
npm run dev        # Entwicklung
npm run build      # Produktionsbuild
npm run start      # Produktionsserver
npm run lint       # ESLint
npm run typecheck  # TypeScript
npm test           # Tests (node:test)
```

Getestet ist die Logik, die Eingaben aus der App verarbeitet: Adressen,
deutsche Zahlen („395.000“, „171,31“), Energieausweis, Herkunft und Löschen
von Fotos, Reihenfolge, Zeitangaben in Berliner Zeit, die Umwandlung von
Datenbankzeilen in die Typen der Website und die Auflösung von Bildpfaden.
