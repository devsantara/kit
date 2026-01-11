import { PostHogProvider as BasePosthogProvider } from '@posthog/react';
import { posthog } from 'posthog-js';
import * as React from 'react';

export function PostHogProvider({ children }: { children: React.ReactNode }) {
  return <BasePosthogProvider client={posthog}>{children}</BasePosthogProvider>;
}
