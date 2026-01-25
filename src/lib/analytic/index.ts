import { usePostHog } from '@posthog/react';
import type { CaptureOptions } from 'posthog-js';

import { AnalyticEvent } from '~/lib/analytic/events';
import type { AnalyticProperty } from '~/lib/analytic/properties';

/**
 * Hook for capturing analytics events using PostHog.
 *
 * Provides a typed interface for tracking analytics events with associated properties.
 * This hook wraps the PostHog client to ensure type-safe event capturing.
 */
export function useAnalytic() {
  const posthog = usePostHog();

  function capture<TEvent extends AnalyticEvent>(
    event: TEvent,
    properties?: AnalyticProperty[TEvent] | null,
    options?: CaptureOptions,
  ) {
    posthog.capture(event, properties, options);
  }

  return { ...posthog, capture };
}
