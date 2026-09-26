import type { Metadata } from "next";
import Image from "next/image";
import { CircleAlert } from "lucide-react";
import { LogoMark } from "@/components/layout/Logo";
import { eingabeZeile, knopf } from "@/components/admin/ui";
import { siteMedia } from "@/data/wix-media";
import { site } from "@/data/site";
import { support } from "@/data/support";
import { signIn } from "../actions";

export const metadata: Metadata = { title: "Anmelden" };

/**
 * Die Tür zur App. Links das Motiv der Website, rechts genau zwei Felder.
 * Technisches steht hier nicht mehr: fehlt die Verbindung, heißt es „gerade
 * nicht erreichbar“ — was dahintersteckt, steht im Protokoll des Servers.
 */
export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; next?: string; email?: string; abgemeldet?: string }>;
}) {
  const { error, next, email, abgemeldet } = await searchParams;

  return (
    <div className="grid min-h-screen bg-white lg:grid-cols-[1.08fr_1fr]">
      <aside className="relative hidden overflow-hidden bg-ink-deep lg:block">
        <Image src={siteMedia.heroKeyPhoto} alt="" fill priority sizes="55vw" className="object-cover opacity-80" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-deep via-ink-deep/55 to-ink-deep/25" aria-hidden="true" />
        <div className="relative flex h-full flex-col justify-between p-12 xl:p-16">
          <span className="flex items-center gap-3 text-white">
            <LogoMark className="h-10 w-10 text-accent" />
            <span className="flex flex-col leading-tight">
              <span className="font-display text-[1rem] font-extrabold">{site.owner}</span>
              <span className="text-[0.8125rem] text-white/60">Immobilien</span>
            </span>
          </span>
          <div className="max-w-md">
            <p className="font-display text-[2.5rem] font-extrabold leading-[1.05] tracking-[-0.035em] text-white">
              Ihre Objekte.
              <br />
              Ihre Website.
            </p>
            <p className="mt-4 text-[1.0625rem] leading-relaxed text-white/70">
              Preise, Fotos und Anfragen an einem Ort — geändert in zwei Minuten, sofort online.
            </p>
          </div>
        </div>
      </aside>

      <main className="flex items-center justify-center px-6 py-12 sm:px-10">
        <div className="w-full max-w-[23rem]">
          <span className="mb-12 flex items-center gap-3 lg:hidden">
            <span className="flex h-11 w-11 items-center justify-center rounded-[13px] bg-ink-deep">
              <LogoMark className="h-7 w-7 text-accent" />
            </span>
            <span className="flex flex-col leading-tight">
              <span className="font-display text-[1rem] font-extrabold text-ink">{site.owner}</span>
              <span className="text-[0.8125rem] text-text-subtle">Immobilien</span>
            </span>
          </span>

          <h1 className="font-display text-[1.875rem] font-extrabold leading-tight tracking-[-0.03em] text-ink">Willkommen zurück</h1>
          <p className="mt-2 text-[0.9375rem] leading-relaxed text-text-muted">Melden Sie sich an, um Ihre Objekte zu pflegen.</p>

          {abgemeldet && !error && (
            <p className="mt-6 rounded-[14px] bg-accent-soft px-4 py-3 text-[0.875rem] text-accent-dark">Sie sind abgemeldet. Bis bald!</p>
          )}

          {error && (
            <p role="alert" className="mt-6 flex gap-2.5 rounded-[14px] bg-warning-soft px-4 py-3 text-[0.875rem] leading-relaxed text-warning">
              <CircleAlert className="mt-0.5 h-4 w-4 shrink-0" strokeWidth={2.2} aria-hidden="true" />
              {error}
            </p>
          )}

          <form action={signIn} className="mt-8 space-y-5">
            <input type="hidden" name="next" value={next ?? "/admin"} />
            <div>
              <label htmlFor="email" className="mb-2 block text-[0.875rem] font-semibold text-ink">
                E-Mail-Adresse
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                autoComplete="username"
                defaultValue={email}
                autoFocus={!email}
                className={eingabeZeile}
              />
            </div>
            <div>
              <label htmlFor="password" className="mb-2 block text-[0.875rem] font-semibold text-ink">
                Passwort
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                autoComplete="current-password"
                autoFocus={Boolean(email)}
                className={eingabeZeile}
              />
            </div>
            <button type="submit" className={`${knopf.primaer} w-full`}>
              Anmelden
            </button>
          </form>

          <p className="mt-8 text-center text-[0.875rem] text-text-muted">
            Passwort vergessen?{" "}
            <a
              href={`mailto:${support.email}?subject=${encodeURIComponent("Neues Passwort für die App")}`}
              className="font-semibold text-accent-deep underline-offset-4 hover:underline"
            >
              Kurze Nachricht genügt
            </a>
          </p>
        </div>
      </main>
    </div>
  );
}
