import Link from "next/link";

export default function RootNotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-background px-6 text-center">
      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-accent">404</p>
      <h1 className="font-display text-2xl font-semibold text-ink">Seite nicht gefunden.</h1>
      <Link href="/" className="text-sm font-medium text-ink underline">
        Zur Startseite
      </Link>
    </div>
  );
}
