import {useState,type SubmitEvent,} from "react";
import { useNavigate } from "react-router";

import { ROUTES } from "../../constants/routes";
import { useAuth } from "./AuthContext";
import type { LoginCredentials } from "./auth.types";

const Login = () => {
    const navigate = useNavigate();
    const { login } = useAuth();

    const [credentials, setCredentials] =
        useState<LoginCredentials>({
            email: "",
            password: "",
        });

    const [error, setError] = useState("");

    const handleSubmit = (
        event: SubmitEvent<HTMLFormElement>
    ) => {
        event.preventDefault();

        setError("");

        if (!credentials.email || !credentials.password) {
            setError("Please enter email and password");
            return;
        }

        const success = login(credentials);

        if (!success) {
            setError("Invalid email or password");
            return;
        }

        navigate(ROUTES.DASHBOARD);
    };

    return (
        <main className="flex min-h-screen items-center justify-center bg-gray-100 px-4">
            <div className="w-full max-w-md">
                <div className="mb-6 text-center">
                    <h1 className="text-2xl font-bold text-gray-900">
                        RCM Admin Portal
                    </h1>

                    <p className="mt-2 text-sm text-gray-500">
                        Sign in to access your dashboard
                    </p>
                </div>

                <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                    <div className="mb-6">
                        <h2 className="text-xl font-semibold text-gray-900">
                            Welcome back
                        </h2>

                        <p className="mt-1 text-sm text-gray-500">
                            Enter your credentials to continue.
                        </p>
                    </div>

                    <form
                        onSubmit={handleSubmit}
                        className="space-y-5"
                    >
                        <div>
                            <label
                                htmlFor="email"
                                className="mb-2 block text-sm font-medium text-gray-700"
                            >
                                Email
                            </label>

                            <input
                                id="email"
                                type="email"
                                value={credentials.email}
                                onChange={(event) =>
                                    setCredentials({
                                        ...credentials,
                                        email: event.target.value,
                                    })
                                }
                                placeholder="Enter your email"
                                className="w-full rounded-md border border-gray-300 px-3 py-2.5 text-sm outline-none transition focus:border-gray-500 focus:ring-2 focus:ring-gray-200"
                            />
                        </div>

                        <div>
                            <label
                                htmlFor="password"
                                className="mb-2 block text-sm font-medium text-gray-700"
                            >
                                Password
                            </label>

                            <input
                                id="password"
                                type="password"
                                value={credentials.password}
                                onChange={(event) =>
                                    setCredentials({
                                        ...credentials,
                                        password: event.target.value,
                                    })
                                }
                                placeholder="Enter your password"
                                className="w-full rounded-md border border-gray-300 px-3 py-2.5 text-sm outline-none transition focus:border-gray-500 focus:ring-2 focus:ring-gray-200"
                            />
                        </div>

                        {error && (
                            <p className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-600">
                                {error}
                            </p>
                        )}

                        <button
                            type="submit"
                            className="w-full rounded-md bg-gray-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-gray-800"
                        >
                            Login
                        </button>
                    </form>
                </div>

                <p className="mt-5 text-center text-xs text-gray-400">
                    RCM Admin Portal
                </p>
            </div>
        </main>
    );
};

export default Login;