import path from 'node:path';

function buildEslintCommand(filenames) {
  return `next lint --fix --file ${filenames
    .map((f) => path.relative(process.cwd(), f))
    .join(' --file ')}`;
}

/**
 * @type {import('lint-staged').Configuration}
 */
const lintStagedConfig = {
  '*.{ts,tsx}': () => ['tsc --noEmit'],
  '*.{js,mjs,cjs,jsx,ts,tsx}': function (stagedFiles) {
    return [buildEslintCommand(stagedFiles)];
  },
  '*.{html,css,md,json,yaml,yml}': function (stagedFiles) {
    return [`prettier --write ${stagedFiles.join(' ')}`];
  },
};

export default lintStagedConfig;
