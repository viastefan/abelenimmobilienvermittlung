import Image from "next/image";
import { trustBadges } from "@/data/site";
import { brandMedia } from "@/data/wix-media";

/**
 * Qualifikationsnachweise, wie sie der bisherige Auftritt zeigt. Beide
 * Grafiken enthalten ihre Beschriftung selbst — eine zweite Zeile daneben
 * würde dieselbe Aussage doppeln.
 *
 * Beide sitzen auf derselben hellen Fläche und in derselben Höhe. Frei auf
 * dem Foto stehend gehen sie auf dem Telefon unter; nebeneinander in
 * ungleichen Größen sehen sie nach Zufall aus, nicht nach Nachweis.
 */
export function TrustBadges({ className = "" }: { className?: string }) {
  return (
    <ul className={`flex flex-wrap items-stretch gap-2.5 sm:gap-3 ${className}`}>
      {trustBadges.map((badge) => (
        <li
          key={badge.key}
          className="flex items-center justify-center rounded-[24px] bg-white/95 px-4 py-3 shadow-lift backdrop-blur sm:rounded-[24px] sm:px-6 sm:py-4"
        >
          <Image
            src={brandMedia[badge.key]}
            alt={badge.alt}
            width={badge.width}
            height={badge.height}
            className="h-12 w-auto sm:h-16 lg:h-[4.5rem]"
          />
        </li>
      ))}
    </ul>
  );
}
