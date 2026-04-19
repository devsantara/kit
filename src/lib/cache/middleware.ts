/**
 * Middleware utilities for setting cache headers on requests and functions.
 *
 * Provides two middleware creators:
 * - cacheRequestMiddleware: for request-level caching
 * - cacheFunctionMiddleware: for function-level caching (GET only)
 */
import { createMiddleware } from '@tanstack/react-start';
import { setResponseHeader } from '@tanstack/react-start/server';

import {
  buildCacheControlHeader,
  CACHE_CONTROL_HEADER,
  CF_CACHE_CONTROL_HEADER,
} from '~/lib/cache/headers';
import type { CacheOptions } from '~/lib/cache/types';

/**
 * Creates a request middleware that sets cache headers on the response.
 *
 * @param options - Cache options to control the Cache-Control and CF-Cache-Control headers.
 * @returns Middleware that sets cache headers for each request.
 */
export function cacheRequestMiddleware(options: CacheOptions) {
  return createMiddleware({ type: 'request' }).server(async ({ next }) => {
    const result = await next();

    // Set standard Cache-Control header
    const cacheControl = buildCacheControlHeader(options);
    if (cacheControl) {
      result.response.headers.set(CACHE_CONTROL_HEADER, cacheControl);
    }

    // Set Cloudflare-specific cache header if options.cloudflare is provided
    const cfCacheControl = buildCacheControlHeader(options.cloudflare);
    if (cfCacheControl) {
      result.response.headers.set(CF_CACHE_CONTROL_HEADER, cfCacheControl);
    }

    return result;
  });
}

/**
 * Creates a function middleware that sets cache headers for GET requests only.
 *
 * @param options - Cache options to control the Cache-Control and CF-Cache-Control headers.
 * @returns Middleware that sets cache headers for GET function calls.
 */
export function cacheFunctionMiddleware(options: CacheOptions) {
  return createMiddleware({ type: 'function' }).server(
    async ({ next, method }) => {
      if (method !== 'GET') return next();
      const result = await next();

      // Set standard Cache-Control header
      const cacheControl = buildCacheControlHeader(options);
      if (cacheControl) {
        setResponseHeader(CACHE_CONTROL_HEADER, cacheControl);
      }

      // Set Cloudflare-specific cache header if options.cloudflare is provided
      const cfCacheControl = buildCacheControlHeader(options.cloudflare);
      if (cfCacheControl) {
        setResponseHeader(CF_CACHE_CONTROL_HEADER, cfCacheControl);
      }
      return result;
    },
  );
}
