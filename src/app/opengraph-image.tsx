import { ImageResponse } from "next/og";
import { site } from "@/data/site";

export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Büro für Immobilien Bewertung & Vermittlung — Silke Abelen, Leverkusen";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "76px 80px",
          backgroundColor: "#0B2545",
          backgroundImage: "radial-gradient(110% 90% at 88% 8%, #14406E 0%, #0B2545 58%)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <svg width="70" height="64" viewBox="0 0 68 62" fill="none">
            <path
              d="M12 34.5V21.8L34 6l22 15.8v12.7"
              stroke="#65C6C7"
              strokeWidth="2.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path d="M14 39.5q5-4.4 10 0t10 0t10 0t10 0" stroke="#65C6C7" strokeWidth="2.4" strokeLinecap="round" />
            <path d="M9 46.5q6.25-4.4 12.5 0t12.5 0t12.5 0t12.5 0" stroke="#65C6C7" strokeWidth="2.4" strokeLinecap="round" />
            <path d="M15 53.5q4.75-4.4 9.5 0t9.5 0t9.5 0t9.5 0" stroke="#65C6C7" strokeWidth="2.4" strokeLinecap="round" />
          </svg>
          <div style={{ display: "flex", flexDirection: "column", color: "#FFFFFF", lineHeight: 1.3 }}>
            <span style={{ fontSize: 20, letterSpacing: 2, textTransform: "uppercase", opacity: 0.85 }}>
              Büro für Immobilien Bewertung &amp; Vermittlung
            </span>
            <span style={{ fontSize: 24, letterSpacing: 2, textTransform: "uppercase", fontWeight: 700 }}>
              Silke Abelen
            </span>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 20,
              letterSpacing: 4,
              textTransform: "uppercase",
              color: "#65C6C7",
              marginBottom: 24,
              display: "flex",
            }}
          >
            Ihr Partner für Immobilienkauf und -verkauf
          </div>
          <div
            style={{
              fontSize: 76,
              fontWeight: 800,
              color: "#FFFFFF",
              lineHeight: 1.05,
              letterSpacing: -2,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <span>Immobilienvermittlung,</span>
            <span>die Werte schafft</span>
          </div>
          <div style={{ fontSize: 24, color: "rgba(255,255,255,0.6)", marginTop: 28, display: "flex" }}>
            Bewertung · Verkauf · Vermittlung — {site.address.locality}
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
