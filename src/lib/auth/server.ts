import { drizzleAdapter } from '@better-auth/drizzle-adapter';
import { APIError, createAuthMiddleware } from 'better-auth/api';
import { betterAuth } from 'better-auth/minimal';
import { tanstackStartCookies } from 'better-auth/tanstack-start';
import { waitUntil } from 'cloudflare:workers';

import { AUTH_MIN_PASSWORD_LENGTH } from '~/lib/auth/constant';
import { getAuthErrorMessage } from '~/lib/auth/errors';
import { getDatabase } from '~/lib/database';
import {
  accountTable,
  sessionTable,
  userTable,
  verificationTable,
} from '~/lib/database/schema/auth.db';
import { clientEnv } from '~/lib/env/client';
import { serverEnv } from '~/lib/env/server';
import { m } from '~/lib/i18n/messages';
import { getKVStore } from '~/lib/kv-store';
import { KV_STORE_MIN_TTL_IN_SECONDS } from '~/lib/kv-store/constants';

const kvStore = getKVStore();

export const authServer = betterAuth({
  appName: m.app_name(),
  baseURL: clientEnv.VITE_PUBLIC_BASE_URL,
  trustedOrigins: [clientEnv.VITE_PUBLIC_BASE_URL],
  secret: serverEnv.AUTH_SECRET,
  rateLimit: {
    enabled: true,
    storage: 'secondary-storage',
    window: 60, // time window in seconds
    max: 100, // max requests in the window
  },
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
  secondaryStorage: {
    get: async (key) => {
      return await kvStore.get(key);
    },
    set: async (key, value, ttl) => {
      if (!ttl) return await kvStore.put(key, value);
      // Cloudflare Workers KV has a minimum TTL of 60 seconds.
      // If the provided TTL is less than that, we set it to the minimum.
      let expirationTtl = ttl;
      if (expirationTtl < KV_STORE_MIN_TTL_IN_SECONDS) {
        expirationTtl = KV_STORE_MIN_TTL_IN_SECONDS;
      }
      return await kvStore.put(key, value, { expirationTtl });
    },
    delete: async (key) => {
      return await kvStore.delete(key);
    },
  },
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
      clientId: serverEnv.AUTH_GOOGLE_CLIENT_ID,
      clientSecret: serverEnv.AUTH_GOOGLE_CLIENT_SECRET,
    },
    github: {
      prompt: 'select_account',
      clientId: serverEnv.AUTH_GITHUB_CLIENT_ID,
      clientSecret: serverEnv.AUTH_GITHUB_CLIENT_SECRET,
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
  account: {
    encryptOAuthTokens: true,
    storeStateStrategy: 'cookie',
    accountLinking: {
      enabled: true,
    },
  },
  advanced: {
    cookiePrefix: 'auth',
    ipAddress: {
      ipAddressHeaders: ['CF-Connecting-IP', 'X-Forwarded-For'],
    },
    database: {
      generateId: 'uuid',
    },
    backgroundTasks: {
      handler: (task) => waitUntil(task),
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
