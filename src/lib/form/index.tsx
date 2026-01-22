import { createFormHook } from '@tanstack/react-form';

import { FormCheckboxMultiple } from '~/lib/form/components/form-checkbox-multiple';
import { FormCheckboxSingle } from '~/lib/form/components/form-checkbox-single';
import { FormError } from '~/lib/form/components/form-error';
import { FormField } from '~/lib/form/components/form-field';
import { FormFieldError } from '~/lib/form/components/form-field-error';
import { FormFieldLabel } from '~/lib/form/components/form-field-label';
import { FormFieldSet } from '~/lib/form/components/form-fieldset';
import { FormInput } from '~/lib/form/components/form-input';
import { FormRadioGroup } from '~/lib/form/components/form-radio-group';
import { FormReset } from '~/lib/form/components/form-reset';
import { FormRoot } from '~/lib/form/components/form-root';
import { FormSelect } from '~/lib/form/components/form-select';
import { FormSubmit } from '~/lib/form/components/form-submit';
import { FormSwitch } from '~/lib/form/components/form-switch';
import { FormTextarea } from '~/lib/form/components/form-textarea';
import { fieldContext, formContext } from '~/lib/form/form.context';

export const { useAppForm } = createFormHook({
  fieldContext,
  formContext,
  fieldComponents: {
    // Blocks
    Field: FormField,
    FieldSet: FormFieldSet,
    FieldLabel: FormFieldLabel,
    FieldError: FormFieldError,

    // Inputs
    Input: FormInput,
    Textarea: FormTextarea,
    Select: FormSelect,
    CheckboxSingle: FormCheckboxSingle,
    CheckboxMultiple: FormCheckboxMultiple,
    RadioGroup: FormRadioGroup,
    Switch: FormSwitch,
  },
  formComponents: {
    Root: FormRoot,
    FieldSet: FormFieldSet,
    FormError: FormError,
    FormSubmit: FormSubmit,
    FormReset: FormReset,
  },
});
