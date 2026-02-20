/// <reference types="vite/client" />

import { HeadBuilder } from '@devsantara/head';
import { HeadTanstackRouterAdapter } from '@devsantara/head/adapters';
import geistMonoFont from '@fontsource-variable/geist-mono/files/geist-mono-latin-wght-normal.woff2?url';
import geistSansFont from '@fontsource-variable/geist/files/geist-latin-wght-normal.woff2?url';
import { TanStackDevtools } from '@tanstack/react-devtools';
import { createRootRoute, HeadContent, Scripts } from '@tanstack/react-router';
import * as React from 'react';
import { preload } from 'react-dom';

import { tanstackRouterDevtools } from '~/devtools/router-devtools';
import { m } from '~/lib/i18n/messages';
import {
  baseLocale,
  getLocale,
  localizeHref,
  type Locale,
} from '~/lib/i18n/runtime';
import { PostHogProvider } from '~/lib/posthog/provider';
import { Toaster } from '~/ui/components/core/sonner';
import appStylesheet from '~/ui/styles/app.css?url';
import fontStylesheet from '~/ui/styles/fonts.css?url';
import { ThemeProvider } from '~/ui/styles/theme';

export const Route = createRootRoute({
  loader: ({ location }) => {
    return { currentHref: location.url.origin + location.url.pathname };
  },
  head: ({ loaderData }) => {
    /** @example http://localhost:3000/path/without/locale */
    const currentHref = loaderData?.currentHref ?? '';

    return new HeadBuilder({
      metadataBase: new URL(currentHref),
      adapter: new HeadTanstackRouterAdapter(),
    })
      .addCharSet('utf-8')
      .addViewport({ width: 'device-width', initialScale: 1 })
      .addStylesheet(fontStylesheet)
      .addStylesheet(appStylesheet)
      .addTitle(m.app_name())
      .addDescription(m.app_description())
      .addColorScheme('light dark')
      .addManifest((h) => h.resolveUrl('/site.webmanifest'))
      .addCanonical((h) => h.resolveUrl(localizeHref(currentHref)))
      .addAlternateLocale<Locale>((h) => ({
        'x-default': h.resolveUrl(
          localizeHref(currentHref, { locale: baseLocale }),
        ),
        en: h.resolveUrl(localizeHref(currentHref, { locale: 'en' })),
        id: h.resolveUrl(localizeHref(currentHref, { locale: 'id' })),
        'zh-CN': h.resolveUrl(localizeHref(currentHref, { locale: 'zh-CN' })),
      }))
      .addIcon('shortcut', { href: '/favicon.ico', sizes: '48x48' })
      .addIcon('icon', {
        href: '/favicon.svg',
        type: 'image/svg+xml',
        sizes: 'any',
      })
      .addIcon('icon', {
        href: '/favicon-96x96.png',
        type: 'image/png',
        sizes: '96x96',
      })
      .addIcon('apple', { href: '/apple-touch-icon.png', sizes: '180x180' })
      .addOpenGraph((h) => ({
        title: m.app_name(),
        description: m.app_description(),
        locale: getLocale(),
        type: { name: 'website' },
        url: h.resolveUrl(localizeHref(currentHref)),
        image: {
          url: 'https://assets.devsantara.com/kit/thumbnail.jpg',
          type: 'image/jpeg',
          width: 1280,
          height: 640,
        },
      }))
      .addTwitter({
        card: { name: 'summary' },
        title: m.app_name(),
        description: m.app_description(),
        site: '@devsantara_hq',
        image: { url: 'https://assets.devsantara.com/kit/thumbnail.jpg' },
      })
      .addMeta({ name: 'apple-mobile-web-app-title', content: m.app_name() })
      .build();
  },
  shellComponent: RootDocument,
});

function RootDocument({ children }: { children: React.ReactNode }) {
  preload(geistSansFont, { as: 'font', type: 'font/woff2' });
  preload(geistMonoFont, { as: 'font', type: 'font/woff2' });

  return (
    <html lang={getLocale()} className="antialiased" suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body>
        <ThemeProvider>
          <Toaster />
          <PostHogProvider>{children}</PostHogProvider>
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
