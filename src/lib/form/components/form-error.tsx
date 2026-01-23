import { AlertCircleIcon } from 'lucide-react';

import { useFormContext } from '~/lib/form/form.context';
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from '~/ui/components/core/alert';

export function FormError({ title }: { title?: string }) {
  const form = useFormContext();

  return (
    <form.Subscribe selector={(state) => state.errorMap.onSubmit}>
      {(formSubmitError) => {
        if (!formSubmitError) return null;

        let _title = title;
        let _messages = String(formSubmitError);
        // When error comes from the form validation, the error shape is an object with fields key
        const isValidationError = typeof formSubmitError !== 'string';
        if (isValidationError) {
          _title = 'There is something wrong with the form';
          _messages = 'Please review the form and correct them to continue.';
        }

        return (
          <Alert variant="destructive" className="max-w-md">
            <AlertCircleIcon />
            <AlertTitle>{_title || 'Something went wrong'}</AlertTitle>
            <AlertDescription>{_messages}</AlertDescription>
          </Alert>
        );
      }}
    </form.Subscribe>
  );
}
