import Link from "next/link";
import { Eye, EyeOff, Pencil, Plus, Trash2 } from "lucide-react";
import { getAllReferencesAdmin } from "@/lib/admin/references-data";
import { deleteReference, toggleReferencePublished } from "@/app/admin/reference-actions";
import { ConfirmSubmitButton } from "@/components/admin/ConfirmSubmitButton";
import { AdminLink, AdminPageHeader, EmptyState, StatusPill, adminButton } from "@/components/admin/ui";

export default async function AdminReferencesPage() {
  const references = await getAllReferencesAdmin();

  return (
    <div>
      <AdminPageHeader
        title="Referenzen"
        description={`${references.length} vermittelte Objekte.`}
        action={
          <AdminLink href="/admin/referenzen/neu">
            <Plus className="h-4 w-4" aria-hidden="true" />
            Neue Referenz
          </AdminLink>
        }
      />

      {references.length === 0 ? (
        <div className="mt-8">
          <EmptyState
            title="Noch keine Referenzen"
            description="Legen Sie vermittelte Objekte an — sie erscheinen auf der Referenzen-Seite und auf der Startseite."
            action={
              <AdminLink href="/admin/referenzen/neu">
                <Plus className="h-4 w-4" aria-hidden="true" />
                Erste Referenz anlegen
              </AdminLink>
            }
          />
        </div>
      ) : (
        <div className="mt-7 overflow-hidden rounded-[24px] bg-white shadow-soft ring-1 ring-border">
          <div className="hidden grid-cols-[minmax(0,1fr)_9rem_7rem_9rem] gap-4 border-b border-border bg-surface-cool px-5 py-3 text-[0.6875rem] font-bold uppercase tracking-[0.1em] text-text-subtle lg:grid">
            <span>Objekt</span>
            <span>Status</span>
            <span>Sichtbar</span>
            <span className="text-right">Aktionen</span>
          </div>

          <ul className="divide-y divide-border">
            {references.map((reference) => (
              <li
                key={reference.id}
                className="grid gap-3 px-5 py-4 lg:grid-cols-[minmax(0,1fr)_9rem_7rem_9rem] lg:items-center lg:gap-4"
              >
                <div className="min-w-0">
                  <p className="truncate text-[0.875rem] font-semibold text-ink">{reference.title}</p>
                  <p className="mt-0.5 truncate text-[0.75rem] text-text-muted">
                    {reference.region}
                    {reference.typeLabel ? ` · ${reference.typeLabel}` : ""}
                  </p>
                </div>

                <span className="text-[0.8125rem] text-text-muted">{reference.categoryLabel}</span>

                <StatusPill published={reference.published} />

                <div className="flex items-center gap-1 lg:justify-end">
                  <form
                    action={async () => {
                      "use server";
                      await toggleReferencePublished(reference.id, !reference.published);
                    }}
                  >
                    <button
                      type="submit"
                      className={adminButton.ghost}
                      aria-label={reference.published ? "Verbergen" : "Veröffentlichen"}
                      title={reference.published ? "Verbergen" : "Veröffentlichen"}
                    >
                      {reference.published ? (
                        <EyeOff className="h-4 w-4" aria-hidden="true" />
                      ) : (
                        <Eye className="h-4 w-4" aria-hidden="true" />
                      )}
                    </button>
                  </form>

                  <Link
                    href={`/admin/referenzen/${reference.id}`}
                    className={adminButton.ghost}
                    aria-label="Bearbeiten"
                    title="Bearbeiten"
                  >
                    <Pencil className="h-4 w-4" aria-hidden="true" />
                  </Link>

                  <form
                    action={async () => {
                      "use server";
                      await deleteReference(reference.id);
                    }}
                  >
                    <ConfirmSubmitButton
                      confirmMessage={`„${reference.title}“ wirklich löschen?`}
                      className={adminButton.ghost}
                      aria-label="Löschen"
                      title="Löschen"
                    >
                      <Trash2 className="h-4 w-4" aria-hidden="true" />
                    </ConfirmSubmitButton>
                  </form>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
