import Link from "next/link";
import { redirect } from "next/navigation";
import { LayoutDashboard, Building2, ExternalLink, LogOut } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { signOut } from "../actions";

export const metadata = {
  robots: { index: false, follow: false },
};

const navItems = [
  { href: "/admin", label: "Übersicht", icon: LayoutDashboard },
  { href: "/admin/immobilien", label: "Immobilien", icon: Building2 },
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
    <div className="flex min-h-screen bg-surface-soft text-ink">
      <aside className="hidden w-64 shrink-0 flex-col border-r border-border bg-surface lg:flex">
        <div className="px-6 py-6">
          <Link href="/admin" className="font-display text-base font-semibold tracking-tight text-ink">
            Abelen <span className="text-accent">Immobilien</span>
          </Link>
          <p className="mt-0.5 text-xs uppercase tracking-[0.12em] text-text-muted">Admin</p>
        </div>

        <nav className="flex-1 space-y-1 px-3" aria-label="Admin-Navigation">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium text-text hover:bg-surface-soft"
            >
              <item.icon className="h-4 w-4 text-text-muted" aria-hidden="true" />
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="border-t border-border p-3">
          <Link
            href="/"
            target="_blank"
            className="flex items-center gap-3 rounded-md px-3 py-2.5 text-sm text-text-muted hover:bg-surface-soft"
          >
            <ExternalLink className="h-4 w-4" aria-hidden="true" />
            Website ansehen
          </Link>
          <p className="truncate px-3 pt-2 text-xs text-text-muted">{user.email}</p>
          <form action={signOut}>
            <button
              type="submit"
              className="mt-1 flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-sm text-text-muted hover:bg-surface-soft hover:text-ink"
            >
              <LogOut className="h-4 w-4" aria-hidden="true" />
              Abmelden
            </button>
          </form>
        </div>
      </aside>

      <div className="flex min-h-screen flex-1 flex-col">
        <header className="flex items-center justify-between border-b border-border bg-surface px-4 py-3 lg:hidden">
          <Link href="/admin" className="font-display text-sm font-semibold text-ink">
            Abelen <span className="text-accent">Immobilien</span>
          </Link>
          <nav className="flex items-center gap-4" aria-label="Admin-Navigation">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} className="text-sm text-text-muted">
                {item.label}
              </Link>
            ))}
            <form action={signOut}>
              <button type="submit" className="text-sm text-text-muted">
                Abmelden
              </button>
            </form>
          </nav>
        </header>

        <main className="flex-1 px-4 py-8 sm:px-8 lg:px-10">{children}</main>
      </div>
    </div>
  );
}
