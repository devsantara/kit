import { GeistMono } from 'geist/font/mono';
import { GeistSans } from 'geist/font/sans';

/**
 * Font library.
 *
 * This module centralizes font management using Next.js's built-in `next/font` package.
 * It supports both Google Fonts and local fonts, ensuring consistency and ease of use across the application.
 *
 * **Usage**:
 * - **Google Fonts**: Use `next/font/google` to import directly from Google Fonts.
 * - **Local Fonts**: Place local font files (e.g., `.woff2`) in `src/lib/ui/styles/fonts/` (create fonts folder).
 *
 * @example
 * **Adding New Fonts**:
 * 1. Import the font using `next/font`.
 *    ```ts
 *    import LocalFont from 'next/font/local';
 *    const CustomFont = LocalFont({ src: './custom-font.woff2' });
 *    ```
 * 2. Include the font in the exported `fonts` object:
 *    ```ts
 *    export const fonts = {
 *      sans: GeistSans,
 *      mono: GeistMono,
 *      custom: CustomFont,
 *    };
 *    ```
 * @example
 * **Accessing Fonts**: Fonts must be accessed from the `fonts` object to ensure consistency.
 * ```tsx
 * <div className={fonts.sans.variable}>...</div>
 * ```
 * @see {@link https://nextjs.org/docs/app/getting-started/fonts Next.js Fonts Documentation}
 */
export const fonts = {
  sans: GeistSans,
  mono: GeistMono,
  // Add additional fonts here
};
