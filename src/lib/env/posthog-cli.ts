import { createEnv } from '@t3-oss/env-core';
import * as z from 'zod/v4';

/** Env schema for posthog cli */
export const posthogCliEnv = createEnv({
  server: {
    POSTHOG_CLI_HOST: z.url(),
    POSTHOG_CLI_PROJECT_ID: z.string(),
    POSTHOG_CLI_TOKEN: z.string(),
  },
  runtimeEnv: process.env,
  emptyStringAsUndefined: true,
});
