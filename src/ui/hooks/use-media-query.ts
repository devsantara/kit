import * as React from 'react';

type BreakpointDirection = 'min-width' | 'max-width';

type BreakpointName = 'sm' | 'md' | 'lg' | 'xl' | '2xl';

const breakpointWidth: Record<BreakpointName, string> = {
  sm: '40rem',
  md: '48rem',
  lg: '64rem',
  xl: '80rem',
  '2xl': '96rem',
};

const directionOperators: Record<BreakpointDirection, string> = {
  'min-width': '>=',
  'max-width': '<',
};

interface Options {
  initial?: boolean;
}

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
