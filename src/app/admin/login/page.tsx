import type { Metadata } from "next";
import { LogoMark } from "@/components/layout/Logo";
import { getSupabaseEnv } from "@/lib/supabase/env";
import { signIn } from "../actions";

export const metadata: Metadata = {
  title: "Anmelden",
  robots: { index: false, follow: false },
};

const inputClass =
  "w-full rounded-[10px] border border-white/15 bg-white/[0.06] px-3.5 py-2.5 text-[0.875rem] text-white transition-colors placeholder:text-white/30 focus:border-accent focus:outline-none";

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; next?: string }>;
}) {
  const { error, next } = await searchParams;
  const configured = Boolean(getSupabaseEnv());

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-ink-deep px-6">
      <div
        className="pointer-events-none absolute left-1/2 top-0 h-[28rem] w-[46rem] -translate-x-1/2 rounded-full bg-accent/10 blur-3xl"
        aria-hidden="true"
      />

      <div className="relative w-full max-w-[22rem]">
        <div className="flex items-center gap-3">
          <LogoMark className="h-9 w-9 text-accent" />
          <span className="flex flex-col leading-tight">
            <span className="text-[0.875rem] font-bold text-white">Silke Abelen</span>
            <span className="text-[0.625rem] font-bold uppercase tracking-[0.16em] text-white/40">Redaktion</span>
          </span>
        </div>

        <h1 className="mt-8 font-display text-[1.375rem] font-extrabold tracking-[-0.015em] text-white">
          Anmelden
        </h1>
        <p className="mt-1.5 text-[0.8125rem] text-white/50">
          Immobilien und Referenzen der Website pflegen.
        </p>

        {!configured && (
          <div className="mt-7 rounded-[12px] border border-white/15 bg-white/[0.06] p-5">
            <p className="text-[0.875rem] font-bold text-white">Datenbank nicht verbunden</p>
            <p className="mt-2 text-[0.8125rem] leading-relaxed text-white/60">
              Für die Anmeldung fehlen die Umgebungsvariablen{" "}
              <code className="text-white/80">NEXT_PUBLIC_SUPABASE_URL</code> und{" "}
              <code className="text-white/80">NEXT_PUBLIC_SUPABASE_ANON_KEY</code>. Sie werden im
              Hosting hinterlegt; danach ist ein neuer Deploy nötig.
            </p>
          </div>
        )}

        <form action={signIn} className={`mt-7 space-y-4 ${configured ? "" : "pointer-events-none opacity-40"}`}>
          <input type="hidden" name="next" value={next ?? "/admin"} />

          <div>
            <label htmlFor="email" className="mb-1.5 block text-[0.75rem] font-semibold text-white/70">
              E-Mail
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              autoComplete="username"
              disabled={!configured}
              className={inputClass}
            />
          </div>

          <div>
            <label htmlFor="password" className="mb-1.5 block text-[0.75rem] font-semibold text-white/70">
              Passwort
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              autoComplete="current-password"
              disabled={!configured}
              className={inputClass}
            />
          </div>

          {error && (
            <p role="alert" className="rounded-[10px] bg-white/10 px-3.5 py-2.5 text-[0.8125rem] text-accent-light">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={!configured}
            className="w-full rounded-[10px] bg-accent-deep py-3 text-[0.875rem] font-semibold text-white transition-colors duration-200 hover:bg-accent-dark"
          >
            Anmelden
          </button>
        </form>

        <p className="mt-8 text-[0.75rem] text-white/35">
          Passwort vergessen? Im Supabase-Dashboard unter Authentication zurücksetzen.
        </p>
      </div>
    </div>
  );
}
