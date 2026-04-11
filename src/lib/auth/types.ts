import type { authServer } from '~/lib/auth/server';

export type AuthErrors = Record<keyof typeof authServer.$ERROR_CODES, string>;
