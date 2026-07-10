import Link from 'next/link';

const topics = [
  { href: '/docs/python', title: 'Python', blurb: 'Language, stdlib, tooling' },
  { href: '/docs/javascript', title: 'JavaScript', blurb: 'Core language & DOM' },
  { href: '/docs/typescript', title: 'TypeScript', blurb: 'Types & tooling' },
  { href: '/docs/react', title: 'React', blurb: 'Components & hooks' },
  { href: '/docs/react-native', title: 'React Native', blurb: 'Mobile & Expo' },
  { href: '/docs/css', title: 'CSS', blurb: 'Layout & modern CSS' },
  { href: '/docs/html', title: 'HTML', blurb: 'Markup & a11y' },
  { href: '/docs/django', title: 'Django', blurb: 'ORM, views, DRF' },
  { href: '/docs/playwright', title: 'Playwright', blurb: 'E2E browser tests' },
  { href: '/docs/pytest', title: 'Pytest', blurb: 'Python testing' },
  { href: '/docs/jest', title: 'Jest', blurb: 'JS testing' },
  { href: '/docs/bash', title: 'Bash', blurb: 'Shell scripting' },
  { href: '/docs/powershell', title: 'PowerShell', blurb: 'Windows automation' },
  { href: '/docs/github-actions', title: 'GitHub Actions', blurb: 'CI/CD workflows' },
  { href: '/docs/git', title: 'Git', blurb: 'Everyday Git & gh' },
  { href: '/docs/sql', title: 'SQL', blurb: 'Queries & schema' },
] as const;

export default function HomePage() {
  return (
    <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-10 px-6 py-16">
      <header className="space-y-4">
        <p className="text-sm font-medium tracking-wide text-fd-muted-foreground uppercase">
          Personal cheat-sheet library
        </p>
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Code Reference</h1>
        <p className="max-w-2xl text-lg text-fd-muted-foreground">
          Focused notes for web and app development — overview, syntax, examples, and pitfalls.
          Built with{' '}
          <a
            href="https://www.fumadocs.dev/docs"
            className="font-medium text-fd-foreground underline underline-offset-4"
          >
            Fumadocs
          </a>
          .
        </p>
        <div className="flex flex-wrap gap-3 pt-2">
          <Link
            href="/docs"
            className="rounded-full bg-fd-primary px-5 py-2.5 text-sm font-medium text-fd-primary-foreground"
          >
            Open docs
          </Link>
          <Link
            href="/search"
            className="rounded-full border border-fd-border px-5 py-2.5 text-sm font-medium"
          >
            Search
          </Link>
          <Link
            href="/gateway"
            className="rounded-full border border-fd-border px-5 py-2.5 text-sm font-medium"
          >
            API / MCP
          </Link>
          <Link
            href="/notes/new"
            className="rounded-full border border-fd-border px-5 py-2.5 text-sm font-medium"
          >
            New note
          </Link>
          <Link
            href="/account"
            className="rounded-full border border-fd-border px-5 py-2.5 text-sm font-medium"
          >
            Sign in
          </Link>
        </div>
      </header>

      <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {topics.map((t) => (
          <Link
            key={t.href}
            href={t.href}
            className="rounded-xl border border-fd-border bg-fd-card p-4 transition-colors hover:bg-fd-accent"
          >
            <h2 className="font-semibold">{t.title}</h2>
            <p className="mt-1 text-sm text-fd-muted-foreground">{t.blurb}</p>
          </Link>
        ))}
      </section>
    </main>
  );
}
