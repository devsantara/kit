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

import alchemy, { type Scope, type StateStore } from 'alchemy';
import { TanStackStart, type WorkerObservability } from 'alchemy/cloudflare';
import { CloudflareStateStore, FileSystemStateStore } from 'alchemy/state';

import { serverEnv } from './src/lib/env/server.ts';

type Stage = 'production' | 'staging' | (string & {});

//#region Secrets
const ALCHEMY_SECRET = serverEnv.ALCHEMY_SECRET;
const ALCHEMY_STATE_TOKEN = alchemy.secret(serverEnv.ALCHEMY_STATE_TOKEN);
//#endregion

//#region Configuration
function getStageStore(scope: Scope): StateStore {
  switch (scope.stage) {
    case 'production':
    case 'staging':
      return new CloudflareStateStore(scope, {
        scriptName: 'alchemy-state-service',
        stateToken: ALCHEMY_STATE_TOKEN,
      });
    default:
      return new FileSystemStateStore(scope);
  }
}

function getWorkerObservability(stage: Stage): WorkerObservability {
  switch (stage) {
    case 'production':
      return { enabled: true };
    default:
      return { enabled: false };
  }
}

function getWorkerUrl(stage: Stage): boolean {
  switch (stage) {
    case 'production':
    case 'staging':
      return false;
    default:
      return true;
  }
}

function getWorkerDomain(stage: Stage): string[] | undefined {
  switch (stage) {
    case 'production':
      return [serverEnv.HOSTNAME];
    case 'staging':
      return [`staging-${serverEnv.HOSTNAME}`];
    default:
      return undefined;
  }
}

function getWorkerPlacement(stage: Stage): { mode: 'smart' } | undefined {
  switch (stage) {
    case 'production':
      return { mode: 'smart' };
    default:
      return undefined;
  }
}
//#endregion

//#region Applications
const app = await alchemy('kit', {
  password: ALCHEMY_SECRET,
  stateStore: getStageStore,
});

export const worker = await TanStackStart('website', {
  adopt: true,
  observability: getWorkerObservability(app.stage),
  url: getWorkerUrl(app.stage),
  domains: getWorkerDomain(app.stage),
  placement: getWorkerPlacement(app.stage),
  bindings: {},
});

console.info({
  worker: worker.name,
  url: worker.domains?.map((domain) => `https://${domain.name}`) ?? worker.url,
});

await app.finalize();
//#endregion
