import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { LogoMark } from "@/components/layout/Logo";
import { footerNav, leistungenNav, legalNav, site } from "@/data/site";

export function Footer() {
  return (
    <footer className="bg-ink text-white">
      <Container className="grid gap-12 py-16 sm:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_1fr] lg:py-20">
        <div>
          <div className="flex items-center gap-3">
            <LogoMark className="h-8 w-8 shrink-0 text-accent" />
            <span className="flex flex-col leading-[1.15]">
              <span className="text-[10px] font-semibold uppercase tracking-[0.08em] text-white/80">
                Büro für Immobilien
                <br />
                Bewertung &amp; Vermittlung
              </span>
              <span className="mt-0.5 text-sm font-bold uppercase tracking-[0.06em] text-white">
                Silke Abelen
              </span>
            </span>
          </div>
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-white/60">
            Ihr Partner für die Bewertung, Vermittlung und Vermietung von Immobilien in Leverkusen
            und Umgebung.
          </p>
        </div>

        <nav aria-label="Footer Navigation">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.14em] text-white/50">Navigation</p>
          <ul className="space-y-3">
            {footerNav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-sm text-white/75 hover:text-white">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Leistungen">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.14em] text-white/50">Leistungen</p>
          <ul className="space-y-3">
            {leistungenNav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-sm text-white/75 hover:text-white">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.14em] text-white/50">Kontakt</p>
          <ul className="space-y-3 text-sm text-white/75">
            <li>
              <a href={site.phoneHref} className="inline-flex items-center gap-2 hover:text-white">
                <Phone className="h-4 w-4 text-accent" aria-hidden="true" />
                {site.phone}
              </a>
            </li>
            <li>
              <a href={`mailto:${site.email}`} className="inline-flex items-center gap-2 hover:text-white">
                <Mail className="h-4 w-4 text-accent" aria-hidden="true" />
                {site.email}
              </a>
            </li>
            <li className="inline-flex items-center gap-2">
              <MapPin className="h-4 w-4 text-accent" aria-hidden="true" />
              {site.address.locality} &amp; Umgebung
            </li>
          </ul>
        </div>
      </Container>

      <div className="border-t border-white/10">
        <Container className="flex flex-col-reverse items-center justify-between gap-4 py-6 text-xs text-white/50 sm:flex-row">
          <p>
            © {new Date().getFullYear()} {site.legalName}. Alle Rechte vorbehalten.
          </p>
          <ul className="flex items-center gap-6">
            {legalNav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="hover:text-white">
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
