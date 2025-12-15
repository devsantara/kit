import addonDocs from '@storybook/addon-docs';
import { definePreview } from '@storybook/react-vite';

import '../src/ui/styles/app.css';

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
