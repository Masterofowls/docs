'use client';

import { InstallPrompt } from './install-prompt';
import { OfflineIndicator } from './offline-indicator';
import { ServiceWorkerRegister } from './service-worker-register';

/** Client-side PWA shell: SW registration, install prompt, offline banner. */
export function PwaShell() {
  return (
    <>
      <ServiceWorkerRegister />
      <OfflineIndicator />
      <InstallPrompt />
    </>
  );
}
