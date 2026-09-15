import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { whyAbelen } from "@/data/services";

export function WhyAbelen() {
  return (
    <section className="bg-surface-warm py-16 lg:py-20">
      <Container>
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {whyAbelen.map((item, index) => (
            <Reveal key={item.title} delay={index * 80} className="border-l-2 border-accent-soft pl-6">
              <h3 className="font-display text-[1.125rem] font-bold text-ink">{item.title}</h3>
              <p className="pretty mt-3 text-[0.9375rem] leading-relaxed text-text-muted">
                {item.description}
              </p>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
