import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";

import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";

const Search = styled("div")(() => ({
	display: "flex",
	alignItems: "center",
	width: "100%",
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
	padding: theme.spacing(0, 2),
	height: "100%",
	pointerEvents: "none",
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
}));

export default function BasicSearchBar({
	className,
	placeholder,
	value,
	onChange,
	required,
}) {
	return (
		<Search className={className}>
			<SearchIconWrapper>
				<SearchIcon />
			</SearchIconWrapper>

			<InputBase
				sx={{ color: "inherit" }}
				// Makes sure input fills all the remaining width of the 'Search' flex container
				className="tw-flex-auto"
				placeholder={placeholder}
				value={value}
				onChange={onChange}
				required={required}
			/>
		</Search>
	);
}
BasicSearchBar.propTypes = {
	className: PropTypes.string,
	placeholder: PropTypes.string,
	value: PropTypes.string,
	onChange: PropTypes.func,
	required: PropTypes.bool,
};
