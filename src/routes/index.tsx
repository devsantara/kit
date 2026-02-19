import { createFileRoute, Link } from '@tanstack/react-router';

import { authClient } from '~/lib/auth/client';
import { m } from '~/lib/i18n/messages';
import { Button } from '~/ui/components/core/button';
import { Skeleton } from '~/ui/components/core/skeleton';

export const Route = createFileRoute('/')({
  component: HomePage,
});

function HomePage() {
  const { data: session, isPending: isPendingSession } =
    authClient.useSession();

  return (
    <main className="grid h-dvh place-content-center p-4">
      <header className="max-w-xl text-center">
        <h1 className="mb-px font-sans text-2xl font-extrabold">
          {m.app_name()}
        </h1>
        <p className="font-sans text-sm text-neutral-500">
          {m.app_description()}
        </p>
        <code className="mt-4 inline-block rounded-md border bg-muted px-2 py-1 font-mono text-sm text-muted-foreground">
          git@github.com:devsantara/kit.git
        </code>

        <div className="mt-6 flex items-center justify-center gap-2">
          {isPendingSession ? (
            <Skeleton className="h-9 min-w-40" />
          ) : (
            <Button asChild size="lg" variant="default" className="min-w-40">
              <Link to={session?.user ? '/app' : '/auth'}>
                {!session?.user
                  ? m.auth_get_started_action()
                  : m.common_continue_as_name({
                      name: String(session.user.name.split(' ')[0]),
                    })}
              </Link>
            </Button>
          )}
        </div>
      </header>
    </main>
  );
}
