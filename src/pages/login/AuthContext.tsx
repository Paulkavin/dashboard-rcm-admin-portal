import { createContext, useContext, useState, type ReactNode, } from "react";

import type { AuthUser, LoginCredentials, } from "./auth.types";
import { clearAuthUser, getAuthUser, saveAuthUser, } from "./auth.storage";

interface AuthContextValue {
	user: AuthUser | null;
	isAuthenticated: boolean;
	login: (credentials: LoginCredentials) => boolean;
	logout: () => void;
}

interface AuthProviderProps {
	children: ReactNode;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider = ({ children }: AuthProviderProps) => {
	const [user, setUser] = useState<AuthUser | null>(getAuthUser());

	const login = (credentials: LoginCredentials): boolean => {
		const isValidLogin = credentials.email === "admin@rcm.com" && credentials.password === "123456";

		if (!isValidLogin) {
			return false;
		}

		const loggedInUser: AuthUser = {
			id: 1,
			name: "Admin",
			email: "admin@rcm.com",
		};

		setUser(loggedInUser);
		saveAuthUser(loggedInUser);

		return true;
	};

	const logout = () => {
		setUser(null);
		clearAuthUser();
	};

	return (
		<AuthContext.Provider
			value={{
				user,
				isAuthenticated: user !== null,
				login,
				logout,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => {
	const context = useContext(AuthContext);

	if (!context) {
		throw new Error(
			"useAuth must be used inside AuthProvider"
		);
	}

	return context;
};