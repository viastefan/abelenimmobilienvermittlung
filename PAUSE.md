# Projekt pausiert (ab Oktober 2026)

Die Auftraggeberin wünscht die Website vorerst nicht. Das Projekt ruht,
voraussichtlich bis Sommer 2027. **Der Code wird nicht gelöscht** — er bleibt
vollständig in diesem GitHub-Repository erhalten. Dieses Repository ist die
dauerhafte Heimat des Projekts; alles Nötige liegt hier.

## Was ruht

- **Website / App (Vercel):** offline gestellt (Projekt pausiert bzw. Domain
  entfernt). Jederzeit ohne Codeänderung wieder aktivierbar.
- **Datenbank (Supabase):** schläft nach einer Woche ohne Zugriff von selbst
  ein. Die Geschäftsinhalte sind zusätzlich in
  `supabase/sicherung/inhalte.json` gesichert, falls das kostenlose Projekt
  über die Monate verloren geht.
- **Täglicher Weckruf (Vercel-Cron):** entfällt während der Pause, damit die
  Datenbank einschlafen darf (siehe `vercel.json`).

## Wieder aufnehmen

1. Vercel-Projekt wieder aktivieren (fortsetzen / Domain verbinden).
2. Supabase-Projekt wieder starten; bei Verlust nach Anleitung in
   `supabase/sicherung/README.md` wiederherstellen.
3. Den täglichen Weckruf in `vercel.json` wieder eintragen — die während der
   Pause geleerte `"crons"`-Liste zurücksetzen auf:
   `"crons": [{ "path": "/api/cron/wachhalten", "schedule": "17 5 * * *" }]`.
   Danach `UEBERGABE.md` für die restlichen Schritte durchgehen (Passwort,
   Blob-Speicher, Resend).

Nichts davon erfordert, den Code zu löschen oder neu zu schreiben.
