/**
 * Visibility and freshness scope for the `Cache-Control` header.
 *
 * - `public` — Response may be stored by any cache (browser, CDN, proxy).
 * - `private` — Response is intended for a single user and must not be stored by shared caches.
 * - `no-cache` — Cache must revalidate with the origin before serving a stored response.
 * - `no-store` — Response must not be stored in any cache at all.
 */
export type CacheScope = 'public' | 'private' | 'no-cache' | 'no-store';

/**
 * Structured representation of `Cache-Control` HTTP header directives.
 */
export interface CacheControlDirectives {
  /** Visibility and freshness scope (e.g. `public`, `private`, `no-cache`, `no-store`). */
  scope?: CacheScope;
  /** Maximum time in seconds a response is considered fresh by the browser (`max-age`). */
  maxAge?: number;
  /** Maximum time in seconds a response is considered fresh by shared/CDN caches (`s-maxage`). */
  sMaxAge?: number;
  /** Seconds a stale response may be served while a revalidation happens in the background (`stale-while-revalidate`). */
  staleWhileRevalidate?: number;
  /** When `true`, adds the `immutable` directive — signals the response will never change during its freshness lifetime. */
  immutable?: boolean;
}

/**
 * Cache configuration
 *
 * Extends {@link CacheControlDirectives} with an optional `cloudflare` override
 * that is written to the `CDN-Cache-Control` header, allowing independent
 * cache policies for Cloudflare and the browser.
 */
export interface CacheOptions extends CacheControlDirectives {
  /** Directives written to the `CDN-Cache-Control` header for Cloudflare-specific caching rules. */
  cloudflare?: CacheControlDirectives;
}
