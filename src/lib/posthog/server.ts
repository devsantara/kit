import { createServerOnlyFn } from '@tanstack/react-start';
import { PostHog } from 'posthog-node';

/**
 * Create PostHog client instance (server).
 *
 * We set `flushAt` to 1 and `flushInterval` to 0 to send captured data without batching.
 * Batched data is sent asynchronously and Cloudflare Workers (or other short-lived server function)
 * can terminate before it's sent causing data loss.
 */
export const createPostHogClient = createServerOnlyFn(() => {
  const client = new PostHog(import.meta.env.VITE_PUBLIC_POSTHOG_KEY, {
    host: import.meta.env.VITE_PUBLIC_POSTHOG_HOST,
    flushAt: 1, // Send events immediately in edge environment
    flushInterval: 0, // Don't wait for interval
  });
  return client;
});
