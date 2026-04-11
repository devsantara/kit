import { createEnv } from '@t3-oss/env-core';
import * as z from 'zod/v4';

/** Env schema for Drizzle configuration */
export const drizzleEnv = createEnv({
  server: {
    DB_ENV: z.enum(['local', 'remote']),
  },
  runtimeEnv: process.env,
  emptyStringAsUndefined: true,
});
