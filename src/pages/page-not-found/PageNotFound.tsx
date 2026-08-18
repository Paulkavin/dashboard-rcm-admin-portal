import { Link } from "react-router";
import { ROUTES } from "../../constants/routes";

const PageNotFound = () => {
    return (
        <main className="flex min-h-screen items-center justify-center bg-gray-100 px-4">
            <div className="text-center">
                <p className="text-6xl font-bold text-gray-900">
                    404
                </p>

                <h1 className="mt-4 text-2xl font-semibold text-gray-900">
                    Page not found
                </h1>

                <p className="mt-2 text-sm text-gray-500">
                    The page you're looking for doesn't exist.
                </p>

                <Link
                    to={ROUTES.HOME}
                    className="mt-6 inline-block rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800"
                >
                    Go to Home
                </Link>
            </div>
        </main>
    );
};

export default PageNotFound;