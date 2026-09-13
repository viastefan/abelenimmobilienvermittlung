import assert from "node:assert/strict";
import { describe, it } from "node:test";
import fs from "node:fs";
import path from "node:path";

/**
 * Tailwind erzeugt Deckkraft-Klassen nur für die Werte seiner Skala — in
 * Fünferschritten. `bg-ink/92` sieht im Quelltext richtig aus, landet aber
 * nie im Stylesheet: die Fläche bleibt durchsichtig, und weiße Schrift darauf
 * ist unlesbar. Dieser Test fängt genau das ab.
 */

const modifier = /\b(?:bg|text|border|from|via|to|ring|divide|placeholder|outline|decoration|fill|stroke|accent|caret|shadow)-[a-z0-9-]+\/(\d+)\b/g;

function sourceFiles(dir: string): string[] {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) return sourceFiles(full);
    return entry.isFile() && /\.tsx?$/.test(entry.name) ? [full] : [];
  });
}

describe("Deckkraft-Klassen", () => {
  it("verwendet nur Werte, die Tailwind auch erzeugt", () => {
    const offenders: string[] = [];

    for (const file of sourceFiles(path.join(process.cwd(), "src"))) {
      const content = fs.readFileSync(file, "utf8");
      for (const match of content.matchAll(modifier)) {
        const value = Number(match[1]);
        if (value % 5 !== 0 || value > 100) {
          offenders.push(`${path.relative(process.cwd(), file)}: ${match[0]}`);
        }
      }
    }

    assert.deepEqual(offenders, []);
  });
});
