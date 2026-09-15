"use client";

import { useMemo, useState } from "react";
import { ArrowRight, Search } from "lucide-react";
import { ReferenceCard } from "@/components/references/ReferenceCard";
import type { ReferenceObject } from "@/types/reference";

export type ReferenceCardItem = ReferenceObject & { resolvedImages: string[] };

const filters = [
  { key: "alle", label: "Alle" },
  { key: "verkauf", label: "Verkauf" },
  { key: "vermietet", label: "Vermietung" },
] as const;

type FilterKey = (typeof filters)[number]["key"];

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
                className={`rounded-[14px] border px-5 py-2.5 text-sm font-semibold transition-all duration-200 ${
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
            className="w-full rounded-[14px] bg-white shadow-soft ring-1 ring-border py-2.5 pl-11 pr-4 text-sm text-ink placeholder:text-text-subtle focus:outline-none"
          />
        </div>
      </div>

      <h2 className="sr-only">Referenzobjekte</h2>

      {shown.length > 0 ? (
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {shown.map((item) => (
            <ReferenceCard key={item.slug} reference={item} images={item.resolvedImages} />
          ))}
        </div>
      ) : (
        <p className="mt-12 rounded-[24px] border border-dashed border-border bg-surface-warm p-10 text-center text-sm text-text-muted">
          Für diese Auswahl liegen aktuell keine Referenzen vor. Sprechen Sie uns gerne direkt an.
        </p>
      )}

      {visible.length > shown.length && (
        <div className="mt-12 flex justify-center">
          <button
            type="button"
            onClick={() => setLimit((value) => value + PAGE_SIZE)}
            className="group/btn inline-flex items-center gap-2 rounded-[14px] bg-surface-mist px-7 py-4 text-base font-semibold text-ink transition-all duration-300 ease-smooth hover:-translate-y-0.5 hover:bg-accent-soft hover:text-accent-deep"
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
