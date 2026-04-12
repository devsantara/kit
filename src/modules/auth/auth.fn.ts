import { createServerFn } from '@tanstack/react-start';
import { getRequestHeaders } from '@tanstack/react-start/server';

import { authServer } from '~/lib/auth/server';

/**
 * A server function to get the current authenticated user and session.
 */
export const getSession = createServerFn({ method: 'GET' }).handler(
  async () => {
    const headers = getRequestHeaders();
    const authSession = await authServer.api.getSession({
      headers,
    });
    if (!authSession) {
      return null;
    }
    return {
      ...authSession.session,
      user: authSession.user,
    };
  },
);

/**
 * A server function to get the current authenticated user and session.
 * Unlike `getSession`, this function throws if no user is authenticated.
 */
export const ensureSession = createServerFn({ method: 'GET' }).handler(
  async () => {
    const headers = getRequestHeaders();
    const authSession = await authServer.api.getSession({
      headers,
    });
    if (!authSession) {
      throw new Error('Unauthorized');
    }
    return {
      ...authSession.session,
      user: authSession.user,
    };
  },
);
