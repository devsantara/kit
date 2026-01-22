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
        return (
          <Alert variant="destructive" className="max-w-md">
            <AlertCircleIcon />
            <AlertTitle>{title || 'Something went wrong'}</AlertTitle>
            <AlertDescription>{formSubmitError}</AlertDescription>
          </Alert>
        );
      }}
    </form.Subscribe>
  );
}
