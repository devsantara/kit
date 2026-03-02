import * as React from 'react';

import { useFormContext } from '~/lib/form/form.context';

export function FormRoot({
  children,
  ...props
}: React.ComponentPropsWithRef<'form'>) {
  const form = useFormContext();

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    form.handleSubmit();
  }

  return (
    <form id={form.formId} onSubmit={handleSubmit} {...props}>
      {children}
    </form>
  );
}
