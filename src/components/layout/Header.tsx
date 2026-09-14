"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ChevronDown, Mail, Menu, MessageSquare, Phone, X } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/layout/Logo";
import { CurrentDate } from "@/components/layout/CurrentDate";
import { SocialLinks } from "@/components/layout/SocialLinks";
import { ContactButton } from "@/components/contact/ContactButton";
import { primaryNav, site } from "@/data/site";

/**
 * Infoleiste + Hauptnavigation.
 *
 * Der ganze Block klebt mit negativem Offset oben, sodass die schmale
 * Infoleiste wegscrollt und allein der Header stehen bleibt — ohne
 * Höhenrechnerei in JavaScript. Beim Scrollen zieht sich der Header
 * zusammen, der Weichzeichner nimmt zu und die Kante erscheint.
 */
export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));
  const compact = scrolled && !open;

  return (
    <div className="sticky top-0 z-50 lg:top-[-40px]">
      {/* Infoleiste */}
      <div className="hidden border-b border-border bg-white lg:block">
        <Container className="flex h-10 items-center justify-between text-[0.8125rem] text-text-muted">
          <div className="flex items-center gap-5">
            <span>
              {site.ownerRole}: <span className="font-semibold text-ink">{site.owner}</span>
            </span>
            <SocialLinks className="text-text-muted" />
          </div>
          <div className="flex items-center gap-6">
            <a href={`mailto:${site.email}`} className="inline-flex items-center gap-2 transition-colors hover:text-accent-deep">
              <Mail className="h-3.5 w-3.5 text-accent-mid" aria-hidden="true" />
              {site.email}
            </a>
            <a href={site.landlineHref} className="inline-flex items-center gap-2 transition-colors hover:text-accent-deep">
              <Phone className="h-3.5 w-3.5 text-accent-mid" aria-hidden="true" />
              Tel.: {site.landline}
            </a>
            <CurrentDate className="tabular-nums text-text-subtle" />
          </div>
        </Container>
      </div>

      {/* Hauptnavigation */}
      <header
        className={`border-b transition-all duration-500 ease-smooth ${
          compact
            ? "border-border bg-white/80 shadow-header backdrop-blur-xl backdrop-saturate-150"
            : "border-transparent bg-white/95 backdrop-blur"
        } ${open ? "border-border" : ""}`}
      >
        <Container
          className={`flex items-center justify-between gap-6 transition-all duration-500 ease-smooth ${
            compact ? "h-[64px] lg:h-[68px]" : "h-[72px] lg:h-[84px]"
          }`}
        >
          <Link
            href="/"
            aria-label={`${site.legalName} — Startseite`}
            className={`shrink-0 origin-left transition-all duration-500 ease-smooth hover:opacity-80 ${
              compact ? "lg:scale-[0.9]" : ""
            }`}
          >
            <Logo />
          </Link>

          {/* Klappmenüs öffnen über :hover und :focus-within — ohne JavaScript,
              damit sie auch mit der Tastatur erreichbar bleiben. */}
          <nav className="mx-auto hidden items-center gap-5 xl:flex 2xl:gap-7" aria-label="Hauptnavigation">
            {primaryNav.map((item) => {
              const active = isActive(item.href) || (item.children?.some((child) => isActive(child.href)) ?? false);
              return (
                <div key={item.label} className="group relative">
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={`relative inline-flex items-center gap-1 py-1.5 text-[0.875rem] font-medium transition-colors duration-200 2xl:text-[0.9375rem] ${
                      active ? "text-accent-deep" : "text-text-muted hover:text-ink"
                    }`}
                  >
                    {item.label}
                    {item.children && (
                      <ChevronDown
                        className="h-3.5 w-3.5 transition-transform duration-300 ease-smooth group-hover:rotate-180"
                        aria-hidden="true"
                      />
                    )}
                    <span
                      className={`absolute -bottom-0.5 left-0 h-[2px] w-full origin-left bg-accent transition-transform duration-300 ease-smooth ${
                        active ? "scale-x-100" : "scale-x-0"
                      }`}
                      aria-hidden="true"
                    />
                  </Link>

                  {item.children && (
                    <div className="pointer-events-none absolute left-1/2 top-full z-10 w-60 -translate-x-1/2 translate-y-1 pt-3 opacity-0 transition-all duration-200 ease-smooth group-hover:pointer-events-auto group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:pointer-events-auto group-focus-within:translate-y-0 group-focus-within:opacity-100">
                      <ul className="rounded-[14px] border border-border bg-white/95 p-1.5 shadow-lift backdrop-blur-xl">
                        {item.children.map((child) => (
                          <li key={child.href}>
                            <Link
                              href={child.href}
                              aria-current={isActive(child.href) ? "page" : undefined}
                              className={`block rounded-[10px] px-3 py-2.5 text-[0.875rem] font-medium transition-colors duration-200 ${
                                isActive(child.href)
                                  ? "bg-accent-soft text-accent-deep"
                                  : "text-text-muted hover:bg-surface-cool hover:text-ink"
                              }`}
                            >
                              {child.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              );
            })}
          </nav>

          <ContactButton
            options={{ title: "Kontakt aufnehmen" }}
            className="hidden shrink-0 items-center gap-2.5 rounded-[10px] bg-accent-deep px-5 py-3 text-sm font-semibold text-white transition-all duration-300 ease-smooth hover:-translate-y-0.5 hover:bg-accent-dark lg:inline-flex"
          >
            <Phone className="h-4 w-4" aria-hidden="true" />
            {site.phone}
          </ContactButton>

          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Menü schließen" : "Menü öffnen"}
            className="-mr-2 flex h-11 w-11 items-center justify-center rounded-md text-ink lg:hidden"
          >
            {open ? <X className="h-6 w-6" aria-hidden="true" /> : <Menu className="h-6 w-6" aria-hidden="true" />}
          </button>
        </Container>
      </header>

      {/* Navigation auf Telefon und Tablet */}
      <div
        id="mobile-nav"
        className={`fixed inset-x-0 bottom-0 top-[72px] z-40 overflow-y-auto border-t border-border bg-white transition-all duration-300 ease-smooth lg:hidden ${
          open ? "translate-y-0 opacity-100" : "pointer-events-none -translate-y-2 opacity-0"
        }`}
      >
        <Container as="nav" aria-label="Mobile Navigation" className="flex flex-col pb-16 pt-4">
          {primaryNav.map((item) => (
            <div key={item.label} className="border-b border-border py-4">
              <Link
                href={item.href}
                aria-current={isActive(item.href) ? "page" : undefined}
                className={`block font-display text-xl font-semibold ${
                  isActive(item.href) ? "text-accent-deep" : "text-ink"
                }`}
              >
                {item.label}
              </Link>
              {item.children && (
                <ul className="mt-3 space-y-1 border-l-2 border-border pl-4">
                  {item.children.map((child) => (
                    <li key={child.href}>
                      <Link
                        href={child.href}
                        aria-current={isActive(child.href) ? "page" : undefined}
                        className={`block py-1.5 text-[0.9375rem] ${
                          isActive(child.href) ? "font-semibold text-accent-deep" : "text-text-muted"
                        }`}
                      >
                        {child.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}

          <ContactButton
            options={{ title: "Kontakt aufnehmen" }}
            onActivate={() => setOpen(false)}
            className="mt-8 inline-flex items-center justify-center gap-2 rounded-[11px] bg-accent-deep px-6 py-4 text-base font-semibold text-white"
          >
            <MessageSquare className="h-4 w-4" aria-hidden="true" />
            Kontakt aufnehmen
          </ContactButton>

          <div className="mt-8 space-y-3 text-sm text-text-muted">
            <a href={site.phoneHref} className="flex items-center gap-3 font-semibold text-ink">
              <Phone className="h-4 w-4 text-accent-mid" aria-hidden="true" />
              {site.phone}
            </a>
            <a href={site.landlineHref} className="flex items-center gap-3">
              <Phone className="h-4 w-4 text-accent-mid" aria-hidden="true" />
              Tel.: {site.landline}
            </a>
            <a href={`mailto:${site.email}`} className="flex items-center gap-3">
              <Mail className="h-4 w-4 text-accent-mid" aria-hidden="true" />
              {site.email}
            </a>
          </div>
        </Container>
      </div>
    </div>
  );
}
