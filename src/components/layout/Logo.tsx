import { PhotoImage } from "@/components/graphics/PhotoImage";
import { brandMedia } from "@/data/wix-media";
type MarkProps = {
  className?: string;
};

/**
 * Die Marke als Vektor nachgezeichnet. Sie erbt ihre Farbe und wird deshalb
 * dort eingesetzt, wo die Originalgrafik nicht mitkommt: als Wasserzeichen
 * auf Platzhalterflächen und auf dem dunklen Rand des Panels. Im Kopf der
 * Website steht die Originaldatei — siehe `Logo`.
 */
export function LogoMark({ className = "h-10 w-10" }: MarkProps) {
  const waves = [
    { y: 39.5, from: 14, seg: 10 },
    { y: 46.5, from: 9, seg: 12.5 },
    { y: 53.5, from: 15, seg: 9.5 },
  ];

  return (
    <svg viewBox="0 0 68 62" fill="none" className={className} aria-hidden="true">
      <path
        d="M12 34.5V21.8L34 6l22 15.8v12.7"
        stroke="currentColor"
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {waves.map((wave) => (
        <path
          key={wave.y}
          d={`M${wave.from} ${wave.y} q ${wave.seg / 2} -4.4 ${wave.seg} 0 t ${wave.seg} 0 t ${wave.seg} 0 t ${wave.seg} 0`}
          stroke="currentColor"
          strokeWidth="2.4"
          strokeLinecap="round"
          fill="none"
        />
      ))}
    </svg>
  );
}

type LogoProps = {
  className?: string;
  /** Renders the wordmark in white for use on navy surfaces. */
  inverted?: boolean;
  compact?: boolean;
};

export function Logo({ className = "", inverted = false, compact = false }: LogoProps) {
  const markSize = compact ? "h-10 w-10" : "h-11 w-11 sm:h-[3.25rem] sm:w-[3.25rem]";

  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      {/* Originalgrafik statt der nachgezeichneten Marke. Die Schrift daneben
          bleibt gesetzt: als Text ist sie in jeder Größe scharf, lässt sich
          vorlesen und passt ihre Farbe dem Untergrund an.
          Liefert der fremde Server die Grafik nicht aus, springt die
          gezeichnete Marke ein — im Kopf der Website darf kein Loch sein. */}
      <PhotoImage
        src={brandMedia.mark}
        alt=""
        width={1000}
        height={1000}
        priority
        className={`${markSize} shrink-0 object-contain`}
        fallback={
          <LogoMark className={`${markSize} shrink-0 ${inverted ? "text-white" : "text-accent"}`} />
        }
      />
      <span
        className={`flex flex-col font-display leading-[1.32] ${
          inverted ? "text-white" : "text-ink"
        }`}
      >
        <span
          className={`${
            compact ? "text-[9.5px]" : "text-[10px] sm:text-[10.5px]"
          } font-medium uppercase tracking-[0.11em] ${inverted ? "text-white/85" : "text-ink/85"}`}
        >
          Büro für Immobilien
          <br />
          Bewertung &amp; Vermittlung
        </span>
        <span
          className={`${
            compact ? "text-[11px]" : "text-[12px] sm:text-[12.5px]"
          } font-extrabold uppercase tracking-[0.11em]`}
        >
          Silke Abelen
        </span>
      </span>
    </span>
  );
}
