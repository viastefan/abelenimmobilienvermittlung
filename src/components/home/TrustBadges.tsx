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
 * Sie sind der einzige belegte Fremdnachweis auf der Startseite und stehen
 * deshalb groß genug, dass die Schrift im Siegel lesbar bleibt. Das
 * quergestreckte Siegel sitzt auf einer weißen Karte, die ihm Luft lässt;
 * die freigestellte Plakette von ImmoScout24 steht ohne Unterlage — eine
 * Fläche um eine Fläche sähe nach Aufkleber aus.
 */
export function TrustBadges({ className = "" }: { className?: string }) {
  return (
    <ul className={`flex flex-wrap items-center gap-4 sm:gap-5 ${className}`}>
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
      className="h-16 w-auto sm:h-[4.75rem] lg:h-[5.25rem]"
      onFailed={() => setFailed(true)}
    />
  );

  return badge.shape === "lockup" ? (
    <li className="flex rounded-[12px] bg-white px-3 py-2 shadow-lift">{bild}</li>
  ) : (
    <li className="flex">{bild}</li>
  );
}
