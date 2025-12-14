import { defineMain } from '@storybook/react-vite/node';

export default defineMain({
  stories: ['../src/**/*.stories.@(js|jsx|ts|tsx|mdx)'],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  addons: [],
});
