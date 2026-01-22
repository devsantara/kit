import { createFormHook } from '@tanstack/react-form';

import { FormError } from '~/lib/form/components/form-error';
import { FormField } from '~/lib/form/components/form-field';
import { FormFieldError } from '~/lib/form/components/form-field-error';
import { FormFieldLabel } from '~/lib/form/components/form-field-label';
import { FormFieldSet } from '~/lib/form/components/form-fieldset';
import { FormReset } from '~/lib/form/components/form-reset';
import { FormRoot } from '~/lib/form/components/form-root';
import { FormSubmit } from '~/lib/form/components/form-submit';
import { fieldContext, formContext } from '~/lib/form/form.context';

export const { useAppForm } = createFormHook({
  fieldContext,
  formContext,
  fieldComponents: {
    Field: FormField,
    FieldSet: FormFieldSet,
    Label: FormFieldLabel,
    Error: FormFieldError,
  },
  formComponents: {
    Root: FormRoot,
    FieldSet: FormFieldSet,
    Error: FormError,
    SubmitButton: FormSubmit,
    ResetButton: FormReset,
  },
});
