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
  /** Startseite „Über uns“ und Seite „Über uns“: Portrait Silke Abelen. */
  portrait: siteMedia.portrait,
  /** Startseite „Persönlich, Verlässlich“: dasselbe Schlüsselmotiv wie im Hero, als Foto statt Vollflächenbild. */
  personalService: siteMedia.heroKeyPhoto,
  /** Seite „Über Mich“, Tätigkeitsgebiet: Laptop-Arbeitsplatz. */
  ueberMichArbeitsplatz: siteMedia.contactIntro,
  /** Seite Bewertung. */
  bewertung: siteMedia.bewertung,
  /** Seite Verkaufen. */
  verkaufen: siteMedia.verkaufen,
  /** Seite Vermieten. */
  vermieten: siteMedia.vermieten,
  /** Seite Referenzen, Kopfbereich. */
  referenzen: siteMedia.referenzen,
} as const;

export type ImageKey = keyof typeof images;

