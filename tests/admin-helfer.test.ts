import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { energieLesen, energieSchreiben, leereEnergieangaben } from "../src/lib/admin/energie.ts";
import { fotoHerkunft, supabasePfad, zuLoeschendeFotos } from "../src/lib/admin/fotos.ts";
import { deutscheZahl, preisAnzeigen, zahlAnzeigen } from "../src/lib/admin/form.ts";
import { istEintragsId, nichtGeladen } from "../src/lib/admin/laden.ts";
import { verschieben } from "../src/lib/admin/reihenfolge.ts";
import { begruessung, heuteLang, wann } from "../src/lib/admin/zeit.ts";

describe("Zahlen, wie man sie schreibt", () => {
  it("liest Tausenderpunkte als Tausender", () => {
    assert.equal(deutscheZahl("395.000"), 395000);
    assert.equal(deutscheZahl("1.250.000 €"), 1250000);
  });

  it("liest das Komma als Dezimaltrenner", () => {
    assert.equal(deutscheZahl("171,31"), 171.31);
    assert.equal(deutscheZahl("1.234,5"), 1234.5);
    assert.equal(deutscheZahl("3,5"), 3.5);
  });

  it("nimmt einen einzelnen Punkt vor zwei Ziffern als Dezimalpunkt", () => {
    assert.equal(deutscheZahl("171.31"), 171.31);
  });

  it("gibt bei Leerem oder Unsinn nichts zurück", () => {
    assert.equal(deutscheZahl(""), null);
    assert.equal(deutscheZahl("   "), null);
    assert.equal(deutscheZahl("abc"), null);
  });

  it("zeigt Zahlen mit Komma und Preise mit Tausenderpunkt", () => {
    assert.equal(zahlAnzeigen(171.31), "171,31");
    assert.equal(zahlAnzeigen(6), "6");
    assert.equal(zahlAnzeigen(0), "");
    assert.equal(preisAnzeigen(395000), "395.000");
    assert.equal(preisAnzeigen(0), "");
  });
});

describe("Energieausweis", () => {
  it("schreibt die Angaben in der Reihenfolge einer Anzeige", () => {
    const liste = energieSchreiben({
      ...leereEnergieangaben,
      ausweis: "bedarf",
      kennwert: "123,4",
      klasse: "D",
      traeger: "Gas",
      baujahr: "1998",
    });
    assert.deepEqual(liste, [
      { label: "Energieausweis", value: "Bedarfsausweis" },
      { label: "Endenergiebedarf", value: "123,4 kWh/(m²·a)" },
      { label: "Effizienzklasse", value: "D" },
      { label: "Energieträger", value: "Gas" },
      { label: "Baujahr laut Ausweis", value: "1998" },
    ]);
  });

  it("nennt beim Verbrauchsausweis den Verbrauch", () => {
    const liste = energieSchreiben({ ...leereEnergieangaben, ausweis: "verbrauch", kennwert: "98" });
    assert.equal(liste[1]?.label, "Endenergieverbrauch");
  });

  it("lässt Kennwert und Klasse weg, solange der Ausweis in Vorbereitung ist", () => {
    const liste = energieSchreiben({ ...leereEnergieangaben, ausweis: "vorbereitung", kennwert: "98", klasse: "C" });
    assert.deepEqual(liste, [{ label: "Energieausweis", value: "In Vorbereitung" }]);
  });

  it("liest die eigene Liste verlustfrei zurück", () => {
    const angaben = {
      ...leereEnergieangaben,
      ausweis: "verbrauch" as const,
      kennwert: "98,2",
      klasse: "C",
      traeger: "Fernwärme",
      baujahr: "1975",
      weitere: [{ label: "Warmwasser", value: "enthalten" }],
    };
    assert.deepEqual(energieLesen(energieSchreiben(angaben)), angaben);
  });

  it("behält Einträge, die es nicht zuordnen kann", () => {
    const angaben = energieLesen([{ label: "Hinweis", value: "Ausweis liegt bei der Besichtigung vor" }]);
    assert.deepEqual(angaben.weitere, [{ label: "Hinweis", value: "Ausweis liegt bei der Besichtigung vor" }]);
  });
});

describe("Herkunft eines Fotos", () => {
  const blob = "https://abc123.public.blob.vercel-storage.com/objekte/x/foto-9f3.jpg";
  const supabase = "https://qnk.supabase.co/storage/v1/object/public/property-images/ordner/a.jpg";
  const wix = "https://static.wixstatic.com/media/59289a_1~mv2.jpg";

  it("erkennt jede Quelle", () => {
    assert.equal(fotoHerkunft(blob), "blob");
    assert.equal(fotoHerkunft(supabase), "supabase");
    assert.equal(fotoHerkunft(wix), "wix");
    assert.equal(fotoHerkunft("/images/wix/59289a_1~mv2.jpg"), "projekt");
    assert.equal(fotoHerkunft("https://example.com/a.jpg"), "fremd");
    assert.equal(fotoHerkunft("kein link"), "fremd");
  });

  it("findet den Pfad im Speicher der Datenbank", () => {
    assert.equal(supabasePfad(supabase), "ordner/a.jpg");
    assert.equal(supabasePfad(wix), null);
  });

  it("löscht nur, was die App selbst hochgeladen hat", () => {
    const weg = zuLoeschendeFotos([blob, supabase, wix, "/images/wix/x.jpg"], []);
    assert.deepEqual(weg, { blob: [blob], supabase: ["ordner/a.jpg"] });
  });

  it("löscht nichts, was noch in der Liste steht", () => {
    assert.deepEqual(zuLoeschendeFotos([blob, supabase], [supabase, blob]), { blob: [], supabase: [] });
  });
});

describe("Reihenfolge", () => {
  it("tauscht mit dem Nachbarn", () => {
    assert.deepEqual(verschieben(["a", "b", "c"], "b", -1), ["b", "a", "c"]);
    assert.deepEqual(verschieben(["a", "b", "c"], "b", 1), ["a", "c", "b"]);
  });

  it("bleibt am Rand stehen", () => {
    assert.equal(verschieben(["a", "b"], "a", -1), null);
    assert.equal(verschieben(["a", "b"], "b", 1), null);
    assert.equal(verschieben(["a"], "x", 1), null);
  });
});

describe("Zeitangaben in Leichlingen", () => {
  // 26.09.2026, 06:30 UTC = 08:30 in Berlin (Sommerzeit)
  const morgens = new Date("2026-09-26T06:30:00Z");

  it("grüßt nach der Uhrzeit in Berlin, nicht in UTC", () => {
    assert.equal(begruessung(morgens), "Guten Morgen");
    assert.equal(begruessung(new Date("2026-09-26T12:00:00Z")), "Guten Tag");
    // 16:30 UTC = 18:30 Berlin
    assert.equal(begruessung(new Date("2026-09-26T16:30:00Z")), "Guten Abend");
  });

  it("nennt den Tag ausgeschrieben", () => {
    assert.equal(heuteLang(morgens), "Samstag, 26. September");
  });

  it("sagt, wie lange es her ist", () => {
    assert.equal(wann("2026-09-26T06:29:40Z", morgens), "Gerade eben");
    assert.equal(wann("2026-09-26T06:18:00Z", morgens), "Vor 12 Minuten");
    assert.equal(wann("2026-09-26T04:05:00Z", morgens), "Heute, 06:05");
    assert.equal(wann("2026-09-25T07:05:00Z", morgens), "Gestern, 09:05");
    assert.equal(wann("2026-09-21T07:05:00Z", morgens), "Montag, 09:05");
    assert.equal(wann("2026-09-12T07:05:00Z", morgens), "12. Sept.");
    assert.equal(wann("2025-11-03T07:05:00Z", morgens), "03.11.2025");
  });

  it("rechnet mit dem Kalendertag in Berlin: kurz nach Mitternacht ist heute", () => {
    // 25.09. 22:30 UTC = 26.09. 00:30 Berlin
    assert.equal(wann("2026-09-25T22:30:00Z", morgens), "Heute, 00:30");
  });
});

describe("Laden in der App", () => {
  it("erkennt die Kennung eines Eintrags", () => {
    assert.equal(istEintragsId("3f2a9c1e-8b4d-4e6f-9a0b-1c2d3e4f5a6b"), true);
    assert.equal(istEintragsId("3F2A9C1E-8B4D-4E6F-9A0B-1C2D3E4F5A6B"), true);
  });

  it("nimmt eine erfundene Adresse als „gibt es nicht“, nicht als Fehler", () => {
    assert.equal(istEintragsId("neu"), false);
    assert.equal(istEintragsId("haus-in-leverkusen"), false);
    assert.equal(istEintragsId(""), false);
    assert.equal(istEintragsId("3f2a9c1e-8b4d-4e6f-9a0b-1c2d3e4f5a6b-x"), false);
  });

  it("meldet eine stumme Datenbank, statt eine leere Liste vorzutäuschen", () => {
    assert.throws(() => nichtGeladen("Objekte", { message: "timeout" }), /Objekte nicht geladen: timeout/);
  });
});
