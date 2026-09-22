import type { Config } from "tailwindcss";

/**
 * Abelen Immobilien design system.
 *
 * Palette is deliberately narrow: navy carries trust, turquoise carries
 * personality, white carries calm. Turquoise never covers large surfaces —
 * it appears as accent, icon, rule and interactive colour only.
 */
const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    container: {
      center: true,
      padding: "1.5rem",
    },
    extend: {
      colors: {
        background: "#FFFFFF",
        surface: "#FFFFFF",
        // Warm white — the quiet ground colour for alternating sections.
        "surface-warm": "#FBFCFC",
        // Light turquoise — used sparingly behind cards and quiet panels.
        "surface-soft": "#EAF8F8",
        // Warmes Sandweiß. Der einzige warme Ton der Palette: er trägt den
        // Aufmacher, damit die Startseite nicht mit einer kalten Fläche
        // beginnt. Für Text ist er nie Grund genug — dafür bleibt Weiß.
        "surface-sand": "#FBF6F0",
        "surface-sand-deep": "#F5EDE4",
        "surface-mist": "#F1F5F8",
        "surface-cool": "#F3F6F8",
        /**
         * Die drei Textstufen halten auf jedem Grund der Palette mindestens
         * 4,5:1 — also auch auf den hellen Flächen `surface-mist` und
         * `surface-cool`, nicht nur auf Weiß. Die beiden leiseren Stufen
         * lagen darunter: `muted` bei 4,17 und `subtle` bei 2,71. Beide
         * tragen kleine, aber tragende Beschriftungen — „Kaufpreis“,
         * „E-Mail“, den Weg über der Überschrift —, die niemand raten soll.
         * Der Abstand zwischen den Stufen bleibt, sie sitzen nur tiefer.
         */
        text: {
          DEFAULT: "#19324D",
          muted: "#5C6B7D",
          subtle: "#627081",
        },
        border: {
          DEFAULT: "#E2E9ED",
          strong: "#CFDBE2",
        },
        accent: {
          // Brand turquoise. Decorative use: logo, icons, rules, hover states.
          DEFAULT: "#65C6C7",
          light: "#A5DEDF",
          mid: "#2E9D9C",
          // Interactive turquoise. Trägt 4,5:1 nicht nur auf Weiß, sondern
          // auch auf `accent-soft` — dort steht es als Ortsangabe auf den
          // Objektkarten und lag mit dem alten Wert bei 4,14.
          deep: "#197774",
          dark: "#166B68",
          soft: "#EAF8F8",
          tint: "#F4FBFB",
        },
        ink: "#102B4E",
        "ink-soft": "#1B3D66",
        "ink-deep": "#0B2545",
        success: {
          DEFAULT: "#1B7A7D",
          soft: "#EAF8F8",
        },
        /**
         * Warnton. Er steht fast immer auf seiner eigenen weichen Fläche —
         * als Fehlermeldung im Panel und als Abzeichen „Reserviert“ — und
         * lag dort bei 3,77. Auf Weiß reichte es knapp, auf dem eigenen
         * Grund nicht: genau dort steht er aber.
         */
        warning: {
          DEFAULT: "#9B5318",
          soft: "#F6E9D9",
        },
      },
      fontFamily: {
        display: ["var(--font-manrope)", "system-ui", "sans-serif"],
        sans: ["var(--font-manrope)", "system-ui", "sans-serif"],
      },
      fontSize: {
        "display-xl": ["clamp(2.125rem, 3.2vw, 2.75rem)", { lineHeight: "1.08", letterSpacing: "-0.03em" }],
        "display-lg": ["clamp(1.75rem, 2.7vw, 2.375rem)", { lineHeight: "1.14", letterSpacing: "-0.027em" }],
        "display-md": ["clamp(1.5rem, 2.1vw, 1.9375rem)", { lineHeight: "1.2", letterSpacing: "-0.022em" }],
        "display-sm": ["clamp(1.1875rem, 1.5vw, 1.375rem)", { lineHeight: "1.28", letterSpacing: "-0.015em" }],
        label: ["0.6875rem", { lineHeight: "1", letterSpacing: "0.16em" }],
      },
      maxWidth: {
        content: "1440px",
        prose: "68ch",
      },
      spacing: {
        "topbar": "40px",
        "header": "80px",
        "chrome": "120px",
      },
      borderRadius: {
        sm: "6px",
        DEFAULT: "10px",
        md: "12px",
        lg: "16px",
        xl: "20px",
        "2xl": "28px",
      },
      boxShadow: {
        soft: "0 1px 2px rgba(16,43,78,0.04), 0 10px 30px -18px rgba(16,43,78,0.18)",
        lift: "0 2px 4px rgba(16,43,78,0.04), 0 22px 44px -24px rgba(16,43,78,0.28)",
        header: "0 1px 0 rgba(226,233,237,1), 0 12px 28px -24px rgba(16,43,78,0.35)",
        card: "0 1px 2px rgba(16,43,78,0.03)",
      },
      transitionTimingFunction: {
        smooth: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
      animation: {
        "fade-up": "fadeUp 0.7s cubic-bezier(0.22, 1, 0.36, 1) forwards",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
