export type GitHubUser = {
  login: string;
  name: string | null;
  avatar_url: string;
  html_url: string;
};

export type AuthState = {
  token: string | null;
  user: GitHubUser | null;
  status: 'anonymous' | 'loading' | 'authenticated' | 'error';
  error: string | null;
};

export const AUTH_STORAGE_KEY = 'coderef-gh-pat';
export const AUTH_USER_KEY = 'coderef-gh-user';
