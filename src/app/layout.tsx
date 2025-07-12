import '~/ui/styles/globals.css';

import * as React from 'react';

import { fonts } from '~/ui/styles/fonts';
import { cn } from '~/ui/utils';

export { siteMetadata as metadata } from '~/configs/site';

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html
      className={cn(fonts.sans.variable, fonts.mono.variable, 'antialiased')}
      lang="en"
    >
      <body>{children}</body>
    </html>
  );
}
