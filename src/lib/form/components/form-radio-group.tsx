import * as React from 'react';

import { useFieldContext } from '~/lib/form/form.context';
import { checkIsInvalidField } from '~/lib/form/form.utils';
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldLabel,
  FieldTitle,
  useFieldSet,
} from '~/ui/components/core/field';
import { RadioGroup, RadioGroupItem } from '~/ui/components/core/radio-group';

interface Option {
  label: string;
  value: string;
  description?: string;
  disabled?: boolean;
}

type Variant = 'default' | 'card';

export function FormRadioGroup({
  options,
  variant = 'default',
  ...props
}: React.ComponentPropsWithRef<typeof RadioGroup> & {
  options: Option[];
  variant?: Variant;
}) {
  const field = useFieldContext<string>();
  const fieldSet = useFieldSet();

  const disabled = fieldSet?.disabled;

  function handleValueChange(value: string) {
    field.handleChange(value);
  }

  return (
    <RadioGroup
      name={field.name}
      value={field.state.value}
      onValueChange={handleValueChange}
      disabled={disabled}
      {...props}
    >
      {options.map((option) => {
        return (
          <FormRadioGroupItem
            key={option.value}
            option={option}
            variant={variant}
          />
        );
      })}
    </RadioGroup>
  );
}

function FormRadioGroupItem({
  variant,
  option,
  ...props
}: Omit<React.ComponentPropsWithRef<typeof RadioGroupItem>, 'value'> & {
  option: Option;
  variant?: Variant;
}) {
  const field = useFieldContext<string>();
  const fieldSet = useFieldSet();
  const isInvalid = checkIsInvalidField(field);

  const id = `${field.name}-${option.value}`;
  const isDisabled = fieldSet?.disabled || option.disabled;

  const radioGroup = (
    <RadioGroupItem
      id={id}
      value={option.value}
      disabled={isDisabled}
      aria-invalid={isInvalid}
      {...props}
    />
  );

  const components: Record<Variant, React.ReactNode> = {
    default: (
      <Field
        orientation="horizontal"
        data-invalid={isInvalid}
        data-disabled={isDisabled}
      >
        {radioGroup}
        <FieldContent>
          <FieldLabel htmlFor={id}>{option.label}</FieldLabel>
          {option.description && (
            <FieldDescription>{option.description}</FieldDescription>
          )}
        </FieldContent>
      </Field>
    ),
    card: (
      <FieldLabel htmlFor={id}>
        <Field
          orientation="horizontal"
          data-invalid={isInvalid}
          data-disabled={isDisabled}
        >
          <FieldContent>
            <FieldTitle>{option.label}</FieldTitle>
            {option.description && (
              <FieldDescription>{option.description}</FieldDescription>
            )}
          </FieldContent>
          {radioGroup}
        </Field>
      </FieldLabel>
    ),
  };

  return components[variant ?? 'default'];
}
