import { Award, Home, Users } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { featureStrip } from "@/data/site";

const icons = { users: Users, award: Award, home: Home } as const;

/**
 * Die drei Zusagen unter dem Aufmacher.
 *
 * Als Karten auf warmem Grund, nicht als Zeile aus Symbol und Kleinschrift:
 * direkt unter dem Hero braucht die Seite eine Fläche, die etwas behauptet,
 * sonst liest sich der Abschnitt wie eine Fußnote.
 */
export function TrustStrip() {
  return (
    <section className="bg-surface-warm py-10 lg:py-14">
      <Container>
        <ul className="grid gap-3 sm:grid-cols-3 sm:gap-4">
          {featureStrip.map((item, index) => {
            const Icon = icons[item.icon];
            return (
              <Reveal as="li" key={item.title} delay={index * 90} className="h-full">
                <div className="group h-full rounded-[24px] bg-white p-6 shadow-soft transition-all duration-300 ease-smooth hover:-translate-y-0.5 hover:shadow-lift sm:p-7">
                  <span className="flex h-12 w-12 items-center justify-center rounded-[24px] bg-accent-soft text-accent-deep transition-colors duration-300 ease-smooth group-hover:bg-accent-tint">
                    <Icon className="h-[22px] w-[22px]" strokeWidth={1.6} aria-hidden="true" />
                  </span>
                  <p className="mt-5 font-display text-display-sm font-bold text-ink">{item.title}</p>
                  <p className="pretty mt-2 text-[0.9375rem] leading-relaxed text-text-muted">
                    {item.description}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
