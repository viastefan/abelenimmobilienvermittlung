/**
 * Holt alle Bilder des bisherigen Wix-Auftritts ins Projekt.
 *
 *   npm run bilder
 *
 * Die Dateien landen in `public/images/wix/`, auf höchstens 2560 Pixel an der
 * langen Kante verkleinert — mehr braucht keine Bildschirmbreite, und die
 * Originale aus dem Telefon wären ein Vielfaches schwerer. Danach schreibt
 * das Skript `src/data/wix-lokal.ts`: die Liste der Dateien, die jetzt im
 * Projekt liegen. Die Website liest jedes Bild dieser Liste von dort statt
 * von Wix. Eine Umgebungsvariable braucht es dafür nicht.
 *
 * Läuft auch von selbst: die GitHub Action „Bilder sichern“ ruft das Skript
 * auf und legt Dateien und Liste im Repository ab.
 *
 * Wiederholbar: vorhandene Dateien werden übersprungen, mit `--neu` neu geholt.
 */

import { mkdir, readdir, readFile, writeFile, access } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

const here = path.dirname(fileURLToPath(import.meta.url));
const wurzel = path.join(here, "..");
const ziel = path.join(wurzel, "public", "images", "wix");
const quelle = path.join(wurzel, "src", "data", "wix-media.ts");
const liste = path.join(wurzel, "src", "data", "wix-lokal.ts");
const HOST = "https://static.wixstatic.com/media";
const MUSTER = /59289a_[0-9a-f]+~mv2\.(?:jpg|jpeg|png|webp)/g;
const LANGE_KANTE = 2560;
const ueberschreiben = process.argv.includes("--neu");

/**
 * sharp kommt mit Next.js als optionale Abhängigkeit. Fehlt es, werden die
 * Originale abgelegt — größer, aber vollständig.
 */
async function ladeSharp() {
  try {
    return (await import("sharp")).default;
  } catch {
    return null;
  }
}

/**
 * Die IDs aus der Registratur lesen.
 *
 * Bewusst über den Text der Datei statt über einen Import: das Modul ist
 * TypeScript und hängt an Next.js — der Umweg spart einen Werkzeugkasten.
 */
async function dateiIds() {
  const text = await readFile(quelle, "utf8");
  return [...new Set(text.match(MUSTER) ?? [])];
}

async function vorhanden(pfad) {
  try {
    await access(pfad);
    return true;
  } catch {
    return false;
  }
}

/** Verkleinert, wo es sich lohnt, und behält das Format — PNG bleibt freigestellt. */
async function verkleinern(sharp, puffer, id) {
  if (!sharp) return puffer;
  const bild = sharp(puffer, { failOn: "none" }).rotate().resize({
    width: LANGE_KANTE,
    height: LANGE_KANTE,
    fit: "inside",
    withoutEnlargement: true,
  });
  const neu = id.endsWith(".png")
    ? await bild.png({ compressionLevel: 9, adaptiveFiltering: true }).toBuffer()
    : id.endsWith(".webp")
      ? await bild.webp({ quality: 84 }).toBuffer()
      : await bild.jpeg({ quality: 84, mozjpeg: true }).toBuffer();
  return neu.length < puffer.length ? neu : puffer;
}

/** Schreibt die Liste der Kopien — die Website richtet sich danach. */
async function listeSchreiben() {
  const dateien = (await readdir(ziel)).filter((name) => new RegExp(`^${MUSTER.source}$`).test(name)).sort();
  const eintraege = dateien.map((name) => `  "${name}",`).join("\n");
  await writeFile(
    liste,
    `/**
 * Bilder des bisherigen Wix-Auftritts, die als Kopie im Projekt liegen
 * (\`public/images/wix/\`).
 *
 * Geschrieben von \`scripts/bilder-holen.mjs\` — nicht von Hand pflegen. Die
 * GitHub Action „Bilder sichern“ ruft das Skript auf und legt Liste und
 * Dateien im Repository ab. Jedes Bild auf dieser Liste liest die Website
 * aus dem Projekt; alles, was fehlt, lädt sie weiter von Wix.
 */
export const lokaleWixBilder: readonly string[] = [${dateien.length ? `\n${eintraege}\n` : ""}];
`
  );
  return dateien.length;
}

const ids = await dateiIds();
if (ids.length === 0) {
  console.error("Keine Datei-IDs in src/data/wix-media.ts gefunden.");
  process.exit(1);
}

const sharp = await ladeSharp();
await mkdir(ziel, { recursive: true });
console.log(`${ids.length} Bilder — Ziel: public/images/wix/${sharp ? "" : " (ohne Verkleinerung: sharp fehlt)"}`);

let geholt = 0;
let uebersprungen = 0;
let vorher = 0;
let nachher = 0;
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
    const original = Buffer.from(await antwort.arrayBuffer());
    const fertig = await verkleinern(sharp, original, id);
    await writeFile(pfad, fertig);
    vorher += original.length;
    nachher += fertig.length;
    geholt += 1;
    process.stdout.write(".");
  } catch (error) {
    fehler.push(`${id}: ${error.message}`);
    process.stdout.write("x");
  }
}

const mb = (bytes) => (bytes / 1024 / 1024).toFixed(1);
console.log(`\n${geholt} geholt, ${uebersprungen} bereits vorhanden, ${fehler.length} fehlgeschlagen.`);
if (geholt > 0) console.log(`Größe: ${mb(vorher)} MB aus dem Netz, ${mb(nachher)} MB abgelegt.`);
for (const zeile of fehler) console.error("  " + zeile);

const anzahl = await listeSchreiben();
console.log(`src/data/wix-lokal.ts: ${anzahl} Bilder werden aus dem Projekt geliefert.`);

if (fehler.length > 0) process.exit(1);
