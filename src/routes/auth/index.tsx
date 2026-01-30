import { Link, createFileRoute } from '@tanstack/react-router';
import { ChevronRight, LogIn, UserPlus } from 'lucide-react';

import { m } from '~/lib/i18n/messages';
import {
  Card,
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

      <ul className="grid w-full grid-cols-1 gap-4">
        <li>
          <Card className="relative cursor-pointer hover:ring-primary/50">
            <CardHeader className="text-pretty">
              <div className="mb-1 flex items-center justify-between">
                <div className="flex size-10 items-center justify-center rounded-full bg-primary/10">
                  <UserPlus className="size-4 text-primary" />
                </div>
                <ChevronRight className="size-5 text-muted-foreground" />
              </div>
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
          </Card>
        </li>
        <li>
          <Card className="relative cursor-pointer hover:ring-primary/50">
            <CardHeader className="text-pretty">
              <div className="mb-1 flex items-center justify-between">
                <div className="flex size-10 items-center justify-center rounded-full bg-primary/10">
                  <LogIn className="size-4 text-primary" />
                </div>
                <ChevronRight className="size-5 text-muted-foreground" />
              </div>
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
          </Card>
        </li>
      </ul>
    </div>
  );
}
