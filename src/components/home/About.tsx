import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { SiteImage } from "@/components/graphics/SiteImage";
import { resolveImage } from "@/lib/imagery";
import { images } from "@/data/imagery";
import { site } from "@/data/site";

export function About() {
  const portrait = resolveImage(images.portrait);

  return (
    <section className="bg-white py-20 lg:py-28">
      <Container className="grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-20">
        <Reveal>
          <Eyebrow>Über uns</Eyebrow>
          <h2 className="balance mt-4 font-display text-display-lg font-bold text-ink">
            Ihre Ansprechpartnerin
            <br />
            für Immobilien in Leverkusen
          </h2>
          <p className="pretty mt-6 max-w-lg text-[1.0625rem] leading-relaxed text-text-muted">
            Als inhabergeführtes Büro bieten wir Ihnen persönliche Beratung, fundiertes Fachwissen
            und eine ehrliche Einschätzung — für Ergebnisse, die überzeugen.
          </p>

          <figure className="mt-8 border-l-2 border-accent pl-6">
            <blockquote className="font-display text-xl font-semibold leading-snug text-ink sm:text-2xl">
              „Eine Immobilie ist nicht nur ein Objekt — sie ist ein Zuhause.“
            </blockquote>
            <figcaption className="mt-3 text-sm text-text-muted">
              <span className="font-semibold text-ink">{site.owner}</span> — {site.ownerRole}
            </figcaption>
          </figure>

          <Button href="/ueber-mich" variant="primary" withArrow className="mt-9">
            Mehr über uns
          </Button>
        </Reveal>

        <Reveal delay={120}>
          <div className="relative aspect-[4/5] overflow-hidden rounded-[20px] bg-surface-mist shadow-lift">
            <SiteImage
              src={portrait}
              sizes="(min-width: 1024px) 45vw, 100vw"
              label={site.owner}
              alt={`${site.owner}, ${site.ownerRole} des Büros für Immobilien Bewertung & Vermittlung`}
            />
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
