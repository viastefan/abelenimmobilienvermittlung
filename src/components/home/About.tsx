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
    <section className="bg-white py-16 lg:py-20">
      <Container className="grid items-center gap-10 lg:grid-cols-[minmax(0,0.78fr)_minmax(0,1.22fr)] lg:gap-16">
        <Reveal>
          <Eyebrow>Über uns</Eyebrow>
          <h2 className="balance mt-4 font-display text-display-lg font-bold text-ink">
            Ihr Partner für Immobilien
            <br />
            in Leverkusen
          </h2>
          <p className="pretty mt-5 max-w-md text-[0.9375rem] leading-relaxed text-text-muted">
            Als inhabergeführtes Büro bieten wir Ihnen persönliche Beratung, fundiertes Fachwissen
            und eine ehrliche Einschätzung — für Ergebnisse, die überzeugen.
          </p>

          <Button href="/ueber-mich" variant="primary" className="mt-7">
            Mehr über uns
          </Button>
        </Reveal>

        <Reveal delay={120}>
          <div className="relative aspect-[16/10] overflow-hidden rounded-[14px] bg-surface-mist">
            <SiteImage
              src={portrait}
              sizes="(min-width: 1024px) 60vw, 100vw"
              label={site.owner}
              alt={`${site.owner}, ${site.ownerRole} des Büros für Immobilien Bewertung & Vermittlung`}
            />
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
