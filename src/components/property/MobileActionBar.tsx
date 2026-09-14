"use client";

import { useEffect, useState } from "react";
import { MessageSquare, Phone } from "lucide-react";
import { useContactSheet } from "@/components/contact/ContactSheetProvider";
import { site } from "@/data/site";

/**
 * Aktionsleiste am unteren Rand — erscheint auf dem Telefon, sobald der
 * Kopfbereich weggescrollt ist, wie die Kaufleiste einer nativen App.
 */
export function MobileActionBar({
  priceLabel,
  objectRef,
}: {
  priceLabel: string;
  objectRef: string;
}) {
  const sheet = useContactSheet();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 420);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* Platzhalter, damit die Leiste den letzten Absatz nicht verdeckt. */}
      <div className="h-[5.5rem] lg:hidden" aria-hidden="true" />

      <div
        className={`fixed inset-x-0 bottom-0 z-[70] border-t border-border bg-white/95 px-4 pt-3 backdrop-blur-xl transition-transform duration-500 ease-smooth pb-safe lg:hidden ${
          visible ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <div className="flex items-center gap-3">
          <span className="min-w-0 flex-1">
            <span className="block text-[0.625rem] font-bold uppercase tracking-[0.12em] text-text-subtle">
              Kaufpreis
            </span>
            <span className="block truncate font-display text-[1.0625rem] font-extrabold leading-tight text-ink">
              {priceLabel}
            </span>
          </span>

          <a
            href={site.phoneHref}
            aria-label={`${site.owner} anrufen`}
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[12px] border border-border-strong text-ink"
          >
            <Phone className="h-[18px] w-[18px]" strokeWidth={1.8} aria-hidden="true" />
          </a>

          <button
            type="button"
            onClick={() =>
              sheet?.open({
                interest: "kaufen",
                objectRef,
                view: "form",
                title: "Besichtigung anfragen",
              })
            }
            className="inline-flex h-12 shrink-0 items-center gap-2 rounded-[12px] bg-accent-deep px-5 text-[0.9375rem] font-semibold text-white"
          >
            <MessageSquare className="h-4 w-4" aria-hidden="true" />
            Anfragen
          </button>
        </div>
      </div>
    </>
  );
}
