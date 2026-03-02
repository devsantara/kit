import { createFileRoute, Link } from '@tanstack/react-router';

import { AuthSignUpForm } from '~/features/auth-sign-up/auth-sign-up.form';
import { m } from '~/lib/i18n/messages';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '~/ui/components/core/card';

export const Route = createFileRoute('/auth/sign-up')({
  component: RouteComponent,
});

function RouteComponent() {
  const searchParams = Route.useSearch();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-bold">{m.auth_sign_up_title()}</CardTitle>
        <CardDescription>{m.auth_sign_up_description()}</CardDescription>
      </CardHeader>
      <CardContent>
        <AuthSignUpForm redirectBack={searchParams.redirectBack} />
      </CardContent>
      <CardFooter>
        <p className="w-full text-center">
          {m.auth_sign_up_already_have_account()}{' '}
          <Link to="/auth/sign-in" search={searchParams} className="underline">
            {m.auth_sign_up_sign_in_link()}
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}
