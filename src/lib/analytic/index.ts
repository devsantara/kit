import { usePostHog } from '@posthog/react';
import type { CaptureOptions } from 'posthog-js';

import { AnalyticEvent } from '~/lib/analytic/events';
import type { AnalyticProperty } from '~/lib/analytic/properties';
import type { AnalyticEventMessage } from '~/lib/analytic/types';
import { createPosthogClient } from '~/lib/posthog/server';

/**
 * Hook for capturing analytics events using PostHog.
 *
 * Provides a typed interface for tracking analytics events with associated properties.
 * This hook wraps the PostHog client to ensure type-safe event capturing.
 */
export function useAnalytic() {
  const posthog = usePostHog();

  function capture<TEvent extends AnalyticEvent & keyof AnalyticProperty>(
    event: TEvent,
    properties: AnalyticProperty[TEvent],
    options?: CaptureOptions,
  ) {
    return posthog.capture(event, properties, options);
  }

  return { ...posthog, capture };
}

/**
 * Creates a server-side analytics client using PostHog.
 *
 * This function initializes a PostHog client for server-side analytics tracking,
 * providing a type-safe interface for capturing analytics events immediately.
 * Useful for tracking events that occur during server-side operations.
 */
export function createAnalyticClient() {
  const posthog = createPosthogClient();

  function captureImmediate<
    TEvent extends AnalyticEvent & keyof AnalyticProperty,
  >(props: AnalyticEventMessage<TEvent>) {
    return posthog.captureImmediate({
      event: props.event,
      properties: props.properties || undefined,
    });
  }

  function capture<TEvent extends AnalyticEvent & keyof AnalyticProperty>(
    props: AnalyticEventMessage<TEvent>,
  ) {
    return posthog.capture({
      event: props.event,
      properties: props.properties || undefined,
    });
  }

  return { ...posthog, capture, captureImmediate };
}
