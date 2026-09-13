import type { Database } from "@/lib/supabase/database.types";
import { contactInterestLabels } from "../data/contact.ts";

export type InquiryStatus = "neu" | "in-bearbeitung" | "erledigt";

export const inquiryStatuses: { value: InquiryStatus; label: string }[] = [
  { value: "neu", label: "Neu" },
  { value: "in-bearbeitung", label: "In Bearbeitung" },
  { value: "erledigt", label: "Erledigt" },
];

export const inquiryStatusLabels: Record<InquiryStatus, string> = {
  neu: "Neu",
  "in-bearbeitung": "In Bearbeitung",
  erledigt: "Erledigt",
};

export type Inquiry = {
  id: string;
  name: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  interest: string;
  interestLabel: string;
  objectRef: string;
  message: string;
  status: InquiryStatus;
  note: string;
  createdAt: string;
};

export function isInquiryStatus(value: string): value is InquiryStatus {
  return value === "neu" || value === "in-bearbeitung" || value === "erledigt";
}

type InquiryRow = Database["public"]["Tables"]["inquiries"]["Row"];

export function mapRowToInquiry(row: InquiryRow): Inquiry {
  const status = isInquiryStatus(row.status) ? row.status : "neu";

  return {
    id: row.id,
    name: `${row.first_name} ${row.last_name}`.trim(),
    firstName: row.first_name,
    lastName: row.last_name,
    email: row.email,
    phone: row.phone,
    interest: row.interest,
    interestLabel: contactInterestLabels[row.interest] ?? row.interest,
    objectRef: row.object_ref,
    message: row.message,
    status,
    note: row.note,
    createdAt: row.created_at,
  };
}

export function formatInquiryDate(iso: string): string {
  return new Intl.DateTimeFormat("de-DE", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(iso));
}
