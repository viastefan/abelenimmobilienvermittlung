"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Building2, Inbox, LayoutDashboard, Star } from "lucide-react";
import { istAktiv } from "@/lib/admin/nav";

/**
 * Die Navigation des Panels — am Rechner als Spalte, am Telefon als Leiste.
 *
 * Am Telefon standen alle vier Bereiche plus „Abmelden“ in einer Zeile neben
 * dem Logo, in 12 Pixeln und ohne Innenabstand. Das passt auf 390 Pixern
 * nicht nebeneinander, und getroffen werden will es auch. Jetzt trägt die
 * Kopfzeile nur noch Logo und Abmelden; die Bereiche stehen darunter als
 * Leiste, jeder mit seinem Zeichen und genug Fläche für einen Daumen.
 *
 * Beide Fassungen zeigen, wo man gerade ist. Vorher tat das keine — man sah
 * dem Panel nicht an, welchen Bereich man geöffnet hatte.
 */

const punkte = [
  { href: "/admin", label: "Übersicht", icon: LayoutDashboard },
  { href: "/admin/immobilien", label: "Immobilien", icon: Building2 },
  { href: "/admin/referenzen", label: "Referenzen", icon: Star },
  { href: "/admin/anfragen", label: "Anfragen", icon: Inbox, badge: true },
] as const;

function Zaehler({ anzahl, className = "" }: { anzahl: number; className?: string }) {
  return (
    <span
      className={`rounded-full bg-accent px-2 py-0.5 text-[0.6875rem] font-bold tabular-nums text-ink-deep ${className}`}
    >
      {anzahl}
      <span className="sr-only"> offene Anfragen</span>
    </span>
  );
}

export function AdminNav({
  offeneAnfragen,
  variant,
}: {
  offeneAnfragen: number;
  /** `spalte` am Rechner, `leiste` am Telefon. */
  variant: "spalte" | "leiste";
}) {
  const pfad = usePathname();

  if (variant === "leiste") {
    return (
      <nav
        className="flex border-t border-white/10 bg-ink-deep lg:hidden"
        aria-label="Bereiche der Redaktion"
      >
        {punkte.map((punkt) => {
          const aktiv = istAktiv(pfad, punkt.href);
          return (
            <Link
              key={punkt.href}
              href={punkt.href}
              aria-current={aktiv ? "page" : undefined}
              className={`relative flex flex-1 flex-col items-center gap-1 px-1 py-2.5 text-[0.6875rem] font-medium transition-colors duration-200 ${
                aktiv ? "text-white" : "text-white/55"
              }`}
            >
              {/* Der Strich sitzt oben an der Kante, nicht unter der Schrift:
                  am unteren Rand liegt auf vielen Geräten die Systemleiste. */}
              {aktiv && (
                <span className="absolute inset-x-3 top-0 h-0.5 rounded-full bg-accent" aria-hidden="true" />
              )}
              <span className="relative">
                <punkt.icon className="h-5 w-5" strokeWidth={1.6} aria-hidden="true" />
                {"badge" in punkt && punkt.badge && offeneAnfragen > 0 && (
                  <Zaehler anzahl={offeneAnfragen} className="absolute -right-3 -top-1.5" />
                )}
              </span>
              {punkt.label}
            </Link>
          );
        })}
      </nav>
    );
  }

  return (
    <nav className="flex-1 space-y-0.5 px-3" aria-label="Bereiche der Redaktion">
      {punkte.map((punkt) => {
        const aktiv = istAktiv(pfad, punkt.href);
        return (
          <Link
            key={punkt.href}
            href={punkt.href}
            aria-current={aktiv ? "page" : undefined}
            className={`flex items-center gap-3 rounded-[14px] px-3 py-2.5 text-[0.8125rem] font-medium transition-colors duration-200 ${
              aktiv ? "bg-white/15 text-white" : "text-white/65 hover:bg-white/10 hover:text-white"
            }`}
          >
            <punkt.icon className="h-4 w-4" strokeWidth={1.6} aria-hidden="true" />
            <span className="flex-1">{punkt.label}</span>
            {"badge" in punkt && punkt.badge && offeneAnfragen > 0 && <Zaehler anzahl={offeneAnfragen} />}
          </Link>
        );
      })}
    </nav>
  );
}
