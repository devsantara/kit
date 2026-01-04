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
import { GitHubComment } from 'alchemy/github';
import { CloudflareStateStore, FileSystemStateStore } from 'alchemy/state';

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

const app = await alchemy('kit', {
  password: ALCHEMY_SECRET,
  stateStore: (scope) => {
    if (isProductionStage(scope) || isPreviewStage(scope)) {
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
const workerUrl = workerDomain ? `https://${workerDomain.name}` : worker.url;
console.info({ worker: worker.name, url: workerUrl });

if (process.env.PULL_REQUEST) {
  // If this is a PR, add a comment to the PR with the preview URL
  // It will auto-update with each push
  await GitHubComment('preview-comment', {
    owner: packageJson.author,
    repository: packageJson.name,
    issueNumber: Number(process.env.PULL_REQUEST),
    body: `## 🚀 Preview Deployment

Your changes have been deployed to a preview environment:

| Name               | Preview URL                   | Commit                                 | Updated (UTC)                               |
| :----------------- | :---------------------------- | :------------------------------------- | :------------------------------------------ |
| **${worker.name}** | [Visit Preview](${workerUrl}) | ${process.env.GITHUB_SHA?.slice(0, 7)} | ${new Date(worker.updatedAt).toUTCString()} |

---
<sub>🏗️ This comment updates automatically with each push.</sub>`,
  });
}

await app.finalize();
