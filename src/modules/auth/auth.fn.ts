import { redirect } from '@tanstack/react-router';
import { createServerFn } from '@tanstack/react-start';
import { getRequestHeaders } from '@tanstack/react-start/server';

import { authServer } from '~/lib/auth/server';
import { authGuardInputSchema } from '~/modules/auth/auth.schema';

/**
 * A server function to get the current authenticated user and session.
 * Returns `null` if no user is authenticated.
 */
export const getCurrentUserFn = createServerFn({ method: 'GET' }).handler(
  async () => {
    const headers = getRequestHeaders();
    const authSession = await authServer.api.getSession({
      headers,
    });
    if (!authSession) {
      return null;
    }
    return {
      ...authSession.user,
      session: authSession.session,
    };
  },
);

/**
 * A server function that asserts the current user is authenticated.
 * If not authenticated, it redirects to the auth page.
 * If authenticated, it returns the user object.
 */
export const authGuardFn = createServerFn({ method: 'GET' })
  .inputValidator(authGuardInputSchema)
  .handler(async ({ data }) => {
    const user = await getCurrentUserFn();
    const isAuthenticated = user !== null;
    if (!isAuthenticated) {
      throw redirect({
        to: '/auth',
        search: { redirectBack: data?.redirectBack },
      });
    }
    return user;
  });

/**
 * A server function that asserts the current user is a guest (not authenticated).
 * If authenticated, it redirects to the app page.
 * If not authenticated, it returns void.
 */
export const guestGuardFn = createServerFn({ method: 'GET' }).handler(
  async () => {
    const user = await getCurrentUserFn();
    const isAuthenticated = user !== null;
    if (isAuthenticated) {
      throw redirect({ to: '/app' });
    }
    return;
  },
);
