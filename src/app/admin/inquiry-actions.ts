"use server";

import { revalidatePath } from "next/cache";
import { angemeldet } from "@/lib/admin/sitzung";
import { isInquiryStatus } from "@/types/inquiry";

function aktualisieren() {
  revalidatePath("/admin", "layout");
}

export async function setInquiryStatus(id: string, status: string) {
  if (!isInquiryStatus(status)) throw new Error("Unbekannter Status.");

  const supabase = await angemeldet();
  if (!supabase) throw new Error("Nicht angemeldet");
  const { error } = await supabase.from("inquiries").update({ status }).eq("id", id);
  if (error) {
    console.error("Status der Anfrage nicht gesetzt:", error.message);
    throw new Error("Status nicht gesetzt");
  }

  aktualisieren();
}

/** Notiz zur Anfrage — wird beim Verlassen des Feldes gespeichert, ohne Knopf. */
export async function saveInquiryNote(id: string, notiz: string) {
  const supabase = await angemeldet();
  if (!supabase) throw new Error("Nicht angemeldet");
  const { error } = await supabase
    .from("inquiries")
    .update({ note: notiz.trim().slice(0, 4000) })
    .eq("id", id);
  if (error) {
    console.error("Notiz nicht gespeichert:", error.message);
    throw new Error("Notiz nicht gespeichert");
  }

  aktualisieren();
}

export async function deleteInquiry(id: string) {
  const supabase = await angemeldet();
  if (!supabase) throw new Error("Nicht angemeldet");
  const { error } = await supabase.from("inquiries").delete().eq("id", id);
  if (error) {
    console.error("Anfrage nicht gelöscht:", error.message);
    throw new Error("Löschen fehlgeschlagen");
  }

  aktualisieren();
  return { ok: true };
}
