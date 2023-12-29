import { useParams } from "react-router-dom";

export default function GameDetailsPage() {
	return (
		<div className="game-details-page">
			<h1>game details</h1>
		</div>
	);
}

/*
- Loader that loads the game's details





*/
export const GameDetailsLoader = async ({ params }) => {
	try {
		const { slug } = params;
	} catch (error) {
		console.error("Fetch Error:", error);
		throw error;
	}
};
