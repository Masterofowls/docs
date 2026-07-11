export const SEARCH_TOPIC_TAGS = [
  { name: 'Python', value: 'python' },
  { name: 'JavaScript', value: 'javascript' },
  { name: 'TypeScript', value: 'typescript' },
  { name: 'React', value: 'react' },
  { name: 'React Native', value: 'react-native' },
  { name: 'Next.js', value: 'nextjs' },
  { name: 'Node.js', value: 'node' },
  { name: 'Zod', value: 'zod' },
  { name: 'Tailwind', value: 'tailwind' },
  { name: 'CSS', value: 'css' },
  { name: 'HTML', value: 'html' },
  { name: 'Django', value: 'django' },
  { name: 'Docker', value: 'docker' },
  { name: 'Redis', value: 'redis' },
  { name: 'Postgres', value: 'postgres' },
  { name: 'SQL', value: 'sql' },
  { name: 'Playwright', value: 'playwright' },
  { name: 'Pytest', value: 'pytest' },
  { name: 'Jest', value: 'jest' },
  { name: 'Bash', value: 'bash' },
  { name: 'PowerShell', value: 'powershell' },
  { name: 'GitHub Actions', value: 'github-actions' },
  { name: 'Git', value: 'git' },
  { name: 'Comparisons', value: 'comparisons' },
  { name: 'Global Glossary', value: 'global-glossary' },
] as const;

export function searchApiUrl(): string {
  const base = process.env.NEXT_PUBLIC_BASE_PATH || '';
  return `${base}/api/search`;
}
