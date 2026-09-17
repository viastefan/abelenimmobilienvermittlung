import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

/** Shared by the site-level and the root 404, so both read the same. */
export function NotFoundBody() {
  return (
    <section className="flex min-h-[55vh] items-center py-16 lg:py-20">
      <Container className="max-w-xl text-center">
        <p className="font-display text-label font-bold uppercase text-accent-deep">404</p>
        <h1 className="balance mt-4 font-display text-display-md font-bold text-ink">
          Diese Seite gibt es nicht (mehr).
        </h1>
        <p className="pretty mt-5 text-[0.9375rem] leading-relaxed text-text-muted">
          Möglicherweise wurde die Immobilie bereits vermittelt oder die Seite wurde verschoben.
          Schauen Sie sich gerne unsere aktuellen Angebote an oder sprechen Sie uns direkt an.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Button href="/" variant="primary">
            Zur Startseite
          </Button>
          <Button href="/referenzen" variant="secondary">
            Immobilien ansehen
          </Button>
        </div>
      </Container>
    </section>
  );
}
