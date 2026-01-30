import { useHydrated, useNavigate } from '@tanstack/react-router';

import { authSignUpSchema } from '~/features/auth-sign-up/auth-sign-up.schema';
import { authClient } from '~/lib/auth/client';
import { useAppForm } from '~/lib/form';
import { createFormError } from '~/lib/form/form.utils';
import { m } from '~/lib/i18n/messages';
import { AuthSocialButton } from '~/modules/auth/components/auth-social-button';
import { toast } from '~/ui/components/core/sonner';

export function AuthSignUpForm({
  redirectBack,
  ...props
}: React.ComponentProps<'form'> & { redirectBack?: string }) {
  const isHydrated = useHydrated();
  const navigate = useNavigate();

  const form = useAppForm({
    formId: 'auth-sign-up',
    validators: {
      onSubmit: authSignUpSchema,
    },
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    async onSubmit({ value, formApi }) {
      const { error } = await authClient.signUp.email({
        name: value.name,
        email: value.email,
        password: value.password,
      });

      if (error) {
        toast.error(m.auth_sign_up_error_fail(), {
          description: error.message,
        });
        return formApi.setErrorMap({
          onSubmit: {
            form: createFormError({
              title: m.auth_sign_up_error_fail(),
              message: error.message,
            }),
            fields: {},
          },
        });
      }

      toast.success(m.auth_sign_up_success_title(), {
        description: m.auth_sign_up_success_description(),
      });
      await navigate({ to: '/auth/sign-in', search: { redirectBack } });
    },
  });

  return (
    <form.AppForm>
      <form.Form noValidate={isHydrated} {...props}>
        <form.FormFieldSet>
          <form.FormFieldGroup>
            <form.AppField name="name">
              {(field) => (
                <field.FormField>
                  <field.FormFieldLabel>
                    {m.auth_field_full_name_label()}
                  </field.FormFieldLabel>
                  <field.FormInput
                    type="text"
                    autoComplete="name"
                    placeholder={m.auth_field_full_name_placeholder()}
                  />
                  <field.FormFieldError />
                </field.FormField>
              )}
            </form.AppField>

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

            <form.FormField>
              <form.FormField className="grid gap-4 sm:grid-cols-2">
                <form.AppField name="password">
                  {(field) => (
                    <field.FormField>
                      <field.FormFieldLabel>
                        {m.auth_field_password_label()}
                      </field.FormFieldLabel>
                      <field.FormInput
                        type="password"
                        autoComplete="new-password"
                        placeholder="••••••••"
                      />
                    </field.FormField>
                  )}
                </form.AppField>

                <form.AppField name="confirmPassword">
                  {(field) => (
                    <field.FormField>
                      <field.FormFieldLabel>
                        {m.auth_field_confirm_password_label()}
                      </field.FormFieldLabel>
                      <field.FormInput
                        type="password"
                        autoComplete="new-password"
                        placeholder="••••••••"
                      />
                    </field.FormField>
                  )}
                </form.AppField>
              </form.FormField>

              <form.Subscribe
                selector={(state) => [
                  state.fieldMeta.password?.errors,
                  state.fieldMeta.confirmPassword?.errors,
                ]}
              >
                {(errors) => <form.FormFieldError errors={errors.flat()} />}
              </form.Subscribe>
            </form.FormField>

            <form.FormFieldGroup>
              <form.FormSubmit size="lg">
                {m.auth_sign_up_action()}
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
