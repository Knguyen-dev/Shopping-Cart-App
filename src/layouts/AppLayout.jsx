import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useCartContext } from "../pages/utilities/hooks";
import PropTypes from "prop-types";
import "../styles/AppLayout.css";
import { useAuthContext } from "../pages/ContextProviders/AuthProvider";

function Navbar({ handleSubmitSearch }) {
	const [inputValue, setInputValue] = useState("");
	const navigate = useNavigate();
	const auth = useAuthContext();
	const shoppingCart = useCartContext();

	const handleInputChange = (e) => {
		setInputValue(e.target.value);
	};

	// Handles the submission of the search bar.
	const onSubmit = (e) => {
		e.preventDefault();
		handleSubmitSearch(inputValue);
		navigate("/browse");
	};

	const itemQuantity = shoppingCart.getTotalQuantity();

	return (
		<nav className="tw-flex tw-flex-col tw-items-center tw-gap-4 sm:tw-flex-row sm:tw-gap-x-12">
			{/* Brand or site name */}
			<div className="tw-text-2xl tw-font-medium">
				<NavLink to="/">GamerCity</NavLink>
			</div>

			{/* Search form for games  */}
			<form className="input-group" onSubmit={onSubmit}>
				<input
					type="text"
					className="form-control"
					placeholder="Enter Game Title"
					required
					value={inputValue}
					onChange={handleInputChange}
				/>
				<button
					className="bg-primary tw-rounded-r-md tw-px-5 tw-py-3 tw-font-medium tw-text-white"
					type="submit">
					Search
				</button>
			</form>

			{/* Navlinks */}
			<ul className="tw-flex tw-items-center tw-justify-evenly tw-gap-x-4 tw-gap-y-2 tw-text-xl sm:tw-w-1/5 sm:tw-flex-row ">
				<NavLink to="/browse">Browse</NavLink>
				{/* If authenticated, show "cart" and "user" links, else show "Sign In" link. */}
				{auth.token ? (
					<>
						<button
							onClick={() => navigate("/cart")}
							type="button"
							className="btn btn-primary position-relative tw-font-bold tw-transition-all">
							Cart
							<span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-secondary">
								{itemQuantity > 99 ? "99+" : itemQuantity}
								<span className="visually-hidden">Cart Quantity</span>
							</span>
						</button>
						<NavLink to="account">User</NavLink>
					</>
				) : (
					<NavLink to="/auth/login">Sign In</NavLink>
				)}
			</ul>
		</nav>
	);
}
Navbar.propTypes = {
	handleSubmitSearch: PropTypes.func,
};

export function Footer() {
	return (
		<footer
			id="app-footer"
			className="tw-bg-gray-950 tw-py-2 tw-text-center tw-text-white">
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

export default function AppLayout({ handleSubmitSearch }) {
	return (
		<div id="app-layout">
			<header className="tw-bg-gray-950 tw-px-12 tw-py-6 tw-text-white">
				<Navbar handleSubmitSearch={handleSubmitSearch} />
			</header>
			<main className="tw-relative tw-bg-gray-950 tw-text-white">
				<Outlet />
			</main>
			<Footer />
		</div>
	);
}
AppLayout.propTypes = {
	handleSubmitSearch: PropTypes.func,
};
