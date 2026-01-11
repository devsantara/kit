import {
  createStartHandler,
  defaultStreamHandler,
  defineHandlerCallback,
} from '@tanstack/react-start/server';
import { createServerEntry } from '@tanstack/react-start/server-entry';

const serverHandler = defineHandlerCallback((ctx) => {
  return defaultStreamHandler(ctx);
});

const fetch = createStartHandler(serverHandler);

export default createServerEntry({ fetch });
