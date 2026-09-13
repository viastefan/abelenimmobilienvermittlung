import Link from "next/link";
import { redirect } from "next/navigation";
import { Building2, ExternalLink, LayoutDashboard, LogOut, Star } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { LogoMark } from "@/components/layout/Logo";
import { signOut } from "../actions";

export const metadata = {
  title: "Admin — Abelen Immobilien",
  robots: { index: false, follow: false },
};

const navItems = [
  { href: "/admin", label: "Übersicht", icon: LayoutDashboard },
  { href: "/admin/immobilien", label: "Immobilien", icon: Building2 },
  { href: "/admin/referenzen", label: "Referenzen", icon: Star },
];

export default async function AdminDashboardLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/admin/login");
  }

  return (
    <div className="flex min-h-screen bg-surface-cool text-ink">
      <aside className="hidden w-60 shrink-0 flex-col bg-ink-deep lg:flex">
        <div className="px-5 py-6">
          <Link href="/admin" className="flex items-center gap-3">
            <LogoMark className="h-8 w-8 text-accent" />
            <span className="flex flex-col leading-tight">
              <span className="text-[0.8125rem] font-bold text-white">Silke Abelen</span>
              <span className="text-[0.625rem] font-bold uppercase tracking-[0.16em] text-white/40">Redaktion</span>
            </span>
          </Link>
        </div>

        <nav className="flex-1 space-y-0.5 px-3" aria-label="Admin-Navigation">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 rounded-[10px] px-3 py-2.5 text-[0.8125rem] font-medium text-white/65 transition-colors duration-200 hover:bg-white/10 hover:text-white"
            >
              <item.icon className="h-4 w-4" strokeWidth={1.6} aria-hidden="true" />
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="border-t border-white/10 p-3">
          <Link
            href="/"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-3 rounded-[10px] px-3 py-2.5 text-[0.8125rem] text-white/55 transition-colors hover:bg-white/10 hover:text-white"
          >
            <ExternalLink className="h-4 w-4" strokeWidth={1.6} aria-hidden="true" />
            Website ansehen
          </Link>
          <p className="truncate px-3 pb-1 pt-3 text-[0.6875rem] text-white/35">{user.email}</p>
          <form action={signOut}>
            <button
              type="submit"
              className="flex w-full items-center gap-3 rounded-[10px] px-3 py-2.5 text-[0.8125rem] text-white/55 transition-colors hover:bg-white/10 hover:text-white"
            >
              <LogOut className="h-4 w-4" strokeWidth={1.6} aria-hidden="true" />
              Abmelden
            </button>
          </form>
        </div>
      </aside>

      <div className="flex min-h-screen flex-1 flex-col">
        <header className="flex items-center justify-between gap-4 bg-ink-deep px-4 py-3 lg:hidden">
          <Link href="/admin" className="flex items-center gap-2.5">
            <LogoMark className="h-7 w-7 text-accent" />
            <span className="text-[0.8125rem] font-bold text-white">Redaktion</span>
          </Link>
          <nav className="flex items-center gap-3 text-[0.75rem]" aria-label="Admin-Navigation">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} className="text-white/65 hover:text-white">
                {item.label}
              </Link>
            ))}
            <form action={signOut}>
              <button type="submit" className="text-white/65 hover:text-white">
                Abmelden
              </button>
            </form>
          </nav>
        </header>

        <main className="flex-1 px-4 py-8 sm:px-7 lg:px-9">{children}</main>
      </div>
    </div>
  );
}
