import { Users, Award, MapPin } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { featureStrip } from "@/data/site";

const icons = [Users, Award, MapPin];

export function Intro() {
  return (
    <section className="border-y border-border bg-surface-soft py-14">
      <Container className="grid gap-10 sm:grid-cols-3">
        {featureStrip.map((item, index) => {
          const Icon = icons[index % icons.length]!;
          return (
            <Reveal key={item.title} delay={index * 80} className="flex items-center gap-4">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white text-accent shadow-soft">
                <Icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <div>
                <p className="font-display text-base font-semibold text-ink">{item.title}</p>
                <p className="mt-0.5 text-sm text-text-muted">{item.description}</p>
              </div>
            </Reveal>
          );
        })}
      </Container>
    </section>
  );
}
