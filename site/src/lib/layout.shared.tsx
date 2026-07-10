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
        text: 'Search',
        url: '/search',
      },
      {
        text: 'Gateway',
        url: '/gateway',
      },
      {
        text: 'Export',
        url: '/export',
      },
      {
        text: 'New note',
        url: '/notes/new',
      },
      {
        text: 'Bookmarks',
        url: '/bookmarks',
      },
      {
        text: 'Account',
        url: '/account',
      },
    ],
    githubUrl: `https://github.com/${gitConfig.user}/${gitConfig.repo}`,
  };
}
