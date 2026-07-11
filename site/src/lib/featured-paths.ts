export type FeaturedPath = {
  id: string;
  title: string;
  description: string;
  steps: { label: string; href: string }[];
};

/** Curated learning paths for the home hub. */
export const FEATURED_PATHS: FeaturedPath[] = [
  {
    id: 'python-basics',
    title: 'Python basics',
    description: 'Start coding, then files and pathlib.',
    steps: [
      { label: 'Getting started', href: '/docs/python/getting-started' },
      { label: 'Hello world', href: '/docs/python/hello-world' },
      { label: 'Lists', href: '/docs/python/lists' },
      { label: 'Pathlib', href: '/docs/python/pathlib' },
      { label: 'OS', href: '/docs/python/os' },
    ],
  },
  {
    id: 'js-core',
    title: 'JavaScript core',
    description: 'Language essentials and Array/String methods.',
    steps: [
      { label: 'Getting started', href: '/docs/javascript/getting-started' },
      { label: 'Arrays', href: '/docs/javascript/arrays' },
      { label: 'Strings', href: '/docs/javascript/strings' },
      { label: 'Async', href: '/docs/javascript/async' },
      { label: 'Fetch', href: '/docs/javascript/fetch' },
    ],
  },
  {
    id: 'next-app',
    title: 'Next.js App Router',
    description: 'Modern Next from zero to routes.',
    steps: [
      { label: 'Getting started', href: '/docs/nextjs/getting-started' },
      { label: 'App Router', href: '/docs/nextjs/app-router' },
      { label: 'Server components', href: '/docs/nextjs/server-components' },
      { label: 'Route handlers', href: '/docs/nextjs/route-handlers' },
      { label: 'vs Pages Router', href: '/docs/comparisons/pages-vs-app-router' },
    ],
  },
  {
    id: 'node-apis',
    title: 'Node APIs',
    description: 'Express vs Fastify and HTTP basics.',
    steps: [
      { label: 'Getting started', href: '/docs/node/getting-started' },
      { label: 'Express', href: '/docs/node/express-basics' },
      { label: 'Fastify', href: '/docs/node/fastify-basics' },
      { label: 'Express vs Fastify', href: '/docs/comparisons/express-vs-fastify' },
    ],
  },
  {
    id: 'data-ops',
    title: 'Data & ops',
    description: 'SQL, Postgres ops, Redis, Docker.',
    steps: [
      { label: 'SQL getting started', href: '/docs/sql/getting-started' },
      { label: 'Postgres ops', href: '/docs/postgres/getting-started' },
      { label: 'Redis', href: '/docs/redis/getting-started' },
      { label: 'Docker', href: '/docs/docker/getting-started' },
      { label: 'Redis vs Postgres', href: '/docs/comparisons/redis-vs-postgres' },
    ],
  },
];
