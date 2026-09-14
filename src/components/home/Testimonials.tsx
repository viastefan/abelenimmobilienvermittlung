import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { FadeSlideshow } from "@/components/ui/FadeSlideshow";
import { TestimonialCard } from "@/components/references/TestimonialCard";
import { getPublishedReferences } from "@/data/references";

/**
 * Kundenmeinungen auf der Startseite.
 *
 * Die Zitate hingen bisher allein an den Referenzseiten — wer nur die
 * Startseite sah, bekam sie nie zu Gesicht. Hier laufen sie als Diashow,
 * jedes mit dem Objekt verlinkt, zu dem es gehört: Eine Meinung ohne
 * nachprüfbaren Bezug ist nur ein Satz.
 */
export async function Testimonials() {
  const references = await getPublishedReferences();
  const withVoice = references.filter((reference) => reference.testimonial);
  if (withVoice.length === 0) return null;

  return (
    <section className="border-y border-border bg-surface-cool py-16 lg:py-24">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="Kundenmeinungen"
            align="center"
            size="lg"
            title="Was unsere Kundinnen und Kunden sagen"
          />
        </Reveal>

        <Reveal delay={120} className="mx-auto mt-10 max-w-3xl">
          <FadeSlideshow
            label="Kundenmeinungen"
            slides={withVoice.map((reference) => ({
              key: reference.slug,
              label: reference.title,
              node: (
                <div>
                  <TestimonialCard
                    testimonial={reference.testimonial!}
                    author={`Verkäuferin bzw. Verkäufer — ${reference.title}`}
                  />
                  <p className="mt-5 text-center">
                    <Link
                      href={`/referenzen/${reference.slug}`}
                      className="group inline-flex items-center gap-2 text-[0.875rem] font-semibold text-accent-deep"
                    >
                      Objekt ansehen: {reference.title}
                      <ArrowRight
                        className="h-4 w-4 transition-transform duration-300 ease-smooth group-hover:translate-x-1"
                        aria-hidden="true"
                      />
                    </Link>
                  </p>
                </div>
              ),
            }))}
          />
        </Reveal>
      </Container>
    </section>
  );
}
