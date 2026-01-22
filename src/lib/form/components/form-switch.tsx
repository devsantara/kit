import { useFieldContext } from '~/lib/form/form.context';
import { checkIsInvalidField } from '~/lib/form/form.utils';
import { Switch } from '~/ui/components/core/switch';

export function FormSwitch({
  className,
  ...props
}: React.ComponentPropsWithRef<typeof Switch>) {
  const field = useFieldContext<boolean>();
  const isInvalid = checkIsInvalidField(field);

  const id = field.name;

  function handleCheckedChange(checked: boolean) {
    field.handleChange(checked);
  }

  return (
    <Switch
      id={id}
      name={field.name}
      checked={field.state.value}
      onBlur={field.handleBlur}
      onCheckedChange={handleCheckedChange}
      aria-invalid={isInvalid}
      className={className}
      {...props}
    />
  );
}
