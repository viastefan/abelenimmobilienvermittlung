import fs from "node:fs";
import path from "node:path";

/**
 * Photography drop-in.
 *
 * Content references images by their public path (e.g. `/images/silke-abelen.jpg`)
 * or by a full https URL — see `src/data/imagery.ts`. Until that file exists in
 * `public/`, the UI renders a quiet brand placeholder instead, so the site never
 * shows a broken image and adding real photography is a pure file copy.
 */

const publicDir = path.join(process.cwd(), "public");
const cache = new Map<string, boolean>();

export function publicImageExists(src?: string | null): boolean {
  if (!src) return false;
  if (src.startsWith("http://") || src.startsWith("https://")) return true;
  if (!src.startsWith("/")) return false;

  const cached = cache.get(src);
  if (cached !== undefined) return cached;

  const absolute = path.resolve(publicDir, src.replace(/^\//, ""));
  let exists = false;
  try {
    // `..` darf nicht aus public/ herausführen: die Datei wäre über die
    // Website ohnehin nicht erreichbar und das Bild bliebe leer.
    const insidePublic = absolute === publicDir || absolute.startsWith(publicDir + path.sep);
    exists = insidePublic && fs.existsSync(absolute) && fs.statSync(absolute).isFile();
  } catch {
    exists = false;
  }
  cache.set(src, exists);
  return exists;
}

/** Returns the image path only when it can actually be rendered. */
export function resolveImage(src?: string | null): string | undefined {
  return publicImageExists(src) ? src! : undefined;
}

/** Resolves the first usable image from a list (e.g. a listing gallery). */
export function resolveFirstImage(sources?: (string | null | undefined)[]): string | undefined {
  if (!sources) return undefined;
  for (const source of sources) {
    const resolved = resolveImage(source);
    if (resolved) return resolved;
  }
  return undefined;
}

/** Alle darstellbaren Bilder einer Liste — für Galerien. */
export function resolveImages(sources?: (string | null | undefined)[]): string[] {
  if (!sources) return [];
  return sources.map(resolveImage).filter((value): value is string => Boolean(value));
}
