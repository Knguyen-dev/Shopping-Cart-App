import { useState } from "react";
import PropTypes from "prop-types";
import "../styles/Carousel.css";

export default function Carousel({ images }) {
	const [slideIndex, setSlideIndex] = useState(0);

	const decrementSlide = () => {
		let newIndex = slideIndex - 1;
		if (newIndex < 0) {
			newIndex = images.length - 1;
		}
		setSlideIndex(newIndex);
	};

	const incrementSlide = () => {
		let newIndex = slideIndex + 1;
		if (newIndex > images.length - 1) {
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
			<div className="carousel-indicators">
				{images.map((_, index) => (
					<button
						key={index}
						className={`carousel-indicator ${slideIndex === index && "active"}`}
						onClick={() => setSlideIndex(index)}>
						{index + 1}
					</button>
				))}
			</div>
			<ul>
				{images.map((img, index) => {
					return (
						<li
							key={index}
							className={`slide ${slideIndex === index && "active"}`}>
							<img src={img} />
						</li>
					);
				})}
			</ul>
		</div>
	);
}
Carousel.propTypes = {
	images: PropTypes.array,
};
