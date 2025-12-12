import * as prettierPluginOxc from '@prettier/plugin-oxc';

/**
 * @see https://prettier.io/docs/configuration
 * @type {import("prettier").Config}
 */
const prettierConfig = {
  plugins: [prettierPluginOxc],
  printWidth: 80,
  tabWidth: 2,
  useTabs: false,
  semi: true,
  singleQuote: true,
  jsxSingleQuote: false,
  trailingComma: 'all',
  endOfLine: 'lf',
  objectWrap: 'preserve',
  bracketSpacing: true,
  bracketSameLine: false,
  singleAttributePerLine: false,
  arrowParens: 'always',
};

export default prettierConfig;
