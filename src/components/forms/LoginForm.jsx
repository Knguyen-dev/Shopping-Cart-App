import PropTypes from "prop-types";

import { TextField, Button } from "@mui/material";
import PasswordField from "../common/PasswordField/PasswordField";
import { useState } from "react";

/*
+ LoginForm: Component that represents the login form used on the 
  login page.
*/

const initialValues = {
	username: "",
	password: "",
};

export default function LoginForm({ onSubmit }) {
	const [formValues, setFormValues] = useState(initialValues);
	const [formErrors, setFormErrors] = useState({});

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormValues({ ...formValues, [name]: value });
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		const errors = validate(formValues);
		setFormErrors(errors);
		if (Object.keys(errors).length === 0) {
			onSubmit(e);
		}
	};

	const validate = (values) => {
		const errors = {};
		if (!values.username) {
			errors.username = "Username is required!";
		}
		if (!values.password) {
			errors.password = "Password is required!";
		}
		return errors;
	};

	return (
		<form id="login-form" noValidate onSubmit={handleSubmit}>
			<div className="tw-mb-4 tw-flex tw-flex-col tw-gap-y-3">
				<TextField
					name="username"
					label="Username"
					variant="outlined"
					placeholder="Username"
					onChange={handleChange}
					value={formValues.username}
					error={formErrors.username ? true : false}
					helperText={formErrors.username && formErrors.username}
					required
				/>

				<PasswordField
					name="password"
					label="Password"
					variant="outlined"
					placeholder="Password"
					onChange={handleChange}
					value={formValues.password}
					error={formErrors.password ? true : false}
					helperText={formErrors.password && formErrors.password}
					required
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
