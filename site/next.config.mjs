import { createMDX } from 'fumadocs-mdx/next';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const withMDX = createMDX();
const root = path.dirname(fileURLToPath(import.meta.url));

/** GitHub Pages project site: https://masterofowls.github.io/docs */
const basePath = process.env.BASE_PATH || '';
const staticExport = process.env.STATIC_EXPORT === 'true' || Boolean(basePath);

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  turbopack: {
    root,
  },
  ...(staticExport
    ? {
        output: 'export',
        trailingSlash: true,
        images: { unoptimized: true },
      }
    : {}),
  ...(basePath
    ? {
        basePath,
        assetPrefix: basePath,
      }
    : {}),
};

export default withMDX(config);
