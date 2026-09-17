import { ImagePlaceholder } from "@/components/graphics/ImagePlaceholder";
import { PhotoImage } from "@/components/graphics/PhotoImage";

/**
 * Rendert ein echtes Foto, sobald eines hinterlegt ist — sonst die
 * Platzhalterfläche. `src` muss serverseitig aufgelöst sein (siehe
 * `src/lib/imagery.ts`), damit die Komponente auch in Client-Komponenten
 * funktioniert.
 *
 * Ob eine Datei existiert, lässt sich beim Rendern prüfen; ob ein fremder
 * Server sie ausliefert, erst im Browser. Antwortet er nicht, tritt dieselbe
 * Platzhalterfläche an die Stelle des Fotos — siehe `PhotoImage`.
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
      <PhotoImage
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        className={`object-cover ${className}`}
        fallback={
          <>
            <ImagePlaceholder label={label} className={className} />
            <span className="sr-only">{alt}</span>
          </>
        }
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
