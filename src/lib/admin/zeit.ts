/**
 * Zeitangaben, wie man sie sagt — nicht, wie ein Rechner sie speichert.
 *
 * Der Server läuft in UTC. Silke Abelen lebt in Leichlingen: ohne feste
 * Zeitzone stünde abends „Guten Tag“ über der App und eine Anfrage von
 * 0:30 Uhr auf dem Vortag.
 */

const ZONE = "Europe/Berlin";

function teile(datum: Date) {
  const werte = new Intl.DateTimeFormat("de-DE", {
    timeZone: ZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(datum);
  const zahl = (typ: Intl.DateTimeFormatPartTypes) => Number(werte.find((teil) => teil.type === typ)?.value);
  return { jahr: zahl("year"), monat: zahl("month"), tag: zahl("day"), stunde: zahl("hour"), minute: zahl("minute") };
}

/** Tage zwischen zwei Kalendertagen in Berlin, unabhängig von der Uhrzeit. */
function kalendertage(von: Date, bis: Date): number {
  const a = teile(von);
  const b = teile(bis);
  return Math.round((Date.UTC(b.jahr, b.monat - 1, b.tag) - Date.UTC(a.jahr, a.monat - 1, a.tag)) / 86_400_000);
}

export function begruessung(jetzt: Date): string {
  const { stunde } = teile(jetzt);
  if (stunde >= 5 && stunde < 11) return "Guten Morgen";
  if (stunde >= 11 && stunde < 18) return "Guten Tag";
  return "Guten Abend";
}

/** „Samstag, 26. September“ */
export function heuteLang(jetzt: Date): string {
  return new Intl.DateTimeFormat("de-DE", {
    timeZone: ZONE,
    weekday: "long",
    day: "numeric",
    month: "long",
  }).format(jetzt);
}

/**
 * „Gerade eben“, „Vor 12 Minuten“, „Heute, 14:32“, „Gestern, 09:05“,
 * „Montag, 09:05“, „12. Sept.“, „03.11.2025“ — je nachdem, wie lange es her ist.
 */
export function wann(iso: string, jetzt: Date): string {
  const datum = new Date(iso);
  const minuten = Math.floor((jetzt.getTime() - datum.getTime()) / 60_000);
  if (minuten < 1) return "Gerade eben";
  if (minuten < 60) return minuten === 1 ? "Vor einer Minute" : `Vor ${minuten} Minuten`;

  const uhrzeit = new Intl.DateTimeFormat("de-DE", { timeZone: ZONE, hour: "2-digit", minute: "2-digit" }).format(datum);
  const tage = kalendertage(datum, jetzt);
  if (tage === 0) return `Heute, ${uhrzeit}`;
  if (tage === 1) return `Gestern, ${uhrzeit}`;
  if (tage < 7) {
    const wochentag = new Intl.DateTimeFormat("de-DE", { timeZone: ZONE, weekday: "long" }).format(datum);
    return `${wochentag}, ${uhrzeit}`;
  }

  const gleichesJahr = teile(datum).jahr === teile(jetzt).jahr;
  return new Intl.DateTimeFormat("de-DE", {
    timeZone: ZONE,
    day: gleichesJahr ? "numeric" : "2-digit",
    month: gleichesJahr ? "short" : "2-digit",
    ...(gleichesJahr ? {} : { year: "numeric" }),
  }).format(datum);
}

/** Vollständiges Datum mit Uhrzeit — für die Kopfzeile einer Anfrage. */
export function genau(iso: string): string {
  return new Intl.DateTimeFormat("de-DE", {
    timeZone: ZONE,
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(iso));
}
