import "server-only";
import { del } from "@vercel/blob";
import type { createClient } from "@/lib/supabase/server";
import { FOTO_BUCKET, zuLoeschendeFotos } from "@/lib/admin/fotos";
import type { FotoSpeicher } from "@/components/admin/Fotos";

/**
 * Wohin neue Fotos gehen.
 *
 * Vercel Blob, sobald der Speicher mit dem Projekt verbunden ist — dann
 * steht `BLOB_READ_WRITE_TOKEN` bereit. Bis dahin der Speicher der
 * Datenbank, damit das Hochladen nie ausfällt.
 *
 * Vorschau-Fassungen laden ebenfalls in den Speicher der Datenbank. Sie
 * schreiben in dieselbe Datenbank wie die Website, und eine ältere Fassung
 * der Website kann Adressen von Vercel Blob nicht anzeigen — ein beim
 * Ausprobieren hochgeladenes Foto legte sonst die öffentliche Seite des
 * Objekts lahm. Adressen aus dem Speicher der Datenbank zeigt jede Fassung.
 */
export function fotoSpeicher(): FotoSpeicher {
  if (!process.env.BLOB_READ_WRITE_TOKEN) return "supabase";
  if (process.env.VERCEL_ENV === "preview") return "supabase";
  return "blob";
}

/**
 * Löscht Fotos, die nach dem Speichern nirgends mehr gebraucht werden.
 * Scheitert das, bleibt die Datei liegen — ein verwaistes Foto kostet ein
 * paar Kilobyte, ein fehlgeschlagenes Speichern die Arbeit der Nutzerin.
 */
export async function fotosAufraeumen(
  supabase: Awaited<ReturnType<typeof createClient>>,
  vorher: string[],
  nachher: string[]
) {
  const weg = zuLoeschendeFotos(vorher, nachher);

  if (weg.blob.length > 0 && process.env.BLOB_READ_WRITE_TOKEN) {
    await del(weg.blob).catch((error) => console.error("Fotos (Blob) nicht gelöscht:", error));
  }
  if (weg.supabase.length > 0) {
    const { error } = await supabase.storage.from(FOTO_BUCKET).remove(weg.supabase);
    if (error) console.error("Fotos (Datenbank-Speicher) nicht gelöscht:", error.message);
  }
}
