import assert from "node:assert/strict";
import { describe, it } from "node:test";
import fs from "node:fs";
import path from "node:path";
import { footerNav, legalNav, leistungenNav, primaryNav, type NavItem } from "../src/data/site.ts";

/**
 * Die Hauptnavigation wurde von sieben auf vier Punkte gekürzt. Das ist nur
 * dann eine Verbesserung, wenn dabei keine Seite verwaist: Wer „Anlagen“ aus
 * dem Menü nimmt, muss den Punkt woanders unterbringen — sonst ist die Seite
 * gebaut, aber unerreichbar.
 *
 * Dieser Test liest die tatsächlich vorhandenen Seiten aus `src/app/(site)`
 * und prüft, dass jede von mindestens einer Navigationsliste verlinkt wird.
 */

const siteDir = path.join(process.cwd(), "src", "app", "(site)");

/** Alle festen Routen unter `(site)` — dynamische Segmente bleiben außen vor. */
function routes(dir: string, prefix = ""): string[] {
  const found: string[] = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue;
    // `[slug]` hat keine feste Adresse, Gruppen `(…)` keine eigene Ebene.
    if (entry.name.startsWith("[")) continue;
    const segment = entry.name.startsWith("(") ? prefix : `${prefix}/${entry.name}`;
    const full = path.join(dir, entry.name);
    if (fs.existsSync(path.join(full, "page.tsx"))) found.push(segment);
    found.push(...routes(full, segment));
  }
  return found;
}

function hrefs(items: NavItem[]): string[] {
  return items.flatMap((item) => [item.href, ...hrefs(item.children ?? [])]);
}

describe("Navigation", () => {
  const linked = new Set([
    ...hrefs(primaryNav),
    ...hrefs(footerNav),
    ...hrefs(leistungenNav),
    ...hrefs(legalNav),
  ]);

  it("verlinkt jede Seite des Auftritts mindestens einmal", () => {
    const orphans = routes(siteDir).filter((route) => !linked.has(route));
    assert.deepEqual(orphans, []);
  });

  it("führt nur auf Seiten, die es auch gibt", () => {
    const existing = new Set(["/", ...routes(siteDir)]);
    const dangling = [...linked].filter((href) => !existing.has(href));
    assert.deepEqual(dangling, []);
  });

  it("hält die Hauptnavigation kurz", () => {
    // Mehr als fünf Punkte liest niemand mehr als Übersicht — die Tiefe
    // gehört in die Klappmenüs, nicht in die erste Reihe.
    assert.ok(
      primaryNav.length <= 5,
      `Hauptnavigation hat ${primaryNav.length} Punkte, erlaubt sind höchstens 5`
    );
  });
});
