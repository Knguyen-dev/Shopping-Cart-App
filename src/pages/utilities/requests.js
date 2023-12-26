function processGames(gameList) {
	/*
	+ Parses data from game objects and only gives us the data that we want to use.


  NOTE: Prices aren't provided with the rawg api, so we'll just create 
  fake prices right here. We'll make all the prices the same since it would 
  create some inconsistencies if we try to randomly generate prices, and 
  there could be multiple different prices for the same game.
	*/
	gameList = gameList.map((gameObj) => {
		return {
			id: gameObj.id,
			slug: gameObj.slug,
			name: gameObj.name,
			released: gameObj.released,
			background_image: gameObj.background_image,
			platforms: gameObj.platforms.map(
				(platformObj) => platformObj.platform.name
			),
			price: "$10",
		};
	});
	return gameList;
}

export default function fetchGames(pageNum, pageSize) {
	const apiKey = "79e2d19924d040afa2644aa5867a40f4";
	const baseURL = "https://api.rawg.io/api/games";
	const requestURL = `${baseURL}?key=${apiKey}&page=${pageNum}&page_size=${pageSize}`;
	return fetch(requestURL, {
		mode: "cors",
	})
		.then((response) => {
			if (!response.ok) {
				throw response;
			}
			return response.json();
		})
		.then((jsonData) => {
			const gameList = processGames(jsonData.results);
			return gameList;
		})
		.catch((error) => {
			console.error("Error in fetching the games: ", error);
			throw error;
		});
}
