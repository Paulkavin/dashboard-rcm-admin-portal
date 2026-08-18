import { useEffect, useMemo, useState, } from "react";

import { fetchGithubRepositories, fetchGithubUser, } from "./users.api";
import type { GithubRepository, GithubUser, } from "./users.types";

import { useAuth } from "../login/AuthContext";

type SortOption = "stars" | "name";

const Users = () => {
    const { user } = useAuth();
    const [username, setUsername] = useState("");
    const [githubUser, setGithubUser] = useState<GithubUser | null>(null);
    const [repositories, setRepositories] = useState<GithubRepository[]>([]);
    const [repoFilter, setRepoFilter] = useState("");
    const [sortBy, setSortBy] = useState<SortOption>("stars");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {

        if (!user) {
            setGithubUser(null);
            setRepositories([]);
            setError("Authentication required");
            return;
        }
        const trimmedUsername = username.trim();

        if (!trimmedUsername) {
            setGithubUser(null)
            setRepositories([])
            setError("")
            return
        }

        const timer = setTimeout(async () => {

            try {
                setLoading(true);
                setError("");

                const [userData, repositoryData] =
                    //All or Nothing  - get rejected even one fails
                    await Promise.all([
                        fetchGithubUser(trimmedUsername),
                        fetchGithubRepositories(trimmedUsername),
                    ]);

                setGithubUser(userData);
                setRepositories(repositoryData);
            } catch (error) {
                setGithubUser(null);
                setRepositories([]);

                if (error instanceof Error) {
                    setError(error.message);
                } else {
                    setError("Something went wrong");
                }
            } finally {
                setLoading(false);
            }

        }, 500)

        //useEffect Clean Up Function
        return () => {
            clearTimeout(timer)
        }

    }, [username, user])

    const filteredRepositories = useMemo(() => {
        const filtered = repositories.filter((repository) =>
            repository.name
                .toLowerCase()
                .includes(repoFilter.toLowerCase())
        );

        //creating a shallow copy, to avoid modification of original array
        return [...filtered].sort((a, b) => {
            if (sortBy === "stars") {
                //Descending sort if negative number 'a' repo comes first
                return b.stargazers_count - a.stargazers_count;
            }
            //builtin function compares alaphabets
            return a.name.localeCompare(b.name);
        });
    }, [repositories, repoFilter, sortBy]);

    return (
        <section>
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-900">
                    GitHub Users
                </h1>

                <p className="mt-1 text-sm text-gray-500">
                    Search for a GitHub username to view their profile and repositories.
                </p>
            </div>

            <div className="rounded-lg border border-gray-200 bg-white p-5">
                <label
                    htmlFor="github-username"
                    className="mb-2 block text-sm font-medium text-gray-700"
                >
                    GitHub Username
                </label>

                <input
                    id="github-username"
                    type="text"
                    value={username}
                    onChange={(event) =>
                        setUsername(event.target.value)
                    }
                    placeholder="e.g. Paulkavin"
                    className="w-full rounded-md border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-gray-500 focus:ring-2 focus:ring-gray-200"
                />
            </div>

            {loading && (
                <div className="mt-6 rounded-lg border border-gray-200 bg-white p-6 text-center">
                    <p className="text-sm text-gray-500">
                        Loading GitHub user...
                    </p>
                </div>
            )}

            {error && !loading && (
                <div className="mt-6 rounded-lg border border-red-200 bg-red-50 p-4">
                    <p className="text-sm text-red-600">
                        {error}
                    </p>
                </div>
            )}

            {githubUser && !loading && !error && (
                <>
                    {/* Profile */}
                    <div className="mt-6 rounded-lg border border-gray-200 bg-white p-6">
                        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                            <img
                                src={githubUser.avatar_url}
                                alt={`${githubUser.login} avatar`}
                                className="h-20 w-20 rounded-full"
                            />

                            <div>
                                <h2 className="text-xl font-semibold text-gray-900">
                                    {githubUser.name || githubUser.login}
                                </h2>

                                <p className="text-sm text-gray-500">
                                    @{githubUser.login}
                                </p>

                                <p className="mt-2 text-sm text-gray-600">
                                    {githubUser.bio || "No bio available"}
                                </p>

                                <p className="mt-2 text-sm font-medium text-gray-700">
                                    {githubUser.followers} followers
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Repositories */}
                    <div className="mt-6 rounded-lg border border-gray-200 bg-white">
                        <div className="border-b border-gray-200 p-5">
                            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                                <div>
                                    <h2 className="text-lg font-semibold text-gray-900">
                                        Repositories
                                    </h2>

                                    <p className="mt-1 text-sm text-gray-500">
                                        {repositories.length} repositories loaded
                                    </p>
                                </div>

                                <div className="flex flex-col gap-3 sm:flex-row">
                                    <input
                                        type="text"
                                        value={repoFilter}
                                        onChange={(event) =>
                                            setRepoFilter(event.target.value)
                                        }
                                        placeholder="Filter repositories"
                                        className="rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-gray-500"
                                    />

                                    <select
                                        value={sortBy}
                                        onChange={(event) =>
                                            setSortBy(
                                                event.target.value as SortOption
                                            )
                                        }
                                        className="rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-gray-500"
                                    >
                                        <option value="stars">
                                            Sort by stars
                                        </option>

                                        <option value="name">
                                            Sort by name
                                        </option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className="divide-y divide-gray-100">
                            {filteredRepositories.length > 0 ? (
                                filteredRepositories.map((repository) => (
                                    <div
                                        key={repository.id}
                                        className="p-5"
                                    >
                                        <div className="flex flex-col gap-2 md:flex-row md:items-start md:justify-between">
                                            <div>
                                                <a
                                                    href={repository.html_url}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    className="font-medium text-gray-900 hover:underline"
                                                >
                                                    {repository.name}
                                                </a>

                                                <p className="mt-1 text-sm text-gray-500">
                                                    {repository.description ||
                                                        "No description available"}
                                                </p>
                                            </div>

                                            <div className="flex shrink-0 gap-4 text-xs text-gray-500">
                                                <span>
                                                    ⭐ {repository.stargazers_count}
                                                </span>

                                                <span>
                                                    {repository.language ||
                                                        "No language"}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="p-6 text-center">
                                    <p className="text-sm text-gray-500">
                                        No repositories found.
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </>
            )}
        </section>
    );
};

export default Users;