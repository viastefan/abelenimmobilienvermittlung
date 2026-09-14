import type { Metadata } from "next";
import { FileText } from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";
import { Container } from "@/components/ui/Container";
import { Checklist } from "@/components/ui/Checklist";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CtaSection } from "@/components/home/CtaSection";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";
import { pageSeo } from "@/lib/seo";
import { faqDisclaimer, unterlagenQuellen, verkaufsUnterlagen } from "@/data/faq";

export const metadata: Metadata = pageSeo({
  title: "Anlagen — Unterlagen für den Immobilienverkauf",
  description:
    "Welche Unterlagen Sie für den Verkauf Ihrer Immobilie brauchen: Grundbuchauszug, Flurkarte, Grundrisse, Energieausweis und mehr — mit dem Hinweis, wo Sie jedes Dokument bekommen.",
  path: "/anlagen",
});

export default function AnlagenPage() {
  return (
    <>
      <PageHero
        eyebrow="Anlagen"
        title="Welche Unterlagen Sie für den Verkauf brauchen."
        description="Der Verkauf beginnt mit den Dokumenten. Wer sie früh zusammenhat, verkauft schneller — und beantwortet die Fragen ernsthafter Interessenten aus dem Stand."
        breadcrumbs={[{ label: "Startseite", href: "/" }, { label: "Anlagen" }]}
      />

      <section className="py-14 lg:py-20">
        <Container>
          <Reveal className="max-w-prose">
            <h2 className="font-display text-display-sm font-bold text-ink">
              Warum die Unterlagen den Verkauf entscheiden
            </h2>
            <div className="mt-5 space-y-5 text-[1.0625rem] leading-relaxed text-text-muted">
              <p className="pretty">
                Kaufinteressenten entscheiden nicht nach dem Exposé, sondern nach dem, was sie
                nachlesen können. Fehlt eine Angabe, entsteht Unsicherheit — und Unsicherheit
                drückt den Preis oder verzögert den Abschluss.
              </p>
              <p className="pretty">
                Auch die Bank des Käufers braucht Unterlagen: ohne Grundbuchauszug, Flurkarte und
                Flächenberechnung gibt es keine Finanzierungszusage. Wir stellen die Liste
                gemeinsam mit Ihnen zusammen und holen ein, was fehlt.
              </p>
            </div>
          </Reveal>
        </Container>
      </section>

      <Checklist
        eyebrow="Checkliste"
        title="Unterlagen im Überblick"
        description="Was für jede Immobilie gebraucht wird — und was bei Eigentumswohnungen und vermieteten Objekten dazukommt."
        groups={verkaufsUnterlagen}
      />

      <section className="py-14 lg:py-20">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="Bezugsquellen"
              title="Woher Sie die Unterlagen bekommen"
              description="Die Stellen sind für jede Immobilie dieselben. Gebühren und Bearbeitungszeiten unterscheiden sich je nach Kommune."
            />
          </Reveal>

          <Reveal className="mt-10 overflow-x-auto">
            <table className="w-full min-w-[38rem] border-collapse text-left">
              <thead>
                <tr className="border-b border-border-strong">
                  <th className="pb-3 pr-6 text-[0.8125rem] font-semibold text-text-subtle">
                    Dokument
                  </th>
                  <th className="pb-3 pr-6 text-[0.8125rem] font-semibold text-text-subtle">
                    Zuständige Stelle
                  </th>
                  <th className="pb-3 text-[0.8125rem] font-semibold text-text-subtle">
                    Hinweis
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {unterlagenQuellen.map((row) => (
                  <tr key={row.dokument}>
                    <td className="py-4 pr-6 align-top">
                      <span className="flex items-start gap-2.5 font-display text-[0.9375rem] font-bold text-ink">
                        <FileText
                          className="mt-0.5 h-4 w-4 shrink-0 text-accent-mid"
                          strokeWidth={1.6}
                          aria-hidden="true"
                        />
                        {row.dokument}
                      </span>
                    </td>
                    <td className="py-4 pr-6 align-top text-[0.9375rem] text-text-muted">{row.quelle}</td>
                    <td className="py-4 align-top text-[0.875rem] leading-relaxed text-text-muted">
                      {row.hinweis}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Reveal>

          <Reveal className="mt-8">
            <p className="max-w-prose text-[0.8125rem] leading-relaxed text-text-subtle">{faqDisclaimer}</p>
          </Reveal>
        </Container>
      </section>

      <CtaSection
        title="Sie wissen nicht, was Ihnen noch fehlt?"
        description="Wir gehen die Liste gemeinsam durch und besorgen, was nicht vorliegt."
        buttonLabel="Kontakt aufnehmen"
        href="/kontakt"
      />

      <JsonLd
        data={breadcrumbSchema([
          { name: "Start", path: "/" },
          { name: "Anlagen", path: "/anlagen" },
        ])}
      />
    </>
  );
}
