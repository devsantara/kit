import { createEnv } from '@t3-oss/env-core';
import * as _ from 'zod/v4';

/** Env schema for server bundle */
export const serverEnv = createEnv({
  server: {},
  runtimeEnv: process.env,
  emptyStringAsUndefined: true,
});
