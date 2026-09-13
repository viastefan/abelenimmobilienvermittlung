import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import { JsonLd } from "@/components/seo/JsonLd";
import { organizationSchema } from "@/lib/schema";
import { site } from "@/data/site";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Büro für Immobilien Bewertung & Vermittlung — Silke Abelen, Leverkusen",
    template: "%s — Silke Abelen",
  },
  description: site.description,
  keywords: [
    "Immobilienbewertung Leverkusen",
    "Immobilienmakler Leverkusen",
    "Immobilie verkaufen Leverkusen",
    "Immobilie vermieten Leverkusen",
    "Immobilienvermittlung Leverkusen",
    "Immobilien kaufen Leverkusen",
  ],
  authors: [{ name: site.owner }],
  openGraph: {
    type: "website",
    locale: "de_DE",
    siteName: site.name,
    title: "Ihre Immobilie. In guten Händen. — Silke Abelen, Leverkusen",
    description: site.description,
    url: site.url,
  },
  twitter: {
    card: "summary_large_image",
    title: "Silke Abelen — Büro für Immobilien Bewertung & Vermittlung",
    description: site.description,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de" className={manrope.variable}>
      <body className="flex min-h-screen flex-col bg-background">
        {children}
        <JsonLd data={organizationSchema()} />
      </body>
    </html>
  );
}
