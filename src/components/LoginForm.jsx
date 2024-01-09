import PropTypes from "prop-types";

import { TextField, Button } from "@mui/material";
import PasswordField from "./common/PasswordField/PasswordField";
/*
+ LoginForm: Component that represents the login form used on the 
  login page.
*/

export default function LoginForm({ onSubmit }) {
	return (
		<form id="login-form" onSubmit={onSubmit}>
			<div className="tw-mb-4 tw-flex tw-flex-col tw-gap-y-3">
				<TextField
					name="email"
					label="Email"
					variant="outlined"
					placeholder="Email"
					required
				/>

				<PasswordField
					name="password"
					label="Password"
					variant="outlined"
					placeholder="Password"
				/>

				<Button
					variant="contained"
					type="submit"
					color="primary"
					className="tw-py-3 tw-font-bold">
					Log In
				</Button>
			</div>
		</form>
	);
}
LoginForm.propTypes = {
	onSubmit: PropTypes.func,
};
