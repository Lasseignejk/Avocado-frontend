/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      niveau: ["niveau-grotesk", "sans-serif"],
      niveausmallcaps: ["niveau-grotesk-small-caps", "sans-serif"],
      newspirit: ["new-spirit", "serif"],
    },
    colors: {
      green: "#387f5f",
      blue: "#96d9f7",
      black: "#000000",
      gray: "#efebe4",
    },
    extend: {},
  },
  plugins: [],
};
