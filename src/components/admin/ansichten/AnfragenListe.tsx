import Link from "next/link";
import { ChevronRight } from "lucide-react";
import type { Inquiry } from "@/types/inquiry";
import { wann } from "@/lib/admin/zeit";
import { klassen } from "../ui";

/** Erster und letzter Name: „Heike und Rolf Sommer“ wird HS, nicht HU. */
function initialen(name: string) {
  const teile = name.split(/\s+/).filter(Boolean);
  const erster = teile[0]?.[0] ?? "";
  const letzter = teile.length > 1 ? teile.at(-1)![0] : "";
  return `${erster}${letzter}`.toUpperCase();
}

/**
 * Anfragen als Posteingang: Neue stehen fett mit Punkt davor, jede Zeile
 * zeigt, wer schreibt, worum es geht und wann.
 */
export function AnfragenListe({ anfragen, jetzt }: { anfragen: Inquiry[]; jetzt: Date }) {
  return (
    <ul className="divide-y divide-border overflow-hidden rounded-[22px] bg-white shadow-[0_1px_2px_rgba(16,43,78,0.04)] ring-1 ring-[#E6EBEF]">
      {anfragen.map((anfrage) => {
        const neu = anfrage.status === "neu";
        return (
          <li key={anfrage.id}>
            <Link
              href={`/admin/anfragen/${anfrage.id}`}
              className="group flex items-center gap-3.5 px-4 py-4 transition-colors hover:bg-surface-cool/60 sm:px-5"
            >
              <span className="relative shrink-0">
                <span
                  className={klassen(
                    "flex h-11 w-11 items-center justify-center rounded-full font-display text-[0.875rem] font-bold",
                    neu ? "bg-accent-soft text-accent-dark" : "bg-surface-cool text-text-muted"
                  )}
                  aria-hidden="true"
                >
                  {initialen(anfrage.name)}
                </span>
                {neu && <span className="absolute -right-0.5 -top-0.5 h-3.5 w-3.5 rounded-full bg-accent-deep ring-[3px] ring-white" aria-hidden="true" />}
              </span>
              <span className="min-w-0 flex-1">
                <span className="flex items-baseline justify-between gap-3">
                  <span className={klassen("truncate text-[0.9375rem] text-ink", neu ? "font-bold" : "font-semibold")}>
                    {anfrage.name}
                    {neu && <span className="sr-only"> (neu)</span>}
                  </span>
                  <span className={klassen("shrink-0 text-[0.8125rem] tabular-nums", neu ? "font-semibold text-accent-deep" : "text-text-subtle")}>
                    {wann(anfrage.createdAt, jetzt)}
                  </span>
                </span>
                <span className="mt-0.5 block truncate text-[0.875rem] text-text-muted">
                  <span className="font-semibold text-ink/80">{anfrage.interestLabel}</span>
                  <span aria-hidden="true"> · </span>
                  {anfrage.message}
                </span>
              </span>
              <ChevronRight className="hidden h-4 w-4 shrink-0 text-text-subtle transition-transform group-hover:translate-x-0.5 sm:block" strokeWidth={2} aria-hidden="true" />
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
