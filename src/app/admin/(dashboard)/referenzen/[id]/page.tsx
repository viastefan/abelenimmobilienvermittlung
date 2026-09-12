import { notFound } from "next/navigation";
import { getReferenceByIdAdmin } from "@/lib/admin/references-data";
import { updateReference } from "@/app/admin/reference-actions";
import { ReferenceForm } from "@/components/admin/ReferenceForm";
import { AdminPageHeader } from "@/components/admin/ui";

export default async function EditReferencePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const reference = await getReferenceByIdAdmin(id);
  if (!reference) notFound();

  const action = updateReference.bind(null, id);

  return (
    <div>
      <AdminPageHeader title={reference.title} description={`${reference.region} · ${reference.categoryLabel}`} />
      <div className="mt-7">
        <ReferenceForm reference={reference} action={action} submitLabel="Änderungen speichern" />
      </div>
    </div>
  );
}
