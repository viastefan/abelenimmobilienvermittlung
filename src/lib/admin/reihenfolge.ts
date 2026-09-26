/**
 * Reihenfolge der Objekte und Referenzen.
 *
 * In der Datenbank steht sie als Zahl je Eintrag. Eine Zahl eintippen zu
 * lassen, hieße, Lücken, Doppelte und negative Werte zu erklären — in der App
 * gibt es stattdessen „weiter nach vorn“ und „weiter nach hinten“. Danach
 * werden alle Einträge neu durchgezählt; so bleibt die Folge immer lückenlos.
 */
export function verschieben(ids: string[], id: string, richtung: -1 | 1): string[] | null {
  const index = ids.indexOf(id);
  const ziel = index + richtung;
  if (index === -1 || ziel < 0 || ziel >= ids.length) return null;

  const neu = [...ids];
  [neu[index], neu[ziel]] = [neu[ziel]!, neu[index]!];
  return neu;
}
