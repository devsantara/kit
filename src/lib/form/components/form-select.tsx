import { useFieldContext } from '~/lib/form/form.context';
import { checkIsInvalidField } from '~/lib/form/form.utils';
import { useFieldSet } from '~/ui/components/core/field';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '~/ui/components/core/select';
import { cn } from '~/ui/utils';

interface Option {
  label: string;
  value: string;
}

export function FormSelect({
  className,
  placeholder,
  options,
  disabled,
  ...props
}: React.ComponentPropsWithRef<typeof SelectTrigger> & {
  placeholder?: string;
  options: Option[];
}) {
  const field = useFieldContext<string>();
  const fieldSet = useFieldSet();
  const isInvalid = checkIsInvalidField(field);

  const id = field.name;
  const isDisabled = fieldSet?.disabled || disabled;

  function handleValueChange(value: string) {
    field.handleChange(value);
  }

  return (
    <Select
      name={field.name}
      value={field.state.value}
      onValueChange={handleValueChange}
      disabled={isDisabled}
    >
      <SelectTrigger
        id={id}
        aria-invalid={isInvalid}
        className={cn('min-w-30', className)}
        {...props}
      >
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent position="popper">
        <SelectGroup>
          {options.map((option) => {
            return (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            );
          })}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
