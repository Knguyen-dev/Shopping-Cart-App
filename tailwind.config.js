/** @type {import('tailwindcss').Config} */

export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],

	corePlugins: {
		preflight: false,
	},
	important: "#root",
	theme: {
		// Use mui a lot so we're going to make tailwind breakpoints match mui breakpoints
		// As a result, it's easier to add conditional styles
		screens: {
			xs: "0px",
			sm: "600px",
			md: "900px",
			lg: "1200px",
			xl: "1536px",
		},
	},
	prefix: "tw-",
};
