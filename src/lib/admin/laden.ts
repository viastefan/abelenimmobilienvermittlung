/**
 * Lesen für die App.
 *
 * Antwortet die Datenbank nicht, sagt die App das — statt „Noch keine
 * Objekte“ zu zeigen, als wären alle weg. Der Fehler landet auf der
 * Fehlerseite der App, die zum erneuten Versuch einlädt.
 */

const EINTRAGS_ID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

/** Eine Adresse wie /admin/immobilien/abc nennt keinen Eintrag — das heißt „gibt es nicht“, nicht „Fehler“. */
export function istEintragsId(id: string): boolean {
  return EINTRAGS_ID.test(id);
}

export function nichtGeladen(was: string, error: { message: string }): never {
  throw new Error(`${was} nicht geladen: ${error.message}`);
}
