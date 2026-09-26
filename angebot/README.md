# Angebot — Website und App

Das Angebot für Silke Abelen als PDF, fünf Seiten A4.

| Datei | Was es ist |
| --- | --- |
| `Angebot-Website-App-Silke-Abelen.pdf` | Das Dokument zum Versenden. |
| `angebot-website-app.html` | Die Quelle. Hier wird geändert, nie im PDF. |
| `assets/manrope.css` | Manrope als eingebettete Schrift, damit das PDF überall gleich aussieht. |

Farben, Schrift und Marke stammen aus dem Entwurfssystem der Website
(`tailwind.config.ts`, `src/components/layout/Logo.tsx`) — das Angebot sieht
aus wie das, was es anbietet.

## Neu bauen

Nach einer Änderung an der HTML-Datei:

```bash
/opt/pw-browsers/chromium-1194/chrome-linux/chrome \
  --headless=new --disable-gpu --no-sandbox --no-pdf-header-footer \
  --print-to-pdf="angebot/Angebot-Website-App-Silke-Abelen.pdf" \
  --virtual-time-budget=6000 \
  "file://$PWD/angebot/angebot-website-app.html"
```

Jeder Browser tut es auch: HTML öffnen, drucken, „Als PDF sichern“, Ränder auf
null, Hintergrundgrafiken an. Die Seitenumbrüche liegen fest, jede `.page` ist
genau eine A4-Seite.

## Was im Text steht und bestätigt werden sollte

- **1.499 €** einmalig und **79 €** Betrieb im Jahr stehen ohne Steuerangabe da.
  Wenn Umsatzsteuer ausgewiesen werden muss, gehört sie auf Seite 4 in die
  Tabelle und in die Fußnote auf Seite 5.
- **Gültig bis 31.10.2026** ist gesetzt, weil die Wix-Verlängerung im Oktober
  ansteht. Anderes Datum: Seite 5, Block `.sign .note`.
- Die Ersparnis rechnet 200 € gegen 79 € im Jahr: 121 € jährlich, 605 € in fünf
  Jahren. Ändert sich ein Preis, ändern sich beide Zahlen mit.
- Verlinkt ist `abelen-immobilien.vercel.app`. Sobald
  `www.abelen-immobilien.de` umgestellt ist, gehören die Links auf die
  eigene Domain.
