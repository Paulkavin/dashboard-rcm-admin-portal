import {Navigate,Outlet,} from "react-router";

import { ROUTES } from "../constants/routes";
import { useAuth } from "../pages/login/AuthContext";

const ProtectedRoute = () => {
    const { isAuthenticated } = useAuth();

    if (!isAuthenticated) {
        return (
            <Navigate to={ROUTES.LOGIN} replace />
        );
    }

    return <Outlet />;
};

export default ProtectedRoute;