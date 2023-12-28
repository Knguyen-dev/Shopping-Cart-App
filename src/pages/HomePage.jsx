import { NavLink } from "react-router-dom";
import "../styles/HomePage.css";
export default function HomePage() {
	return (
		<div className="home-page">
			<div className="home-page-header">
				<h2 className="tw-text-4xl">Welcome to GamerCity</h2>
				<p className="tw-text-md tw-mx-auto tw-w-full ">
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
