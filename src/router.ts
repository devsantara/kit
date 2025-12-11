import { createRouter as createTanstackRouter } from "@tanstack/react-router";

import { routeTree } from "~/routeTree.gen";

export function getRouter() {
  return createTanstackRouter({
    routeTree,
    defaultPreload: "intent",
    scrollRestoration: true,
  });
}
