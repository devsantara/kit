/**
 * Lint commit messages
 *
 * @example
 * ```
 * type
 * <type>[optional scope]: <subject/description>
 *
 * [optional body]
 *
 * [optional footer(s)]
 * ```
 * @see {@link https://commitlint.js.org}
 */

import { RuleConfigSeverity, type UserConfig } from '@commitlint/types';

const CommitlintConfig: UserConfig = {
  extends: ['@commitlint/config-conventional'],
  formatter: '@commitlint/format',
  rules: {
    /**
     * Scope must be use kebab-case.
     * @example fix(user-profile): fix crash on avatar upload
     *
     * NOTE: This rule is disabled because it prevent using numeric in scope (e.g i18n, a11y, etc).
     */
    // 'scope-case': [2, 'always', ['kebab-case']],

    /**
     * Subject formatting rules:
     * - No Start/Upper/Pascal case
     * - No ending with period
     * - Must not be empty
     */
    'subject-case': [2, 'never', ['start-case', 'pascal-case', 'upper-case']],
    'subject-empty': [2, 'never'], // Subject must not be empty
    'subject-full-stop': [2, 'never', '.'], // No period at end

    /**
     * Max length for commit header (type(scope): subject)
     */
    'header-max-length': [2, 'always', 72],

    /**
     * Ensure spacing for multiline commits
     * @requires blank line before body and footer
     */ 'body-leading-blank': [2, 'always'], // Blank line before body
    'footer-leading-blank': [2, 'always'], // Blank line before footer

    /**
     * Enforce specific allowed types to align with Conventional Commits.
     *
     * @see https://www.conventionalcommits.org/en/v1.0.0/
     *
     * @example feat(auth): enable passwordless login
     * @example fix(order): handle double charge on submit
     */
    'type-enum': [
      RuleConfigSeverity.Error,
      'always',
      [
        /**
         * New feature for the user
         * @example feat(cart): add checkout button
         */
        'feat',

        /**
         * Bug fix that resolves user-facing issue
         * @example fix(api): handle 500 error from payment gateway
         */
        'fix',

        /**
         * Changes to documentation only
         * @example docs(readme): clarify setup instructions
         */
        'docs',

        /**
         * Code formatting/style with no logic changes
         * @example style(ui): format modal padding
         */
        'style',

        /**
         * Code change that neither fixes a bug nor adds a feature
         * @example refactor(store): move actions to slice
         */
        'refactor',

        /**
         * Performance improvement
         * @example perf(map): memoize marker rendering
         */
        'perf',

        /**
         * Adding or updating tests
         * @example test(auth): add tests for login redirect
         */
        'test',

        /**
         * Changes affecting build tools or external dependencies
         * @example build(webpack): enable splitChunks optimization
         */
        'build',

        /**
         * Continuous Integration related changes
         * @example ci(github): add PR labeler action
         */
        'ci',

        /**
         * Routine tasks like bumping deps, renaming
         * @example chore(deps): update emotion to 11.11.0
         */
        'chore',

        /**
         * Reverts a previous commit
         * @example revert(user): rollback avatar upload
         */
        'revert',
      ],
    ],
  },
};

export default CommitlintConfig;
