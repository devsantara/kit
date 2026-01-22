import { useFieldContext } from '~/lib/form/form.context';
import { checkIsInvalidField } from '~/lib/form/form.utils';
import { Input } from '~/ui/components/core/input';

export function FormInput({
  className,
  ...props
}: React.ComponentPropsWithRef<typeof Input>) {
  const field = useFieldContext<string>();
  const isInvalid = checkIsInvalidField(field);

  const id = field.name;

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    field.handleChange(event.target.value);
  }

  return (
    <Input
      id={id}
      name={field.name}
      value={field.state.value}
      onBlur={field.handleBlur}
      onChange={handleChange}
      aria-invalid={isInvalid}
      className={className}
      {...props}
    />
  );
}
