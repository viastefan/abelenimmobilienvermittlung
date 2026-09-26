/**
 * Bilder des bisherigen Wix-Auftritts, die als Kopie im Projekt liegen
 * (`public/images/wix/`).
 *
 * Geschrieben von `scripts/bilder-holen.mjs` — nicht von Hand pflegen. Die
 * GitHub Action „Bilder sichern“ ruft das Skript auf und legt Liste und
 * Dateien im Repository ab. Jedes Bild auf dieser Liste liest die Website
 * aus dem Projekt; alles, was fehlt, lädt sie weiter von Wix.
 */
export const lokaleWixBilder: readonly string[] = [];
