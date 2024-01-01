import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import {
	sidebarSections,
	orderingOptions,
	platformOptions,
	SMALL_BREAKPOINT,
} from "../utilities/constants.jsx";
import "../../styles/BrowsingPage.css";
import GameCard from "../../components/GameCard";
import CustomDropDown from "../../components/CustomDropDown";
import SidebarSection from "../../components/SidebarTab";

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
	handleDropDownChange,
}) {
	const [sidebarHidden, setSidebarHidden] = useState(false);
	const navigate = useNavigate();

	useEffect(() => {
		if (useDefault) {
			loadInitialBrowsePage();
		}
	}, []);

	// Handles resizing of our sidebar when coming from below small breakpoint and going above it.
	useEffect(() => {
		function handleResize() {
			const isLargeScreen = window.innerWidth >= SMALL_BREAKPOINT;
			if (isLargeScreen && sidebarHidden) {
				setSidebarHidden(false);
			}
		}
		handleResize();
		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	});

	// On card click, navigate to the slug route (GameDetailsPage)
	const onCardClick = (slug) => {
		navigate(slug);
	};

	return (
		<div className="browsing-page">
			<div className={`browsing-sidebar ${sidebarHidden ? "tw-hidden" : ""}`}>
				{sidebarSections.map((sectionObj, index) => (
					<SidebarSection
						key={`${sectionObj.sectionTitle}-${index}`}
						sectionObj={sectionObj}
						activeTabID={activeTab.id}
						onTabClick={onTabClick}
					/>
				))}
			</div>

			<button
				className="toggle-sidebar-btn"
				onClick={() => setSidebarHidden((state) => !state)}>
				{sidebarHidden ? "Show" : "Hide"}
			</button>

			<main className="browsing-main">
				<header>
					<h1 className="search-title">{activeTab.tabTitle}</h1>
					<div className="drop-downs-container">
						{!activeTab.ignoreOrderDropDown && (
							<CustomDropDown
								dropDownOptions={orderingOptions}
								currentOption={itemOrder}
								setOption={setItemOrder}
								handleDropDownChange={handleDropDownChange}
							/>
						)}
						<CustomDropDown
							dropDownOptions={platformOptions}
							currentOption={platform}
							setOption={setPlatform}
							handleDropDownChange={handleDropDownChange}
						/>
					</div>
				</header>

				{/* 
        + Conditional rendering for games:
        1. If still loading (query still happening), show loading text.
        2. Not loading, but there's been an error, show error text.
        3. Not loading and no errors, but there are no games then we tell the user 
          no games were found.
        4. In this case, some games were found so we render them.
        */}
				{isLoading ? (
					<p>Loading Games...</p>
				) : searchError ? (
					<p>Error fetching Games...</p>
				) : gameList.length === 0 ? (
					<p>Sorry, no games were found. Try changing filters</p>
				) : (
					<div className="card-grid">
						{gameList.map((gameObj) => (
							<GameCard
								key={gameObj.id}
								gameObj={gameObj}
								onCardClick={() => onCardClick(gameObj.slug)}
							/>
						))}
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
	handleDropDownChange: PropTypes.func,
};
