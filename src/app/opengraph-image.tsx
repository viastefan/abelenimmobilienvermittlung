import { ImageResponse } from "next/og";
import { site } from "@/data/site";

export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          padding: "80px",
          backgroundColor: "#15160F",
          backgroundImage: "radial-gradient(120% 100% at 85% 0%, #3a352c 0%, #15160F 55%)",
        }}
      >
        <div
          style={{
            fontSize: 22,
            letterSpacing: 4,
            textTransform: "uppercase",
            color: "#8D6F52",
            marginBottom: 24,
            display: "flex",
          }}
        >
          Immobilienvermittlung im Rheinland
        </div>
        <div
          style={{
            fontSize: 72,
            fontWeight: 700,
            color: "#ffffff",
            lineHeight: 1.05,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <span>Immobilien.</span>
          <span>Persönlich vermittelt.</span>
        </div>
        <div style={{ fontSize: 24, color: "rgba(255,255,255,0.6)", marginTop: 32, display: "flex" }}>
          {site.name}
        </div>
      </div>
    ),
    { ...size }
  );
}
