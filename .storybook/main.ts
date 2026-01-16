import { defineMain } from '@storybook/react-vite/node';

export default defineMain({
  stories: ['../src/**/*.stories.@(js|jsx|mjs|ts|tsx|mdx)'],
  staticDirs: ['../public'],
  addons: ['@storybook/addon-docs'],
  framework: {
    name: '@storybook/react-vite',
    options: {
      builder: {
        viteConfigPath: './vite.storybook.ts',
      },
    },
  },
});
