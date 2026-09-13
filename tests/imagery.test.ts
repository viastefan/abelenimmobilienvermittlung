import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { publicImageExists, resolveFirstImage, resolveImage } from "../src/lib/imagery.ts";

describe("resolveImage", () => {
  it("reicht externe https-Quellen unverändert durch", () => {
    const url = "https://static.wixstatic.com/media/foto.jpg";
    assert.equal(resolveImage(url), url);
  });

  it("gibt eine Datei zurück, die unter public/ existiert", () => {
    assert.equal(resolveImage("/icon.svg"), "/icon.svg");
    assert.equal(publicImageExists("/icon.svg"), true);
  });

  it("verschweigt Dateien, die es nicht gibt — sonst bricht das Bild", () => {
    assert.equal(resolveImage("/images/gibt-es-nicht.jpg"), undefined);
    assert.equal(publicImageExists("/images/gibt-es-nicht.jpg"), false);
  });

  it("behandelt fehlende und relative Pfade als nicht vorhanden", () => {
    assert.equal(resolveImage(undefined), undefined);
    assert.equal(resolveImage(null), undefined);
    assert.equal(resolveImage(""), undefined);
    assert.equal(resolveImage("images/relativ.jpg"), undefined);
  });

  it("lässt sich nicht aus public/ herauslocken", () => {
    assert.equal(resolveImage("/../package.json"), undefined);
  });
});

describe("resolveFirstImage", () => {
  it("nimmt den ersten verwertbaren Eintrag", () => {
    assert.equal(resolveFirstImage(["/images/fehlt.jpg", "/icon.svg"]), "/icon.svg");
  });

  it("gibt undefined zurück, wenn keiner taugt", () => {
    assert.equal(resolveFirstImage([]), undefined);
    assert.equal(resolveFirstImage(undefined), undefined);
    assert.equal(resolveFirstImage(["/images/fehlt.jpg", null, undefined]), undefined);
  });
});
