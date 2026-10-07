# Übergabe — abelen-immobilien.de

Stand: 26.09.2026. Dieses Dokument sagt, was fertig ist, was noch
eingestellt werden muss und welche Sätze auf der Website Silke Abelen
einmal bestätigen sollte.

---

## 1. Was Silke bestätigen sollte

Der allergrößte Teil der Texte stammt wörtlich vom bisherigen Auftritt.
Diese Punkte sind die Ausnahme — sie sind **nicht** von der alten Website
und sollten einmal gelesen werden.

### Zwei Zusagen zur Bearbeitungszeit

| Zusage | Wo |
| --- | --- |
| „Wir melden uns in der Regel **innerhalb eines Werktages**." | Kontaktseite, Kontaktformular, Kontakt-Fenster, Dienstleistungen |
| „Marktpreiseinschätzung in der Regel **innerhalb einer Woche**." | Bewertungsseite (3×), Ablauf, FAQ |

Beide binden gegenüber Kundinnen und Kunden. Wenn die Fristen zu knapp
sind: Bescheid sagen, sie werden überall gleichzeitig geändert.

### Häufige Fragen auf den Leistungsseiten

Die FAQ-Antworten auf `/bewertung`, `/verkaufen` und `/vermieten` sind
fachlich formuliert, stammen aber nicht von Silke. Gesetzesverweise sind
mit Fundstelle genannt und nachprüfbar; die Aussagen über den eigenen
Arbeitsablauf sollten gegengelesen werden.

### Startseite

Überschrift („Ihre Immobilie. In guten Händen."), die vier Kacheln
(Persönlich, Erfahren, Regional, Verlässlich) und die Ablaufschritte sind
neu geschrieben. Wenn es einen Text der alten Startseite gibt, ersetzt er
das gern.

### Was bewusst NICHT behauptet wird

Kein Preisversprechen („kostenlos"), keine Jahreszahlen, keine Anzahl
vermittelter Objekte, keine Bewertungsnoten außer der einen echten
Kundenmeinung aus dem alten Auftritt.

---

## 2. Was noch eingestellt werden muss

### Fotospeicher bei Vercel (fünf Klicks)

Die App lädt Fotos zu Vercel Blob hoch. Den Speicher legt man im
Vercel-Dashboard an — die Schnittstelle, über die dieses Projekt gebaut
wurde, darf das nicht:

1. Vercel → Projekt `abelenimmobilienvermittlung` → **Storage**
2. **Create Database** → **Blob** → Name `abelen-fotos`, Region **Frankfurt (fra1)**
3. **Connect** zum Projekt, alle Umgebungen

Vercel setzt dabei `BLOB_READ_WRITE_TOKEN`; beim nächsten Deploy nimmt die
App den Speicher. Bis dahin lädt sie in den Bucket der Datenbank — das
Hochladen fällt also nie aus. Erst nach dem Zusammenführen auf `main`
anlegen: Vorschau-Fassungen laden ohnehin in den Bucket der Datenbank
(`src/lib/admin/speicher.ts`).

### E-Mail-Versand (sonst kommt keine Benachrichtigung an)

Ohne diese drei Variablen landet eine Anfrage **nur** im Admin-Panel,
es geht keine E-Mail heraus. Bei Vercel unter Settings →
Environment Variables:

```
RESEND_API_KEY      = re_...            (Konto bei resend.com)
CONTACT_FROM_EMAIL  = website@abelen-immobilien.de
CONTACT_TO_EMAIL    = info@abelen-immobilien.de
```

Die Absenderdomain muss bei Resend verifiziert sein, sonst lehnt der
Versand ab.

### Domain

Die Website läuft derzeit auf `abelen-immobilien.vercel.app`. Sobald
`www.abelen-immobilien.de` auf Vercel zeigt, greifen die Weiterleitungen
der alten Adressen automatisch:

| Alte Adresse | Neu |
| --- | --- |
| `/dienstleistungen` | `/leistungen` |
| `/dienstleistungen-kaufberatung-verkaufsberatung` | `/leistungen` |
| `/ueber-silke-abelen` | `/ueber-mich` |
| `/anlagen-immobilienverkauf` | `/anlagen` |
| `/objektansicht/<titel>` | `/immobilien/<titel>` |

### Bilder ins Projekt holen

Erledigt die GitHub Action „Bilder sichern“ von selbst: Sie holt alle 40
Bilder des alten Auftritts nach `public/images/wix/` und legt sie im
Repository ab. Ab dann liefert die Website jedes davon aus dem Projekt —
auch die Objektfotos in der Datenbank. Eine Umgebungsvariable braucht es
nicht mehr. Details: `public/images/BILDER-ANLEITUNG.md`.

---

## 3. Die App

Adresse: `/admin` — Anmeldung mit dem Supabase-Konto
`info@abelen-immobilien.de`. Das Passwort wird beim ersten Mal im
Supabase-Dashboard unter Authentication → Users gesetzt; danach ändert Silke
es selbst unter „Ihr Zugang“. **Dieses Konto hat sich noch nie angemeldet.**

Was die App kann:

- Objekte anlegen, bearbeiten, online/offline stellen, auf die Startseite
  holen, sortieren, löschen — mit Rückfrage
- Fotos hinzufügen (ziehen oder antippen), sortieren, Titelbild wählen;
  große Handyfotos werden vor dem Hochladen verkleinert
- Eckdaten, Ausstattung und Energieausweis Feld für Feld, mit Vorschlägen
- Referenzen dasselbe, mit Kundenmeinung (Zitat, Sterne, Kurzurteil,
  Weiterempfehlung) — die gab es vorher im Panel nicht zu bearbeiten
- Anfragen als Posteingang: Antwort per E-Mail vorbereitet, Anrufen mit
  einem Tipp, Stand (neu, in Arbeit, erledigt), Notiz speichert sich selbst
- Passwort ändern, App auf den Startbildschirm legen

Keine Technik in der App: kein Feld „Slug“, keine Sortierzahl, keine Meldung
mit Datenbankfehler. Adressen bildet die App aus dem Titel und hält sie fest,
sobald ein Objekt online ist.

**Geprüft ist:** jede Seite am Telefon und am Rechner mit Beispieldaten,
Speichern mit Rückmeldung, Menüs, Löschen mit Rückfrage, Hochladen bis zur
fertigen Adresse im Formular (mit nachgestellter Blob-Schnittstelle: ein
8,9-MB-Foto ging mit 1,9 MB hinaus). Routenschutz und Anmeldeseite wie bisher.

**Nicht geprüft ist:** alles mit echtem Login gegen die echte Datenbank —
dafür fehlt hier das Passwort. Einmal durchklicken, am besten so:

1. Anmelden
2. Ein Objekt öffnen, Preis ändern, speichern — Website prüfen
3. Neues Objekt mit zwei Fotos anlegen, online stellen, auf der Website ansehen
4. Wieder offline nehmen und löschen
5. Anfrage über das Kontaktformular senden, in der App öffnen, als erledigt markieren
6. Passwort ändern, abmelden, mit dem neuen anmelden

### Datenbank wach halten

Das Supabase-Projekt läuft im kostenlosen Tarif und schläft nach sieben
Tagen ohne Zugriff ein — dann nimmt die Website keine Anfragen an, und die
App meldet niemanden an. Ein Vercel-Cron ruft deshalb jeden Morgen um 7:17
Uhr (Sommerzeit) `/api/cron/wachhalten` auf. Crons laufen nur in der
Produktionsfassung, also ab dem Zusammenführen auf `main`. Sicherungen macht
der kostenlose Tarif nicht; wer die will, braucht Supabase Pro.

## 4. Datenschutz und Recht

- **Impressum, AGB**: wörtlich vom alten Auftritt.
- **Datenschutzerklärung**: die Rechtstexte wörtlich, die Abschnitte über
  eingesetzte Werkzeuge neu — die alte Fassung beschrieb Cookiebot,
  YouTube und Google Maps, die es hier nicht gibt.
- **Steuernummer** steht im Impressum, weil sie auf der alten Seite
  steht. § 5 DDG verlangt die Umsatzsteuer-Identifikationsnummer, sofern
  vorhanden — die Steuernummer ist nicht gefordert. Falls es eine
  USt-IdNr. gibt, gehört sie an diese Stelle.
- **Serverstandort**: die Serverfunktionen sind auf Frankfurt festgelegt
  (`vercel.json`), die Anfragen liegen in einem Supabase-Rechenzentrum in
  Frankfurt.
- **Keine Cookies.** Die Einwilligung liegt im Local Storage des Browsers.
- Es sind keine Auftragsverarbeitungsverträge abgeschlossen worden —
  Vercel, Supabase und Resend bieten sie an und müssen noch akzeptiert
  werden.

---

## 5. Technisch

```bash
npm run dev        # Entwicklungsserver
npm run build      # Produktionsbau
npm test           # 82 Tests
npm run typecheck  # TypeScript
npm run lint       # ESLint
npm run bilder     # Bilder des alten Auftritts holen
```

Datenbank: Supabase-Projekt `abelen-immobilien`
(`qnkiqttfgehgzrxrhisb`, Region Frankfurt). Die Migrationen liegen in
`supabase/migrations/` und sind alle angewandt.

Fällt die Datenbank aus, zeigt die Website die vier echten Objekte aus
`src/data/fallback-properties.ts` und `fallback-references.ts` — sie geht
nicht kaputt, sie wird nur statisch.

---

## 6. Offene Kleinigkeiten

- **Trustpilot**: die alte Dienstleistungen-Seite verlinkte „Alle
  Bewertungen ansehen" zu Trustpilot. Die Adresse fehlt, der Knopf ist
  deshalb nicht übernommen.
- **Provisionshöhe**: die AGB nennen keine Zahl („richtet sich nach der
  im Auftrag ausdrücklich genannten Provision") — so steht es auf der
  alten Seite.
- **Startseitentext** der alten Website liegt noch nicht vor (siehe 1.).
