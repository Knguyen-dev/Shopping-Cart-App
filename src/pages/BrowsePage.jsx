import PropTypes from "prop-types";
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
	FaCheck,
} from "react-icons/fa";
import { TbPlayerTrackNext } from "react-icons/tb";
import { GoTrophy } from "react-icons/go";
import { BsGraphUpArrow } from "react-icons/bs";
import { LuSwords } from "react-icons/lu";
import { FaGun } from "react-icons/fa6";
import "../styles/BrowsingPage.css";

import { datesModule } from "./utilities/utilities";
import GameCard from "./components/GameCard";
import { PLATFORM_IDS, GENRE_IDS, fetchGames } from "./utilities/requests";

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

// Creates a section on the sidebar
function SidebarSection({
	sectionObj,
	setActiveTab,
	activeTabID,
	handleSearch,
	dropDownParams,
}) {
	return (
		<section className="sidebar-section">
			<h2 className="sidebar-section-title">{sectionObj.sectionTitle}</h2>
			<ul className="sidebar-tab-list">
				{sectionObj.tabs.map((tabObj, index) => {
					/*
          - Map:
          1. Create a unique id for each tabObj. 
          2. Also create a boolean 
            to indicate whether a tab is active by comparison the active tab id to 
            a given tab's id, which we just generated.
          - onTabClick:
          1. Record the active tab for visually indicating what tab is being used.
          2. Get search parameters for our clicked tab, and loop through the dropdown parameters.
            If the tab is supposed to ignore the ordering drop down, ensure the "ordering"
            parameter is skipped and not included in our newSearchParams


          NOTE: 

          1. For a section such as 'Top' where we show games ordered on some criteria,
            the ordering set in the tab should take priority over the user's drop down ordering. 
            As well as this the user shouldn't be able to interfere with the ordering of 
            the tabs here due to the nature of the section. For that reason, if we see
            a tab with ignoreOrderDropDown defined (which will always have the value true),
            we will skip the 'ordering' parameter provided in 'dropDownParams' to prevent 
            said parameter from either 'overwriting' or predefined 'ordering' parameter, 
            or deleting it.

          2. It should be noted that it seems without the 'ordering' parameter. Rawg api
            automatically gives back the most popular games, so you can think of it as 
            implicitly having "ordering='-added'" by default.
          */
					tabObj.id = `${sectionObj.sectionTitle}-${tabObj.tabTitle}-${index}`;
					const isActive = activeTabID === tabObj.id ? true : false;
					const onTabClick = () => {
						const newSearchParams = { ...tabObj.searchParams };
						for (const key in dropDownParams) {
							if (tabObj.ignoreOrderDropDown && key === "ordering") {
								continue;
							} else if (dropDownParams[key]) {
								newSearchParams[key] = dropDownParams[key];
							} else {
								delete newSearchParams[key];
							}
						}
						setActiveTab(tabObj);
						handleSearch(newSearchParams);
					};

					return (
						<SidebarTab
							key={index}
							tabObj={tabObj}
							onClick={onTabClick}
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
	dropDownParams: PropTypes.object,
	handleSearch: PropTypes.func,
};

/*
+ Component for creating our custom dropdown
- Parameters:
1. dropDownOptions: An object that has information on how to build the drop down
2. currentOption: A given object in dropDownOptions.options that details information on 
    an object in the drop down
3. setOption: State setter function that tracks the currently selected/active option in the drop down
4. searchParams: The current search parameters being used to query games.
5. handleSearch: The function used to query games when passed some searched parameters.

- dropDownOptions.options.map: Here we iterate through the array of 
  option objects to create the markup and logic for the functioning drop down items.

- handleDropDownChange: When an item is selected in a drop down it, we 
  may add, remove, or modify only the parameter that the drop down is responsible for, while
  leaving all other parameters the same.
1. Get our current search parameters with the searchParams object, but as a shallow copy.
2. Iterate through every key-value pair in an option object's 'searchParams' object,
    which is just a map containing the search parameters that will be applied when clicking
    on that option. 
 
  - If the value exists, we will add or overwrite the current searchParam's parameter
    with the new value.
  - Else, the value doesn't exist (null), which us our way of letting the user deselect
    any filter or option in the drop down. With this, we will just remove the drop down's 
    parameter from our search parameters to ensure that it doesn't affect the final fetch.

3. Finally set the state to represent the current drop down item being selected and then
    make the fetch request with our new parameters.

NOTE: In JavaScript shallow copying an object creates a new object with separate references
      to the top-level keys and values only. Meaning changing these top-level key-value pairs don't 
      affect the key-value pairs of the original. So for a simple map of that contains simple
      primitive data types and no nesting, it won't directly affect our state value.
*/
function CustomDropDown({
	dropDownOptions,
	currentOption,
	setOption,
	searchParams,
	handleSearch,
}) {
	return (
		<div className="custom-drop-down dropdown">
			<button
				className="dropdown-toggle"
				type="button"
				data-bs-toggle="dropdown"
				aria-expanded="false">
				{dropDownOptions.dropDownTitle}:{" "}
				<strong>{currentOption.optionTitle}</strong>
			</button>
			<ul className="dropdown-menu">
				{dropDownOptions.options.map((optionObj, index) => {
					const handleDropDownChange = () => {
						const newSearchParams = { ...searchParams };
						for (const key in optionObj.searchParams) {
							if (optionObj.searchParams[key]) {
								newSearchParams[key] = optionObj.searchParams[key];
							} else {
								delete newSearchParams[key];
							}
						}
						setOption(optionObj);
						handleSearch(newSearchParams);
					};

					return (
						<li key={index}>
							<span className="dropdown-item" onClick={handleDropDownChange}>
								{optionObj.optionTitle}{" "}
								{currentOption.optionTitle === optionObj.optionTitle && (
									<FaCheck />
								)}
							</span>
						</li>
					);
				})}
			</ul>
		</div>
	);
}
CustomDropDown.propTypes = {
	dropDownOptions: PropTypes.object,
	currentOption: PropTypes.object,
	setOption: PropTypes.func,
	searchParams: PropTypes.object,
	handleSearch: PropTypes.func,
};

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
  1. Based on the tab we picked as our default, we must carefully 
    build our search parameters for fetch. We picked the top tab which means our 
    search parameters are the ones defined in the tab object, and potential 
    parameter for the platform dropdown. Remember for 'Top' section, we 
    excluded any parameter from the ordering drop down.
  2. We also have 'All' the default platform, meaning any platform is allowed,
    so to indicate that we actually don't include the "parent_platform" parameter.
    Now we call handleSearch, and pass in our search parameters as a map.


  - NOTE: 
  
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

  3. 

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

	// Sections and tabs in the sidebar
	const sidebarSections = [
		{
			sectionTitle: "New Games",
			tabs: [
				{
					tabTitle: "Last 30 days",
					icon: <FaStar />,
					searchParams: {
						dates: datesModule.lastThirtyDaysStr,
					},
				},
				{
					tabTitle: "This week",
					icon: <FaRegCalendarTimes />,
					searchParams: {
						dates: datesModule.thisWeekStr,
					},
				},
				{
					tabTitle: "Upcoming",
					icon: <TbPlayerTrackNext />,
					searchParams: {
						dates: datesModule.nextYearStr,
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
						dates: `${datesModule.year}-01-01,${datesModule.todayStr}`,
					},
					ignoreOrderDropDown: true,
				},
				{
					tabTitle: `Popular in ${datesModule.year - 1}`,
					icon: <BsGraphUpArrow />,
					searchParams: {
						dates: `${datesModule.year - 1}-01-01,${
							datesModule.year - 1
						}-12-31`,
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
						setActiveTab={setActiveTab}
						activeTabID={activeTab.id}
						handleSearch={handleSearch}
						dropDownParams={{
							...itemOrder.searchParams,
							...platform.searchParams,
						}}
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
								searchParams={searchParams}
								handleSearch={handleSearch}
							/>
						)}
						<CustomDropDown
							dropDownOptions={platformOptions}
							currentOption={platform}
							setOption={setPlatform}
							searchParams={searchParams}
							handleSearch={handleSearch}
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
