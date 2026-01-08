import { createEnv } from '@t3-oss/env-core';
import * as z from 'zod/v4';

/** Env schema for client bundle */
export const clientEnv = createEnv({
  clientPrefix: 'VITE_',
  client: {
    VITE_PUBLIC_POSTHOG_KEY: z.string().nonempty(),
    VITE_PUBLIC_POSTHOG_HOST: z.url(),
  },
  runtimeEnv: import.meta.env,
  emptyStringAsUndefined: true,
});
