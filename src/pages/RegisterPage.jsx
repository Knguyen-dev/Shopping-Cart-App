export default function RegisterPage() {
	return (
		<div className="form-container tw-w-1/2 md:tw-w-1/3 tw-py-6 tw-px-4 tw-rounded-md">
			<h1 className="tw-mb-5 tw-text-xl">Sign up Today!</h1>
			<form id="sign-up-form">
				<div className="tw-flex tw-flex-col tw-gap-y-3 tw-mb-4">
					<div className="form-floating">
						<input
							type="text"
							id="full-name"
							placeholder="Full Name:"
							className="form-control"
							required
						/>
						<label htmlFor="full-name" className="form-label">
							Full Name:
						</label>
					</div>

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
							id="password"
							placeholder="Password:"
							className="form-control"
							required
						/>
						<label htmlFor="password" className="form-label">
							Password:
						</label>
					</div>

					<div className="form-floating">
						<input
							type="password"
							id="confirm-password"
							placeholder="Confirm Password:"
							className="form-control"
							required
						/>
						<label htmlFor="confirm-password" className="form-label">
							Confirm Password:
						</label>
					</div>

					<button
						className="tw-py-3 tw-rounded-md tw-text-white tw-bg-blue-500 tw-font-bold"
						type="submit">
						Create account
					</button>
					<span>
						Already have an account? <a href="#">Sign in</a>
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
