import { NavLink, Outlet } from "react-router-dom";
import "../../styles/AppLayout.css";
function Navbar() {
	return (
		<nav className="tw-flex tw-flex-col tw-items-center tw-gap-4 sm:tw-flex-row sm:tw-gap-x-12">
			<div className="tw-text-2xl tw-font-medium">
				<NavLink to="/app">GamerCity</NavLink>
			</div>

			<form className="search-form">
				<input
					type="text"
					className="form-control"
					placeholder="Enter Game Title"
				/>
				<button
					className="tw-rounded-r-md tw-bg-sky-700 tw-px-5 tw-py-3 tw-font-medium tw-text-white"
					type="submit">
					Search
				</button>
			</form>

			<ul className="tw-flex tw-flex-col tw-items-center tw-justify-evenly tw-gap-x-4 tw-gap-y-2 tw-text-xl sm:tw-w-1/5 sm:tw-flex-row ">
				<NavLink>Browsing</NavLink>
				<NavLink>Cart</NavLink>
				<NavLink>User</NavLink>
			</ul>
		</nav>
	);
}

function Header() {
	return (
		<header
			id="app-header"
			className="tw-bg-blue-900 tw-px-12 tw-py-6 tw-text-white">
			<Navbar />
		</header>
	);
}

export function Footer() {
	return (
		<footer
			id="app-footer"
			className=" tw-bg-blue-900 tw-py-2 tw-text-center tw-text-white">
			<ul className="tw-flex tw-flex-col tw-justify-center tw-gap-x-4 sm:tw-flex-row">
				<li>
					<a href="#">Github</a>
				</li>
				<li>
					<a href="#">Rawg API</a>
				</li>
			</ul>
			<span>Knguyen {new Date().getFullYear()}</span>
		</footer>
	);
}

export default function AppLayout() {
	return (
		<div className="tw-flex tw-min-h-screen tw-flex-col ">
			<Header />
			<main id="app-main" className="">
				<Outlet />
			</main>
			<Footer />
		</div>
	);
}