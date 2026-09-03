export function Eyebrow({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return (
    <span
      className={`inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] ${
        light ? "text-white/70" : "text-accent"
      }`}
    >
      <span className={`h-px w-6 ${light ? "bg-white/50" : "bg-accent"}`} aria-hidden="true" />
      {children}
    </span>
  );
}
