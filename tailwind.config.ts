import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./content/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        soil: {
          950: "#080c0a",
          900: "#0b1210",
          800: "#0f1714",
          700: "#141c18",
          600: "#1c2621",
          500: "#2a352e",
        },
        moss: {
          400: "#7c9b7e",
          500: "#5c7d5f",
          600: "#4a6b4f",
          700: "#385239",
        },
        sage: {
          300: "#c3cec1",
          400: "#9baa9c",
          500: "#7c8c7d",
        },
        amber: {
          300: "#e8c084",
          400: "#d6a45a",
          500: "#c9924b",
          600: "#a8763a",
        },
        linen: {
          100: "#f7f3ec",
          200: "#ede8df",
          300: "#ddd5c6",
        },
      },
      fontFamily: {
        serif: ["var(--font-display)", "Georgia", "serif"],
        sans: ["var(--font-body)", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "radial-fade":
          "radial-gradient(60% 60% at 50% 40%, rgba(214, 164, 90, 0.08), transparent 70%)",
      },
      animation: {
        "fade-up": "fadeUp 0.9s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        breathe: "breathe 8s ease-in-out infinite",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        breathe: {
          "0%, 100%": { transform: "scale(1)", opacity: "0.9" },
          "50%": { transform: "scale(1.04)", opacity: "1" },
        },
      },
      letterSpacing: {
        wide2: "0.12em",
      },
    },
  },
  plugins: [],
};

export default config;
