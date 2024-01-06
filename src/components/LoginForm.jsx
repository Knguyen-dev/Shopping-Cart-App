import PropTypes from "prop-types";
import FloatingInput from "./FloatingInput";

/*
+ LoginForm: Component that represents the login form used on the 
  login page.
*/

export default function LoginForm({ onSubmit }) {
	return (
		<form id="login-form" onSubmit={onSubmit}>
			<div className="tw-mb-4 tw-flex tw-flex-col tw-gap-y-3">
				<FloatingInput
					labelText="Email:"
					id="login-email"
					type="email"
					placeholder="Email:"
					required={true}
				/>
				<FloatingInput
					labelText="Password:"
					id="login-password"
					type="password"
					placeholder="Password:"
					required={true}
				/>
				<button
					className="tw-rounded-md tw-bg-blue-500 tw-py-3 tw-font-bold tw-text-white"
					type="submit">
					Log In
				</button>
			</div>
		</form>
	);
}
LoginForm.propTypes = {
	onSubmit: PropTypes.func,
};
