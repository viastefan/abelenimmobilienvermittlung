import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { site } from "@/data/site";

export function CtaSection() {
  return (
    <section className="bg-ink py-24 lg:py-32">
      <Container className="max-w-3xl text-center">
        <Reveal>
          <h2 className="balance text-display-lg font-display font-semibold text-white">
            Sie möchten Ihre Immobilie verkaufen?
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-white/70">
            Lassen Sie uns unverbindlich über Ihre Immobilie sprechen. Gemeinsam klären wir, wo Sie
            stehen und welcher nächste Schritt sinnvoll ist.
          </p>
          <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button href="/kontakt" variant="inverted">
              Persönliches Gespräch starten
            </Button>
            <a href={site.phoneHref} className="text-sm font-semibold text-white/80 hover:text-white">
              {site.phone}
            </a>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
