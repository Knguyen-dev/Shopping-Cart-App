import { useNavigate } from "react-router-dom";
import RegisterForm from "../../components/forms/RegisterForm";
import { Typography, Link, Box } from "@mui/material";
export default function RegisterPage() {
	const navigate = useNavigate();
	return (
		<Box className="tw-text-center">
			<Typography variant="h5" className="tw-my-4">
				Sign up Today!
			</Typography>
			<RegisterForm />
			<Box className="tw-flex tw-flex-col">
				<Typography
					variant="span"
					className="tw-flex tw-items-center tw-justify-center tw-gap-x-2">
					Already have an account?
					<Link
						component="button"
						underline="always"
						onClick={() => navigate("/auth/login")}>
						Sign In
					</Link>
				</Typography>

				<hr></hr>
				<Typography variant="span">
					By clicking Sign Up, you agree to our <a href="#">Terms</a>,
					<a href="#"> Privacy Policy</a>, and <a href="#">Cookies Policy</a>.
					Just kidding, this means absolutely nothing and does not matter.
				</Typography>
			</Box>
		</Box>
	);
}
