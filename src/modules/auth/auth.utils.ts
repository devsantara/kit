import { redirect } from '@tanstack/react-router';

import { getCurrentUserFn } from '~/modules/auth/auth.fn';

/**
 * A utility function that asserts the current user is authenticated.
 * If not authenticated, it redirects to the auth page.
 * If authenticated, it returns the user object.
 */
export async function authUserGuard({
  redirectBack,
}: {
  redirectBack?: string;
}) {
  const user = await getCurrentUserFn();
  const isAuthenticated = user !== null;
  if (!isAuthenticated) {
    throw redirect({
      to: '/auth',
      replace: true,
      search: { redirectBack },
    });
  }
  return user;
}

/**
 * A utility function that asserts the current user is a guest (not authenticated).
 * If authenticated, it redirects to the app page.
 * If not authenticated, it returns void.
 */
export async function authGuestGuard() {
  const user = await getCurrentUserFn();
  const isAuthenticated = user !== null;
  if (isAuthenticated) {
    throw redirect({ to: '/app', replace: true });
  }
  return;
}
