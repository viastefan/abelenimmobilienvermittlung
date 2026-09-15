"use client";

import { useActionState, useState } from "react";
import { KeyValueListEditor } from "./KeyValueListEditor";
import { ImageUploader } from "./ImageUploader";
import { SubmitButton } from "./SubmitButton";
import { Field, Panel, inputClass } from "./ui";
import type { Property } from "@/types/property";
import type { PropertyFormResult } from "@/app/admin/actions";

const statusOptions: { value: string; label: string }[] = [
  { value: "zu-verkaufen", label: "Zu verkaufen" },
  { value: "reserviert", label: "Reserviert" },
  { value: "verkauft", label: "Verkauft" },
];

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
    <form action={formAction} className="max-w-4xl space-y-5">
      <Panel title="Grunddaten">
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
      </Panel>

      <Panel title="Texte">
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
      </Panel>

      <Panel>
        <KeyValueListEditor
          label="Kennzahlen (Anzeige-Grid auf der Detailseite)"
          labelFieldName="feature_label"
          valueFieldName="feature_value"
          initialItems={property?.features ?? []}
          labelPlaceholder="z. B. Balkone"
          valuePlaceholder="z. B. 2 (Süd & Nord)"
        />
      </Panel>

      <Panel>
        <KeyValueListEditor
          label="Energieinformationen"
          labelFieldName="energy_label"
          valueFieldName="energy_value"
          initialItems={property?.energy ?? []}
          labelPlaceholder="z. B. Energieausweis"
          valuePlaceholder="z. B. Auf Anfrage"
        />
      </Panel>

      <Panel title="Fotos" description="Das erste Bild erscheint als Vorschaubild.">
        <ImageUploader initialImages={property?.images ?? []} folder={folder} />
      </Panel>

      <Panel title="Sichtbarkeit">
        <div className="space-y-4">
          <label className="flex items-start gap-3">
            <input
              type="checkbox"
              name="published"
              defaultChecked={property?.published ?? false}
              className="mt-0.5 h-4 w-4 rounded border-border-strong text-accent-deep focus:ring-accent"
            />
            <span>
              <span className="block text-[0.8125rem] font-semibold text-ink">Auf der Website anzeigen</span>
              <span className="mt-0.5 block text-[0.75rem] text-text-muted">
                Entwürfe sind nur hier im Panel sichtbar.
              </span>
            </span>
          </label>

          <label className="flex items-start gap-3">
            <input
              type="checkbox"
              name="featured"
              defaultChecked={property?.featured ?? false}
              className="mt-0.5 h-4 w-4 rounded border-border-strong text-accent-deep focus:ring-accent"
            />
            <span>
              <span className="block text-[0.8125rem] font-semibold text-ink">
                Auf der Startseite hervorheben
              </span>
              <span className="mt-0.5 block text-[0.75rem] text-text-muted">
                Erscheint groß unter „Aktuell zum Verkauf“, solange der Status nicht „verkauft“ ist.
              </span>
            </span>
          </label>
        </div>
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
