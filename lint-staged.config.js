import path from 'node:path';

const buildEslintCommand = (filenames) =>
  `next lint --fix --file ${filenames
    .map((f) => path.relative(process.cwd(), f))
    .join(' --file ')}`;

/**
 * @type {import('lint-staged').Configuration}
 */
const lintStagedConfig = {
  '*.{ts,tsx}': () => ['tsc --noEmit'],
  '*.{js,mjs,cjs,jsx,ts,tsx}': (stagedFiles) => [
    buildEslintCommand(stagedFiles),
  ],
};

export default lintStagedConfig;
