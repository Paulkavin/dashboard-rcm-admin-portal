import type { GithubRepository, GithubUser, } from "./users.types";

const GITHUB_API_URL = "https://api.github.com";

export const fetchGithubUser = async (username: string): Promise<GithubUser> => {
    const response = await fetch(`${GITHUB_API_URL}/users/${username}`)

    if (!response.ok) {
        throw new Error("Github user not found")
    }

    return response.json();
}

export const fetchGithubRepositories = async (
    username: string
): Promise<GithubRepository[]> => {
    const response = await fetch(
        `${GITHUB_API_URL}/users/${username}/repos`
    );

    if (!response.ok) {
        throw new Error("Failed to fetch repositories");
    }

    return response.json();
};