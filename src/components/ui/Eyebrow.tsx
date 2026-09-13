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
      className={`block font-display text-label font-bold uppercase ${
        light ? "text-accent-light" : "text-accent-deep"
      } ${className}`}
    >
      {children}
    </span>
  );
}
