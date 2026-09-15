import { HeartHandshake, ShieldCheck } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { SiteImage } from "@/components/graphics/SiteImage";
import { resolveImage } from "@/lib/imagery";
import { images } from "@/data/imagery";

/** Text wörtlich von der Startseite des bisherigen Auftritts übernommen. */
const principles = [
  {
    icon: HeartHandshake,
    title: "Persönlicher Service",
    body: "Bei uns stehen Sie im Mittelpunkt, eine enge Zusammenarbeit ist dafür Voraussetzung. Für Ihren Immobilienverkauf bzw. Immobiliensuche möchten wir Ihre Bedürfnisse und Wünsche verstehen, um einen perfekten Käufer oder ein perfektes Zuhause für Sie zu finden.",
  },
  {
    icon: ShieldCheck,
    title: "Vertrauen und Integrität",
    body: "Wir legen Wert auf Transparenz und Integrität in allem, was wir anfangen. Sie können sich darauf verlassen, dass wir Ihnen ehrliche und verlässliche Beratung und Unterstützung während des gesamten Kauf- oder Verkaufsprozesses bieten.",
  },
];

/**
 * Der dunkle Abschnitt der Startseite.
 *
 * Das Stadtbild lag früher hinter dem Text und musste dafür abgedunkelt
 * werden. Jetzt steht es als eigene Fläche daneben — unverfälscht, wie
 * abgesprochen. Die Farbe im Grund kommt aus zwei weichen Lichtscheinen,
 * nicht aus einem Schleier über dem Foto.
 */
export function PersonalService() {
  const image = resolveImage(images.personalService);

  return (
    <section className="relative isolate overflow-hidden bg-ink-deep py-14 lg:py-20">
      <div
        className="pointer-events-none absolute -left-40 -top-40 h-[520px] w-[520px] rounded-full bg-accent/25 blur-[140px]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -bottom-48 -right-32 h-[460px] w-[460px] rounded-full bg-accent-mid/20 blur-[130px]"
        aria-hidden="true"
      />

      <Container className="relative">
        <div className="grid items-center gap-9 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.95fr)] lg:gap-16">
          <Reveal>
            <Eyebrow light>Unsere Arbeitsweise</Eyebrow>
            <h2 className="balance mt-4 font-display text-display-lg font-bold text-white">
              Persönlich, Verlässlich…
            </h2>
            <p className="pretty mt-5 max-w-lg text-[1.0625rem] leading-relaxed text-white/80">
              …mit viel Erfahrung in der Immobilienvermarktung. Ein Vermittler, der den Erwerb
              oder Verkauf auch aus einer anderen Perspektive beleuchtet? Wir arbeiten
              unbürokratisch und lösungsorientiert. Hört sich gut an? Dann lassen Sie uns reden!
            </p>
            <Button href="/ueber-mich" variant="inverted" withArrow className="mt-7">
              Über mich
            </Button>
          </Reveal>

          <Reveal delay={120}>
            <div className="relative aspect-[4/3] overflow-hidden rounded-[24px] shadow-lift ring-1 ring-white/15 sm:rounded-[28px]">
              <SiteImage
                src={image}
                sizes="(min-width: 1024px) 46vw, 100vw"
                label="Leverkusen"
                alt="Blick über Leverkusen"
              />
            </div>
          </Reveal>
        </div>

        <ul className="mt-9 grid gap-4 sm:grid-cols-2 lg:mt-14 lg:gap-5">
          {principles.map((principle, index) => (
            <Reveal key={principle.title} as="li" delay={160 + index * 80}>
              <div className="h-full rounded-[20px] border border-white/10 bg-white/[0.06] p-6 backdrop-blur-sm transition-colors duration-300 ease-smooth hover:border-white/25 sm:p-7">
                <span className="flex h-11 w-11 items-center justify-center rounded-[13px] bg-accent/20 text-accent-light ring-1 ring-inset ring-white/10">
                  <principle.icon className="h-5 w-5" strokeWidth={1.6} aria-hidden="true" />
                </span>
                <h3 className="mt-5 font-display text-display-sm font-bold text-white">
                  {principle.title}
                </h3>
                <p className="pretty mt-2.5 text-[0.9375rem] leading-relaxed text-white/75">
                  {principle.body}
                </p>
              </div>
            </Reveal>
          ))}
        </ul>
      </Container>
    </section>
  );
}
