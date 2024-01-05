/** @type {import('tailwindcss').Config} */

export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	darkMode: "class",
	theme: {
		extend: {
			colors: {
				"black-10": "rgba(0, 0, 0, 0.1)",
			},
		},
	},
	prefix: "tw-",
};
