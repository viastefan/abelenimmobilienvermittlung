import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  parseLines,
  parseKeyValueList,
  parseNumber,
  parseOptionalNumber,
  slugify,
} from "../src/lib/admin/form.ts";

describe("slugify", () => {
  it("transliteriert deutsche Umlaute statt sie zu verlieren", () => {
    assert.equal(slugify("Doppelhaushälfte"), "doppelhaushaelfte");
    assert.equal(slugify("Bürrig"), "buerrig");
    assert.equal(slugify("Großes Haus"), "grosses-haus");
  });

  it("fasst Sonderzeichen zu einzelnen Bindestrichen zusammen", () => {
    assert.equal(slugify("Reihenhaus — ruhige Lage"), "reihenhaus-ruhige-lage");
    assert.equal(slugify("3-Zimmer-Wohnung (Neubau)"), "3-zimmer-wohnung-neubau");
  });

  it("lässt keine Bindestriche am Rand stehen", () => {
    assert.equal(slugify("  Haus  "), "haus");
    assert.equal(slugify("--Haus--"), "haus");
  });

  it("gibt für Eingaben ohne verwertbare Zeichen einen leeren Slug zurück", () => {
    // Die Server Action verlässt sich darauf, um solche Eingaben abzulehnen.
    assert.equal(slugify("!!!"), "");
    assert.equal(slugify(""), "");
  });
});

describe("parseLines", () => {
  it("macht aus einem Textfeld eine Liste ohne Leerzeilen", () => {
    assert.deepEqual(parseLines("Keller\n\n  Garage  \nGarten\n"), ["Keller", "Garage", "Garten"]);
  });

  it("liefert für leere Eingaben eine leere Liste", () => {
    assert.deepEqual(parseLines(""), []);
    assert.deepEqual(parseLines(null), []);
    assert.deepEqual(parseLines("   \n  \n"), []);
  });
});

describe("parseOptionalNumber", () => {
  it("versteht Dezimalkommas, wie sie im Formular eingetippt werden", () => {
    assert.equal(parseOptionalNumber("171,31"), 171.31);
    assert.equal(parseOptionalNumber("171.31"), 171.31);
  });

  it("unterscheidet „nicht angegeben“ von der Zahl null", () => {
    assert.equal(parseOptionalNumber(""), null);
    assert.equal(parseOptionalNumber("   "), null);
    assert.equal(parseOptionalNumber(null), null);
    assert.equal(parseOptionalNumber("0"), 0);
  });

  it("weist Eingaben zurück, die keine Zahl ergeben", () => {
    assert.equal(parseOptionalNumber("keine Angabe"), null);
  });

  it("parseNumber fällt für leere Felder auf 0 zurück", () => {
    assert.equal(parseNumber(""), 0);
    assert.equal(parseNumber("6"), 6);
  });
});

describe("parseKeyValueList", () => {
  it("paart Bezeichnungen mit ihren Werten", () => {
    const formData = new FormData();
    formData.append("feature_label", "Wohnfläche");
    formData.append("feature_value", "171,31 m²");
    formData.append("feature_label", "Zimmer");
    formData.append("feature_value", "6");

    assert.deepEqual(parseKeyValueList(formData, "feature_label", "feature_value"), [
      { label: "Wohnfläche", value: "171,31 m²" },
      { label: "Zimmer", value: "6" },
    ]);
  });

  it("überspringt Zeilen, bei denen eine Hälfte fehlt", () => {
    const formData = new FormData();
    formData.append("feature_label", "Wohnfläche");
    formData.append("feature_value", "171 m²");
    formData.append("feature_label", "");
    formData.append("feature_value", "übrig geblieben");
    formData.append("feature_label", "Zimmer");
    formData.append("feature_value", "   ");

    assert.deepEqual(parseKeyValueList(formData, "feature_label", "feature_value"), [
      { label: "Wohnfläche", value: "171 m²" },
    ]);
  });
});
