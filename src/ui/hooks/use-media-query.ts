import * as React from 'react';

/** Direction of the media query breakpoint - either minimum or maximum width */
type BreakpointDirection = 'min-width' | 'max-width';

/** Predefined breakpoint names matching common responsive design sizes */
type BreakpointName = 'sm' | 'md' | 'lg' | 'xl' | '2xl';

/** Mapping of breakpoint names to their corresponding CSS width values in rem units */
const breakpointWidth: Record<BreakpointName, string> = {
  sm: '40rem',
  md: '48rem',
  lg: '64rem',
  xl: '80rem',
  '2xl': '96rem',
};

/** Mapping of direction types to their corresponding CSS media query operators */
const directionOperators: Record<BreakpointDirection, string> = {
  'min-width': '>=',
  'max-width': '<',
};

/** Options for configuring the useMediaQuery hook behavior */
interface Options {
  /** Initial state value before the media query listener is attached (default: false) */
  initial?: boolean;
}

/**
 * Hook to check if a media query matches the current viewport
 *
 * @example
 * ```
 * // Check if viewport is at least medium size (min-width: 48rem)
 * const isMediumOrLarger = useMediaQuery('min-width', 'md');
 * // Check if viewport is smaller than large size (max-width: 64rem)
 * const isLessThanLarge = useMediaQuery('max-width', 'lg');
 *```
 */
export function useMediaQuery(
  direction: BreakpointDirection,
  breakpoint: BreakpointName,
  options?: Options,
) {
  const { initial = false } = options ?? {};
  const [value, setValue] = React.useState(initial);

  React.useEffect(
    function watchMediaSize() {
      function onChangeMediaWidth(event: MediaQueryListEvent) {
        setValue(event.matches);
      }
      const operator = directionOperators[direction];
      const result = matchMedia(
        `(width ${operator} ${breakpointWidth[breakpoint]})`,
      );
      result.addEventListener('change', onChangeMediaWidth);
      setValue(result.matches);
      return () => result.removeEventListener('change', onChangeMediaWidth);
    },
    [breakpoint, direction],
  );

  return value;
}
