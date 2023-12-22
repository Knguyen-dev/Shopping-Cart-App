import { NavLink, Outlet } from "react-router-dom";

function Navbar() {
	return (
		<nav className="tw-text-center tw-flex tw-flex-col tw-gap-y-3 md:tw-flex-row tw-gap-x-4 tw-items-center tw-py-4 tw-px-5 tw-mx-auto">
			<div className="tw-text-2xl tw-font-medium">
				<NavLink to="/app">GamerCity</NavLink>
			</div>

			<ul className="tw-flex tw-flex-col md:tw-flex-row md:tw-basis-1/5 tw-gap-y-3 tw-text-lg md:tw-justify-evenly">
				<NavLink>Browsing</NavLink>
				<NavLink>Cart</NavLink>
				<NavLink>User</NavLink>
			</ul>

			<form className="search-form">
				<input
					type="text"
					className="form-control"
					placeholder="Enter Game Title"
				/>
				<button type="submit">Search</button>
			</form>
		</nav>
	);
}

function Header() {
	return (
		<header id="app-header" className="tw-bg-emerald-500">
			<Navbar />
		</header>
	);
}

export function Footer() {
	return (
		<footer
			id="app-footer"
			className="tw-bg-emerald-500 tw-text-center tw-py-2">
			<ul className="tw-flex tw-justify-center tw-gap-x-4">
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
		<div className="app-layout">
			<Header />
			<main id="app-main">
				<Outlet />
			</main>
			<Footer />
		</div>
	);
}
