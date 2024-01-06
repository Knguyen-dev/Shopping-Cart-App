import { Footer } from "./AppLayout";
import { Outlet } from "react-router";
import "../styles/AuthLayout.css";

// Layout for the auth section for our website.
export default function AuthLayout() {
	return (
		<div className="tw-flex tw-min-h-screen tw-flex-col">
			<main className="tw-flex tw-flex-auto tw-flex-col tw-items-center tw-justify-center tw-gap-y-6 tw-py-10 tw-text-center md:tw-flex-row md:tw-gap-x-20">
				<div className="">
					<h1 className="tw-mb-2 tw-text-5xl">GamerCity</h1>
					<p>Connect with gamers around the world!</p>
				</div>
				<Outlet />
			</main>
			<Footer />
		</div>
	);
}
