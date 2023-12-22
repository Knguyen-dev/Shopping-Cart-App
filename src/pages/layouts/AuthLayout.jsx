import { Footer } from "./AppLayout";
import { Outlet } from "react-router";
import "../../styles/AuthLayout.css";

export default function AuthLayout() {
	return (
		<div className="tw-flex tw-flex-col tw-gap-y-10 tw-min-h-screen">
			<main className="tw-text-center tw-gap-y-6 md:tw-gap-x-20 tw-flex tw-flex-col tw-flex-auto tw-justify-center tw-items-center md:tw-flex-row">
				<div className="">
					<h1 className="tw-text-5xl tw-mb-2">GamerCity</h1>
					<p>Connect with gamers around the world!</p>
				</div>
				<Outlet />
			</main>

			<Footer />
		</div>
	);
}
