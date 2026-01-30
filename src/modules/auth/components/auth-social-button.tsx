import { useRouter } from '@tanstack/react-router';

import { authClient } from '~/lib/auth/client';
import { m } from '~/lib/i18n/messages';
import {
  AppleIcon,
  GitHubIcon,
  GoogleIcon,
} from '~/modules/auth/components/auth-social-provider-icon';
import { Button } from '~/ui/components/core/button';
import { toast } from '~/ui/components/core/sonner';

const SOCIAL_PROVIDERS = {
  google: {
    icon: <GoogleIcon />,
    name: 'Google',
  },
  apple: {
    icon: <AppleIcon />,
    name: 'Apple',
  },
  github: {
    icon: <GitHubIcon />,
    name: 'GitHub',
  },
} as const;

type SocialProvider = keyof typeof SOCIAL_PROVIDERS;

export function AuthSocialButton({
  provider,
  redirectBack,
  ...props
}: React.ComponentProps<typeof Button> & {
  provider: SocialProvider;
  redirectBack?: string;
}) {
  const router = useRouter();

  const socialProvider = SOCIAL_PROVIDERS[provider];

  async function handleSocialSignIn() {
    const { error } = await authClient.signIn.social({ provider });

    if (error) {
      toast.error(m.auth_sign_in_fail(), {
        description: error.message,
      });
      return;
    }

    toast.success(m.auth_sign_in_success_title(), {
      description: m.auth_sign_in_success_description(),
    });
    await router.navigate({ to: redirectBack ?? '/app' });
  }

  return (
    <Button
      type="button"
      variant="outline"
      size="lg"
      onClick={handleSocialSignIn}
      {...props}
    >
      {socialProvider.icon}{' '}
      <span className="not-sr-only sm:sr-only">
        {m.auth_continue_with_social_provider({
          provider: socialProvider.name,
        })}
      </span>
    </Button>
  );
}
