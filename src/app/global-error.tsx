"use client";

import { useEffect } from "react";

/**
 * Das letzte Netz: greift nur, wenn selbst der Rahmen der Seite nicht
 * aufgebaut werden kann. Dann gilt kein Stylesheet — deshalb steht die
 * Gestaltung hier direkt im Element.
 */
export default function GanzerFehler({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="de">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "24px",
          background: "#F3F6F8",
          color: "#102B4E",
          fontFamily: "system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif",
          textAlign: "center",
        }}
      >
        <main style={{ maxWidth: 420 }}>
          <h1 style={{ fontSize: 22, margin: "0 0 10px" }}>Die Seite lädt gerade nicht.</h1>
          <p style={{ fontSize: 15, lineHeight: 1.6, color: "#4A5D72", margin: "0 0 24px" }}>
            Bitte versuchen Sie es in einem Moment noch einmal.
          </p>
          <button
            type="button"
            onClick={reset}
            style={{
              height: 48,
              padding: "0 22px",
              border: 0,
              borderRadius: 14,
              background: "#102B4E",
              color: "#fff",
              fontSize: 15,
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            Noch einmal versuchen
          </button>
        </main>
      </body>
    </html>
  );
}
