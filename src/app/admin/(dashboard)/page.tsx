import Link from "next/link";
import { Plus, Building2, Eye, EyeOff, Star } from "lucide-react";
import { getAllPropertiesAdmin } from "@/lib/admin/properties-data";

export default async function AdminDashboardPage() {
  const properties = await getAllPropertiesAdmin();

  const stats = [
    { label: "Immobilien gesamt", value: properties.length, icon: Building2 },
    { label: "Veröffentlicht", value: properties.filter((p) => p.published).length, icon: Eye },
    { label: "Entwürfe", value: properties.filter((p) => !p.published).length, icon: EyeOff },
    { label: "Hervorgehoben", value: properties.filter((p) => p.featured).length, icon: Star },
  ];

  const recent = properties.slice(0, 5);

  return (
    <div>
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="font-display text-2xl font-semibold text-ink">Übersicht</h1>
          <p className="mt-1 text-sm text-text-muted">Verwalten Sie Ihre Immobilienangebote.</p>
        </div>
        <Link
          href="/admin/immobilien/neu"
          className="inline-flex items-center gap-2 rounded-md bg-ink px-4 py-2.5 text-sm font-semibold text-white hover:bg-accent-dark"
        >
          <Plus className="h-4 w-4" aria-hidden="true" />
          Neue Immobilie
        </Link>
      </div>

      <div className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label} className="rounded-lg border border-border bg-surface p-5">
            <stat.icon className="h-5 w-5 text-accent" aria-hidden="true" />
            <p className="mt-3 font-display text-2xl font-semibold text-ink">{stat.value}</p>
            <p className="mt-1 text-xs text-text-muted">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="mt-10">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-lg font-semibold text-ink">Zuletzt bearbeitet</h2>
          <Link href="/admin/immobilien" className="text-sm font-medium text-accent hover:underline">
            Alle ansehen
          </Link>
        </div>

        {recent.length === 0 ? (
          <p className="mt-4 text-sm text-text-muted">
            Noch keine Immobilien angelegt.{" "}
            <Link href="/admin/immobilien/neu" className="underline">
              Jetzt die erste Immobilie anlegen
            </Link>
            .
          </p>
        ) : (
          <div className="mt-4 divide-y divide-border overflow-hidden rounded-lg border border-border bg-surface">
            {recent.map((property) => (
              <Link
                key={property.id}
                href={`/admin/immobilien/${property.id}`}
                className="flex items-center justify-between gap-4 px-5 py-4 hover:bg-surface-soft"
              >
                <div>
                  <p className="text-sm font-medium text-ink">{property.title}</p>
                  <p className="text-xs text-text-muted">
                    {property.city} · {property.priceLabel}
                  </p>
                </div>
                <span
                  className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-medium ${
                    property.published ? "bg-success-soft text-success" : "bg-warning-soft text-warning"
                  }`}
                >
                  {property.published ? "Veröffentlicht" : "Entwurf"}
                </span>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
