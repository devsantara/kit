import * as React from 'react';

/**
 * Direction for media query breakpoint comparison.
 * - `'min-width'`: Matches when viewport width is greater than or equal to the breakpoint
 * - `'max-width'`: Matches when viewport width is less than the breakpoint
 */
type BreakpointDirection = 'min-width' | 'max-width';

/** Standard Tailwind CSS breakpoints mapped to their pixel widths. */
type BreakpointName = 'sm' | 'md' | 'lg' | 'xl' | '2xl';

/** Maps breakpoint names to their corresponding pixel widths. */
const breakpointWidth: Record<BreakpointName, string> = {
  sm: '40rem',
  md: '48rem',
  lg: '64rem',
  xl: '80rem',
  '2xl': '96rem',
};

/** Maps breakpoint directions to their CSS media query operators. */
const directionOperators: Record<BreakpointDirection, string> = {
  'min-width': '>=',
  'max-width': '<',
};

interface Options<TInitialValue> {
  /**
   * Initial value to use before the media query listener is set up.
   * This opens up the possibility of knowing the media query match state
   * during the initial render and easy to control the media query behavior/state.
   */
  initialValue?: TInitialValue;
}

/**
 * React hook for matching CSS media queries using the MediaQueryList API.
 *
 * Returns boolean from the media query evaluation or the provided initial value
 * when media query has not been evaluated yet.
 *
 * @example
 * ```
 * const isMatch = useMediaQuery('min-width', 'md', { initialValue: false });
 * // true | false
 * ```
 */
export function useMediaQuery(
  direction: BreakpointDirection,
  breakpoint: BreakpointName,
  options: Options<boolean>,
): boolean;

/**
 * React hook for matching CSS media queries using the MediaQueryList API.
 *
 * Returns boolean or undefined when the media query has not been evaluated yet,
 * undefined indicates that media query is not yet evaluated (initial render).
 *
 * @example
 * ```
 * const isMatch = useMediaQuery('min-width', 'md');
 * // true | false | undefined
 * ```
 */
export function useMediaQuery(
  direction: BreakpointDirection,
  breakpoint: BreakpointName,
  options?: Options<undefined>,
): boolean | undefined;

/**
 * Implementation of the useMediaQuery hook.
 * @internal
 */
export function useMediaQuery<TInitialValue extends boolean | undefined>(
  direction: BreakpointDirection,
  breakpoint: BreakpointName,
  options?: Options<TInitialValue>,
) {
  const { initialValue } = options ?? {};
  const [isMatches, setIsMatches] = React.useState<boolean | undefined>(
    initialValue,
  );

  React.useEffect(
    function watchMediaSize() {
      const operator = directionOperators[direction];
      const mediaQuery = matchMedia(
        `(width ${operator} ${breakpointWidth[breakpoint]})`,
      );

      function onChangeMediaQuery(event: MediaQueryListEvent) {
        setIsMatches(event.matches);
      }
      mediaQuery.addEventListener('change', onChangeMediaQuery);
      setIsMatches(mediaQuery.matches);
      return () => mediaQuery.removeEventListener('change', onChangeMediaQuery);
    },
    [breakpoint, direction],
  );

  return isMatches;
}
