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
    default: "Abelen Immobilien — Immobilienmakler Leichlingen, Leverkusen & Solingen",
    template: "%s — Abelen Immobilien",
  },
  description: site.description,
  keywords: [
    "Immobilienmakler Leichlingen",
    "Immobilienmakler Leverkusen",
    "Immobilienmakler Solingen",
    "Immobilienvermittlung Leichlingen",
    "Immobilien verkaufen Leichlingen",
    "Immobilie verkaufen Leverkusen",
    "Immobilienbewertung Leverkusen",
    "Immobilien kaufen Leverkusen",
    "Immobilienmakler Wuppertal",
  ],
  authors: [{ name: site.owner }],
  openGraph: {
    type: "website",
    locale: "de_DE",
    siteName: site.name,
    title: "Abelen Immobilien — Immobilien. Persönlich vermittelt.",
    description: site.description,
    url: site.url,
  },
  twitter: {
    card: "summary_large_image",
    title: "Abelen Immobilien",
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
