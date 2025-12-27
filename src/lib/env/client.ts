import { createEnv } from '@t3-oss/env-core';
import * as _ from 'zod/v4';

/** Env schema for client bundle */
export const clientEnv = createEnv({
  clientPrefix: 'VITE_',
  client: {},
  runtimeEnv: import.meta.env,
  emptyStringAsUndefined: true,
});
