import { posthog } from 'posthog-js';

import { clientEnv } from '~/lib/env/client';

/** Initialize browser Posthog client */
export function initializePosthogClient() {
  if (!clientEnv.VITE_PUBLIC_POSTHOG_ENABLED) return;

  posthog.init(clientEnv.VITE_PUBLIC_POSTHOG_KEY, {
    defaults: '2025-11-30',
    api_host: clientEnv.VITE_PUBLIC_POSTHOG_HOST,
    debug: clientEnv.VITE_PUBLIC_POSTHOG_DEBUG,
  });
}
