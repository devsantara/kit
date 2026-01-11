import { StartClient } from '@tanstack/react-start/client';
import * as React from 'react';
import { hydrateRoot } from 'react-dom/client';

import { initializePosthogClient } from '~/lib/posthog/client';

initializePosthogClient();

hydrateRoot(
  document,
  <React.StrictMode>
    <StartClient />
  </React.StrictMode>,
);
