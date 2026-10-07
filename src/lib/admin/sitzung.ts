import "server-only";
import { createClient } from "@/lib/supabase/server";

/**
 * Datenbankzugang für Server-Aktionen — nur mit gültiger Anmeldung.
 *
 * Server-Aktionen lassen sich von außen aufrufen, auch ohne die App. Die
 * Datenbank weist Unangemeldete zwar ab, aber stumm: ein Update ohne
 * Berechtigung ändert null Zeilen und meldet keinen Fehler. Was danach
 * käme — Fotos löschen, mit dem Schlüssel des Speichers statt mit dem der
 * Nutzerin — liefe trotzdem. Jede Aktion fragt deshalb zuerst hier.
 */
export async function angemeldet() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user ? supabase : null;
}

export const ABGELAUFEN = "Ihre Anmeldung ist abgelaufen. Bitte laden Sie die Seite neu und melden Sie sich an.";
