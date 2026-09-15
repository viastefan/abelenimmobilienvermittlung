import Link from "next/link";
import { ArrowRight, Handshake, Home, Key } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { services } from "@/data/services";

const icons = { home: Home, handshake: Handshake, key: Key } as const;

export function Services() {
  return (
    <section className="bg-surface-cool py-14 lg:py-20">
      <Container>
        <Reveal>
          <SectionHeading
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
                  className="group flex h-full flex-col rounded-[24px] bg-white shadow-soft p-7 transition-all duration-300 ease-smooth hover:-translate-y-1.5 hover:border-transparent hover:shadow-lift lg:p-8"
                >
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-accent-soft text-accent-deep transition-colors duration-300 ease-smooth group-hover:bg-accent-deep group-hover:text-white">
                    <Icon className="h-5 w-5" strokeWidth={1.6} aria-hidden="true" />
                  </span>

                  <h3 className="mt-5 font-display text-[1.0625rem] font-bold text-ink">{service.title}</h3>

                  <p className="pretty mt-3 flex-1 text-[0.875rem] leading-relaxed text-text-muted">
                    {service.description}
                  </p>

                  <span className="mt-6 inline-flex items-center gap-2 text-[0.8125rem] font-semibold text-accent-deep">
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
