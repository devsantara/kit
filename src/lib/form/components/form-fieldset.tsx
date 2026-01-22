import * as React from 'react';

import { useFormContext } from '~/lib/form/form.context';
import { FieldSet } from '~/ui/components/core/field';

export function FormFieldSet({
  children,
  disabled,
  ...props
}: React.ComponentPropsWithRef<typeof FieldSet>) {
  const form = useFormContext();

  return (
    <form.Subscribe selector={(state) => state.isSubmitting}>
      {(isSubmitting) => (
        <FieldSet disabled={isSubmitting || disabled} {...props}>
          {children}
        </FieldSet>
      )}
    </form.Subscribe>
  );
}
