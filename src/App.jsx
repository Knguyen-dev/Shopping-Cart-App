import {
	RouterProvider,
	createBrowserRouter,
	Route,
	createRoutesFromElements,
} from "react-router-dom";
import { useState } from "react";

// Layouts
import RootLayout from "./layouts/RootLayout";
import AppLayout from "./layouts/AppLayout";
import AuthLayout from "./layouts/AuthLayout";
import AccountLayout from "./layouts/AccountLayout";

// Pages
import LoginPage from "./pages/Auth/LoginPage";
import RegisterPage from "./pages/Auth/RegisterPage";
import HomePage from "./pages/HomePage";
import BrowsingPage from "./pages/Browse/BrowsePage";
import GameDetailsPage from "./pages/Browse/GameDetailsPage";
import NotFoundPage from "./pages/NotFoundPage";
import CartPage from "./pages/CartPage";
import AccountHomePage from "./pages/Account/AccountHomePage";

// Components
import ProtectedRoute from "./components/ProtectedRoute";

// Functions and constants
import { fetchGames } from "./pages/utilities/requests";
import {
	browseSidebarSections,
	orderingOptions,
	platformOptions,
} from "./pages/utilities/constants";

export default function App() {
	const [activeTab, setActiveTab] = useState({});
	const [itemOrder, setItemOrder] = useState(orderingOptions.options[0]);
	const [platform, setPlatform] = useState(platformOptions.options[0]);
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
    will use its default settings. So we set the default tab, 
    item order, and platform. We'll render games based on these defaults.
  2. Every subsequent time, we won't use these defaults, but rather 
    the settings the user had applied to the page the last time they used it. 
    That's why we set 'useDefault' to false to prevent us using defaults again. 
  - Else (useDefault=false):
  1. In this case this isn't the first time the user has visited 
    BrowsePage, and it also means that the values for the BrowsePage
    have already been defined. As a result, we just render the data
    we already have stored as states.

  - NOTE: Notice that platform and itemOrder are already set to defaults 
    when initializing as states. This is to handle the case, when the user 
    uses the search bar before visiting the BrowsePage. This allows for 
    itemOrder and platform to still be defined even in that case.
  */
	const loadInitialBrowsePage = () => {
		const defaultTab = browseSidebarSections[1].tabs[1];
		const defaultSearchParams = handleTabSearchParams(
			defaultTab,
			orderingOptions.options[0],
			platformOptions.options[0]
		);
		setActiveTab(defaultTab);
		setItemOrder(orderingOptions.options[0]);
		setPlatform(platformOptions.options[0]);
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
	const onDropDownChange = (optionObj, setOption) => {
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
  1. We incorporate the gameTitle as a search parameter, set the key to 'search' 
    as indicated by API. 
  2. Include parameters for itemOrder and platform. Delselect active tab
    when we search for a game.
  4.  Ensure that useDefault is false, so we don't load default browse page.
  5. Query for game data, and outside of the function we handle navigation
    to browse page
  */
	const handleSubmitSearch = (gameTitle) => {
		let newSearchParams = {
			search: gameTitle,
		};
		newSearchParams = updateSearchParams(
			newSearchParams,
			itemOrder.searchParams
		);
		newSearchParams = updateSearchParams(
			newSearchParams,
			platform.searchParams
		);
		setActiveTab({});
		if (useDefault) {
			setUseDefault(false);
		}
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
			<Route path="/" element={<RootLayout />}>
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
									onDropDownChange={onDropDownChange}
								/>
							}
						/>
						<Route path=":slug" element={<GameDetailsPage />} />
					</Route>

					<Route
						path="cart"
						element={
							<ProtectedRoute>
								<CartPage />
							</ProtectedRoute>
						}
					/>
					<Route
						path="account"
						element={
							<ProtectedRoute>
								<AccountLayout />
							</ProtectedRoute>
						}>
						<Route index element={<AccountHomePage />} />
					</Route>
				</Route>

				<Route path="auth" element={<AuthLayout />}>
					<Route index element={<RegisterPage />} />
					<Route path="login" element={<LoginPage />} />
				</Route>
				<Route path="*" element={<NotFoundPage />} />
			</Route>
		)
	);

	return <RouterProvider router={appRouter} />;
}
