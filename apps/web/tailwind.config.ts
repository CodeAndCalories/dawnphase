// Tailwind v4 — configuration lives in globals.css via @theme.
// This file is kept for IDE tooling only and is not loaded at build time.
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream:    "#f4e6f0",
        rose:     "#c94f68",
        peach:    "#e06e40",
        deeprose: "#140c18",
        taupe:    "#3d2855",
      },
    },
  },
};

export default config;
