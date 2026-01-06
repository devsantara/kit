import handler, { createServerEntry } from '@tanstack/react-start/server-entry';
import { waitUntil as workerWaitUntil } from 'cloudflare:workers';

/**
 * Schedules a promise to continue running after the current request has returned.
 *
 * On Cloudflare Workers, this delegates to the platform `waitUntil()` to extend
 * the lifetime of the invocation for background work (e.g. flushing logs, analytics, graceful shutdown tasks).
 *
 * In non-Workers runtimes (or when the Workers API isn't available), it falls
 * back to returning the promise without scheduling—callers may still `await` it,
 * but it won't be kept alive beyond the request lifecycle by the platform.
 *
 * @param promise - Work to run in the background / after the response is sent.
 */
function waitUntil(promise: Promise<unknown>) {
  if (workerWaitUntil) {
    return workerWaitUntil(promise);
  }
  return promise;
}

/** Perform tasks before server shutdown */
async function shutdown() {}

export default createServerEntry({
  async fetch(request) {
    const response = handler.fetch(request);
    await waitUntil(shutdown());
    return response;
  },
});
