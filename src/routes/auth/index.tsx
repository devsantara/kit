import { Link, createFileRoute } from '@tanstack/react-router';
import { ChevronRightIcon, LogInIcon, UserPlusIcon } from 'lucide-react';

import { m } from '~/lib/i18n/messages';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '~/ui/components/core/card';

export const Route = createFileRoute('/auth/')({
  component: RouteComponent,
});

function RouteComponent() {
  const searchParams = Route.useSearch();

  return (
    <div className="space-y-6">
      <header className="space-y-1">
        <h1 className="text-center text-2xl font-bold">
          {m.auth_get_started_title()}
        </h1>
        <p className="text-center text-sm text-muted-foreground">
          {m.auth_get_started_description()}
        </p>
      </header>

      <ul className="grid w-full grid-cols-1 gap-3">
        <li>
          <Card className="relative cursor-pointer hover:ring-primary/50">
            <CardContent className="grid grid-cols-[1fr_auto] items-center gap-3 sm:grid-cols-[auto_1fr_auto] sm:gap-4">
              <div className="flex size-10 items-center justify-center rounded-full bg-primary/5 dark:bg-primary/10">
                <UserPlusIcon className="size-4 text-primary" />
              </div>

              <CardHeader className="p-0 text-pretty">
                <CardTitle>
                  <Link
                    to="/auth/sign-up"
                    search={searchParams}
                    className="after:absolute after:inset-0"
                  >
                    {m.auth_get_started_signup_title()}
                  </Link>
                </CardTitle>
                <CardDescription>
                  {m.auth_get_started_signup_description()}
                </CardDescription>
              </CardHeader>

              <ChevronRightIcon className="col-start-2 col-end-3 row-start-1 row-end-3 size-5 text-muted-foreground sm:col-auto sm:row-auto" />
            </CardContent>
          </Card>
        </li>
        <li>
          <Card className="relative cursor-pointer hover:ring-primary/50">
            <CardContent className="grid grid-cols-[1fr_auto] items-center gap-3 sm:grid-cols-[auto_1fr_auto] sm:gap-4">
              <div className="flex size-10 items-center justify-center rounded-full bg-primary/5 dark:bg-primary/10">
                <LogInIcon className="size-4 text-primary" />
              </div>

              <CardHeader className="p-0 text-pretty">
                <CardTitle>
                  <Link
                    to="/auth/sign-in"
                    search={searchParams}
                    className="after:absolute after:inset-0"
                  >
                    {m.auth_get_started_signin_title()}
                  </Link>
                </CardTitle>
                <CardDescription>
                  {m.auth_get_started_signin_description()}
                </CardDescription>
              </CardHeader>

              <ChevronRightIcon className="col-start-2 col-end-3 row-start-1 row-end-3 size-5 text-muted-foreground sm:col-auto sm:row-auto" />
            </CardContent>
          </Card>
        </li>
      </ul>
    </div>
  );
}
