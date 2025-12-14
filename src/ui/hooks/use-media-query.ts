import * as React from 'react';

type BreakpointName = 'sm' | 'md' | 'lg' | 'xl' | '2xl';

const breakpointWidth: Record<BreakpointName, string> = {
  sm: '40rem',
  md: '48rem',
  lg: '64rem',
  xl: '80rem',
  '2xl': '96rem',
};

interface options {
  initial?: boolean;
}

export function useMediaQuery(breakpoint: BreakpointName, options?: options) {
  const { initial = false } = options ?? {};
  const [value, setValue] = React.useState(initial);

  React.useEffect(
    function watchMediaSize() {
      function onChangeMediaWidth(event: MediaQueryListEvent) {
        setValue(event.matches);
      }
      const result = matchMedia(`(width >= ${breakpointWidth[breakpoint]})`);
      result.addEventListener('change', onChangeMediaWidth);
      setValue(result.matches);
      return () => result.removeEventListener('change', onChangeMediaWidth);
    },
    [breakpoint],
  );

  return value;
}

export function useIsMobile() {
  const mdUp = useMediaQuery('md');
  return !mdUp;
}
