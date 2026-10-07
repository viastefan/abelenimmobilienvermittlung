import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { countNewInquiries } from "@/lib/admin/inquiries-data";
import { AdminShell } from "@/components/admin/AdminShell";

export default async function AdminDashboardLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/admin/login");
  }

  const offeneAnfragen = await countNewInquiries();

  return (
    <AdminShell email={user.email} offeneAnfragen={offeneAnfragen}>
      {children}
    </AdminShell>
  );
}
