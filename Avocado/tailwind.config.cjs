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
			dkgreen: "#145a3c",
			dkgray: "#d2d2c8",
			ltgray: "#fffbf7",
			overlay: "rgba(0, 0, 0, 0.4)",
		},
		screens: {
			sm: "480px",
			md: "768px",
			lg: "976px",
			xl: "1440px",
		},
		extend: {},
	},
	plugins: [],
};
