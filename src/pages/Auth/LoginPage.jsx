import LoginForm from "../../components/LoginForm";
import { useAuthContext } from "../ContextProviders/AuthProvider";
import { NavLink } from "react-router-dom";

export default function LoginPage() {
	const auth = useAuthContext();
	return (
		<div className="tw-w-1/2 tw-px-4 tw-py-6 md:tw-w-1/3">
			{/* Login form itself */}
			<LoginForm onSubmit={auth.onLogin} />

			{/* Bottom section contining extra extra links */}
			<div className="tw-flex tw-flex-col tw-gap-y-2">
				<a href="#">Forgot Password?</a>
				<hr></hr>
				<div className="tw-self-center tw-rounded-md tw-bg-emerald-500 tw-px-5 tw-py-3 tw-font-bold tw-text-white">
					<NavLink to="/auth/register">Create New Account</NavLink>
				</div>
			</div>
		</div>
	);
}
