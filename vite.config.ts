import { paraglideVitePlugin as paraglide } from '@inlang/paraglide-js';
import posthogVitePlugin from '@posthog/rollup-plugin';
import babel from '@rolldown/plugin-babel';
import tailwindcss from '@tailwindcss/vite';
import { devtools as tanstackDevtools } from '@tanstack/devtools-vite';
import { tanstackStart } from '@tanstack/react-start/plugin/vite';
import viteReact, { reactCompilerPreset } from '@vitejs/plugin-react';
import alchemy from 'alchemy/cloudflare/tanstack-start';
import { defineConfig, loadEnv, type ConfigEnv } from 'vite';

export default async function viteConfig({ mode }: ConfigEnv) {
  /**
   * Environment Variables aren't loaded automatically
   * @see {@link https://github.com/TanStack/router/issues/5217}
   */
  Object.assign(process.env, loadEnv(mode, process.cwd(), ''));
  /** Validate env's schema on build */
  const { serverEnv } = await import('./src/lib/env/server');
  const { clientEnv } = await import('./src/lib/env/client');

  return defineConfig({
    server: { port: 3000 },
    preview: { port: 3000 },
    resolve: {
      tsconfigPaths: true,
    },
    devtools: {
      enabled: clientEnv.VITE_DEVTOOLS_ENABLED,
    },
    build: {
      target: 'esnext',
      minify: true,
      cssMinify: true,
      rolldownOptions: {
        external: ['node:async_hooks', 'cloudflare:workers'],
        output: {
          manualChunks: (id) => {
            if (id.includes('posthog-js') || id.includes('@posthog/react')) {
              return 'posthog';
            }
          },
        },
      },
    },
    plugins: [
      alchemy({ viteEnvironment: { name: 'ssr' } }),
      tailwindcss(),
      tanstackDevtools(),
      tanstackStart({
        srcDirectory: 'src',
        router: { routeToken: 'layout' },
        start: { entry: 'entry.start.ts' },
        server: { entry: 'entry.server.ts' },
        client: { entry: 'entry.client.tsx' },
      }),
      // React's vite plugin must come after start's vite plugin
      viteReact(),
      babel({ presets: [reactCompilerPreset()] }),
      paraglide({
        project: './project.inlang',
        outdir: './src/lib/i18n',
        cookieName: 'LOCALE',
        outputStructure: 'message-modules',
        strategy: ['url', 'cookie', 'preferredLanguage', 'baseLocale'],
        // DisableAsyncLocalStorage should ONLY be used in serverless environments like Cloudflare Workers.
        disableAsyncLocalStorage: true,
        urlPatterns: [
          {
            pattern: '/',
            localized: [
              ['en', '/en'],
              ['id', '/id'],
              ['zh-CN', '/zh-CN'],
            ],
          },
          {
            pattern: '/:path(.*)?',
            localized: [
              ['en', '/en/:path(.*)?'],
              ['id', '/id/:path(.*)?'],
              ['zh-CN', '/zh-CN/:path(.*)?'],
            ],
          },
        ],
      }),
      clientEnv.VITE_PUBLIC_POSTHOG_ENABLED
        ? [
            posthogVitePlugin({
              host: serverEnv.POSTHOG_CLI_HOST,
              projectId: serverEnv.POSTHOG_CLI_PROJECT_ID,
              personalApiKey: serverEnv.POSTHOG_CLI_TOKEN,
              sourcemaps: {
                enabled: true,
                deleteAfterUpload: true,
              },
            }),
          ]
        : [],
    ],
  });
}
