import type { Metadata } from "next";
import { Suspense } from "react";
import { Mail, Phone, MapPin } from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";
import { Container } from "@/components/ui/Container";
import { ContactForm } from "@/components/contact/ContactForm";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";
import { pageSeo } from "@/lib/seo";
import { site } from "@/data/site";

export const metadata: Metadata = pageSeo({
  title: "Kontakt — Silke Abelen",
  description:
    "Nehmen Sie Kontakt zu Silke Abelen auf — persönlich, telefonisch oder per Kontaktformular. Immobilienvermittlung in Leichlingen, Leverkusen und Solingen.",
  path: "/kontakt",
});

export default function KontaktPage() {
  return (
    <>
      <PageHero
        eyebrow="Kontakt"
        title="Der erste Schritt beginnt mit einem Gespräch."
        description="Ob Verkauf, Kauf oder eine erste Einschätzung — schreiben Sie mir oder rufen Sie direkt an."
      />

      <section className="py-20 lg:py-28">
        <Container className="grid gap-16 lg:grid-cols-[0.9fr_1.1fr] lg:gap-24">
          <div>
            <h2 className="font-display text-2xl font-semibold text-ink">{site.owner}</h2>
            <p className="mt-1 text-text-muted">{site.legalName}</p>

            <ul className="mt-8 space-y-4">
              <li>
                <a
                  href={site.phoneHref}
                  className="flex items-center gap-3 text-base font-medium text-ink hover:text-accent"
                >
                  <Phone className="h-5 w-5 text-accent" aria-hidden="true" />
                  {site.phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${site.email}`}
                  className="flex items-center gap-3 text-base font-medium text-ink hover:text-accent"
                >
                  <Mail className="h-5 w-5 text-accent" aria-hidden="true" />
                  {site.email}
                </a>
              </li>
              <li className="flex items-center gap-3 text-base text-text-muted">
                <MapPin className="h-5 w-5 text-accent" aria-hidden="true" />
                {site.address.locality}
              </li>
            </ul>

            <p className="mt-10 max-w-sm text-sm leading-relaxed text-text-muted">
              Ich melde mich in der Regel innerhalb eines Werktages persönlich bei Ihnen zurück.
            </p>
          </div>

          <div className="rounded-lg border border-border bg-surface-soft p-8 sm:p-10">
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
