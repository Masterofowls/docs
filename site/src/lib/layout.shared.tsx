import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
import { NavExtras } from '@/components/nav-extras';
import { appName, gitConfig } from './shared';

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: appName,
      children: <NavExtras />,
    },
    links: [
      {
        text: 'Docs',
        url: '/docs',
        active: 'nested-url',
      },
      {
        text: 'Glossary',
        url: '/docs/global-glossary/global-glossary',
      },
      {
        text: 'Search',
        url: '/search',
      },
      {
        text: 'Coverage',
        url: '/coverage',
      },
      {
        text: 'Gateway',
        url: '/gateway',
      },
      {
        text: 'Export',
        url: '/export',
      },
    ],
    githubUrl: `https://github.com/${gitConfig.user}/${gitConfig.repo}`,
  };
}
