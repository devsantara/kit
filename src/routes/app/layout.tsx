import { createFileRoute, Outlet } from '@tanstack/react-router';

import { authUserGuard } from '~/modules/auth/auth.utils';

export const Route = createFileRoute('/app')({
  beforeLoad: async ({ location }) => {
    const user = await authUserGuard({
      redirectBack: location.pathname,
    });
    return { user };
  },
  component: RouteComponent,
});

function RouteComponent() {
  return <Outlet />;
}
