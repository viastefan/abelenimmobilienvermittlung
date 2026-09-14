/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
      // Mediathek des bisherigen Wix-Auftritts. Bewusst nur dieser eine Host
      // statt "**": ein offener Platzhalter macht die Bild-Route zum
      // Weiterleitungsdienst für beliebige fremde Server.
      {
        protocol: "https",
        hostname: "static.wixstatic.com",
      },
    ],
    formats: ["image/avif", "image/webp"],
  },
  /**
   * Adressen des bisherigen Auftritts. Sie sind verlinkt und indexiert —
   * ohne Weiterleitung liefe jeder Treffer bei Google ins Leere.
   */
  async redirects() {
    return [
      { source: "/ueber-silke-abelen", destination: "/ueber-mich", permanent: true },
      { source: "/dienstleistungen", destination: "/leistungen", permanent: true },
      { source: "/anlagen-immobilienverkauf", destination: "/anlagen", permanent: true },
      {
        source: "/dienstleistungen-kaufberatung-verkaufsberatung",
        destination: "/leistungen",
        permanent: true,
      },
      // Objektseiten hießen dort /objektansicht/<titel>.
      {
        source: "/objektansicht/3-zimmer-wohnung-in-leverkusen",
        destination: "/immobilien/3-zimmer-wohnung-in-leverkusen",
        permanent: true,
      },
      {
        source: "/objektansicht/4-zimmer-wohnung-in-leverkusen-opladen",
        destination: "/immobilien/4-zimmer-wohnung-in-leverkusen-opladen",
        permanent: true,
      },
      {
        source: "/objektansicht/2-zimmer-wohnung-in-haan",
        destination: "/referenzen/2-zimmer-wohnung-in-haan",
        permanent: true,
      },
      // Alles Übrige unter /objektansicht landet auf der Angebotsübersicht,
      // statt ins Leere zu laufen.
      { source: "/objektansicht/:slug*", destination: "/immobilien", permanent: true },
    ];
  },

  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
    ];
  },
};

export default nextConfig;
