import assert from "node:assert/strict";
import { describe, it } from "node:test";
import config from "../tailwind.config.ts";

/**
 * Textfarben müssen auf den Flächen lesbar sein, auf denen sie stehen.
 *
 * Geprüft wird der Wert, den die WCAG für normalen Text verlangt: 4,5:1.
 * Nicht nur gegen Weiß — die Seite wechselt zwischen Weiß und mehreren
 * hellen Gründen, und gerade dort war der Abstand vorher zu klein: die
 * leiseste Stufe lag bei 2,7 und trug trotzdem Beschriftungen wie
 * „Kaufpreis“ und „E-Mail“.
 */

type Farben = Record<string, string | Record<string, string>>;
const farben = (config.theme?.extend?.colors ?? {}) as Farben;

function wert(pfad: string): string {
  const [gruppe, ton] = pfad.split(".");
  const eintrag = farben[gruppe as string];
  const roh = ton ? (eintrag as Record<string, string>)[ton] : (eintrag as string);
  assert.ok(typeof roh === "string", `Farbe ${pfad} fehlt in tailwind.config.ts`);
  return roh as string;
}

/** Relative Helligkeit nach WCAG 2.1. */
function helligkeit(hex: string): number {
  const rein = hex.replace("#", "");
  const kanäle = [0, 2, 4].map((i) => Number.parseInt(rein.slice(i, i + 2), 16) / 255);
  const [r, g, b] = kanäle.map((k) => (k <= 0.03928 ? k / 12.92 : ((k + 0.055) / 1.055) ** 2.4));
  return 0.2126 * (r as number) + 0.7152 * (g as number) + 0.0722 * (b as number);
}

function verhältnis(vorne: string, hinten: string): number {
  const a = helligkeit(vorne);
  const b = helligkeit(hinten);
  return (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05);
}

/** Die hellen Gründe, auf denen Text tatsächlich steht. */
const gründe = [
  ["Weiß", "#FFFFFF"],
  ["surface-warm", wert("surface-warm")],
  ["surface-cool", wert("surface-cool")],
  ["surface-mist", wert("surface-mist")],
  ["surface-sand", wert("surface-sand")],
  ["accent-soft", wert("accent.soft")],
] as const;

const textfarben = ["text.DEFAULT", "text.muted", "text.subtle", "accent.deep", "accent.dark", "ink"];

describe("Kontrast der Textfarben", () => {
  for (const pfad of textfarben) {
    it(`${pfad} trägt 4,5:1 auf jedem hellen Grund`, () => {
      const vorne = wert(pfad);
      const zuLeise = gründe
        .map(([name, grund]) => [name, verhältnis(vorne, grund)] as const)
        .filter(([, v]) => v < 4.5)
        .map(([name, v]) => `${name}: ${v.toFixed(2)}`);

      assert.deepEqual(zuLeise, [], `${pfad} (${vorne}) ist zu leise auf — ${zuLeise.join(", ")}`);
    });
  }

  /**
   * Manche Töne stehen nicht auf den allgemeinen Flächen, sondern auf ihrer
   * eigenen: das Abzeichen „Reserviert“ und jede Fehlermeldung im Panel
   * stehen auf `warning-soft`, der Haken „veröffentlicht“ auf `success-soft`.
   */
  const paare = [
    ["warning auf warning-soft", "warning.DEFAULT", "warning.soft"],
    ["success auf success-soft", "success.DEFAULT", "success.soft"],
    ["accent-deep auf accent-soft", "accent.deep", "accent.soft"],
  ] as const;

  for (const [name, vorne, hinten] of paare) {
    it(`${name} trägt 4,5:1`, () => {
      const v = verhältnis(wert(vorne), wert(hinten));
      assert.ok(v >= 4.5, `${name} liegt bei ${v.toFixed(2)}`);
    });
  }

  it("die Stufen bleiben unterscheidbar: DEFAULT dunkler als muted, muted dunkler als subtle", () => {
    assert.ok(helligkeit(wert("text.DEFAULT")) < helligkeit(wert("text.muted")));
    assert.ok(helligkeit(wert("text.muted")) < helligkeit(wert("text.subtle")));
  });

  it("der Hover-Ton bleibt dunkler als der Grundton", () => {
    assert.ok(helligkeit(wert("accent.dark")) < helligkeit(wert("accent.deep")));
  });
});
