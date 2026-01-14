import '../src/ui/styles/app.css';

import addonDocs from '@storybook/addon-docs';
import { definePreview } from '@storybook/react-vite';

export default definePreview({
  addons: [addonDocs()],
  tags: ['autodocs'],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
});
