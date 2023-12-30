import { useEffect, useState } from "react";
import {
	FaRegCalendarTimes,
	FaStar,
	FaCrown,
	FaFistRaised,
	FaChess,
	FaMountain,
	FaPuzzlePiece,
	FaCarSide,
	FaFootballBall,
} from "react-icons/fa";
import { TbPlayerTrackNext } from "react-icons/tb";
import { GoTrophy } from "react-icons/go";
import { BsGraphUpArrow } from "react-icons/bs";
import { LuSwords } from "react-icons/lu";
import { FaGun } from "react-icons/fa6";
import "../../styles/BrowsingPage.css";

import { createDateModule } from "../utilities/utilities";
import GameCard from "../../components/GameCard";
import CustomDropDown from "../../components/CustomDropDown";
import SidebarSection from "../../components/SidebarTab";
import { PLATFORM_IDS, GENRE_IDS, fetchGames } from "../utilities/requests";

// Initialize dateModule so some of our date reliant tabs can use it
const dateModule = createDateModule();

export default function BrowsingPage() {
	/*
  - States:
  1. activeTab: Tab object in form {tabTitle, id, icon}; the id is in form "sectionTitle-tabTitle-index"
    State is used for indicating which tab is being used
  2. itemOrder: A given object in orderingOptions.options that dictates the ordering of the game cards that we fetch.
  3. platform: A given object in platformOptions.options that lets us fetch for games that are available
    on a certain platform.
  4. sidebarHidden: State for toggling whether the mobile sidebar is 
    showing or not. Note that on small and larger screens we must 
    make sure the sidebar is showing regardless of the previous state.
  5. gameList: An array of objects that contain data for a video game. We use this 
    to render those games as cards.
  6. searchParams: An object used to track what parameters are being set for our fetch request. 
    This is needed so that we can remember what we searched for, and it allows functionality
    such as our drop downs to work properly as we need to know what the user was looking for 
    first in order to know how we can do things such as ordering their results or filtering them.
  */
	const [activeTab, setActiveTab] = useState("");
	const [itemOrder, setItemOrder] = useState({});
	const [platform, setPlatform] = useState({});
	const [sidebarHidden, setSidebarHidden] = useState(false);
	const [gameList, setGameList] = useState([]);
	const [searchParams, setSearchParams] = useState({});
	const [searchError, setSearchError] = useState(false);
	const [isLoading, setIsLoading] = useState(true);

	/*
  + Effect that sets the default active tab and item ordering,
  - Setting up visual indicators
  1. Let's define our default item order, tab, and platform.
  2. Now to we set the states so that we visually indicate the current values
    on our sidebar and on our drop downs.
  - Fetching data correctly: 
  1. Settings the states on itemOrder, platform, and activeTab here will only change
    the page visually and not effect the results of our handleSearch call. The
    handle search call is solely reliant on what was passed in here.
  2. If the default drop down values are 'All' or 'None' for your platforms and ordering
    drop downs, don't include them as search params in your handleSearch call because 
    their values will be null. In any case, when your platform's search params isn't null
    you can include them for any tab as any tab will be able to use the 'platform' drop down.
    And for the ordering drop down, you can't include it's params when the default 
    tab is 'Top' since their parameters for 'ordering' will conflict and remove
    whatever ordering parameter you set for the tabs in top.
  */
	useEffect(() => {
		const defaultTab = sidebarSections[1].tabs[0];
		const defaultItemOrder = orderingOptions.options[0];
		const defaultPlatform = platformOptions.options[0];
		setItemOrder(defaultItemOrder);
		setPlatform(defaultPlatform);
		setActiveTab(defaultTab);
		handleSearch({
			...defaultTab.searchParams,
		});
	}, []);

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
	useEffect(() => {
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

	/*
  + Function that searches for games, and sets the list of games. Should 
    be used by search bar, tabs, and the drop down filter.

  - Parameters:
  1. newSearchParams: A new map of search parameters that are going to 
    be used to fetch game data.

  - Logic:
  1. Set loading state to true to indicate that we're currently querying.
  2. Fetch and store result (a list of game objects in an array). 
  3. At this point it's a successful fetch, so if searchError was true due to a previous failure, 
    set it to false now.
  4. Record the search parameter used so that we will be able to use it in other 
    places such as our tabs and drop downs.
  5. Finally set the list of games to that array, so it can be rendered.  
  */
	const handleSearch = async (newSearchParams) => {
		setIsLoading(true);
		try {
			const gameList = await fetchGames(newSearchParams);
			if (searchError) {
				setSearchError(false);
			}
			setIsLoading(false);
			setSearchParams(newSearchParams);
			setGameList(gameList);
		} catch (error) {
			setSearchError(true);
		}
	};

	/*
  + Function for clicking a sidebar tab
  1. Start parameters off with parameters defined in sidebar
  2. Add parameter set by 'platform' drop down
  3. If the order drop down isn't ignored, add its parameter as well
  4. Set our active tab and do a fetch for the games
  */
	const onTabClick = (tabObj) => {
		let newSearchParams = { ...tabObj.searchParams };
		const dropDownParams = {
			...platform.searchParams,
			...itemOrder.searchParams,
		};
		for (const param in dropDownParams) {
			if (dropDownParams[param]) {
				newSearchParams[param] = dropDownParams[param];
			} else {
				delete newSearchParams[param];
			}
		}
		setActiveTab(tabObj);
		handleSearch(newSearchParams);
	};

	/*
  + Function for clicking a drop down item
  1. Let our current search parameters be the foundation of the new query
  2. For every parameter a dropdown controls, if the value exists we rewrite it 
     into our new query, else it's null so we remove it since that's our 
     mechanism for removing a parameter.
  */
	const handleDropDownChange = (optionObj, setOption) => {
		const newSearchParams = { ...searchParams };
		for (const param in optionObj.searchParams) {
			if (optionObj.searchParams[param]) {
				newSearchParams[param] = optionObj.searchParams[param];
			} else {
				delete newSearchParams[param];
			}
		}
		setOption(optionObj);
		handleSearch(newSearchParams);
	};

	// Sections and tabs in the sidebar
	const sidebarSections = [
		{
			sectionTitle: "New Games",
			tabs: [
				{
					tabTitle: "Last 30 days",
					icon: <FaStar />,
					searchParams: {
						dates: dateModule.lastThirtyDaysStr,
					},
				},
				{
					tabTitle: "This week",
					icon: <FaRegCalendarTimes />,
					searchParams: {
						dates: dateModule.thisWeekStr,
					},
				},
				{
					tabTitle: "Upcoming",
					icon: <TbPlayerTrackNext />,
					searchParams: {
						dates: dateModule.nextYearStr,
					},
				},
			],
		},
		{
			sectionTitle: "Top",
			tabs: [
				{
					tabTitle: "Best of the year",
					icon: <GoTrophy />,
					searchParams: {
						dates: `${dateModule.year}-01-01,${dateModule.todayStr}`,
					},
					ignoreOrderDropDown: true,
				},
				{
					tabTitle: `Popular in ${dateModule.year - 1}`,
					icon: <BsGraphUpArrow />,
					searchParams: {
						dates: `${dateModule.year - 1}-01-01,${dateModule.year - 1}-12-31`,
						ordering: "-added",
					},
					ignoreOrderDropDown: true,
				},
				{
					tabTitle: "All time top",
					icon: <FaCrown />,
					searchParams: { ordering: "-added" },
					ignoreOrderDropDown: true,
				},
			],
		},
		{
			sectionTitle: "Genres",
			tabs: [
				{
					tabTitle: "Action",
					icon: <FaFistRaised />,
					searchParams: { genres: GENRE_IDS.Action },
				},
				{
					tabTitle: "Strategy",
					icon: <FaChess />,
					searchParams: { genres: GENRE_IDS.Strategy },
				},
				{
					tabTitle: "RPG",
					icon: <LuSwords />,
					searchParams: { genres: GENRE_IDS.Strategy },
				},
				{
					tabTitle: "Shooter",
					icon: <FaGun />,
					searchParams: { genres: GENRE_IDS.Shooter },
				},
				{
					tabTitle: "Adventure",
					icon: <FaMountain />,
					searchParams: { genres: GENRE_IDS.Adventure },
				},
				{
					tabTitle: "Puzzle",
					icon: <FaPuzzlePiece />,
					searchParams: { genres: GENRE_IDS.Puzzle },
				},
				{
					tabTitle: "Racing",
					icon: <FaCarSide />,
					searchParams: { genres: GENRE_IDS.Racing },
				},
				{
					tabTitle: "Sports",
					icon: <FaFootballBall />,
					searchParams: { genres: GENRE_IDS.Sports },
				},
			],
		},
	];
	// Options for the dropdown for ordering the games
	const orderingOptions = {
		dropDownTitle: "Order By",
		options: [
			{
				optionTitle: "None",
				searchParams: {
					ordering: null,
				},
			},
			{
				optionTitle: "Name",
				searchParams: {
					ordering: "-name",
				},
			},
			{
				optionTitle: "Release Date",
				searchParams: {
					ordering: "-released",
				},
			},
			{
				optionTitle: "Ratings",
				searchParams: {
					ordering: "-rating",
				},
			},
			{
				optionTitle: "Popularity",
				searchParams: {
					ordering: "-added",
				},
			},
		],
	};

	// Options for filtering the games via platform
	const platformOptions = {
		dropDownTitle: "Platforms",
		options: [
			{
				optionTitle: "All",
				searchParams: {
					parent_platforms: null,
				},
			},
			{
				optionTitle: "PC",
				searchParams: {
					parent_platforms: PLATFORM_IDS.PC,
				},
			},
			{
				optionTitle: "MacOS",
				searchParams: {
					parent_platforms: PLATFORM_IDS.MacOS,
				},
			},
			{
				optionTitle: "PlayStation",
				searchParams: {
					parent_platforms: PLATFORM_IDS.PlayStation,
				},
			},
			{
				optionTitle: "Xbox",
				searchParams: {
					parent_platforms: PLATFORM_IDS.Xbox,
				},
			},
			{
				optionTitle: "Nintendo",
				searchParams: {
					parent_platforms: PLATFORM_IDS.Nintendo,
				},
			},
			{
				optionTitle: "IOS",
				searchParams: {
					parent_platforms: PLATFORM_IDS.IOS,
				},
			},
			{
				optionTitle: "Android",
				searchParams: {
					parent_platforms: PLATFORM_IDS.Android,
				},
			},
		],
	};

	console.log("Current Search Parameters: ", searchParams);

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
							<GameCard key={gameObj.id} gameObj={gameObj} />
						))}
					</div>
				)}
			</main>
		</div>
	);
}
