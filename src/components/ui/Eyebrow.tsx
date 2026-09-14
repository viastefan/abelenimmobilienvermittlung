/**
 * Kennzeichnung über einer Überschrift.
 *
 * Als Plakette statt als Versalzeile: Großbuchstaben lesen sich langsamer,
 * und eine Fläche ordnet den Abschnitt sichtbar ein, statt ihn nur zu
 * beschriften.
 */
export function Eyebrow({
  children,
  light = false,
  className = "",
}: {
  children: React.ReactNode;
  light?: boolean;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex w-fit items-center gap-2 rounded-full px-3.5 py-1.5 text-[0.8125rem] font-semibold ${
        light
          ? "bg-white/10 text-accent-light ring-1 ring-inset ring-white/15"
          : "bg-accent-soft text-accent-deep"
      } ${className}`}
    >
      <span
        className={`h-1.5 w-1.5 rounded-full ${light ? "bg-accent" : "bg-accent-mid"}`}
        aria-hidden="true"
      />
      {children}
    </span>
  );
}
