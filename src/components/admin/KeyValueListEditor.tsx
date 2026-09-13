"use client";

import { useState } from "react";
import { Plus, X } from "lucide-react";
import type { PropertyFeature } from "@/types/property";

export function KeyValueListEditor({
  label,
  labelFieldName,
  valueFieldName,
  initialItems,
  labelPlaceholder = "Bezeichnung",
  valuePlaceholder = "Wert",
}: {
  label: string;
  labelFieldName: string;
  valueFieldName: string;
  initialItems: PropertyFeature[];
  labelPlaceholder?: string;
  valuePlaceholder?: string;
}) {
  const [items, setItems] = useState<PropertyFeature[]>(initialItems.length > 0 ? initialItems : [{ label: "", value: "" }]);

  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <span className="text-[0.8125rem] font-semibold text-ink">{label}</span>
        <button
          type="button"
          onClick={() => setItems((current) => [...current, { label: "", value: "" }])}
          className="inline-flex items-center gap-1.5 text-[0.75rem] font-semibold text-accent-deep hover:text-accent-dark"
        >
          <Plus className="h-3.5 w-3.5" aria-hidden="true" />
          Zeile hinzufügen
        </button>
      </div>
      <div className="space-y-2">
        {items.map((item, index) => (
          <div key={index} className="flex items-center gap-2">
            <input
              name={labelFieldName}
              defaultValue={item.label}
              placeholder={labelPlaceholder}
              className="w-1/2 rounded-[10px] border border-border bg-white px-3 py-2 text-[0.8125rem] text-ink transition-colors focus:border-accent focus:outline-none"
            />
            <input
              name={valueFieldName}
              defaultValue={item.value}
              placeholder={valuePlaceholder}
              className="w-1/2 rounded-[10px] border border-border bg-white px-3 py-2 text-[0.8125rem] text-ink transition-colors focus:border-accent focus:outline-none"
            />
            <button
              type="button"
              onClick={() => setItems((current) => current.filter((_, i) => i !== index))}
              aria-label="Zeile entfernen"
              className="shrink-0 rounded-[10px] p-2 text-text-muted transition-colors hover:bg-warning-soft hover:text-warning"
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
