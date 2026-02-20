import 'dotenv/config';

import { defineConfig } from 'drizzle-kit';

import { getLocalCloudflareD1Path } from './src/lib/auth/utils';

const DBEnvironments = ['local', 'remote'] as const;
type DBEnvironment = (typeof DBEnvironments)[number];
interface DBConfig {
  name: string;
  config: ReturnType<typeof defineConfig>;
}

const DB_ENV = process.env.DB_ENV as DBEnvironment;
const OUT_DIR = './src/lib/database/migrations';
const SCHEMA_DIR = './src/lib/database/schema';

/**
 * Remote database credentials are only set if all required environment variables are present.
 */
const REMOTE_CREDENTIALS =
  process.env.CLOUDFLARE_ACCOUNT_ID &&
  process.env.CLOUDFLARE_DATABASE_ID &&
  process.env.CLOUDFLARE_API_TOKEN
    ? {
        accountId: process.env.CLOUDFLARE_ACCOUNT_ID,
        databaseId: process.env.CLOUDFLARE_DATABASE_ID,
        token: process.env.CLOUDFLARE_API_TOKEN,
      }
    : undefined;

/**
 * Drizzle configuration for both local and remote environments.
 * The active configuration is determined by the DB_ENV environment variable.
 * - local: Uses a local SQLite database file.
 * - remote: Connects to a Cloudflare remote D1 database.
 */
const ENVIRONMENTS: Record<DBEnvironment, DBConfig> = {
  local: {
    name: 'Local D1',
    config: defineConfig({
      dialect: 'sqlite',
      out: OUT_DIR,
      schema: SCHEMA_DIR,
      dbCredentials: {
        url: `file:${getLocalCloudflareD1Path()}`,
      },
    }),
  },
  remote: {
    name: 'Remote D1',
    config: defineConfig({
      dialect: 'sqlite',
      driver: 'd1-http',
      out: OUT_DIR,
      schema: SCHEMA_DIR,
      dbCredentials: REMOTE_CREDENTIALS,
    }),
  },
};

const activeConfig = ENVIRONMENTS[DB_ENV];

if (!activeConfig) {
  throw new Error(
    `Invalid DB_ENV value. Expected one of ${DBEnvironments.join(', ')}. Please set the DB_ENV environment variable accordingly.`,
  );
}

console.info(`Running Drizzle config in ${activeConfig.name} mode`);

export default activeConfig.config;
