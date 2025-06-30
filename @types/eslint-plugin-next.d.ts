// "@next/eslint-plugin-next": "^15.3.4",
declare module '@next/eslint-plugin-next' {
  import { Linter } from 'eslint';

  export interface NextEslintPlugin {
    rules: Record<string, Linter.RuleModule>;
    configs: {
      'recommended': Linter.BaseConfig;
      'core-web-vitals': Linter.BaseConfig;
    };
  }

  export interface NextFlatConfig {
    recommended: {
      name: string;
      plugins: {
        '@next/next': NextEslintPlugin;
      };
      rules: Linter.RulesRecord;
    };
    coreWebVitals: {
      name: string;
      plugins: {
        '@next/next': NextEslintPlugin;
      };
      rules: Linter.RulesRecord;
    };
  }

  const plugin: NextEslintPlugin;

  export default plugin;
  export const rules: Record<string, Linter.RuleModule>;
  export const configs: {
    'recommended': Linter.BaseConfig;
    'core-web-vitals': Linter.BaseConfig;
  };
  export const flatConfig: NextFlatConfig;
}
