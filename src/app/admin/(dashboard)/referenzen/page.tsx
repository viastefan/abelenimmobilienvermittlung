import { getAllReferencesAdmin } from "@/lib/admin/references-data";
import { ReferenzenAnsicht } from "@/components/admin/ansichten/ListenAnsichten";

export const metadata = { title: "Referenzen" };

export default async function AdminReferenzen() {
  return <ReferenzenAnsicht referenzen={await getAllReferencesAdmin()} />;
}
