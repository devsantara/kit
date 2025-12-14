import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { includeIgnoreFile } from '@eslint/compat';
import { default as eslintJsPlugin } from '@eslint/js';
import eslintTanstackRouterPlugin from '@tanstack/eslint-plugin-router';
import eslintTypescriptParser from '@typescript-eslint/parser';
import { defineConfig, type Config as EslintConfig } from 'eslint/config';
import eslintTailwindcssPlugin from 'eslint-plugin-better-tailwindcss';
import { importX as eslintImportPlugin } from 'eslint-plugin-import-x';
import eslintJsxA11yPlugin from 'eslint-plugin-jsx-a11y';
import eslintNodePlugin from 'eslint-plugin-n';
import eslintReactPlugin from 'eslint-plugin-react';
import eslintReactHooksPlugin from 'eslint-plugin-react-hooks';
import globals from 'globals';
import eslintTypescriptPlugin from 'typescript-eslint';

type Plugin = NonNullable<EslintConfig['plugins']>[string];

const gitignorePath = fileURLToPath(new URL('.gitignore', import.meta.url));
const tsConfigDirPath = path.dirname(fileURLToPath(import.meta.url));

const FILES = {
  ALL_SOURCE: 'src/**/*',
  JAVASCRIPT: '**/*.{js,mjs,cjs,jsx}',
  TYPESCRIPT: '**/*.{ts,mts,cts,tsx}',
  DTS: '**/*.d.ts',
  /** Reserved files that required to using default export */
  RESERVED_FOR_DEFAULT_EXPORTS: ['src/server.ts'],
} as const;

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
    files: [FILES.JAVASCRIPT, FILES.TYPESCRIPT],
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
    files: [FILES.TYPESCRIPT],
    extends: [
      eslintTypescriptPlugin.configs.strict,
      eslintTypescriptPlugin.configs.stylistic,
    ],
    languageOptions: {
      parser: eslintTypescriptParser,
      parserOptions: {
        // https://typescript-eslint.io/getting-started/typed-linting
        projectService: true,
        tsconfigRootDir: tsConfigDirPath,
        warnOnUnsupportedTypeScriptVersion: true,
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
    files: [FILES.DTS],
    rules: {
      '@typescript-eslint/no-explicit-any': ['off'],
    },
  },
]);

// #region Import Configs
const eslintImportConfig = defineConfig([
  {
    name: '[Import] Base',
    files: [FILES.JAVASCRIPT, FILES.TYPESCRIPT],
    plugins: {
      'import-x': eslintImportPlugin as unknown as Plugin,
    },
    extends: ['import-x/flat/recommended'],
    settings: {
      'import-x/resolver': {
        typescript: true,
        node: {
          extensions: [
            '.js',
            '.mjs',
            '.cjs',
            '.jsx',
            '.ts',
            '.mts',
            '.cts',
            '.tsx',
            '.d.ts',
          ],
        },
      },
    },
    rules: {
      'import-x/namespace': ['off'],
      'import-x/first': ['error'],
      'import-x/newline-after-import': ['error', { count: 1 }],
      'import-x/no-absolute-path': ['error'],
      'import-x/no-duplicates': ['error', { 'prefer-inline': true }],
      'import-x/no-cycle': ['error', { ignoreExternal: true, maxDepth: 3 }],
      'import-x/no-self-import': ['error'],
      'import-x/no-named-as-default-member': ['off'],
      'import-x/order': [
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
    files: [FILES.DTS],
    rules: {
      'import-x/no-default-export': ['off'],
      'import-x/prefer-default-export': ['error'],
    },
  },
  {
    name: '[Import] Named export files',
    files: [FILES.ALL_SOURCE],
    rules: {
      'import-x/no-default-export': ['error'],
    },
  },
  {
    name: '[Import] Default export files',
    files: [...FILES.RESERVED_FOR_DEFAULT_EXPORTS],
    rules: {
      'import-x/no-default-export': ['off'],
      'import-x/prefer-default-export': ['error'],
    },
  },
]);

// #region React Configs
const eslintReactConfig = defineConfig([
  {
    name: '[React] Base',
    files: [FILES.JAVASCRIPT, FILES.TYPESCRIPT],
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
    files: [FILES.JAVASCRIPT, FILES.TYPESCRIPT],
    ...eslintReactHooksPlugin.configs.flat.recommended,
  },
]);

// #region JSX A11y Configs
const eslintJsxA11yConfig = defineConfig([
  {
    name: '[JSX A11y] Base',
    files: [FILES.JAVASCRIPT, FILES.TYPESCRIPT],
    plugins: {
      'jsx-a11y': eslintJsxA11yPlugin,
    },
    rules: eslintJsxA11yPlugin.flatConfigs.strict.rules,
  },
]);

// #region Node Configs
const eslintNodeConfig = defineConfig([
  {
    name: '[Node] Base',
    files: [FILES.JAVASCRIPT, FILES.TYPESCRIPT],
    plugins: {
      node: eslintNodePlugin,
    },
    rules: {
      'node/prefer-node-protocol': ['error'],
    },
  },
]);

// #region Tanstack Router Configs
const eslintTanstackRouterConfig = defineConfig([
  {
    name: '[Tanstack Router] Base',
    files: [FILES.JAVASCRIPT, FILES.TYPESCRIPT],
    plugins: {
      '@tanstack/router': eslintTanstackRouterPlugin as unknown as Plugin,
    },
    rules: {
      ...eslintTanstackRouterPlugin.configs['flat/recommended'][0]?.rules,
      '@tanstack/router/create-route-property-order': ['error'],
    },
  },
]);

// #region Tailwindcss Configs
const eslintTailwindcssConfig = defineConfig([
  {
    name: '[Tailwindcss] Base',
    files: [FILES.JAVASCRIPT, FILES.TYPESCRIPT],
    settings: {
      'better-tailwindcss': {
        entryPoint: 'src/ui/styles/app.css',
        attributes: ['class', 'className', 'classNames'],
        callees: ['clsx', 'twMerge', 'cn', 'cva'],
      },
    },
    plugins: {
      'better-tailwindcss': eslintTailwindcssPlugin,
    },
    rules: {
      'better-tailwindcss/enforce-consistent-class-order': [
        'warn',
        { order: 'improved' },
      ],
      'better-tailwindcss/enforce-consistent-important-position': [
        'error',
        { position: 'recommended' },
      ],
      'better-tailwindcss/enforce-consistent-line-wrapping': ['off'],
      'better-tailwindcss/enforce-consistent-variable-syntax': [
        'error',
        {
          syntax: 'shorthand',
        },
      ],
      'better-tailwindcss/enforce-shorthand-classes': ['warn'],
      'better-tailwindcss/no-conflicting-classes': ['error'],
      'better-tailwindcss/no-deprecated-classes': ['error'],
      'better-tailwindcss/no-duplicate-classes': ['error'],
      'better-tailwindcss/no-unnecessary-whitespace': ['warn'],
      'better-tailwindcss/no-unregistered-classes': ['error'],
    },
  },
]);

// #region Restricted Syntax Configs
const restrictedSyntaxReactImport = defineRestrictedSyntaxRule([
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
]);

const eslintRestrictedSyntaxConfig = defineConfig([
  {
    name: '[Restricted Syntax] Base',
    files: [FILES.JAVASCRIPT, FILES.TYPESCRIPT],
    rules: {
      'no-restricted-syntax': ['error', ...restrictedSyntaxReactImport],
    },
  },
]);

// #region Merge All Configs
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
  ...eslintTanstackRouterConfig,
  ...eslintTailwindcssConfig,
  ...eslintRestrictedSyntaxConfig,
);

// #region Utilities
function defineRestrictedSyntaxRule(
  rules: { message: string; selector: string }[],
) {
  return rules.map((rule) => ({
    message: rule.message,
    selector: rule.selector,
  }));
}
