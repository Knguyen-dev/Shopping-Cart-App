// Card for games
import { FaCheck, FaPlus } from "react-icons/fa6";
import { platform_map, icon_map } from "../pages/utilities/constants";
import "../styles/GameCard.css";
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
		<div className="game-card" onClick={onCardClick}>
			<div className="card-img-container">
				<img src={gameObj.background_image} alt="Game Cover Image" />
			</div>
			<div className="card-body">
				<div className="header-info">
					<button
						className="add-cart-btn"
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
					<span className="game-price">{gameObj.price}</span>
				</div>
				<ul className="platform-icon-list">
					{platformIcons.map((icon, index) => (
						<li key={index}>{icon}</li>
					))}
				</ul>
				<h1 className="card-title">{gameObj.name}</h1>
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
