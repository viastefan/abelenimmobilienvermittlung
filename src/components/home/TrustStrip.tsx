import { Award, Home, Users } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { featureStrip } from "@/data/site";

const icons = { users: Users, award: Award, home: Home } as const;

export function TrustStrip() {
  return (
    <section className="border-y border-border bg-white">
      <Container>
        <ul className="grid divide-y divide-border sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          {featureStrip.map((item, index) => {
            const Icon = icons[item.icon];
            return (
              <Reveal
                as="li"
                key={item.title}
                delay={index * 90}
                className={`flex items-center gap-4 py-7 sm:py-8 ${
                  index === 0 ? "sm:pr-8" : index === featureStrip.length - 1 ? "sm:pl-8" : "sm:px-8"
                }`}
              >
                <Icon className="h-8 w-8 shrink-0 text-accent-mid" strokeWidth={1.25} aria-hidden="true" />
                <div>
                  <p className="font-display text-[0.875rem] font-bold text-ink">{item.title}</p>
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
