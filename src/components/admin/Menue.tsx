"use client";

import { useEffect, useRef, useState, type ComponentType, type ReactNode } from "react";
import Link from "next/link";
import { Ellipsis } from "lucide-react";
import { klassen } from "./ui";

export type MenuePunkt =
  | {
      label: string;
      symbol: ComponentType<{ className?: string; strokeWidth?: number }>;
      href: string;
      extern?: boolean;
    }
  | {
      label: string;
      symbol: ComponentType<{ className?: string; strokeWidth?: number }>;
      onSelect: () => void;
      gefahr?: boolean;
      aus?: boolean;
    };

/**
 * Das Menü hinter den drei Punkten. Seltenes steht hier, damit die Karte
 * selbst ruhig bleibt: ein Foto, ein Name, ein Preis.
 */
export function Menue({
  punkte,
  label,
  className = "",
  knopfKlasse,
  ausloeser,
}: {
  punkte: (MenuePunkt | "trenner")[];
  label: string;
  className?: string;
  knopfKlasse?: string;
  ausloeser?: ReactNode;
}) {
  const [offen, setOffen] = useState(false);
  const rahmen = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!offen) return;
    const zu = (event: MouseEvent | TouchEvent) => {
      if (!rahmen.current?.contains(event.target as Node)) setOffen(false);
    };
    const taste = (event: KeyboardEvent) => event.key === "Escape" && setOffen(false);
    document.addEventListener("mousedown", zu);
    document.addEventListener("touchstart", zu);
    document.addEventListener("keydown", taste);
    return () => {
      document.removeEventListener("mousedown", zu);
      document.removeEventListener("touchstart", zu);
      document.removeEventListener("keydown", taste);
    };
  }, [offen]);

  return (
    <div ref={rahmen} className={klassen("relative", className)}>
      <button
        type="button"
        aria-label={label}
        aria-expanded={offen}
        onClick={(event) => {
          event.preventDefault();
          event.stopPropagation();
          setOffen((jetzt) => !jetzt);
        }}
        className={
          knopfKlasse ??
          "flex h-9 w-9 items-center justify-center rounded-full bg-white/95 text-ink shadow-[0_2px_8px_rgba(11,37,69,0.18)] backdrop-blur transition-transform duration-200 hover:scale-105 active:scale-95"
        }
      >
        {ausloeser ?? <Ellipsis className="h-[1.125rem] w-[1.125rem]" strokeWidth={2.2} aria-hidden="true" />}
      </button>

      {offen && (
        <div
          role="menu"
          className="menue-rein absolute right-0 top-full z-40 mt-2 w-64 origin-top-right overflow-hidden rounded-[18px] bg-white p-1.5 shadow-[0_16px_48px_-12px_rgba(11,37,69,0.35)] ring-1 ring-[#E6EBEF]"
        >
          {punkte.map((punkt, index) => {
            if (punkt === "trenner") return <div key={`t${index}`} className="mx-2 my-1.5 h-px bg-border" />;
            const inhalt = (
              <>
                <punkt.symbol className="h-[1.125rem] w-[1.125rem] shrink-0 opacity-80" strokeWidth={1.8} />
                <span>{punkt.label}</span>
              </>
            );
            const stil =
              "flex w-full items-center gap-3 rounded-[12px] px-3 py-2.5 text-left text-[0.9375rem] font-medium transition-colors";

            if ("href" in punkt) {
              return (
                <Link
                  key={punkt.label}
                  role="menuitem"
                  href={punkt.href}
                  target={punkt.extern ? "_blank" : undefined}
                  rel={punkt.extern ? "noreferrer" : undefined}
                  onClick={(event) => {
                    event.stopPropagation();
                    setOffen(false);
                  }}
                  className={klassen(stil, "text-ink hover:bg-surface-cool")}
                >
                  {inhalt}
                </Link>
              );
            }

            return (
              <button
                key={punkt.label}
                type="button"
                role="menuitem"
                disabled={punkt.aus}
                onClick={(event) => {
                  event.preventDefault();
                  event.stopPropagation();
                  setOffen(false);
                  punkt.onSelect();
                }}
                className={klassen(
                  stil,
                  punkt.gefahr ? "text-warning hover:bg-warning-soft" : "text-ink hover:bg-surface-cool",
                  "disabled:pointer-events-none disabled:opacity-35"
                )}
              >
                {inhalt}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
