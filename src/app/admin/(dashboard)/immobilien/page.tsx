import Link from "next/link";
import { Plus, Pencil, Star, Trash2 } from "lucide-react";
import { getAllPropertiesAdmin } from "@/lib/admin/properties-data";
import { deleteProperty, toggleFeatured, togglePublished } from "../../actions";
import { ConfirmSubmitButton } from "@/components/admin/ConfirmSubmitButton";
import { AdminLink, AdminPageHeader, EmptyState, StatusPill, adminButton } from "@/components/admin/ui";

export default async function AdminPropertiesPage() {
  const properties = await getAllPropertiesAdmin();

  return (
    <div>
      <AdminPageHeader
        title="Immobilien"
        description={`${properties.length} Objekte insgesamt.`}
        action={
          <AdminLink href="/admin/immobilien/neu">
            <Plus className="h-4 w-4" aria-hidden="true" />
            Neue Immobilie
          </AdminLink>
        }
      />

      {properties.length === 0 ? (
        <div className="mt-8">
          <EmptyState
            title="Noch keine Immobilie"
            description="Legen Sie Ihr erstes Objekt an — es erscheint danach direkt auf der Startseite."
            action={
              <AdminLink href="/admin/immobilien/neu">
                <Plus className="h-4 w-4" aria-hidden="true" />
                Immobilie anlegen
              </AdminLink>
            }
          />
        </div>
      ) : (
        <div className="mt-7 overflow-hidden rounded-[24px] bg-white shadow-soft ring-1 ring-border">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-border bg-surface-cool text-[0.6875rem] font-bold uppercase tracking-[0.1em] text-text-subtle">
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
                    <p className="text-[0.875rem] font-semibold text-ink">{property.title}</p>
                    <p className="mt-0.5 text-[0.75rem] text-text-muted">{property.city}</p>
                  </td>
                  <td className="px-5 py-4 text-[0.8125rem] text-text-muted">{property.statusLabel}</td>
                  <td className="px-5 py-4 text-[0.8125rem] text-text-muted">{property.priceLabel}</td>
                  <td className="px-5 py-4">
                    <div className="flex flex-wrap items-center gap-2">
                      <form action={togglePublished.bind(null, property.id, !property.published)}>
                        <button
                          type="submit"
                          className="transition-opacity hover:opacity-75"
                          aria-label={property.published ? "Verbergen" : "Veröffentlichen"}
                        >
                          <StatusPill published={property.published} />
                        </button>
                      </form>
                      <form action={toggleFeatured.bind(null, property.id, !property.featured)}>
                        <button
                          type="submit"
                          aria-label={property.featured ? "Nicht mehr hervorheben" : "Hervorheben"}
                          title={property.featured ? "Nicht mehr auf der Startseite hervorheben" : "Auf der Startseite hervorheben"}
                          className={`rounded-full p-1.5 transition-colors ${
                            property.featured
                              ? "bg-accent-soft text-accent-deep"
                              : "text-text-subtle hover:bg-surface-cool hover:text-ink"
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
                        className={adminButton.ghost}
                        aria-label="Bearbeiten"
                      >
                        <Pencil className="h-4 w-4" aria-hidden="true" />
                      </Link>
                      <form action={deleteProperty.bind(null, property.id)}>
                        <ConfirmSubmitButton
                          confirmMessage={`"${property.title}" wirklich löschen? Das kann nicht rückgängig gemacht werden.`}
                          className={adminButton.ghost}
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
