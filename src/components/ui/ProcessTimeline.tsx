"use client";

import { useEffect, useRef, useState } from "react";
import type { Step } from "@/data/process";

/**
 * Der Ablauf als Achse.
 *
 * Vorher standen die Schritte als Kacheln in einem Raster — dort liest man
 * sie als Aufzählung, nicht als Reihenfolge, und bei sieben Schritten bricht
 * das Raster mitten im Weg um. Untereinander an einer Linie ist die Abfolge
 * die Form selbst: oben fängt es an, unten ist es fertig.
 *
 * Jeder Schritt bleibt flach, weil Titel und Beschreibung am Rechner
 * nebeneinander stehen; sieben Schritte brauchen so kaum mehr Platz als das
 * Raster vorher.
 *
 * Die Linie wächst beim ersten Erscheinen von oben nach unten mit, die
 * Nummern setzen sich darauf. Das läuft einmal — und gar nicht, wenn das
 * Gerät auf weniger Bewegung eingestellt ist.
 */
export function ProcessTimeline({ steps }: { steps: Step[] }) {
  const ref = useRef<HTMLOListElement | null>(null);
  const [laeuft, setLaeuft] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node || typeof IntersectionObserver === "undefined") {
      setLaeuft(true);
      return;
    }
    const beobachter = new IntersectionObserver(
      ([eintrag]) => {
        if (eintrag?.isIntersecting) {
          setLaeuft(true);
          beobachter.disconnect();
        }
      },
      { threshold: 0.12 }
    );
    beobachter.observe(node);
    const rettung = setTimeout(() => {
      setLaeuft(true);
      beobachter.disconnect();
    }, 2200);
    return () => {
      clearTimeout(rettung);
      beobachter.disconnect();
    };
  }, []);

  // Die Linie braucht so lange, wie alle Nummern zusammen zum Setzen
  // brauchen — sonst steht sie fertig da, bevor der letzte Schritt kommt.
  const dauer = 420 + steps.length * 170;

  return (
    <ol ref={ref} data-laeuft={laeuft ? "" : undefined} className="group/ablauf relative mt-12">
      <style>{`
        .a-linie { transform: scaleY(0); transform-origin: top; }
        .a-schritt { opacity: 0; transform: translateY(10px); }
        [data-laeuft] .a-linie {
          transition: transform ${dauer}ms cubic-bezier(0.33, 1, 0.68, 1);
          transform: scaleY(1);
        }
        [data-laeuft] .a-schritt {
          animation: a-setzen 560ms cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }
        @keyframes a-setzen { to { opacity: 1; transform: translateY(0); } }
        @media (prefers-reduced-motion: reduce) {
          .a-linie { transform: scaleY(1); }
          .a-schritt { opacity: 1; transform: none; }
          [data-laeuft] .a-linie { transition: none; }
          [data-laeuft] .a-schritt { animation: none; }
        }
      `}</style>

      {/* Die Achse selbst: sie läuft durch die Mitte der Nummernkreise. */}
      <span
        aria-hidden="true"
        className="a-linie absolute left-[1.3125rem] top-3 h-[calc(100%-2.5rem)] w-[2px] rounded-full bg-gradient-to-b from-accent via-accent-light to-transparent sm:left-[1.4375rem]"
      />

      {steps.map((step, index) => (
        <li
          key={step.number}
          className="a-schritt relative grid grid-cols-[2.75rem_minmax(0,1fr)] gap-x-5 pb-9 last:pb-0 sm:grid-cols-[3rem_minmax(0,1fr)] lg:grid-cols-[3rem_minmax(0,0.52fr)_minmax(0,1.48fr)] lg:gap-x-8"
          style={{ animationDelay: `${240 + index * 150}ms` }}
        >
          <span className="relative z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white font-display text-[0.875rem] font-extrabold tabular-nums text-accent-deep shadow-soft ring-1 ring-accent-light sm:h-12 sm:w-12 sm:text-[0.9375rem]">
            {step.number}
          </span>

          <h3 className="self-center font-display text-[1.0625rem] font-bold leading-snug text-ink lg:text-[1.125rem]">
            {step.title}
          </h3>

          <p className="pretty col-start-2 mt-2 text-[0.9375rem] leading-relaxed text-text-muted lg:col-start-3 lg:mt-0 lg:self-center">
            {step.description}
          </p>
        </li>
      ))}
    </ol>
  );
}
