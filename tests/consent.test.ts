import assert from "node:assert/strict";
import { afterEach, beforeEach, describe, it } from "node:test";
import {
  CONSENT_STORAGE_KEY,
  CONSENT_VERSION,
  allAccepted,
  necessaryOnly,
  readConsent,
  writeConsent,
} from "../src/lib/consent.ts";

type Store = { [key: string]: string };

function fakeWindow(initial: Store = {}, options: { throwOnWrite?: boolean } = {}) {
  const store: Store = { ...initial };
  return {
    localStorage: {
      getItem: (key: string) => store[key] ?? null,
      setItem: (key: string, value: string) => {
        if (options.throwOnWrite) throw new Error("Speicher gesperrt");
        store[key] = value;
      },
    },
    store,
  };
}

const globals = globalThis as { window?: unknown };

afterEach(() => {
  delete globals.window;
});

describe("readConsent", () => {
  it("gibt ohne gespeicherte Entscheidung null zurück", () => {
    globals.window = fakeWindow();
    assert.equal(readConsent(), null);
  });

  it("liest eine gültige Entscheidung", () => {
    globals.window = fakeWindow({
      [CONSENT_STORAGE_KEY]: JSON.stringify({
        version: CONSENT_VERSION,
        decidedAt: "2026-09-01T10:00:00.000Z",
        categories: allAccepted,
      }),
    });

    const stored = readConsent();
    assert.deepEqual(stored?.categories, allAccepted);
  });

  it("fragt erneut, wenn die gespeicherte Version veraltet ist", () => {
    globals.window = fakeWindow({
      [CONSENT_STORAGE_KEY]: JSON.stringify({
        version: CONSENT_VERSION - 1,
        decidedAt: "2026-09-01T10:00:00.000Z",
        categories: allAccepted,
      }),
    });

    assert.equal(readConsent(), null);
  });

  it("ignoriert kaputten Inhalt statt zu scheitern", () => {
    globals.window = fakeWindow({ [CONSENT_STORAGE_KEY]: "{kein json" });
    assert.equal(readConsent(), null);
  });

  it("erzwingt die notwendige Kategorie, auch wenn im Speicher false steht", () => {
    globals.window = fakeWindow({
      [CONSENT_STORAGE_KEY]: JSON.stringify({
        version: CONSENT_VERSION,
        decidedAt: "2026-09-01T10:00:00.000Z",
        categories: { necessary: false, statistics: false, media: false },
      }),
    });

    assert.equal(readConsent()?.categories.necessary, true);
  });
});

describe("writeConsent", () => {
  it("speichert die Auswahl mit Version und Zeitpunkt", () => {
    const win = fakeWindow();
    globals.window = win;

    const stored = writeConsent({ necessary: true, statistics: true, media: false });
    assert.equal(stored.version, CONSENT_VERSION);
    assert.equal(stored.categories.statistics, true);
    assert.equal(stored.categories.media, false);
    assert.ok(win.store[CONSENT_STORAGE_KEY]);
  });

  it("bleibt bei gesperrtem Speicher benutzbar", () => {
    globals.window = fakeWindow({}, { throwOnWrite: true });
    const stored = writeConsent(necessaryOnly);
    assert.equal(stored.categories.necessary, true);
  });
});
