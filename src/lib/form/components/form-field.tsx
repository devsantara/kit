import * as React from 'react';

import { useFieldContext } from '~/lib/form/form.context';
import { checkIsInvalidField } from '~/lib/form/form.utils';
import { Field } from '~/ui/components/core/field';

export function FormField({
  ...props
}: React.ComponentPropsWithRef<typeof Field>) {
  const field = useFieldContext();
  const isInvalid = checkIsInvalidField(field);

  return <Field data-invalid={isInvalid} {...props} />;
}
