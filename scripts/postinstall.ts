import { execSync } from 'node:child_process';
import { existsSync } from 'node:fs';

const HUSKY_DIRECTORY = './node_modules/husky';
const HUSKY_INSTALL_COMMAND = 'husky';

/**
 * Run husky install in non-production environments.
 * When running in production, we don't install devDependencies
 */
if (existsSync(HUSKY_DIRECTORY)) {
  execSync(HUSKY_INSTALL_COMMAND, { stdio: 'inherit' });
}
