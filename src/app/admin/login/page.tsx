import type { Metadata } from "next";
import { signIn } from "../actions";

export const metadata: Metadata = {
  title: "Admin-Login",
  robots: { index: false, follow: false },
};

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; next?: string }>;
}) {
  const { error, next } = await searchParams;

  return (
    <div className="flex min-h-screen items-center justify-center bg-ink px-6">
      <div className="w-full max-w-sm rounded-lg border border-white/10 bg-white/[0.04] p-8 shadow-2xl">
        <p className="font-display text-lg font-semibold text-white">
          Abelen <span className="text-accent">Immobilien</span>
        </p>
        <p className="mt-1 text-sm text-white/50">Admin-Bereich</p>

        <form action={signIn} className="mt-8 space-y-5">
          <input type="hidden" name="next" value={next ?? "/admin"} />
          <div>
            <label htmlFor="email" className="mb-1.5 block text-xs font-medium text-white/70">
              E-Mail
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              autoComplete="username"
              className="w-full rounded-md border border-white/15 bg-white/5 px-3.5 py-2.5 text-sm text-white placeholder:text-white/30 focus-visible:border-accent focus-visible:outline-none"
            />
          </div>
          <div>
            <label htmlFor="password" className="mb-1.5 block text-xs font-medium text-white/70">
              Passwort
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              autoComplete="current-password"
              className="w-full rounded-md border border-white/15 bg-white/5 px-3.5 py-2.5 text-sm text-white placeholder:text-white/30 focus-visible:border-accent focus-visible:outline-none"
            />
          </div>

          {error && (
            <p role="alert" className="rounded-md bg-red-500/10 px-3 py-2 text-sm text-red-300">
              {error}
            </p>
          )}

          <button
            type="submit"
            className="w-full rounded-md bg-white py-2.5 text-sm font-semibold text-ink transition-colors duration-200 hover:bg-accent hover:text-white"
          >
            Anmelden
          </button>
        </form>
      </div>
    </div>
  );
}
