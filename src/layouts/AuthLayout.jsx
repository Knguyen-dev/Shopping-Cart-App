import { Footer } from "./AppLayout";
import { Outlet } from "react-router";

import { Typography, Grid } from "@mui/material";
import "../styles/AuthLayout.css";

// Layout for the auth section for our website.
export default function AuthLayout() {
	return (
		<div className="tw-flex tw-min-h-screen tw-flex-col">
			<Grid
				container
				className="tw-mb-4 tw-flex-auto tw-items-center tw-justify-center md:tw-gap-x-2">
				<Grid
					xs={12}
					md={4}
					item
					// Basically on 0 to medium, margin top auto, but anything above no margin top
					className="tw-text-center xs:max-md:tw-mt-auto">
					<Typography variant="h2">GamerCity</Typography>
					<Typography variant="p">
						Connect with gamers around the world!
					</Typography>
				</Grid>
				<Grid xs={8} md={4} item>
					<Outlet />
				</Grid>
			</Grid>
			<Footer />
		</div>
	);
}
