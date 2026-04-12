import * as z from 'zod/v4';

import { AUTH_MIN_PASSWORD_LENGTH } from '~/lib/auth/constant';
import { m } from '~/lib/i18n/messages';

export const authSignUpSchema = z
  .object({
    name: z.string().nonempty(m.auth_field_error_name_required()),
    email: z.email(m.auth_field_error_email_invalid()),
    password: z.string().min(
      AUTH_MIN_PASSWORD_LENGTH,
      m.auth_field_error_password_min_length({
        min: AUTH_MIN_PASSWORD_LENGTH,
      }),
    ),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: m.auth_field_error_confirm_password_not_match(),
    path: ['confirmPassword'],
  });
export type AuthSignUpSchema = z.infer<typeof authSignUpSchema>;
