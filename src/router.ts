import { createRouter as createTanstackRouter } from '@tanstack/react-router';
import { posthog } from 'posthog-js';

import { routeTree } from '~/routeTree.gen';

export function getRouter() {
  const router = createTanstackRouter({
    routeTree,
    defaultPreload: 'intent',
    scrollRestoration: true,
    defaultOnCatch(error) {
      posthog.captureException(error);
    },
  });

  return router;
}
