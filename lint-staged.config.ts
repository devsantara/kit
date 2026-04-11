import type { Configuration } from 'lint-staged';

// Define file extensions
const JS_TS_EXTENSIONS = ['js', 'mjs', 'cjs', 'jsx', 'ts', 'mts', 'cts', 'tsx'];

// Construct glob patterns for lint-staged
const ALL_FILES = '*';
const JS_TS_FILES = `*.{${JS_TS_EXTENSIONS.join(',')}}`;

// Format code with Oxfmt
function buildFormatCommand(stagedFiles: readonly string[]) {
  return `pnpm run format --no-error-on-unmatched-pattern ${stagedFiles.join(' ')}`;
}

// Check and fix code with Oxlint
function buildLintCommand(stagedFiles: readonly string[]) {
  return `pnpm run lint ${stagedFiles.join(' ')}`;
}

/**
 * Lint staged files
 * @description Run commands on staged files based on their types
 */
const lintStagedConfig: Configuration = {
  [ALL_FILES]: function (stagedFiles) {
    return [buildFormatCommand(stagedFiles)];
  },
  [JS_TS_FILES]: function (stagedFiles) {
    return [buildLintCommand(stagedFiles)];
  },
};

export default lintStagedConfig;
