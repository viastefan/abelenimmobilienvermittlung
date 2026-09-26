import { getAllPropertiesAdmin } from "@/lib/admin/properties-data";
import { getAllReferencesAdmin } from "@/lib/admin/references-data";
import { getInquiriesAdmin } from "@/lib/admin/inquiries-data";
import { UebersichtAnsicht } from "@/components/admin/ansichten/UebersichtAnsicht";

export const metadata = { title: "Übersicht" };

export default async function AdminUebersicht() {
  const [objekte, referenzen, anfragen] = await Promise.all([
    getAllPropertiesAdmin(),
    getAllReferencesAdmin(),
    getInquiriesAdmin(),
  ]);

  return <UebersichtAnsicht jetzt={new Date()} objekte={objekte} referenzen={referenzen} anfragen={anfragen} />;
}
