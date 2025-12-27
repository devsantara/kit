/**
 * Infrastructure provisioning with **Alchemy** for Cloudflare platform
 *
 * By default (when running locally) the stage will be your username ($USER, or $USERNAME on Windows).
 * We can also specify a stage with the `--stage` flag.
 *
 *  @example
 * ```bash
 * pnpm alchemy:deploy --stage production
 * ```
 */

import alchemy, { type Scope } from 'alchemy';
import { TanStackStart } from 'alchemy/cloudflare';
import { CloudflareStateStore, FileSystemStateStore } from 'alchemy/state';

import { alchemyEnv } from './src/lib/env/alchemy.ts';

const ALCHEMY_SECRET = alchemyEnv.ALCHEMY_SECRET;
const ALCHEMY_STATE_TOKEN = alchemy.secret(alchemyEnv.ALCHEMY_STATE_TOKEN);

function isProductionStage(scope: Scope) {
  return scope.stage === 'production';
}
function isStagingStage(scope: Scope) {
  return scope.stage.startsWith('staging');
}

const app = await alchemy('kit', {
  password: ALCHEMY_SECRET,
  stateStore: (scope) => {
    if (isProductionStage(scope) || isStagingStage(scope)) {
      return new CloudflareStateStore(scope, {
        scriptName: 'alchemy-state-service',
        stateToken: ALCHEMY_STATE_TOKEN,
      });
    }
    return new FileSystemStateStore(scope);
  },
});

export const worker = await TanStackStart('website', {
  adopt: true,
  observability: isProductionStage(app) ? { enabled: true } : undefined,
  url: isProductionStage(app) ? false : true,
  domains: isProductionStage(app) ? [alchemyEnv.HOSTNAME] : undefined,
  placement: isProductionStage(app) ? { mode: 'smart' } : undefined,
  bindings: {},
});

const workerDomain = worker.domains?.[0];
console.info({
  worker: worker.name,
  url: workerDomain ? `https://${workerDomain.name}` : worker.url,
});

await app.finalize();
