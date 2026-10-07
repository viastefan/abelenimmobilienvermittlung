"use client";

import { useState } from "react";
import { Star } from "lucide-react";
import { useGeaendert } from "./Formular";

function anzeigen(wert: number) {
  return wert.toLocaleString("de-DE", { minimumFractionDigits: wert % 1 ? 1 : 0, maximumFractionDigits: 1 });
}

/**
 * Sterne zum Antippen. Eine übernommene Bewertung wie 4,8 bleibt genau so
 * stehen, bis ein Stern angetippt wird — die Website zeigt sie wie der
 * bisherige Auftritt, mit anteilig gefülltem letzten Stern.
 */
export function Sterne({ name, anfangs }: { name: string; anfangs?: number }) {
  const [wert, setWert] = useState<number | undefined>(anfangs);
  const [zeige, setZeige] = useState<number | undefined>();
  const geaendert = useGeaendert();
  const sichtbar = zeige ?? wert ?? 0;

  return (
    <div>
      <input type="hidden" name={name} value={wert ?? ""} />
      <div className="flex items-center gap-4">
        <div className="flex" role="radiogroup" aria-label="Bewertung" onMouseLeave={() => setZeige(undefined)}>
          {[1, 2, 3, 4, 5].map((stern) => {
            const fuellung = Math.max(0, Math.min(1, sichtbar - (stern - 1))) * 100;
            return (
              <button
                key={stern}
                type="button"
                role="radio"
                aria-checked={wert === stern}
                aria-label={`${stern} ${stern === 1 ? "Stern" : "Sterne"}`}
                onMouseEnter={() => setZeige(stern)}
                onClick={() => {
                  setWert(stern);
                  geaendert();
                }}
                className="relative p-1 transition-transform duration-150 hover:scale-110 active:scale-95"
              >
                <Star className="h-8 w-8 text-[#E3E8EC]" fill="currentColor" strokeWidth={0} aria-hidden="true" />
                <span className="absolute left-1 top-1 h-8 overflow-hidden" style={{ width: `${(fuellung / 100) * 2}rem` }}>
                  <Star className="h-8 w-8 max-w-none text-amber-400" fill="currentColor" strokeWidth={0} aria-hidden="true" />
                </span>
              </button>
            );
          })}
        </div>
        <span className="font-display text-[1.125rem] font-bold tabular-nums text-ink">
          {wert ? (
            <>
              {anzeigen(wert)} <span className="text-[0.875rem] font-medium text-text-muted">von 5</span>
            </>
          ) : (
            <span className="text-[0.9375rem] font-medium text-text-subtle">Keine Bewertung</span>
          )}
        </span>
      </div>
      {wert !== undefined && (
        <button
          type="button"
          onClick={() => {
            setWert(undefined);
            geaendert();
          }}
          className="mt-2 text-[0.8125rem] font-semibold text-text-muted underline-offset-4 hover:text-ink hover:underline"
        >
          Bewertung entfernen
        </button>
      )}
    </div>
  );
}
