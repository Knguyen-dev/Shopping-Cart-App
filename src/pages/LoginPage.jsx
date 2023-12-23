import FloatingInput from "./components/FloatingInput";
import { NavLink } from "react-router-dom";
export default function LoginPage() {
	return (
		<div className="form-container tw-w-1/2 tw-px-4 tw-py-6 md:tw-w-1/3">
			<form id="login-form">
				<div className="tw-mb-4 tw-flex tw-flex-col tw-gap-y-3">
          <FloatingInput labelText="Email:" id="login-email" type="email" placeholder="Email:" required={true}/>
					<FloatingInput labelText="Password:" id="login-password" type="password" placeholder="Password:" required={true}/>
					
					<button
						className="tw-rounded-md tw-bg-blue-500 tw-py-3 tw-font-bold tw-text-white"
						type="submit">
						Log In
					</button>
					<a>Forgot Password?</a>
				</div>
				<hr></hr>
				<div className="tw-mt-3 tw-flex tw-justify-center">

					<div className="tw-rounded-md tw-bg-emerald-500 tw-px-5 tw-py-3 tw-font-bold tw-text-white">
						<NavLink to="/auth/register">Create New Account</NavLink>
					</div>
				</div>
			</form>
		</div>
	);
}
