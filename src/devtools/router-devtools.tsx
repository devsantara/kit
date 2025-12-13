import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools';

import type { TanStackDevtoolsReactPlugin } from '@tanstack/react-devtools';

export const tanstackRouterDevtools: TanStackDevtoolsReactPlugin = {
  name: 'Tanstack Router',
  render: <TanStackRouterDevtoolsPanel />,
};
