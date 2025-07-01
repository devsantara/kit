import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Utility function to merge class names.
 *
 * @description
 * It combines the functionality of clsx and tailwind-merge
 * to conditionally join class names together and efficiently merge.
 *
 * @example
 * ```ts
 * // Strings (variadic)
 * cn('foo', true && 'bar', 'baz');
 * // => 'foo bar baz'
 *
 * // Objects
 * cn({ foo:true, bar:false, baz:isTrue() });
 * // => 'foo baz'
 *
 * // Objects (variadic)
 * cn({ foo:true }, { bar:false }, null, { '--foobar':'hello' });
 * // => 'foo --foobar'
 *
 * // Arrays
 * cn(['foo', 0, false, 'bar']);
 * // => 'foo bar'
 *
 * // Arrays (variadic)
 * cn(['foo'], ['', 0, false, 'bar'], [['baz', [['hello'], 'there']]]);
 * // => 'foo bar baz hello there'
 *
 * // Kitchen sink (with nesting)
 * cn('foo', [1 && 'bar', { baz:false, bat:null }, ['hello', ['world']]], 'cya');
 * // => 'foo bar hello world cya'
 * ```
 *
 * @see {@link https://github.com/lukeed/clsx#readme Read more about clsx}
 * @see {@link https://github.com/dcastil/tailwind-merge Read more about tailwind-merge}
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
