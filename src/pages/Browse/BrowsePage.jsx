import { Button, Typography, Box, CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import {
	browseSidebarSections,
	orderingOptions,
	platformOptions,
} from "../utilities/constants.jsx";
import "../../styles/BrowsingPage.css";
import GameCard from "../../components/GameCard";

import CustomDropDown from "../../components/CustomDropDown";
import SidebarSection from "../../components/SidebarSection";
import { useCartContext } from "../ContextProviders/hooks/useCartContext.jsx";
import { useAuthContext } from "../ContextProviders/hooks/useAuthContext.jsx";

export default function BrowsingPage({
	activeTab,
	itemOrder,
	setItemOrder,
	platform,
	setPlatform,
	gameList,
	searchError,
	isLoading,
	useDefault,
	loadInitialBrowsePage,
	onTabClick,
	onDropDownChange,
}) {
	const [sidebarHidden, setSidebarHidden] = useState(false);
	const navigate = useNavigate();
	const auth = useAuthContext();
	const shoppingCart = useCartContext();

	/*
  + Handles when we want apply default settings to the BrowsePage, which 
    will load the BrowsePage in its initial state as a result.

  - Cases where we load initial browse page:
  1. When it's the first time the user is visiting the browse page,
    and they didn't get redirected by our search bar.

  - Cases where we don't load initial browse page:
  1. For every subsequent visit to the browse page really.

  NOTE: So when useDefault changes, we run this effect. This 
    helps prevent the issue of updating the App component while 
    rendering our BrowsePage (caused by handleSubmitSearch). So when
    useDefault changes and we're redirected to BrowsePage, we defer
    the execution of this function until after BrowsePage is done. 
    So any state changes as a result of loadInitialBrowsePage will be 
    done after BrowsePage is done rendering. 
  */
	useEffect(() => {
		if (useDefault) {
			loadInitialBrowsePage();
		}
	}, [useDefault, loadInitialBrowsePage]);

	// On card click, navigate to the slug route (GameDetailsPage)
	const onCardClick = (slug) => {
		navigate(slug);
	};

	return (
		<div className="browsing-page">
			{/* Mobile sidebar/menu: Automatically hidden for small breakpoint and beyond.
        So sidebarHidden only controls whether it's rendered while the user is below that point.
      
        NOTE: We use the sidebar section to render two sidebars, one for extra small screens
          and the other sidebar for larger screens. While you could combine the styles into 
          one so that you don't have to do browserSidebarSections.map() twice, I found it a lot
          cleaner and more maintainable if we had two. */}

			{!sidebarHidden && (
				<div
					className="tw-fixed tw-inset-0 tw-z-10 tw-grid tw-overflow-y-scroll tw-bg-inherit tw-p-2 sm:tw-hidden"
					style={{
						"grid-template-columns": "repeat(auto-fill, minmax(150px, 1fr))",
					}}>
					{browseSidebarSections.map((sectionObj, index) => (
						<SidebarSection
							key={`${sectionObj.sectionTitle}-${index}`}
							sectionObj={sectionObj}
							activeTabID={activeTab.id}
							onTabClick={onTabClick}
						/>
					))}
				</div>
			)}

			{/* Sidebar only visible on small or higher screens*/}
			<div className="tw-gap-y-2 tw-px-2 xs:max-sm:tw-hidden sm:tw-sticky sm:-tw-top-0 sm:tw-flex sm:tw-h-screen sm:tw-flex-col">
				{browseSidebarSections.map((sectionObj, index) => (
					<SidebarSection
						key={`${sectionObj.sectionTitle}-${index}`}
						sectionObj={sectionObj}
						activeTabID={activeTab.id}
						onTabClick={onTabClick}
					/>
				))}
			</div>

			{/* Toggle sidebar button for mobile screens */}
			<Button
				variant="contained"
				className="tw-fixed tw-bottom-5 tw-right-5 tw-z-20 sm:tw-hidden"
				onClick={() => setSidebarHidden((state) => !state)}>
				{sidebarHidden ? "Show" : "Hide"}
			</Button>
			{/* Main section for the browsing page that has drop downs and game cards  */}
			<main className="browsing-main tw-px-4 tw-text-white">
				{/* Header with the the  drop downs and tab title*/}
				<header className="tw-mb-2">
					<Typography variant="h4" className="tw-mb-2">
						{activeTab.tabTitle}
					</Typography>
					<Box className="tw-flex tw-flex-col tw-gap-2 sm:tw-flex-row">
						{!activeTab.ignoreOrderDropDown && (
							<CustomDropDown
								dropDownOptions={orderingOptions}
								currentOption={itemOrder}
								setOption={setItemOrder}
								onDropDownChange={onDropDownChange}
							/>
						)}
						<CustomDropDown
							dropDownOptions={platformOptions}
							currentOption={platform}
							setOption={setPlatform}
							onDropDownChange={onDropDownChange}
						/>
					</Box>
				</header>

				{/* 
        + Conditional rendering for game cards:
        1. If still loading (query still happening), show loading text.
        2. Not loading, but there's been an error, show error text.
        3. Not loading and no errors, but there are no games then we tell the user 
          no games were found.
        4. In this case, some games were found so we render them.
        */}
				{isLoading ? (
					<div className="tw-flex tw-h-full tw-items-center tw-justify-center">
						<CircularProgress />
					</div>
				) : searchError ? (
					<div className="tw-flex tw-h-full tw-flex-col tw-items-center tw-justify-center tw-text-3xl">
						<p>Error Fetching Games!</p>
					</div>
				) : gameList.length === 0 ? (
					<div className="tw-flex tw-h-full tw-flex-col tw-items-center tw-justify-center tw-text-3xl">
						<p>Sorry, no games were found. Try changing filters</p>
					</div>
				) : (
					<div className="card-grid">
						{gameList.map((gameObj) => {
							return (
								<GameCard
									key={gameObj.id}
									gameObj={gameObj}
									onCardClick={() => onCardClick(gameObj.slug)}
									shoppingCartClick={() => {
										if (!auth.token) {
											navigate("/auth/login", {
												state: { from: location.pathname },
											});
										} else {
											shoppingCart.handleCartClick(gameObj);
										}
									}}
									isInCart={shoppingCart.isInCart(gameObj.id)}
								/>
							);
						})}
					</div>
				)}
			</main>
		</div>
	);
}

BrowsingPage.propTypes = {
	activeTab: PropTypes.object,
	itemOrder: PropTypes.object,
	setItemOrder: PropTypes.func,
	platform: PropTypes.object,
	setPlatform: PropTypes.func,
	gameList: PropTypes.array,
	searchError: PropTypes.bool,
	isLoading: PropTypes.bool,
	useDefault: PropTypes.bool,
	loadInitialBrowsePage: PropTypes.func,
	onTabClick: PropTypes.func,
	onDropDownChange: PropTypes.func,
	cartItems: PropTypes.array,
};
