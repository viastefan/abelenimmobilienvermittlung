/**
 * Der kurze Strich unter einer Überschrift.
 *
 * Eine gerade Linie in Markenfarbe, keine geschwungene: wer eine Immobilie
 * für mehrere hunderttausend Euro anvertraut, sucht Verlässlichkeit, nicht
 * Zierde. Der Strich ordnet, ohne sich vorzudrängen.
 */
export function HeadingRule({
  light = false,
  className = "",
}: {
  light?: boolean;
  className?: string;
}) {
  return (
    <span
      aria-hidden="true"
      className={`block h-[3px] w-11 rounded-full ${light ? "bg-accent" : "bg-accent-deep"} ${className}`}
    />
  );
}
