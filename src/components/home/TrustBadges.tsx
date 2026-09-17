import Image from "next/image";
import { trustBadges } from "@/data/site";
import { brandMedia } from "@/data/wix-media";

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
      {trustBadges.map((badge) => {
        const bild = (
          <Image
            src={brandMedia[badge.key]}
            alt={badge.alt}
            width={badge.width}
            height={badge.height}
            className="h-12 w-auto sm:h-[3.75rem] lg:h-16"
          />
        );

        return badge.shape === "lockup" ? (
          <li key={badge.key} className="flex rounded-[8px] bg-white p-[2px] shadow-soft">
            {bild}
          </li>
        ) : (
          <li key={badge.key} className="flex">
            {bild}
          </li>
        );
      })}
    </ul>
  );
}
