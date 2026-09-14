import Link from "next/link";
import { ArrowRight, Handshake, Home, Key } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { services } from "@/data/services";

const icons = { home: Home, handshake: Handshake, key: Key } as const;

export function Services() {
  return (
    <section className="bg-surface-cool py-20 lg:py-28">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="Unsere Leistungen"
            align="center"
            size="lg"
            title="Was wir für Sie tun können"
          />
        </Reveal>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {services.map((service, index) => {
            const Icon = icons[service.icon];
            return (
              <Reveal key={service.slug} delay={index * 90} className="h-full">
                <Link
                  href={service.href}
                  className="group flex h-full flex-col rounded-[12px] border border-border bg-white p-6 transition-all duration-300 ease-smooth hover:-translate-y-1 hover:border-accent-light hover:shadow-soft lg:p-7"
                >
                  <span className="flex items-center gap-3.5">
                    <Icon
                      className="h-7 w-7 shrink-0 text-accent-mid transition-colors duration-300 group-hover:text-accent-deep"
                      strokeWidth={1.4}
                      aria-hidden="true"
                    />
                    <h3 className="font-display text-[1rem] font-bold text-ink">{service.title}</h3>
                  </span>

                  <p className="pretty mt-4 flex-1 text-[0.875rem] leading-relaxed text-text-muted">
                    {service.description}
                  </p>

                  <span className="mt-5 inline-flex items-center gap-2 text-[0.8125rem] font-semibold text-accent-deep">
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
