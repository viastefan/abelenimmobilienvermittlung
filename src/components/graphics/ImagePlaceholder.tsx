import { LogoMark } from "@/components/layout/Logo";

/**
 * Ruhige Platzhalterfläche für Bildplätze ohne Foto.
 *
 * Bewusst grafisch und zurückhaltend statt illustrativ: eine Markenfläche
 * liest sich als gestaltete Leerstelle, eine gezeichnete Szene dagegen als
 * misslungenes Foto. Sobald eine Bilddatei hinterlegt ist (siehe
 * `src/data/imagery.ts`), ersetzt das Foto diese Fläche automatisch.
 *
 * Unter weißer Schrift muss sie dunkel sein. Die Aufmacher tragen ihren Text
 * auf dem Foto und decken es nur noch leicht ab — bleibt das Foto aus und
 * steht dort die helle Fläche, ist die Schrift darauf nicht mehr zu lesen.
 * `tone="dark"` gibt denselben Platzhalter auf dem Grund der Marke.
 */
export type PlaceholderTone = "light" | "dark";

export function ImagePlaceholder({
  label,
  tone = "light",
  className = "",
}: {
  label?: string;
  tone?: PlaceholderTone;
  className?: string;
}) {
  const dunkel = tone === "dark";

  return (
    <div
      className={`relative flex h-full w-full items-center justify-center overflow-hidden ${
        dunkel
          ? "bg-[linear-gradient(140deg,#123257_0%,#0B2545_52%,#081C35_100%)]"
          : "bg-[linear-gradient(140deg,#F4FBFB_0%,#EAF3F7_46%,#E3EDF3_100%)]"
      } ${className}`}
    >
      <div
        className={`pointer-events-none absolute -right-1/4 -top-1/3 h-[120%] w-[80%] rounded-full blur-3xl ${
          dunkel ? "bg-accent/10" : "bg-white/60"
        }`}
        aria-hidden="true"
      />
      <LogoMark
        className={`relative h-1/3 w-1/3 max-h-40 max-w-40 ${dunkel ? "text-accent/30" : "text-accent/25"}`}
      />
      <div
        className={`pointer-events-none absolute inset-0 ring-1 ring-inset ${
          dunkel ? "ring-white/10" : "ring-ink/5"
        }`}
        aria-hidden="true"
      />
      {label && (
        <span
          className={`absolute bottom-4 left-4 rounded-full px-3 py-1.5 text-[0.75rem] font-medium backdrop-blur ${
            dunkel ? "bg-white/10 text-white/80" : "bg-white/85 text-text-muted"
          }`}
        >
          {label}
        </span>
      )}
    </div>
  );
}
