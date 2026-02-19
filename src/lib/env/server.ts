import { createEnv } from '@t3-oss/env-core';
import * as z from 'zod/v4';

/** Env schema for server bundle */
export const serverEnv = createEnv({
  server: {
    AUTH_SECRET: z.string(),
    AUTH_GITHUB_CLIENT_ID: z.string(),
    AUTH_GITHUB_CLIENT_SECRET: z.string(),
    AUTH_GOOGLE_CLIENT_ID: z.string(),
    AUTH_GOOGLE_CLIENT_SECRET: z.string(),
  },
  runtimeEnv: process.env,
  emptyStringAsUndefined: true,
});
