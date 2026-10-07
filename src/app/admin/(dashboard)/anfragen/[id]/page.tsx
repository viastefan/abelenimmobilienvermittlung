import { notFound } from "next/navigation";
import { getInquiryByIdAdmin } from "@/lib/admin/inquiries-data";
import { AnfrageAnsicht } from "@/components/admin/ansichten/AnfragenAnsichten";

export const metadata = { title: "Anfrage" };

export default async function AdminAnfrage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const anfrage = await getInquiryByIdAdmin(id);
  if (!anfrage) notFound();
  return <AnfrageAnsicht anfrage={anfrage} />;
}
