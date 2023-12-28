/*

+ PLATFORM_IDS: An object with the name of the parent platform
  and the ID that rawg api uses to identify them.


+ GENRE_IDS: Object with name of the game genre and 
  the ID that rawg api uses to identify them.
*/
export const PLATFORM_IDS = {
	PC: 1,
	PlayStation: 2,
	Xbox: 3,
	IOS: 4,
	MacOS: 5,
	Nintendo: 7,
	Android: 8,
};

export const GENRE_IDS = {
	Action: 4,
	Adventure: 3,
	RPG: 5,
	Strategy: 10,
	Shooter: 2,
	Puzzle: 7,
	Racing: 1,
	Sports: 15,
};

import notFoundImg from "../../assets/images/image-not-found.png";

function processGames(gameList) {
	/*
	+ Parses data from game objects and only gives us the data that we want to use.
  NOTE: Prices aren't provided with the rawg api, so we'll just create 
  fake prices right here. We'll make all the prices the same since it would 
  create some inconsistencies if we try to randomly generate prices, and 
  there could be multiple different prices for the same game.
	*/

	const gameData = gameList.map((gameObj) => {
		return {
			id: gameObj.id,
			slug: gameObj.slug,
			name: gameObj.name,
			released: gameObj.released,
			background_image: gameObj.background_image
				? gameObj.background_image
				: notFoundImg,
			platforms: gameObj.platforms
				? gameObj.platforms.map((platformObj) => platformObj.platform.name)
				: [],
			price: "$10",
		};
	});
	return gameData;
}

/*
+ Makes a fetch for games:
- params: An object in form {searchParameter: searchValue}
*/
export async function fetchGames(params) {
	// Rawg api endpoint info
	const baseURL = "https://api.rawg.io/api/games";
	const apiKey = "79e2d19924d040afa2644aa5867a40f4";

	// Default parameters for page number and page size
	const parameters = {
		page_size: 12,
	};

	// Add the passed parameters in our map
	for (const key in params) {
		parameters[key] = params[key];
	}

	// Iteratively build the search url
	let requestURL = `${baseURL}?key=${apiKey}`;
	for (const key in parameters) {
		requestURL += `&${key}=${parameters[key]}`;
	}

	console.log("Request: ", requestURL);

	// Make our fetch request
	try {
		const response = await fetch(requestURL, { mode: "cors" });
		if (!response.ok) {
			throw response;
		}
		const jsonData = await response.json();
		const gameList = processGames(jsonData.results);
		return gameList;
	} catch (error) {
		console.error("Error in fetching the games: ", error);
		throw error;
	}
}
