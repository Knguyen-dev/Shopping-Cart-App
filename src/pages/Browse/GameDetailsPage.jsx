import { Button, Box, Typography, Grid, Skeleton } from "@mui/material";

import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { fetchGameDetails, fetchGameImages } from "../utilities/requests";
import Carousel from "../../components/Carousel";
import "../../styles/GameDetailsPage.css";
import notFoundImg from "../../assets/images/image-not-found.png";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AddIcon from "@mui/icons-material/Add";
import CheckIcon from "@mui/icons-material/Check";

import { useCartContext } from "../ContextProviders/hooks/useCartContext.jsx";
import { useAuthContext } from "../ContextProviders/hooks/useAuthContext.jsx";

const useGameData = (slug) => {
	const [gameDetails, setGameDetails] = useState();
	const [detailsLoading, setDetailsLoading] = useState(true);
	const [gameDetailsError, setGameDetailsError] = useState(false);
	const [gameImages, setGameImages] = useState();
	const [imagesLoading, setImagesLoading] = useState(true);
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
				})
				.finally(() => {
					setDetailsLoading(false);
				});

			// Fetches screenshots for the game
			fetchGameImages(slug)
				.then((data) => {
					setGameImages(data);
				})
				.catch((error) => {
					setGameImagesError(true);
					console.error("Game Images Error: ", error);
				})
				.finally(() => {
					setImagesLoading(false);
				});
		};
		getGameInfo();
	}, [slug]);
	return {
		gameDetails,
		detailsLoading,
		gameDetailsError,
		gameImages,
		imagesLoading,
		gameImagesError,
	};
};

/* 
BOOK MARK: Done converting the flexbox to Mui grid.
1. Fix colors on browsing page

2. Fix the cart page

2. You could also change cart page to grid, but the flexbox format 
  that we did for it is pretty simple and it's better having minWidth.


3. After adding skeletons let's work on colors and theme toggling.
  We can probably use some preset theme colors like 'ochre' to play
  around with. I want to be able to get full control of how to do that.


+ NOTE: We can treat 'gameDetails' as the same as gameObj, as this object just 
has more information. Of course in a real world situation we'd probably just 
query our item from a database, but since this is just a mock application, 
doing this is acceptable even if the objects aren't the same.
*/

export default function GameDetailsPage() {
	const { slug } = useParams();
	const {
		gameDetails,
		detailsLoading,
		gameDetailsError,
		gameImages,
		imagesLoading,
		gameImagesError,
	} = useGameData(slug);
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
	}

	return (
		<div className="tw-px-12 tw-py-4 tw-text-white">
			{/* Header that has game title and back button link */}
			<header className="tw-mb-3 tw-flex tw-flex-col tw-items-center tw-justify-between tw-font-bold md:tw-flex-row">
				<Button
					variant="outlined"
					startIcon={<ArrowBackIcon />}
					onClick={handleBackBtnClick}>
					Back to Browsing
				</Button>

				{/* Name of the game, render skeleton while loading. */}
				<Typography
					variant="h4"
					className="tw-w-full tw-text-center xs:max-md:tw-my-4 md:tw-w-2/5 md:tw-text-end">
					{detailsLoading ? (
						<Skeleton sx={{ bgcolor: "grey.900", height: "75px" }} />
					) : (
						gameDetails.name
					)}
				</Typography>
			</header>

			{/* Main content for game details page */}
			<Grid container spacing={2} className="tw-justify-center">
				{/* Game Image section: if background image doesn't exist, we'll just not 
          render the carousel. */}
				<Grid item xs={12} md={8}>
					{
						// If loading render skeleton that represents the image carousel
						imagesLoading ? (
							<Skeleton
								variant="rectangular"
								sx={{ bgcolor: "grey.900" }}
								className="tw-h-full tw-min-h-80"
							/>
						) : // Else finished fetch, but no images found
						gameImages.length === 0 ? (
							<img
								className="tw-w-full"
								src={notFoundImg}
								alt="Game Images Not Found"
							/>
						) : (
							// Finished fetch and images were found
							<Carousel images={[...gameImages]} />
						)
					}
				</Grid>

				{/* Game details sidebar */}
				<Grid
					item
					xs={12}
					md={4}
					className="tw-flex tw-flex-col-reverse tw-gap-y-2 md:tw-flex-col">
					<Box className="game-info">
						{/* Description of game */}
						<Box className="game-info-top">
							<Typography
								variant="h5"
								className="tw-mb-2 tw-font-bold tw-text-white">
								Description
							</Typography>
							{/* Render skeletons to imitate description while loading */}
							<Typography variant="p">
								{detailsLoading ? (
									<>
										<Skeleton variant="text" sx={{ bgcolor: "grey.900" }} />
										<Skeleton variant="text" sx={{ bgcolor: "grey.900" }} />
										<Skeleton variant="text" sx={{ bgcolor: "grey.900" }} />
										<Skeleton variant="text" sx={{ bgcolor: "grey.900" }} />
										<Skeleton variant="text" sx={{ bgcolor: "grey.900" }} />
									</>
								) : (
									gameDetails.description
								)}
							</Typography>
						</Box>
						{/* More info section, only render markup when we finish loading */}
						{!detailsLoading && (
							<Box className={`game-info-bottom ${isExpanded && "open"}`}>
								<Box className="flow-div">
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
								</Box>
								{/* Toggle button for expanding game info section */}
								<Button
									variant="contained"
									color="secondaryDark"
									onClick={() => setIsExpanded((state) => !state)}
									startIcon={
										isExpanded ? <ExpandLessIcon /> : <ExpandMoreIcon />
									}
									disabled={detailsLoading}
									className="tw-ml-auto">
									{isExpanded ? "Less" : "More"}
								</Button>
							</Box>
						)}
					</Box>

					{/* Add to cart button. Same logic as in BrowsePage, check if authenticated before letting
            user add the item to their cart. Render skeleton while loading */}
					{detailsLoading ? (
						<Skeleton sx={{ bgcolor: "grey.900", height: "50px" }} />
					) : (
						<Button
							variant="contained"
							className="tw-w-full tw-py-4"
							disabled={detailsLoading}
							color="secondaryDark"
							onClick={() => {
								if (!auth.token) {
									navigate("/auth/login", {
										state: { from: location.pathname },
									});
								} else {
									shoppingCart.handleCartClick(gameDetails);
								}
							}}>
							<Typography variant="span">${gameDetails.price}</Typography>
							<Box className="tw-ml-auto tw-flex tw-items-end">
								{shoppingCart.isInCart(gameDetails.id) ? (
									<>
										<CheckIcon />
										<Typography>Added</Typography>
									</>
								) : (
									<>
										<AddIcon />
										<Typography>Add to cart</Typography>
									</>
								)}
							</Box>
						</Button>
					)}
				</Grid>
			</Grid>
		</div>
	);
}
