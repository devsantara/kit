import { createFileRoute, Link } from '@tanstack/react-router';

import { AuthSignInForm } from '~/features/auth-sign-in/auth-sign-in.form';
import { m } from '~/lib/i18n/messages';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '~/ui/components/core/card';
export const Route = createFileRoute('/auth/sign-in')({
  component: RouteComponent,
});
function RouteComponent() {
  const searchParams = Route.useSearch();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-bold">{m.auth_sign_in_title()}</CardTitle>
        <CardDescription>{m.auth_sign_in_description()}</CardDescription>
      </CardHeader>
      <CardContent>
        <AuthSignInForm redirectBack={searchParams.redirectBack} />
      </CardContent>
      <CardFooter>
        <p className="w-full text-center">
          {m.auth_sign_in_no_account()}{' '}
          <Link to="/auth/sign-up" search={searchParams} className="underline">
            {m.auth_sign_in_sign_up_link()}
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}
