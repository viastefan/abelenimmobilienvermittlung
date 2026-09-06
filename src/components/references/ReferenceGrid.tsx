"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowRight, CalendarRange, DoorOpen, Ruler, Search } from "lucide-react";
import { SiteImage } from "@/components/graphics/SiteImage";
import type { ReferenceItem } from "@/data/references";

export type ReferenceCardItem = ReferenceItem & { resolvedImage?: string };

const filters = [
  { key: "alle", label: "Alle" },
  { key: "verkauf", label: "Verkauf" },
  { key: "vermietet", label: "Vermietung" },
] as const;

type FilterKey = (typeof filters)[number]["key"];

const statusLabels = { verkauf: "Verkauft", vermietet: "Vermietet" } as const;

const PAGE_SIZE = 9;

export function ReferenceGrid({ references }: { references: ReferenceCardItem[] }) {
  const [active, setActive] = useState<FilterKey>("alle");
  const [query, setQuery] = useState("");
  const [limit, setLimit] = useState(PAGE_SIZE);

  const visible = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return references.filter((item) => {
      if (active !== "alle" && item.category !== active) return false;
      if (!needle) return true;
      return `${item.title} ${item.region} ${item.typeLabel} ${item.summary}`.toLowerCase().includes(needle);
    });
  }, [references, active, query]);

  const shown = visible.slice(0, limit);

  return (
    <div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-2" role="group" aria-label="Referenzen filtern">
          {filters.map((filter) => {
            const isActive = active === filter.key;
            return (
              <button
                key={filter.key}
                type="button"
                onClick={() => {
                  setActive(filter.key);
                  setLimit(PAGE_SIZE);
                }}
                aria-pressed={isActive}
                className={`rounded-[11px] border px-5 py-2.5 text-sm font-semibold transition-all duration-200 ${
                  isActive
                    ? "border-accent-deep bg-accent-deep text-white"
                    : "border-border bg-white text-text-muted hover:border-accent hover:text-accent-deep"
                }`}
              >
                {filter.label}
              </button>
            );
          })}
        </div>

        <div className="relative sm:w-[19rem]">
          <Search
            className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-text-subtle"
            aria-hidden="true"
          />
          <label htmlFor="reference-search" className="sr-only">
            Referenzen durchsuchen
          </label>
          <input
            id="reference-search"
            type="search"
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
              setLimit(PAGE_SIZE);
            }}
            placeholder="Ort, Objektart oder Stichwort …"
            className="w-full rounded-[11px] border border-border bg-white py-2.5 pl-11 pr-4 text-sm text-ink placeholder:text-text-subtle focus:border-accent focus:outline-none"
          />
        </div>
      </div>

      {shown.length > 0 ? (
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {shown.map((item) => (
            <Link
              key={item.slug}
              href={`/referenzen/${item.slug}`}
              className="group flex h-full flex-col overflow-hidden rounded-[16px] border border-border bg-white transition-all duration-300 ease-smooth hover:-translate-y-1 hover:border-accent-light hover:shadow-soft"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-surface-mist">
                <div className="h-full w-full transition-transform duration-700 ease-smooth group-hover:scale-[1.04]">
                  <SiteImage
                    src={item.resolvedImage}
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    label={item.region}
                    alt={`${item.typeLabel} in ${item.region}`}
                  />
                </div>
                <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1.5 text-[0.6875rem] font-bold uppercase tracking-[0.1em] text-ink shadow-card backdrop-blur">
                  {statusLabels[item.category]}
                </span>
              </div>

              <div className="flex flex-1 flex-col p-6">
                <p className="text-[0.75rem] font-semibold uppercase tracking-[0.12em] text-accent-deep">
                  {item.region}
                </p>
                <h3 className="mt-2 font-display text-[1.125rem] font-bold leading-snug text-ink">
                  {item.title}
                </h3>
                <p className="mt-1 text-sm text-text-muted">{item.typeLabel}</p>

                <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-[0.8125rem] text-text-muted">
                  <span className="inline-flex items-center gap-1.5">
                    <Ruler className="h-4 w-4 text-accent-mid" strokeWidth={1.5} aria-hidden="true" />
                    {item.livingSpace} m²
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <DoorOpen className="h-4 w-4 text-accent-mid" strokeWidth={1.5} aria-hidden="true" />
                    {item.rooms} Zimmer
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <CalendarRange className="h-4 w-4 text-accent-mid" strokeWidth={1.5} aria-hidden="true" />
                    {item.year}
                  </span>
                </div>

                <span className="mt-auto inline-flex items-center gap-2 pt-5 text-sm font-semibold text-accent-deep">
                  Objekt ansehen
                  <ArrowRight
                    className="h-4 w-4 transition-transform duration-300 ease-smooth group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </span>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <p className="mt-12 rounded-[16px] border border-dashed border-border bg-surface-warm p-10 text-center text-sm text-text-muted">
          Für diese Auswahl liegen aktuell keine Referenzen vor. Sprechen Sie uns gerne direkt an.
        </p>
      )}

      {visible.length > shown.length && (
        <div className="mt-12 flex justify-center">
          <button
            type="button"
            onClick={() => setLimit((value) => value + PAGE_SIZE)}
            className="group/btn inline-flex items-center gap-2 rounded-[11px] border border-border-strong bg-white px-7 py-4 text-base font-semibold text-ink transition-all duration-300 ease-smooth hover:-translate-y-0.5 hover:border-accent hover:text-accent-deep"
          >
            Weitere Referenzen anzeigen
            <ArrowRight
              className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1"
              aria-hidden="true"
            />
          </button>
        </div>
      )}
    </div>
  );
}
