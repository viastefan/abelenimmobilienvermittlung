import Image from "next/image";
import { trustBadges } from "@/data/site";
import { brandMedia } from "@/data/wix-media";

/**
 * Qualifikationsnachweise, wie sie der bisherige Auftritt zeigt: das
 * Sprengnetter-Siegel auf einer weißen Karte, die Plakette von ImmoScout24
 * frei daneben. Beide Grafiken enthalten ihre Beschriftung selbst — eine
 * zweite Zeile daneben würde dieselbe Aussage doppeln.
 */
export function TrustBadges({ className = "" }: { className?: string }) {
  return (
    <ul className={`flex flex-wrap items-center gap-3 sm:gap-4 ${className}`}>
      {trustBadges.map((badge) => {
        const src = brandMedia[badge.key];

        if (badge.shape === "lockup") {
          return (
            <li
              key={badge.key}
              className="flex items-center rounded-full bg-white/95 px-6 py-3.5 shadow-lift ring-1 ring-white/40 backdrop-blur"
            >
              <Image
                src={src}
                alt={badge.alt}
                width={badge.width}
                height={badge.height}
                className="h-14 w-auto sm:h-[4.25rem]"
              />
            </li>
          );
        }

        return (
          <li key={badge.key} className="flex items-center">
            <Image
              src={src}
              alt={badge.alt}
              width={badge.width}
              height={badge.height}
              className="h-[4.75rem] w-auto sm:h-[5.5rem]"
            />
          </li>
        );
      })}
    </ul>
  );
}
