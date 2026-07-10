import type { Metadata } from 'next';
import { SignInForm } from '@/components/auth/sign-in-form';

export const metadata: Metadata = {
  title: 'Account',
  description: 'Sign in with a GitHub personal access token.',
};

export default function AccountPage() {
  return (
    <main className="mx-auto w-full max-w-xl flex-1 px-6 py-12">
      <header className="mb-8 space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Account</h1>
        <p className="text-fd-muted-foreground">
          Authenticate with a GitHub personal access token (manual). No OAuth app or
          server-side secrets required.
        </p>
      </header>
      <SignInForm />
    </main>
  );
}
