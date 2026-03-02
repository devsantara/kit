import type { authClient } from '~/lib/auth/client';
import { authServer } from '~/lib/auth/server';

export type AuthErrors = Record<
  keyof typeof authServer.$ERROR_CODES | keyof typeof authClient.$ERROR_CODES,
  string
>;
