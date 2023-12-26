import PropTypes from "prop-types";
import { useEffect, useState } from "react";
// import fetchGames from "./utilities/requests";
import {
	FaRegCalendarTimes,
	FaStar,
	FaCrown,
	FaWindows,
	FaPlaystation,
	FaXbox,
	FaApple,
	FaAndroid,
	FaFistRaised,
	FaChess,
	FaMountain,
	FaPuzzlePiece,
	FaCarSide,
	FaFootballBall,
	FaCheck,
} from "react-icons/fa";
import { TbPlayerTrackNext } from "react-icons/tb";
import { GoTrophy } from "react-icons/go";
import { BsGraphUpArrow, BsNintendoSwitch } from "react-icons/bs";
import { LuSwords } from "react-icons/lu";
import { FaGun } from "react-icons/fa6";

import "../styles/BrowsingPage.css";
import GameCard from "./components/GameCard";
// Importing sample game data
import { sampleGameData } from "../assets/sampleData";

function SidebarTab({ tabObj, onClick, isActive }) {
	return (
		<li className={`sidebar-tab ${isActive && "active-tab"}`} onClick={onClick}>
			<div className="sidebar-tab-icon">{tabObj.icon}</div>
			<span className="sidebar-tab-title">{tabObj.tabTitle}</span>
		</li>
	);
}
SidebarTab.propTypes = {
	tabObj: PropTypes.object,
	onClick: PropTypes.func,
	isActive: PropTypes.bool,
};

function SidebarSection({ sectionObj, setActiveTab, activeTabID }) {
	return (
		<section className="sidebar-section">
			<h2 className="sidebar-section-title">{sectionObj.sectionTitle}</h2>
			<ul className="sidebar-tab-list">
				{sectionObj.tabs.map((tabObj, index) => {
					tabObj.id = `${sectionObj.sectionTitle}-${tabObj.tabTitle}-${index}`;

					const isActive = activeTabID === tabObj.id ? true : false;
					return (
						<SidebarTab
							key={index}
							tabObj={tabObj}
							onClick={() => setActiveTab(tabObj)}
							isActive={isActive}
						/>
					);
				})}
			</ul>
		</section>
	);
}
SidebarSection.propTypes = {
	sectionObj: PropTypes.object,
	setActiveTab: PropTypes.func,
	activeTabID: PropTypes.string,
};

/*
- Dealing with search:

1. First I think we should dela with querying with 
  our sidebar tabs and then how sorting would work.
*/

export default function BrowsingPage() {
	/*
  - States:
  1. activeTab: Tab object in form {tabTitle, id, icon}; the id is in form "sectionTitle-tabTitle-index"
  2. itemOrder: Ordering of the cards being displayed on screen
  3. sidebarHidden: State for toggling whether the mobile sidebar is 
    showing or not. Note that on small and larger screens we must 
    make sure the sidebar is showing regardless of the previous state.
  */
	const [activeTab, setActiveTab] = useState("");
	const [itemOrder, setItemOrder] = useState("");
	const [sidebarHidden, setSidebarHidden] = useState(false);

	useEffect(() => {
		/*
  + Effect that sets the default active tab and item ordering,
  - NOTE: We'll deal with both in here, and what cards it renders on first try
  */
		setItemOrder(dropDownOptions[0]);
		setActiveTab(sidebarSections[1].tabs[0]);
	}, []);

	useEffect(() => {
		/*
  + Effect that deals with resizing for the sidebar
  - If, the screen size is small or higher, we should ensure that our 
    sidebar is visible. This is to ensure that even if we hide our 
    sidebar below our small-breakpoint, it will still go back to being
    visible when we go above that breakpoint.
  
  1. Resize window on load.
  2. Then add an event listener that will handle sidebar logic when user 
    resizes the window
  3. Remove that event listener in our cleanup function to prevent duplication
    from our side-effect.
  */
		function handleResize() {
			// Small breakpoint in pixels
			const SMALL_BREAKPOINT = 640;
			const isLargeScreen = window.innerWidth >= SMALL_BREAKPOINT;
			if (isLargeScreen && sidebarHidden) {
				setSidebarHidden(false);
			}
		}
		handleResize();
		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	});

	// Sections and tabs in the sidebar
	const sidebarSections = [
		{
			sectionTitle: "New Games",
			tabs: [
				{
					tabTitle: "Last 30 Days",
					icon: <FaStar />,
				},
				{
					tabTitle: "This Week",
					icon: <FaRegCalendarTimes />,
				},
				{
					tabTitle: "Next Week",
					icon: <TbPlayerTrackNext />,
				},
			],
		},
		{
			sectionTitle: "Top",
			tabs: [
				{
					tabTitle: "Best of the year",
					icon: <GoTrophy />,
				},
				{
					tabTitle: `Popular in ${new Date().getFullYear() - 1}`,
					icon: <BsGraphUpArrow />,
				},
				{
					tabTitle: "All time top",
					icon: <FaCrown />,
				},
			],
		},
		{
			sectionTitle: "Platforms",
			tabs: [
				{
					tabTitle: "PC",
					icon: <FaWindows />,
				},
				{
					tabTitle: "PlayStation",
					icon: <FaPlaystation />,
				},
				{
					tabTitle: "Xbox One",
					icon: <FaXbox />,
				},
				{
					tabTitle: "Nintendo Switch",
					icon: <BsNintendoSwitch />,
				},
				{
					tabTitle: "IOS",
					icon: <FaApple />,
				},
				{
					tabTitle: "Android",
					icon: <FaAndroid />,
				},
			],
		},
		{
			sectionTitle: "Genres",
			tabs: [
				{
					tabTitle: "Action",
					icon: <FaFistRaised />,
				},
				{
					tabTitle: "Strategy",
					icon: <FaChess />,
				},
				{
					tabTitle: "RPG",
					icon: <LuSwords />,
				},
				{
					tabTitle: "Shooter",
					icon: <FaGun />,
				},
				{
					tabTitle: "Adventure",
					icon: <FaMountain />,
				},
				{
					tabTitle: "Puzzle",
					icon: <FaPuzzlePiece />,
				},
				{
					tabTitle: "Racing",
					icon: <FaCarSide />,
				},
				{
					tabTitle: "Sports",
					icon: <FaFootballBall />,
				},
			],
		},
	];

	// Options for the dropdown
	const dropDownOptions = ["Name", "Release date", "Price", "Ratings"];

	return (
		<div className="browsing-page">
			<div className={`browsing-sidebar ${sidebarHidden ? "tw-hidden" : ""}`}>
				{sidebarSections.map((sectionObj, index) => (
					<SidebarSection
						key={index}
						sectionObj={sectionObj}
						setActiveTab={setActiveTab}
						activeTabID={activeTab.id}
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
					<div className="game-drop-down dropdown">
						<button
							className="dropdown-toggle"
							type="button"
							data-bs-toggle="dropdown"
							aria-expanded="false">
							Order By: <strong>{itemOrder}</strong>
						</button>
						<ul className="dropdown-menu">
							{dropDownOptions.map((option, index) => (
								<li key={index}>
									<span
										className="dropdown-item"
										onClick={() => setItemOrder(option)}>
										{option} {itemOrder === option && <FaCheck />}
									</span>
								</li>
							))}
						</ul>
					</div>
				</header>

				<div className="card-grid">
					{sampleGameData.map((gameObj) => (
						<GameCard key={gameObj.id} gameObj={gameObj} />
					))}
				</div>
			</main>
		</div>
	);
}
