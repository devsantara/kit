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

export const authGuardInputSchema = z
  .object({
    /**
     * Path to redirect back when the user is not authenticated.
     * This is used by the `authGuardFn` to know where to redirect the user after they log in.
     * It is passed as a search parameter when redirecting to the auth page.
     */
    redirectBack: z.string().optional(),
  })
  .optional();
