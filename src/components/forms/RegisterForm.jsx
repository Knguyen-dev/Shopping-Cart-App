/*
+ RegisterForm: Registration form component used in user registration page.
*/
import { TextField, Button } from "@mui/material";
import PasswordField from "../common/PasswordField/PasswordField";
import { useState } from "react";
// keys should match the name attribute of the input fields.
const initialValues = {
	username: "",
	email: "",
	password: "",
	confirmPassword: "",
};

export default function RegisterForm() {
	const [formValues, setFormValues] = useState(initialValues);
	const [formErrors, setFormErrors] = useState({});

	// Logic for handling a successful submission
	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormValues({ ...formValues, [name]: value });
	};

	// Handles form submission
	const handleSubmit = (e) => {
		e.preventDefault();
		const errors = validate(formValues);
		setFormErrors(errors);
		if (Object.keys(errors).length === 0) {
			console.log("Successful Registration");
		}
	};

	// Validation function where we create our tests and error messages
	const validate = (values) => {
		const errors = {};
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

		if (!values.username) {
			errors.username = "Username is required!";
		}
		if (!values.email) {
			errors.email = "Email is required!";
		} else if (!emailRegex.test(values.email)) {
			errors.email = "Not a valid email format!";
		}

		if (!values.password) {
			errors.password = "Password is required!";
		} else if (values.password.length < 4) {
			errors.password = "Password must be at least four characters!";
		}

		if (!values.confirmPassword) {
			errors.confirmPassword = "Retype your password!";
		} else if (values.password !== values.confirmPassword) {
			errors.confirmPassword = "Passwords must match!";
		}

		// Return errors object, which will update the formErrors when we submit
		return errors;
	};

	return (
		<form id="sign-up-form" noValidate onSubmit={handleSubmit}>
			<div className="tw-mb-4 tw-flex tw-flex-col tw-gap-y-3">
				<TextField
					name="username"
					placeholder="Username"
					label="Username"
					variant="outlined"
					value={formValues.username}
					onChange={handleChange}
					error={formErrors.username ? true : false}
					helperText={formErrors.username && formErrors.username}
					required
				/>
				<TextField
					type="email"
					name="email"
					placeholder="Email"
					label="Email"
					variant="outlined"
					value={formValues.email}
					onChange={handleChange}
					error={formErrors.email ? true : false}
					helperText={formErrors.email && formErrors.email}
					required
				/>
				<PasswordField
					variant="outlined"
					name="password"
					placeholder="Password"
					label="Password"
					value={formValues.password}
					onChange={handleChange}
					error={formErrors.password ? true : false}
					helperText={formErrors.password && formErrors.password}
					required
				/>
				<TextField
					type="password"
					name="confirmPassword"
					placeholder="Confirm Password"
					label="Confirm Password"
					variant="outlined"
					value={formValues.confirmPassword}
					onChange={handleChange}
					error={formErrors.confirmPassword ? true : false}
					helperText={formErrors.confirmPassword && formErrors.confirmPassword}
					required
				/>
				<Button
					variant="contained"
					type="Submit"
					className="tw-py-3 tw-font-bold">
					Create Account
				</Button>
			</div>
		</form>
	);
}
