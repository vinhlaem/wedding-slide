import type { Config } from "tailwindcss";

const config: Config = {
  // Ensure Tailwind scans the Next.js `app/` directory and other source files
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        bubble: {
          "0%": { transform: "translateY(0)", opacity: "0" },
          "50%": { opacity: "1" },
          "100%": { transform: "translateY(-120vh)", opacity: "0" },
        },
        kenburns: {
          "0%": { transform: "scale(1) translateY(0)", opacity: "1" },
          "100%": { transform: "scale(1.06) translateY(-4%)", opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(30%) scale(1)", opacity: "0" },
          "30%": { opacity: "1" },
          "100%": { transform: "translateY(0) scale(1.04)", opacity: "1" },
        },
        slideDown: {
          "0%": { transform: "translateY(-30%) scale(1)", opacity: "0" },
          "30%": { opacity: "1" },
          "100%": { transform: "translateY(0) scale(1.04)", opacity: "1" },
        },
        cinematicFade: {
          "0%": { opacity: "0" },
          "10%": { opacity: "1" },
          "90%": { opacity: "1" },
          "100%": { opacity: "0" },
        },
      },
      animation: {
        bubble: "bubble 6s linear infinite",
        kenburns: "kenburns 8s ease-in-out forwards",
        slideUp: "slideUp 6s ease-in-out forwards",
        slideDown: "slideDown 6s ease-in-out forwards",
        cinematicFade: "cinematicFade 1s ease-in-out forwards",
      },
    },
  },
  plugins: [],
};

export default config;
