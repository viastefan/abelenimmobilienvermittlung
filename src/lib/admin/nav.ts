/**
 * Welcher Bereich des Panels gerade markiert wird.
 *
 * Steht hier und nicht in der Komponente, weil es reine Logik ist — und
 * weil sie leicht falsch ist: jeder Pfad im Panel fängt mit `/admin` an,
 * die Übersicht wäre bei einem schlichten `startsWith` also immer
 * mitmarkiert. Sie gilt deshalb nur bei genauer Übereinstimmung, die
 * übrigen Bereiche auch auf ihren Unterseiten: „Immobilien“ bleibt
 * markiert, während eine Immobilie bearbeitet wird.
 */
export function istAktiv(pfad: string, href: string): boolean {
  if (href === "/admin") return pfad === "/admin";
  return pfad === href || pfad.startsWith(`${href}/`);
}
