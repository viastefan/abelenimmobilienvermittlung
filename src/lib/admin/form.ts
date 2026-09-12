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
