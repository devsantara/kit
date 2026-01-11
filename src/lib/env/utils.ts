import * as z from 'zod/v4';

/** Coerce string to boolean. */
export function coerceBoolean() {
  return z.enum(['true', 'false']).transform((val) => val === 'true');
}
