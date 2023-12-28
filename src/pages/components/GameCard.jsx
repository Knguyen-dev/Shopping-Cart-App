import {
	FaWindows,
	FaPlaystation,
	FaXbox,
	FaApple,
	FaMobileAlt,
	FaAndroid,
} from "react-icons/fa";
import { BsNintendoSwitch } from "react-icons/bs";

import "../../styles/GameCard.css";

// Card for games
import PropTypes from "prop-types";

/*
+ Logic for rendering the icons for what platforms a game runs on

+ platform_map: Array of platforms: Basically if a game is available on any of the platforms
  below, we'll render a related icon on the game's card.

  1. Using the substrings below, we will check if a game's platform contains
  the string, if so then we know a game runs on said platform.

+ icon_map: Link those strings with their corresponding icons representing 
  the platform. With this we'll be able to map those strings stored in
  'platformNames' and render the platform icons.

NOTE: We used Rawg API's 'games' endpoint to see what strings were acceptable 
  to use to match the games and we lowercased them. You can also reference 'parent_platforms' 
  endpoint, but cross-reference your information as a parent platform would be 'macintosh' 
  but the platform names received by the game endpoint would be 'macOS', so there
  could be differences.
*/
const platform_map = {
	pc: "pc",
	macOS: "macos",
	playstation: "playstation",
	xbox: "xbox",
	ios: "ios",
	android: "android",
	nintendo: "nintendo",
};

const icon_map = {
	[platform_map.pc]: <FaWindows />,
	[platform_map.macOS]: <FaApple />,
	[platform_map.playstation]: <FaPlaystation />,
	[platform_map.xbox]: <FaXbox />,
	[platform_map.ios]: <FaMobileAlt />,
	[platform_map.android]: <FaAndroid />,
	[platform_map.nintendo]: <BsNintendoSwitch />,
};

export default function GameCard({ gameObj }) {
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
		<div className="game-card">
			<div className="card-img-container">
				<img src={gameObj.background_image} alt="Card image cap" />
			</div>

			<div className="card-body">
				<div className="header-info">
					<button className="add-cart-btn">Add to Cart</button>
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
};
