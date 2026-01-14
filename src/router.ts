import {
  createRouter as createTanstackRouter,
  ErrorComponent,
} from '@tanstack/react-router';
import { posthog } from 'posthog-js';

import { deLocalizeUrl, localizeUrl } from '~/lib/i18n/runtime';
import { routeTree } from '~/routeTree.gen';

export function getRouter() {
  const router = createTanstackRouter({
    routeTree,
    defaultPreload: 'intent',
    scrollRestoration: true,
    trailingSlash: 'never',
    defaultErrorComponent: ErrorComponent,
    defaultOnCatch(error) {
      posthog.captureException(error);
    },
    rewrite: {
      input: ({ url }) => deLocalizeUrl(url),
      output: ({ url }) => localizeUrl(url),
    },
  });

  return router;
}
