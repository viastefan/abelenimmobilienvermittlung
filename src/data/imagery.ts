import { siteMedia } from "@/data/wix-media";

/**
 * Bildquellen der Website — eine Datei, ein Ort.
 *
 * Jeder Bildplatz zeigt zuerst auf eine Datei unter `public/images/…`.
 * Sobald diese Datei existiert, wird sie automatisch verwendet. Alternativ
 * kann statt des Dateinamens eine vollständige https-URL eingetragen werden
 * (z. B. ein Bild aus dem bestehenden Auftritt oder ein lizenziertes Foto).
 *
 * Solange weder Datei noch URL vorhanden ist, rendert die Website eine
 * ruhige Platzhalterfläche im Markenlook — kein kaputtes Bild.
 */

export const images = {
  /**
   * Startseite, Hero: das Schlüsselfoto des bisherigen Auftritts. Liegt eine
   * Datei unter `public/images/hero-wohnstrasse.jpg`, hier darauf umstellen —
   * dann hängt die Startseite nicht mehr an einem fremden Dienst.
   */
  heroWohnstrasse: siteMedia.heroKey,
  /** Startseite „Über uns“ und Seite „Über uns“: Portrait Silke Abelen. Hochformat. */
  portrait: "/images/silke-abelen.jpg",
  /** Seite Bewertung. */
  bewertung: "/images/bewertung.jpg",
  /** Seite Verkaufen. */
  verkaufen: "/images/verkaufen.jpg",
  /** Seite Vermieten. */
  vermieten: "/images/vermieten.jpg",
  /** Seite Referenzen, Kopfbereich. */
  referenzen: "/images/referenzen.jpg",
} as const;

export type ImageKey = keyof typeof images;

