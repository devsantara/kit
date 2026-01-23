import { AlertCircleIcon } from 'lucide-react';

import { useFormContext } from '~/lib/form/form.context';
import { checkIsFormError } from '~/lib/form/form.utils';
import { m } from '~/lib/i18n/messages';
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from '~/ui/components/core/alert';

export function FormError() {
  const form = useFormContext();

  return (
    <form.Subscribe selector={(state) => state.errorMap.onSubmit}>
      {(formSubmitError) => {
        if (!formSubmitError) return null;

        // On form submission, errors can take two shapes:
        // 1. Validation errors - an object with field keys mapped to their validation error messages
        // 2. Form-level errors - manually set errors, typically used when form submission fails
        const isFormError = checkIsFormError(formSubmitError);

        const title = isFormError
          ? formSubmitError.title || m.common_error_something_went_wrong()
          : m.common_error_form_validation_title();

        const message = isFormError
          ? formSubmitError.message || null
          : m.common_error_form_validation_description();

        return (
          <Alert variant="destructive" className="max-w-md">
            <AlertCircleIcon />
            <AlertTitle>{title}</AlertTitle>
            {message && <AlertDescription>{message}</AlertDescription>}
          </Alert>
        );
      }}
    </form.Subscribe>
  );
}
