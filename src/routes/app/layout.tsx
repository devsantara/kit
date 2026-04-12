import { createFileRoute, Outlet, redirect } from '@tanstack/react-router';

import { getSession } from '~/modules/auth/auth.fn';

export const Route = createFileRoute('/app')({
  beforeLoad: async ({ location }) => {
    const session = await getSession();
    if (!session) {
      throw redirect({
        to: '/auth',
        replace: true,
        search: { redirectBack: location.pathname },
      });
    }
    return { user: session.user };
  },
  component: RouteComponent,
});

function RouteComponent() {
  return <Outlet />;
}
