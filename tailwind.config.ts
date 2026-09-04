import type { Config } from "tailwindcss";

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
        "surface-soft": "#F4F8F7",
        text: {
          DEFAULT: "#16242C",
          muted: "#5B6B72",
        },
        border: {
          DEFAULT: "#E1E8E7",
        },
        accent: {
          DEFAULT: "#1E9C81",
          dark: "#157A64",
          light: "#5CC2A9",
          soft: "#E3F5F0",
        },
        ink: "#0E2C3B",
        "ink-soft": "#173D50",
        success: {
          DEFAULT: "#1E9C81",
          soft: "#E3F5F0",
        },
        warning: {
          DEFAULT: "#B4611C",
          soft: "#F6E9D9",
        },
      },
      fontFamily: {
        display: ["var(--font-manrope)", "sans-serif"],
        sans: ["var(--font-inter)", "sans-serif"],
      },
      fontSize: {
        "display-xl": ["clamp(2.75rem, 6vw, 5.5rem)", { lineHeight: "1.02", letterSpacing: "-0.02em" }],
        "display-lg": ["clamp(2.25rem, 4.5vw, 4rem)", { lineHeight: "1.05", letterSpacing: "-0.02em" }],
        "display-md": ["clamp(1.875rem, 3vw, 2.75rem)", { lineHeight: "1.1", letterSpacing: "-0.01em" }],
      },
      maxWidth: {
        content: "88rem",
      },
      borderRadius: {
        sm: "4px",
        DEFAULT: "6px",
        md: "8px",
        lg: "14px",
        xl: "20px",
      },
      boxShadow: {
        soft: "0 1px 2px rgba(31,33,31,0.04), 0 8px 24px -12px rgba(31,33,31,0.08)",
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
