export type RegionPoint = {
  label: string;
  x: number;
  y: number;
  home?: boolean;
};

/**
 * Stylised, non-geodetic layout used for the abstract region map — relative
 * positions approximate real geography without claiming cartographic
 * accuracy.
 */
export const regionMapPoints: RegionPoint[] = [
  { label: "Düsseldorf", x: 10, y: 36 },
  { label: "Kreis Mettmann", x: 27, y: 27 },
  { label: "Leverkusen", x: 29, y: 54 },
  { label: "Leichlingen", x: 46, y: 60, home: true },
  { label: "Burscheid", x: 59, y: 53 },
  { label: "Solingen", x: 47, y: 79 },
  { label: "Remscheid", x: 63, y: 83 },
  { label: "Wermelskirchen", x: 70, y: 63 },
  { label: "Wuppertal", x: 72, y: 38 },
];
