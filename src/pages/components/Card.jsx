/* eslint-disable react/prop-types */

// Card for games
import PropTypes from "prop-types";
export default function Card({ item, cardSize }) {
	return (
		<div className="card tw-shadow-lg" style={{ width: `${cardSize}px` }}>
			<img src={item.img} className="card-img-top" alt="..." />
			<div className="card-body tw-bg-indigo-500 tw-text-white tw-flex tw-flex-col tw-gap-y-2">

        <div className="">
          <h5 className="card-title tw-text-xl">{item.title}</h5>
          <p className="card-text">{item.price}</p>
        </div>
        
        <p>{item.platforms}</p>

        <div className="card-actions tw-flex tw-gap-x-2 tw-text-center">
          <a href="#" className="tw-bg-indigo-700 tw-text-teal-300 tw-flex-1 tw-py-3">
            Visit
          </a>
          <a href="#" className="tw-bg-indigo-700 tw-text-teal-300 tw-flex-1 tw-py-3">
            Add To Cart
          </a>
        </div>
			</div>
		</div>
	);
}
Card.propTypes = {
	cardImg: PropTypes.string,
	cardTitle: PropTypes.string,
	cardText: PropTypes.string,
};
