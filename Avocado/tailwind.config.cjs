/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      niveau: ["niveau-grotesk", "sans-serif"],
      niveausmallcaps: ["niveau-grotesk-small-caps", "sans-serif"],
      newspirit: ["new-spirit", "serif"],
    },
    extend: {},
  },
  plugins: [],
};
