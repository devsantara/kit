import { StartClient } from '@tanstack/react-start/client';
import * as React from 'react';
import { hydrateRoot } from 'react-dom/client';

import { initializePostHogClient, PostHogProvider } from '~/lib/posthog/client';

initializePostHogClient();

hydrateRoot(
  document,
  <React.StrictMode>
    <PostHogProvider>
      <StartClient />
    </PostHogProvider>
  </React.StrictMode>,
);
