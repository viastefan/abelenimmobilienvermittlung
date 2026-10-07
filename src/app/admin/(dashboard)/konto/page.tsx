import { createClient } from "@/lib/supabase/server";
import { KontoAnsicht } from "@/components/admin/ansichten/KontoAnsicht";

export const metadata = { title: "Ihr Zugang" };

export default async function AdminKonto() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return <KontoAnsicht email={user?.email} />;
}
