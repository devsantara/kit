import type { TanStackDevtoolsReactPlugin } from '@tanstack/react-devtools';
import { FormDevtoolsPanel } from '@tanstack/react-form-devtools';

/**
 * Currently this cause error during dependency optimization when using Cloudflare.
 * @see {@link https://github.com/TanStack/devtools/issues/91}
 * @see {@link https://github.com/TanStack/devtools/issues/187}
 * @see {@link https://github.com/TanStack/devtools/issues/289}
 */
export const tanstackFormDevtools: TanStackDevtoolsReactPlugin = {
  name: 'TanStack Form',
  render: <FormDevtoolsPanel />,
};
