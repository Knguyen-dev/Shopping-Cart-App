import { NavLink } from "react-router-dom";
import "../styles/HomePage.css";

export default function HomePage() {
	return (
		<div className="home-page">
			<div className="tw-my-8">
				<h2 className="tw-mb-4 tw-text-6xl">Welcome to GamerCity</h2>
				<p className="tw-mx-auto tw-mb-4 tw-text-lg sm:tw-w-1/2">
					Discover your favorite games. Not a real shop, but it imitates what a
					ecommerce site for games could look like. Feel free to look around
					though.
				</p>

				<button className="tw-rounded-sm tw-bg-slate-500 tw-px-5 tw-py-2 tw-text-xl tw-text-white">
					<NavLink to="/browse">Shop Now</NavLink>
				</button>
			</div>
		</div>
	);
}
