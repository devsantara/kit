import posthogVitePlugin, {
  type PostHogRollupPluginOptions,
} from '@posthog/rollup-plugin';

/**
 * Create a PostHog Vite/Rollup plugin instance only when the required
 * PostHog configuration is present.
 *
 * This wrapper is useful when you want sourcemap upload + injection in some
 * environments (e.g. production CI) but want to avoid running the plugin in
 * others (e.g. local dev, preview builds).
 *
 * If any required option is missing, this function returns `undefined` so it
 * can be conditionally included in your Vite/Rollup plugins array without
 * additional branching.
 *
 * When enabled, the underlying PostHog plugin will:
 * - inject sourcemap references
 * - upload sourcemaps
 * - delete sourcemaps after upload (as configured)
 */
export function posthog(options: Partial<PostHogRollupPluginOptions>) {
  if (!options.personalApiKey || !options.envId || !options.host) {
    return undefined;
  }

  return posthogVitePlugin({
    host: options.host,
    envId: options.envId,
    personalApiKey: options.personalApiKey,
    ...options,
    sourcemaps: {
      enabled: true,
      deleteAfterUpload: true,
      ...options.sourcemaps,
    },
  });
}
