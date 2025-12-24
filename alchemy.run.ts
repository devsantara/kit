/**
 * Infrastructure provisioning with **Alchemy** for Cloudflare platform
 *
 * By default (when running locally) the stage will be your username ($USER, or $USERNAME on Windows).
 * We can also specify a stage with the `--stage` flag.
 *
 * A typical setup for app with multiple stages:
 * - Personal/Local Stage - each developer runs deploy or dev and uses the default `$USER` stage.
 * - Pull Request Stage - each Pull Request deploys its own stage, pr-${pull-request-number}.
 * - Staging stage - deploy the `main` branch is deployed to the `staging` stage.
 * - Production Stage - deploy the `release` branch is deployed to the `production` stage.
 *
 *  @example
 * ```bash
 * pnpm alchemy:deploy --stage production
 * ```
 */

import alchemy, { type Scope } from 'alchemy';
import { TanStackStart } from 'alchemy/cloudflare';
import { CloudflareStateStore, FileSystemStateStore } from 'alchemy/state';

import { serverEnv } from './src/lib/env/server.ts';

const ALCHEMY_SECRET = serverEnv.ALCHEMY_SECRET;
const ALCHEMY_STATE_TOKEN = alchemy.secret(serverEnv.ALCHEMY_STATE_TOKEN);

/** Create a state store based on the current stage */
function createStateStore(scope: Scope) {
  // Using Cloudflare StateStore for the listed stages.
  if (['production', 'staging'].includes(scope.stage)) {
    return new CloudflareStateStore(scope, {
      scriptName: 'alchemy-state-service',
      stateToken: ALCHEMY_STATE_TOKEN,
    });
  }
  // Otherwise, use the default file system state store for the development stage/default `$USER`.
  return new FileSystemStateStore(scope);
}

const app = await alchemy('kit', {
  password: ALCHEMY_SECRET,
  stateStore: createStateStore,
});

export const worker = await TanStackStart('website', {
  adopt: true,
  observability: {
    enabled: app.stage === 'production',
  },
  placement: { mode: 'smart' },
  bindings: {},
});

console.info({ worker: worker.url });

await app.finalize();
