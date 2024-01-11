import { useNavigate } from "react-router-dom";
import { Button, Typography, Container } from "@mui/material";
import "../styles/HomePage.css";

export default function HomePage() {
	const navigate = useNavigate();
	return (
		<div className="home-page">
			<Container maxWidth="md" className="tw-my-8">
				<Typography variant="h2" className="xs:max-sm:tw-text-3xl">
					Welcome to GamerCity
				</Typography>
				<Typography variant="p" className="tw-my-4 tw-block">
					Discover your favorite games. Not a real shop, but it imitates what a
					ecommerce site for games could look like. Feel free to look around
					though.
				</Typography>
				<Button
					variant="outlined"
					onClick={() => navigate("/browse")}
					color="info"
					size="large">
					Shop Now
				</Button>
			</Container>
		</div>
	);
}
