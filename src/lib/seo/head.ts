import * as React from 'react';

import type { AlternateLocaleOptions } from '~/lib/seo/types/alternate';
import type {
  ColorSchemeOptions,
  IconOptions,
  RobotOptions,
  ViewportOptions,
} from '~/lib/seo/types/metadata';
import type { OpenGraphOptions } from '~/lib/seo/types/opengraph';
import type { TwitterOptions } from '~/lib/seo/types/twitter';

type Awaitable<T> = T | Promise<T>;
type Meta = React.DetailedHTMLProps<
  React.MetaHTMLAttributes<HTMLMetaElement>,
  HTMLMetaElement
>;
type Link = React.DetailedHTMLProps<
  React.LinkHTMLAttributes<HTMLLinkElement>,
  HTMLLinkElement
>;
type Script = React.DetailedHTMLProps<
  React.ScriptHTMLAttributes<HTMLScriptElement>,
  HTMLScriptElement
>;
type Style = React.DetailedHTMLProps<
  React.StyleHTMLAttributes<HTMLStyleElement>,
  HTMLStyleElement
>;

interface HeadResult {
  meta?: Meta[];
  links?: Link[];
  scripts?: Script[];
  styles?: Style[];
}

/**
 * HeadBuilder - A fluent builder class for constructing SEO-optimized HTML head metadata
 *
 * This class provides a comprehensive, chainable API for building HTML head elements including
 * meta tags, link elements, scripts, and styles. It supports common SEO practices such as
 * Open Graph, Twitter Cards, canonical URLs, and robot directives.
 *
 * The builder follows the Builder design pattern, allowing you to chain multiple method calls
 * to construct a complete head configuration before calling `build()` to generate the result.
 *
 * @example
 * const head = new HeadBuilder('https://devsantara.com')
 *   .addCharSet('utf-8')
 *   .addTitle('My Awesome Website')
 *   .addDescription('A comprehensive guide to building great websites')
 *   .addViewport({
 *     width: 'device-width',
 *     initialScale: 1,
 *   })
 *   .build();
 *
 * // Result:
 * {
 *   meta: [
 *     { charSet: 'utf-8' },
 *     { title: 'My Awesome Website' },
 *     { name: 'description', content: 'A comprehensive guide to building great websites' },
 *     { name: 'viewport', content: 'width=device-width, initial-scale=1' }
 *   ],
 *   links: [],
 *   scripts: [],
 *   styles: []
 * }
 */
export class HeadBuilder {
  private metadataBase?: URL;
  private meta: Meta[] = [];
  private links: Link[] = [];
  private scripts: Script[] = [];
  private styles: Style[] = [];

  /**
   * Creates a new HeadBuilder instance with optional metadataBase configuration
   *
   * The metadataBase serves as the base path and origin for absolute URLs in various
   * metadata fields. When relative URLs (for Open Graph images, alternates, etc.) are used,
   * they are composed with this base. If not provided, relative URLs will be used as-is.
   *
   * @param metadataBase - The base URL to use for resolving relative URLs in metadata
   *
   * @example
   * const head = new HeadBuilder('https://devsantara.com')
   *   .addOpenGraph({
   *     title: 'My Article',
   *     image: { url: '/og-image.jpg' } // Will resolve to https://devsantara.com/og-image.jpg
   *   })
   *   .build();
   */
  constructor(metadataBase?: URL) {
    this.metadataBase = metadataBase;
  }

  /**
   * Resolves a URL by composing relative URLs with the metadataBase
   *
   * If the URL is already absolute (contains a protocol), it's returned unchanged.
   * If the URL is relative and metadataBase is provided, they're composed together.
   * If the URL is relative and metadataBase is not provided, the URL is returned as-is.
   */
  private resolveUrl(url: string | URL) {
    if (url instanceof URL) return url.toString();
    if (!this.metadataBase) return url;

    try {
      // Try to parse as absolute URL
      // oxlint-disable-next-line no-new
      new URL(url);
      return url;
    } catch {
      try {
        // It's relative, compose with base
        return new URL(url, this.metadataBase).toString();
      } catch {
        // If base is invalid, return original URL
        return url;
      }
    }
  }

  /**
   * Adds a charset meta tag to specify the character encoding of the document
   *
   * The charset meta tag declares the character encoding used by the document, typically UTF-8.
   * This should be one of the first meta tags in the head section to ensure proper character
   * rendering across all browsers and devices.
   *
   * @example
   * const head = new HeadBuilder()
   *   .addCharSet('utf-8')
   *   .build();
   *
   * // Result:
   * <meta charset="utf-8" />
   */
  addCharSet(charSet: string) {
    this.meta.push({ charSet });
    return this;
  }

  /**
   * Adds a viewport meta tag to control layout and scaling on mobile devices
   *
   * The viewport meta tag is crucial for responsive web design. It instructs the browser
   * how to scale and render the page, particularly on mobile devices. Without this tag,
   * mobile browsers will attempt to scale the full desktop page to fit the screen, often
   * resulting in zoomed-out, unreadable content.
   *
   * @example
   * const head = new HeadBuilder()
   *   .addViewport({
   *     width: 'device-width',
   *     initialScale: 1,
   *   })
   *   .build();
   *
   * // Result:
   * <meta name="viewport" content="width=device-width, initial-scale=1" />
   */
  addViewport(options: ViewportOptions) {
    const contentParts: string[] = [];
    if (options.width) {
      contentParts.push(`width=${options.width}`);
    }
    if (options.height) {
      contentParts.push(`height=${options.height}`);
    }
    if (options.initialScale) {
      contentParts.push(`initial-scale=${options.initialScale}`);
    }
    if (options.minimumScale) {
      contentParts.push(`minimum-scale=${options.minimumScale}`);
    }
    if (options.maximumScale) {
      contentParts.push(`maximum-scale=${options.maximumScale}`);
    }
    if (options.userScalable !== undefined) {
      contentParts.push(`user-scalable=${options.userScalable ? 'yes' : 'no'}`);
    }
    if (options.viewportFit) {
      contentParts.push(`viewport-fit=${options.viewportFit}`);
    }
    if (options.interactiveWidget) {
      contentParts.push(`interactive-widget=${options.interactiveWidget}`);
    }

    const content = contentParts.join(', ');
    this.meta.push({ name: 'viewport', content });
    return this;
  }

  /**
   * Adds a canonical link tag to specify the preferred version of a web page
   *
   * The canonical URL tells search engines which version of a page to prioritize when
   * multiple URLs have similar or identical content. This is essential for:
   * - Preventing duplicate content issues with search engines
   * - Consolidating ranking signals to the preferred URL
   * - Managing URL variants (HTTP vs HTTPS, www vs non-www, trailing slashes)
   * - Handling pagination and session parameters
   *
   * Relative URLs are resolved using the metadataBase if provided.
   *
   * @example
   * const head = new HeadBuilder('https://devsantara.com')
   *   .addCanonical('/blogs/nusantara')
   *   .build();
   *
   * // Result:
   * <link rel="canonical" href="https://devsantara.com/blogs/nusantara" />
   */
  addCanonical(url: string | URL) {
    this.links.push({ rel: 'canonical', href: this.resolveUrl(url) });
    return this;
  }

  /**
   * Adds alternate locale links to specify the page's translations or variants
   *
   * Alternate locale links help search engines understand which pages are translations
   * or variants of the same content in different languages or for different regions.
   * This is crucial for international SEO and helps users find content in their locale.
   *
   * Relative URLs are resolved using the metadataBase if provided.
   *
   * @example
   * const head = new HeadBuilder()
   *   .addAlternateLocales({
   *      'x-default': 'https://devsantara.com/en',
   *      'en': 'https://devsantara.com/en',
   *      'fr': 'https://devsantara.com/fr'
   *   })
   *   .build();
   *
   * // Result:
   * <link rel="alternate" hrefLang="x-default" href="https://devsantara.com/en" />
   * <link rel="alternate" hrefLang="en" href="https://devsantara.com/en" />
   * <link rel="alternate" hrefLang="fr" href="https://devsantara.com/fr" />
   */
  addAlternateLocales<TLocale extends string = string>(
    alternates: AlternateLocaleOptions<TLocale>,
  ) {
    Object.entries(alternates).map(([locale, url]) => {
      this.links.push({
        rel: 'alternate',
        hrefLang: locale,
        href: this.resolveUrl(url),
      });
    });
    return this;
  }

  /**
   * Adds a manifest link for progressive web app (PWA) configuration
   *
   * The manifest link points to a JSON file that contains metadata about your web application,
   * including the app name, icons, theme colors, and display preferences. This is essential
   * for progressive web apps that can be installed on mobile devices and desktops.
   *
   * @example
   * const head = new HeadBuilder()
   *   .addManifest('/manifest.json')
   *   .build();
   *
   * // Result:
   * <link rel="manifest" href="/manifest.json" />
   */
  addManifest(url: string | URL) {
    this.links.push({ rel: 'manifest', href: String(url) });
    return this;
  }

  /**
   * Adds keywords meta tag for search engine optimization
   *
   * The keywords meta tag provides a list of keywords relevant to the page content.
   * While modern search engines like Google place less emphasis on keywords, they can still
   * be useful for other search engines and content discovery. Keep keywords relevant and
   * avoid keyword stuffing.
   *
   * @example
   * const head = new HeadBuilder()
   *   .addKeywords(['web development', 'SEO', 'best practices'])
   *   .build();
   *
   * // Result:
   * <meta name="keywords" content="web development, SEO, best practices" />
   */
  addKeywords(keywords: string[]) {
    this.meta.push({ name: 'keywords', content: keywords.join(', ') });
    return this;
  }

  /**
   * Adds a color-scheme meta tag to indicate the color theme preferences
   *
   * The color-scheme meta tag allows web developers to declare which color schemes
   * their page supports (light mode, dark mode, or both). This helps browsers and
   * operating systems render the page appropriately and improves user experience
   * by respecting user's system preferences.
   *
   * @example
   * const head = new HeadBuilder()
   *   .addColorScheme('light dark')
   *   .build();
   *
   * // Result:
   * <meta name="color-scheme" content="light dark" />
   */
  addColorScheme(scheme: ColorSchemeOptions) {
    this.meta.push({ name: 'color-scheme', content: scheme });
    return this;
  }

  /**
   * Adds a title meta tag specifying the page title
   *
   * The title tag is critical for SEO and user experience. It appears in search engine
   * results, browser tabs, and browser history. Keep titles concise,
   * descriptive, and unique across your site. Include primary keywords naturally without
   * keyword stuffing.
   *
   * @example
   * const head = new HeadBuilder()
   *   .addTitle('Devsantara')
   *   .build();
   *
   * // Result:
   * <title>Devsantara</title>
   */
  addTitle(title: string) {
    this.meta.push({ title });
    return this;
  }

  /**
   * Adds a meta description tag summarizing the page content
   *
   * The meta description provides a concise summary of the page content
   * that appears in search engine results.
   *
   * @example
   * // Basic page description
   * const head = new HeadBuilder()
   *   .addDescription('The blueprint for your next big idea')
   *   .build();
   *
   * // HTML Result:
   *  <meta name="description" content="The blueprint for your next big idea" />
   */
  addDescription(description: string) {
    this.meta.push({ name: 'description', content: description });
    return this;
  }

  /**
   * Adds Open Graph (OG) meta tags for rich preview on social media
   *
   * Open Graph meta tags control how your content is previewed when shared on Facebook,
   * LinkedIn, Twitter (X), and other social platforms. Proper OG tags increase social
   * engagement by providing attractive, accurate previews with titles, descriptions, and images.
   *
   * Open Graph includes standard properties for all content types plus type-specific properties
   * for articles, videos, music, and more.
   *
   * Relative URLs are resolved using the metadataBase if provided.
   *
   * @example
   * const head = new HeadBuilder('https://devsantara.com')
   *   .addOpenGraph({
   *     title: 'Devsantara',
   *     description: 'The blueprint for your next big idea',
   *     url: '/',
   *     image: {
   *       url: '/assets/og.jpg',
   *     }
   *   })
   *   .build();
   *
   * // Result:
   * <meta property="og:title" content="Devsantara" />
   * <meta property="og:description" content="The blueprint for your next big idea" />
   * <meta property="og:url" content="https://devsantara.com/" />
   * <meta property="og:image" content="https://devsantara.com/assets/og.jpg" />
   */
  addOpenGraph(options: OpenGraphOptions) {
    if (options.title) {
      this.meta.push({ property: 'og:title', content: options.title });
    }
    if (options.description) {
      this.meta.push({
        property: 'og:description',
        content: options.description,
      });
    }
    if (options.url) {
      this.meta.push({
        property: 'og:url',
        content: this.resolveUrl(options.url),
      });
    }
    if (options.locale) {
      this.meta.push({ property: 'og:locale', content: options.locale });
    }
    if (options.image) {
      this.meta.push({
        property: 'og:image',
        content: this.resolveUrl(options.image.url),
      });
      if (options.image.alt) {
        this.meta.push({
          property: 'og:image:alt',
          content: options.image.alt,
        });
      }
      if (options.image.type) {
        this.meta.push({
          property: 'og:image:type',
          content: options.image.type,
        });
      }
      if (options.image.width) {
        this.meta.push({
          property: 'og:image:width',
          content: String(options.image.width),
        });
      }
      if (options.image.height) {
        this.meta.push({
          property: 'og:image:height',
          content: String(options.image.height),
        });
      }
    }
    if (options.type) {
      this.meta.push({ property: 'og:type', content: options.type.name });
      if ('properties' in options.type) {
        for (const property of options.type.properties) {
          this.meta.push({
            property: property.name,
            content: property.content,
          });
        }
      }
    }
    return this;
  }

  /**
   * Adds Twitter Card meta tags for enhanced sharing on Twitter/X
   *
   * Twitter Cards enable rich media presentations of content when shared on Twitter.
   * They control how your content appears with summaries, images, and interactive elements.
   * Different card types optimize content differently (summary, summary_large_image, player, etc.).
   *
   * @example
   * const head = new HeadBuilder()
   *   .addTwitter({
   *     card: { name: 'summary' },
   *     title: 'Devsantara',
   *     description: 'The blueprint for your next big idea',
   *     site: '@devsantara',
   *     creator: '@edwintantawi'
   *   })
   *   .build();
   *
   * // Result:
   *  <meta name="twitter:card" content="summary" />
   *  <meta name="twitter:title" content="Devsantara" />
   *  <meta name="twitter:description" content="The blueprint for your next big idea" />
   *  <meta name="twitter:site" content="@devsantara" />
   *  <meta name="twitter:creator" content="@edwintantawi" />
   */
  addTwitter(options: TwitterOptions) {
    if (options.title) {
      this.meta.push({ name: 'twitter:title', content: options.title });
    }
    if (options.description) {
      this.meta.push({
        name: 'twitter:description',
        content: options.description,
      });
    }
    if (options.site) {
      this.meta.push({ name: 'twitter:site', content: options.site });
    }
    if (options.siteId) {
      this.meta.push({ name: 'twitter:site:id', content: options.siteId });
    }
    if (options.creator) {
      this.meta.push({ name: 'twitter:creator', content: options.creator });
    }
    if (options.creatorId) {
      this.meta.push({
        name: 'twitter:creator:id',
        content: options.creatorId,
      });
    }
    if (options.image) {
      this.meta.push({
        name: 'twitter:image',
        content: String(options.image.url),
      });
      if (options.image.alt) {
        this.meta.push({
          name: 'twitter:image:alt',
          content: options.image.alt,
        });
      }
    }
    if (options.card) {
      this.meta.push({ name: 'twitter:card', content: options.card.name });
      if ('properties' in options.card) {
        for (const property of options.card.properties) {
          this.meta.push({
            name: property.name,
            content: String(property.content),
          });
        }
      }
    }
    return this;
  }

  /**
   * Adds favicon and other icon link elements
   *
   * Favicon and icon link elements help users identify your site visually in browser tabs,
   * bookmarks, history, and on mobile home screens. Support multiple icon formats and types
   * for optimal display across different devices and platforms (desktop, iOS, Android, etc.).
   *
   * Relative URLs are resolved using the metadataBase if provided.
   *
   * @example
   * const head = new HeadBuilder('https://devsantara.com')
   *   .addIcons({
   *     shortcut: [
   *       { url: '/favicon.ico' }
   *     ]
   *   })
   *   .build();
   *
   * // Result:
   *  <link rel="shortcut icon" href="https://devsantara.com/favicon.ico" />
   */
  addIcons(options: IconOptions) {
    if (options.icon) {
      for (const { url, ...iconOptions } of options.icon) {
        this.links.push({
          rel: 'icon',
          href: this.resolveUrl(url),
          ...iconOptions,
        });
      }
    }
    if (options.shortcut) {
      for (const { url, ...shortcutOptions } of options.shortcut) {
        this.links.push({
          rel: 'shortcut icon',
          href: this.resolveUrl(url),
          ...shortcutOptions,
        });
      }
    }
    if (options.apple) {
      for (const { url, ...appleOptions } of options.apple) {
        this.links.push({
          rel: 'apple-touch-icon',
          href: this.resolveUrl(url),
          ...appleOptions,
        });
      }
    }
    if (options.other) {
      for (const { rel, url, ...otherOptions } of options.other) {
        this.links.push({
          rel: rel || 'icon',
          href: this.resolveUrl(url),
          ...otherOptions,
        });
      }
    }
    return this;
  }

  /**
   * Adds robot directives meta tag controlling search engine crawler behavior
   *
   * The robots meta tag provides directives to search engine crawlers and other automated
   * bots about how they should treat and index your page. It controls indexing, following
   * links, snippet generation, image indexing, and other crawler behaviors.
   *
   * @example
   * const head = new HeadBuilder()
   *   .addRobot({
   *     index: true,
   *     follow: true
   *   })
   *   .build();
   *
   * // Result:
   * <meta name="robots" content="index, follow" />
   */
  addRobot(options: RobotOptions) {
    const contentParts: string[] = [];

    if (options.index) {
      contentParts.push(options.index ? 'index' : 'noindex');
    }
    if (options.follow) {
      contentParts.push(options.follow ? 'follow' : 'nofollow');
    }
    if (options.noarchive) {
      contentParts.push('noarchive');
    }
    if (options.nosnippet) {
      contentParts.push('nosnippet');
    }
    if (options.noimageindex) {
      contentParts.push('noimageindex');
    }
    if (options.nocache) {
      contentParts.push('nocache');
    }
    if (options.notranslate) {
      contentParts.push('notranslate');
    }
    if (options.indexifembedded) {
      contentParts.push('indexifembedded');
    }
    if (options.nositelinkssearchbox) {
      contentParts.push('nositelinkssearchbox');
    }
    if (options.unavailable_after) {
      contentParts.push(`unavailable_after:${options.unavailable_after}`);
    }
    if (options['max-video-preview']) {
      contentParts.push(`max-video-preview:${options['max-video-preview']}`);
    }
    if (options['max-image-preview']) {
      contentParts.push(`max-image-preview:${options['max-image-preview']}`);
    }
    if (options['max-snippet']) {
      contentParts.push(`max-snippet:${options['max-snippet']}`);
    }

    if (contentParts.length > 0) {
      const content = contentParts.join(', ');
      this.meta.push({ name: 'robots', content });
    }

    return this;
  }

  /**
   * Adds external stylesheet link elements
   *
   * External stylesheets define the visual styling for your page. This method adds link elements
   * with rel="stylesheet" pointing to CSS files. You can specify multiple stylesheets and include
   * additional attributes like media queries, integrity hashes for security, and preload hints.
   *
   *
   * @example
   * const head = new HeadBuilder()
   *   .addStylesheets([
   *     { href: '/styles.css' }
   *   ])
   *   .build();
   *
   * // Result:
   * <link rel="stylesheet" href="/app.css" />
   */
  addStylesheets(stylesheets: Omit<Link, 'rel'>[]) {
    for (const { href, ...stylesheet } of stylesheets) {
      this.links.push({ rel: 'stylesheet', href, ...stylesheet });
    }
    return this;
  }

  /**
   * Adds custom link elements
   *
   * This method allows adding any link element with custom rel values and attributes.
   * Use this for adding links like preconnect, prefetch, dns-prefetch, preload, or custom
   * relationships that aren't covered by other specific methods.
   *
   * @example
   * const HEAD = new HeadBuilder()
   *   .addOtherLinks([
   *     { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
   *     { rel: 'preconnect', href: 'https://cdn.devsantara.com' }
   *   ])
   *   .build();
   *
   * // Result:
   * <link rel="preconnect" href="https://fonts.googleapis.com" />
   * <link rel="preconnect" href="https://cdn.devsantara.com" />
   */
  addLinks(links: Link[]) {
    for (const link of links) {
      this.links.push(link);
    }
    return this;
  }

  /**
   * Adds custom meta elements
   *
   * This method allows adding any meta element that isn't covered by the specific
   * helper methods. Use this for custom properties, tracking codes, application-specific
   * meta tags, or platform-specific directives.
   *
   * @example
   * const head = new HeadBuilder()
   *   .addMeta([
   *     { name: 'apple-mobile-web-app-capable', content: 'yes' },
   *     { name: 'apple-mobile-web-app-status-bar-style', content: 'black-translucent' }
   *   ])
   *   .build();
   *
   * // Result:
   * <meta name="apple-mobile-web-app-capable" content="yes" />
   * <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
   */
  addMeta(meta: Meta[]) {
    for (const m of meta) {
      this.meta.push(m);
    }
    return this;
  }

  /**
   * Adds custom script elements
   *
   * This method allows adding script elements to the head section, such as analytics,
   * tracking scripts, third-party integrations, or utility scripts that need to execute
   * before page content loads. You can specify attributes like async, defer, type, and more.
   *
   * @example
   * // Analytics and tracking scripts
   * const head = new HeadBuilder()
   *   .addScripts([
   *     { src: 'https://www.googletagmanager.com/gtag/js?id=GA-123456', async: true },
   *     { src: 'https://cdn.devsantara.com/analytics.js', defer: true }
   *   ])
   *   .build();
   *
   * // Result:
   * <script src="https://www.googletagmanager.com/gtag/js?id=GA-123456" async></script>
   * <script src="https://cdn.devsantara.com/analytics.js" defer></script>
   */
  addScripts(scripts: Script[]) {
    for (const script of scripts) {
      this.scripts.push(script);
    }
    return this;
  }

  /**
   * Adds custom style elements
   *
   * This method allows adding inline style elements directly to the head section.
   * Use this for critical CSS, utility styles, or dynamic styles that need to be
   * applied before stylesheets load. Inline styles have higher priority than external
   * stylesheets for loading performance.
   *
   * @example
   * const head = new HeadBuilder()
   *   .addStyles([
   *     {
   *       children: `
   *         .header { background: #333; color: white; padding: 20px; }
   *         .hero { min-height: 100vh; display: flex; align-items: center; }
   *       `
   *     }
   *   ])
   *   .build();
   *
   * // HTML Result:
   * <style>
   *   .header { background: #333; color: white; padding: 20px; }
   *   .hero { min-height: 100vh; display: flex; align-items: center; }
   * </style>
   */
  addStyles(styles: Style[]) {
    for (const style of styles) {
      this.styles.push(style);
    }
    return this;
  }

  /**
   * Builds and returns the complete head result object
   *
   * This method finalizes the construction of all head elements collected through
   * the various add* methods and returns them as a structured HeadResult object.
   * The result contains separate arrays for meta tags, link elements, scripts, and styles,
   * ready to be rendered in the document head.
   */
  build(): Awaitable<HeadResult> {
    return {
      links: this.links,
      scripts: this.scripts,
      meta: this.meta,
      styles: this.styles,
    };
  }
}
