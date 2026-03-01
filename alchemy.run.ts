/**
 * Infrastructure provisioning with **Alchemy** for Cloudflare platform
 *
 * By default (when running locally) the stage will be your username ($USER, or $USERNAME on Windows).
 * We can also specify a stage with the `--stage` flag.
 *
 * Available stages:
 * - `production` (https://kit.devsantara.com) using CloudflareStateStore.
 * - `preview-<pr-number>` (https://kit--preview-1.devsantara.com) using CloudflareStateStore.
 * - `staging-<name>` (https://kit--staging-feature-xyz.devsantara.com) using CloudflareStateStore.
 * - `<other-custom-stage>` (http://localhost:3000) using FileSystemStateStore.
 *
 *  @example
 * ```bash
 * pnpm alchemy:deploy --stage staging-feature-xyz
 * ```
 */

import alchemy, { type Scope } from 'alchemy';
import { D1Database, TanStackStart } from 'alchemy/cloudflare';
import { GitHubComment } from 'alchemy/github';
import { CloudflareStateStore, FileSystemStateStore } from 'alchemy/state';
import { parse as parseURL } from 'tldts';

import packageJson from './package.json' with { type: 'json' };
import { alchemyEnv } from './src/lib/env/alchemy.ts';

const ALCHEMY_SECRET = alchemyEnv.ALCHEMY_SECRET;
const ALCHEMY_STATE_TOKEN = alchemy.secret(alchemyEnv.ALCHEMY_STATE_TOKEN);

function isProductionStage(scope: Scope) {
  return scope.stage === 'production';
}
function isPreviewStage(scope: Scope) {
  return scope.stage.startsWith('preview');
}
function isStagingStage(scope: Scope) {
  return scope.stage.startsWith('staging');
}

/**
 * Determines the domain(s) to be used for the deployment based on the stage.
 * - For production, it returns the main hostname.
 * - For preview/staging stages with subdomains (e.g. `kit.devsantara.com`), it returns domains in the format of `<subdomain>--<stage>.<domain>`.
 * - For preview/staging stages without subdomains, it returns domains in the format of `<stage>.<domain>`.
 * - For other stages (like local development), it returns undefined, allowing for default localhost usage.
 */
function getDomain(scope: Scope) {
  const { hostname, subdomain, domain } = parseURL(alchemyEnv.HOSTNAME);
  if (isProductionStage(scope)) {
    return [hostname ?? alchemyEnv.HOSTNAME];
  }
  if (isPreviewStage(scope) || isStagingStage(scope)) {
    if (subdomain === null || subdomain === '') {
      return [`${scope.stage}.${domain}`];
    }
    return [`${subdomain}--${scope.stage}.${domain}`];
  }
  return undefined;
}

/**
 * Determines the base URL for the application based on the deployment stage.
 * - For production, preview, and staging stages, it constructs the URL using the determined domain.
 * - For other stages (like local development), it defaults to `http://localhost:3000`.
 */
function getBaseURL(scope: Scope) {
  const domains = getDomain(scope);
  if (!domains) {
    return `http://localhost:3000`;
  }
  const domain = domains[0];
  return `https://${domain}`;
}

/**
 * Initialize Alchemy app with appropriate state store based on the deployment stage.
 * - For production, preview, and staging stages, it uses CloudflareStateStore for distributed state management.
 * - For other stages (like local development), it uses FileSystemStateStore for simplicity.
 */
const app = await alchemy('kit', {
  password: ALCHEMY_SECRET,
  stateStore: (scope) => {
    if (
      isProductionStage(scope) ||
      isPreviewStage(scope) ||
      isStagingStage(scope)
    ) {
      return new CloudflareStateStore(scope, {
        scriptName: 'alchemy-state-service',
        stateToken: ALCHEMY_STATE_TOKEN,
      });
    }
    return new FileSystemStateStore(scope);
  },
});

/** Provision a D1 database for the application */
const database = await D1Database('database', {
  adopt: true,
  migrationsDir: './src/lib/database/migrations',
  migrationsTable: 'drizzle_migrations',
  readReplication: {
    mode: isProductionStage(app) ? 'auto' : 'disabled',
  },
});

/** Provision a TanStack Start worker for the application */
export const worker = await TanStackStart('website', {
  adopt: true,
  observability: isProductionStage(app) ? { enabled: true } : undefined,
  url: isProductionStage(app) ? false : true,
  domains: getDomain(app),
  placement: isProductionStage(app) ? { mode: 'smart' } : undefined,
  bindings: {
    DATABASE: database,
    VITE_PUBLIC_BASE_URL: getBaseURL(app),
  },
});

console.info({ worker: worker.name, url: getBaseURL(app) });

if (process.env.PULL_REQUEST) {
  // If this is a PR, add a comment to the PR with the preview URL
  // It will auto-update with each push
  await GitHubComment('preview-comment', {
    owner: packageJson.author,
    repository: packageJson.name,
    issueNumber: Number(process.env.PULL_REQUEST),
    body: `## 🚀 Preview Deployment (${process.env.PULL_REQUEST})

Your changes have been deployed to a preview environment:

| Name               | Preview URL                         | Commit                                 | Updated (UTC)                               |
| :----------------- | :---------------------------------- | :------------------------------------- | :------------------------------------------ |
| **${worker.name}** | [Visit Preview](${getBaseURL(app)}) | ${process.env.GITHUB_SHA?.slice(0, 7)} | ${new Date(worker.updatedAt).toUTCString()} |

---
<sub>🏗️ This comment updates automatically with each push.</sub>`,
  });
}

await app.finalize();
