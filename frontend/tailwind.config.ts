import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        saffron: {
          500: "#f97316",
          600: "#ea580c",
        },
      },
      fontFamily: {
        telugu: ["Noto Sans Telugu", "sans-serif"],
        sans: ["DM Sans", "sans-serif"],
      },
      backgroundImage: {
        "grid-pattern": "radial-gradient(circle, var(--tw-gradient-stops) 1px, transparent 1px)",
      }
    },
  },
  plugins: [],
};

export default config;
