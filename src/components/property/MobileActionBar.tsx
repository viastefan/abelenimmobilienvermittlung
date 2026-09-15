"use client";

import { useEffect, useState } from "react";
import { MessageSquare } from "lucide-react";
import { useContactSheet } from "@/components/contact/ContactSheetProvider";

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
        className={`fixed inset-x-0 bottom-0 z-[70] bg-white/95 px-4 pt-3 shadow-[0_-8px_32px_-16px_rgba(16,43,78,0.35)] backdrop-blur-xl transition-transform duration-500 ease-smooth pb-safe lg:hidden ${
          visible ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <div className="flex items-center gap-3">
          <span className="min-w-0 flex-1">
            <span className="block text-[0.6875rem] font-medium text-text-subtle">
              Kaufpreis
            </span>
            <span className="block truncate font-display text-[1.0625rem] font-extrabold leading-tight text-ink">
              {priceLabel}
            </span>
          </span>

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
            className="inline-flex h-12 shrink-0 items-center gap-2 rounded-[14px] bg-accent-deep px-5 text-[0.9375rem] font-semibold text-white"
          >
            <MessageSquare className="h-4 w-4" aria-hidden="true" />
            Anfragen
          </button>
        </div>
      </div>
    </>
  );
}
