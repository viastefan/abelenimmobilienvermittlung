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

**Objektfotos** kommen aus der Objektverwaltung unter `/admin` (Supabase
Storage) und erscheinen automatisch auf den Immobilienkarten und
Detailseiten. **Referenzfotos** lassen sich in `src/data/references.ts` je
Objekt über das Feld `image` hinterlegen.

## Struktur

```
src/
├── app/(site)/        Öffentliche Seiten
├── app/admin/         Objektverwaltung (geschützt)
├── app/api/kontakt/   Kontaktformular → Resend
├── components/        UI-, Layout- und Seitenbausteine
├── data/              Inhalte: Texte, Navigation, Referenzen, Bildplätze
└── lib/               SEO, Schema.org, Supabase, Bildauflösung
```

## Seiten

`/` · `/bewertung` · `/verkaufen` · `/vermieten` · `/ueber-mich` ·
`/referenzen` (+ Detailseiten) · `/immobilien` (+ Detailseiten) · `/kontakt` ·
`/leistungen` · `/kaufen` · `/impressum` · `/datenschutz` · `/agb`

## Umgebungsvariablen

- `NEXT_PUBLIC_SITE_URL` — Basis-URL für Canonicals, Sitemap, Schema.org
- `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY` — Objektdatenbank
- `RESEND_API_KEY`, `CONTACT_FROM_EMAIL`, `CONTACT_TO_EMAIL` — Kontaktformular

Ohne Supabase-Konfiguration zeigt die Website die in
`src/data/fallback-properties.ts` hinterlegten Objekte.

## Befehle

```bash
npm run dev        # Entwicklung
npm run build      # Produktionsbuild
npm run start      # Produktionsserver
npm run lint       # ESLint
npm run typecheck  # TypeScript
```
