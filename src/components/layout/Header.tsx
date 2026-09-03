"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { primaryNav, site } from "@/data/site";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const solid = scrolled || open;
  // Only the homepage opens on a dark, full-bleed hero — everywhere else the
  // header sits directly over light content, so it needs dark text even
  // before the user scrolls.
  const overDarkHero = pathname === "/" && !solid;

  return (
    <>
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-smooth ${
        solid
          ? "bg-background/90 backdrop-blur-md border-b border-border shadow-[0_1px_0_0_rgba(31,33,31,0.02)]"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <Container className="flex h-[72px] items-center justify-between">
        <Link
          href="/"
          className={`font-display text-lg font-semibold tracking-tight transition-colors duration-300 ${
            overDarkHero ? "text-white" : "text-ink"
          }`}
        >
          Abelen <span className="text-accent">Immobilien</span>
        </Link>

        <nav className="hidden items-center gap-8 lg:flex" aria-label="Hauptnavigation">
          {primaryNav.slice(1).map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`link-underline text-sm font-medium transition-colors duration-300 ${
                  overDarkHero
                    ? active
                      ? "text-white"
                      : "text-white/70 hover:text-white"
                    : active
                      ? "text-ink"
                      : "text-text-muted hover:text-ink"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden lg:block">
          <Button href="/verkaufen" variant={overDarkHero ? "inverted" : "primary"} className="py-3">
            Immobilie verkaufen
          </Button>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Menü schließen" : "Menü öffnen"}
          className={`flex h-10 w-10 items-center justify-center rounded-md transition-colors duration-300 lg:hidden ${
            overDarkHero ? "text-white" : "text-ink"
          }`}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </Container>
    </header>

      <div
        id="mobile-nav"
        className={`fixed inset-x-0 top-[72px] bottom-0 z-40 overflow-y-auto bg-background transition-all duration-300 ease-smooth lg:hidden ${
          open ? "translate-y-0 opacity-100" : "pointer-events-none -translate-y-2 opacity-0"
        }`}
      >
        <Container as="nav" aria-label="Mobile Navigation" className="flex flex-col gap-1 py-8">
          {primaryNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="border-b border-border py-4 font-display text-2xl font-medium text-ink"
            >
              {item.label}
            </Link>
          ))}
          <div className="mt-8 flex flex-col gap-4">
            <Button href="/verkaufen" variant="primary">
              Immobilie verkaufen
            </Button>
            <a href={site.phoneHref} className="text-center text-sm font-medium text-text-muted">
              {site.phone}
            </a>
          </div>
        </Container>
      </div>
    </>
  );
}
