import { fileURLToPath } from 'node:url';

import { includeIgnoreFile } from '@eslint/compat';
import { default as eslintJsPlugin } from '@eslint/js';
import eslintTypescriptParser from '@typescript-eslint/parser';
import { defineConfig, type Config as EslintConfig } from 'eslint/config';
import { importX as eslintImportPlugin } from 'eslint-plugin-import-x';
import eslintPluginJsxA11y from 'eslint-plugin-jsx-a11y';
import eslintNodePlugin from 'eslint-plugin-n';
import eslintReactPlugin from 'eslint-plugin-react';
import eslintReactHooksPlugin from 'eslint-plugin-react-hooks';
import globals from 'globals';
import eslintTypescriptPlugin from 'typescript-eslint';

const gitignorePath = fileURLToPath(new URL('.gitignore', import.meta.url));

type Plugin = NonNullable<EslintConfig['plugins']>[string];

interface RestrictedSyntaxRuleItem {
  message: string;
  selector: string;
}

// #region Core Configs
const eslintCoreConfig = defineConfig([
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
]);

// #region Javascript Configs
const eslintJavascriptConfig = defineConfig([
  {
    name: '[Javascript] Base',
    files: ['**/*.{js,mjs,cjs,jsx}', '**/*.{ts,tsx}'],
    rules: {
      ...eslintJsPlugin.configs.recommended.rules,
      eqeqeq: ['error', 'always'],
      'prefer-const': [
        'error',
        { destructuring: 'all', ignoreReadBeforeAssign: false },
      ],
      'func-style': ['error', 'declaration', { allowArrowFunctions: false }],
      'no-console': ['warn', { allow: ['error'] }],
      'no-fallthrough': ['off'],
      'no-unused-vars': ['off'],
      'no-undef': ['error'],
      'no-debugger': ['error'],
    },
  },
]);

// #region Typescript Configs
const eslintTypescriptConfig = defineConfig([
  {
    name: '[Typescript] Base',
    files: ['**/*.{ts,tsx}'],
    extends: [
      eslintTypescriptPlugin.configs.strict,
      eslintTypescriptPlugin.configs.stylistic,
    ],
    languageOptions: {
      parser: eslintTypescriptParser,
      parserOptions: {
        // https://typescript-eslint.io/getting-started/typed-linting
        projectService: true,
        tsconfigRootDir: __dirname,
        warnOnUnsupportedTypeScriptVersion: true,
      },
    },
    settings: {
      'import-x/resolver': {
        typescript: true,
        node: {
          extensions: ['.js', '.mjs', '.cjs', '.jsx', '.ts', '.tsx', '.d.ts'],
        },
      },
    },
    rules: {
      '@typescript-eslint/no-unused-vars': ['off'],
      '@typescript-eslint/no-unnecessary-condition': ['error'],
      '@typescript-eslint/no-extraneous-class': ['off'],
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
    name: '[Typescript] For definition files (.d.ts)',
    files: ['**/*.d.ts'],
    rules: {
      '@typescript-eslint/no-explicit-any': ['off'],
    },
  },
]);

// #region Import Configs
const eslintImportConfig = defineConfig([
  {
    name: '[Import] Base',
    files: ['**/*.{js,mjs,cjs,jsx}', '**/*.{ts,tsx}'],
    plugins: {
      import: eslintImportPlugin as unknown as Plugin,
    },
    extends: ['import/flat/recommended'],
    settings: {
      'import/resolver': {
        typescript: true,
        node: {
          extensions: ['.js', '.mjs', '.cjs', '.jsx', '.ts', '.tsx', '.d.ts'],
        },
      },
    },
    rules: {
      'import/namespace': ['off'],
      'import/first': ['error'],
      'import/newline-after-import': ['error', { count: 1 }],
      'import/no-absolute-path': ['error'],
      'import/no-duplicates': ['error', { 'prefer-inline': true }],
      'import/no-cycle': ['error', { ignoreExternal: true, maxDepth: 3 }],
      'import/no-self-import': ['error'],
      'import/no-named-as-default-member': ['off'],
      'import/order': [
        'error',
        {
          groups: [
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
          named: {
            enabled: true,
            import: true,
            export: true,
            require: true,
            types: 'types-last',
          },
          alphabetize: {
            order: 'asc',
            caseInsensitive: true,
          },
        },
      ],
    },
  },
  {
    name: '[Import] Definition files (.d.ts)',
    files: ['**/*.d.ts'],
    rules: {
      'import/no-default-export': ['off'],
      'import/prefer-default-export': ['error'],
    },
  },
  {
    name: '[Import] Named export files',
    files: ['src/**/*.{js,mjs,cjs,jsx}', 'src/**/*.{ts,tsx}'],
    rules: {
      'import/no-default-export': ['error'],
    },
  },
  {
    name: '[Import] Default export files',
    files: ['src/server.ts'],
    rules: {
      'import/no-default-export': ['off'],
      'import/prefer-default-export': ['error'],
    },
  },
]);

// #region React Configs
const eslintReactConfig = defineConfig([
  {
    name: '[React] Base',
    files: ['**/*.{jsx,tsx}'],
    plugins: {
      react: eslintReactPlugin,
    },
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
    rules: {
      ...eslintReactPlugin.configs.recommended.rules,
      ...eslintReactPlugin.configs['jsx-runtime'].rules,
      'react/prop-types': ['off'],
      'react/no-danger': ['error'],
      'react/jsx-boolean-value': ['error', 'never'],
      'react/self-closing-comp': ['error', { component: true, html: true }],
      'react/jsx-curly-spacing': ['error', 'never', { allowMultiline: true }],
      'react/jsx-no-leaked-render': ['error'],
      'react/function-component-definition': [
        'error',
        { namedComponents: 'function-declaration' },
      ],
      'react/jsx-no-duplicate-props': ['error'],
      'react/no-object-type-as-default-prop': ['error'],
      'react/jsx-no-target-blank': [
        'error',
        {
          allowReferrer: false,
          enforceDynamicLinks: 'always',
          warnOnSpreadAttributes: true,
        },
      ],
    },
  },
]);

// #region React Hooks Configs
const eslintReactHooksConfig = defineConfig([
  {
    name: '[React Hooks] Base',
    files: ['**/*.{js,mjs,cjs,jsx}', '**/*.{ts,tsx}'],
    ...eslintReactHooksPlugin.configs.flat.recommended,
  },
]);

// #region JSX A11y Configs
const eslintJsxA11yConfig = defineConfig([
  {
    name: '[JSX A11y] Base',
    files: ['**/*.{jsx,tsx}'],
    plugins: {
      'jsx-a11y': eslintPluginJsxA11y,
    },
    rules: eslintPluginJsxA11y.flatConfigs.strict.rules,
  },
]);

// #region Node Configs
const eslintNodeConfig = defineConfig([
  {
    name: '[Node] Base',
    files: ['**/*.{js,mjs,cjs,jsx}', '**/*.{ts,tsx}'],
    plugins: {
      node: eslintNodePlugin,
    },
    rules: {
      'node/prefer-node-protocol': ['error'],
    },
  },
]);

// #region Restricted Syntax Configs
const restrictedSyntaxReactImport: RestrictedSyntaxRuleItem[] = [
  {
    message:
      "Do not import default from React. Use a namespace `import * as React from 'react'` instead.",
    selector: 'ImportDeclaration[source.value="react"] ImportDefaultSpecifier',
  },
  {
    message:
      "Please import React using `import * as React from 'react'` instead of named imports.",
    selector: "ImportDeclaration[source.value='react'] ImportSpecifier",
  },
  {
    message:
      "Please import React using namespace `React` (case sensitive) `import * as React from 'react'` instead of others.",
    selector:
      "ImportDeclaration[source.value='react'] ImportNamespaceSpecifier:not([local.name='React'])",
  },
];

const eslintRestrictedSyntaxConfig = defineConfig([
  {
    name: '[Restricted Syntax] Base',
    files: ['**/*.{js,mjs,cjs,jsx}', '**/*.{ts,tsx}'],
    rules: {
      'no-restricted-syntax': ['error', ...restrictedSyntaxReactImport],
    },
  },
]);

export default defineConfig(
  includeIgnoreFile(gitignorePath, '[Ignore] .gitignore patterns'),
  ...eslintCoreConfig,
  ...eslintJavascriptConfig,
  ...eslintTypescriptConfig,
  ...eslintImportConfig,
  ...eslintReactConfig,
  ...eslintReactHooksConfig,
  ...eslintJsxA11yConfig,
  ...eslintNodeConfig,
  ...eslintRestrictedSyntaxConfig,
);
