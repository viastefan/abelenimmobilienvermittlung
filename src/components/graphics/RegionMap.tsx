import { regionMapPoints } from "@/data/region-map";

export function RegionMap({ className = "" }: { className?: string }) {
  const home = regionMapPoints.find((p) => p.home) ?? regionMapPoints[0];

  return (
    <svg viewBox="0 0 100 100" className={className} role="img" aria-label="Übersichtskarte der betreuten Regionen im Rheinland">
      <title>Regionen im Rheinland</title>
      {regionMapPoints
        .filter((p) => !p.home)
        .map((p) => (
          <line
            key={`line-${p.label}`}
            x1={home!.x}
            y1={home!.y}
            x2={p.x}
            y2={p.y}
            stroke="currentColor"
            strokeOpacity="0.25"
            strokeWidth="0.3"
            strokeDasharray="1.2 1.6"
          />
        ))}
      {regionMapPoints.map((p) => (
        <g key={p.label}>
          <circle
            cx={p.x}
            cy={p.y}
            r={p.home ? 1.8 : 1.1}
            fill={p.home ? "currentColor" : "none"}
            stroke="currentColor"
            strokeWidth="0.4"
            className={p.home ? "text-accent" : "text-ink/70"}
          />
        </g>
      ))}
    </svg>
  );
}
