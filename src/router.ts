import { createRouter as createTanstackRouter } from '@tanstack/react-router';
import { posthog } from 'posthog-js';

import { routeTree } from '~/routeTree.gen';
import { DefaultErrorPage } from '~/ui/components/default-error-page';

export function getRouter() {
  const router = createTanstackRouter({
    routeTree,
    defaultPreload: 'intent',
    scrollRestoration: true,
    defaultErrorComponent: DefaultErrorPage,
    defaultOnCatch(error) {
      posthog.captureException(error);
    },
  });

  return router;
}
