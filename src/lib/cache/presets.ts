import type { CacheOptions } from '~/lib/cache/types';

export class CachePreset {
  /**
   * Prevents the response from being stored in any cache — browser or CDN.
   *
   * **When to use:** Responses that contain sensitive or user-specific data that
   * must never be persisted anywhere (e.g. authentication tokens, payment info,
   * one-time secrets, or any endpoint whose caching would constitute a security
   * risk).
   *
   * **Why:** `no-store` is the strongest prohibition. Unlike `no-cache` (which
   * still allows conditional storage), `no-store` instructs every intermediary
   * to discard the response immediately after delivery. No `cloudflare` override
   * is set because CDN-level storage of these responses is always wrong.
   *
   * @example
   * createCacheMiddleware(CachePreset.noStore())
   * // Cache-Control: no-store
   */
  static noStore(): CacheOptions {
    return { scope: 'no-store' };
  }

  /**
   * Allows caching but requires every cache to revalidate with the origin before
   * serving a stored response.
   *
   * **When to use:** Real-time or near-real-time data where the browser may still
   * benefit from conditional requests (304 Not Modified), but serving a stale
   * copy silently is not acceptable (e.g. dashboard summaries, live pricing,
   * inventory levels).
   *
   * **Why:** `no-cache` does not mean "do not cache" — it means "always check
   * freshness". Browsers can still store the response and avoid re-downloading
   * the body when the origin returns 304, saving bandwidth while guaranteeing
   * up-to-date content. No `cloudflare` override is set; CDN revalidation on
   * every request negates the benefit of a CDN.
   *
   * @example
   * createCacheMiddleware(CachePreset.noCache())
   * // Cache-Control: no-cache
   */
  static noCache(): CacheOptions {
    return { scope: 'no-cache' };
  }

  /**
   * Allows the browser to cache the response but prohibits shared/CDN caches
   * from storing it.
   *
   * **When to use:** Authenticated pages or API responses that are personal to
   * the logged-in user (e.g. profile pages, account settings, personalized feeds)
   * where browser caching speeds up navigation but CDN caching would serve one
   * user's data to another.
   *
   * **Why:** `private` restricts storage to the user's own browser cache.
   * `max-age=300` (5 min) lets the browser reuse the response across quick
   * navigation. `stale-while-revalidate=60` allows an immediate render of the
   * stale copy while a fresh fetch runs in the background, keeping the UX snappy
   * without sacrificing freshness. No `cloudflare` key is set deliberately —
   * Cloudflare must not store private responses.
   *
   * @example
   * createCacheMiddleware(CachePreset.private())
   * // Cache-Control: private, max-age=300, stale-while-revalidate=60
   */
  static private(): CacheOptions {
    return {
      scope: 'private',
      maxAge: 300,
      staleWhileRevalidate: 60,
    };
  }

  /**
   * Short browser freshness with a longer CDN TTL for frequently updated public
   * content.
   *
   * **When to use:** Public content that changes often but not on every request
   * (e.g. activity feeds, comment counts, leaderboards, live event listings).
   * You want CDN to absorb traffic spikes while keeping displayed data reasonably
   * fresh.
   *
   * **Why:** Browsers get a 60 s window (`max-age=60`) before considering the
   * response stale, with a 30 s revalidation grace (`stale-while-revalidate=30`)
   * for seamless background refreshes. Cloudflare's `s-maxage=300` lets the CDN
   * serve the same edge-cached copy for 5 min, absorbing origin load during
   * spikes, while a 60 s SWR grace on the CDN side means edge nodes revalidate
   * silently without interrupting users.
   *
   * @example
   * createCacheMiddleware(CachePreset.shortLived())
   * // Cache-Control: public, max-age=60, stale-while-revalidate=30
   * // CDN-Cache-Control: s-maxage=300, stale-while-revalidate=60
   */
  static shortLived(): CacheOptions {
    return {
      scope: 'public',
      maxAge: 60,
      staleWhileRevalidate: 30,
      cloudflare: {
        sMaxAge: 300,
        staleWhileRevalidate: 60,
      },
    };
  }

  /**
   * Standard public caching policy for typical marketing and informational pages.
   *
   * **When to use:** Public pages whose content changes infrequently throughout
   * the day (e.g. landing pages, feature pages, pricing, about pages). A good
   * default for any server-rendered page that does not contain personalized data.
   *
   * **Why:** Browsers treat responses as fresh for 5 min (`max-age=300`), with a
   * 60 s SWR window for background revalidation so users never see a loading
   * state between navigation. Cloudflare caches for 1 hour (`s-maxage=3600`)
   * with a 5 min SWR grace, dramatically reducing origin hits from repeated
   * visitors and crawlers while still picking up deploys within minutes.
   *
   * @example
   * createCacheMiddleware(CachePreset.standard())
   * // Cache-Control: public, max-age=300, stale-while-revalidate=60
   * // CDN-Cache-Control: s-maxage=3600, stale-while-revalidate=300
   */
  static standard(): CacheOptions {
    return {
      scope: 'public',
      maxAge: 300,
      staleWhileRevalidate: 60,
      cloudflare: {
        sMaxAge: 3_600,
        staleWhileRevalidate: 300,
      },
    };
  }

  /**
   * Long browser and CDN TTLs for rarely changing public content.
   *
   * **When to use:** Content that is updated on the order of days or weeks (e.g.
   * blog posts, documentation pages, changelogs, help articles). Suitable when
   * you can tolerate up to an hour of stale content in browsers and up to a week
   * in CDN after a publish.
   *
   * **Why:** A 24 h browser TTL (`max-age=86400`) eliminates redundant requests
   * for returning visitors in the same day, with a 1 h SWR grace to handle the
   * transition silently. Cloudflare stores for 7 days (`s-maxage=604800`),
   * keeping origin load near zero for stable content, while a 1 day SWR on the
   * CDN ensures deploys propagate gradually without a hard cache break.
   *
   * @example
   * createCacheMiddleware(CachePreset.longLived())
   * // Cache-Control: public, max-age=86400, stale-while-revalidate=3600
   * // CDN-Cache-Control: s-maxage=604800, stale-while-revalidate=86400
   */
  static longLived(): CacheOptions {
    return {
      scope: 'public',
      maxAge: 86_400,
      staleWhileRevalidate: 3_600,
      cloudflare: {
        sMaxAge: 604_800,
        staleWhileRevalidate: 86_400,
      },
    };
  }

  /**
   * Permanent caching for content-hashed static assets.
   *
   * **When to use:** Any asset whose URL includes a content hash or build
   * fingerprint, guaranteeing the URL changes whenever the content changes
   * (e.g. bundled JS/CSS files like `main.abc123.js`, versioned fonts, hashed
   * images). Never use this for URLs that can serve different content over time.
   *
   * **Why:** `max-age=31536000` (1 year) is the de-facto browser maximum for
   * permanent caching. The `immutable` directive tells the browser the file will
   * never change during its freshness lifetime, suppressing conditional
   * revalidation requests on back/forward navigation. Cloudflare mirrors the same
   * policy at the edge. Because the URL itself changes on every build, cache
   * busting is handled automatically — no manual purge is needed.
   *
   * @example
   * createCacheMiddleware(CachePreset.immutable())
   * // Cache-Control: public, max-age=31536000, immutable
   * // CDN-Cache-Control: s-maxage=31536000, immutable
   */
  static immutable(): CacheOptions {
    return {
      scope: 'public',
      maxAge: 31_536_000,
      immutable: true,
      cloudflare: {
        sMaxAge: 31_536_000,
        immutable: true,
      },
    };
  }
}
