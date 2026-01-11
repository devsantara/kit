import { createEnv } from '@t3-oss/env-core';
import * as z from 'zod/v4';

import { coerceBoolean } from './utils';

/** Env schema for client bundle */
export const clientEnv = createEnv({
  clientPrefix: 'VITE_',
  client: {
    VITE_PUBLIC_POSTHOG_KEY: z.string().nonempty(),
    VITE_PUBLIC_POSTHOG_HOST: z.url(),
    VITE_PUBLIC_POSTHOG_DEBUG: coerceBoolean().default(false),
    VITE_PUBLIC_POSTHOG_ENABLED: coerceBoolean().default(false),
  },
  runtimeEnv: import.meta.env,
  emptyStringAsUndefined: true,
});
