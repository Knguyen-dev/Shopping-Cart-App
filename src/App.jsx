import {
	RouterProvider,
	createBrowserRouter,
	Route,
	createRoutesFromElements,
} from "react-router-dom";

// Layouts
import AppLayout from "./layouts/AppLayout";
import AuthLayout from "./layouts/AuthLayout";
// Pages
import LoginPage from "./pages/Auth/LoginPage";
import RegisterPage from "./pages/Auth/RegisterPage";
import HomePage from "./pages/HomePage";
import BrowsingPage from "./pages/Browse/BrowsePage";
import GameDetailsPage from "./pages/Browse/GameDetailsPage";
import NotFoundPage from "./pages/NotFoundPage";

import "./App.css";
const appRouter = createBrowserRouter(
	createRoutesFromElements(
		<Route path="/">
			<Route path="" element={<AppLayout />}>
				<Route index element={<HomePage />} />

				<Route path="browse">
					<Route index element={<BrowsingPage />} />

					<Route path=":slug" element={<GameDetailsPage />} />
				</Route>
			</Route>
			<Route path="auth" element={<AuthLayout />}>
				<Route path="login" element={<LoginPage />} />
				<Route path="register" element={<RegisterPage />} />
			</Route>

			<Route path="*" element={<NotFoundPage />} />
		</Route>
	)
);

export default function App() {
	return <RouterProvider router={appRouter} />;
}
