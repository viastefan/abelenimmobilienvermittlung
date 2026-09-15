"use client";

import { useActionState, useState } from "react";
import { ImageUploader } from "./ImageUploader";
import { SubmitButton } from "./SubmitButton";
import { Field, Panel, inputClass } from "./ui";
import type { ReferenceObject } from "@/types/reference";
import type { ReferenceFormResult } from "@/app/admin/reference-actions";

const categoryOptions = [
  { value: "verkauf", label: "Verkauft" },
  { value: "vermietet", label: "Vermietet" },
];

export function ReferenceForm({
  reference,
  action,
  submitLabel,
}: {
  reference?: ReferenceObject;
  action: (prevState: ReferenceFormResult, formData: FormData) => Promise<ReferenceFormResult>;
  submitLabel: string;
}) {
  const [state, formAction] = useActionState<ReferenceFormResult, FormData>(action, undefined);
  const [folder] = useState(() => reference?.id ?? crypto.randomUUID());

  return (
    <form action={formAction} className="max-w-4xl space-y-5">
      <Panel title="Grunddaten">
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Titel">
            <input name="title" defaultValue={reference?.title} required className={inputClass} />
          </Field>
          <Field label="Ort" hint="Format: Leverkusen – Stadtteil">
            <input name="region" defaultValue={reference?.region} required className={inputClass} />
          </Field>
          <Field label="Objektart" hint="z. B. Einfamilienhaus, Etagenwohnung">
            <input name="type_label" defaultValue={reference?.typeLabel} className={inputClass} />
          </Field>
          <Field label="Status">
            <select name="category" defaultValue={reference?.category ?? "verkauf"} className={inputClass}>
              {categoryOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Slug" hint="URL-Teil. Leer lassen, um ihn aus dem Titel zu erzeugen.">
            <input name="slug" defaultValue={reference?.slug} className={inputClass} />
          </Field>
          <Field label="Reihenfolge" hint="Kleinere Zahl erscheint weiter vorne.">
            <input
              name="sort_order"
              type="number"
              defaultValue={reference?.sortOrder ?? 0}
              className={inputClass}
            />
          </Field>
        </div>
      </Panel>

      <Panel title="Eckdaten">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <Field label="Wohnfläche in m²">
            <input name="living_space" inputMode="decimal" defaultValue={reference?.livingSpace} className={inputClass} />
          </Field>
          <Field label="Zimmer">
            <input name="rooms" inputMode="decimal" defaultValue={reference?.rooms} className={inputClass} />
          </Field>
          <Field label="Baujahr" hint="Optional">
            <input name="year" inputMode="numeric" defaultValue={reference?.year ?? ""} className={inputClass} />
          </Field>
          <Field label="Grundstück in m²" hint="Optional">
            <input name="plot" inputMode="decimal" defaultValue={reference?.plot ?? ""} className={inputClass} />
          </Field>
          <Field label="Stellplätze" hint="Optional">
            <input name="parking" inputMode="numeric" defaultValue={reference?.parking ?? ""} className={inputClass} />
          </Field>
        </div>
      </Panel>

      <Panel title="Texte">
        <div className="space-y-5">
          <Field label="Kurzbeschreibung" hint="Ein bis zwei Sätze. Erscheint auf der Referenzkarte.">
            <textarea name="summary" defaultValue={reference?.summary} required rows={2} className={inputClass} />
          </Field>
          <Field label="Objektbeschreibung" hint="Ein Absatz pro Zeile.">
            <textarea
              name="description"
              defaultValue={reference?.description.join("\n")}
              rows={5}
              className={inputClass}
            />
          </Field>
          <Field label="Ausstattung" hint="Ein Merkmal pro Zeile.">
            <textarea
              name="equipment"
              defaultValue={reference?.equipment.join("\n")}
              rows={5}
              className={inputClass}
            />
          </Field>
          <Field label="Lage" hint="Beschreibung des Stadtteils und der Anbindung.">
            <textarea name="location" defaultValue={reference?.location} rows={3} className={inputClass} />
          </Field>
        </div>
      </Panel>

      <Panel title="Fotos" description="Das erste Bild erscheint als Vorschaubild auf der Referenzkarte.">
        <ImageUploader initialImages={reference?.images ?? []} folder={folder} />
      </Panel>

      <Panel title="Sichtbarkeit">
        <label className="flex items-start gap-3">
          <input
            type="checkbox"
            name="published"
            defaultChecked={reference?.published ?? true}
            className="mt-0.5 h-4 w-4 rounded border-border-strong text-accent-deep focus:ring-accent"
          />
          <span>
            <span className="block text-[0.8125rem] font-semibold text-ink">Auf der Website anzeigen</span>
            <span className="mt-0.5 block text-[0.75rem] text-text-muted">
              Nicht veröffentlichte Referenzen sind nur hier im Panel sichtbar.
            </span>
          </span>
        </label>
      </Panel>

      {state?.error && (
        <p role="alert" className="rounded-[14px] bg-warning-soft px-4 py-3 text-[0.8125rem] text-warning">
          {state.error}
        </p>
      )}

      <SubmitButton>{submitLabel}</SubmitButton>
    </form>
  );
}
