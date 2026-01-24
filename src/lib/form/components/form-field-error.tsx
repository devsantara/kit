import * as React from 'react';

import { useFieldContext } from '~/lib/form/form.context';
import { checkIsInvalidField } from '~/lib/form/form.utils';
import { FieldError } from '~/ui/components/core/field';

export function FormFieldError({
  ...props
}: Omit<React.ComponentPropsWithRef<typeof FieldError>, 'errors'>) {
  const field = useFieldContext();
  const isInvalid = checkIsInvalidField(field);

  if (!isInvalid) return null;
  return <FieldError errors={field.state.meta.errors} {...props} />;
}
