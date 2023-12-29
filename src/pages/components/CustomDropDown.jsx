/*
+ Component for creating our custom dropdown
- Parameters:
1. dropDownOptions: An object that has information on how to build the drop down
2. currentOption: A given object in dropDownOptions.options that details information on 
    an object in the drop down
3. setOption: State setter function that tracks the currently selected/active option in the drop down
4. searchParams: The current search parameters being used to query games.
5. handleSearch: The function used to query games when passed some searched parameters.

- dropDownOptions.options.map: Here we iterate through the array of 
  option objects to create the markup and logic for the functioning drop down items.
- handleDropDownChange: When an item is selected in a drop down it, we 
  may add, remove, or modify only the parameter that the drop down is responsible for, while
  leaving all other parameters the same.
1. Get our current search parameters with the searchParams object, but as a shallow copy.
2. Iterate through every key-value pair in an option object's 'searchParams' object,
    which is just a map containing the search parameters that will be applied when clicking
    on that option. 
  - If the value exists, we will add or overwrite the current searchParam's parameter
    with the new value.
  - Else, the value doesn't exist (null), which us our way of letting the user deselect
    any filter or option in the drop down. With this, we will just remove the drop down's 
    parameter from our search parameters to ensure that it doesn't affect the final fetch.
3. Finally set the state to represent the current drop down item being selected and then
    make the fetch request with our new parameters.

NOTE: In JavaScript shallow copying an object creates a new object with separate references
      to the top-level keys and values only. Meaning changing these top-level key-value pairs don't 
      affect the key-value pairs of the original. So for a simple map of that contains simple
      primitive data types and no nesting, it won't directly affect our state value.
*/

import PropTypes from "prop-types";
import { FaCheck } from "react-icons/fa";
export default function CustomDropDown({
	dropDownOptions,
	currentOption,
	setOption,
	handleDropDownChange,
}) {
	return (
		<div className="custom-drop-down dropdown">
			<button
				className="dropdown-toggle"
				type="button"
				data-bs-toggle="dropdown"
				aria-expanded="false">
				{dropDownOptions.dropDownTitle}:{" "}
				<strong>{currentOption.optionTitle}</strong>
			</button>
			<ul className="dropdown-menu">
				{dropDownOptions.options.map((optionObj, index) => {
					return (
						<li key={index}>
							<span
								className="dropdown-item"
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
