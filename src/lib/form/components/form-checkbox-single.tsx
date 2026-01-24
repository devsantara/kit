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
  description?: string;
}

type Variant = 'default' | 'card';

export function FormCheckboxSingle({
  option,
  variant = 'default',
  ...props
}: React.ComponentPropsWithRef<typeof Checkbox> & {
  option: Option;
  variant?: Variant;
}) {
  return (
    <FieldGroup data-slot="checkbox-group">
      <FormCheckboxSingleItem option={option} variant={variant} {...props} />
    </FieldGroup>
  );
}

function FormCheckboxSingleItem({
  variant,
  option,
  disabled,
  ...props
}: React.ComponentPropsWithRef<typeof Checkbox> & {
  option: Option;
  variant: Variant;
}) {
  const field = useFieldContext<boolean>();
  const fieldSet = useFieldSet();
  const isInvalid = checkIsInvalidField(field);

  const id = field.name;
  const isDisabled = fieldSet?.disabled || disabled;

  function handleCheckedChange(checked: boolean) {
    field.handleChange(checked === true);
  }

  const checkbox = (
    <Checkbox
      id={id}
      name={field.name}
      onBlur={field.handleBlur}
      checked={field.state.value}
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

  return components[variant];
}
