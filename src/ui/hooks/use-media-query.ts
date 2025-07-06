import * as React from 'react';

type BreakpointName
  = 'sm' | 'md' | 'lg' | 'xl' | '2xl';

const breakpointWidth: Record<BreakpointName, string> = {
  'sm': '40rem',
  'md': '48rem',
  'lg': '64rem',
  'xl': '80rem',
  '2xl': '96rem',
};

export function useMediaQuery(breakpoint: BreakpointName) {
  const [value, setValue] = React.useState(false);

  React.useEffect(function watchMediaSize() {
    function onChangeMediaWidth(event: MediaQueryListEvent) {
      setValue(event.matches);
    }
    const result = matchMedia(`(width >= ${breakpointWidth[breakpoint]})`);
    result.addEventListener('change', onChangeMediaWidth);
    setValue(result.matches);
    return () => result.removeEventListener('change', onChangeMediaWidth);
  }, [breakpoint]);

  return value;
}
