# Bilder — wo sie liegen und wie sie hierher kommen

Alle Bilder des Auftritts kommen zurzeit aus der Mediathek des bisherigen
Wix-Auftritts (`static.wixstatic.com`). Die Zuordnung steht in
`src/data/wix-media.ts` — eine Datei, eine Liste, ein Ort.

Das funktioniert, solange der Wix-Auftritt besteht. Wird er abgeschaltet,
verschwinden die Bilder. Dafür gibt es den Umschalter unten.

## Alle Bilder ins Projekt holen

Das erledigt die GitHub Action „Bilder sichern“ (`.github/workflows/bilder-sichern.yml`)
von selbst: Sie läuft, sobald sich `src/data/wix-media.ts` oder das Skript
ändert, lädt jedes eingetragene Bild — derzeit 40 Dateien — nach
`public/images/wix/`, verkleinert es auf höchstens 2560 Pixel und legt das
Ergebnis als eigenen Commit auf denselben Zweig.

Von Hand geht es genauso:

```bash
npm run bilder
```

Vorhandene Dateien überspringt das Skript; mit `npm run bilder -- --neu` lädt
es sie neu. Danach die Dateien und `src/data/wix-lokal.ts` committen.

Umschalten muss man nichts. `src/data/wix-lokal.ts` listet, welche Kopien es
gibt, und die Website liefert jede davon aus dem Projekt statt von Wix —
auch die Fotos der Objekte in der Datenbank, deren Adressen noch auf Wix
zeigen. Was nicht auf der Liste steht, kommt weiter von Wix.

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
