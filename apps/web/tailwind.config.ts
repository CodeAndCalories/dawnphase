// Tailwind v4 — configuration lives in globals.css via @theme.
// This file is kept for IDE tooling and is not loaded at build time.
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
};

export default config;
