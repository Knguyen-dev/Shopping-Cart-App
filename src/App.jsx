import {
	RouterProvider,
	createBrowserRouter,
	Route,
	createRoutesFromElements,
} from "react-router-dom";
import { useState } from "react";

// Layouts
import AppLayout from "./layouts/AppLayout";
import AuthLayout from "./layouts/AuthLayout";
// Pages
import LoginPage from "./pages/Auth/LoginPage";
import RegisterPage from "./pages/Auth/RegisterPage";
import HomePage from "./pages/HomePage";
import BrowsingPage from "./pages/Browse/BrowsePage";
import GameDetailsPage from "./pages/Browse/GameDetailsPage";
import NotFoundPage from "./pages/NotFoundPage";

// Fucntions and constants
import { fetchGames } from "./pages/utilities/requests";
import {
	sidebarSections,
	orderingOptions,
	platformOptions,
} from "./pages/utilities/constants";

import "./App.css";

export default function App() {
	const [activeTab, setActiveTab] = useState({});
	const [itemOrder, setItemOrder] = useState({});
	const [platform, setPlatform] = useState({});
	const [gameList, setGameList] = useState([]);
	const [searchParams, setSearchParams] = useState({});
	const [useDefault, setUseDefault] = useState(true);
	const [searchError, setSearchError] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	/*
  + Handles adding, overwriting, or deleting search parameters.
  1. If a value is defined, we overwrite our value in our 
    key-value pair, with the new value new value from newParams.
  2. Else if a value isn't defined, null, that's our indicator that 
    we want to remove the corresponding key-value pair.
  NOTE: Shallow copy here to avoid unintended mutations to original object
    where'ever we're calling this from.
  */
	const updateSearchParams = (baseParams, newParams) => {
		const updatedParams = { ...baseParams };
		for (const param in newParams) {
			if (newParams[param]) {
				updatedParams[param] = newParams[param];
			} else {
				delete updatedParams[param];
			}
		}
		return updatedParams;
	};

	/*
  + Handles updating and returning new search parameters for 
    a tab.
  1. Start with the tab's parameters and also the parameters of
    your drop downs.
  2. If we're ignoring the order drop down, then delete its key-value
    pairing.
  3. Add our 'dropDownParams' to our new search params and return the object.
  NOTE: Shallow copy a tab obj's search parameters to prevent any unintended mutations
  */
	const handleTabSearchParams = (tabObj, platform, itemOrder) => {
		const newSearchParams = { ...tabObj.searchParams };
		const dropDownParams = {
			...platform.searchParams,
			...itemOrder.searchParams,
		};
		if (tabObj.ignoreOrderDropDown) {
			delete dropDownParams["ordering"];
		}
		return updateSearchParams(newSearchParams, dropDownParams);
	};

	/*
  + Renders games on page load.
  - If use default:
  1. It's the user's first time on the page, so the BrowsePage
    will use its default settings. So default tab, item order, platform, and 
    as a result it will render games based on these defaults.
  2. However, for every time the user goes on this BrowsePage after, 
    we won't use these default settings, rather we'll use the settings
    the user had last time they were on the page. That's why we 
    set 'useDefault' to false. 
  NOTE: This also helps prevent unnecessary queries, as the idea is to let 
    users see their most recent search results from when they were on this 
    page last.
  - Else (useDefault=false):
  1. In this case this isn't the first time the user has gone on the 
    BrowsePage, and it also means that the values for the BrowsePage
    have already been defined. 
  2. In this case, we don't need to make any fetches or change any
    major parts of our data. We just need to render the games the user 
    had from their last visit. This is why by default loading is 'false'
    because when 'useDefault' is true, the loading logic is handled when 
    we do handleSearch. Else, we already have our games, we don't need fetch
    and don't want 'loading' to be true because we already the games ready
    to be rendered.
  */
	const loadInitialBrowsePage = () => {
		const defaultTab = sidebarSections[1].tabs[1];
		const defaultItemOrder = orderingOptions.options[0];
		const defaultPlatform = platformOptions.options[0];
		const defaultSearchParams = handleTabSearchParams(
			defaultTab,
			defaultItemOrder,
			defaultPlatform
		);
		setItemOrder(defaultItemOrder);
		setPlatform(defaultPlatform);
		setActiveTab(defaultTab);
		handleSearch(defaultSearchParams);
		setUseDefault(false);
	};

	// Handles the querying of games when a new tab is clicked
	const onTabClick = (tabObj) => {
		const newSearchParams = handleTabSearchParams(tabObj, platform, itemOrder);
		setActiveTab(tabObj);
		handleSearch(newSearchParams);
	};

	// Handles changing drop down parameter and searches for games after change
	const handleDropDownChange = (optionObj, setOption) => {
		const newSearchParams = updateSearchParams(
			searchParams,
			optionObj.searchParams
		);
		setOption(optionObj);
		handleSearch(newSearchParams);
	};

	/*
  + Handles submission for when user wants to search for a game using the 
    search bar.
  
  - Deselect all tabs when searching. So visually deselect a tab, and 
    ensure no tab search parameters interfere

  - We've decided to include drop down parameters, meaning when a user searches 
    the drop down parameter values should take effect. I think this is excusable
    because when you search for things, you're going to have at least 10 other 
    items that are similar. We'll let the user filter them out and handle it.


  - Steps:
  
  1. Build the search params, start with the gameTitle, and then include our 
    item ordering and the platform.

  2. Deselect our active tab, so I guess that means setting activeTab to an 
    empty object. 

  3. From whatever page they're on, navigate to the BrowsePage. 
    (This will be done outside of this function because useNavigate can
     only be done in the context of a Router component)

  4.  Ensure that useDefault is false, so set it to false if it isn't already.
    This scenario can happen when the user searches for a game, and they've
    never been to the BrowsePage, leading to useDefault still being true.

    Again ensure that useDefault is false before we load or navigate to the 
    'BrowsePage'. That's important

  5. Start the query. So we navigate the user and then start the query.


  NOTE: Navigation will be handled outside of this function
  */
	const handleSubmitSearch = (gameTitle) => {
		let newSearchParams = {
			search: gameTitle,
		};
		newSearchParams = updateSearchParams(newSearchParams, itemOrder);
		newSearchParams = updateSearchParams(newSearchParams, platform);

		setActiveTab({});
		if (useDefault) {
			setUseDefault(false);
		}

		// This is the only async call
		handleSearch(newSearchParams);
	};

	// Handles searching for games given some parameters
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

	const appRouter = createBrowserRouter(
		createRoutesFromElements(
			<Route path="/">
				<Route
					path=""
					element={<AppLayout handleSubmitSearch={handleSubmitSearch} />}>
					<Route index element={<HomePage />} />
					<Route path="browse">
						<Route
							index
							element={
								<BrowsingPage
									activeTab={activeTab}
									itemOrder={itemOrder}
									setItemOrder={setItemOrder}
									platform={platform}
									setPlatform={setPlatform}
									gameList={gameList}
									searchError={searchError}
									isLoading={isLoading}
									useDefault={useDefault}
									loadInitialBrowsePage={loadInitialBrowsePage}
									onTabClick={onTabClick}
									handleDropDownChange={handleDropDownChange}
								/>
							}
						/>
						<Route path=":slug" element={<GameDetailsPage />} />
					</Route>
				</Route>
				<Route path="auth" element={<AuthLayout />}>
					<Route path="login" element={<LoginPage />} />
					<Route path="register" element={<RegisterPage />} />
				</Route>
				<Route path="*" element={<NotFoundPage />} />
			</Route>
		)
	);

	return <RouterProvider router={appRouter} />;
}
