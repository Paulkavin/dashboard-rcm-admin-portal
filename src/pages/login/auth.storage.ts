import type { AuthUser } from "./auth.types";

const AUTH_STORAGE_KEY = "rcm_auth";

export const saveAuthUser = (user: AuthUser) => {
    localStorage.setItem(
        AUTH_STORAGE_KEY,
        JSON.stringify(user)
    );
};

export const getAuthUser = (): AuthUser | null => {
    const storedUser = localStorage.getItem(AUTH_STORAGE_KEY);

    if (!storedUser) {
        return null;
    }

    return JSON.parse(storedUser) as AuthUser;
};

export const clearAuthUser = () => {
    localStorage.removeItem(AUTH_STORAGE_KEY);
};