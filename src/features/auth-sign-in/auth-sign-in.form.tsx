import { useHydrated, useNavigate } from '@tanstack/react-router';

import { authSignInSchema } from '~/features/auth-sign-in/auth-sign-in.schema';
import { authClient } from '~/lib/auth/client';
import { useAppForm } from '~/lib/form';
import { createFormError } from '~/lib/form/form.utils';
import { m } from '~/lib/i18n/messages';
import { AuthSocialButton } from '~/modules/auth/components/auth-social-button';
import { toast } from '~/ui/components/core/sonner';

export function AuthSignInForm({
  redirectBack,
  ...props
}: React.ComponentProps<'form'> & { redirectBack?: string }) {
  const isHydrated = useHydrated();
  const navigate = useNavigate();

  const form = useAppForm({
    formId: 'auth-sign-in',
    validators: {
      onSubmit: authSignInSchema,
    },
    defaultValues: {
      email: '',
      password: '',
    },
    async onSubmit({ value, formApi }) {
      const { error } = await authClient.signIn.email({
        email: value.email,
        password: value.password,
      });

      if (error) {
        toast.error(m.auth_sign_in_fail(), {
          description: error.message,
        });
        return formApi.setErrorMap({
          onSubmit: {
            form: createFormError({
              title: m.auth_sign_in_fail(),
              message: error.message,
            }),
            fields: {},
          },
        });
      }

      toast.success(m.auth_sign_in_success_title(), {
        description: m.auth_sign_in_success_description(),
      });
      await navigate({ to: redirectBack ?? '/app' });
    },
  });

  return (
    <form.AppForm>
      <form.Form noValidate={isHydrated} {...props}>
        <form.FormFieldSet>
          <form.FormFieldGroup>
            <form.AppField name="email">
              {(field) => (
                <field.FormField>
                  <field.FormFieldLabel>
                    {m.auth_field_email_label()}
                  </field.FormFieldLabel>
                  <field.FormInput
                    type="email"
                    autoComplete="email"
                    placeholder={m.auth_field_email_placeholder()}
                  />
                  <field.FormFieldError />
                </field.FormField>
              )}
            </form.AppField>

            <form.AppField name="password">
              {(field) => (
                <field.FormField>
                  <field.FormFieldLabel>
                    {m.auth_field_password_label()}
                  </field.FormFieldLabel>
                  <field.FormInput
                    type="password"
                    autoComplete="current-password"
                    placeholder="••••••••"
                  />
                  <field.FormFieldError />
                </field.FormField>
              )}
            </form.AppField>

            <form.FormFieldGroup>
              <form.FormSubmit size="lg">
                {m.auth_sign_in_action()}
              </form.FormSubmit>
              <form.FormError />
            </form.FormFieldGroup>

            <form.FormFieldSeparator>
              {m.auth_or_separator()}
            </form.FormFieldSeparator>

            <form.FormField className="grid gap-3 sm:grid-cols-3">
              <AuthSocialButton provider="google" redirectBack={redirectBack} />
              <AuthSocialButton provider="apple" redirectBack={redirectBack} />
              <AuthSocialButton provider="github" redirectBack={redirectBack} />
            </form.FormField>
          </form.FormFieldGroup>
        </form.FormFieldSet>
      </form.Form>
    </form.AppForm>
  );
}
