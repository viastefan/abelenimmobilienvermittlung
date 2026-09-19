"use client";

import { useState } from "react";
import { trustBadges } from "@/data/site";
import { brandMedia } from "@/data/wix-media";
import { PhotoImage } from "@/components/graphics/PhotoImage";

/**
 * Qualifikationsnachweise, wie sie der bisherige Auftritt zeigt. Beide
 * Grafiken tragen ihre Beschriftung selbst — eine zweite Zeile daneben
 * würde dieselbe Aussage doppeln.
 *
 * Das quergestreckte Siegel steht auf hellem Grund und braucht deshalb eine
 * weiße Unterlage, die es aber nur um zwei Pixel überragt. Die Plakette von
 * ImmoScout24 ist freigestellt und steht ohne Unterlage — eine Fläche um
 * eine Fläche sähe nach Aufkleber aus.
 */
export function TrustBadges({ className = "" }: { className?: string }) {
  return (
    <ul className={`flex flex-wrap items-center gap-3 sm:gap-4 ${className}`}>
      {trustBadges.map((badge) => (
        <TrustBadge key={badge.key} badge={badge} />
      ))}
    </ul>
  );
}

/**
 * Ein Nachweis verschwindet ganz, wenn seine Grafik nicht lädt: Die Aussage
 * steckt im Bild — eine leere weiße Kachel behauptete ein Siegel, das
 * niemand sieht.
 */
function TrustBadge({ badge }: { badge: (typeof trustBadges)[number] }) {
  const [failed, setFailed] = useState(false);
  if (failed) return null;

  const bild = (
    <PhotoImage
      src={brandMedia[badge.key]}
      alt={badge.alt}
      width={badge.width}
      height={badge.height}
      className="h-12 w-auto sm:h-[3.75rem] lg:h-16"
      onFailed={() => setFailed(true)}
    />
  );

  return badge.shape === "lockup" ? (
    <li className="flex rounded-[8px] bg-white p-[2px] shadow-soft">{bild}</li>
  ) : (
    <li className="flex">{bild}</li>
  );
}
