import { Footer } from "./AppLayout";
import { Outlet } from "react-router";

export default function AuthLayout() {
	return (
		<div className="auth-layout">
			<main className="tw-p-3">
				<div className="site-info">
					<h1>GamerCity</h1>
					<p>Connect with gamers around the world!</p>
				</div>
				<Outlet />
			</main>

			<Footer />
		</div>
	);
}
