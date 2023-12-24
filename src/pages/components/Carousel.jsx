import { useState } from "react";
import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";
import "../../styles/Carousel.css";

export default function Carousel({ items }) {
	const [slideIndex, setSlideIndex] = useState(0);

	const decrementSlide = () => {
		let newIndex = slideIndex - 1;
		if (newIndex < 0) {
			newIndex = items.length - 1;
		}
		setSlideIndex(newIndex);
	};

	const incrementSlide = () => {
		let newIndex = slideIndex + 1;
		if (newIndex > items.length - 1) {
			newIndex = 0;
		}
		setSlideIndex(newIndex);
	};

	return (
		<div className="carousel">
			<button onClick={decrementSlide} className="carousel-btn prev">
				&#8656;
			</button>
			<button onClick={incrementSlide} className="carousel-btn next">
				&#8658;
			</button>
			<ul>
				{items.map((item, index) => {
					return (
						<li
							key={index}
							className={`slide ${slideIndex === index && "active"}`}>
							<div className="dark-overlay">
								<div className="game-info ">
									<h1 className="game-title tw-text-5xl">{item.title}</h1>

									<p className="tw-my-4">{item.details}</p>

									<div className="tw-flex tw-flex-col tw-justify-start tw-gap-y-2">
										<h2>Platforms: {item.platforms}</h2>
										<h2>Price: {item.price}</h2>
										<div className="tw-flex tw-justify-center tw-gap-x-8">
											<NavLink to="/game-page/some_game">Visit</NavLink>
											<button className="">Add To Cart</button>
										</div>
									</div>
								</div>
							</div>
							<img src={item.img} />
						</li>
					);
				})}
			</ul>
		</div>
	);
}
Carousel.propTypes = {
	items: PropTypes.arr,
};
