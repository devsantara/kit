import { createFileRoute, Outlet, redirect } from '@tanstack/react-router';

import { getCurrentUserFn } from '~/modules/auth/auth.fn';

export const Route = createFileRoute('/app')({
  beforeLoad: async ({ location }) => {
    const user = await getCurrentUserFn();
    const isAuthenticated = user !== null;
    if (!isAuthenticated) {
      throw redirect({
        to: '/auth',
        search: { redirectBack: location.pathname },
      });
    }
    return { user };
  },
  component: RouteComponent,
});

function RouteComponent() {
  return <Outlet />;
}
