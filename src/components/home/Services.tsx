import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { services } from "@/data/services";

export function Services() {
  return (
    <section className="border-y border-border bg-surface py-24 lg:py-32">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="Leistungen"
            size="lg"
            title={
              <>
                Vom ersten Gespräch
                <br />
                bis zum erfolgreichen Abschluss.
              </>
            }
          />
        </Reveal>

        <div className="mt-16 divide-y divide-border border-t border-border">
          {services.map((service, index) => (
            <Reveal key={service.slug} as="div" delay={index * 80}>
              <Link
                href={service.href}
                className="group grid items-center gap-4 py-10 transition-colors duration-300 hover:bg-surface-soft/60 md:grid-cols-[80px_1fr_auto] md:gap-10 md:px-6"
              >
                <span className="font-display text-sm text-text-muted">{service.number}</span>
                <div>
                  <h3 className="font-display text-2xl font-semibold text-ink sm:text-3xl">
                    {service.title}
                  </h3>
                  <p className="mt-3 max-w-xl text-sm leading-relaxed text-text-muted sm:text-base">
                    {service.description}
                  </p>
                </div>
                <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-ink md:mt-0">
                  {service.cta}
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
