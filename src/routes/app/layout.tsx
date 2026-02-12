import { createFileRoute, Outlet } from '@tanstack/react-router';

import { authGuardFn } from '~/modules/auth/auth.fn';

export const Route = createFileRoute('/app')({
  beforeLoad: async ({ location }) => {
    const user = await authGuardFn({
      data: { redirectBack: location.pathname },
    });
    return { user };
  },
  component: RouteComponent,
});

function RouteComponent() {
  return <Outlet />;
}
