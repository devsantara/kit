import '../src/ui/styles/globals.css';

import {
  Controls,
  Description,
  Primary,
  Stories,
  Subtitle,
  Title,
} from '@storybook/addon-docs/blocks';
import { Geist, Geist_Mono } from 'next/font/google';
import { themes } from 'storybook/theming';

import { cn } from '~/ui/utils';

import { DocsContainer } from './docs-container';

import type { Preview } from '@storybook/nextjs-vite';

const fontSans = Geist(
  {
    variable: '--font-geist-sans',
    subsets: ['latin'],
    display: 'swap',
  },
);

const fontMono = Geist_Mono(
  {
    variable: '--font-geist-mono',
    subsets: ['latin'],
    display: 'swap',
  },
);

const preview: Preview = {
  tags: ['autodocs'],
  parameters: {
    darkMode: {
      dark: { ...themes.dark },
      light: { ...themes.normal },
      classTarget: 'body',
      stylePreview: true,
      darkClass: 'dark',
      lightClass: 'light',
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    docs: {
      container: DocsContainer,
      toc: true,
      page: () => (
        <>
          <Title />
          <Subtitle />
          <Description />
          <Primary />
          <Controls />
          <Stories />
        </>
      ),
    },
    a11y: {
      test: 'todo',
    },
  },
  decorators: [
    (Story) => (
      <main className={cn(
        fontSans.variable, fontMono.variable,
        'font-sans antialiased',
      )}
      >
        <Story />
      </main>
    ),
  ],
};

export default preview;
