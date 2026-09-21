"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, MapPin, TrendingUp } from "lucide-react";
import { Sheet } from "@/components/ui/Sheet";
import { ServiceAreaMap } from "@/components/map/ServiceAreaMap";
import { servicePlaces } from "@/data/service-area";
import { site } from "@/data/site";

/**
 * Die beiden ständig erreichbaren Schaltflächen am unteren Rand: links das
 * Tätigkeitsgebiet, rechts die Frage nach dem Wert.
 *
 * Sie erscheinen erst, wenn der Aufmacher durchgescrollt ist. Gleich beim
 * Öffnen der Seite lägen sie über dem ersten Eindruck und über dem
 * Einwilligungsfenster, das dort zuerst eine Antwort braucht.
 *
 * Auf dem Telefon trägt die Objektseite unten bereits eine eigene Leiste;
 * liegt sie im Bild, rückt diese Zeile um deren Höhe nach oben.
 */
export function FloatingActions() {
  const [sichtbar, setSichtbar] = useState(false);
  const [karteOffen, setKarteOffen] = useState(false);

  const [abstand, setAbstand] = useState("1rem");

  useEffect(() => {
    const pruefen = () => {
      setSichtbar(window.scrollY > 420);
      // Die Objektleiste steht am selben Rand. Liegt sie im Bild, rückt
      // diese Zeile um ihre Höhe nach oben, statt sie zu überdecken.
      const leiste = document.querySelector<HTMLElement>("[data-objektleiste]");
      const hoch = leiste && leiste.getBoundingClientRect().top < window.innerHeight - 8;
      setAbstand(hoch ? `${Math.round(leiste!.getBoundingClientRect().height) + 12}px` : "1rem");
    };
    pruefen();
    window.addEventListener("scroll", pruefen, { passive: true });
    window.addEventListener("resize", pruefen);
    return () => {
      window.removeEventListener("scroll", pruefen);
      window.removeEventListener("resize", pruefen);
    };
  }, []);

  return (
    <>
      <div
        className={`pointer-events-none fixed inset-x-0 z-40 flex items-end justify-between gap-3 px-4 transition-all duration-500 ease-smooth sm:px-6 ${
          sichtbar ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"
        }`}
        style={{ bottom: abstand }}
      >
        {/* Klein und rund: eine Marke am Rand, kein zweiter Knopf, der um
            Aufmerksamkeit mit dem Kontakt streitet. Die Beschriftung fährt
            beim Überfahren aus, angeklickt wird die Karte groß. */}
        <button
          type="button"
          onClick={() => setKarteOffen(true)}
          className="group/gebiet pointer-events-auto flex h-12 items-center rounded-full bg-white/95 pl-[0.3125rem] pr-[0.3125rem] shadow-lift ring-1 ring-border backdrop-blur transition-all duration-300 ease-smooth hover:-translate-y-0.5 hover:pr-4 focus-visible:pr-4"
          aria-label="Tätigkeitsgebiet auf der Karte ansehen"
        >
          <span className="flex h-[2.375rem] w-[2.375rem] shrink-0 items-center justify-center rounded-full bg-accent-soft text-accent-deep">
            <MapPin className="h-[1.125rem] w-[1.125rem]" strokeWidth={1.9} aria-hidden="true" />
          </span>
          <span className="max-w-0 overflow-hidden whitespace-nowrap text-[0.875rem] font-semibold text-ink opacity-0 transition-all duration-300 ease-smooth group-hover/gebiet:ml-2.5 group-hover/gebiet:max-w-[10rem] group-hover/gebiet:opacity-100 group-focus-visible/gebiet:ml-2.5 group-focus-visible/gebiet:max-w-[10rem] group-focus-visible/gebiet:opacity-100">
            Tätigkeitsgebiet
          </span>
        </button>

        {/* Nicht noch einmal „Kontakt aufnehmen“: derselbe Knopf steht schon
            oben in der Kopfzeile, und zweimal dasselbe auf einem Bildschirm
            hilft niemandem weiter. Hier steht die Frage, mit der die meisten
            auf diese Seite kommen — die Antwort darauf führt ohnehin zum
            Gespräch. */}
        <Link
          href="/bewertung"
          className="group/wert pointer-events-auto inline-flex items-center gap-3 rounded-full bg-accent-deep py-2.5 pl-3 pr-5 text-left shadow-lift transition-all duration-300 ease-smooth hover:-translate-y-0.5 hover:bg-accent-dark"
        >
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/15 text-white">
            <TrendingUp className="h-[1.125rem] w-[1.125rem]" strokeWidth={1.9} aria-hidden="true" />
          </span>
          <span className="min-w-0">
            <span className="block text-[0.9375rem] font-semibold leading-tight text-white">
              Was ist Ihre Immobilie wert?
            </span>
            <span className="mt-0.5 hidden text-[0.75rem] leading-tight text-white/75 sm:block">
              Einschätzung in der Regel innerhalb einer Woche
            </span>
          </span>
          <ArrowRight
            className="hidden h-4 w-4 shrink-0 text-white transition-transform duration-300 ease-smooth group-hover/wert:translate-x-1 sm:block"
            aria-hidden="true"
          />
        </Link>
      </div>

      <Sheet
        open={karteOffen}
        onClose={() => setKarteOffen(false)}
        eyebrow="Tätigkeitsgebiet"
        title="Leverkusen und Umgebung"
        size="lg"
        footer={
          <p className="text-[0.8125rem] leading-relaxed text-text-muted">
            Büro in {site.address.locality} — vermittelt wird im gesamten Bergischen Rheinland.
          </p>
        }
      >
        <ServiceAreaMap />

        <ul className="mt-6 flex flex-wrap gap-2">
          {servicePlaces.map((place) => (
            <li
              key={place.name}
              className={`rounded-[14px] px-4 py-2 text-[0.875rem] ${
                place.focus || place.seat
                  ? "bg-accent-soft font-bold text-ink ring-1 ring-accent"
                  : "bg-surface-warm text-text-muted"
              }`}
            >
              {place.name}
            </li>
          ))}
        </ul>
      </Sheet>
    </>
  );
}
