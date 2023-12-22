import { NavLink, Outlet } from "react-router-dom";

function Navbar() {
	return (
		<nav className="header-nav-links">
			<div className="site-brand-container">
				<h1>GamerCity</h1>
			</div>

			<form className="search-form">
				<input
					type="text"
					className="form-control"
					placeholder="Enter Game Title"
				/>
				<button type="submit">Search</button>
			</form>

			<ul className="nav-links">
				<NavLink>Browsing</NavLink>
				<NavLink>Cart</NavLink>
				<NavLink>User</NavLink>
			</ul>
		</nav>
	);
}

function Header() {
	return (
		<header id="app-header">
			<Navbar />
		</header>
	);
}

export function Footer() {
	return (
		<footer id="app-footer">
			<ul className="footer-nav-links">
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
			<main>
				<Outlet />
			</main>

			<Footer />
		</div>
	);
}
