import * as React from 'react';

import { useFieldContext } from '~/lib/form/form.context';
import { FieldLabel } from '~/ui/components/core/field';

export function FormFieldLabel({
  htmlFor,
  ...props
}: React.ComponentPropsWithRef<typeof FieldLabel>) {
  const field = useFieldContext();

  return <FieldLabel htmlFor={htmlFor || field.name} {...props} />;
}
