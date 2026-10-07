import { getAllPropertiesAdmin } from "@/lib/admin/properties-data";
import { ObjekteAnsicht } from "@/components/admin/ansichten/ListenAnsichten";

export const metadata = { title: "Objekte" };

export default async function AdminObjekte() {
  return <ObjekteAnsicht objekte={await getAllPropertiesAdmin()} />;
}
