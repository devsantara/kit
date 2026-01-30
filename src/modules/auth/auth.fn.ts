import { createServerFn } from '@tanstack/react-start';
import { getRequestHeaders } from '@tanstack/react-start/server';

import { authServer } from '~/lib/auth/server';

/**
 * A server function to get the current authenticated user.
 * Returns `null` if no user is authenticated.
 */
export const getCurrentUserFn = createServerFn({ method: 'GET' }).handler(
  async () => {
    const headers = getRequestHeaders();
    const authSession = await authServer.api.getSession({
      headers,
    });
    return authSession?.user ?? null;
  },
);
