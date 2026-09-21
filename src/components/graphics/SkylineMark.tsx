/**
 * Häuserzeile über Wasser — die Marke als Bild gelesen.
 *
 * Das Zeichen des Büros ist ein Haus über drei Wellen. Hier wächst es zu
 * einer Zeile aus Dächern über derselben Bewegung: dasselbe Motiv, nur
 * weitergedacht, und damit etwas, das an dieser Stelle Immobilien meint
 * und nicht irgendein Muster.
 *
 * Sie liegt hinter dem Inhalt und ist bewusst schwach gezeichnet — wer sie
 * ansieht, soll sie bemerken, wer den Text liest, nicht.
 */
export function SkylineMark({ className = "" }: { className?: string }) {
  // Dächer unterschiedlicher Höhe und Breite: eine gewachsene Zeile, keine
  // Reihenhaussiedlung.
  const haeuser = [
    { x: 8, breite: 52, hoehe: 62, first: 26 },
    { x: 66, breite: 40, hoehe: 44, first: 20 },
    { x: 112, breite: 62, hoehe: 78, first: 30 },
    { x: 180, breite: 44, hoehe: 52, first: 22 },
    { x: 230, breite: 56, hoehe: 68, first: 27 },
    { x: 292, breite: 38, hoehe: 40, first: 19 },
  ];
  const boden = 132;

  return (
    <svg
      viewBox="0 0 340 190"
      className={className}
      fill="none"
      aria-hidden="true"
      preserveAspectRatio="xMidYMid meet"
    >
      {haeuser.map((h) => {
        const dachBasis = boden - h.hoehe;
        return (
          <g key={h.x} stroke="currentColor" strokeWidth="2.4" strokeLinejoin="round" strokeLinecap="round">
            {/* Wände */}
            <path d={`M${h.x} ${boden} V${dachBasis}`} />
            <path d={`M${h.x + h.breite} ${boden} V${dachBasis}`} />
            {/* Dach */}
            <path d={`M${h.x - 4} ${dachBasis} L${h.x + h.breite / 2} ${dachBasis - h.first} L${h.x + h.breite + 4} ${dachBasis}`} />
          </g>
        );
      })}

      {/* Die drei Wellen der Marke, unter der Zeile. */}
      {[146, 160, 174].map((y, i) => {
        const seg = 22 + i * 4;
        const start = 4 + i * 9;
        return (
          <path
            key={y}
            d={`M${start} ${y} q ${seg / 2} -9 ${seg} 0 t ${seg} 0 t ${seg} 0 t ${seg} 0 t ${seg} 0 t ${seg} 0`}
            stroke="currentColor"
            strokeWidth="2.4"
            strokeLinecap="round"
          />
        );
      })}
    </svg>
  );
}
