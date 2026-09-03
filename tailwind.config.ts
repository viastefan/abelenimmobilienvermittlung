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
        background: "#F8F6F2",
        surface: "#FFFFFF",
        "surface-soft": "#F1EEE8",
        text: {
          DEFAULT: "#1F211F",
          muted: "#5F625C",
        },
        border: {
          DEFAULT: "#DEDAD2",
        },
        accent: {
          DEFAULT: "#8D6F52",
          dark: "#6F5740",
          light: "#B79E85",
        },
        ink: "#15160F",
        success: {
          DEFAULT: "#4B6350",
          soft: "#E4EBE2",
        },
        warning: {
          DEFAULT: "#96591F",
          soft: "#F3E7D6",
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
