import { Award, Home, Users } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { featureStrip } from "@/data/site";

const icons = { users: Users, award: Award, home: Home } as const;

export function TrustStrip() {
  return (
    <section className="bg-white py-14 lg:py-16">
      <Container>
        <ul className="grid gap-8 sm:grid-cols-3 sm:gap-10">
          {featureStrip.map((item, index) => {
            const Icon = icons[item.icon];
            return (
              <Reveal as="li" key={item.title} delay={index * 90} className="flex items-start gap-4">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-accent-soft text-accent-deep">
                  <Icon className="h-5 w-5" strokeWidth={1.6} aria-hidden="true" />
                </span>
                <div className="pt-1.5">
                  <p className="font-display text-[0.9375rem] font-bold text-ink">{item.title}</p>
                  <p className="mt-1 text-[0.8125rem] leading-snug text-text-muted">{item.description}</p>
                </div>
              </Reveal>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
