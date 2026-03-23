import { paraglideVitePlugin as paraglide } from '@inlang/paraglide-js';
import babel from '@rolldown/plugin-babel';
import tailwindcss from '@tailwindcss/vite';
import { devtools } from '@tanstack/devtools-vite';
import { tanstackStart } from '@tanstack/react-start/plugin/vite';
import viteReact, { reactCompilerPreset } from '@vitejs/plugin-react';
import alchemy from 'alchemy/cloudflare/tanstack-start';
import { defineConfig, loadEnv, type ConfigEnv } from 'vite';

import { posthog } from './src/lib/posthog/plugin';

export default async function viteConfig({ mode }: ConfigEnv) {
  /**
   * Environment Variables aren't loaded automatically
   * @see {@link https://github.com/TanStack/router/issues/5217}
   */
  Object.assign(process.env, loadEnv(mode, process.cwd(), ''));
  /** Validate env's schema on build */
  await import('./src/lib/env/server');
  await import('./src/lib/env/client');

  return defineConfig({
    server: { port: 3000 },
    preview: { port: 3000 },
    resolve: {
      tsconfigPaths: true,
    },
    build: {
      target: 'esnext',
      minify: true,
      cssMinify: true,
      sourcemap: true,
      rollupOptions: {
        output: {
          manualChunks: (id) => {
            if (id.includes('posthog-js') || id.includes('@posthog/react')) {
              return 'posthog';
            }
          },
        },
        external: ['node:async_hooks', 'cloudflare:workers'],
      },
    },
    plugins: [
      devtools(),
      alchemy({ viteEnvironment: { name: 'ssr' } }),
      tailwindcss(),
      tanstackStart({ srcDirectory: 'src', router: { routeToken: 'layout' } }),
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
      posthog({
        host: process.env.POSTHOG_CLI_HOST,
        projectId: process.env.POSTHOG_CLI_PROJECT_ID,
        personalApiKey: process.env.POSTHOG_CLI_TOKEN,
      }),
    ],
  });
}
