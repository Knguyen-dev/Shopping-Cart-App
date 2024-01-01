import { NavLink, Outlet, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { useState } from "react";
import "../styles/AppLayout.css";

/*
  + Handles submission for search parameter for a game title.
  1. Indicate we aren't using the default settings.
  2. Then set our settings for how this is going to work. 


  - Still need to add the value of the input in hadnelSubmitSearch


BOOK MARK: Still need to work on the search bar functionality 


  */

function Navbar({ handleSubmitSearch }) {
	const navigate = useNavigate();

	const [inputValue, setInputValue] = useState("");

	const handleInputChange = (e) => {
		setInputValue(e.target.value);
	};

	return (
		<nav className="tw-flex tw-flex-col tw-items-center tw-gap-4 sm:tw-flex-row sm:tw-gap-x-12">
			<div className="tw-text-2xl tw-font-medium">
				<NavLink to="/">GamerCity</NavLink>
			</div>

			<form
				className="input-group"
				onSubmit={() => {
					handleSubmitSearch();
					navigate("/browse");
				}}>
				<input
					type="text"
					className="form-control"
					placeholder="Enter Game Title"
					required
					value={inputValue}
					onChange={handleInputChange}
				/>
				<button
					className="tw-rounded-r-md tw-bg-sky-700 tw-px-5 tw-py-3 tw-font-medium tw-text-white"
					type="submit">
					Search
				</button>
			</form>

			<ul className="tw-flex tw-items-center tw-justify-evenly tw-gap-x-4 tw-gap-y-2 tw-text-xl sm:tw-w-1/5 sm:tw-flex-row ">
				<NavLink to="/browse">Browse</NavLink>
				<NavLink>Cart</NavLink>
				<NavLink>User</NavLink>
			</ul>
		</nav>
	);
}
Navbar.propTypes = {
	handleSubmitSearch: PropTypes.func,
};

export function Footer() {
	return (
		<footer id="app-footer" className="tw-py-2 tw-text-center tw-text-white">
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
			<header id="app-header" className="tw-px-12 tw-py-6 tw-text-white">
				<Navbar handleSubmitSearch={handleSubmitSearch} />
			</header>
			<main
				id="app-main"
				className="tw-relative tw-bg-neutral-900 tw-text-white">
				<Outlet />
			</main>
			<Footer />
		</div>
	);
}
AppLayout.propTypes = {
	handleSubmitSearch: PropTypes.func,
};
