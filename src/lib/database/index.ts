import { createServerOnlyFn } from '@tanstack/react-start';
import { env } from 'cloudflare:workers';
import { drizzle } from 'drizzle-orm/d1';

let _instance: ReturnType<typeof drizzle> | null = null;
export const getDatabase = createServerOnlyFn(() => {
  if (_instance) return _instance;
  _instance = drizzle(env.DATABASE);
  return _instance;
});
