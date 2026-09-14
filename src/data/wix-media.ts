/**
 * Bilder aus der Mediathek des bisherigen Wix-Auftritts.
 *
 * Die Dateien liegen weiterhin dort. Das ist bewusst ein Zwischenschritt:
 * Solange der Wix-Auftritt besteht, spart es das Umkopieren; sobald er
 * abgeschaltet wird, müssen die Dateien nach `public/images/` wandern
 * (siehe `public/images/BILDER-ANLEITUNG.md`).
 */

const HOST = "https://static.wixstatic.com/media";

/** Baut die Adresse aus der Wix-Datei-ID. */
export function wixImage(fileId: string): string {
  return `${HOST}/${fileId}`;
}

/** Marke: Bildmarke, Wortmarke und die beiden Siegel der Aussteller. */
export const brandMedia = {
  /** Haus mit Wellen, freigestellt, quadratisch. */
  mark: wixImage("59289a_2c2357230afe48a7aec4dd597a66c081~mv2.png"),
  /** Wortmarke „Büro für Immobilien Bewertung & Vermittlung“. */
  wordmark: wixImage("59289a_567e1babf150401f8922bbe08e53d8b7~mv2.jpg"),
  /** Sprengnetter-Siegel mit Text — Siegel und Schrift stecken im Bild. */
  sprengnetter: wixImage("59289a_701819e394674cf3898ba7c32b62942c~mv2.png"),
  /** ImmoScout24 „Bronze Partner“, quadratisch. */
  immoscout24: wixImage("59289a_d3a8962bc91449f8b04239961651f757~mv2.png"),
} as const;

/** Redaktionelle Bilder der Website. */
export const siteMedia = {
  /** Hand mit Schlüssel — das Aufmacherbild des bisherigen Auftritts. */
  heroKey: wixImage("59289a_5587cde630e1459b99f3ec60af89cd29~mv2.jpg"),
} as const;

/**
 * Objektfotos, je Objekt gruppiert.
 *
 * Die Zuordnung stammt aus der Sammlung „Objekte“ des bisherigen Auftritts,
 * Feld `objektbilder` — also aus derselben Quelle, aus der die alte Website
 * ihre Galerien speiste. Sie ist damit nicht geschätzt, sondern übernommen.
 */
export const objectMedia = {
  /** Helle individuelle Doppelhaushälfte, Leverkusen-Rheindorf. */
  doppelhaushaelfte: [
    "59289a_c2ff04b047014257a1c3940b34fdce92~mv2.jpg", // Titelfoto
    "59289a_60303008f17f415e8f7beac56aa69cba~mv2.jpg", // Hauseingang
    "59289a_4d14efbfeac84626bb4e1f3ee6532a97~mv2.jpg", // OG Wohnzimmer mit Balkon
    "59289a_90c35f472afc4b4f9639f828fa4c4d85~mv2.jpg", // OG Bad
    "59289a_6155bf7c7f204260af382b6cb07247ad~mv2.jpg", // Dachgeschoss Kochnische
    "59289a_39bbb185b11840a58b7ca7a5d3409f10~mv2.jpg", // Garten
  ].map(wixImage),

  /** 4-Zimmer-Wohnung, Leverkusen-Opladen (Aufnahmen Gebhardstraße). */
  wohnungGebhardstrasse: [
    "59289a_1038f7cc0b4241329184df4abbbd2f1e~mv2.jpg", // Haus Schrägansicht
    "59289a_ae6b630f59af4583ac92372098e859b5~mv2.jpg", // Wohnzimmer
    "59289a_a101769071ef433ba2d0a3b84581ee57~mv2.jpg", // Esszimmer
    "59289a_dedb4b24a22242dda1f6f7691e27843d~mv2.jpg", // Küche
    "59289a_b0b15db8dac74081978f1d72f0d1d633~mv2.jpg", // Bad
    "59289a_13e6c5ffc5284964adb78deb577c7817~mv2.jpg", // Balkon
  ].map(wixImage),

  /** 3-Zimmer-Wohnung, Leverkusen — mit Süd- und Nordbalkon, reserviert. */
  hausMitLoggia: [
    "59289a_737b33e1a7454e87af0af49ff98f2398~mv2.jpg", // Haus von außen
    "59289a_8370d5833d80443dba34099911da815b~mv2.jpg", // Wohnzimmer
    "59289a_6706477c9a4c46a2aef4c00b05daa18d~mv2.jpg", // Wohnzimmer Fensterfront
    "59289a_386b5d514ae841169081f445894834ed~mv2.jpg", // Bad 1
    "59289a_47a2f7dc94964678b9a2c5354124f15b~mv2.jpg", // Bad 2
    "59289a_ee6100ec6b92477b81fb317f79dfe703~mv2.jpg", // Balkon Südseite
    "59289a_4bc8f6f6b3ff43ce8cbffff6924bbebf~mv2.jpg", // Loggia
  ].map(wixImage),

  /** Einfamilienhaus, Serie „FEH“ — derzeit keinem Objekt zugeordnet. */
  einfamilienhaus: [
    "59289a_b0669c4357f146678ce9fa90c134b569~mv2.jpg", // Haus
    "59289a_a240901cbc03489b9942c85a83914bba~mv2.jpg", // Hauskante
    "59289a_fcbb0ec5153a444f86c2c0270deaa988~mv2.jpg", // Wohnzimmer
    "59289a_8e0cfd1a79b54e8ca90660867518f563~mv2.jpg", // Küche
    "59289a_266df51fab164843851f2de73938e3a5~mv2.jpg", // Küche, zweite Aufnahme
    "59289a_1718df13b5d0408f8382a98c9adfa9e1~mv2.jpg", // Flur
  ].map(wixImage),

  /** 2-Zimmer-Wohnung in Haan, vermittelt (Kreis Mettmann). */
  wohnungHaan: [
    "59289a_7899b90d25e0499a91955a2c18bff34c~mv2.jpg", // Titelfoto
    "59289a_78252eaf77d647b4b3a7804b2614eacb~mv2.jpg", // Wohnzimmer
    "59289a_c8472eac5bdd46e2961d94af1709ec94~mv2.jpg", // Küche
  ].map(wixImage),

  /** Einzelaufnahmen ohne Objektbezug. */
  einzelbilder: [
    "59289a_038e01f2f0014af8995142b9aa356fbb~mv2.jpg", // Einfamilienhaus vom Garten
    "59289a_dfaca59134b34ae4af88a990ef2f7dce~mv2.jpg", // Dachgeschosswohnung
    "59289a_b3773dae8e3b4149b54f01ccb026e8ca~mv2.jpg", // Leichlingen, Gartenansicht
    "59289a_b27d73883c5940a5aa102dcfe6a59939~mv2.jpg", // Haus von außen
  ].map(wixImage),
} as const;
