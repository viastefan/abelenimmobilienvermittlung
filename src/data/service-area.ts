/**
 * Das Tätigkeitsgebiet als Orte mit Lage.
 *
 * Die neun Orte sind dieselben, die der bisherige Auftritt nennt. Die
 * Koordinaten stehen dabei, damit die Karte gezeichnet und nicht gemalt
 * wird: die Punkte sitzen dort, wo die Orte wirklich liegen, und
 * verschieben sich mit, wenn ein Ort dazukommt oder wegfällt.
 */
export type ServicePlace = {
  name: string;
  lat: number;
  lon: number;
  /** Der Ort des Büros — er wird hervorgehoben. */
  seat?: boolean;
  /** Der namengebende Schwerpunkt des Gebiets. */
  focus?: boolean;
  /**
   * Wo der Name am Punkt steht. Üblich ist darüber; wo ein Nachbar zu nah
   * liegt, weicht er zur Seite aus — so wie auf jeder gedruckten Karte.
   */
  beschriftung?: "links";
};

export const servicePlaces: ServicePlace[] = [
  { name: "Düsseldorf", lat: 51.2277, lon: 6.7735 },
  { name: "Kreis Mettmann", lat: 51.2512, lon: 6.9748 },
  { name: "Wuppertal", lat: 51.2562, lon: 7.1508 },
  // Remscheid liegt auf fast gleicher Höhe dicht daneben — am Telefon
  // träfen sich die beiden Namen über den Punkten.
  { name: "Solingen", lat: 51.1712, lon: 7.0837, beschriftung: "links" },
  { name: "Remscheid", lat: 51.1797, lon: 7.1968 },
  { name: "Wermelskirchen", lat: 51.1386, lon: 7.2191 },
  { name: "Burscheid", lat: 51.0881, lon: 7.1189 },
  { name: "Leichlingen", lat: 51.1058, lon: 7.0172, seat: true },
  { name: "Leverkusen", lat: 51.0333, lon: 6.9872, focus: true },
];

/**
 * Bildet Längen- und Breitengrad auf eine Zeichenfläche ab.
 *
 * Auf dieser Ausdehnung — gut dreißig Kilometer — genügt eine ebene
 * Abbildung; nur der Längengrad wird mit dem Kosinus der Breite gestaucht,
 * sonst zöge die Karte in die Breite.
 */
export function projectPlaces(width: number, height: number, padding: number) {
  const latMid = (Math.min(...servicePlaces.map((p) => p.lat)) + Math.max(...servicePlaces.map((p) => p.lat))) / 2;
  const kx = Math.cos((latMid * Math.PI) / 180);

  const xs = servicePlaces.map((p) => p.lon * kx);
  const ys = servicePlaces.map((p) => p.lat);
  const [minX, maxX] = [Math.min(...xs), Math.max(...xs)];
  const [minY, maxY] = [Math.min(...ys), Math.max(...ys)];

  // Ein Maßstab für beide Achsen, damit das Gebiet nicht verzerrt.
  const scale = Math.min((width - padding * 2) / (maxX - minX), (height - padding * 2) / (maxY - minY));
  const offsetX = (width - (maxX - minX) * scale) / 2;
  const offsetY = (height - (maxY - minY) * scale) / 2;

  return servicePlaces.map((place) => ({
    ...place,
    x: (place.lon * kx - minX) * scale + offsetX,
    // Norden liegt oben, die Bildachse zählt nach unten.
    y: (maxY - place.lat) * scale + offsetY,
  }));
}

/** Umschließt die Orte — die Fläche, die auf der Karte gekennzeichnet wird. */
export function hull(points: { x: number; y: number }[]) {
  const sorted = [...points].sort((a, b) => a.x - b.x || a.y - b.y);
  const cross = (o: { x: number; y: number }, a: { x: number; y: number }, b: { x: number; y: number }) =>
    (a.x - o.x) * (b.y - o.y) - (a.y - o.y) * (b.x - o.x);

  const half = (input: typeof sorted) => {
    const out: typeof sorted = [];
    for (const p of input) {
      while (out.length >= 2) {
        const vorletzt = out[out.length - 2];
        const letzt = out[out.length - 1];
        if (!vorletzt || !letzt || cross(vorletzt, letzt, p) > 0) break;
        out.pop();
      }
      out.push(p);
    }
    out.pop();
    return out;
  };

  return [...half(sorted), ...half([...sorted].reverse())];
}
