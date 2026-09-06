import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { SiteImage } from "@/components/graphics/SiteImage";
import { TrustBadges } from "@/components/home/TrustBadges";
import { resolveImage } from "@/lib/imagery";
import { images } from "@/data/imagery";

export function Hero() {
  const image = resolveImage(images.heroWohnstrasse);

  return (
    <section className="hero-wash relative overflow-hidden">
      {/* Soft turquoise bloom behind the image column — never a flat fill. */}
      <div
        className="pointer-events-none absolute right-[-10%] top-[-20%] hidden h-[70%] w-[55%] rounded-full bg-accent-soft/70 blur-3xl lg:block"
        aria-hidden="true"
      />

      <Container className="relative grid items-center gap-12 py-14 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:gap-16 lg:py-24 xl:gap-20">
        <div className="fade-up">
          <Eyebrow>Ihr Partner für Leverkusen &amp; Umgebung</Eyebrow>

          <h1 className="balance mt-5 font-display text-display-xl font-extrabold text-ink">
            Ihre Immobilie.
            <br />
            In guten Händen.
          </h1>

          <p className="pretty mt-6 max-w-[30rem] text-[1.0625rem] leading-relaxed text-text-muted sm:text-lg">
            Wir sind Ihr zuverlässiger Partner für die Bewertung, Vermittlung und Vermietung von
            Immobilien in Leverkusen und Umgebung.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
            <Button href="/bewertung" variant="primary" size="lg" withArrow className="w-full sm:w-auto">
              Immobilie bewerten
            </Button>
            <Button href="/kontakt" variant="secondary" size="lg" className="w-full sm:w-auto">
              Kontakt aufnehmen
            </Button>
          </div>

          <TrustBadges className="mt-10" />
        </div>

        <div className="fade-up relative" style={{ animationDelay: "140ms" }}>
          <div className="relative aspect-[4/3] overflow-hidden rounded-[20px] bg-surface-mist shadow-lift lg:aspect-[5/4]">
            <SiteImage
              src={image}
              priority
              sizes="(min-width: 1024px) 55vw, 100vw"
              label="Leverkusen & Umgebung"
              alt="Gepflegte Wohnstraße mit Ein- und Mehrfamilienhäusern in Leverkusen"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
