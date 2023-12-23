/* eslint-disable react/prop-types */

import PropTypes from "prop-types";
export default function Card({ cardImg, cardTitle, cardText }) {
	return (
		<div className="card" style={{ width: "22rem" }}>
			<img src={cardImg} className="card-img-top" alt="..." />
			<div className="card-body">
				<h5 className="card-title">{cardTitle}</h5>
				<p className="card-text">{cardText}</p>
				<a href="#" className="btn btn-primary">
					Go somewhere
				</a>
			</div>
		</div>
	);
}
Card.propTypes = {
	cardImg: PropTypes.string,
	cardTitle: PropTypes.string,
	cardText: PropTypes.string,
};
