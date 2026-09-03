import { notFound } from "next/navigation";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { PropertyForm } from "@/components/admin/PropertyForm";
import { getPropertyByIdAdmin } from "@/lib/admin/properties-data";
import { updateProperty } from "../../../actions";

export default async function EditPropertyPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const property = await getPropertyByIdAdmin(id);
  if (!property) notFound();

  const boundAction = updateProperty.bind(null, property.id);

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl font-semibold text-ink">{property.title}</h1>
          <p className="mt-1 text-sm text-text-muted">{property.city}</p>
        </div>
        {property.published && (
          <Link
            href={`/immobilien/${property.slug}`}
            target="_blank"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-accent hover:underline"
          >
            Auf der Website ansehen
            <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
          </Link>
        )}
      </div>

      <div className="mt-8">
        <PropertyForm property={property} action={boundAction} submitLabel="Änderungen speichern" />
      </div>
    </div>
  );
}
