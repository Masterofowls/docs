import type { Metadata } from 'next';
import Link from 'next/link';
import { NewNoteForm } from '@/components/notes/new-note-form';

export const metadata: Metadata = {
  title: 'New note',
  description: 'Quickly scaffold or publish a new markdown cheat sheet.',
};

export default function NewNotePage() {
  return (
    <main className="mx-auto w-full max-w-2xl flex-1 px-6 py-12">
      <header className="mb-8 space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">New markdown note</h1>
        <p className="text-fd-muted-foreground">
          Create a cheat-sheet file in a topic folder. Publish with your GitHub PAT, download
          locally, or use the CLI.
        </p>
        <p className="text-sm text-fd-muted-foreground">
          CLI:{' '}
          <code className="text-xs">
            node site/scripts/new-note.mjs --topic python --slug my_topic --title &quot;My
            Topic&quot; --sync
          </code>
        </p>
        <Link href="/account" className="text-sm underline underline-offset-4">
          Manage GitHub token
        </Link>
      </header>
      <NewNoteForm />
    </main>
  );
}
