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
   * Startseite, Hero. Zeigt auf das Schlüsselfoto des bisherigen Auftritts,
   * das weiterhin in der Wix-Mediathek liegt. Sobald die Datei unter
   * `public/images/hero-wohnstrasse.jpg` liegt, hier wieder darauf umstellen —
   * dann hängt die Startseite nicht mehr an einem fremden Dienst.
   */
  heroWohnstrasse:
    "https://static.wixstatic.com/media/59289a_5587cde630e1459b99f3ec60af89cd29~mv2.jpg",
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

/**
 * Siegel und Partnerzeichen der Aussteller.
 *
 * Sobald die Originalgrafiken (z. B. aus dem bestehenden Auftritt oder aus
 * dem Partnerbereich des Ausstellers) unter diesen Pfaden liegen, zeigt die
 * Website sie an. Solange sie fehlen, steht dort die eigene Typografie —
 * korrekt in der Aussage und ohne fremdes Logo nachzuahmen.
 */
export const badgeImages = {
  sprengnetter: "/images/badges/sprengnetter.png",
  immoscout24: "/images/badges/immoscout24-bronze.png",
} as const;
