import {
  ThemeProvider as NextThemeProvider,
  useTheme as useNextTheme,
} from 'next-themes';
import * as React from 'react';

/**
 * Theme provider component that wraps the application
 * to configures the next-themes provider.
 */
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <NextThemeProvider enableSystem attribute="class" defaultTheme="system">
      {children}
    </NextThemeProvider>
  );
}

/**
 * Hook to access and manage the current theme
 *
 * Returns the theme object from next-themes provider which includes
 * the current theme name, system theme, and functions to change the theme.
 *
 * @example
 * ```tsx
 * function Component() {
 *   const { theme, setTheme } = useTheme();
 *
 *   return (
 *     <button onClick={() => setTheme('dark')}>
 *       Current theme: {theme}
 *     </button>
 *   );
 * }
 * ```
 */
export function useTheme() {
  const theme = useNextTheme();
  return theme;
}
