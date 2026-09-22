"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Ein Haus, das sich selbst zeichnet.
 *
 * Das Zeichen des Büros ist ein Haus über drei Wellen. Hier entsteht es
 * Strich für Strich, sobald der Abschnitt ins Bild kommt: erst der Boden,
 * dann die Wände, das Dach, die Öffnungen, zuletzt das Wasser darunter. Es
 * läuft einmal und hört dann auf — eine Zeichnung, die sich wiederholt,
 * wird zur Werbetafel.
 *
 * Gezeichnet wird mit `pathLength="1"`: jede Linie gilt als gleich lang,
 * damit ein kurzer Strich nicht schneller fertig ist als ein langer.
 */

/** Wände und Boden. */
const BODEN = 170;
const WAND_LINKS = 70;
const WAND_RECHTS = 210;
const WAND_OBEN = 100;
/** Das Dach steht über die Wände hinaus — sonst sieht es aufgesetzt aus. */
const DACH_LINKS = 56;
const DACH_RECHTS = 224;
const FIRST_X = 140;
const FIRST_Y = 52;

type Strich = { d: string; ab: number };

const striche: Strich[] = [
  // Boden
  { d: `M${DACH_LINKS} ${BODEN} H${DACH_RECHTS}`, ab: 0 },
  // Wände
  { d: `M${WAND_LINKS} ${BODEN} V${WAND_OBEN}`, ab: 110 },
  { d: `M${WAND_RECHTS} ${BODEN} V${WAND_OBEN}`, ab: 170 },
  // Dach
  { d: `M${DACH_LINKS} ${WAND_OBEN} L${FIRST_X} ${FIRST_Y} L${DACH_RECHTS} ${WAND_OBEN}`, ab: 260 },
  // Schornstein auf der rechten Dachfläche
  { d: "M186 79 V56 H198 V85", ab: 520 },
  // Tür
  { d: "M126 170 V128 H154 V170", ab: 620 },
  // Fenster links
  { d: "M88 116 H114 V142 H88 Z", ab: 700 },
  { d: "M101 116 V142 M88 129 H114", ab: 800 },
  // Fenster rechts
  { d: "M166 116 H192 V142 H166 Z", ab: 760 },
  { d: "M179 116 V142 M166 129 H192", ab: 860 },
];

/** Die drei Wellen der Marke, unter dem Haus. */
const wellen: Strich[] = [184, 196, 208].map((y, i) => {
  const seg = 40 + i * 6;
  const start = 16 + i * 7;
  return {
    d: `M${start} ${y} q ${seg / 2} -10 ${seg} 0 t ${seg} 0 t ${seg} 0 t ${seg} 0 t ${seg} 0`,
    ab: 900 + i * 110,
  };
});

export function HouseDraw({ className = "" }: { className?: string }) {
  const ref = useRef<SVGSVGElement | null>(null);
  const [zeichnen, setZeichnen] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (typeof IntersectionObserver === "undefined") {
      setZeichnen(true);
      return;
    }

    const beobachter = new IntersectionObserver(
      ([eintrag]) => {
        if (eintrag && eintrag.isIntersecting) {
          setZeichnen(true);
          beobachter.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    beobachter.observe(node);

    // Rückfallebene: die Zeichnung darf nie unsichtbar bleiben, nur weil der
    // Beobachter nicht anschlägt — sonst steht dort eine leere Fläche.
    const notnagel = setTimeout(() => {
      setZeichnen(true);
      beobachter.disconnect();
    }, 2500);

    return () => {
      clearTimeout(notnagel);
      beobachter.disconnect();
    };
  }, []);

  return (
    <svg
      ref={ref}
      viewBox="0 0 300 220"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      preserveAspectRatio="xMidYMid meet"
    >
      {[...striche, ...wellen].map((strich) => (
        <path
          key={strich.d}
          d={strich.d}
          pathLength={1}
          className={`draw ${zeichnen ? "draw-on" : ""}`}
          style={{ animationDelay: `${strich.ab}ms` }}
        />
      ))}

      {/* Der Türgriff — der letzte Punkt, der gesetzt wird. */}
      <circle
        cx="147"
        cy="151"
        r="2.4"
        pathLength={1}
        className={`draw ${zeichnen ? "draw-on" : ""}`}
        style={{ animationDelay: "1240ms" }}
      />
    </svg>
  );
}
