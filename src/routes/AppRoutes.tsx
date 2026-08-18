import { Navigate, Route, Routes, } from "react-router";

import Layout from "../layout/Layout";
import ProtectedRoute from "../components/ProtectedRoute";

import Login from "../pages/login/Login";
import Dashboard from "../pages/dashboard/Dashboard";
import Users from "../pages/users/Users";
import PageNotFound from "../pages/page-not-found/PageNotFound";

import { ROUTES } from "../constants/routes";
import { useAuth } from "../pages/login/AuthContext";

const AppRoutes = () => {
    const { isAuthenticated } = useAuth();

    return (
        <Routes>
            <Route
                path={ROUTES.HOME}
                element={<Navigate to={isAuthenticated ? ROUTES.DASHBOARD : ROUTES.LOGIN} replace />}
            />

            <Route
                path={ROUTES.LOGIN}
                element={isAuthenticated ? <Navigate to={ROUTES.DASHBOARD} replace /> : <Login />}
            />

            <Route element={<ProtectedRoute />}>
                <Route element={<Layout />}>
                    <Route path={ROUTES.DASHBOARD} element={<Dashboard />} />
                    <Route path={ROUTES.USERS} element={<Users />} />
                </Route>
            </Route>

            <Route path={ROUTES.NOT_FOUND} element={<PageNotFound />} />
        </Routes>
    );
};

export default AppRoutes;