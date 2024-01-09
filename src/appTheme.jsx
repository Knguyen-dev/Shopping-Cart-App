import { createTheme } from "@mui/material";

const rootElement = document.getElementById("root");
// Theme style override: For overriding css styles
export const appTheme = createTheme({
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
});
