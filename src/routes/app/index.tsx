import { createFileRoute, Link, useNavigate } from '@tanstack/react-router';
import { HomeIcon } from 'lucide-react';

import { authClient } from '~/lib/auth/client';
import { m } from '~/lib/i18n/messages';
import { Button } from '~/ui/components/core/button';
import { Separator } from '~/ui/components/core/separator';
import { toast } from '~/ui/components/core/sonner';

export const Route = createFileRoute('/app/')({
  component: RouteComponent,
});

function RouteComponent() {
  const context = Route.useRouteContext();
  const navigate = useNavigate();

  async function handleSignOut() {
    const { error } = await authClient.signOut();

    if (error) {
      toast.error(m.auth_sign_out_error_fail(), {
        description: error.message,
      });
      return;
    }

    toast.success(m.auth_sign_out_success_title(), {
      description: m.auth_sign_out_success_description(),
    });
    navigate({ to: '/' });
  }

  return (
    <main className="grid h-dvh place-content-center p-4">
      <header className="max-w-xl">
        <h1 className="mb-px font-sans text-xl font-extrabold sm:text-2xl">
          👋🏻 {m.common_greeting_name({ name: context.user.name })}
        </h1>

        <Separator className="my-3" />

        <div className="flex items-center gap-2">
          <Button asChild size="icon" variant="outline">
            <Link to="/">
              <HomeIcon />
            </Link>
          </Button>
          <Button size="lg" variant="destructive" onClick={handleSignOut}>
            {m.auth_sign_out_action()}
          </Button>
        </div>
      </header>
    </main>
  );
}
