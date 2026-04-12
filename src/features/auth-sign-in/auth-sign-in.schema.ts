import * as z from 'zod/v4';

import { AUTH_MIN_PASSWORD_LENGTH } from '~/lib/auth/constant';
import { m } from '~/lib/i18n/messages';

export const authSignInSchema = z.object({
  email: z.email(m.auth_field_error_email_invalid()),
  password: z.string().min(
    AUTH_MIN_PASSWORD_LENGTH,
    m.auth_field_error_password_min_length({
      min: AUTH_MIN_PASSWORD_LENGTH,
    }),
  ),
});
export type AuthSignInSchema = z.infer<typeof authSignInSchema>;
