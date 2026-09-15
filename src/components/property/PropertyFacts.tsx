import { Car, DoorOpen, LandPlot, MapPin, Ruler } from "lucide-react";

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
 */
export function PropertyFacts({
  facts,
  className = "",
}: {
  facts: PropertyFact[];
  className?: string;
}) {
  return (
    <dl className={`grid grid-cols-2 gap-x-5 gap-y-4 ${className}`}>
      {facts.map((fact) => {
        const Icon = factIcons[fact.icon];
        return (
          <div key={fact.label} className="flex items-start gap-3">
            <Icon
              className="mt-0.5 h-4 w-4 shrink-0 text-accent-mid"
              strokeWidth={1.7}
              aria-hidden="true"
            />
            <div className="min-w-0">
              <dt className="text-[0.75rem] font-medium text-text-subtle">{fact.label}</dt>
              <dd className="mt-0.5 font-display text-[0.9375rem] font-bold text-ink">
                {fact.value}
              </dd>
            </div>
          </div>
        );
      })}
    </dl>
  );
}
