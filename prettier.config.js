/**
 * @see https://prettier.io/docs/configuration
 * @type {import("prettier").Config}
 */
const prettierConfig = {
  // General Formatting
  printWidth: 80,
  tabWidth: 2,
  useTabs: false,
  semi: true,

  // Quotation Marks
  singleQuote: true,
  jsxSingleQuote: false,

  // Comma and Brackets
  trailingComma: 'all',
  bracketSpacing: true,
  bracketSameLine: false,
  objectWrap: 'preserve',

  // Parentheses
  arrowParens: 'always',

  // Line Breaks and Spacing
  endOfLine: 'lf',
  singleAttributePerLine: false,
};

export default prettierConfig;
