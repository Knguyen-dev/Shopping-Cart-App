import { Outlet } from "react-router-dom";
import AuthProvider from "../pages/ContextProviders/AuthProvider";
import CartProvider from "../pages/ContextProviders/CartProvider";
export default function RootLayout() {
	return (
		<div className="root-layout">
			<AuthProvider>
				<CartProvider>
					<Outlet />
				</CartProvider>
			</AuthProvider>
		</div>
	);
}
