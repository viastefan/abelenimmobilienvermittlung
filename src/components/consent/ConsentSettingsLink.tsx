"use client";

import { openConsentSettings } from "@/lib/consent";

/** Öffnet den Einwilligungsdialog erneut — Pflichtweg nach DSGVO. */
export function ConsentSettingsLink({ className = "" }: { className?: string }) {
  return (
    <button type="button" onClick={openConsentSettings} className={className}>
      Cookie-Einstellungen
    </button>
  );
}
