import { NavLink } from "react-router-dom";
import RegisterForm from "./components/RegisterForm";

export default function RegisterPage() {
	return (
		<div className="form-container tw-w-2/3 tw-rounded-md tw-px-4 tw-py-6 sm:tw-w-2/5">
			<h1 className="tw-mb-5 tw-text-xl">Sign up Today!</h1>
			<RegisterForm />
			<div className="tw-flex tw-flex-col tw-gap-y-2">
				<span>
					Already have an account? <NavLink to="/auth/login">Sign In</NavLink>
				</span>
				<hr></hr>
				<span className="tw-text-sm">
					By clicking Sign Up, you agree to our <a href="#">Terms</a>.
					<a href="#"> Privacy Policy</a> and <a href="#">Cookies Policy</a>.
					Just kidding, this means absolutely nothing and does not matter.
				</span>
			</div>
		</div>
	);
}
