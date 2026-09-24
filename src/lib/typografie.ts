/**
 * Hält Zahl und Einheit auf einer Zeile.
 *
 * In den schmalen Eckdatenfeldern am Telefon brach „ca. 171,31 m²“ hinter
 * der Zahl um, und „m²“ stand allein in der nächsten Zeile. Ein geschütztes
 * Leerzeichen zwischen Zahl und Einheit — und hinter „ca.“ — verhindert
 * das, ohne dass die Werte im Panel anders eingegeben werden müssen: die
 * Angabe wird erst beim Anzeigen gefasst, gespeichert bleibt sie, wie sie
 * eingetragen wurde.
 */
export function zusammenhalten(text: string): string {
  return text
    .replace(/(\d)\s+(?=(?:m²|m2|qm|€|EUR|%)(?![\p{L}\d]))/gu, "$1 ")
    .replace(/(^|\s)(ca\.|rd\.|rund|etwa)\s+(?=\d)/giu, "$1$2 ");
}
