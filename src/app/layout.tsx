import type { Metadata } from "next";
import { Manrope, Inter } from "next/font/google";
import { JsonLd } from "@/components/seo/JsonLd";
import { organizationSchema } from "@/lib/schema";
import { site } from "@/data/site";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
  weight: ["500", "600", "700", "800"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Silke Abelen — Büro für Immobilien Bewertung & Vermittlung in Leverkusen",
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
    title: "Silke Abelen — Ihre Immobilie. In guten Händen.",
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
    <html lang="de" className={`${manrope.variable} ${inter.variable}`}>
      <body className="flex min-h-screen flex-col bg-background">
        {children}
        <JsonLd data={organizationSchema()} />
      </body>
    </html>
  );
}
