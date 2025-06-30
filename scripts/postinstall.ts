import { execSync } from 'node:child_process';

const isProduction = process.env.NODE_ENV === 'production';
const isCI = process.env.CI === 'true';

/**
 * Skip Husky install in production and CI
 * @see {@link https://typicode.github.io/husky/how-to.html#ci-server-and-docker}
 */
if (!isProduction && !isCI) {
  execSync('husky', { stdio: 'inherit' });
}
