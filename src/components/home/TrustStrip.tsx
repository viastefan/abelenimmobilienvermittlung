import { Award, Home, Users } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { featureStrip } from "@/data/site";

const icons = { users: Users, award: Award, home: Home } as const;

/**
 * Die drei Zusagen unter dem Aufmacher.
 *
 * Getrennt durch Haarlinien, wie die Spalten einer Zeitung: das ordnet, ohne
 * zu schmücken. Karten mit Schatten lassen dieselben drei Sätze nach Werbung
 * aussehen, Linien nach Auskunft.
 */
export function TrustStrip() {
  return (
    <section className="bg-white py-12 lg:py-16">
      <Container>
        <ul className="grid divide-y divide-border sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          {featureStrip.map((item, index) => {
            const Icon = icons[item.icon];
            return (
              <Reveal
                as="li"
                key={item.title}
                delay={index * 90}
                className="py-6 first:pt-0 last:pb-0 sm:px-8 sm:py-0 sm:first:pl-0 sm:last:pr-0"
              >
                <Icon className="h-6 w-6 text-accent-mid" strokeWidth={1.4} aria-hidden="true" />
                <p className="mt-4 font-display text-display-sm font-bold text-ink">{item.title}</p>
                <p className="pretty mt-2 text-[0.9375rem] leading-relaxed text-text-muted">
                  {item.description}
                </p>
              </Reveal>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
