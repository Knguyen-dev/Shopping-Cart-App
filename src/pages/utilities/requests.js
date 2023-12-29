/*
+ PLATFORM_IDS: An object with the name of the parent platform
  and the ID that rawg api uses to identify them.
+ GENRE_IDS: Object with name of the game genre and 
  the ID that rawg api uses to identify them.
*/

import notFoundImg from "../../assets/images/image-not-found.png";
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

// Rawg api endpoint info
const apiKey = "79e2d19924d040afa2644aa5867a40f4";
const baseURL = "https://api.rawg.io/api/games";

/*
	+ Parses data from game objects and only gives us the data that we want to use.
  NOTE: Prices aren't provided with the rawg api, so we'll just create 
  fake prices right here. We'll make all the prices the same since it would 
  create some inconsistencies if we try to randomly generate prices, and 
  there could be multiple different prices for the same game.


  - Properties that could be null:
  1. background_image
  2. stores
  3. platforms
  4. metacretic
  5. clip
  6. short_screenshots
  7. score
  8. tags
  9. esrb_rating
	*/
export function processGames(gameList) {
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
+ Makes a fetch for multiple games:
- params: An object in form {searchParameter: searchValue}. By default
  it'll fetch 12 games
*/
export async function fetchGames(params = {}) {
	// Have some default parameters that
	const defaultParams = {
		page_size: 12,
	};

	// Now add passed parameters to the default parameters to create our
	// map of parameters we'll use ot query
	for (const key in params) {
		defaultParams[key] = params[key];
	}

	// Iteratively build the search url
	let requestURL = `${baseURL}?key=${apiKey}`;
	for (const param in defaultParams) {
		requestURL += `&${param}=${defaultParams[param]}`;
	}

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

/*
+ Process Game Details: Processes the json data we get from our fetch
  and keeps the data of the game that we want


+ Data we want:

1. Name
2. Description 
3. website 
4. release date
5. list of genres
6. list of platforms.
7. Developer company
8. Publisher company
9. Price (Keep this as 10 dollars)


10. Images of the game that we can use for a carousel if possible. But 
  right now It looks like there's only one or two images really. So 
  to get multiple images do another request for screenshots. May
  have to pass in stuff as well if possible.

*/
function processGameDetails(gameData) {
	const { name, description, released } = gameData;
}

/*
+ Makes a fetch for the details of a single game
- gameID: The integer ID or the slug that identifies the game 
  for Rawg api.

Request url: https://api.rawg.io/api/games/grand-theft-auto-v?key=79e2d19924d040afa2644aa5867a40f4
*/
export async function fetchGameDetails(gameID) {
	// Rawg api endpoint info
	const requestURL = `${baseURL}/${gameID}?key=${apiKey}`;

	try {
		const response = await fetch(requestURL, {
			mode: "cors",
		});

		if (!response.ok) {
			throw response;
		}

		const jsonData = await response.json();
		console.log(jsonData);
	} catch (error) {
		console.error("Error in fetching game details: ", error);
		throw error;
	}
}
