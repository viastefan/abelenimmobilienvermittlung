"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { Cookie } from "lucide-react";
import { Sheet } from "@/components/ui/Sheet";
import {
  CONSENT_SETTINGS_EVENT,
  allAccepted,
  consentCategories,
  necessaryOnly,
  readConsent,
  writeConsent,
  type ConsentState,
} from "@/lib/consent";

/**
 * Einwilligungsbanner mit Kategorien.
 *
 * Erscheint erst nach dem ersten Rendern (deshalb kein Sprung im Layout) und
 * bleibt danach über den Fußzeilen-Link „Cookie-Einstellungen“ erreichbar.
 */
export function CookieConsent() {
  const [banner, setBanner] = useState(false);
  const [settings, setSettings] = useState(false);
  const [choice, setChoice] = useState<ConsentState>(necessaryOnly);

  useEffect(() => {
    const stored = readConsent();
    if (stored) {
      setChoice(stored.categories);
      return;
    }
    // Kurz warten, damit das Banner nicht mit dem ersten Bild konkurriert.
    const timer = setTimeout(() => setBanner(true), 700);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const onRequest = () => {
      setChoice(readConsent()?.categories ?? necessaryOnly);
      setBanner(false);
      setSettings(true);
    };
    window.addEventListener(CONSENT_SETTINGS_EVENT, onRequest);
    return () => window.removeEventListener(CONSENT_SETTINGS_EVENT, onRequest);
  }, []);

  const decide = useCallback((categories: ConsentState) => {
    writeConsent(categories);
    setChoice(categories);
    setBanner(false);
    setSettings(false);
  }, []);

  return (
    <>
      <div
        role="region"
        aria-label="Hinweis zum Datenschutz"
        className={`fixed inset-x-0 bottom-0 z-[80] px-4 pb-4 transition-all duration-500 ease-smooth sm:left-6 sm:right-auto sm:max-w-[25rem] sm:px-0 sm:pb-6 ${
          banner ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-6 opacity-0"
        }`}
        {...(banner ? {} : { "aria-hidden": true })}
      >
        <div className="rounded-[24px] bg-white shadow-soft/95 p-5 shadow-lift backdrop-blur-xl pb-safe sm:pb-5">
          <div className="flex items-start gap-3">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[14px] bg-accent-soft text-accent-deep">
              <Cookie className="h-[18px] w-[18px]" strokeWidth={1.8} aria-hidden="true" />
            </span>
            <div>
              <p className="font-display text-[0.9375rem] font-bold text-ink">Ihre Entscheidung</p>
              <p className="pretty mt-1.5 text-[0.8125rem] leading-relaxed text-text-muted">
                Wir verwenden nur, was für diese Website nötig ist. Statistik und externe Inhalte
                laden wir ausschließlich mit Ihrer Zustimmung. Details in der{" "}
                <Link href="/datenschutz" className="font-semibold text-accent-deep underline underline-offset-2">
                  Datenschutzerklärung
                </Link>
                .
              </p>
            </div>
          </div>

          <div className="mt-4 flex flex-col gap-2">
            <button
              type="button"
              onClick={() => decide(allAccepted)}
              className="w-full rounded-[14px] bg-accent-deep px-5 py-3 text-[0.875rem] font-semibold text-white transition-colors duration-200 hover:bg-accent-dark"
            >
              Alle akzeptieren
            </button>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => decide(necessaryOnly)}
                className="flex-1 rounded-[14px] bg-surface-mist px-4 py-3 text-[0.875rem] font-semibold text-ink transition-colors duration-200 hover:bg-accent-soft hover:text-accent-deep"
              >
                Nur notwendige
              </button>
              <button
                type="button"
                onClick={() => {
                  setBanner(false);
                  setSettings(true);
                }}
                className="flex-1 rounded-[14px] px-4 py-3 text-[0.875rem] font-semibold text-text-muted transition-colors duration-200 hover:text-ink"
              >
                Einstellungen
              </button>
            </div>
          </div>
        </div>
      </div>

      <Sheet
        open={settings}
        onClose={() => setSettings(false)}
        eyebrow="Datenschutz"
        title="Cookie-Einstellungen"
        footer={
          <div className="flex flex-col gap-2 sm:flex-row">
            <button
              type="button"
              onClick={() => decide(choice)}
              className="flex-1 rounded-[14px] bg-accent-deep px-5 py-3 text-[0.875rem] font-semibold text-white transition-colors duration-200 hover:bg-accent-dark"
            >
              Auswahl speichern
            </button>
            <button
              type="button"
              onClick={() => decide(allAccepted)}
              className="flex-1 rounded-[14px] bg-surface-mist px-5 py-3 text-[0.875rem] font-semibold text-ink transition-colors duration-200 hover:bg-accent-soft hover:text-accent-deep"
            >
              Alle akzeptieren
            </button>
          </div>
        }
      >
        <ul className="space-y-3">
          {consentCategories.map((category) => {
            const active = category.required || choice[category.key];
            return (
              <li key={category.key} className="rounded-[24px] bg-surface-warm p-4">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="font-display text-[0.9375rem] font-bold text-ink">{category.title}</p>
                    <p className="pretty mt-1.5 text-[0.8125rem] leading-relaxed text-text-muted">
                      {category.description}
                    </p>
                  </div>

                  <button
                    type="button"
                    role="switch"
                    aria-checked={active}
                    aria-label={`${category.title} ${active ? "deaktivieren" : "aktivieren"}`}
                    disabled={category.required}
                    onClick={() =>
                      setChoice((current) => ({ ...current, [category.key]: !current[category.key] }))
                    }
                    className={`relative mt-0.5 h-7 w-[3.25rem] shrink-0 rounded-full transition-colors duration-300 ease-smooth disabled:cursor-not-allowed disabled:opacity-60 ${
                      active ? "bg-accent-deep" : "bg-border-strong"
                    }`}
                  >
                    <span
                      className={`absolute top-1 h-5 w-5 rounded-full bg-white shadow-card transition-all duration-300 ease-smooth ${
                        active ? "left-[1.75rem]" : "left-1"
                      }`}
                      aria-hidden="true"
                    />
                  </button>
                </div>
                {category.required && (
                  <p className="mt-3 text-[0.75rem] font-semibold text-accent-deep">
                    Immer aktiv
                  </p>
                )}
              </li>
            );
          })}
        </ul>

        <p className="pretty mt-5 text-[0.8125rem] leading-relaxed text-text-subtle">
          Stand heute setzen wir ausschließlich technisch notwendige Speicherungen ein. Statistik und
          externe Inhalte sind vorbereitet, werden aber erst geladen, wenn Sie sie hier freigeben.
          Ihre Auswahl können Sie jederzeit über „Cookie-Einstellungen“ in der Fußzeile ändern.
        </p>
      </Sheet>
    </>
  );
}
