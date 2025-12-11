/// <reference types="vite/client" />

import { createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";
import * as React from "react";

import appStylesheet from "~/ui/styles/app.css?url";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Devsantara Kit" },
    ],
    links: [{ rel: "stylesheet", href: appStylesheet }],
  }),
  shellComponent: RootDocument,
});

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}
