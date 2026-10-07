"use client";

import { useEffect, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { site } from "@/data/site";

/**
 * Wenn eine Seite der Website nicht lädt. Selten — aber dann steht dort
 * kein „Application error“, sondern ein Satz, ein Knopf und die
 * Telefonnummer. Kopf und Fuß der Website bleiben.
 */
export default function SeitenFehler({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  const router = useRouter();
  const [laedt, starten] = useTransition();

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section className="flex min-h-[55vh] items-center py-14 lg:py-20">
      <Container className="max-w-xl text-center">
        <p className="font-display text-label font-bold uppercase text-accent-deep">Kurze Störung</p>
        <h1 className="balance mt-4 font-display text-display-md font-bold text-ink">Diese Seite lädt gerade nicht.</h1>
        <p className="pretty mt-5 text-[0.9375rem] leading-relaxed text-text-muted">
          Bitte versuchen Sie es in einem Moment noch einmal. Persönlich erreichen Sie {site.owner} unter{" "}
          <a href={site.phoneHref} className="whitespace-nowrap font-semibold text-ink underline decoration-accent/60 underline-offset-4">
            {site.phone}
          </a>
          .
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Button
            type="button"
            variant="primary"
            disabled={laedt}
            onClick={() =>
              starten(() => {
                router.refresh();
                reset();
              })
            }
          >
            Noch einmal versuchen
          </Button>
          <Button href="/" variant="secondary">
            Zur Startseite
          </Button>
        </div>
      </Container>
    </section>
  );
}
