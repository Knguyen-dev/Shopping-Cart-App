/*
+ RegisterForm: Registration form component used in user registration page.
*/
import { TextField, Button } from "@mui/material";
import PasswordField from "./common/PasswordField/PasswordField";

// import { useState } from "react";
export default function RegisterForm() {
	return (
		<form id="sign-up-form">
			<div className="tw-mb-4 tw-flex tw-flex-col tw-gap-y-3">
				<TextField
					name="full-name"
					placeholder="Full Name"
					label="Full Name"
					variant="outlined"
					required
				/>
				<TextField
					type="email"
					name="email"
					placeholder="Email"
					label="Email"
					variant="outlined"
					required
				/>
				<PasswordField
					variant="outlined"
					name="password"
					placeholder="Password"
					label="Password"
				/>
				<TextField
					type="password"
					name="confirm-password"
					placeholder="Confirm Password"
					label="Confirm Password"
					variant="outlined"
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
