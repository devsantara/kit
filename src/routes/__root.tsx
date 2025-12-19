/// <reference types="vite/client" />

import jetBrainsMonoFont from '@fontsource-variable/jetbrains-mono/files/jetbrains-mono-latin-wght-normal.woff2?url';
import plusJakartaSansFont from '@fontsource-variable/plus-jakarta-sans/files/plus-jakarta-sans-latin-wght-normal.woff2?url';
import { TanStackDevtools } from '@tanstack/react-devtools';
import { createRootRoute, HeadContent, Scripts } from '@tanstack/react-router';
import * as React from 'react';
import { preload } from 'react-dom';

import { tanstackRouterDevtools } from '~/devtools/router-devtools';
import { Toaster } from '~/ui/components/core/sonner';
import appStylesheet from '~/ui/styles/app.css?url';
import fontStylesheet from '~/ui/styles/fonts.css?url';
import { ThemeProvider } from '~/ui/styles/theme';

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { title: 'Devsantara Kit' },
    ],
    links: [
      { rel: 'stylesheet', href: fontStylesheet },
      { rel: 'stylesheet', href: appStylesheet },
    ],
  }),
  shellComponent: RootDocument,
});

function RootDocument({ children }: { children: React.ReactNode }) {
  preload(plusJakartaSansFont, { as: 'font', type: 'font/woff2' });
  preload(jetBrainsMonoFont, { as: 'font', type: 'font/woff2' });

  return (
    <html lang="en" className="antialiased" suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body>
        <ThemeProvider>
          <Toaster />
          {children}
          <TanStackDevtools
            config={{ position: 'bottom-right' }}
            plugins={[tanstackRouterDevtools]}
          />
        </ThemeProvider>
        <Scripts />
      </body>
    </html>
  );
}
