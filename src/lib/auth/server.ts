import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { APIError, createAuthMiddleware } from 'better-auth/api';
import { betterAuth } from 'better-auth/minimal';
import { tanstackStartCookies } from 'better-auth/tanstack-start';

import { AUTH_MIN_PASSWORD_LENGTH } from '~/lib/auth/constant';
import { getAuthErrorMessage } from '~/lib/auth/errors';
import { getDatabase } from '~/lib/database';
import {
  accountTable,
  sessionTable,
  userTable,
  verificationTable,
} from '~/lib/database/schema/auth.db';
import { serverEnv } from '~/lib/env/server';

export const authServer = betterAuth({
  secret: serverEnv.AUTH_SECRET,
  database: drizzleAdapter(getDatabase(), {
    provider: 'sqlite',
    usePlural: true,
    schema: {
      users: userTable,
      sessions: sessionTable,
      accounts: accountTable,
      verifications: verificationTable,
    },
  }),
  plugins: [tanstackStartCookies()],
  emailAndPassword: {
    enabled: true,
    autoSignIn: false,
    minPasswordLength: AUTH_MIN_PASSWORD_LENGTH,
  },
  socialProviders: {
    google: {
      accessType: 'offline',
      prompt: 'select_account consent',
      clientId: serverEnv.GOOGLE_CLIENT_ID,
      clientSecret: serverEnv.GOOGLE_CLIENT_SECRET,
    },
    github: {
      prompt: 'select_account',
      clientId: serverEnv.GITHUB_CLIENT_ID,
      clientSecret: serverEnv.GITHUB_CLIENT_SECRET,
    },
  },
  session: {
    expiresIn: 60 * 60 * 24 * 7, // 7 days
    updateAge: 60 * 60 * 24, // 1 day
    freshAge: 60 * 60 * 24, // 1 day
    cookieCache: {
      enabled: true,
      strategy: 'compact',
      maxAge: 5 * 60, // 5 minutes
    },
  },
  advanced: {
    cookiePrefix: 'auth',
    database: {
      generateId: 'uuid',
    },
  },
  hooks: {
    // oxlint-disable-next-line require-await
    after: createAuthMiddleware(async (ctx) => {
      const response = ctx.context.returned;
      if (!(response instanceof APIError)) {
        return;
      }
      const errorCode = response.body?.code;
      if (!errorCode) {
        throw new APIError(response.status, response.body);
      }
      throw new APIError(response.status, {
        ...response.body,
        message: getAuthErrorMessage(errorCode) ?? response.body?.message,
      });
    }),
  },
});
