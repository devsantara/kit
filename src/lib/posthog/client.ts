import { posthog } from 'posthog-js';

import { clientEnv } from '~/lib/env/client';

/** Initialize browser Posthog client */
export function initializePosthogClient() {
  posthog.init(clientEnv.VITE_PUBLIC_POSTHOG_KEY, {
    api_host: clientEnv.VITE_PUBLIC_POSTHOG_HOST,
    defaults: '2025-11-30',
    debug: clientEnv.VITE_PUBLIC_POSTHOG_DEBUG,
  });
}
