import PropTypes from "prop-types";
/*
+ CustomDropDown: A custom dropdown component that's created
  using a combinatio nof bootstarp and tailwind css.

*/

import { FaCheck } from "react-icons/fa";
export default function CustomDropDown({
	dropDownOptions,
	currentOption,
	setOption,
	handleDropDownChange,
}) {
	return (
		<div className="dropdown">
			{/* Button that shows current option picked in dropdown */}
			<button
				className="dropdown-toggle tw-flex tw-items-center tw-gap-x-1 tw-rounded-md tw-bg-white tw-px-4 tw-py-2 tw-text-black"
				type="button"
				data-bs-toggle="dropdown"
				aria-expanded="false">
				{dropDownOptions.dropDownTitle}:{" "}
				<strong>{currentOption.optionTitle}</strong>
			</button>
			{/* Create the list of drop down options */}
			<ul className="dropdown-menu">
				{dropDownOptions.options.map((optionObj, index) => {
					return (
						<li key={index}>
							<span
								className="dropdown-item hover:tw-to-black-10 tw-flex tw-items-center tw-justify-between tw-transition-all"
								onClick={() => handleDropDownChange(optionObj, setOption)}>
								{optionObj.optionTitle}{" "}
								{currentOption.optionTitle === optionObj.optionTitle && (
									<FaCheck />
								)}
							</span>
						</li>
					);
				})}
			</ul>
		</div>
	);
}
CustomDropDown.propTypes = {
	dropDownOptions: PropTypes.object,
	currentOption: PropTypes.object,
	setOption: PropTypes.func,
	handleDropDownChange: PropTypes.func,
};
