'use client';

import { useTheme } from 'next-themes';
import { toast as sonnerToast, Toaster as Sonner, type ToasterProps } from 'sonner';

export const toast = sonnerToast;

export function ToastProvider({ ...props }: ToasterProps) {
  const { theme = 'system' } = useTheme();

  return (
    <Sonner
      className="toaster group"
      theme={theme as ToasterProps['theme']}
      style={
        {
          'fontFamily': 'var(--font-sans)',
          '--normal-bg': 'var(--popover)',
          '--normal-text': 'var(--popover-foreground)',
          '--normal-border': 'var(--border)',
        } as React.CSSProperties
      }
      {...props}
    />
  );
}
