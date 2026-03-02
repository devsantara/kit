import * as z from 'zod/v4';

export const authSearchParamsSchema = z.object({
  /**
   * Path of the protected page the user was trying to access before being redirected to auth.
   * When an unauthenticated user attempts to access a protected route, they are redirected
   * to the authentication page with this parameter containing the original path. After successful
   * authentication, the user will be redirected back to this path instead of the default post-auth page.
   */
  redirectBack: z.string().optional(),
});
