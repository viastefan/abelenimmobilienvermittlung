export const PROPERTY_IMAGES_BUCKET = "property-images";

export function getStoragePathFromPublicUrl(url: string): string | null {
  const marker = `/object/public/${PROPERTY_IMAGES_BUCKET}/`;
  const index = url.indexOf(marker);
  if (index === -1) return null;
  return decodeURIComponent(url.slice(index + marker.length));
}

const ALLOWED_TYPES = new Set(["image/jpeg", "image/png", "image/webp", "image/avif"]);
export const MAX_IMAGE_BYTES = 8 * 1024 * 1024;

export function validateImageFile(file: File): string | null {
  if (!ALLOWED_TYPES.has(file.type)) {
    return "Bitte nur JPG, PNG, WebP oder AVIF hochladen.";
  }
  if (file.size > MAX_IMAGE_BYTES) {
    return "Die Datei ist größer als 8 MB.";
  }
  return null;
}
