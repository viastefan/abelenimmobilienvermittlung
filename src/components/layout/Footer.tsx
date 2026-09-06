import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/layout/Logo";
import { SocialLinks } from "@/components/layout/SocialLinks";
import { footerNav, leistungenNav, legalNav, site } from "@/data/site";

function FooterColumn({ title, items }: { title: string; items: { label: string; href: string }[] }) {
  return (
    <nav aria-label={title}>
      <p className="font-display text-label font-bold uppercase text-ink">{title}</p>
      <ul className="mt-5 space-y-3">
        {items.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className="text-[0.9375rem] text-text-muted transition-colors duration-200 hover:text-accent-deep"
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-border bg-surface-warm">
      <Container className="grid gap-12 py-16 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.1fr] lg:gap-10 lg:py-20">
        <div>
          <Logo />
          <p className="mt-6 max-w-xs text-[0.9375rem] leading-relaxed text-text-muted">
            Ihr Partner für die Bewertung, Vermittlung und Vermietung von Immobilien in Leverkusen
            und Umgebung.
          </p>
          <SocialLinks className="mt-6 text-ink" iconClassName="h-[18px] w-[18px]" />
        </div>

        <FooterColumn title="Navigation" items={footerNav} />
        <FooterColumn title="Leistungen" items={leistungenNav} />

        <div>
          <p className="font-display text-label font-bold uppercase text-ink">Kontakt</p>
          <ul className="mt-5 space-y-3.5 text-[0.9375rem] text-text-muted">
            <li>
              <a href={site.phoneHref} className="inline-flex items-center gap-3 transition-colors hover:text-accent-deep">
                <Phone className="h-4 w-4 shrink-0 text-accent-mid" aria-hidden="true" />
                {site.phone}
              </a>
            </li>
            <li>
              <a href={site.landlineHref} className="inline-flex items-center gap-3 transition-colors hover:text-accent-deep">
                <Phone className="h-4 w-4 shrink-0 text-accent-mid" aria-hidden="true" />
                {site.landline}
              </a>
            </li>
            <li>
              <a href={`mailto:${site.email}`} className="inline-flex items-center gap-3 transition-colors hover:text-accent-deep">
                <Mail className="h-4 w-4 shrink-0 text-accent-mid" aria-hidden="true" />
                {site.email}
              </a>
            </li>
            <li className="inline-flex items-center gap-3">
              <MapPin className="h-4 w-4 shrink-0 text-accent-mid" aria-hidden="true" />
              {site.address.locality} &amp; Umgebung
            </li>
          </ul>
        </div>
      </Container>

      <div className="border-t border-border">
        <Container className="flex flex-col-reverse items-center justify-between gap-4 py-6 text-[0.8125rem] text-text-subtle sm:flex-row">
          <p>
            © {new Date().getFullYear()} {site.legalName}
          </p>
          <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            {legalNav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="transition-colors hover:text-accent-deep">
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
