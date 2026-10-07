"use client";

import { useEffect, useTransition } from "react";
import { useRouter } from "next/navigation";
import { CloudOff, LoaderCircle, RotateCw } from "lucide-react";
import { LogoMark } from "@/components/layout/Logo";
import { site } from "@/data/site";
import { knopf } from "@/components/admin/ui";

/**
 * Fängt auf, was vor dem Rahmen der App scheitert — die Anmeldung oder die
 * Prüfung, wer angemeldet ist. Steht deshalb für sich, mit der Marke oben.
 */
export default function AppStartFehler({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  const router = useRouter();
  const [laedt, starten] = useTransition();

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-surface-cool px-5 py-16 text-center text-ink">
      <span className="flex h-12 w-12 items-center justify-center rounded-[14px] bg-ink-deep shadow-[0_2px_6px_rgba(11,37,69,0.25)]">
        <LogoMark className="h-8 w-8 text-accent" />
      </span>
      <div className="mt-8 w-full max-w-md rounded-[24px] bg-white px-6 py-12 ring-1 ring-[#E6EBEF] sm:px-10">
        <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-[18px] bg-accent-soft text-accent-deep">
          <CloudOff className="h-6 w-6" strokeWidth={1.8} aria-hidden="true" />
        </span>
        <h1 className="mt-5 font-display text-[1.25rem] font-bold">Die App lädt gerade nicht</h1>
        <p className="mx-auto mt-2 max-w-sm text-pretty text-[0.9375rem] leading-relaxed text-text-muted">
          Meist liegt es an der Verbindung. Alles, was Sie gespeichert haben, ist sicher — versuchen Sie es einfach noch
          einmal.
        </p>
        <button
          type="button"
          disabled={laedt}
          onClick={() =>
            starten(() => {
              router.refresh();
              reset();
            })
          }
          className={`${knopf.primaer} mt-7`}
        >
          {laedt ? (
            <LoaderCircle className="h-4 w-4 animate-spin" aria-hidden="true" />
          ) : (
            <RotateCw className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
          )}
          Noch einmal versuchen
        </button>
      </div>
      <p className="mt-6 text-[0.8125rem] text-text-subtle">{site.owner} · Immobilien</p>
    </main>
  );
}
