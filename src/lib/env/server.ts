import { createEnv } from '@t3-oss/env-core';
import * as z from 'zod/v4';

/** Env schema for server bundle */
export const serverEnv = createEnv({
  server: {
    AUTH_SECRET: z.string(),
  },
  runtimeEnv: process.env,
  emptyStringAsUndefined: true,
});
