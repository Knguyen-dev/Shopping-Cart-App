import { Navigate, useLocation } from "react-router-dom";
import { useAuthContext } from "../pages/ContextProviders/AuthProvider";
import PropTypes from "prop-types";
export default function ProtectedRoute({ children }) {
	const { token } = useAuthContext();

	/*
  + Tracking location:
  1. Tracks the current route, which would represent the route that 
    the user was redirected from and the route they wanted to go to before 
    they were redirected.
  */
	const location = useLocation();

	if (!token) {
		console.log("Redirect failed, eventually goes to: ", location.pathname);
		return (
			<Navigate
				to="/auth/login"
				replace={true}
				state={{ from: location.pathname }}
			/>
		);
	}

	return children;
}
ProtectedRoute.propTypes = {
	children: PropTypes.element,
};
