import { getInquiriesAdmin } from "@/lib/admin/inquiries-data";
import { AnfragenAnsicht } from "@/components/admin/ansichten/AnfragenAnsichten";
import { isInquiryStatus } from "@/types/inquiry";

export const metadata = { title: "Anfragen" };

export default async function AdminAnfragen({ searchParams }: { searchParams: Promise<{ stand?: string }> }) {
  const { stand } = await searchParams;
  return (
    <AnfragenAnsicht
      anfragen={await getInquiriesAdmin()}
      stand={stand && isInquiryStatus(stand) ? stand : undefined}
      jetzt={new Date()}
    />
  );
}
