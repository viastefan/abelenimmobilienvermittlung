"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

/**
 * Der Blätterpfeil einer Diashow: Milchglas auf dem Bild, wie man es von
 * Apple kennt. Er bleibt sichtbar — ein Bedienelement, das erst beim
 * Überfahren erscheint, findet auf dem Telefon niemand.
 */
export function SlideArrow({
  direction,
  subject,
  active = true,
  onClick,
}: {
  direction: "prev" | "next";
  /** Wovon geblättert wird, etwa „Objekt“ oder „Bild“. */
  subject: string;
  /** Außerhalb der sichtbaren Aufnahme bleibt der Pfeil aus der Tabreihenfolge. */
  active?: boolean;
  onClick: () => void;
}) {
  const Icon = direction === "prev" ? ChevronLeft : ChevronRight;
  return (
    <button
      type="button"
      onClick={(event) => {
        // Diashows liegen oft in einer verlinkten Karte — der Klick auf den
        // Pfeil darf diesen Link nicht auslösen.
        event.preventDefault();
        event.stopPropagation();
        onClick();
      }}
      tabIndex={active ? 0 : -1}
      aria-label={`${direction === "prev" ? "Vorheriges" : "Nächstes"} ${subject}`}
      className="flex h-11 w-11 items-center justify-center rounded-full bg-white/85 text-ink shadow-lift backdrop-blur transition-all duration-300 ease-smooth hover:scale-105 hover:bg-white active:scale-95"
    >
      <Icon className="h-5 w-5" strokeWidth={2} aria-hidden="true" />
    </button>
  );
}
