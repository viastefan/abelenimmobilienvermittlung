import type { Metadata } from "next";
import { Suspense } from "react";
import { Clock, Mail, MapPin } from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";
import { Container } from "@/components/ui/Container";
import { ContactForm } from "@/components/contact/ContactForm";
import { SocialLinks } from "@/components/layout/SocialLinks";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";
import { pageSeo } from "@/lib/seo";
import { site } from "@/data/site";

export const metadata: Metadata = pageSeo({
  title: "Kontakt — Silke Abelen",
  description:
    "Nehmen Sie Kontakt auf — telefonisch, per E-Mail oder über das Kontaktformular. Büro für Immobilien Bewertung & Vermittlung in Leverkusen.",
  path: "/kontakt",
});

export default function KontaktPage() {
  return (
    <>
      <PageHero
        eyebrow="Kontakt"
        title="Sprechen wir über Ihre Immobilie."
        description="Ob Bewertung, Verkauf, Vermietung oder eine erste Einschätzung — schreiben Sie uns über das Formular oder per E-Mail."
        breadcrumbs={[{ label: "Startseite", href: "/" }, { label: "Kontakt" }]}
      />

      <section className="py-14 lg:py-20">
        <Container className="grid gap-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-20">
          <div>
            <h2 className="font-display text-display-sm font-bold text-ink">{site.owner}</h2>
            <p className="mt-1.5 text-[0.9375rem] text-text-muted">{site.legalName}</p>

            <ul className="mt-8 space-y-5">
              <li>
                <a
                  href={`mailto:${site.email}`}
                  className="group flex items-start gap-4 transition-colors hover:text-accent-deep"
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[14px] bg-accent-soft text-accent-deep">
                    <Mail className="h-5 w-5" strokeWidth={1.6} aria-hidden="true" />
                  </span>
                  <span>
                    <span className="block text-[0.8125rem] font-medium text-text-subtle">
                      E-Mail
                    </span>
                    <span className="mt-0.5 block font-display text-[1.0625rem] font-bold text-ink group-hover:text-accent-deep">
                      {site.email}
                    </span>
                  </span>
                </a>
              </li>
              <li className="flex items-start gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[14px] bg-accent-soft text-accent-deep">
                  <MapPin className="h-5 w-5" strokeWidth={1.6} aria-hidden="true" />
                </span>
                <span>
                  <span className="block text-[0.8125rem] font-medium text-text-subtle">
                    Büro
                  </span>
                  <span className="mt-0.5 block font-display text-[1.0625rem] font-bold text-ink">
                    {site.address.street}, {site.address.postalCode} {site.address.locality}
                  </span>
                  <span className="mt-1 block text-[0.875rem] text-text-muted">
                    Tätig in {site.serviceArea} &amp; Umgebung
                  </span>
                </span>
              </li>
            </ul>

            <p className="mt-9 flex items-start gap-3 rounded-[24px] bg-surface-warm p-5 text-[0.875rem] leading-relaxed text-text-muted">
              <Clock className="mt-0.5 h-5 w-5 shrink-0 text-accent-mid" strokeWidth={1.6} aria-hidden="true" />
              Wir melden uns in der Regel innerhalb eines Werktages persönlich bei Ihnen zurück.
            </p>

            <SocialLinks className="mt-8 text-ink" iconClassName="h-[18px] w-[18px]" />
          </div>

          <div className="rounded-[24px] bg-surface-warm p-6 sm:p-8">
            <Suspense fallback={null}>
              <ContactForm />
            </Suspense>
          </div>
        </Container>
      </section>

      <JsonLd
        data={breadcrumbSchema([
          { name: "Start", path: "/" },
          { name: "Kontakt", path: "/kontakt" },
        ])}
      />
    </>
  );
}
