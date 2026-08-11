/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  theme: {
    extend: {
      colors: {
        ink: {
          950: "#0c0e10",
          900: "#101214",
          800: "#181b1e",
          700: "#23272b",
          600: "#33383d",
        },
        paper: {
          100: "#faf7ef",
          200: "#f3ecda",
          DEFAULT: "#f3ecda",
        },
        forest: {
          900: "#122a1f",
          700: "#1b3a2b",
          500: "#2a5940",
        },
        brass: {
          400: "#c9a668",
          500: "#b08d57",
          600: "#8f7143",
        },
      },
      fontFamily: {
        display: ["Fraunces", "serif"],
        sans: ["Inter", "sans-serif"],
        mono: ["IBM Plex Mono", "monospace"],
      },
      backgroundImage: {
        "ledger-lines":
          "repeating-linear-gradient(to bottom, transparent, transparent 27px, rgba(176,141,87,0.16) 28px)",
      },
    },
  },
  plugins: [],
};
