import Link from "next/link";
import { ArrowRight, Home, Handshake, Key } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { services } from "@/data/services";

const icons = { home: Home, handshake: Handshake, key: Key } as const;

export function Services() {
  return (
    <section className="bg-surface py-24 lg:py-28">
      <Container>
        <Reveal>
          <SectionHeading eyebrow="Unsere Leistungen" size="lg" align="center" title="Was wir für Sie tun können" />
        </Reveal>

        <div className="mt-14 grid gap-6 sm:grid-cols-3">
          {services.map((service, index) => {
            const Icon = icons[service.icon];
            return (
              <Reveal key={service.slug} delay={index * 80}>
                <Link
                  href={service.href}
                  className="group flex h-full flex-col rounded-lg border border-border bg-white p-8 transition-all duration-300 ease-smooth hover:-translate-y-1 hover:shadow-soft"
                >
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-surface-soft text-accent">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <h3 className="mt-6 font-display text-lg font-semibold text-ink">{service.title}</h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-text-muted">{service.description}</p>
                  <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-accent">
                    Mehr erfahren
                    <ArrowRight
                      className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
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
