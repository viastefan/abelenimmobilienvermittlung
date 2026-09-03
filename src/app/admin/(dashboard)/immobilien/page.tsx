import Link from "next/link";
import { Plus, Pencil, Star, Trash2 } from "lucide-react";
import { getAllPropertiesAdmin } from "@/lib/admin/properties-data";
import { deleteProperty, toggleFeatured, togglePublished } from "../../actions";
import { ConfirmSubmitButton } from "@/components/admin/ConfirmSubmitButton";

export default async function AdminPropertiesPage() {
  const properties = await getAllPropertiesAdmin();

  return (
    <div>
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="font-display text-2xl font-semibold text-ink">Immobilien</h1>
          <p className="mt-1 text-sm text-text-muted">{properties.length} Objekte insgesamt.</p>
        </div>
        <Link
          href="/admin/immobilien/neu"
          className="inline-flex items-center gap-2 rounded-md bg-ink px-4 py-2.5 text-sm font-semibold text-white hover:bg-accent-dark"
        >
          <Plus className="h-4 w-4" aria-hidden="true" />
          Neue Immobilie
        </Link>
      </div>

      {properties.length === 0 ? (
        <p className="mt-8 text-sm text-text-muted">
          Noch keine Immobilien angelegt.{" "}
          <Link href="/admin/immobilien/neu" className="underline">
            Jetzt anlegen
          </Link>
          .
        </p>
      ) : (
        <div className="mt-6 overflow-hidden rounded-lg border border-border bg-surface">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-border bg-surface-soft text-xs uppercase tracking-wide text-text-muted">
              <tr>
                <th className="px-5 py-3 font-medium">Objekt</th>
                <th className="px-5 py-3 font-medium">Status</th>
                <th className="px-5 py-3 font-medium">Preis</th>
                <th className="px-5 py-3 font-medium">Sichtbarkeit</th>
                <th className="px-5 py-3 font-medium text-right">Aktionen</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {properties.map((property) => (
                <tr key={property.id}>
                  <td className="px-5 py-4">
                    <p className="font-medium text-ink">{property.title}</p>
                    <p className="text-xs text-text-muted">{property.city}</p>
                  </td>
                  <td className="px-5 py-4 text-text-muted">{property.statusLabel}</td>
                  <td className="px-5 py-4 text-text-muted">{property.priceLabel}</td>
                  <td className="px-5 py-4">
                    <div className="flex flex-wrap items-center gap-2">
                      <form action={togglePublished.bind(null, property.id, !property.published)}>
                        <button
                          type="submit"
                          className={`rounded-full px-2.5 py-1 text-xs font-medium transition-colors ${
                            property.published
                              ? "bg-success-soft text-success hover:bg-success/15"
                              : "bg-warning-soft text-warning hover:bg-warning/15"
                          }`}
                        >
                          {property.published ? "Veröffentlicht" : "Entwurf"}
                        </button>
                      </form>
                      <form action={toggleFeatured.bind(null, property.id, !property.featured)}>
                        <button
                          type="submit"
                          aria-label={property.featured ? "Nicht mehr hervorheben" : "Hervorheben"}
                          title={property.featured ? "Nicht mehr hervorheben" : "Als Featured markieren"}
                          className={`rounded-full p-1.5 ${
                            property.featured
                              ? "bg-accent/15 text-accent"
                              : "text-text-muted hover:bg-surface-soft"
                          }`}
                        >
                          <Star className="h-3.5 w-3.5" fill={property.featured ? "currentColor" : "none"} aria-hidden="true" />
                        </button>
                      </form>
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center justify-end gap-1.5">
                      <Link
                        href={`/admin/immobilien/${property.id}`}
                        className="rounded-md p-2 text-text-muted hover:bg-surface-soft hover:text-ink"
                        aria-label="Bearbeiten"
                      >
                        <Pencil className="h-4 w-4" aria-hidden="true" />
                      </Link>
                      <form action={deleteProperty.bind(null, property.id)}>
                        <ConfirmSubmitButton
                          confirmMessage={`"${property.title}" wirklich löschen? Das kann nicht rückgängig gemacht werden.`}
                          className="rounded-md p-2 text-text-muted hover:bg-red-50 hover:text-red-600"
                        >
                          <span className="sr-only">Löschen</span>
                          <Trash2 className="h-4 w-4" aria-hidden="true" />
                        </ConfirmSubmitButton>
                      </form>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
