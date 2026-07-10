import { defineConfig, defineDocs } from 'fumadocs-mdx/config';
import { metaSchema, pageSchema } from 'fumadocs-core/source/schema';

export const docs = defineDocs({
  dir: 'content/docs',
  docs: {
    schema: pageSchema,
    postprocess: {
      includeProcessedMarkdown: true,
    },
  },
  meta: {
    schema: metaSchema,
  },
});

export default defineConfig({
  mdxOptions: {
    rehypeCodeOptions: {
      themes: {
        light: 'github-light',
        dark: 'github-dark',
      },
      fallbackLanguage: 'plaintext',
      defaultLanguage: 'plaintext',
      langAlias: {
        django: 'html',
        jinja: 'html',
        jinja2: 'html',
        gitattributes: 'ini',
        gitignore: 'ini',
        gradle: 'groovy',
        dotenv: 'ini',
        env: 'ini',
        conf: 'ini',
        text: 'plaintext',
        txt: 'plaintext',
        console: 'shellscript',
        sh: 'bash',
        zsh: 'bash',
        ps1: 'powershell',
      },
    },
  },
});
