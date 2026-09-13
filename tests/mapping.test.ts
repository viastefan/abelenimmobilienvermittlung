import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { formatPrice, mapRowToProperty } from "../src/types/property.ts";
import { mapRowToReference } from "../src/types/reference.ts";

const propertyRow = {
  id: "1",
  slug: "haus",
  title: "Haus",
  city: "Leverkusen",
  status: "zu-verkaufen",
  price: 420000,
  living_space: 171.31,
  rooms: 6,
  images: ["https://example.com/a.jpg"],
  hero_note: null,
  summary: "Zusammenfassung",
  description: ["Absatz"],
  features: [{ label: "Zimmer", value: "6" }],
  equipment: ["Garten"],
  location: "Rheindorf",
  energy: [],
  featured: true,
  published: true,
  sort_order: 0,
  created_at: "2026-01-01T00:00:00Z",
  updated_at: "2026-01-01T00:00:00Z",
} as unknown as Parameters<typeof mapRowToProperty>[0];

describe("formatPrice", () => {
  it("formatiert in deutscher Schreibweise mit Euro-Zeichen", () => {
    // Intl nutzt ein schmales geschütztes Leerzeichen vor dem Währungszeichen.
    assert.match(formatPrice(420000), /^420\.000\s?€$/u);
  });

  it("rundet auf volle Euro", () => {
    assert.match(formatPrice(419999.62), /^420\.000\s?€$/u);
  });
});

describe("mapRowToProperty", () => {
  it("übernimmt die Werte und leitet Beschriftungen ab", () => {
    const property = mapRowToProperty(propertyRow);
    assert.equal(property.slug, "haus");
    assert.equal(property.livingSpace, 171.31);
    assert.equal(property.statusLabel, "Zu verkaufen");
    assert.match(property.priceLabel, /420\.000/u);
    assert.equal(property.heroNote, undefined);
  });

  it("fängt einen unbekannten Status ab, statt eine leere Beschriftung zu zeigen", () => {
    const property = mapRowToProperty({ ...propertyRow, status: "irgendwas" });
    assert.equal(property.status, "zu-verkaufen");
    assert.equal(property.statusLabel, "Zu verkaufen");
  });

  it("erkennt verkaufte und reservierte Objekte", () => {
    assert.equal(mapRowToProperty({ ...propertyRow, status: "verkauft" }).statusLabel, "Verkauft");
    assert.equal(mapRowToProperty({ ...propertyRow, status: "reserviert" }).statusLabel, "Reserviert");
  });

  it("wandelt numerische Spalten um, die Postgres als Text liefert", () => {
    const property = mapRowToProperty({
      ...propertyRow,
      price: "420000.00" as unknown as number,
      living_space: "171.31" as unknown as number,
      rooms: "6" as unknown as number,
    });
    assert.equal(property.price, 420000);
    assert.equal(property.livingSpace, 171.31);
    assert.equal(property.rooms, 6);
  });

  it("ersetzt fehlende Listenspalten durch leere Listen", () => {
    const property = mapRowToProperty({
      ...propertyRow,
      images: null as unknown as string[],
      description: null as unknown as string[],
      equipment: null as unknown as string[],
      features: null as unknown as never,
      energy: null as unknown as never,
    });
    assert.deepEqual(property.images, []);
    assert.deepEqual(property.description, []);
    assert.deepEqual(property.equipment, []);
    assert.deepEqual(property.features, []);
    assert.deepEqual(property.energy, []);
  });
});

const referenceRow = {
  id: "r1",
  slug: "haus-schlebusch",
  title: "Einfamilienhaus",
  region: "Leverkusen – Schlebusch",
  category: "verkauf",
  type_label: "Einfamilienhaus",
  living_space: 120,
  rooms: 5,
  year: 1968,
  plot: 420,
  parking: 2,
  images: [],
  summary: "Kurz",
  description: ["Absatz"],
  equipment: ["Keller"],
  location: "Schlebusch",
  published: true,
  sort_order: 0,
  created_at: "2026-01-01T00:00:00Z",
  updated_at: "2026-01-01T00:00:00Z",
} as unknown as Parameters<typeof mapRowToReference>[0];

describe("mapRowToReference", () => {
  it("leitet die Statusbeschriftung aus der Kategorie ab", () => {
    assert.equal(mapRowToReference(referenceRow).categoryLabel, "Verkauft");
    assert.equal(
      mapRowToReference({ ...referenceRow, category: "vermietet" }).categoryLabel,
      "Vermietet"
    );
  });

  it("fällt bei unbekannter Kategorie auf Verkauf zurück", () => {
    const reference = mapRowToReference({ ...referenceRow, category: "unsinn" });
    assert.equal(reference.category, "verkauf");
    assert.equal(reference.categoryLabel, "Verkauft");
  });

  it("macht aus NULL-Spalten undefined, damit die UI sie weglässt", () => {
    const reference = mapRowToReference({
      ...referenceRow,
      year: null,
      plot: null,
      parking: null,
    });
    assert.equal(reference.year, undefined);
    assert.equal(reference.plot, undefined);
    assert.equal(reference.parking, undefined);
  });

  it("unterscheidet ein Grundstück von 0 m² von „nicht angegeben“", () => {
    assert.equal(mapRowToReference({ ...referenceRow, plot: 0 }).plot, 0);
  });
});
