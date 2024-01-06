import { Navigate, useLocation } from "react-router-dom";
import { useAuthContext } from "../pages/ContextProviders/hooks/useAuthContext";
import PropTypes from "prop-types";

/*
+ ProtectedRoute: Component used to wrap around a route to create a protected/private
  route. If user isn't authetnicated, the protected route will redirect the user 
    to the login page.
*/
export default function ProtectedRoute({ children }) {
	const { token } = useAuthContext();

	/*
  + Tracking location:
  1. Tracks the current route, which would represent the route that 
    the user was redirected from and the route they wanted to go to before 
    they were redirected.
  */
	const location = useLocation();

	// If token doesn't exist, user isn't authenticated, so redirect htem.
	if (!token) {
		return (
			<Navigate
				to="/auth/login"
				replace={true}
				state={{ from: location.pathname }}
			/>
		);
	}

	// Else the user is authenticated so return 'children' which will be the page
	// that's going to be rendered.
	return children;
}
ProtectedRoute.propTypes = {
	children: PropTypes.element,
};
