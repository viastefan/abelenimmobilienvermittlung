# Bilder — wo sie liegen und wie sie hierher kommen

Alle Bilder des Auftritts kommen zurzeit aus der Mediathek des bisherigen
Wix-Auftritts (`static.wixstatic.com`). Die Zuordnung steht in
`src/data/wix-media.ts` — eine Datei, eine Liste, ein Ort.

Das funktioniert, solange der Wix-Auftritt besteht. Wird er abgeschaltet,
verschwinden die Bilder. Dafür gibt es den Umschalter unten.

## Alle Bilder ins Projekt holen

```bash
npm run bilder
```

Das Skript lädt jedes in `src/data/wix-media.ts` eingetragene Bild — derzeit
39 Dateien — nach `public/images/wix/`. Vorhandene Dateien überspringt es;
mit `npm run bilder -- --neu` lädt es sie neu.

Danach umschalten:

```bash
# .env.local
NEXT_PUBLIC_BILDER_LOKAL=1
```

Dieselbe Variable auch bei Vercel setzen (Project → Settings → Environment
Variables), damit die veröffentlichte Website ebenfalls die lokalen Kopien
verwendet. Am Code muss dafür nichts geändert werden.

Danach die Dateien committen und pushen. `public/` gehört mit ins
Repository — Vercel baut daraus.

## Ein einzelnes Bild austauschen

In `src/data/wix-media.ts` steht zu jedem Platz eine Datei-ID. Statt der ID
kann dort auch ein Pfad stehen, zum Beispiel:

```ts
portrait: "/images/silke-abelen.jpg",
```

Die Datei dann unter `public/images/silke-abelen.jpg` ablegen. Fehlt eine
Datei, zeigt die Website an dieser Stelle eine ruhige Markenfläche statt
eines kaputten Bildes.

## Welches Bild wo erscheint

| Eintrag in `wix-media.ts` | Wo es erscheint |
| --- | --- |
| `brandMedia.mark` | Bildmarke im Kopf und im Fuß |
| `brandMedia.wordmark` | Wortmarke neben der Bildmarke |
| `brandMedia.sprengnetter` | Siegel „Geprüfte Kompetenz“, Startseite |
| `brandMedia.immoscout24` | Siegel „Bronze Partner“, Startseite |
| `siteMedia.heroKey` | Startseite, Hintergrund des Aufmachers |
| `siteMedia.portrait` | Startseite „Über uns“ und Seite „Über Mich“ |
| `siteMedia.bewertung` | Seite „Immobilienbewertung“, Kopfbereich |
| `siteMedia.verkaufen` | Seite „Immobilienverkauf“, Kopfbereich |
| `siteMedia.vermieten` | Seite „Vermietung“, Kopfbereich |
| `siteMedia.referenzen` | Seite „Referenzen“, Kopfbereich |
| `objectMedia.*` | Galerien der einzelnen Objekte |

## Bilder neuer Objekte

Fotos zu neuen Immobilien und Referenzen gehören **nicht** hierher. Sie
werden im Admin-Panel beim jeweiligen Objekt hochgeladen und landen im
Supabase-Speicher (`property-images`). Nur die Bestände des alten Auftritts
stehen in `wix-media.ts`.

## Rechte

Bitte nur Bilder verwenden, für die die Nutzungsrechte vorliegen — eigene
Aufnahmen, Bilder der Eigentümer mit deren Zustimmung oder lizenzierte
Stockfotos. Bei Personenaufnahmen ist die Einwilligung der abgebildeten
Personen erforderlich.
