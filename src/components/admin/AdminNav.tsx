"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Award, Building2, House, Inbox } from "lucide-react";
import { istAktiv } from "@/lib/admin/nav";
import { Zaehler, klassen } from "./ui";

/**
 * Die vier Bereiche der App — am Rechner als Spalte, am Telefon als Leiste
 * am unteren Rand, dort, wo der Daumen ohnehin liegt. Beide zeigen, wo man
 * gerade ist.
 */

const bereiche = [
  { href: "/admin", label: "Übersicht", symbol: House },
  { href: "/admin/immobilien", label: "Objekte", symbol: Building2 },
  { href: "/admin/referenzen", label: "Referenzen", symbol: Award },
  { href: "/admin/anfragen", label: "Anfragen", symbol: Inbox, zaehlt: true },
] as const;

export function AdminNav({ offeneAnfragen, variant }: { offeneAnfragen: number; variant: "spalte" | "leiste" }) {
  const pfad = usePathname();

  if (variant === "leiste") {
    return (
      <nav
        aria-label="Bereiche"
        className="fixed inset-x-0 bottom-0 z-40 border-t border-black/[0.06] bg-white/[0.88] pb-[env(safe-area-inset-bottom)] backdrop-blur-xl backdrop-saturate-150 lg:hidden"
      >
        <ul className="mx-auto flex max-w-lg">
          {bereiche.map((bereich) => {
            const aktiv = istAktiv(pfad, bereich.href);
            return (
              <li key={bereich.href} className="flex-1">
                <Link
                  href={bereich.href}
                  aria-current={aktiv ? "page" : undefined}
                  className={klassen(
                    "flex flex-col items-center gap-1 pb-2 pt-2.5 text-[0.6875rem] font-semibold transition-colors duration-200",
                    aktiv ? "text-ink" : "text-text-subtle"
                  )}
                >
                  <span
                    className={klassen(
                      "relative flex h-8 w-14 items-center justify-center rounded-full transition-colors duration-200",
                      aktiv && "bg-accent-soft"
                    )}
                  >
                    <bereich.symbol
                      className={klassen("h-[1.3125rem] w-[1.3125rem]", aktiv && "text-accent-dark")}
                      strokeWidth={aktiv ? 2.1 : 1.8}
                      aria-hidden="true"
                    />
                    {"zaehlt" in bereich && offeneAnfragen > 0 && (
                      <Zaehler anzahl={offeneAnfragen} className="absolute -top-1 right-1.5 ring-2 ring-white" />
                    )}
                  </span>
                  {bereich.label}
                  {"zaehlt" in bereich && offeneAnfragen > 0 && <span className="sr-only">, {offeneAnfragen} neu</span>}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    );
  }

  return (
    <nav aria-label="Bereiche" className="px-3">
      <ul className="space-y-0.5">
        {bereiche.map((bereich) => {
          const aktiv = istAktiv(pfad, bereich.href);
          return (
            <li key={bereich.href}>
              <Link
                href={bereich.href}
                aria-current={aktiv ? "page" : undefined}
                className={klassen(
                  "group flex items-center gap-3 rounded-[13px] px-3 py-2.5 text-[0.9375rem] font-semibold transition-colors duration-200",
                  aktiv ? "bg-surface-cool text-ink" : "text-text-muted hover:bg-surface-cool/70 hover:text-ink"
                )}
              >
                <bereich.symbol
                  className={klassen("h-5 w-5 transition-colors", aktiv ? "text-accent-deep" : "text-text-subtle group-hover:text-ink")}
                  strokeWidth={aktiv ? 2.1 : 1.8}
                  aria-hidden="true"
                />
                <span className="flex-1">{bereich.label}</span>
                {"zaehlt" in bereich && offeneAnfragen > 0 && (
                  <>
                    <Zaehler anzahl={offeneAnfragen} />
                    <span className="sr-only">neue Anfragen</span>
                  </>
                )}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
