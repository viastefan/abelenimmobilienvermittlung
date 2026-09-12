import { createReference } from "@/app/admin/reference-actions";
import { ReferenceForm } from "@/components/admin/ReferenceForm";
import { AdminPageHeader } from "@/components/admin/ui";

export default function NewReferencePage() {
  return (
    <div>
      <AdminPageHeader
        title="Neue Referenz"
        description="Ein vermitteltes Objekt für die Referenzen-Seite anlegen."
      />
      <div className="mt-7">
        <ReferenceForm action={createReference} submitLabel="Referenz anlegen" />
      </div>
    </div>
  );
}
