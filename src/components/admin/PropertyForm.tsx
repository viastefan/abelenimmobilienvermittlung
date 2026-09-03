"use client";

import { useActionState, useState } from "react";
import { KeyValueListEditor } from "./KeyValueListEditor";
import { ImageUploader } from "./ImageUploader";
import { SubmitButton } from "./SubmitButton";
import type { Property } from "@/types/property";
import type { PropertyFormResult } from "@/app/admin/actions";

const statusOptions: { value: string; label: string }[] = [
  { value: "zu-verkaufen", label: "Zu verkaufen" },
  { value: "reserviert", label: "Reserviert" },
  { value: "verkauft", label: "Verkauft" },
];

function Field({
  label,
  children,
  hint,
}: {
  label: string;
  children: React.ReactNode;
  hint?: string;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-ink">{label}</span>
      {children}
      {hint && <span className="mt-1 block text-xs text-text-muted">{hint}</span>}
    </label>
  );
}

const inputClass =
  "w-full rounded-md border border-border bg-surface px-3.5 py-2.5 text-sm text-ink placeholder:text-text-muted/60 focus-visible:border-ink focus-visible:outline-none";

export function PropertyForm({
  property,
  action,
  submitLabel,
}: {
  property?: Property;
  action: (prevState: PropertyFormResult, formData: FormData) => Promise<PropertyFormResult>;
  submitLabel: string;
}) {
  const [state, formAction] = useActionState<PropertyFormResult, FormData>(action, undefined);
  const [folder] = useState(() => property?.id ?? crypto.randomUUID());

  return (
    <form action={formAction} className="max-w-4xl space-y-10">
      <section className="space-y-5 rounded-lg border border-border bg-surface p-6">
        <h2 className="font-display text-lg font-semibold text-ink">Grunddaten</h2>
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Titel">
            <input name="title" defaultValue={property?.title} required className={inputClass} />
          </Field>
          <Field label="Slug" hint="URL-Segment, z. B. eigentumswohnung-leverkusen. Leer lassen, um es aus dem Titel zu erzeugen.">
            <input name="slug" defaultValue={property?.slug} className={inputClass} />
          </Field>
          <Field label="Ort">
            <input name="city" defaultValue={property?.city} required className={inputClass} />
          </Field>
          <Field label="Status">
            <select name="status" defaultValue={property?.status ?? "zu-verkaufen"} className={inputClass}>
              {statusOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Kaufpreis (€)">
            <input
              name="price"
              type="number"
              min={0}
              step={1000}
              defaultValue={property?.price}
              required
              className={inputClass}
            />
          </Field>
          <Field label="Wohnfläche (m²)">
            <input
              name="living_space"
              type="number"
              min={0}
              step={0.01}
              defaultValue={property?.livingSpace}
              required
              className={inputClass}
            />
          </Field>
          <Field label="Zimmer">
            <input name="rooms" type="number" min={0} step={0.5} defaultValue={property?.rooms} required className={inputClass} />
          </Field>
          <Field label="Zusatzhinweis" hint="z. B. „Stellplatz optional · 15.000 €“">
            <input name="hero_note" defaultValue={property?.heroNote} className={inputClass} />
          </Field>
        </div>
      </section>

      <section className="space-y-5 rounded-lg border border-border bg-surface p-6">
        <h2 className="font-display text-lg font-semibold text-ink">Texte</h2>
        <Field label="Zusammenfassung" hint="Kurzer Teaser-Text für Karten und Meta-Beschreibung.">
          <textarea name="summary" defaultValue={property?.summary} required rows={2} className={inputClass} />
        </Field>
        <Field label="Beschreibung" hint="Ein Absatz pro Zeile.">
          <textarea
            name="description"
            defaultValue={property?.description.join("\n")}
            rows={5}
            className={inputClass}
          />
        </Field>
        <Field label="Lage">
          <textarea name="location" defaultValue={property?.location} rows={3} className={inputClass} />
        </Field>
        <Field label="Ausstattung" hint="Ein Punkt pro Zeile.">
          <textarea
            name="equipment"
            defaultValue={property?.equipment.join("\n")}
            rows={4}
            className={inputClass}
          />
        </Field>
      </section>

      <section className="space-y-5 rounded-lg border border-border bg-surface p-6">
        <KeyValueListEditor
          label="Kennzahlen (Anzeige-Grid auf der Detailseite)"
          labelFieldName="feature_label"
          valueFieldName="feature_value"
          initialItems={property?.features ?? []}
          labelPlaceholder="z. B. Balkone"
          valuePlaceholder="z. B. 2 (Süd & Nord)"
        />
      </section>

      <section className="space-y-5 rounded-lg border border-border bg-surface p-6">
        <KeyValueListEditor
          label="Energieinformationen"
          labelFieldName="energy_label"
          valueFieldName="energy_value"
          initialItems={property?.energy ?? []}
          labelPlaceholder="z. B. Energieausweis"
          valuePlaceholder="z. B. Auf Anfrage"
        />
      </section>

      <section className="space-y-5 rounded-lg border border-border bg-surface p-6">
        <h2 className="font-display text-lg font-semibold text-ink">Bilder</h2>
        <ImageUploader initialImages={property?.images ?? []} folder={folder} />
      </section>

      <section className="flex flex-wrap gap-6 rounded-lg border border-border bg-surface p-6">
        <label className="flex items-center gap-2 text-sm text-ink">
          <input type="checkbox" name="published" defaultChecked={property?.published ?? false} className="h-4 w-4 rounded border-border" />
          Veröffentlicht (auf der Website sichtbar)
        </label>
        <label className="flex items-center gap-2 text-sm text-ink">
          <input type="checkbox" name="featured" defaultChecked={property?.featured ?? false} className="h-4 w-4 rounded border-border" />
          Als „Aktuell im Verkauf“ hervorheben
        </label>
      </section>

      {state?.error && (
        <p role="alert" className="rounded-md bg-red-50 px-4 py-3 text-sm text-red-700">
          {state.error}
        </p>
      )}

      <SubmitButton>{submitLabel}</SubmitButton>
    </form>
  );
}
