import { Plus } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { faqDisclaimer, type FaqItem } from "@/data/faq";

/**
 * Built on native <details>/<summary>: keyboard accessible and expandable
 * before any JavaScript loads — no client component needed.
 */
export function Faq({
  eyebrow = "Häufige Fragen",
  title,
  items,
  className = "",
}: {
  eyebrow?: string;
  title: React.ReactNode;
  items: FaqItem[];
  className?: string;
}) {
  return (
    <section className={`bg-white py-16 lg:py-20 ${className}`}>
      <Container className="max-w-3xl">
        <Reveal>
          <SectionHeading eyebrow={eyebrow} title={title} />
        </Reveal>

        <div className="mt-9 divide-y divide-border border-y border-border">
          {items.map((item, index) => (
            <Reveal key={item.question} delay={index * 50}>
              <details className="group py-1">
                <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-4 text-left font-display text-[0.9375rem] font-bold text-ink transition-colors duration-200 hover:text-accent-deep [&::-webkit-details-marker]:hidden">
                  {item.question}
                  <Plus
                    className="mt-0.5 h-4 w-4 shrink-0 text-accent-mid transition-transform duration-300 ease-smooth group-open:rotate-45"
                    strokeWidth={2}
                    aria-hidden="true"
                  />
                </summary>
                <p className="pretty pb-5 pr-10 text-[0.875rem] leading-relaxed text-text-muted">
                  {item.answer}
                </p>
              </details>
            </Reveal>
          ))}
        </div>

        <p className="mt-6 text-[0.75rem] leading-relaxed text-text-subtle">{faqDisclaimer}</p>
      </Container>
    </section>
  );
}
