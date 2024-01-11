import { Outlet, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Link, Button, Grid, Badge, Box } from "@mui/material";

import BasicSearchBar from "../components/common/BasicSearchBar/BasicSearchBar";
import MobileMenu from "../components/common/MobileMenu.jsx/MobileMenu";

import PropTypes from "prop-types";
import "../styles/AppLayout.css";
import { useAuthContext } from "../pages/ContextProviders/hooks/useAuthContext";
import { useCartContext } from "../pages/ContextProviders/hooks/useCartContext";
// Navbar component for our app

function Navbar({ handleSubmitSearch }) {
	const [inputValue, setInputValue] = useState("");
	const navigate = useNavigate();
	const auth = useAuthContext();
	const shoppingCart = useCartContext();

	// Updates input value of search bar
	const handleInputChange = (e) => {
		setInputValue(e.target.value);
	};

	// Handles the submission of the search bar.
	const onSubmit = (e) => {
		e.preventDefault();
		handleSubmitSearch(inputValue);
		navigate("/browse");
	};

	// Links for the mobile menu
	const menuLinks = [
		{
			id: 1,
			content: "Browse",
			route: "/browse",
		},
		{
			id: 2,
			content: "Cart",
			route: `${auth.token ? "/cart" : "/auth/login"}`,
		},
		{
			id: 3,
			content: `${auth.token ? "User" : "Sign In"}`,
			route: `${auth.token ? "/account" : "/auth/login"}`,
		},
	];

	// Get amount of items in our cart. Could be zero if user isn't authed or if nothing in cart.
	const itemQuantity = shoppingCart.getTotalQuantity();

	return (
		//Flexbox nav "tw-flex tw-flex-col tw-items-center tw-gap-4 sm:tw-flex-row">
		<Grid container spacing={2} className="tw-items-center tw-justify-center">
			{/* Brand or site name */}
			<Grid
				item
				xs={8}
				md={2}
				className="tw-text-2xl tw-font-medium xs:max-md:tw-text-center">
				<Link
					component="button"
					className="tw-text-white"
					underline="hover"
					onClick={() => navigate("/")}>
					GamerCity
				</Link>
			</Grid>

			{/* Search bar for games  */}
			<Grid item xs={10} md={7}>
				<form
					className="tw-flex  tw-overflow-hidden tw-rounded-md"
					onSubmit={onSubmit}>
					<BasicSearchBar
						className="tw-bg-gray-800 tw-py-2 tw-transition-all hover:tw-bg-gray-700"
						placeholder="Search..."
						value={inputValue}
						onChange={handleInputChange}
						required
					/>
					<Button variant="contained" className="tw-rounded-none" type="submit">
						Search
					</Button>
				</form>
			</Grid>

			{/* Mobile Menu, shown on (0 to small) and hidden on (small and up) */}
			<Grid
				item
				xs={5}
				className="tw-justify-center tw-self-center xs:max-sm:tw-flex sm:tw-hidden">
				<MobileMenu menuLinks={menuLinks} />
			</Grid>

			{/* Navbar links that will appear on grid on small and beyond sizes (hidden from 0 to small) */}
			<Grid item xs={10} md={3} className="xs:max-sm:tw-hidden">
				<Box className="tw-flex tw-justify-center tw-gap-x-4 md:tw-justify-end">
					<Button variant="outlined" onClick={() => navigate("/browse")}>
						Browse
					</Button>

					{/* If authenticated, show "cart" and "user" links, else show "Sign In" link. */}
					{auth.token ? (
						<>
							<Badge
								color="primary"
								showZero
								badgeContent={itemQuantity > 99 ? "99+" : itemQuantity}>
								<Button variant="outlined" onClick={() => navigate("/cart")}>
									Cart
								</Button>
							</Badge>

							<Button variant="outlined" onClick={() => navigate("/account")}>
								User
							</Button>
						</>
					) : (
						<>
							<Button
								variant="outlined"
								onClick={() => navigate("/auth/login")}>
								Sign In
							</Button>
						</>
					)}
				</Box>
			</Grid>
		</Grid>
	);
}
Navbar.propTypes = {
	handleSubmitSearch: PropTypes.func,
};

// Footer of our App
export function Footer() {
	const linksArr = [
		{
			id: 1,
			label: "Github",
			href: "https://github.com/Knguyen-dev/Shopping-Cart-App.git",
		},
		{
			id: 2,
			label: "Rawg Api",
			href: "https://rawg.io/apidocs",
		},
	];

	return (
		<footer className="tw-bg-gray-950 tw-py-2 tw-text-center tw-text-white">
			<ul className="tw-flex tw-flex-col tw-justify-center tw-gap-x-4 sm:tw-flex-row">
				{linksArr.map((linkObj) => (
					<li key={linkObj.id}>
						<a href={linkObj.href} target="_blank" rel="noreferrer">
							{linkObj.label}
						</a>
					</li>
				))}
			</ul>
			<span>Knguyen {new Date().getFullYear()}</span>
		</footer>
	);
}

export default function AppLayout({ handleSubmitSearch }) {
	return (
		<div id="app-layout">
			<header className="tw-bg-gray-950 tw-px-6 tw-py-6 tw-text-white">
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
