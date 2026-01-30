import { createFileRoute, Outlet, redirect } from '@tanstack/react-router';
import { zodValidator } from '@tanstack/zod-adapter';

import { getCurrentUserFn } from '~/modules/auth/auth.fn';
import { authSearchParamsSchema } from '~/modules/auth/auth.schema';

export const Route = createFileRoute('/auth')({
  validateSearch: zodValidator(authSearchParamsSchema),
  beforeLoad: async () => {
    const user = await getCurrentUserFn();
    const isAuthenticated = user !== null;
    if (isAuthenticated) {
      throw redirect({ to: '/app' });
    }
  },
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="flex min-h-dvh flex-col items-center justify-center gap-6 p-4 md:p-10">
      <main className="w-full max-w-sm">
        <Outlet />
      </main>
    </div>
  );
}
