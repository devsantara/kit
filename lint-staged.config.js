// Define file extensions
const TYPESCRIPT_EXTENSIONS = ['ts', 'mts', 'cts', 'tsx'];
const JAVASCRIPT_EXTENSIONS = ['js', 'mjs', 'cjs', 'jsx'];

// Construct glob patterns for lint-staged
const ALL_FILES = '*';
const TYPESCRIPT_FILES = `*.{${TYPESCRIPT_EXTENSIONS.join(',')}}`;
const JAVASCRIPT_FILES = `*.{${JAVASCRIPT_EXTENSIONS.join(',')}}`;

// Format code with Prettier
/** @deprecated use oxfmt instead */
function _buildPrettierCommand(stagedFiles) {
  return `prettier --ignore-unknown --write ${stagedFiles.join(' ')}`;
}

// Format code with Oxfmt
function buildOxfmtCommand(stagedFiles) {
  return `oxfmt --no-error-on-unmatched-pattern ${stagedFiles.join(' ')}`;
}

// Check and fix code with ESLint
function buildEslintCommand(stagedFiles) {
  return `eslint --cache --fix ${stagedFiles.join(' ')}`;
}

// Type check with TypeScript
function buildTypeCheckCommand() {
  return 'tsc --noEmit';
}

/**
 * Lint staged files
 * @description Run commands on staged files based on their types
 * @type {import('lint-staged').Configuration}
 */
const lintStagedConfig = {
  [ALL_FILES]: function (stagedFiles) {
    return [buildOxfmtCommand(stagedFiles)];
  },
  [JAVASCRIPT_FILES]: function (stagedFiles) {
    return [buildEslintCommand(stagedFiles)];
  },
  [TYPESCRIPT_FILES]: function (stagedFiles) {
    return [buildTypeCheckCommand(), buildEslintCommand(stagedFiles)];
  },
};

export default lintStagedConfig;
