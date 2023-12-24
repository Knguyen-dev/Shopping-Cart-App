import {
	FaWindows,
	FaPlaystation,
	FaXbox,
	FaApple,
	FaAndroid,
} from "react-icons/fa";

// Card for games
import PropTypes from "prop-types";
export default function GameCard({ gameObj }) {
	return (
		<div className="card" style="width: 18rem;">
			<img className="card-img-top" src={gameObj.img} alt="Card image cap" />
			<div className="card-body">
				<div className="">
					<button className="btn btn-primary">Add to Cart</button>
					<span>{gameObj.price}</span>
				</div>

				<div className="platform-icons">
					{gameObj.platforms.map((platform) => {
						switch (platform) {
							case "PC":
								return <FaWindows />;
							case "PlayStation":
								return <FaPlaystation />;
							case "Xbox":
								return <FaXbox />;
							case "IOS":
								return <FaApple />;
							case "Android":
								return <FaAndroid />;
							default:
								return platform;
						}
					})}
				</div>
				<h5 className="card-title">{gameObj.title}</h5>
			</div>
		</div>
	);
}
GameCard.propTypes = {
	gameObj: PropTypes.object,
};
