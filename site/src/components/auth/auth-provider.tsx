'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { fetchGitHubUser } from '@/lib/auth/github';
import {
  AUTH_STORAGE_KEY,
  AUTH_USER_KEY,
  type AuthState,
  type GitHubUser,
} from '@/lib/auth/types';

type AuthContextValue = AuthState & {
  signIn: (token: string) => Promise<void>;
  signOut: () => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<GitHubUser | null>(null);
  const [status, setStatus] = useState<AuthState['status']>('loading');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem(AUTH_STORAGE_KEY);
    const savedUser = localStorage.getItem(AUTH_USER_KEY);
    if (!saved) {
      setStatus('anonymous');
      return;
    }

    setToken(saved);
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser) as GitHubUser);
        setStatus('authenticated');
      } catch {
        setStatus('loading');
      }
    }

    fetchGitHubUser(saved)
      .then((u) => {
        setUser(u);
        localStorage.setItem(AUTH_USER_KEY, JSON.stringify(u));
        setStatus('authenticated');
        setError(null);
      })
      .catch((err: Error) => {
        localStorage.removeItem(AUTH_STORAGE_KEY);
        localStorage.removeItem(AUTH_USER_KEY);
        setToken(null);
        setUser(null);
        setStatus('anonymous');
        setError(err.message);
      });
  }, []);

  const signIn = useCallback(async (nextToken: string) => {
    setStatus('loading');
    setError(null);
    try {
      const u = await fetchGitHubUser(nextToken);
      localStorage.setItem(AUTH_STORAGE_KEY, nextToken.trim());
      localStorage.setItem(AUTH_USER_KEY, JSON.stringify(u));
      setToken(nextToken.trim());
      setUser(u);
      setStatus('authenticated');
    } catch (err) {
      setStatus('error');
      setError(err instanceof Error ? err.message : 'Sign-in failed');
      throw err;
    }
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem(AUTH_STORAGE_KEY);
    localStorage.removeItem(AUTH_USER_KEY);
    setToken(null);
    setUser(null);
    setStatus('anonymous');
    setError(null);
  }, []);

  const value = useMemo(
    () => ({ token, user, status, error, signIn, signOut }),
    [token, user, status, error, signIn, signOut],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
