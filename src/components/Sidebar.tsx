import { NavLink, useNavigate, } from "react-router";

import { ROUTES } from "../constants/routes";
import { useAuth } from "../pages/login/AuthContext";

const Sidebar = () => {
    const navigate = useNavigate();
    const { user, logout } = useAuth();

    const handleLogout = () => {
        logout();
        navigate(ROUTES.LOGIN);
    };

    return (
        <aside className="fixed left-0 top-0 flex h-screen w-64 flex-col border-r border-gray-200 bg-white">
            <div className="border-b border-gray-200 px-6 py-5">
                <h1 className="text-lg font-bold text-gray-900">
                    RCM Admin
                </h1>

                <p className="mt-1 text-xs text-gray-500">
                    Admin Portal
                </p>
            </div>

            <nav className="flex-1 p-4">
                <p className="mb-2 px-3 text-xs font-semibold uppercase tracking-wide text-gray-400">
                    Menu
                </p>

                <NavLink
                    to={ROUTES.DASHBOARD}
                    className={({ isActive }) =>
                        `mb-1 block rounded-md px-3 py-2.5 text-sm font-medium transition ${isActive
                            ? "bg-gray-900 text-white"
                            : "text-gray-600 hover:bg-gray-100"
                        }`
                    }
                >
                    Dashboard
                </NavLink>

                <NavLink
                    to={ROUTES.USERS}
                    className={({ isActive }) =>
                        `block rounded-md px-3 py-2.5 text-sm font-medium transition ${isActive
                            ? "bg-gray-900 text-white"
                            : "text-gray-600 hover:bg-gray-100"
                        }`
                    }
                >
                    Users
                </NavLink>
            </nav>

            <div className="border-t border-gray-200 p-4">
                <div className="mb-3 px-2">
                    <p className="truncate text-sm font-medium text-gray-900">
                        {user?.name}
                    </p>

                    <p className="truncate text-xs text-gray-500">
                        {user?.email}
                    </p>
                </div>

                <button
                    type="button"
                    onClick={handleLogout}
                    className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
                >
                    Logout
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;