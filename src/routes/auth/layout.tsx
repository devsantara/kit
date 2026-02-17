import { createFileRoute, Outlet } from '@tanstack/react-router';
import { zodValidator } from '@tanstack/zod-adapter';

import { authSearchParamsSchema } from '~/modules/auth/auth.schema';
import { authGuestGuard } from '~/modules/auth/auth.utils';

export const Route = createFileRoute('/auth')({
  validateSearch: zodValidator(authSearchParamsSchema),
  beforeLoad: async () => await authGuestGuard(),
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
