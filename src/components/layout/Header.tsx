"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ArrowRight, Mail, Menu, Phone, X } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/layout/Logo";
import { CurrentDate } from "@/components/layout/CurrentDate";
import { SocialLinks } from "@/components/layout/SocialLinks";
import { primaryNav, site } from "@/data/site";

/**
 * Info bar + main header.
 *
 * The whole block is sticky with a negative offset, so the thin info bar
 * scrolls away on its own and the main header alone stays pinned — no JS
 * height juggling required.
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

  return (
    <div className="sticky top-0 z-50 lg:top-[-40px]">
      {/* Info bar */}
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

      {/* Main header */}
      <header
        className={`border-b bg-white/95 backdrop-blur transition-[box-shadow,border-color] duration-300 ${
          scrolled || open ? "border-border shadow-header" : "border-transparent"
        }`}
      >
        <Container className="flex h-[72px] items-center justify-between gap-6 lg:h-20">
          <Link href="/" aria-label={`${site.legalName} — Startseite`} className="shrink-0 transition-opacity hover:opacity-80">
            <Logo />
          </Link>

          <nav className="mx-auto hidden items-center gap-8 xl:flex" aria-label="Hauptnavigation">
            {primaryNav.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={`relative py-1.5 text-[0.9375rem] font-medium transition-colors duration-200 ${
                    active ? "text-accent-deep" : "text-text-muted hover:text-ink"
                  }`}
                >
                  {item.label}
                  <span
                    className={`absolute -bottom-0.5 left-0 h-[2px] w-full origin-left bg-accent transition-transform duration-300 ease-smooth ${
                      active ? "scale-x-100" : "scale-x-0"
                    }`}
                    aria-hidden="true"
                  />
                </Link>
              );
            })}
          </nav>

          <div className="hidden shrink-0 items-center gap-4 lg:flex">
            <a
              href={site.phoneHref}
              className="hidden items-center gap-2 text-sm font-semibold text-ink transition-colors hover:text-accent-deep 2xl:inline-flex"
            >
              <Phone className="h-4 w-4 text-accent-mid" aria-hidden="true" />
              {site.phone}
            </a>
            <Link
              href="/bewertung"
              className="group/cta inline-flex items-center gap-2 rounded-[11px] bg-accent-deep px-5 py-3 text-sm font-semibold text-white shadow-[0_10px_20px_-14px_rgba(27,122,125,0.9)] transition-all duration-300 ease-smooth hover:-translate-y-0.5 hover:bg-accent-dark"
            >
              Immobilie bewerten
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/cta:translate-x-1" aria-hidden="true" />
            </Link>
          </div>

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

      {/* Mobile / tablet navigation */}
      <div
        id="mobile-nav"
        className={`fixed inset-x-0 bottom-0 top-[72px] z-40 overflow-y-auto border-t border-border bg-white transition-all duration-300 ease-smooth lg:hidden ${
          open ? "translate-y-0 opacity-100" : "pointer-events-none -translate-y-2 opacity-0"
        }`}
      >
        <Container as="nav" aria-label="Mobile Navigation" className="flex flex-col pb-16 pt-4">
          {primaryNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive(item.href) ? "page" : undefined}
              className={`border-b border-border py-4 font-display text-xl font-semibold ${
                isActive(item.href) ? "text-accent-deep" : "text-ink"
              }`}
            >
              {item.label}
            </Link>
          ))}

          <Link
            href="/bewertung"
            className="mt-8 inline-flex items-center justify-center gap-2 rounded-[11px] bg-accent-deep px-6 py-4 text-base font-semibold text-white"
          >
            Immobilie bewerten
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>

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
