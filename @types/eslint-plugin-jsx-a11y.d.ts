// "eslint-plugin-jsx-a11y": "^6.10.2",
declare module 'eslint-plugin-jsx-a11y' {
  import { Linter } from 'eslint';

  export interface JsxA11yPlugin {
    meta: {
      name: string;
      version: string;
    };
    rules: Record<string, Linter.RuleModule>;
    configs: {
      recommended: Linter.BaseConfig;
      strict: Linter.BaseConfig;
    };
    flatConfigs: {
      recommended: FlatConfig;
      strict: FlatConfig;
    };
  }

  export interface FlatConfig {
    name: string;
    plugins: Record<string, any>;
    rules: Linter.RulesRecord;
    languageOptions?: Record<string, unknown>;
    settings?: Record<string, unknown>;
    processor?: string;
  }

  const jsxA11y: JsxA11yPlugin;

  export = jsxA11y;
}
