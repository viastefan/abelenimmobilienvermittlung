import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowUpRight, ChevronRight, Globe } from "lucide-react";
import { LogoMark } from "@/components/layout/Logo";
import { site } from "@/data/site";
import { AdminNav } from "./AdminNav";
import { ToastBereich } from "./Toast";
import { Verbindung } from "./Verbindung";

function Initialen({ className = "" }: { className?: string }) {
  const kuerzel = site.owner
    .split(/\s+/)
    .map((teil) => teil[0])
    .join("")
    .slice(0, 2);
  return (
    <span
      className={`flex shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-accent-deep to-ink font-display font-bold text-white ${className}`}
      aria-hidden="true"
    >
      {kuerzel}
    </span>
  );
}

function Marke() {
  return (
    <span className="flex items-center gap-3">
      <span className="flex h-10 w-10 items-center justify-center rounded-[12px] bg-ink-deep shadow-[0_2px_6px_rgba(11,37,69,0.25)]">
        <LogoMark className="h-7 w-7 text-accent" />
      </span>
      <span className="flex flex-col leading-tight">
        <span className="font-display text-[0.9375rem] font-extrabold tracking-[-0.01em] text-ink">{site.owner}</span>
        <span className="text-[0.75rem] font-medium text-text-subtle">Immobilien</span>
      </span>
    </span>
  );
}

/**
 * Der Rahmen der App: links die Bereiche, rechts die Arbeit. Am Telefon
 * oben die Marke, unten die Bereiche — wie in jeder App, die man kennt.
 */
export function AdminShell({
  email,
  offeneAnfragen,
  children,
}: {
  email?: string;
  offeneAnfragen: number;
  children: ReactNode;
}) {
  return (
    <ToastBereich>
      <div className="min-h-screen bg-surface-cool text-ink">
        <aside className="fixed inset-y-0 left-0 z-30 hidden w-[16.5rem] flex-col border-r border-[#E6EBEF] bg-white lg:flex">
          <Link href="/admin" className="mx-3 mb-7 mt-6 rounded-[14px] px-2 py-1.5 transition-colors hover:bg-surface-cool/70">
            <Marke />
          </Link>

          <AdminNav offeneAnfragen={offeneAnfragen} variant="spalte" />

          <div className="mt-auto space-y-1 p-3">
            <a
              href="/"
              target="_blank"
              rel="noreferrer"
              className="group flex items-center gap-3 rounded-[13px] px-3 py-2.5 text-[0.9375rem] font-semibold text-text-muted transition-colors hover:bg-surface-cool/70 hover:text-ink"
            >
              <Globe className="h-5 w-5 text-text-subtle group-hover:text-ink" strokeWidth={1.8} aria-hidden="true" />
              <span className="flex-1">Website ansehen</span>
              <ArrowUpRight className="h-4 w-4 opacity-50" strokeWidth={2} aria-hidden="true" />
            </a>

            <Link
              href="/admin/konto"
              className="flex items-center gap-3 rounded-[16px] p-2.5 ring-1 ring-[#E6EBEF] transition-colors hover:bg-surface-cool/70"
            >
              <Initialen className="h-9 w-9 text-[0.8125rem]" />
              <span className="min-w-0 flex-1 leading-tight">
                <span className="block text-[0.875rem] font-semibold text-ink">{site.owner}</span>
                {email && <span className="block truncate text-[0.75rem] text-text-subtle">{email}</span>}
              </span>
              <ChevronRight className="h-4 w-4 text-text-subtle" strokeWidth={2} aria-hidden="true" />
            </Link>
          </div>
        </aside>

        <div className="lg:pl-[16.5rem]">
          <header className="sticky top-0 z-30 border-b border-black/[0.06] bg-white/[0.88] pt-[env(safe-area-inset-top)] backdrop-blur-xl backdrop-saturate-150 lg:hidden">
            <div className="flex h-14 items-center justify-between px-4">
              <Link href="/admin" aria-label="Zur Übersicht">
                <Marke />
              </Link>
              <div className="flex items-center gap-1">
                <a
                  href="/"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Website ansehen"
                  className="flex h-10 w-10 items-center justify-center rounded-full text-text-muted transition-colors hover:bg-ink/[0.05] hover:text-ink"
                >
                  <Globe className="h-5 w-5" strokeWidth={1.8} aria-hidden="true" />
                </a>
                <Link href="/admin/konto" aria-label="Ihr Zugang" className="rounded-full p-1 transition-transform active:scale-95">
                  <Initialen className="h-8 w-8 text-[0.75rem]" />
                </Link>
              </div>
            </div>
          </header>

          <main className="mx-auto max-w-[72rem] px-4 pb-28 pt-6 sm:px-6 lg:px-10 lg:pb-16 lg:pt-10">{children}</main>
        </div>

        <AdminNav offeneAnfragen={offeneAnfragen} variant="leiste" />
        <Verbindung />
      </div>
    </ToastBereich>
  );
}
