import type { ReactNode } from "react";
import { Car, DoorOpen, LandPlot, MapPin, Ruler } from "lucide-react";
import { zusammenhalten } from "@/lib/typografie";

/**
 * Die Symbole liegen hier, nicht bei den Daten: eine Komponente lässt sich
 * nicht vom Server an den Browser weiterreichen, ein Name schon.
 */
const factIcons = {
  ort: MapPin,
  zimmer: DoorOpen,
  flaeche: Ruler,
  grundstueck: LandPlot,
  stellplatz: Car,
} as const;

export type PropertyFact = {
  icon: keyof typeof factIcons;
  label: string;
  value: string;
};

/**
 * Die Eckdaten eines Objekts. Jede Angabe trägt ihre Beschriftung — zwei
 * Quadratmeterzahlen nebeneinander sind ohne sie nicht auseinanderzuhalten.
 *
 * Jede Angabe sitzt in einem eigenen Feld. Frei im Text standen sie wie
 * verstreute Zeilen; gefasst liest man sie als das, was sie sind: die
 * Eckdaten auf einen Blick.
 */
export function PropertyFacts({
  facts,
  trailing,
  className = "",
}: {
  facts: PropertyFact[];
  /** Belegt das letzte Feld des Rasters, etwa mit dem Aufklapper. */
  trailing?: ReactNode;
  className?: string;
}) {
  return (
    <dl className={`grid grid-cols-2 gap-2.5 ${className}`}>
      {facts.map((fact) => {
        const Icon = factIcons[fact.icon];
        return (
          <div
            key={fact.label}
            className="flex items-start gap-3 rounded-[14px] bg-surface-warm px-3.5 py-3 ring-1 ring-border/70"
          >
            <span className="mt-[1px] flex h-7 w-7 shrink-0 items-center justify-center rounded-[10px] bg-white text-accent-deep ring-1 ring-border/70">
              <Icon className="h-[0.9375rem] w-[0.9375rem]" strokeWidth={1.7} aria-hidden="true" />
            </span>
            <div className="min-w-0">
              <dt className="text-[0.75rem] font-medium text-text-subtle">{fact.label}</dt>
              <dd className="mt-0.5 font-display text-[0.9375rem] font-bold leading-snug text-ink">
                {zusammenhalten(fact.value)}
              </dd>
            </div>
          </div>
        );
      })}
      {trailing}
    </dl>
  );
}
