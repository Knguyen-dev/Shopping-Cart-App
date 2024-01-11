import "../styles/NotFoundPage.css";
import { Box, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";
export default function NotFoundPage() {
	return (
		<div className="not-found-page">
			<Box className="tw-flex tw-h-full tw-flex-col tw-items-center tw-justify-center">
				<Typography variant="h1" className="tw-mb-6">
					Sorry we couldn&apos;t find that page!
				</Typography>
				<Typography variant="h4" className="">
					Return to the <NavLink to="/">home page</NavLink>!
				</Typography>
			</Box>
		</div>
	);
}
