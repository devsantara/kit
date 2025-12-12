// Format code with Prettier
function buildPrettierCommand(stagedFiles) {
  return `prettier --ignore-unknown --write ${stagedFiles.join(' ')}`;
}

/**
 * Lint staged files
 * @description Run commands on staged files based on their types
 * @type {import('lint-staged').Configuration}
 */
const lintStagedConfig = {
  '*': function (stagedFiles) {
    return [buildPrettierCommand(stagedFiles)];
  },
};

export default lintStagedConfig;
