import handler, { createServerEntry } from '@tanstack/react-start/server-entry';

import { paraglideMiddleware } from '~/lib/i18n/server';

export default createServerEntry({
  fetch(req: Request): Promise<Response> {
    return paraglideMiddleware(req, () => handler.fetch(req));
  },
});
