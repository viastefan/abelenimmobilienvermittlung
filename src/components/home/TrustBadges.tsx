"use client";

import { useState } from "react";
import { trustBadges } from "@/data/site";
import { brandMedia } from "@/data/wix-media";
import { PhotoImage } from "@/components/graphics/PhotoImage";

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
        <TrustBadge key={badge.key} badge={badge} />
      ))}
    </ul>
  );
}

/**
 * Ein Nachweis verschwindet ganz, wenn seine Grafik nicht lädt: Die Aussage
 * steckt im Bild: eine leere weiße Kachel behauptete ein Siegel, das
 * niemand sieht.
 */
function TrustBadge({ badge }: { badge: (typeof trustBadges)[number] }) {
  const [failed, setFailed] = useState(false);
  if (failed) return null;

  return (
    <li className="flex items-center justify-center rounded-[24px] bg-white/95 px-4 py-3 shadow-lift backdrop-blur sm:rounded-[24px] sm:px-6 sm:py-4">
      <PhotoImage
        src={brandMedia[badge.key]}
        alt={badge.alt}
        width={badge.width}
        height={badge.height}
        className="h-12 w-auto sm:h-16 lg:h-[4.5rem]"
        onFailed={() => setFailed(true)}
      />
    </li>
  );
}
