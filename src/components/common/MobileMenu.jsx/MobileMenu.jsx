import { Button, Menu, MenuItem, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import PropTypes from "prop-types";

export default function MobileMenu({ menuLinks }) {
	const navigate = useNavigate();

	// Toggles whether we have collapsed or hidden our mobile menu
	const [anchorEl, setAnchorEl] = useState(null);
	const open = Boolean(anchorEl);

	const handleOpenMenu = (e) => {
		setAnchorEl(e.target);
	};

	/*
  + Handles when you click a menu item. For our 
  mobile menu, clicking a menu item will close the menu and
  route the user to where that menu link dictates
  */
	const handleItemClick = (route) => {
		navigate(route);
		setAnchorEl(null);
	};

	return (
		<Box>
			<Button variant="outlined" size="large" onClick={handleOpenMenu}>
				Menu
			</Button>
			<Menu
				color="secondary"
				anchorEl={anchorEl}
				open={open}
				onClose={() => setAnchorEl(null)}>
				{menuLinks.map((item) => (
					<MenuItem key={item.id} onClick={() => handleItemClick(item.route)}>
						{item.content}
					</MenuItem>
				))}
			</Menu>
		</Box>
	);
}

MobileMenu.propTypes = {
	menuLinks: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.number,
			route: PropTypes.string,
		})
	),
};
