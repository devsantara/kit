import type { CacheControlDirectives } from '~/lib/cache/types';

/** Standard Cache-Control header name */
export const CACHE_CONTROL_HEADER = 'Cache-Control';
/** Cloudflare CDN-specific cache control header */
export const CF_CACHE_CONTROL_HEADER = 'CDN-Cache-Control';

/**
 * Serializes a {@link CacheControlDirectives} object into a `Cache-Control` header value string.
 *
 * Directives are only included when explicitly set — `undefined` fields are omitted.
 * Returns `undefined` when no directives are provided or all fields are `undefined`,
 * so callers can skip setting the header entirely.
 *
 * @param options - Cache-Control directives to serialize.
 * @returns A comma-separated directive string (e.g. `"public, max-age=3600"`),
 *   or `undefined` if there is nothing to serialize.
 *
 * @example
 * buildCacheControlHeader({ scope: 'public', maxAge: 3600, staleWhileRevalidate: 60 });
 * // => "public, max-age=3600, stale-while-revalidate=60"
 *
 * buildCacheControlHeader(undefined);
 * // => undefined
 */
export function buildCacheControlHeader(
  options?: CacheControlDirectives,
): string | undefined {
  if (!options) return undefined;
  const directives: string[] = [];

  if (options.scope) {
    directives.push(options.scope);
  }

  if (options.maxAge !== undefined) {
    directives.push(`max-age=${options.maxAge}`);
  }

  if (options.sMaxAge !== undefined) {
    directives.push(`s-maxage=${options.sMaxAge}`);
  }

  if (options.staleWhileRevalidate !== undefined) {
    directives.push(`stale-while-revalidate=${options.staleWhileRevalidate}`);
  }

  if (options.immutable) {
    directives.push('immutable');
  }

  if (directives.length === 0) {
    return undefined;
  }

  return directives.join(', ');
}
