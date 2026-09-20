"use client";

import { useEffect, useRef, useState } from "react";
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
 *
 * Die Bewegung erklärt die Karte, statt sie zu schmücken: erst zieht sich
 * die Grenze des Gebiets, dann setzen sich die Orte hinein — von Leverkusen
 * aus nach außen, in der Reihenfolge ihrer Entfernung. Sie läuft einmal,
 * beim ersten Erscheinen, und gar nicht, wenn das Gerät auf weniger
 * Bewegung eingestellt ist.
 */
export function ServiceAreaMap({ className = "" }: { className?: string }) {
  const places = projectPlaces(WIDTH, HEIGHT, PADDING);
  const umriss = hull(places);
  const pfad = umriss.map((p) => `${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(" ");

  // Umfang des Umrisses — die Linie zeichnet sich über genau diese Länge.
  const umfang = umriss.reduce((summe, punkt, i) => {
    const naechster = umriss[(i + 1) % umriss.length]!;
    return summe + Math.hypot(naechster.x - punkt.x, naechster.y - punkt.y);
  }, 0);

  // Die Orte setzen sich von der Mitte des Gebiets nach außen.
  const mitte = places.find((p) => p.focus) ?? places[0]!;
  const reihenfolge = new Map(
    [...places]
      .sort((a, b) => Math.hypot(a.x - mitte.x, a.y - mitte.y) - Math.hypot(b.x - mitte.x, b.y - mitte.y))
      .map((p, i) => [p.name, i])
  );

  const ref = useRef<HTMLElement | null>(null);
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
      { threshold: 0.25 }
    );
    beobachter.observe(node);
    // Nie unsichtbar bleiben, falls der Beobachter nicht anschlägt.
    const rettung = setTimeout(() => {
      setLaeuft(true);
      beobachter.disconnect();
    }, 2200);
    return () => {
      clearTimeout(rettung);
      beobachter.disconnect();
    };
  }, []);

  return (
    <figure
      ref={ref}
      data-laeuft={laeuft ? "" : undefined}
      className={`group/karte overflow-hidden rounded-[24px] bg-surface-mist ring-1 ring-border ${className}`}
    >
      <svg
        viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
        className="h-auto w-full"
        role="img"
        aria-label={`Tätigkeitsgebiet: ${places.map((p) => p.name).join(", ")}`}
      >
        <style>{`
          .k-grenze { stroke-dasharray: ${umfang.toFixed(0)}; stroke-dashoffset: ${umfang.toFixed(0)}; }
          .k-flaeche, .k-ort { opacity: 0; }
          [data-laeuft] .k-grenze {
            animation: k-ziehen 1500ms cubic-bezier(0.22, 1, 0.36, 1) forwards;
          }
          [data-laeuft] .k-flaeche {
            animation: k-auf 900ms cubic-bezier(0.22, 1, 0.36, 1) 700ms forwards;
          }
          [data-laeuft] .k-ort {
            animation: k-setzen 620ms cubic-bezier(0.22, 1, 0.36, 1) forwards;
          }
          [data-laeuft] .k-puls { animation: k-atmen 3400ms ease-in-out 2200ms infinite; }
          @keyframes k-ziehen { to { stroke-dashoffset: 0; } }
          @keyframes k-auf { to { opacity: 1; } }
          @keyframes k-setzen {
            from { opacity: 0; transform: translateY(7px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes k-atmen {
            0%, 100% { opacity: 0.16; transform: scale(1); }
            50% { opacity: 0.30; transform: scale(1.14); }
          }
          @media (prefers-reduced-motion: reduce) {
            .k-grenze { stroke-dashoffset: 0; }
            .k-flaeche, .k-ort { opacity: 1; }
            [data-laeuft] .k-grenze,
            [data-laeuft] .k-flaeche,
            [data-laeuft] .k-ort,
            [data-laeuft] .k-puls { animation: none; }
          }
        `}</style>

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

        {/* Erst die Fläche, dann die Grenze darüber — sonst deckt die Füllung
            den Strich beim Zeichnen zur Hälfte zu. */}
        <polygon className="k-flaeche" points={pfad} fill="url(#gebiet)" />
        <polygon
          className="k-grenze"
          points={pfad}
          fill="none"
          stroke="#1C8480"
          strokeWidth="2"
          strokeLinejoin="round"
        />

        {places.map((place) => {
          const gross = place.focus || place.seat;
          const stufe = reihenfolge.get(place.name) ?? 0;
          return (
            <g
              key={place.name}
              className="k-ort"
              style={{ animationDelay: `${900 + stufe * 105}ms`, transformBox: "fill-box", transformOrigin: "center" }}
            >
              {place.focus && (
                <circle
                  className="k-puls"
                  cx={place.x}
                  cy={place.y}
                  r="17"
                  fill="#1C8480"
                  opacity="0.16"
                  style={{ transformBox: "fill-box", transformOrigin: "center" }}
                />
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
