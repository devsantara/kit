import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { includeIgnoreFile } from '@eslint/compat';
import eslintJsPlugin from '@eslint/js';
import eslintNextPlugin from '@next/eslint-plugin-next';
import eslintStylisticPlugin from '@stylistic/eslint-plugin';
import eslintParserTypeScript from '@typescript-eslint/parser';
import eslintImportPlugin from 'eslint-plugin-import';
import eslintPluginJsxA11y from 'eslint-plugin-jsx-a11y';
import eslintReactPlugin from 'eslint-plugin-react';
import eslintReactHooksPlugin from 'eslint-plugin-react-hooks';
import globals from 'globals';
import eslintTypescriptPlugin, { type ConfigWithExtends } from 'typescript-eslint';

interface RestrictedSyntaxRuleItem { message: string; selector: string }

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const gitignorePath = path.resolve(__dirname, '.gitignore');

const nextJsAppReservedFiles = [
  'default',
  'error',
  'global-error',
  'forbidden',
  'layout',
  'loading',
  'not-found',
  'page',
  'route',
  'template',
  'unauthorized',
  'icon',
  'apple-icon',
  'opengraph-image',
  'twitter-image',
  'robots',
  'sitemap',
];

// #region Core Configs
const eslintCoreConfig: ConfigWithExtends[] = [
  {
    name: '[Core] Base',
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    linterOptions: {
      reportUnusedDisableDirectives: 'warn',
    },

  },
];

// #region Stylistic Configs
const eslintStylisticConfig: ConfigWithExtends[] = [
  {
    name: '[Stylistic] Base',
    files: ['**/*.{js,mjs,cjs,jsx}', '**/*.{ts,tsx}'],
    plugins: {
      '@stylistic': eslintStylisticPlugin,
    },
    rules: {
      ...eslintStylisticPlugin.configs.recommended.rules,
      '@stylistic/semi': ['error', 'always'],
      '@stylistic/quote-props': ['error', 'consistent'],
      '@stylistic/linebreak-style': ['error', 'unix'],
      '@stylistic/arrow-parens': ['error', 'always'],
      '@stylistic/array-bracket-newline': ['error', { multiline: true, minItems: null }],
      '@stylistic/object-curly-newline': ['error', { multiline: true, consistent: true }],
      '@stylistic/function-paren-newline': ['error', 'consistent'],
      '@stylistic/jsx-one-expression-per-line': ['error', { allow: 'single-line' }],
      '@stylistic/jsx-curly-spacing': ['error', { when: 'never', children: true }],
      '@stylistic/jsx-sort-props': [
        'error', {
          callbacksLast: true,
          shorthandFirst: true,
          ignoreCase: true,
          noSortAlphabetically: false,
          multiline: 'last',
        },
      ],
      '@stylistic/member-delimiter-style': [
        'error',
        {
          multiline: {
            delimiter: 'semi',
            requireLast: true,
          },
          singleline: {
            delimiter: 'semi',
            requireLast: false,
          },
          multilineDetection: 'brackets',
        },
      ],
    },
  },
];

// #region Javascript Configs
const eslintJavascriptConfig: ConfigWithExtends[] = [
  {
    name: '[Javascript] Base',
    files: ['**/*.{js,mjs,cjs,jsx}', '**/*.{ts,tsx}'],
    rules: {
      ...eslintJsPlugin.configs.recommended.rules,
      'func-style': ['error', 'declaration', { allowArrowFunctions: false }],
      'no-console': ['warn', { allow: ['error'] }],
      'prefer-const': [
        'error',
        { destructuring: 'all', ignoreReadBeforeAssign: false },
      ],
    },
  },
];

// #region Typescript Configs
const eslintTypescriptConfig: ConfigWithExtends[] = [
  {
    name: '[Typescript] Base',
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      parser: eslintParserTypeScript,
      parserOptions: {
        // https://typescript-eslint.io/getting-started/typed-linting
        projectService: true,
        tsconfigRootDir: __dirname,
        warnOnUnsupportedTypeScriptVersion: true,
      },
    },
    extends: [
      ...eslintTypescriptPlugin.configs.strictTypeChecked,
      ...eslintTypescriptPlugin.configs.stylisticTypeChecked,
    ],
    rules: {
      '@typescript-eslint/no-unused-vars': [
        'error',
        { args: 'all', argsIgnorePattern: '_', caughtErrorsIgnorePattern: '_' },
      ],
      '@typescript-eslint/no-empty-object-type': [
        'error',
        {
          allowInterfaces: 'with-single-extends',
          allowObjectTypes: 'never',
        },
      ],
    },
  },
  {
    // disable type-aware linting on JS files
    // only needed if you use TypeChecked rules
    // (and you have javascript files in your project)
    name: '[Typescript] Disable javascript TypeChecked',
    files: ['**/*.{js,mjs,cjs,jsx}'],
    languageOptions: eslintTypescriptPlugin.configs.disableTypeChecked.languageOptions,
    rules: eslintTypescriptPlugin.configs.disableTypeChecked.rules,
  },
  {
    name: '[Typescript] For definition files (.d.ts)',
    files: ['**/*.d.ts'],
    rules: {
      '@typescript-eslint/no-explicit-any': ['off'],
    },
  },
];

// #region Import Configs
const eslintImportConfig: ConfigWithExtends[] = [
  {
    name: '[Import] Base',
    files: ['**/*.{js,mjs,jsx,ts,tsx}'],
    languageOptions: {
      // Override the recommended configs
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
    settings: {
      'import/resolver': {
        node: true,
        typescript: true,
      },
    },
    extends: [
      eslintImportPlugin.flatConfigs.recommended,
      eslintImportPlugin.flatConfigs.typescript,
    ],
    rules: {
      'import/first': ['error'],
      'import/newline-after-import': ['error', { count: 1 }],
      'import/no-absolute-path': ['error'],
      'import/no-duplicates': ['error', { 'prefer-inline': true }],
      'import/no-cycle': ['error'],
      'import/no-self-import': ['error'],
      'import/no-named-as-default-member': ['off'],
      'import/order': [
        'error',
        {
          'groups': [
            'builtin',
            'external',
            'internal',
            'unknown',
            'parent',
            'sibling',
            'index',
            'object',
            'type',
          ],
          'newlines-between': 'always',
          'named': true,
          'alphabetize': {
            order: 'asc',
            caseInsensitive: true,
          },
        },
      ],
    },
  },
  {
    name: '[Import] For definition files (.d.ts)',
    files: ['**/*.d.ts'],
    rules: {
      'import/no-default-export': ['off'],
      'import/prefer-default-export': ['error'],
    },
  },
  {
    name: '[Import] For source code',
    files: ['src/**/*.{js,mjs,cjs,jsx}', 'src/**/*.{ts,tsx}'],
    rules: {
      // only allow named export in source code
      'import/no-default-export': ['error'],
    },
  },
  {
    name: '[Import] For NextJS App reserved files',
    files: [
      ...nextJsAppReservedFiles.map((filename) => {
        return `src/app/**/${filename}.{js,jsx,ts,tsx}`;
      }),
      'src/middleware.{js,ts}',
    ],
    rules: {
      // only allow default export in reserved files
      'import/no-default-export': ['off'],
      'import/prefer-default-export': ['error'],
    },
  },
];

// #region React Configs
const eslintReactConfig: ConfigWithExtends[] = [
  {
    name: '[React] Base',
    files: ['**/*.{jsx,tsx}'],
    languageOptions: {
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    settings: {
      react: {
        pragma: 'React',
        version: 'detect',
      },
    },
    plugins: {
      react: eslintReactPlugin,
    },
    rules: {
      ...eslintReactPlugin.configs.recommended.rules,
      ...eslintReactPlugin.configs['jsx-runtime'].rules,
      'react/jsx-no-leaked-render': ['error'],
      'react/function-component-definition': [
        'error',
        { namedComponents: 'function-declaration' },
      ],
    },
  },
];

// #region React Hooks Configs
const eslintReactHooksConfig: ConfigWithExtends[] = [
  {
    name: '[React Hooks] Base',
    files: ['**/*.{jsx,tsx}'],
    plugins: {
      'react-hooks': eslintReactHooksPlugin,
    },
    rules: {
      ...eslintReactHooksPlugin.configs['recommended-latest'].rules,
    },
  },
];

// #region JSX A11y Configs
const eslintJsxA11yConfig: ConfigWithExtends[] = [
  {
    name: '[JSX A11y] Base',
    files: ['**/*.{jsx,tsx}'],
    plugins: {
      'jsx-a11y': eslintPluginJsxA11y,
    },
    rules: {
      ...eslintPluginJsxA11y.flatConfigs.strict.rules,
    },
  },
];

// #region Next Configs
const eslintNextConfig: ConfigWithExtends[] = [
  {
    name: '[NextJS] Base',
    files: ['**/*.{js,mjs,cjs,jsx}', '**/*.{ts,tsx}'],
    plugins: {
      '@next/next': eslintNextPlugin,
    },
    rules: {
      ...eslintNextPlugin.configs.recommended.rules,
      ...eslintNextPlugin.configs['core-web-vitals'].rules,
    },
  },
];

// #region Restricted Syntax Configs
const restrictedSyntaxReactImport: RestrictedSyntaxRuleItem[] = [
  {
    message: 'Do not import default from React. Use a namespace `import * as React from \'react\'` instead.',
    selector: 'ImportDeclaration[source.value="react"] ImportDefaultSpecifier',
  },
  {
    message: 'Please import React using `import * as React from \'react\'` instead of named imports.',
    selector: 'ImportDeclaration[source.value=\'react\'] ImportSpecifier',
  },
  {
    message: 'Please import React using namespace `React` (case sensitive) `import * as React from \'react\'` instead of others.',
    selector: 'ImportDeclaration[source.value=\'react\'] ImportNamespaceSpecifier:not([local.name=\'React\'])',
  },
];

const eslintRestrictedSyntaxConfig: ConfigWithExtends[] = [
  {
    name: '[Restricted Syntax] Base',
    files: ['**/*.{js,mjs,cjs,jsx}', '**/*.{ts,tsx}'],
    rules: {
      'no-restricted-syntax': [
        'error',
        ...restrictedSyntaxReactImport,
      ],
    },
  },
];

// #region Merge All Configs
const eslintConfig = eslintTypescriptPlugin.config(
  includeIgnoreFile(gitignorePath),
  ...eslintCoreConfig,
  ...eslintStylisticConfig,
  ...eslintJavascriptConfig,
  ...eslintTypescriptConfig,
  ...eslintImportConfig,
  ...eslintReactConfig,
  ...eslintReactHooksConfig,
  ...eslintJsxA11yConfig,
  ...eslintNextConfig,
  ...eslintRestrictedSyntaxConfig,
);

export default eslintConfig;
