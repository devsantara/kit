import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { betterAuth } from 'better-auth/minimal';
import { tanstackStartCookies } from 'better-auth/tanstack-start';

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
    minPasswordLength: 6,
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
});
