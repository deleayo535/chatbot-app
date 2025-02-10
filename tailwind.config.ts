import type { Config } from "tailwindcss";

export default {
  content: [
    "./app/src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [],
} satisfies Config;
