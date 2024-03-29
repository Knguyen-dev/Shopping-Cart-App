import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { responsiveAppTheme } from "./appTheme.jsx";
// import { CssBaseline } from "@mui/material";

import { StyledEngineProvider, ThemeProvider } from "@mui/material/styles";
ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<StyledEngineProvider injectFirst>
			<ThemeProvider theme={responsiveAppTheme}>
				<App />
			</ThemeProvider>
		</StyledEngineProvider>
	</React.StrictMode>
);
