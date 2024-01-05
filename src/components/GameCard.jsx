/*
+ GameCard: Customized card component for rendering our games on cards.

+ GameCard Styling: 
- Stylings for the game card itself: Let the width be 
  determined by the grid column's sizes, but for the height, we want
  all cards to have the same height so we'll have a fixed height for that
- We want the cards to take 100% of their column defined by the 
  grid. Set a max height to avoid avoids going over a certain limit.

- NOTE: With this not all of the cards will be the same uniform height, but 
  at least the content will be comfortably visible.
*/

// Card for games
import { FaCheck, FaPlus } from "react-icons/fa6";
import { platform_map, icon_map } from "../pages/utilities/constants";
import PropTypes from "prop-types";

export default function GameCard({
	gameObj,
	onCardClick,
	shoppingCartClick,
	isInCart,
}) {
	/*
  - Create a set of platform names that contains any platform name that we 
    can render an icon for. 
  1. Iterate through platform names for the game (gameObj.platforms.foreach).
  2. Then compare each name with each platform string we've defined in 
    platform_map. By doing this we can see if a game's given platform 
    can be rendered with an icon. For example, doing 'playstation'.includes("playstation 5")
    would allow us to add our 'playstation' string to our set, and let us to know to 
    render the corresponding icon later.
  
  - NOTE: We use a set to avoid rendering the same icons twice in the case 
  of a game being on the "PlayStation 4" and "PlayStation 5". We don't want
  to render an icon for both.
  */

	let platformNames = new Set();
	gameObj.platforms.forEach((platform) => {
		platform = platform.toLowerCase();
		for (const key in platform_map) {
			if (platform.includes(platform_map[key])) {
				platformNames.add(platform_map[key]);
			}
		}
	});

	/*
  - Convert that set of platform names into an array, and then we 
  iterate that array over our icon map. The values of platformName array should 
  match the keys of the icon_map, which allows to easily convert the strings of 
  the gaming platforms to their icon equivalents.
  */
	const platformIcons = [...platformNames].map((name) => icon_map[name]);

	return (
		<div
			className="tw-flex tw-max-h-96 tw-w-full tw-cursor-pointer tw-flex-col tw-overflow-hidden tw-rounded-lg tw-bg-gray-900 tw-text-white tw-transition-all hover:tw-scale-105"
			onClick={onCardClick}>
			{/* Image section of the card. Set to half so that all images take only half of our card. */}
			<div className="tw-h-1/2">
				<img
					className="tw-h-full tw-w-full tw-object-cover"
					src={gameObj.background_image}
					alt="Game Cover Image"
				/>
			</div>

			{/* Body of the card */}
			<div className="tw-flex tw-flex-1 tw-flex-col tw-justify-evenly tw-px-4 tw-py-2">
				<div className="tw-mb-4 tw-flex tw-items-center tw-justify-between tw-text-slate-400">
					<button
						className="tw-flex tw-items-center tw-gap-x-2 tw-rounded-md tw-bg-slate-800 tw-px-4 tw-py-2"
						onClick={(e) => {
							// Stop event propagation to prevent onCardClick from triggering
							e.stopPropagation();
							shoppingCartClick();
						}}>
						{isInCart ? (
							<>
								<FaCheck />
								<span>Added</span>
							</>
						) : (
							<>
								<FaPlus />
								<span>Add to cart</span>
							</>
						)}
					</button>
					<span className="game-price">${gameObj.price}</span>
				</div>

				{/* List of icons for hte platforms */}
				<ul className="tw-flex tw-gap-x-3">
					{platformIcons.map((icon, index) => (
						<li key={index}>{icon}</li>
					))}
				</ul>

				{/* Title of the card, which will have title of the game */}
				<h1 className="tw-mt-auto tw-text-xl">{gameObj.name}</h1>
			</div>
		</div>
	);
}
GameCard.propTypes = {
	gameObj: PropTypes.object,
	onCardClick: PropTypes.func,
	shoppingCartClick: PropTypes.func,
	isInCart: PropTypes.bool,
};
