"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { isInquiryStatus } from "@/types/inquiry";

function revalidateInquiries() {
  revalidatePath("/admin/anfragen");
  revalidatePath("/admin");
}

export async function setInquiryStatus(id: string, status: string) {
  if (!isInquiryStatus(status)) throw new Error("Unbekannter Status.");

  const supabase = await createClient();
  const { error } = await supabase.from("inquiries").update({ status }).eq("id", id);
  if (error) throw new Error(`Status konnte nicht gesetzt werden: ${error.message}`);

  revalidateInquiries();
}

export async function saveInquiryNote(id: string, formData: FormData) {
  const note = String(formData.get("note") ?? "").trim().slice(0, 4000);

  const supabase = await createClient();
  const { error } = await supabase.from("inquiries").update({ note }).eq("id", id);
  if (error) throw new Error(`Notiz konnte nicht gespeichert werden: ${error.message}`);

  revalidateInquiries();
}

export async function deleteInquiry(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("inquiries").delete().eq("id", id);
  if (error) throw new Error(`Löschen fehlgeschlagen: ${error.message}`);

  revalidateInquiries();
}
