export interface GithubUser {
    login: string;
    avatar_url: string;
    name: string | null;
    bio: string | null;
    followers: number;
}

export interface GithubRepository {
    id: number;
    name: string;
    description: string | null;
    stargazers_count: number;
    language: string | null;
    html_url: string;
}