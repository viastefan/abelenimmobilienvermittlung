"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { useContactSheet, type ContactSheetOptions } from "@/components/contact/ContactSheetProvider";

/**
 * Öffnet die Kontakt-Sheet. Ohne Provider (z. B. im Admin) fällt der Button
 * auf die Kontaktseite zurück, statt ins Leere zu greifen.
 */
export function ContactButton({
  children,
  className = "",
  options,
  fallbackHref = "/kontakt",
  ariaLabel,
  onActivate,
}: {
  children: ReactNode;
  className?: string;
  options?: ContactSheetOptions;
  fallbackHref?: string;
  ariaLabel?: string;
  /** Läuft vor dem Öffnen — z. B. um das Mobilmenü zu schließen. */
  onActivate?: () => void;
}) {
  const sheet = useContactSheet();

  if (!sheet) {
    return (
      <Link href={fallbackHref} className={className} aria-label={ariaLabel} onClick={onActivate}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type="button"
      onClick={() => {
        onActivate?.();
        sheet.open(options);
      }}
      className={className}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  );
}
