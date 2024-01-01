import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { fetchGameDetails, fetchGameImages } from "../utilities/requests";
import Carousel from "../../components/Carousel";
import "../../styles/GameDetailsPage.css";

import notFoundImg from "../../assets/images/image-not-found.png";
import { FaChevronUp, FaChevronDown, FaArrowLeft } from "react-icons/fa";
import { IoIosAdd } from "react-icons/io";

/*

1. Once back button is done, we will probably have an idea on how to handle searching
  no matter where the user is in the app.

*/

const useGameData = (slug) => {
	const [gameDetails, setGameDetails] = useState();
	const [gameDetailsError, setGameDetailsError] = useState(false);
	const [gameImages, setGameImages] = useState();
	const [gameImagesError, setGameImagesError] = useState(false);
	useEffect(() => {
		const getGameInfo = () => {
			// Fetches game details
			fetchGameDetails(slug)
				.then((data) => {
					setGameDetails(data);
				})
				.catch((error) => {
					setGameDetailsError(true);
					console.error("Game Details Error: ", error);
				});

			// Fetches screenshots for the game
			fetchGameImages(slug)
				.then((data) => {
					setGameImages(data);
				})
				.catch((error) => {
					setGameImagesError(true);
					console.error("Game Images Error: ", error);
				});
		};
		getGameInfo();
	}, [slug]);
	return { gameDetails, gameDetailsError, gameImages, gameImagesError };
};

export default function GameDetailsPage() {
	const { slug } = useParams();
	const { gameDetails, gameDetailsError, gameImages, gameImagesError } =
		useGameData(slug);
	const [isExpanded, setIsExpanded] = useState(false);
	const navigate = useNavigate();

	/*
  + Generates markup for list data such as platforms, developers, and 
    publishers.
  */
	const generateListMarkup = (labelText, itemList) => {
		if (!itemList.length || !itemList) {
			return <p>{`${labelText}: N/A`}</p>;
		}
		const markup = itemList.map((item, index) => {
			if (index === itemList.length - 1) {
				return `${item}.`;
			} else {
				return `${item}, `;
			}
		});
		return (
			<p>
				{labelText}: {markup}
			</p>
		);
	};

	const handleBackBtnClick = () => {
		navigate("/browse");
	};

	return (
		<div className="game-details-page">
			<header className="game-details-header tw-mb-3">
				<button
					onClick={handleBackBtnClick}
					className="tw-flex tw-items-center tw-gap-x-2">
					<FaArrowLeft />
					<span className="tw-text-xl">Back to Harbor</span>
				</button>
				<h1 className="tw-text-3xl md:tw-text-5xl">
					{gameDetails && gameDetails.name}
				</h1>
			</header>
			<main className="game-details-main">
				{gameDetails && gameImages ? (
					<>
						<div className="game-image-section">
							{gameDetails.background_image === notFoundImg ? (
								<img
									className="tw-h-full"
									src={gameDetails.background_image}
									alt="Game Images Not Found"
								/>
							) : (
								<Carousel
									images={[gameDetails.background_image, ...gameImages]}
								/>
							)}
						</div>
						<div className="game-details-sidebar">
							<div className="game-info">
								<div className="game-info-top">
									<h1 className="tw-mb-2 tw-text-xl tw-font-bold tw-text-white">
										Description
									</h1>
									<p>{gameDetails.description}</p>
								</div>
								<div className={`game-info-bottom ${isExpanded && "open"}`}>
									<div className="flow-div">
										<span>
											Website:{" "}
											{gameDetails.website ? (
												<a
													href={gameDetails.website}
													target="_blank"
													rel="noreferrer">
													{gameDetails.website}
												</a>
											) : (
												"N/A"
											)}
										</span>
										{generateListMarkup("Platforms", gameDetails.platforms)}
										{generateListMarkup("Genres", gameDetails.genres)}
										{generateListMarkup("Developers", gameDetails.developers)}
										{generateListMarkup("Publishers", gameDetails.publishers)}
									</div>

									<button onClick={() => setIsExpanded((state) => !state)}>
										{isExpanded ? (
											<>
												<FaChevronUp />
												<span>Less</span>
											</>
										) : (
											<>
												<FaChevronDown />
												<span>More</span>
											</>
										)}
									</button>
								</div>
							</div>

							<button className="tw-flex tw-justify-between tw-rounded-lg tw-bg-gray-800 tw-px-6 tw-py-4 tw-text-2xl">
								<span>{gameDetails.price}</span>
								<div className="tw-flex tw-items-center">
									<IoIosAdd />
									<span>Add to cart</span>
								</div>
							</button>
						</div>
					</>
				) : gameDetailsError || gameImagesError ? (
					<div className="position-centered">
						<p>Oops! Error getting game details or its images!</p>
						<p>
							Try again later or go back to{" "}
							<span
								className="tw-cursor-pointer tw-underline"
								onClick={() => navigate("/browse")}>
								browsing page
							</span>
						</p>
					</div>
				) : (
					<div className="position-centered">
						<p>Loading Game Info...</p>
					</div>
				)}
			</main>
		</div>
	);
}
