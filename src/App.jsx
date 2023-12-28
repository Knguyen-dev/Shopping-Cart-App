import {
	RouterProvider,
	createBrowserRouter,
	Route,
	createRoutesFromElements,
} from "react-router-dom";

// Layouts
import AppLayout from "./pages/layouts/AppLayout";
import AuthLayout from "./pages/layouts/AuthLayout";
// Pages
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import HomePage from "./pages/HomePage";
import BrowsingPage from "./pages/BrowsePage";

import "./App.css";
const appRouter = createBrowserRouter(
	createRoutesFromElements(
		<Route path="/">
			<Route path="" element={<AppLayout />}>
				<Route index element={<HomePage />} />

				<Route path="browse" element={<BrowsingPage />} />
			</Route>
			<Route path="auth" element={<AuthLayout />}>
				<Route path="login" element={<LoginPage />} />
				<Route path="register" element={<RegisterPage />} />
			</Route>
		</Route>
	)
);

export default function App() {
	return <RouterProvider router={appRouter} />;
}
