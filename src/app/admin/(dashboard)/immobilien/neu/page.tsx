import { PropertyForm } from "@/components/admin/PropertyForm";
import { createProperty } from "../../../actions";

export default function NewPropertyPage() {
  return (
    <div>
      <h1 className="font-display text-2xl font-semibold text-ink">Neue Immobilie</h1>
      <p className="mt-1 text-sm text-text-muted">
        Legen Sie ein neues Objekt an. Es wird erst nach Aktivierung von „Veröffentlicht“ auf der Website sichtbar.
      </p>

      <div className="mt-8">
        <PropertyForm action={createProperty} submitLabel="Immobilie anlegen" />
      </div>
    </div>
  );
}
