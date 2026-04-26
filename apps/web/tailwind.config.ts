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
        cream:    "#FDF6F0",
        rose:     "#E8637A",
        peach:    "#F4956A",
        deeprose: "#C94B6D",
        taupe:    "#8C6B5A",
      },
    },
  },
};

export default config;
