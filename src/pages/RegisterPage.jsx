import { NavLink } from "react-router-dom";
import FloatingInput from "./components/FloatingInput";

export default function RegisterPage() {
	return (
		<div className="form-container tw-w-2/3 tw-rounded-md tw-px-4 tw-py-6 sm:tw-w-2/5">
			<h1 className="tw-mb-5 tw-text-xl">Sign up Today!</h1>
			<form id="sign-up-form">
				<div className="tw-mb-4 tw-flex tw-flex-col tw-gap-y-3">
			
          <FloatingInput type="text" id="full-name" placeholder="Full Name:" labelText="Full Name:" />
          <FloatingInput type="email" id="login-email" placeholder="Email:" labelText="Email:" />
          <FloatingInput type="password" id="login-password" placeholder="Password:" labelText="Password:" />
          <FloatingInput type="password" id="confirm-login-password" placeholder="Retype Password:" labelText="Retype Password:" />

          
					<button
						className="tw-rounded-md tw-bg-blue-500 tw-py-3 tw-font-bold tw-text-white"
						type="submit">
						Create account
					</button>
					<span>
						Already have an account? <NavLink to="/auth/login">Sign In</NavLink>
					</span>
				</div>
				<hr></hr>

				<span className="tw-text-sm">
					By clicking Sign Up, you agree to our <a href="#">Terms</a>.
					<a href="#"> Privacy Policy</a> and <a href="#">Cookies Policy</a>.
					Just kidding, this means absolutely nothing and does not matter.
				</span>
			</form>
		</div>
	);
}
