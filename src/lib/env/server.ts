import { createEnv } from '@t3-oss/env-core';
import * as z from 'zod/v4';

/** Env schema for server bundle */
export const serverEnv = createEnv({
  server: {
    // Auth
    AUTH_SECRET: z.string(),
    AUTH_GITHUB_CLIENT_ID: z.string(),
    AUTH_GITHUB_CLIENT_SECRET: z.string(),
    AUTH_GOOGLE_CLIENT_ID: z.string(),
    AUTH_GOOGLE_CLIENT_SECRET: z.string(),
    // Posthog CLI (for posthog vite plugin upload sourcemap)
    POSTHOG_CLI_HOST: z.url(),
    POSTHOG_CLI_PROJECT_ID: z.string(),
    POSTHOG_CLI_TOKEN: z.string(),
  },
  runtimeEnv: process.env,
  emptyStringAsUndefined: true,
});
