import { useFieldContext } from '~/lib/form/form.context';
import { checkIsInvalidField } from '~/lib/form/form.utils';
import { Textarea } from '~/ui/components/core/textarea';
import { cn } from '~/ui/utils';

export function FormTextarea({
  className,
  ...props
}: React.ComponentPropsWithRef<typeof Textarea>) {
  const field = useFieldContext<string>();
  const isInvalid = checkIsInvalidField(field);

  const id = field.name;

  function handleChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
    field.handleChange(event.target.value);
  }

  return (
    <Textarea
      id={id}
      name={field.name}
      value={field.state.value}
      onBlur={field.handleBlur}
      onChange={handleChange}
      aria-invalid={isInvalid}
      className={cn('min-h-30', className)}
      {...props}
    />
  );
}
