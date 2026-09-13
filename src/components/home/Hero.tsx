import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { SiteImage } from "@/components/graphics/SiteImage";
import { TrustBadges } from "@/components/home/TrustBadges";
import { resolveImage } from "@/lib/imagery";
import { images } from "@/data/imagery";

const ALT = "Gepflegte Wohnstraße mit Ein- und Mehrfamilienhäusern in Leverkusen";

export function Hero() {
  const image = resolveImage(images.heroWohnstrasse);

  return (
    <section className="relative overflow-hidden bg-surface-mist">
      {/* From lg upwards the image runs to the right edge of the viewport. */}
      <div className="absolute inset-y-0 right-0 hidden w-[47%] overflow-hidden lg:block" aria-hidden="true">
        <SiteImage
          src={image}
          priority
          sizes="50vw"
          label="Leverkusen & Umgebung"
          alt=""
        />
      </div>

      <Container className="relative">
        <div className="flex flex-col py-12 lg:min-h-[30rem] lg:w-[50%] lg:justify-center lg:py-16">
          <Eyebrow>Ihr Partner für Leverkusen &amp; Umgebung</Eyebrow>

          <h1 className="balance mt-4 font-display text-display-xl font-extrabold text-ink">
            Ihre Immobilie.
            <br />
            In guten Händen.
          </h1>

          <p className="pretty mt-5 max-w-[27rem] text-[0.9375rem] leading-relaxed text-text-muted">
            Wir sind Ihr zuverlässiger Partner für die Bewertung, Vermittlung und Vermietung von
            Immobilien in Leverkusen und Umgebung.
          </p>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
            <Button href="/bewertung" variant="primary" className="w-full sm:w-auto">
              Immobilie bewerten
            </Button>
            <Button href="/kontakt" variant="secondary" className="w-full sm:w-auto">
              Kontakt aufnehmen
            </Button>
          </div>

          {/* Mobile: Text → Bild → Zertifikate, wie im Briefing beschrieben. */}
          <div className="relative -mx-5 mt-8 aspect-[16/11] overflow-hidden sm:-mx-8 sm:rounded-[14px] lg:hidden">
            <SiteImage src={image} sizes="100vw" label="Leverkusen & Umgebung" alt={ALT} />
          </div>

          <TrustBadges className="mt-8" />
        </div>
      </Container>
    </section>
  );
}
