import { DocsContainer as BaseContainer, type DocsContainerProps } from '@storybook/addon-docs/blocks';
import {
  DARK_MODE_EVENT_NAME,
} from '@vueless/storybook-dark-mode';
import * as React from 'react';
import { addons } from 'storybook/internal/preview-api';
import { themes } from 'storybook/internal/theming';

const channel = addons.getChannel();

export function DocsContainer({ children, context }: DocsContainerProps & { children: React.ReactNode }) {
  const [isDark, setDark] = React.useState(false);

  React.useEffect(() => {
    channel.on(DARK_MODE_EVENT_NAME, setDark);
    return () => channel.off(DARK_MODE_EVENT_NAME, setDark);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [channel]);

  return (
    <BaseContainer context={context} theme={isDark ? themes.dark : themes.light}>
      {children}
    </BaseContainer>
  );
};
