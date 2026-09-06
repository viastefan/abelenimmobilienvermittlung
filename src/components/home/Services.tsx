import Link from "next/link";
import { ArrowRight, Handshake, Home, Key } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { services } from "@/data/services";

const icons = { home: Home, handshake: Handshake, key: Key } as const;

export function Services() {
  return (
    <section className="bg-surface-warm py-20 lg:py-28">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="Unsere Leistungen"
            align="center"
            size="lg"
            title="Was wir für Sie tun können"
          />
        </Reveal>

        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {services.map((service, index) => {
            const Icon = icons[service.icon];
            return (
              <Reveal key={service.slug} delay={index * 90} className="h-full">
                <Link
                  href={service.href}
                  className="group flex h-full flex-col rounded-[16px] border border-border bg-white p-8 transition-all duration-300 ease-smooth hover:-translate-y-1 hover:border-accent-light hover:shadow-soft"
                >
                  <span className="flex h-12 w-12 items-center justify-center rounded-[12px] bg-accent-soft text-accent-deep transition-colors duration-300 group-hover:bg-accent group-hover:text-white">
                    <Icon className="h-[22px] w-[22px]" strokeWidth={1.5} aria-hidden="true" />
                  </span>

                  <h3 className="mt-7 font-display text-display-sm font-bold text-ink">{service.title}</h3>
                  <p className="pretty mt-3 flex-1 text-[0.9375rem] leading-relaxed text-text-muted">
                    {service.description}
                  </p>

                  <span className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-accent-deep">
                    Mehr erfahren
                    <ArrowRight
                      className="h-4 w-4 transition-transform duration-300 ease-smooth group-hover:translate-x-1"
                      aria-hidden="true"
                    />
                  </span>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
