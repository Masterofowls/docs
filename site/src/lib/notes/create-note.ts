import { gitConfig } from '@/lib/shared';
import type { Topic } from '@/lib/gateway/topics';

export function buildNoteMarkdown(title: string, topicTitle: string, body?: string): string {
  if (body?.trim()) {
    return body.trim().endsWith('\n') ? body.trim() + '\n' : `${body.trim()}\n`;
  }

  return `# ${title}

_${topicTitle} · Reference cheat sheet_

---

## 📋 Overview

Describe what this covers and when to use it.

## 🔧 Core concepts

| Piece | Role |
| --- | --- |
| Example | Replace with real APIs |

## 💡 Examples

\`\`\`text
// Add a minimal working example
\`\`\`

## ⚠️ Pitfalls

- Common mistake 1
- Common mistake 2

## 🔗 Related

- Add sibling note links here
`;
}

export function noteRepoPath(topic: Topic, fileSlug: string): string {
  return `${topic.src}/${fileSlug}.md`;
}

export async function createNoteOnGitHub(options: {
  token: string;
  topic: Topic;
  fileSlug: string;
  title: string;
  markdown: string;
  message?: string;
}): Promise<{ htmlUrl: string; path: string }> {
  const path = noteRepoPath(options.topic, options.fileSlug);
  const content = btoa(unescape(encodeURIComponent(options.markdown)));
  const encodedPath = path
    .split('/')
    .map((s) => encodeURIComponent(s))
    .join('/');
  const api = `https://api.github.com/repos/${gitConfig.user}/${gitConfig.repo}/contents/${encodedPath}`;

  const res = await fetch(api, {
    method: 'PUT',
    headers: {
      Accept: 'application/vnd.github+json',
      Authorization: `Bearer ${options.token}`,
      'X-GitHub-Api-Version': '2022-11-28',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      message:
        options.message ||
        `docs: add ${options.topic.slug}/${options.fileSlug} note`,
      content,
      branch: gitConfig.branch,
    }),
  });

  if (res.status === 422) {
    throw new Error('File already exists on GitHub (or validation failed). Change the slug.');
  }
  if (res.status === 401 || res.status === 403) {
    throw new Error(
      'GitHub rejected the token. Need Contents: Read and write on this repo (or classic repo scope).',
    );
  }
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`GitHub API ${res.status}: ${text.slice(0, 200)}`);
  }

  const data = (await res.json()) as {
    content?: { html_url?: string; path?: string };
  };

  return {
    htmlUrl: data.content?.html_url || `https://github.com/${gitConfig.user}/${gitConfig.repo}/blob/${gitConfig.branch}/${path}`,
    path: data.content?.path || path,
  };
}
