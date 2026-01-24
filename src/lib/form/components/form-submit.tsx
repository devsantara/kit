import { Loader2Icon } from 'lucide-react';
import * as React from 'react';

import { useFormContext } from '~/lib/form/form.context';
import { Button } from '~/ui/components/core/button';

export function FormSubmit({
  children,
  ...props
}: React.ComponentPropsWithRef<typeof Button>) {
  const form = useFormContext();

  return (
    <form.Subscribe selector={(state) => state.isSubmitting}>
      {(isSubmitting) => (
        <Button
          type="submit"
          form={form.formId}
          disabled={isSubmitting}
          {...props}
        >
          {isSubmitting && <Loader2Icon className="animate-spin" />} {children}
        </Button>
      )}
    </form.Subscribe>
  );
}
