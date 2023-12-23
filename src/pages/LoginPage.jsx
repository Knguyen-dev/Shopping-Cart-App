import { NavLink } from "react-router-dom";
export default function LoginPage() {
	return (
		<div className="form-container tw-w-1/2 tw-px-4 tw-py-6 md:tw-w-1/3">
			<form id="login-form">
				<div className="tw-mb-4 tw-flex tw-flex-col tw-gap-y-3">
					<div className="form-floating">
						<input
							type="email"
							id="login-email"
							placeholder="Email:"
							className="form-control"
							required
						/>
						<label htmlFor="login-email" className="form-label">
							Email
						</label>
					</div>
					<div className="form-floating">
						<input
							type="password"
							id="login-password"
							placeholder="Password:"
							className="form-control"
						/>
						<label htmlFor="login-password" className="form-label">
							Password
						</label>
					</div>
					<button
						className="tw-rounded-md tw-bg-blue-500 tw-py-3 tw-font-bold tw-text-white"
						type="submit">
						Log In
					</button>
					<NavLink to="/auth/register">Forgot Password?</NavLink>
				</div>
				<hr></hr>
				<div className="tw-mt-3 tw-flex tw-justify-center">
					<button className="tw-rounded-md tw-bg-emerald-500 tw-px-5 tw-py-3 tw-font-bold tw-text-white">
						Create New Account
					</button>
				</div>
			</form>
		</div>
	);
}
