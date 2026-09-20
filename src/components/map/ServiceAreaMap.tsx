import { projectPlaces, hull } from "@/data/service-area";

const WIDTH = 680;
const HEIGHT = 520;
const PADDING = 78;

/**
 * Karte des Tätigkeitsgebiets.
 *
 * Gezeichnet, nicht eingebettet: eine fremde Kartenanwendung lädt beim
 * Öffnen Daten von einem fremden Server und bräuchte dafür eine
 * Einwilligung — ohne sie bliebe an dieser Stelle eine graue Fläche. Hier
 * steht die Karte sofort, auf jedem Gerät, ohne Zustimmung und ohne dass
 * jemand mitliest.
 *
 * Die Punkte sitzen auf ihren echten Koordinaten, die gekennzeichnete
 * Fläche umschließt sie.
 */
export function ServiceAreaMap({ className = "" }: { className?: string }) {
  const places = projectPlaces(WIDTH, HEIGHT, PADDING);
  const umriss = hull(places);
  const pfad = umriss.map((p) => `${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(" ");

  return (
    <figure className={`overflow-hidden rounded-[24px] bg-surface-mist ring-1 ring-border ${className}`}>
      <svg
        viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
        className="h-auto w-full"
        role="img"
        aria-label={`Tätigkeitsgebiet: ${places.map((p) => p.name).join(", ")}`}
      >
        <defs>
          <linearGradient id="gebiet" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#65C6C7" stopOpacity="0.30" />
            <stop offset="100%" stopColor="#1C8480" stopOpacity="0.16" />
          </linearGradient>
          {/* Ein ruhiges Raster als Grund — es gibt der Fläche Tiefe, ohne
              eine Genauigkeit zu behaupten, die eine Skizze nicht hat. */}
          <pattern id="raster" width="34" height="34" patternUnits="userSpaceOnUse">
            <path d="M34 0H0V34" fill="none" stroke="#102B4E" strokeOpacity="0.05" strokeWidth="1" />
          </pattern>
        </defs>

        <rect width={WIDTH} height={HEIGHT} fill="url(#raster)" />

        {/* Das gekennzeichnete Gebiet. */}
        <polygon
          points={pfad}
          fill="url(#gebiet)"
          stroke="#1C8480"
          strokeWidth="2"
          strokeLinejoin="round"
          strokeDasharray="7 5"
        />

        {places.map((place) => {
          const gross = place.focus || place.seat;
          return (
            <g key={place.name}>
              {place.focus && (
                <circle cx={place.x} cy={place.y} r="17" fill="#1C8480" opacity="0.16" />
              )}
              <circle
                cx={place.x}
                cy={place.y}
                r={gross ? 7 : 5}
                fill={place.focus ? "#1C8480" : place.seat ? "#2E9D9C" : "#FFFFFF"}
                stroke={place.focus || place.seat ? "#FFFFFF" : "#1C8480"}
                strokeWidth={place.focus || place.seat ? 2.5 : 2}
              />
              <text
                x={place.x}
                y={place.y - (gross ? 17 : 13)}
                textAnchor="middle"
                className={`font-display ${gross ? "text-[15px] font-bold" : "text-[13px] font-semibold"}`}
                fill={gross ? "#102B4E" : "#465A6E"}
              >
                {place.name}
              </text>
              {place.seat && (
                <text
                  x={place.x}
                  y={place.y + 24}
                  textAnchor="middle"
                  className="text-[11px] font-semibold uppercase tracking-[0.1em]"
                  fill="#1C8480"
                >
                  Büro
                </text>
              )}
            </g>
          );
        })}
      </svg>
    </figure>
  );
}
