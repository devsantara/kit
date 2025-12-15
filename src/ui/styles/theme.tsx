import {
  ThemeProvider as NextThemeProvider,
  useTheme as useNextTheme,
} from 'next-themes';
import * as React from 'react';

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <NextThemeProvider enableSystem attribute="class" defaultTheme="system">
      {children}
    </NextThemeProvider>
  );
}

export function useTheme() {
  const theme = useNextTheme();
  return theme;
}
