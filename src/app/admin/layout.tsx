import type { Metadata, Viewport } from "next";

/**
 * Gilt für die ganze App, Anmeldung eingeschlossen.
 *
 * Eigenes Manifest: legt Silke Abelen die App auf den Startbildschirm ihres
 * Telefons, öffnet sie sich dort als App — ohne Adresszeile, direkt in der
 * Übersicht, mit eigenem Namen. Das Manifest der Website führte auf die
 * Startseite der Website.
 */
export const metadata: Metadata = {
  title: {
    default: "Ihre Objekte",
    template: "%s — Silke Abelen",
  },
  robots: { index: false, follow: false },
  manifest: "/app.webmanifest",
  appleWebApp: {
    capable: true,
    title: "Abelen",
    statusBarStyle: "default",
  },
};

export const viewport: Viewport = {
  themeColor: "#F3F6F8",
  viewportFit: "cover",
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return children;
}
