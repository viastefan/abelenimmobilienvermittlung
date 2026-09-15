/**
 * Kennzeichnung über einer Überschrift.
 *
 * Eine schmale Versalzeile, keine Plakette und kein Punkt davor: das Auge
 * soll bei der Überschrift landen, nicht bei ihrer Beschriftung. Wo eine
 * Überschrift für sich steht, gehört hier gar nichts hin.
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
      className={`block text-[0.75rem] font-semibold uppercase tracking-[0.14em] ${
        light ? "text-accent-light" : "text-accent-deep"
      } ${className}`}
    >
      {children}
    </span>
  );
}
