import { PostHogProvider as BasePostHogProvider } from '@posthog/react';
import { createClientOnlyFn } from '@tanstack/react-start';
import posthog from 'posthog-js';
import * as React from 'react';

/**
 * React provider that wraps the application with PostHog context.
 * This makes the PostHog client available throughout the React tree.
 */
export function PostHogProvider({ children }: { children: React.ReactNode }) {
  return <BasePostHogProvider client={posthog}>{children}</BasePostHogProvider>;
}

/** Initialize PostHog instrumentation client (browser). */
export const initializePostHogClient = createClientOnlyFn(() => {
  posthog.init(import.meta.env.VITE_PUBLIC_POSTHOG_KEY, {
    api_host: import.meta.env.VITE_PUBLIC_POSTHOG_HOST,
    defaults: '2025-11-30',
    capture_pageview: 'history_change',
    capture_pageleave: 'if_capture_pageview',
    capture_exceptions: true,
    capture_performance: true,
    capture_heatmaps: true,
  });
});
