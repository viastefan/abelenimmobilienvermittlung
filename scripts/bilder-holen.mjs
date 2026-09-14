/**
 * Holt alle Bilder des bisherigen Wix-Auftritts nach `public/images/wix/`.
 *
 *   npm run bilder
 *
 * Danach in `.env.local` (und bei Vercel) `NEXT_PUBLIC_BILDER_LOKAL=1`
 * setzen — die Website liest die Bilder dann aus dem Projekt statt von Wix.
 *
 * Der Aufruf ist wiederholbar: vorhandene Dateien werden übersprungen.
 * Mit `--neu` werden sie überschrieben.
 */

import { mkdir, writeFile, access } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

const here = path.dirname(fileURLToPath(import.meta.url));
const ziel = path.join(here, "..", "public", "images", "wix");
const quelle = path.join(here, "..", "src", "data", "wix-media.ts");
const HOST = "https://static.wixstatic.com/media";
const ueberschreiben = process.argv.includes("--neu");

/**
 * Die IDs aus der Registratur lesen.
 *
 * Bewusst über den Text der Datei statt über einen Import: das Modul ist
 * TypeScript und hängt an Next.js — der Umweg spart einen Werkzeugkasten.
 */
async function dateiIds() {
  const { readFile } = await import("node:fs/promises");
  const text = await readFile(quelle, "utf8");
  const treffer = text.match(/59289a_[0-9a-f]+~mv2\.(?:jpg|png)/g) ?? [];
  return [...new Set(treffer)];
}

async function vorhanden(pfad) {
  try {
    await access(pfad);
    return true;
  } catch {
    return false;
  }
}

const ids = await dateiIds();
if (ids.length === 0) {
  console.error("Keine Datei-IDs in src/data/wix-media.ts gefunden.");
  process.exit(1);
}

await mkdir(ziel, { recursive: true });
console.log(`${ids.length} Bilder — Ziel: public/images/wix/`);

let geholt = 0;
let uebersprungen = 0;
const fehler = [];

for (const id of ids) {
  const pfad = path.join(ziel, id);
  if (!ueberschreiben && (await vorhanden(pfad))) {
    uebersprungen += 1;
    continue;
  }
  try {
    const antwort = await fetch(`${HOST}/${id}`);
    if (!antwort.ok) throw new Error(`HTTP ${antwort.status}`);
    await writeFile(pfad, Buffer.from(await antwort.arrayBuffer()));
    geholt += 1;
    process.stdout.write(".");
  } catch (error) {
    fehler.push(`${id}: ${error.message}`);
    process.stdout.write("x");
  }
}

console.log(`\n${geholt} geholt, ${uebersprungen} bereits vorhanden, ${fehler.length} fehlgeschlagen.`);
for (const zeile of fehler) console.error("  " + zeile);
if (fehler.length > 0) process.exit(1);

console.log("\nJetzt NEXT_PUBLIC_BILDER_LOKAL=1 setzen — in .env.local und bei Vercel.");
