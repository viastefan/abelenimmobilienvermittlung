import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Car, CalendarRange, Check, DoorOpen, LandPlot, MapPin, Ruler } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { SiteImage } from "@/components/graphics/SiteImage";
import { CtaSection } from "@/components/home/CtaSection";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";
import { pageSeo } from "@/lib/seo";
import { getReferenceBySlug, references } from "@/data/references";
import { resolveImage } from "@/lib/imagery";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return references.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const item = getReferenceBySlug(slug);
  if (!item) return {};

  return pageSeo({
    title: `${item.title} — ${item.region}`,
    description: item.summary,
    path: `/referenzen/${item.slug}`,
  });
}

export default async function ReferenceDetailPage({ params }: Params) {
  const { slug } = await params;
  const item = getReferenceBySlug(slug);
  if (!item) notFound();

  const statusLabel = item.category === "verkauf" ? "Verkauft" : "Vermietet";

  const facts = [
    { icon: Ruler, label: "Wohnfläche", value: `${item.livingSpace} m²` },
    { icon: DoorOpen, label: "Zimmer", value: `${item.rooms}` },
    { icon: CalendarRange, label: "Baujahr", value: `${item.year}` },
    ...(item.plot ? [{ icon: LandPlot, label: "Grundstück", value: `${item.plot} m²` }] : []),
    ...(item.parking ? [{ icon: Car, label: "Stellplätze", value: `${item.parking}` }] : []),
  ];

  return (
    <>
      <section className="border-b border-border bg-surface-warm py-10 lg:py-14">
        <Container>
          <Link
            href="/referenzen"
            className="inline-flex items-center gap-2 text-sm font-semibold text-text-muted transition-colors hover:text-accent-deep"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Alle Referenzen
          </Link>

          <div className="mt-8 grid gap-10 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,0.75fr)] lg:items-end">
            <div className="relative aspect-[16/10] overflow-hidden rounded-[20px] bg-surface-mist shadow-lift">
              <SiteImage
                src={resolveImage(item.image)}
                priority
                sizes="(min-width: 1024px) 62vw, 100vw"
                label={item.region}
                alt={`${item.typeLabel} in ${item.region}`}
              />
              <span className="absolute left-5 top-5 rounded-full bg-white/95 px-4 py-2 text-[0.6875rem] font-bold uppercase tracking-[0.12em] text-ink shadow-card backdrop-blur">
                {statusLabel}
              </span>
            </div>

            <div>
              <Eyebrow>{item.region}</Eyebrow>
              <h1 className="balance mt-4 font-display text-display-md font-extrabold text-ink">
                {item.title}
              </h1>
              <p className="pretty mt-5 text-[1.0625rem] leading-relaxed text-text-muted">{item.summary}</p>
            </div>
          </div>
        </Container>
      </section>

      <section className="border-b border-border bg-white">
        <Container>
          <dl className="grid grid-cols-2 gap-px bg-border sm:grid-cols-3 lg:grid-cols-5">
            {facts.map((fact) => (
              <div key={fact.label} className="bg-white px-5 py-7">
                <dt className="flex items-center gap-2 text-[0.75rem] font-semibold uppercase tracking-[0.12em] text-text-subtle">
                  <fact.icon className="h-4 w-4 text-accent-mid" strokeWidth={1.6} aria-hidden="true" />
                  {fact.label}
                </dt>
                <dd className="mt-2 font-display text-xl font-bold text-ink">{fact.value}</dd>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      <section className="py-16 lg:py-24">
        <Container className="grid gap-12 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-20">
          <div>
            <h2 className="font-display text-display-sm font-bold text-ink">Objektbeschreibung</h2>
            <div className="mt-5 space-y-5 text-[1.0625rem] leading-relaxed text-text-muted">
              {item.description.map((paragraph) => (
                <p key={paragraph} className="pretty">
                  {paragraph}
                </p>
              ))}
            </div>

            <h2 className="mt-12 font-display text-display-sm font-bold text-ink">Lage</h2>
            <p className="pretty mt-5 flex gap-3 text-[1.0625rem] leading-relaxed text-text-muted">
              <MapPin className="mt-1 h-5 w-5 shrink-0 text-accent-mid" strokeWidth={1.6} aria-hidden="true" />
              {item.location}
            </p>
          </div>

          <aside>
            <div className="rounded-[16px] border border-border bg-surface-warm p-8">
              <h2 className="font-display text-display-sm font-bold text-ink">Ausstattung</h2>
              <ul className="mt-5 space-y-3">
                {item.equipment.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-[0.9375rem] text-text-muted">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent-deep" strokeWidth={2.2} aria-hidden="true" />
                    {feature}
                  </li>
                ))}
              </ul>

              <p className="mt-8 border-t border-border pt-6 text-sm text-text-muted">
                Status:{" "}
                <span className="font-semibold text-ink">
                  {statusLabel} — {item.typeLabel}
                </span>
              </p>
            </div>
          </aside>
        </Container>
      </section>

      <CtaSection
        title="Sie möchten Ihre Immobilie ebenfalls verkaufen?"
        description="Wir starten mit einer fundierten Einschätzung — persönlich und unverbindlich."
        buttonLabel="Immobilie bewerten"
        href="/bewertung"
      />

      <JsonLd
        data={breadcrumbSchema([
          { name: "Start", path: "/" },
          { name: "Referenzen", path: "/referenzen" },
          { name: item.title, path: `/referenzen/${item.slug}` },
        ])}
      />
    </>
  );
}
