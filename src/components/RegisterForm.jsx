/*
+ RegisterForm: Registration form component used in user registration page.
*/
import FloatingInput from "./FloatingInput";
export default function RegisterForm() {
	return (
		<form id="sign-up-form">
			<div className="tw-mb-4 tw-flex tw-flex-col tw-gap-y-3">
				<FloatingInput
					type="text"
					id="full-name"
					placeholder="Full Name:"
					labelText="Full Name:"
				/>
				<FloatingInput
					type="email"
					id="login-email"
					placeholder="Email:"
					labelText="Email:"
				/>
				<FloatingInput
					type="password"
					id="login-password"
					placeholder="Password:"
					labelText="Password:"
				/>
				<FloatingInput
					type="password"
					id="confirm-login-password"
					placeholder="Retype Password:"
					labelText="Retype Password:"
				/>
				<button
					className="tw-rounded-md tw-bg-blue-500 tw-py-3 tw-font-bold tw-text-white"
					type="submit">
					Create account
				</button>
			</div>
		</form>
	);
}
