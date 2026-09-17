import Link from "next/link";
import { Building2, Eye, Inbox, Plus, Star } from "lucide-react";
import { getAllPropertiesAdmin } from "@/lib/admin/properties-data";
import { getAllReferencesAdmin } from "@/lib/admin/references-data";
import { getInquiriesAdmin } from "@/lib/admin/inquiries-data";
import { formatInquiryDate } from "@/types/inquiry";
import { AdminLink, AdminPageHeader, EmptyState, Panel, StatusPill } from "@/components/admin/ui";

export default async function AdminDashboardPage() {
  const [properties, references, inquiries] = await Promise.all([
    getAllPropertiesAdmin(),
    getAllReferencesAdmin(),
    getInquiriesAdmin(),
  ]);

  const openInquiries = inquiries.filter((inquiry) => inquiry.status === "neu");

  const live = properties.filter((property) => property.published);
  const forSale = live.filter((property) => property.status !== "verkauft");

  const stats = [
    { label: "Immobilien live", value: live.length, icon: Eye },
    { label: "Davon verfügbar", value: forSale.length, icon: Building2 },
    { label: "Referenzen live", value: references.filter((item) => item.published).length, icon: Star },
    { label: "Neue Anfragen", value: openInquiries.length, icon: Inbox },
  ];

  return (
    <div>
      <AdminPageHeader
        title="Übersicht"
        description="Was gerade auf der Website steht."
        action={
          <AdminLink href="/admin/immobilien/neu">
            <Plus className="h-4 w-4" aria-hidden="true" />
            Neue Immobilie
          </AdminLink>
        }
      />

      <div className="mt-7 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label} className="rounded-[24px] bg-white shadow-soft ring-1 ring-border p-5">
            <stat.icon className="h-4 w-4 text-accent-mid" strokeWidth={1.6} aria-hidden="true" />
            <p className="mt-4 font-display text-[1.75rem] font-extrabold leading-none tabular-nums text-ink">
              {stat.value}
            </p>
            <p className="mt-2 text-[0.75rem] text-text-muted">{stat.label}</p>
          </div>
        ))}
      </div>

      {forSale.length === 0 && (
        <div className="mt-6 rounded-[24px] border border-warning/30 bg-warning-soft px-5 py-4 text-[0.8125rem] leading-relaxed text-warning">
          Aktuell steht kein verfügbares Objekt auf der Startseite. Sobald Sie eine Immobilie
          veröffentlichen, die nicht als „verkauft“ markiert ist, erscheint sie dort automatisch.
        </div>
      )}

      {openInquiries.length > 0 && (
        <div className="mt-8">
          <Panel title="Warten auf Antwort" description="Neue Anfragen aus dem Kontaktformular">
            <ul className="-mx-2 divide-y divide-border">
              {openInquiries.slice(0, 5).map((inquiry) => (
                <li key={inquiry.id}>
                  <Link
                    href="/admin/anfragen?status=neu"
                    className="flex items-center justify-between gap-4 rounded-[14px] px-2 py-3 transition-colors hover:bg-surface-cool"
                  >
                    <span className="min-w-0">
                      <span className="block truncate text-[0.8125rem] font-semibold text-ink">
                        {inquiry.name} · {inquiry.interestLabel}
                      </span>
                      <span className="mt-0.5 block truncate text-[0.75rem] text-text-muted">
                        {inquiry.message}
                      </span>
                    </span>
                    <span className="shrink-0 text-[0.75rem] tabular-nums text-text-subtle">
                      {formatInquiryDate(inquiry.createdAt)}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </Panel>
        </div>
      )}

      <div className="mt-8 grid gap-5 lg:grid-cols-2">
        <Panel title="Zuletzt bearbeitet" description="Immobilien">
          {properties.length === 0 ? (
            <EmptyState
              title="Noch keine Immobilie"
              description="Legen Sie Ihr erstes Objekt an — es erscheint danach direkt auf der Startseite."
              action={<AdminLink href="/admin/immobilien/neu">Immobilie anlegen</AdminLink>}
            />
          ) : (
            <ul className="-mx-2 divide-y divide-border">
              {properties.slice(0, 5).map((property) => (
                <li key={property.id}>
                  <Link
                    href={`/admin/immobilien/${property.id}`}
                    className="flex items-center justify-between gap-4 rounded-[14px] px-2 py-3 transition-colors hover:bg-surface-cool"
                  >
                    <span className="min-w-0">
                      <span className="block truncate text-[0.8125rem] font-semibold text-ink">
                        {property.title}
                      </span>
                      <span className="mt-0.5 block truncate text-[0.75rem] text-text-muted">
                        {property.city} · {property.priceLabel}
                      </span>
                    </span>
                    <StatusPill published={property.published} />
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </Panel>

        <Panel title="Zuletzt bearbeitet" description="Referenzen">
          {references.length === 0 ? (
            <EmptyState
              title="Noch keine Referenz"
              description="Vermittelte Objekte belegen Ihre Arbeit — sie erscheinen auf der Referenzen-Seite."
              action={<AdminLink href="/admin/referenzen/neu">Referenz anlegen</AdminLink>}
            />
          ) : (
            <ul className="-mx-2 divide-y divide-border">
              {references.slice(0, 5).map((reference) => (
                <li key={reference.id}>
                  <Link
                    href={`/admin/referenzen/${reference.id}`}
                    className="flex items-center justify-between gap-4 rounded-[14px] px-2 py-3 transition-colors hover:bg-surface-cool"
                  >
                    <span className="min-w-0">
                      <span className="block truncate text-[0.8125rem] font-semibold text-ink">
                        {reference.title}
                      </span>
                      <span className="mt-0.5 block truncate text-[0.75rem] text-text-muted">
                        {reference.region} · {reference.categoryLabel}
                      </span>
                    </span>
                    <StatusPill published={reference.published} />
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </Panel>
      </div>
    </div>
  );
}
