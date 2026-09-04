import { ShieldCheck, Award } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { StreetMotif } from "@/components/graphics/ArchMotif";
import { trustBadges } from "@/data/site";
import { getFeaturedProperty } from "@/data/properties";

const badgeIcons = [ShieldCheck, Award];

export async function Hero() {
  const featured = await getFeaturedProperty();

  return (
    <section className="relative overflow-hidden bg-white pb-20 pt-40 lg:pb-28 lg:pt-44">
      <Container className="grid items-center gap-14 lg:grid-cols-[1fr_1.05fr] lg:gap-16">
        <div className="fade-up">
          <Eyebrow>Ihr Partner für Leverkusen &amp; Umgebung</Eyebrow>
          <h1 className="mt-6 text-display-xl font-display font-bold text-ink balance">
            Ihre Immobilie.
            <br />
            In guten Händen.
          </h1>
          <p className="mt-6 max-w-md text-base leading-relaxed text-text-muted sm:text-lg">
            Wir sind Ihr zuverlässiger Partner für die Bewertung, Vermittlung und Vermietung von
            Immobilien in Leverkusen und Umgebung.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-4">
            <Button href="/bewertung" variant="primary">
              Immobilie bewerten
            </Button>
            <Button href="/kontakt" variant="secondary">
              Kontakt aufnehmen
            </Button>
          </div>

          <div className="mt-11 flex flex-wrap items-center gap-6">
            {trustBadges.map((badge, i) => {
              const Icon = badgeIcons[i % badgeIcons.length]!;
              return (
                <div key={badge.title} className="flex items-center gap-3">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-border bg-surface-soft text-accent">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <span className="max-w-[9.5rem] text-xs leading-snug text-text-muted">
                    <span className="block font-semibold text-ink">{badge.title}</span>
                    {badge.subtitle}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="relative fade-up" style={{ animationDelay: "120ms" }}>
          <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-[linear-gradient(160deg,#E3F5F0_0%,#F4F8F7_55%,#FFFFFF_100%)]">
            <StreetMotif className="absolute inset-0 h-full w-full p-10 text-ink/70 sm:p-14" />
          </div>

          {featured ? (
            <div className="absolute -bottom-8 left-6 right-6 rounded-lg border border-border bg-white p-5 shadow-soft sm:left-8 sm:right-auto sm:w-[22rem]">
              <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-accent">
                Aktuelles Angebot
              </p>
              <p className="mt-2 font-display text-base font-semibold leading-snug text-ink">
                {featured.title}
              </p>
              <div className="mt-3 flex items-center justify-between">
                <p className="text-xs text-text-muted">{featured.city}</p>
                <p className="font-display text-base font-semibold text-ink">{featured.priceLabel}</p>
              </div>
            </div>
          ) : null}
        </div>
      </Container>
    </section>
  );
}
