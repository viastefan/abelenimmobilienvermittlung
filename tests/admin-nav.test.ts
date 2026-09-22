import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { istAktiv } from "../src/lib/admin/nav.ts";

/**
 * Welcher Bereich des Panels gerade markiert wird, entscheidet eine einzige
 * Zeile — und sie ist leicht falsch: jeder Pfad im Panel fängt mit `/admin`
 * an, die Übersicht wäre sonst immer mitmarkiert.
 */
describe("Markierung im Panel", () => {
  it("die Übersicht gilt nur auf ihrer eigenen Seite", () => {
    assert.equal(istAktiv("/admin", "/admin"), true);
    assert.equal(istAktiv("/admin/immobilien", "/admin"), false);
    assert.equal(istAktiv("/admin/anfragen", "/admin"), false);
  });

  it("ein Bereich bleibt auf seinen Unterseiten markiert", () => {
    assert.equal(istAktiv("/admin/immobilien", "/admin/immobilien"), true);
    assert.equal(istAktiv("/admin/immobilien/neu", "/admin/immobilien"), true);
    assert.equal(istAktiv("/admin/immobilien/abc-123", "/admin/immobilien"), true);
  });

  it("Bereiche markieren einander nicht", () => {
    assert.equal(istAktiv("/admin/referenzen", "/admin/immobilien"), false);
    assert.equal(istAktiv("/admin/immobilien", "/admin/referenzen"), false);
    assert.equal(istAktiv("/admin/anfragen", "/admin/referenzen"), false);
  });
});
