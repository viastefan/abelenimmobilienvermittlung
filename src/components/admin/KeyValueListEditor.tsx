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
        <span className="text-sm font-medium text-ink">{label}</span>
        <button
          type="button"
          onClick={() => setItems((current) => [...current, { label: "", value: "" }])}
          className="inline-flex items-center gap-1 text-xs font-medium text-accent hover:underline"
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
              className="w-1/2 rounded-md border border-border bg-surface px-3 py-2 text-sm text-ink focus-visible:border-ink"
            />
            <input
              name={valueFieldName}
              defaultValue={item.value}
              placeholder={valuePlaceholder}
              className="w-1/2 rounded-md border border-border bg-surface px-3 py-2 text-sm text-ink focus-visible:border-ink"
            />
            <button
              type="button"
              onClick={() => setItems((current) => current.filter((_, i) => i !== index))}
              aria-label="Zeile entfernen"
              className="shrink-0 rounded-md p-2 text-text-muted hover:bg-surface-soft hover:text-red-600"
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
