import { defineMain } from '@storybook/react-vite/node';

export default defineMain({
  stories: ['../src/**/*.stories.@(js|jsx|mjs|ts|tsx|mdx)'],
  framework: '@storybook/react-vite',
  addons: ['@storybook/addon-docs'],
});
