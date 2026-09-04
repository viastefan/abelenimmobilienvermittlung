"use client";

import { useState } from "react";
import { Ruler, DoorOpen, Calendar } from "lucide-react";
import { PropertyPlaceholder } from "@/components/graphics/PropertyPlaceholder";
import type { ReferenceItem } from "@/data/references";

const filters = [
  { key: "alle", label: "Alle Objekte" },
  { key: "verkauf", label: "Verkauf" },
  { key: "vermietet", label: "Vermietet" },
  { key: "mehrfamilienhaus", label: "Mehrfamilienhäuser" },
  { key: "wohnung", label: "Wohnungen" },
  { key: "haus", label: "Häuser" },
] as const;

type FilterKey = (typeof filters)[number]["key"];

export function ReferenceGrid({ references }: { references: ReferenceItem[] }) {
  const [active, setActive] = useState<FilterKey>("alle");

  const visible = references.filter((item) => {
    if (active === "alle") return true;
    if (active === "verkauf" || active === "vermietet") return item.category === active;
    return item.propertyType === active;
  });

  return (
    <div>
      <div className="flex flex-wrap gap-3" role="group" aria-label="Referenzen filtern">
        {filters.map((filter) => {
          const isActive = active === filter.key;
          return (
            <button
              key={filter.key}
              type="button"
              onClick={() => setActive(filter.key)}
              aria-pressed={isActive}
              className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors duration-200 ${
                isActive
                  ? "border-accent bg-accent text-white"
                  : "border-border bg-white text-text-muted hover:border-ink hover:text-ink"
              }`}
            >
              {filter.label}
            </button>
          );
        })}
      </div>

      <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((item) => (
          <div
            key={item.title}
            className="overflow-hidden rounded-lg border border-border bg-white transition-shadow duration-300 hover:shadow-soft"
          >
            <div className="relative aspect-[4/3] overflow-hidden">
              <PropertyPlaceholder label="" />
              <span
                className={`absolute left-4 top-4 rounded-sm px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.06em] text-white ${
                  item.category === "verkauf" ? "bg-ink" : "bg-accent"
                }`}
              >
                {item.category === "verkauf" ? "Verkauf" : "Vermietet"}
              </span>
            </div>
            <div className="p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.1em] text-accent">{item.region}</p>
              <h3 className="mt-2 font-display text-lg font-semibold text-ink">{item.title}</h3>
              <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-text-muted">
                <span className="inline-flex items-center gap-1.5">
                  <Ruler className="h-4 w-4 text-accent" aria-hidden="true" />
                  {item.livingSpace} m²
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <DoorOpen className="h-4 w-4 text-accent" aria-hidden="true" />
                  {item.rooms} Zimmer
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Calendar className="h-4 w-4 text-accent" aria-hidden="true" />
                  Baujahr {item.year}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {visible.length === 0 && (
        <p className="mt-10 text-sm text-text-muted">Für diese Auswahl liegen aktuell keine Referenzen vor.</p>
      )}
    </div>
  );
}
