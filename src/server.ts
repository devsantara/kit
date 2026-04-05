import handler from '@tanstack/react-start/server-entry';

import { paraglideMiddleware } from '~/lib/i18n/server';

export default {
  async fetch(req: Request): Promise<Response> {
    return paraglideMiddleware(req, async () => handler.fetch(req));
  },
};
