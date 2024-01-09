import LoginForm from "../../components/LoginForm";
import { useAuthContext } from "../ContextProviders/hooks/useAuthContext";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

export default function LoginPage() {
	const auth = useAuthContext();
	const navigate = useNavigate();
	return (
		<div>
			{/* Login form itself */}
			<LoginForm onSubmit={auth.onLogin} />

			{/* Bottom section contining extra extra links */}
			<div className="tw-flex tw-flex-col tw-gap-y-2 tw-text-center">
				<a href="#">Forgot Password?</a>
				<hr></hr>
				<Button
					onClick={() => navigate("/auth")}
					variant="contained"
					color="success"
					className="tw-self-center tw-py-3 tw-font-bold">
					Create New Account
				</Button>
			</div>
		</div>
	);
}
