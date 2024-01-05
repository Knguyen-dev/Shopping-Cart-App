/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */

import { createContext, useState, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export const fakeAuth = () =>
	new Promise((resolve) => {
		setTimeout(() => resolve("2342f2f1d131rf12"), 250);
	});

const AuthContext = createContext();
export function useAuthContext() {
	return useContext(AuthContext);
}

export default function AuthProvider({ children }) {
	const [token, setToken] = useState(null);
	const navigate = useNavigate();
	const location = useLocation();

	const handleLogin = async (e) => {
		e.preventDefault();

		const token = await fakeAuth();
		setToken(token);

		/*
    - If location.state.from exists, then we navigate to 
    that location as its the where the user was redirected.

    - Else by default, we take them to the dashboard. This 
    is good because there could be cases where they literally
    just went to our login page on our site, and so they
    didn't go to a protected route. As a result, 'from' 
    is not defined, so we default to logging into the dashboard.    
    */
		const origin = location.state?.from || "/";
		navigate(origin);
	};

	const handleLogout = () => {
		setToken(null);
		navigate("/");
	};

	return (
		<AuthContext.Provider
			value={{ token: token, onLogin: handleLogin, onLogout: handleLogout }}>
			{children}
		</AuthContext.Provider>
	);
}
