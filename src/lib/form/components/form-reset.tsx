import * as React from 'react';

import { useFormContext } from '~/lib/form/form.context';
import { Button } from '~/ui/components/core/button';

export function FormReset({
  children,
  ...props
}: React.ComponentPropsWithRef<typeof Button>) {
  const form = useFormContext();

  function handleReset(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    event.preventDefault();
    form.reset();
  }

  return (
    <form.Subscribe selector={(state) => state.isSubmitting}>
      {(isSubmitting) => (
        <Button
          type="reset"
          variant="destructive"
          form={form.formId}
          disabled={isSubmitting}
          onClick={handleReset}
          {...props}
        >
          {children}
        </Button>
      )}
    </form.Subscribe>
  );
}
