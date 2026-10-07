/**
 * Formular-Helfer für die Admin-Masken. Bewusst außerhalb der
 * "use server"-Dateien: dort darf jeder Export eine async Server Action sein.
 */

export function parseLines(value: FormDataEntryValue | null): string[] {
  return String(value ?? "")
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
}

export function parseKeyValueList(
  formData: FormData,
  labelField: string,
  valueField: string
): { label: string; value: string }[] {
  const labels = formData.getAll(labelField) as string[];
  const values = formData.getAll(valueField) as string[];
  const items: { label: string; value: string }[] = [];
  labels.forEach((label, index) => {
    const trimmedLabel = label.trim();
    const trimmedValue = (values[index] ?? "").trim();
    if (trimmedLabel && trimmedValue) items.push({ label: trimmedLabel, value: trimmedValue });
  });
  return items;
}

export function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/ä/g, "ae")
    .replace(/ö/g, "oe")
    .replace(/ü/g, "ue")
    .replace(/ß/g, "ss")
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-+|-+$)/g, "");
}

/** Zahl aus einem Formularfeld, `null` wenn leer. */
export function parseOptionalNumber(value: FormDataEntryValue | null): number | null {
  const raw = String(value ?? "").trim().replace(",", ".");
  if (!raw) return null;
  const parsed = Number(raw);
  return Number.isFinite(parsed) ? parsed : null;
}

export function parseNumber(value: FormDataEntryValue | null): number {
  return parseOptionalNumber(value) ?? 0;
}

/**
 * Eine Zahl, wie man sie in Deutschland schreibt.
 *
 * „171,31“ und „395.000“ sind beide richtig — der Punkt trennt Tausender, das
 * Komma Nachkommastellen. `Number()` verstünde „395.000“ als 395. Steht nur
 * ein Punkt da, entscheidet die Form: genau drei Ziffern dahinter heißen
 * Tausender, alles andere ist ein Dezimalpunkt („171.31“).
 */
export function deutscheZahl(value: FormDataEntryValue | string | null | undefined): number | null {
  let raw = String(value ?? "")
    .replace(/[€\s]|m²|qm/gi, "")
    .trim();
  if (!raw) return null;

  if (raw.includes(",")) {
    raw = raw.replace(/\./g, "").replace(",", ".");
  } else if (/^-?\d{1,3}(\.\d{3})+$/.test(raw)) {
    raw = raw.replace(/\./g, "");
  }

  const zahl = Number(raw);
  return Number.isFinite(zahl) ? zahl : null;
}

/** Eine Zahl fürs Eingabefeld: 171.31 → „171,31“, 6 → „6“, nichts → leer. */
export function zahlAnzeigen(value: number | null | undefined): string {
  if (value === null || value === undefined || !Number.isFinite(value) || value === 0) return "";
  return String(value).replace(".", ",");
}

/** Ein Preis fürs Eingabefeld, mit Tausenderpunkten: 395000 → „395.000“. */
export function preisAnzeigen(value: number | null | undefined): string {
  if (value === null || value === undefined || !Number.isFinite(value) || value <= 0) return "";
  return new Intl.NumberFormat("de-DE", { maximumFractionDigits: 0 }).format(value);
}

/**
 * Die erste freie Adresse: der Stamm selbst, sonst mit „-2“, „-3“ dahinter.
 * Zwei Objekte dürfen denselben Titel tragen — nur ihre Adressen nicht.
 */
export function naechsteFreieAdresse(stamm: string, vergeben: Set<string>): string {
  if (!vergeben.has(stamm)) return stamm;
  for (let nummer = 2; ; nummer++) {
    const kandidat = `${stamm}-${nummer}`;
    if (!vergeben.has(kandidat)) return kandidat;
  }
}
