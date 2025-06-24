import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { includeIgnoreFile } from '@eslint/compat';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const gitignorePath = path.resolve(__dirname, '.gitignore');

/**
 * @see {@link https://eslint.org/docs/latest/use/configure/configuration-files#configuration-file}
 * @type {import('eslint').Linter.Config}
 */
const eslintConfig = [
    includeIgnoreFile(gitignorePath),
];

export default eslintConfig;
