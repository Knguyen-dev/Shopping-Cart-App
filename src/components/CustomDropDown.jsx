import { Box, Button, Menu, MenuItem, Typography } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import { useState } from "react";
import PropTypes from "prop-types";

/*
+ CustomDropDown: A custom dropdown component that's created
  using a combination of mui and tailwind css.
*/

export default function CustomDropDown({
	dropDownOptions,
	currentOption,
	setOption,
	onDropDownChange,
}) {
	const [anchorEl, setAnchorEl] = useState(null);
	const open = Boolean(anchorEl);

	const handleOpenMenu = (e) => {
		setAnchorEl(e.target);
	};

	// Handles menu item click
	const handleDropDownChange = (optionObj) => {
		onDropDownChange(optionObj, setOption);
		setAnchorEl(null);
	};

	return (
		<Box className="dropdown">
			{/* Button that shows current option picked in dropdown */}
			<Button variant="contained" onClick={handleOpenMenu}>
				<Typography variant="span" className="tw-mr-1">
					{dropDownOptions.dropDownTitle}:
				</Typography>
				<Typography variant="span" fontWeight={700}>
					{currentOption.optionTitle}
				</Typography>
			</Button>

			{/* Menu drop down itself */}
			<Menu anchorEl={anchorEl} open={open} onClose={() => setAnchorEl(null)}>
				{dropDownOptions.options.map((optionObj, index) => {
					return (
						<MenuItem
							key={index}
							onClick={() => handleDropDownChange(optionObj)}
							className="tw-gap-x-3">
							<Typography variant="span">{optionObj.optionTitle}</Typography>
							{currentOption.optionTitle === optionObj.optionTitle && (
								<CheckIcon className="tw-ml-auto" />
							)}
						</MenuItem>
					);
				})}
			</Menu>
		</Box>
	);
}
CustomDropDown.propTypes = {
	dropDownOptions: PropTypes.shape({
		dropDownTitle: PropTypes.string.isRequired,
		options: PropTypes.arrayOf(
			PropTypes.shape({
				optionTitle: PropTypes.string.isRequired,
				searchParams: PropTypes.object.isRequired,
			})
		).isRequired,
	}),
	currentOption: PropTypes.shape({
		optionTitle: PropTypes.string.isRequired,
		searchParams: PropTypes.object.isRequired,
	}),
	setOption: PropTypes.func,
	onDropDownChange: PropTypes.func,
};
