import { HomeLayout } from 'fumadocs-ui/layouts/home';
import { baseOptions } from '@/lib/layout.shared';

export default function OfflineLayout({ children }: LayoutProps<'/offline'>) {
  return <HomeLayout {...baseOptions()}>{children}</HomeLayout>;
}
