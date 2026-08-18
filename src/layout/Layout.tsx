import { Outlet } from "react-router";
import Sidebar from "../components/Sidebar";

const Layout = () => {
    return (
        <div className="min-h-screen bg-gray-100">
            <Sidebar />

            <main className="min-h-screen md:ml-64">
                <div className="border-b border-gray-200 bg-white px-4 py-4 md:px-6">
                    <p className="text-sm text-gray-500">
                        RCM Admin Portal
                    </p>
                </div>

                <div className="p-4 md:p-6">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default Layout;