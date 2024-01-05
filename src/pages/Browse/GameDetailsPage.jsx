import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { fetchGameDetails, fetchGameImages } from "../utilities/requests";
import Carousel from "../../components/Carousel";
import "../../styles/GameDetailsPage.css";
import notFoundImg from "../../assets/images/image-not-found.png";
import { FaChevronUp, FaChevronDown, FaArrowLeft } from "react-icons/fa";
import { FaCheck, FaPlus } from "react-icons/fa6";
import { useCartContext } from "../utilities/hooks";
import { useAuthContext } from "../ContextProviders/AuthProvider";

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

/* 
+ NOTE: We can treat 'gameDetails' as the same as gameObj, as this object just 
has more information. Of course in a real world situation we'd probably just 
query our item from a database, but since this is just a mock application, 
doing this is acceptable even if the objects aren't the same.
*/

export default function GameDetailsPage() {
	const { slug } = useParams();
	const { gameDetails, gameDetailsError, gameImages, gameImagesError } =
		useGameData(slug);
	const [isExpanded, setIsExpanded] = useState(false);
	const navigate = useNavigate();
	const auth = useAuthContext();
	const shoppingCart = useCartContext();

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

	// Handles routing users to the browse page, acting as a "go back to previous page" button
	const handleBackBtnClick = () => {
		navigate("/browse");
	};

	// If either has an error, we don't show content for the page
	if (gameDetailsError || gameImagesError) {
		return (
			<div className="tw-flex tw-h-full tw-flex-col tw-items-center tw-justify-center tw-text-center tw-text-3xl">
				<p>Oops! Error getting game details or its images!</p>
				<p>
					Try again later or go back to{" "}
					<span
						className="tw-cursor-pointer tw-underline"
						onClick={() => navigate("/browse")}>
						browsing page!
					</span>
				</p>
			</div>
		);
	} else if (!gameDetails || !gameImages) {
		// Wait until we have both until we can render
		return (
			<div className="tw-flex tw-h-full tw-flex-col tw-items-center tw-justify-center tw-text-center tw-text-3xl">
				<p>Loading Game Details...</p>
			</div>
		);
	}

	return (
		<div className="tw-px-12 tw-py-4 tw-text-white">
			{/* Header that has game title and back button link */}
			<header className="tw-mb-3 tw-flex tw-flex-col tw-items-center tw-justify-between tw-font-bold md:tw-flex-row">
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

			{/* Main content for game details page */}
			<main className="tw-flex tw-flex-col tw-gap-4 md:tw-flex-row">
				{/* Game Image section: if background image doesn't exist, we'll just not 
          render the carousel. */}
				<div className="game-image-section">
					{gameDetails.background_image === notFoundImg ? (
						<img
							className="tw-h-full"
							src={gameDetails.background_image}
							alt="Game Images Not Found"
						/>
					) : (
						<Carousel images={[gameDetails.background_image, ...gameImages]} />
					)}
				</div>

				{/* Game details sidebar */}
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

							{/* Toggle button for expanding game info section */}
							<button
								className="tw-ml-auto tw-flex tw-items-center tw-gap-x-2 tw-text-lg"
								onClick={() => setIsExpanded((state) => !state)}>
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

					{/* Add to cart button. Same logic as in BrowsePage, check if authenticated before letting
            user add the item to their cart */}
					<button
						className="tw-flex tw-justify-between tw-rounded-lg tw-bg-gray-800 tw-px-6 tw-py-4 tw-text-2xl"
						onClick={() => {
							if (!auth.token) {
								navigate("/auth/login", {
									state: { from: location.pathname },
								});
							} else {
								shoppingCart.handleCartClick(gameDetails);
							}
						}}>
						<span>${gameDetails.price}</span>
						<div className="tw-flex tw-items-center tw-gap-x-2">
							{shoppingCart.isInCart(gameDetails.id) ? (
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
						</div>
					</button>
				</div>
			</main>
		</div>
	);
}
