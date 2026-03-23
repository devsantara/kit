import { PostHog } from 'posthog-node';

import { clientEnv } from '~/lib/env/client';

let posthogInstance: PostHog | null = null;

/** Create server Posthog client instance */
export function createPosthogClient() {
  if (!posthogInstance) {
    posthogInstance = new PostHog(clientEnv.VITE_PUBLIC_POSTHOG_KEY, {
      host: clientEnv.VITE_PUBLIC_POSTHOG_HOST,
      flushAt: 1, // Flush after every event
      flushInterval: 0, // No batching delays
      disabled: !clientEnv.VITE_PUBLIC_POSTHOG_ENABLED,
    });
  }
  return posthogInstance;
}
