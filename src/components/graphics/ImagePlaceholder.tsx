import { LogoMark } from "@/components/layout/Logo";

/**
 * Ruhige Platzhalterfläche für Bildplätze ohne Foto.
 *
 * Bewusst grafisch und zurückhaltend statt illustrativ: eine Markenfläche
 * liest sich als gestaltete Leerstelle, eine gezeichnete Szene dagegen als
 * misslungenes Foto. Sobald eine Bilddatei hinterlegt ist (siehe
 * `src/data/imagery.ts`), ersetzt das Foto diese Fläche automatisch.
 */
export function ImagePlaceholder({ label, className = "" }: { label?: string; className?: string }) {
  return (
    <div
      className={`relative flex h-full w-full items-center justify-center overflow-hidden bg-[linear-gradient(140deg,#F4FBFB_0%,#EAF3F7_46%,#E3EDF3_100%)] ${className}`}
    >
      <div
        className="pointer-events-none absolute -right-1/4 -top-1/3 h-[120%] w-[80%] rounded-full bg-white/60 blur-3xl"
        aria-hidden="true"
      />
      <LogoMark className="relative h-1/3 w-1/3 max-h-40 max-w-40 text-accent/25" />
      <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-ink/5" aria-hidden="true" />
      {label && (
        <span className="absolute bottom-4 left-4 rounded-full bg-white/85 px-3 py-1.5 text-[0.6875rem] font-semibold uppercase tracking-[0.1em] text-text-muted backdrop-blur">
          {label}
        </span>
      )}
    </div>
  );
}
