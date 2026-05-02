import { createFileRoute, Outlet, redirect } from '@tanstack/react-router';
import { zodValidator } from '@tanstack/zod-adapter';

import { getSession } from '~/modules/auth/auth.fn';
import { authSearchParamsSchema } from '~/modules/auth/auth.search';

export const Route = createFileRoute('/auth')({
  validateSearch: zodValidator(authSearchParamsSchema),
  beforeLoad: async () => {
    const session = await getSession();
    if (session) throw redirect({ to: '/app', replace: true });
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
