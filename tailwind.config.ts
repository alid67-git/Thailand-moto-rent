import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", "Segoe UI", "system-ui", "sans-serif"],
        heading: ["var(--font-heading)", "Segoe UI", "system-ui", "sans-serif"],
      },
      colors: {
        brand: {
          50: "#e8f6fc",
          100: "#c5e8f7",
          200: "#8fd4ef",
          300: "#52bfe7",
          400: "#1aa8db",
          500: "#0077b6",
          600: "#005f92",
          700: "#00476e",
          800: "#002f49",
          900: "#001a2b",
        },
        jungle: {
          50: "#edf7f1",
          100: "#d4edda",
          200: "#a8dbb8",
          300: "#74c69d",
          400: "#52b788",
          500: "#40916c",
          600: "#2d6a4f",
          700: "#1b4332",
          800: "#132f24",
          900: "#0a1b15",
        },
        ink: {
          950: "#041e2e",
          900: "#062a3d",
          800: "#0d3a52",
          700: "#154a66",
          600: "#1e5c7a",
        },
        neutral: {
          50: "#f4f9fb",
          100: "#e8f2f6",
          200: "#d4e4ec",
          300: "#b8cfd9",
          400: "#8fadb8",
          500: "#6b8a96",
          600: "#4d6b76",
          700: "#354f58",
          800: "#22353c",
          900: "#142228",
        },
        gold: {
          400: "#f5bc3c",
          500: "#e8a800",
        },
      },
      boxShadow: {
        "glow-brand": "0 0 60px rgba(0, 119, 182, 0.22)",
        "glow-jungle": "0 0 60px rgba(64, 145, 108, 0.18)",
        "glow-sm": "0 0 20px rgba(0, 119, 182, 0.14)",
        lift: "0 4px 24px rgba(4, 30, 46, 0.08), 0 1px 4px rgba(4, 30, 46, 0.04)",
        "lift-lg": "0 12px 48px rgba(4, 30, 46, 0.14), 0 4px 12px rgba(4, 30, 46, 0.06)",
        "lift-xl": "0 24px 64px rgba(4, 30, 46, 0.18), 0 8px 24px rgba(4, 30, 46, 0.08)",
        inset: "inset 0 1px 0 rgba(255,255,255,0.06)",
      },
      backgroundImage: {
        "grid-ink":
          "linear-gradient(rgba(255,255,255,.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.03) 1px, transparent 1px)",
        "radial-brand":
          "radial-gradient(ellipse at top, rgba(0,119,182,0.2) 0%, transparent 60%)",
        "radial-jungle":
          "radial-gradient(ellipse at bottom left, rgba(64,145,108,0.18) 0%, transparent 55%)",
        "radial-brand-center":
          "radial-gradient(ellipse at center, rgba(0,119,182,0.12) 0%, transparent 70%)",
        "hero-overlay":
          "linear-gradient(to right, rgba(4,30,46,0.94) 0%, rgba(6,42,61,0.78) 50%, rgba(27,67,50,0.35) 100%)",
        "thai-gradient": "linear-gradient(135deg, #0077b6 0%, #40916c 100%)",
      },
      backgroundSize: {
        grid: "40px 40px",
      },
      keyframes: {
        "fade-up": {
          from: { opacity: "0", transform: "translateY(20px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.5s ease-out forwards",
        "fade-in": "fade-in 0.4s ease-out forwards",
      },
    },
  },
  plugins: [],
};

export default config;
