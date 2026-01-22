import { useFieldContext } from '~/lib/form/form.context';
import { checkIsInvalidField } from '~/lib/form/form.utils';
import { Checkbox } from '~/ui/components/core/checkbox';
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldTitle,
  useFieldSet,
} from '~/ui/components/core/field';

interface Option {
  label: string;
  value: string;
  description?: string;
  disabled?: boolean;
}

type Variant = 'default' | 'card';

export function FormCheckboxMultiple({
  options,
  variant = 'default',
  ...props
}: React.ComponentPropsWithRef<typeof Checkbox> & {
  options: Option[];
  variant?: Variant;
}) {
  return (
    <FieldGroup data-slot="checkbox-group">
      {options.map((option) => {
        return (
          <FormCheckboxMultipleItem
            key={option.value}
            option={option}
            variant={variant}
            {...props}
          />
        );
      })}
    </FieldGroup>
  );
}

function FormCheckboxMultipleItem({
  variant,
  option,
  ...props
}: React.ComponentPropsWithRef<typeof Checkbox> & {
  option: Option;
  variant?: Variant;
}) {
  const field = useFieldContext<string[]>();
  const fieldSet = useFieldSet();
  const isInvalid = checkIsInvalidField(field);

  const id = `${field.name}-${option.value}`;
  const isDisabled = fieldSet?.disabled || option.disabled;

  function handleCheckedChange(checked: boolean) {
    if (checked) {
      field.pushValue(option.value);
    } else {
      const index = field.state.value.indexOf(option.value);
      if (index > -1) {
        field.removeValue(index);
      }
    }
  }

  const checkbox = (
    <Checkbox
      id={id}
      name={field.name}
      onBlur={field.handleBlur}
      checked={field.state.value.includes(option.value)}
      disabled={isDisabled}
      aria-invalid={isInvalid}
      onCheckedChange={handleCheckedChange}
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
        {checkbox}
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
          {checkbox}
          <FieldContent>
            <FieldTitle>{option.label}</FieldTitle>
            {option.description && (
              <FieldDescription>{option.description}</FieldDescription>
            )}
          </FieldContent>
        </Field>
      </FieldLabel>
    ),
  };

  return components[variant ?? 'default'];
}
