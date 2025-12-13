// Define file extensions
const TYPESCRIPT_EXTENSIONS = ['ts', 'mts', 'cts', 'tsx'];
const JAVASCRIPT_EXTENSIONS = ['js', 'mjs', 'cjs', 'jsx'];

// Construct glob patterns for lint-staged
const ALL_FILES = '*';
const TYPESCRIPT_FILES = `*.{${TYPESCRIPT_EXTENSIONS.join(',')}}`;
const JAVASCRIPT_FILES = `*.{${JAVASCRIPT_EXTENSIONS.join(',')}}`;

// Format code with Prettier
function buildPrettierCommand(stagedFiles) {
  return `prettier --ignore-unknown --write ${stagedFiles.join(' ')}`;
}

// Check and fix code with ESLint
function buildEslintCommand(stagedFiles) {
  return `eslint --cache --fix ${stagedFiles.join(' ')}`;
}

/**
 * Lint staged files
 * @description Run commands on staged files based on their types
 * @type {import('lint-staged').Configuration}
 */
const lintStagedConfig = {
  [ALL_FILES]: function (stagedFiles) {
    return [buildPrettierCommand(stagedFiles)];
  },
  [JAVASCRIPT_FILES]: function (filenames) {
    return [buildEslintCommand(filenames)];
  },
  [TYPESCRIPT_FILES]: function (filenames) {
    return [buildEslintCommand(filenames)];
  },
};

export default lintStagedConfig;
