import type { GitHubUser } from './types';

export async function fetchGitHubUser(token: string): Promise<GitHubUser> {
  const trimmed = token.trim();
  if (!trimmed) {
    throw new Error('Enter a GitHub personal access token.');
  }

  const res = await fetch('https://api.github.com/user', {
    headers: {
      Accept: 'application/vnd.github+json',
      Authorization: `Bearer ${trimmed}`,
      'X-GitHub-Api-Version': '2022-11-28',
    },
  });

  if (res.status === 401) {
    throw new Error('Invalid or expired token. Create a new PAT with read:user.');
  }
  if (!res.ok) {
    throw new Error(`GitHub API error (${res.status}). Try again later.`);
  }

  const data = (await res.json()) as {
    login: string;
    name: string | null;
    avatar_url: string;
    html_url: string;
  };

  return {
    login: data.login,
    name: data.name,
    avatar_url: data.avatar_url,
    html_url: data.html_url,
  };
}
