export default function LoginPage() {
	return (
		<div className="form-container tw-w-1/2 md:tw-w-1/3 tw-py-6 tw-px-4">
			<form id="login-form">
				<div className="tw-flex tw-flex-col tw-gap-y-3 tw-mb-4">
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
						className="tw-py-3 tw-rounded-md tw-text-white tw-bg-blue-500 tw-font-bold"
						type="submit">
						Log In
					</button>
					<a href="#">Forgot Password?</a>
				</div>
				<hr></hr>
				<div className="tw-mt-3 tw-flex tw-justify-center">
					<button className="tw-text-white tw-rounded-md tw-px-5 tw-py-3 tw-font-bold tw-bg-emerald-500">
						Create New Account
					</button>
				</div>
			</form>
		</div>
	);
}
