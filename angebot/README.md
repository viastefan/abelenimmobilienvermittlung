# Angebot — Website und App

Das Angebot für Silke Abelen als PDF, sechs Seiten A4.

| Datei | Was es ist |
| --- | --- |
| `Angebot-Website-App-Silke-Abelen.pdf` | Das Dokument zum Versenden. |
| `angebot-website-app.html` | Die Quelle. Hier wird geändert, nie im PDF. |
| `assets/manrope.css` | Manrope als eingebettete Schrift, damit das PDF überall gleich aussieht. |
| `assets/app-*.jpg` | Bildschirme der App für Seite 3, mit Beispieldaten aufgenommen. |
| `App-Vorschau.jpg` | Dieselben Bildschirme als ein Bild — zum Mitschicken. |

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

- **10.000 €** einmalig und **79 €** Betrieb im Jahr stehen ohne Steuerangabe da.
  Wenn Umsatzsteuer ausgewiesen werden muss, gehört sie auf Seite 5 in die
  Tabelle und in die Fußnote auf Seite 6.
- **Zahlungsbedingungen** stehen nicht drin — sie sind nirgends festgelegt und
  wurden nicht erfunden. Bei dieser Summe üblich wäre etwa ein Teil bei Auftrag
  und der Rest bei Freischaltung; das gehört dann auf Seite 5.
- **Gültig bis 31.10.2026**, weil die Wix-Verlängerung im Oktober ansteht.
  Anderes Datum: Seite 6, Block `.sign .note`.
- Die Fassung über **1.499 €** liegt in der Git-Geschichte (Commit `ebf5277`).
  Ihre Ersparnisrechnung („605 € in fünf Jahren, rund 40 % des Preises“) passt
  zu 10.000 € nicht mehr und ist deshalb entfallen; geblieben sind die Fakten:
  79 € statt 200 € im Jahr.
- Verlinkt ist `abelen-immobilien.vercel.app`. Die neue App ist dort erst nach
  dem Zusammenführen auf `main` zu sehen — vorher zeigt `/admin` die alte.
  Sobald `www.abelen-immobilien.de` umgestellt ist, gehören die Links auf die
  eigene Domain.
