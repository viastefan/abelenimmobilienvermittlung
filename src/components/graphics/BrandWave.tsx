/**
 * Die Wellen aus der Bildmarke — dieselben Linien, die unter dem Haus im
 * Logo stehen.
 *
 * Sie kehren als Akzent unter den Überschriften wieder und schließen den
 * Zusagen-Abschnitt ab. Das ist das eine Zeichen, das diesen Auftritt von
 * jedem anderen unterscheidet: ein Symbol in einer runden Kachel hat jede
 * Website, diese Welle nur diese hier.
 *
 * Der Bogen behält überall das Seitenverhältnis der Marke — dort ist er so
 * breit wie ein Siebtel des Zeichens und halb so hoch. Gedrängter gerät er
 * zur Zickzacklinie und sieht nicht mehr nach Wasser aus.
 */

export function BrandWave({ className = "", width = 68 }: { className?: string; width?: number }) {
  return (
    <svg
      viewBox="0 0 68 14"
      width={width}
      height={(width / 68) * 14}
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <path
        d="M0 8.5q8.5-8.3 17 0t17 0t17 0t17 0"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/**
 * Dieselbe Welle über die volle Breite. Sie wird gekachelt, nicht gedehnt —
 * gedehnt zöge es die Strichstärke mit in die Breite.
 */
export function BrandWaveRule({ className = "" }: { className?: string }) {
  return (
    <svg className={`h-[22px] w-full ${className}`} aria-hidden="true">
      <defs>
        <pattern id="abelen-welle" width="56" height="22" patternUnits="userSpaceOnUse">
          <path
            d="M0 13.5q14-13.7 28 0t28 0"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </pattern>
      </defs>
      <rect width="100%" height="22" fill="url(#abelen-welle)" />
    </svg>
  );
}
