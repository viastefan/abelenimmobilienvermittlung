import "server-only";
import { createClient } from "@/lib/supabase/server";
import { getSupabaseEnv } from "@/lib/supabase/env";

export type NewInquiry = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  interest: string;
  objectRef: string;
  address: string;
  message: string;
};

/**
 * Legt eine Anfrage in der Datenbank ab, damit sie im Panel sichtbar wird —
 * unabhängig vom E-Mail-Versand. Schlägt das Speichern fehl, ist das kein
 * Grund, die Anfrage der Besucherin gegenüber zu verwerfen: der Versand
 * entscheidet, dieser Schritt ist die Kopie fürs Postfach.
 */
export async function saveInquiry(inquiry: NewInquiry): Promise<boolean> {
  if (!getSupabaseEnv()) return false;

  try {
    const supabase = await createClient();
    const { error } = await supabase.from("inquiries").insert({
      first_name: inquiry.firstName.slice(0, 120),
      last_name: inquiry.lastName.slice(0, 120),
      email: inquiry.email.slice(0, 200),
      phone: inquiry.phone.slice(0, 60),
      interest: inquiry.interest.slice(0, 40),
      object_ref: inquiry.objectRef.slice(0, 200),
      address: inquiry.address.slice(0, 200),
      message: inquiry.message.slice(0, 4000),
    });

    if (error) {
      console.error("Anfrage konnte nicht gespeichert werden:", error.message);
      return false;
    }
    return true;
  } catch (error) {
    console.error("Anfrage konnte nicht gespeichert werden:", error);
    return false;
  }
}
