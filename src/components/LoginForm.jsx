import FloatingInput from "./FloatingInput";
export default function LoginForm() {
	return (
		<form id="login-form">
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
