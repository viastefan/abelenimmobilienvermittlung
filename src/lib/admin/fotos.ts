/**
 * Woher ein Foto kommt — und ob die App es löschen darf.
 *
 * In der Liste eines Objekts stehen Adressen verschiedener Herkunft: neue
 * Fotos liegen bei Vercel Blob, ältere im Speicher der Datenbank, die Fotos
 * des bisherigen Auftritts bei Wix oder als Kopie im Projekt. Löschen darf
 * die App nur, was sie selbst hochgeladen hat. Eine Kopie im Projekt gehört
 * zum Code und trägt zugleich die Vorführobjekte; ein Wix-Bild gehört Wix.
 */

export const FOTO_BUCKET = "property-images";

export type FotoHerkunft = "blob" | "supabase" | "projekt" | "wix" | "fremd";

export function fotoHerkunft(url: string): FotoHerkunft {
  if (url.startsWith("/")) return "projekt";

  let host: string;
  try {
    host = new URL(url).hostname;
  } catch {
    return "fremd";
  }

  if (host.endsWith(".public.blob.vercel-storage.com")) return "blob";
  if (host.endsWith(".supabase.co") && url.includes(`/storage/v1/object/public/${FOTO_BUCKET}/`)) {
    return "supabase";
  }
  if (host === "static.wixstatic.com") return "wix";
  return "fremd";
}

/** Pfad einer Datei im Speicher der Datenbank, aus ihrer öffentlichen Adresse. */
export function supabasePfad(url: string): string | null {
  const marker = `/object/public/${FOTO_BUCKET}/`;
  const index = url.indexOf(marker);
  if (index === -1) return null;
  return decodeURIComponent(url.slice(index + marker.length));
}

/**
 * Fotos, die beim Speichern aus der Liste gefallen sind und der App gehören.
 *
 * Gelöscht wird erst nach dem Speichern, nicht beim Klick auf „Entfernen“:
 * verlässt jemand das Formular ungespeichert, zeigt die Website das Foto
 * sonst weiter an — nur liegt es dann nirgends mehr.
 */
export function zuLoeschendeFotos(vorher: string[], nachher: string[]) {
  const bleibt = new Set(nachher);
  const weg = vorher.filter((url) => !bleibt.has(url));
  return {
    blob: weg.filter((url) => fotoHerkunft(url) === "blob"),
    supabase: weg.map((url) => (fotoHerkunft(url) === "supabase" ? supabasePfad(url) : null)).filter(
      (pfad): pfad is string => Boolean(pfad)
    ),
  };
}

export const ERLAUBTE_FOTOTYPEN = ["image/jpeg", "image/png", "image/webp", "image/avif"] as const;

/** Obergrenze je Datei nach dem Verkleinern im Browser — davor darf es mehr sein. */
export const MAX_FOTO_BYTES = 8 * 1024 * 1024;
