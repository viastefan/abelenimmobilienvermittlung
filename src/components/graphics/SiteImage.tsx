import Image from "next/image";
import { ImagePlaceholder } from "@/components/graphics/ImagePlaceholder";

/**
 * Rendert ein echtes Foto, sobald eines hinterlegt ist — sonst die
 * Platzhalterfläche. `src` muss serverseitig aufgelöst sein (siehe
 * `src/lib/imagery.ts`), damit die Komponente auch in Client-Komponenten
 * funktioniert.
 */
export function SiteImage({
  src,
  alt,
  label,
  sizes = "100vw",
  priority = false,
  className = "",
}: {
  src?: string;
  alt: string;
  label?: string;
  sizes?: string;
  priority?: boolean;
  className?: string;
}) {
  if (src) {
    return (
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        className={`object-cover ${className}`}
      />
    );
  }

  return (
    <>
      <ImagePlaceholder label={label} className={className} />
      <span className="sr-only">{alt}</span>
    </>
  );
}
