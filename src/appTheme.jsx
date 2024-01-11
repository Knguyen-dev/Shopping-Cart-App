import { createTheme, responsiveFontSizes } from "@mui/material";
const rootElement = document.getElementById("root");
// Theme style override: For overriding css styles
const appTheme = createTheme({
	components: {
		// This section is for integrating with tailwindcss
		MuiPopover: {
			defaultProps: {
				container: rootElement,
			},
		},
		MuiPopper: {
			defaultProps: {
				container: rootElement,
			},
		},
		MuiDialog: {
			defaultProps: {
				container: rootElement,
			},
		},
		MuiModal: {
			defaultProps: {
				container: rootElement,
			},
		},
	},
	palette: {
		// Current using dark mode, this actually messe up our forms
		// Well need more information on how to do dark and light mode if we want to do this.

		primaryDark: {
			main: "#0f1011",
		},
		secondaryDark: {
			main: "#111827",
		},
	},
});

export const responsiveAppTheme = responsiveFontSizes(appTheme);
