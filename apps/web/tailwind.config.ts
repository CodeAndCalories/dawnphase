import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#fdf4ff",
          100: "#fae8ff",
          200: "#f5d0fe",
          300: "#f0abfc",
          400: "#e879f9",
          500: "#d946ef",
          600: "#c026d3",
          700: "#a21caf",
          800: "#86198f",
          900: "#701a75",
          950: "#4a044e",
        },
        dawn: {
          rose: "#f43f5e",
          peach: "#fb923c",
          gold: "#fbbf24",
          lavender: "#a78bfa",
          mauve: "#c084fc",
        },
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "monospace"],
      },
      backgroundImage: {
        "dawn-gradient":
          "linear-gradient(135deg, #fdf4ff 0%, #fce7f3 40%, #fff7ed 100%)",
        "dawn-hero":
          "linear-gradient(135deg, #4a044e 0%, #7c3aed 50%, #db2777 100%)",
      },
    },
  },
  plugins: [],
};

export default config;
