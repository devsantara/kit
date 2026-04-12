import { createServerOnlyFn } from '@tanstack/react-start';
import { env } from 'cloudflare:workers';

export const getKVStore = createServerOnlyFn(() => {
  return env.KV_STORE;
});
