import { Container } from "@/components/ui/Container";
import { whyAbelen } from "@/data/services";

export function WhyAbelen() {
  return (
    <section className="border-y border-border bg-surface py-24 lg:py-32">
      <Container>
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {whyAbelen.map((item) => (
            <div key={item.title} className="border-l border-border pl-6">
              <h3 className="font-display text-xl font-semibold text-ink">{item.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-text-muted">{item.description}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
