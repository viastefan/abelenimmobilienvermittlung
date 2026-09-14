# Bilder einfügen

Die Website sucht die Fotos unter festen Pfaden. Sobald eine Datei hier liegt,
erscheint sie automatisch — es ist keine Änderung am Code nötig. Fehlt eine
Datei, zeigt die Website an dieser Stelle eine ruhige Markenfläche statt eines
kaputten Bildes.

Nach dem Hinzufügen: Dateien committen und pushen. Vercel baut die Seite neu,
danach sind die Bilder online.

## Fotos

| Datei | Wo es erscheint | Format | Empfohlene Größe |
| --- | --- | --- | --- |
| `hero-wohnstrasse.jpg` | Startseite, großes Bild oben | quer (4:3) | ab 1600 × 1200 px |
| `silke-abelen.jpg` | Startseite „Über uns“ und Seite „Über uns“ | quer oder Portrait | ab 1200 × 900 px |
| `bewertung.jpg` | Seite „Bewertung“, Kopfbereich | quer | ab 1400 × 1000 px |
| `verkaufen.jpg` | Seite „Verkaufen“, Kopfbereich | quer | ab 1400 × 1000 px |
| `vermieten.jpg` | Seite „Vermieten“, Kopfbereich | quer | ab 1400 × 1000 px |
| `referenzen.jpg` | Seite „Referenzen“, Kopfbereich | quer | ab 1400 × 1000 px |

Bitte Wohnhäuser aus der Region zeigen — Ein- und Mehrfamilienhäuser,
Doppelhaushälften, gepflegte Wohnstraßen. Keine Luxusvillen, keine
Hochglanz-Architektur.

## Siegel, Logo und Objektfotos

Diese Bilder kommen zurzeit aus der Mediathek des bisherigen Wix-Auftritts
(`static.wixstatic.com`) — siehe `src/data/wix-media.ts`. Sie müssen also
nicht hier abgelegt werden, **solange der Wix-Auftritt besteht**.

Wird Wix abgeschaltet, verschwinden sie. Dann bitte herunterladen, hier
ablegen und die Pfade in `src/data/wix-media.ts` umstellen.

## Objektbilder

Bilder einzelner Immobilien und Referenzen gehören **nicht** hierher. Sie
werden im Admin-Panel zum jeweiligen Objekt hochgeladen und landen im
Supabase-Speicher (`property-images`).

## Rechte

Bitte nur Bilder verwenden, für die die Nutzungsrechte vorliegen — eigene
Aufnahmen, Bilder der Eigentümer mit deren Zustimmung oder lizenzierte
Stockfotos. Bei Personenaufnahmen ist die Einwilligung der abgebildeten
Personen erforderlich.
