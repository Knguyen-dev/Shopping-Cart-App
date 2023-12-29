import { describe, it, expect } from "vitest";
import { processGames } from "../utilities/requests";
import notFoundImg from "../../assets/images/image-not-found.png";


describe("Testing processGames", () => {
	it("Expect processed data from ideal game data", () => {
		const sampleGameData = [
			{
				id: 3498,
				slug: "grand-theft-auto-v",
				name: "Grand Theft Auto V",
				released: "2013-09-17",
				background_image:
					"https://media.rawg.io/media/games/20a/20aa03a10cda45239fe22d035c0ebe64.jpg",
				platforms: [
					{ platform: { name: "PlayStation 5" } },
					{ platform: { name: "Xbox Series S/X" } },
					{ platform: { name: "PC" } },
					{ platform: { name: "PlayStation 4" } },
					{ platform: { name: "PlayStation 3" } },
					{ platform: { name: "Xbox 360" } },
					{ platform: { name: "Xbox One" } },
				],
			},
		];
		const gameList = processGames(sampleGameData);
		const game = gameList[0];
		expect(game.id).toBe(3498);
		expect(game.slug).toBe("grand-theft-auto-v");
		expect(game.name).toBe("Grand Theft Auto V");
		expect(game.released).toBe("2013-09-17");
		expect(game.background_image).toBe(
			"https://media.rawg.io/media/games/20a/20aa03a10cda45239fe22d035c0ebe64.jpg"
		);
		expect(game.platforms.length).toBe(7);
	});

	it("Expect corrected data from bad game data", () => {
		const sampleGameData = [
			{
				id: 3498,
				slug: "grand-theft-auto-v",
				name: "Grand Theft Auto V",
				released: "2013-09-17",
				background_image: null,
				platforms: null,
			},
		];

		const gameList = processGames(sampleGameData);
		const game = gameList[0];

		expect(game.id).toBe(3498);
		expect(game.slug).toBe("grand-theft-auto-v");
		expect(game.name).toBe("Grand Theft Auto V");
		expect(game.released).toBe("2013-09-17");
		expect(game.background_image).toBe(notFoundImg);
		expect(game.platforms).toEqual([]);
	});
});
