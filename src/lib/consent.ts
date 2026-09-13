/**
 * Einwilligungsverwaltung (DSGVO / TTDSG).
 *
 * Gespeichert wird ausschließlich lokal im Browser — kein Cookie, keine
 * Übertragung an einen Server. Die Version steigt, sobald sich die
 * Kategorien ändern; dann wird erneut gefragt.
 */

export const CONSENT_STORAGE_KEY = "abelen.consent";
export const CONSENT_VERSION = 1;

export const consentCategories = [
  {
    key: "necessary",
    title: "Notwendig",
    description:
      "Wird für den Betrieb der Website gebraucht: Ihre Auswahl in diesem Dialog und der Schutz des Kontaktformulars gegen Missbrauch.",
    required: true,
  },
  {
    key: "statistics",
    title: "Statistik",
    description:
      "Anonyme Reichweitenmessung, damit wir erkennen, welche Inhalte gebraucht werden. Wird erst gesetzt, wenn Sie zustimmen.",
    required: false,
  },
  {
    key: "media",
    title: "Externe Inhalte",
    description:
      "Karten, Videos und Objektansichten anderer Anbieter. Ohne Ihre Zustimmung laden wir diese Inhalte nicht und übermitteln auch keine IP-Adresse dorthin.",
    required: false,
  },
] as const;

export type ConsentCategory = (typeof consentCategories)[number]["key"];

export type ConsentState = Record<ConsentCategory, boolean>;

export type StoredConsent = {
  version: number;
  decidedAt: string;
  categories: ConsentState;
};

export const necessaryOnly: ConsentState = { necessary: true, statistics: false, media: false };
export const allAccepted: ConsentState = { necessary: true, statistics: true, media: true };

function isConsentState(value: unknown): value is ConsentState {
  if (typeof value !== "object" || value === null) return false;
  const record = value as Record<string, unknown>;
  return consentCategories.every((category) => typeof record[category.key] === "boolean");
}

/** Liest die gespeicherte Entscheidung — `null`, solange keine vorliegt. */
export function readConsent(): StoredConsent | null {
  if (typeof window === "undefined") return null;

  try {
    const raw = window.localStorage.getItem(CONSENT_STORAGE_KEY);
    if (!raw) return null;

    const parsed = JSON.parse(raw) as unknown;
    if (typeof parsed !== "object" || parsed === null) return null;

    const { version, decidedAt, categories } = parsed as Partial<StoredConsent>;
    if (version !== CONSENT_VERSION || typeof decidedAt !== "string" || !isConsentState(categories)) {
      return null;
    }

    // „Notwendig“ ist nicht abwählbar, egal was im Speicher steht.
    return { version, decidedAt, categories: { ...categories, necessary: true } };
  } catch {
    return null;
  }
}

export function writeConsent(categories: ConsentState): StoredConsent {
  const stored: StoredConsent = {
    version: CONSENT_VERSION,
    decidedAt: new Date().toISOString(),
    categories: { ...categories, necessary: true },
  };

  try {
    window.localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(stored));
  } catch {
    // Privater Modus oder gesperrter Speicher: die Auswahl gilt für diese Sitzung.
  }

  return stored;
}

/** Öffnet den Einstellungsdialog von überall auf der Seite. */
export const CONSENT_SETTINGS_EVENT = "abelen:consent-settings";

export function openConsentSettings() {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent(CONSENT_SETTINGS_EVENT));
}
