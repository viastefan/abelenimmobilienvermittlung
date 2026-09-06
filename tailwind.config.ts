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
        "surface-mist": "#F4F9FB",
        text: {
          DEFAULT: "#19324D",
          muted: "#687789",
          subtle: "#8A97A6",
        },
        border: {
          DEFAULT: "#E2E9ED",
          strong: "#CFDBE2",
        },
        accent: {
          // Brand turquoise. Decorative use: logo, icons, rules, hover states.
          DEFAULT: "#65C6C7",
          light: "#A5DEDF",
          mid: "#3FAEB0",
          // Interactive turquoise — passes AA on white for text and buttons.
          deep: "#1B7A7D",
          dark: "#146366",
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
        warning: {
          DEFAULT: "#B4611C",
          soft: "#F6E9D9",
        },
      },
      fontFamily: {
        display: ["var(--font-manrope)", "system-ui", "sans-serif"],
        sans: ["var(--font-manrope)", "system-ui", "sans-serif"],
      },
      fontSize: {
        "display-xl": ["clamp(2.25rem, 4.1vw, 3.5rem)", { lineHeight: "1.08", letterSpacing: "-0.028em" }],
        "display-lg": ["clamp(1.875rem, 2.9vw, 2.625rem)", { lineHeight: "1.14", letterSpacing: "-0.024em" }],
        "display-md": ["clamp(1.5rem, 2vw, 1.9375rem)", { lineHeight: "1.2", letterSpacing: "-0.018em" }],
        "display-sm": ["clamp(1.1875rem, 1.4vw, 1.375rem)", { lineHeight: "1.3", letterSpacing: "-0.01em" }],
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
