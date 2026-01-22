import type { AnyFieldApi } from '@tanstack/react-form';

export function checkIsInvalidField(field: AnyFieldApi) {
  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
  return isInvalid;
}
