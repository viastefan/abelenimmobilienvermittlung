import Link from "next/link";
import { Mail, Phone } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { footerNav, legalNav, site } from "@/data/site";

export function Footer() {
  return (
    <footer className="border-t border-border bg-surface">
      <Container className="grid gap-12 py-16 lg:grid-cols-[1.4fr_1fr_1fr] lg:py-20">
        <div>
          <Link href="/" className="font-display text-lg font-semibold tracking-tight text-ink">
            Abelen <span className="text-accent">Immobilien</span>
          </Link>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-text-muted">
            Persönliche Immobilienvermittlung in Leichlingen, Leverkusen, Solingen und der Region.
          </p>
        </div>

        <nav aria-label="Footer Navigation">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.14em] text-text-muted">Navigation</p>
          <ul className="space-y-3">
            {footerNav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="link-underline text-sm text-text hover:text-accent">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.14em] text-text-muted">Kontakt</p>
          <ul className="space-y-3 text-sm text-text">
            <li>{site.owner}</li>
            <li>
              <a href={site.phoneHref} className="inline-flex items-center gap-2 hover:text-accent">
                <Phone className="h-4 w-4" aria-hidden="true" />
                {site.phone}
              </a>
            </li>
            <li>
              <a href={`mailto:${site.email}`} className="inline-flex items-center gap-2 hover:text-accent">
                <Mail className="h-4 w-4" aria-hidden="true" />
                {site.email}
              </a>
            </li>
          </ul>
        </div>
      </Container>

      <div className="border-t border-border">
        <Container className="flex flex-col-reverse items-center justify-between gap-4 py-6 text-xs text-text-muted sm:flex-row">
          <p>© {new Date().getFullYear()} {site.legalName}. Alle Rechte vorbehalten.</p>
          <ul className="flex items-center gap-6">
            {legalNav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="hover:text-accent">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </div>
    </footer>
  );
}
