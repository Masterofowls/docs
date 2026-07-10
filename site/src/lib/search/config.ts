export const SEARCH_TOPIC_TAGS = [
  { name: 'Python', value: 'python' },
  { name: 'JavaScript', value: 'javascript' },
  { name: 'TypeScript', value: 'typescript' },
  { name: 'React', value: 'react' },
  { name: 'React Native', value: 'react-native' },
  { name: 'CSS', value: 'css' },
  { name: 'HTML', value: 'html' },
  { name: 'Django', value: 'django' },
  { name: 'Playwright', value: 'playwright' },
  { name: 'Pytest', value: 'pytest' },
  { name: 'Jest', value: 'jest' },
  { name: 'Bash', value: 'bash' },
  { name: 'PowerShell', value: 'powershell' },
  { name: 'GitHub Actions', value: 'github-actions' },
  { name: 'Git', value: 'git' },
  { name: 'SQL', value: 'sql' },
] as const;

export function searchApiUrl(): string {
  const base = process.env.NEXT_PUBLIC_BASE_PATH || '';
  return `${base}/api/search`;
}
