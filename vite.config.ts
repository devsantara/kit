import tailwindcss from '@tailwindcss/vite';
import { devtools } from '@tanstack/devtools-vite';
import { tanstackStart } from '@tanstack/react-start/plugin/vite';
import viteReact from '@vitejs/plugin-react';
import alchemy from 'alchemy/cloudflare/tanstack-start';
import { defineConfig, loadEnv, type ConfigEnv } from 'vite';
import tsConfigPaths from 'vite-tsconfig-paths';

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
    build: {
      target: 'esnext',
      minify: true,
      cssMinify: true,
      rollupOptions: {
        external: ['node:async_hooks', 'cloudflare:workers'],
      },
    },
    plugins: [
      alchemy(),
      devtools(),
      tailwindcss(),
      tsConfigPaths({ projects: ['./tsconfig.json'] }),
      tanstackStart({ srcDirectory: 'src', router: { routeToken: 'layout' } }),
      // React's vite plugin must come after start's vite plugin
      viteReact(),
    ],
  });
}
