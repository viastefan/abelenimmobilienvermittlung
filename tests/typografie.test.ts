import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { zusammenhalten } from "../src/lib/typografie.ts";

const nbsp = " ";

describe("zusammenhalten", () => {
  it("bindet die Einheit an die Zahl", () => {
    assert.equal(zusammenhalten("ca. 171,31 m²"), `ca.${nbsp}171,31${nbsp}m²`);
    assert.equal(zusammenhalten("395.000 €"), `395.000${nbsp}€`);
    assert.equal(zusammenhalten("91 qm"), `91${nbsp}qm`);
  });

  it("lässt den Rest der Zeile umbrechen", () => {
    assert.equal(zusammenhalten("10.000 € zusätzlich"), `10.000${nbsp}€ zusätzlich`);
  });

  it("fasst nur echte Einheiten, keine Wörter, die so anfangen", () => {
    assert.equal(zusammenhalten("3 Stellplätze"), "3 Stellplätze");
    assert.equal(zusammenhalten("2 m breit"), "2 m breit");
    assert.equal(zusammenhalten("Baujahr 1965"), "Baujahr 1965");
  });

  it("bindet „ca.“ nur vor einer Zahl", () => {
    assert.equal(zusammenhalten("ca. Mitte 2027"), "ca. Mitte 2027");
    assert.equal(zusammenhalten("rund 170 m²"), `rund${nbsp}170${nbsp}m²`);
  });

  it("lässt Werte ohne Zahl unverändert", () => {
    assert.equal(zusammenhalten("Leverkusen-Rheindorf"), "Leverkusen-Rheindorf");
    assert.equal(zusammenhalten(""), "");
  });
});
