import { createEnv } from '@t3-oss/env-core';
import * as z from 'zod/v4';

export const serverEnv = createEnv({
  server: {
    ALCHEMY_SECRET: z.string(),
    ALCHEMY_STATE_TOKEN: z.string(),
    HOSTNAME: z.hostname(),
  },
  runtimeEnv: process.env,
  emptyStringAsUndefined: true,
});
