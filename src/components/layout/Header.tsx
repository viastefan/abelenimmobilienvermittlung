"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ChevronDown, ChevronRight, Mail, Menu, MessageSquare, X } from "lucide-react";
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

  // Esc schließt das Menü — der Zuhörer hängt am Fenster, nicht am Feld,
  // damit er auch greift, wenn der Fokus noch auf der Schaltfläche liegt.
  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

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
      <div className="hidden border-b border-border bg-surface-warm lg:block">
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
            compact ? "h-[64px] lg:h-[68px]" : "h-[80px] lg:h-[96px]"
          }`}
        >
          <Link
            href="/"
            aria-label={`${site.legalName} — Startseite`}
            className={`shrink-0 origin-left transition-all duration-500 ease-smooth hover:opacity-80 ${
              compact ? "lg:scale-[0.82]" : "scale-[1.06] lg:scale-[1.12]"
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
                      <ul className="rounded-[24px] bg-white/95 p-1.5 shadow-lift ring-1 ring-border backdrop-blur-xl">
                        {item.children.map((child) => (
                          <li key={child.href}>
                            <Link
                              href={child.href}
                              aria-current={isActive(child.href) ? "page" : undefined}
                              className={`block rounded-[14px] px-3 py-2.5 text-[0.875rem] font-medium transition-colors duration-200 ${
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
            className="hidden shrink-0 items-center gap-2.5 rounded-[14px] bg-accent-deep px-5 py-3 text-sm font-semibold text-white transition-all duration-300 ease-smooth hover:-translate-y-0.5 hover:bg-accent-dark lg:inline-flex"
          >
            <MessageSquare className="h-4 w-4" aria-hidden="true" />
            Kontakt aufnehmen
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
      {/* Geschlossen ist das Feld unsichtbar, bleibt aber im Baum. `inert`
          nimmt es aus Tabreihenfolge und Vorlesereihenfolge — sonst wandert
          der Fokus in ein Menü, das niemand sieht. */}
      <div
        id="mobile-nav"
        inert={!open}
        className={`fixed inset-x-0 bottom-0 top-[72px] z-40 overflow-y-auto overscroll-contain border-t border-border bg-white pb-safe transition-all duration-300 ease-smooth lg:hidden ${
          open ? "translate-y-0 opacity-100" : "pointer-events-none -translate-y-1.5 opacity-0"
        }`}
      >
        <Container as="nav" aria-label="Mobile Navigation" className="flex flex-col pb-16 pt-2">
          {/* Die Einträge laufen gestaffelt ein, sobald das Feld offen ist —
              erst dann, sonst stünde die Staffelung schon beim Schließen an. */}
          <ul className="divide-y divide-border">
            {primaryNav.map((item, position) => (
              <li
                key={item.label}
                className={`transition-all duration-300 ease-smooth ${
                  open ? "translate-y-0 opacity-100" : "translate-y-1 opacity-0"
                }`}
                style={{ transitionDelay: open ? `${60 + position * 35}ms` : "0ms" }}
              >
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className="group flex items-center justify-between gap-4 py-4 font-display text-[1.25rem] font-semibold tracking-[-0.015em] transition-colors duration-200"
                >
                  {/* Der aktive Eintrag trägt einen Strich in Markenfarbe statt
                      einer gefüllten Pille — ruhiger und leichter zu lesen. */}
                  <span
                    className={`flex items-center gap-3.5 ${
                      isActive(item.href) ? "text-accent-deep" : "text-ink"
                    }`}
                  >
                    <span
                      aria-hidden="true"
                      className={`block h-5 w-[3px] rounded-full transition-colors duration-200 ${
                        isActive(item.href) ? "bg-accent-deep" : "bg-transparent"
                      }`}
                    />
                    {item.label}
                  </span>
                  <ChevronRight
                    className="h-4 w-4 shrink-0 text-text-subtle transition-transform duration-200 group-active:translate-x-0.5"
                    strokeWidth={2}
                    aria-hidden="true"
                  />
                </Link>

                {item.children && (
                  <ul className="pb-3 pl-6">
                    {item.children.map((child) => (
                      <li key={child.href}>
                        <Link
                          href={child.href}
                          aria-current={isActive(child.href) ? "page" : undefined}
                          className={`block py-2 text-[0.9375rem] ${
                            isActive(child.href) ? "font-semibold text-accent-deep" : "text-text-muted"
                          }`}
                        >
                          {child.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>

          <ContactButton
            options={{ title: "Kontakt aufnehmen" }}
            onActivate={() => setOpen(false)}
            className="mt-8 inline-flex items-center justify-center gap-2 rounded-[14px] bg-accent-deep px-6 py-4 text-base font-semibold text-white"
          >
            <MessageSquare className="h-4 w-4" aria-hidden="true" />
            Kontakt aufnehmen
          </ContactButton>

          <a
            href={`mailto:${site.email}`}
            className="mt-5 flex items-center gap-3 text-[0.9375rem] font-medium text-text-muted"
          >
            <Mail className="h-4 w-4 shrink-0 text-accent-mid" aria-hidden="true" />
            {site.email}
          </a>
        </Container>
      </div>
    </div>
  );
}
