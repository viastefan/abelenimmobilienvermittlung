import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { TrustBadges } from "@/components/home/TrustBadges";
import { HeroSlideshow } from "@/components/home/HeroSlideshow";
import { ImagePlaceholder } from "@/components/graphics/ImagePlaceholder";
import { resolveImage } from "@/lib/imagery";
import { heroSlides } from "@/data/imagery";

/**
 * Aufmacher der Startseite.
 *
 * Die Diashow trägt die ganze Fläche. Welche Bilder darstellbar sind,
 * entscheidet sich hier auf dem Server — der Client bekommt nur Bilder,
 * die es auch gibt, und muss keine Lücke abfangen.
 */
export function Hero() {
  const slides = heroSlides
    .map((slide) => ({ ...slide, src: resolveImage(slide.src) }))
    .filter((slide): slide is { src: string; alt: string } => Boolean(slide.src));

  return (
    <section className="relative isolate overflow-hidden bg-ink-deep">
      {slides.length > 0 ? (
        <HeroSlideshow slides={slides} />
      ) : (
        <div className="absolute inset-0" aria-hidden="true">
          <ImagePlaceholder label="Leverkusen & Umgebung" />
          <div className="absolute inset-0 bg-gradient-to-r from-ink-deep/90 via-ink-deep/70 to-ink-deep/35" />
        </div>
      )}

      <Container className="relative">
        <div className="flex min-h-[28rem] flex-col justify-center pb-24 pt-14 sm:min-h-[32rem] lg:min-h-[40rem] lg:max-w-[46rem] lg:py-24">
          <span className="inline-flex w-fit items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-[0.8125rem] font-medium text-accent-light ring-1 ring-inset ring-white/15 backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
            Ihr Partner für Leverkusen &amp; Umgebung
          </span>

          <h1 className="balance mt-6 font-display text-display-xl font-extrabold text-white">
            Ihre Immobilie.
            <br />
            In guten Händen.
          </h1>

          <p className="pretty mt-5 max-w-[34rem] text-[1rem] leading-relaxed text-white/75 sm:text-[1.0625rem]">
            Bewertung, Vermittlung und Vermietung von Immobilien in Leverkusen und Umgebung —
            persönlich begleitet, von der ersten Einschätzung bis zur Schlüsselübergabe.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
            <Button href="/bewertung" variant="primary" size="lg" withArrow className="w-full sm:w-auto">
              Immobilie bewerten
            </Button>
            <Button href="/immobilien" variant="secondaryInverted" size="lg" className="w-full sm:w-auto">
              Objekte ansehen
            </Button>
          </div>

          {/* Auf dem Telefon sitzen die Siegel unter den Schaltflächen und
              dürfen dort schmaler ausfallen — sie belegen sonst den halben
              ersten Bildschirm, bevor überhaupt etwas gelesen wurde. */}
          <TrustBadges className="mt-9 lg:mt-10" />
        </div>
      </Container>
    </section>
  );
}
