import { usePostHog } from '@posthog/react';
import type { CaptureOptions } from 'posthog-js';
import type { EventMessage } from 'posthog-node';
import * as React from 'react';

import { type AnalyticEvent } from '~/lib/analytic/events';
import type { AnalyticCaptureEventProps } from '~/lib/analytic/types';
import { createPosthogClient } from '~/lib/posthog/server';

/**
 * Hook for capturing analytics events using PostHog.
 *
 * Provides a typed interface for tracking analytics events with associated properties.
 * This hook wraps the PostHog client to ensure type-safe event capturing.
 */
export function useAnalytic() {
  const posthog = usePostHog();

  return React.useRef({
    capture<TEvent extends AnalyticEvent>({
      event,
      properties,
      ...options
    }: AnalyticCaptureEventProps<TEvent, CaptureOptions>) {
      return posthog.capture(event, properties, options);
    },
  }).current;
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

  /** Capture an event immediately (synchronously) */
  function captureImmediate<TEvent extends AnalyticEvent>({
    event,
    properties,
    ...props
  }: AnalyticCaptureEventProps<
    TEvent,
    Omit<EventMessage, 'event' | 'properties'>
  >) {
    return posthog.captureImmediate({ event, properties, ...props });
  }

  /** Capture an event manually (asynchronously) */
  function capture<TEvent extends AnalyticEvent>({
    event,
    properties,
    ...props
  }: AnalyticCaptureEventProps<
    TEvent,
    Omit<EventMessage, 'event' | 'properties'>
  >) {
    return posthog.capture({ event, properties, ...props });
  }

  return { capture, captureImmediate };
}
