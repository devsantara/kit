import type { TanStackDevtoolsReactPlugin } from '@tanstack/react-devtools';

import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools';

export const tanstackRouterDevtools: TanStackDevtoolsReactPlugin = {
  name: 'TanStack Router',
  render: <TanStackRouterDevtoolsPanel />,
};
