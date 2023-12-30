import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import GameCard from "../../components/GameCard";
describe("GameCard Component", () => {
	const gameObj = {
		id: 3498,
		slug: "grand-theft-auto-v",
		name: "Grand Theft Auto V",
		released: "2013-09-17",
		background_image:
			"https://media.rawg.io/media/games/20a/20aa03a10cda45239fe22d035c0ebe64.jpg",
		platforms: [
			"PlayStation 5",
			"Xbox Series S/X",
			"PC",
			"PlayStation 4",
			"PlayStation 3",
			"Xbox 360",
			"Xbox One",
		],
		price: "$10",
	};

	it("Renders card correctly for ideal game", () => {
		render(<GameCard gameObj={gameObj} />);
		// 1. Check for an image with source
		const cardImage = screen.getByAltText("Game Cover Image");
		expect(cardImage).toBeInTheDocument();
		expect(cardImage).toHaveAttribute("src", gameObj.background_image);

		// 2. Check if it is rendering the price correctly
		const priceElement = screen.getByText(gameObj.price);
		expect(priceElement).toBeInTheDocument();

		// 3. Check if it's rendering the 'Add to Cart' button
		const addToCartButton = screen.getByRole("button", { name: "Add to Cart" });
		expect(addToCartButton).toBeInTheDocument();

		// 4. Check if its rendering the expected amount of platform icons
		const platformIcons = screen.getAllByRole("listitem");
		expect(platformIcons.length).toBe(3);

		// 5. Check if it's rendering the name of the game
		const gameName = screen.getByRole("heading");
		expect(gameName.textContent).toBe(gameObj.name);
	});
});
