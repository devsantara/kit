import * as React from 'react';

import { useFormContext } from '~/lib/form/form.context';

export function FormRoot({
  children,
  ...props
}: React.ComponentPropsWithRef<'form'>) {
  const form = useFormContext();

  async function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    await form.handleSubmit();
  }

  return (
    <form id={form.formId} onSubmit={handleSubmit} {...props}>
      {children}
    </form>
  );
}
