import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '~/lib/ui/utils';

const alertVariants = cva(
  `
    relative grid w-full grid-cols-[0_1fr] items-start gap-y-0.5 rounded-lg
    border px-4 py-3 text-sm
    has-[>svg]:grid-cols-[calc(var(--spacing)*4)_1fr] has-[>svg]:gap-x-3
    [&>svg]:size-4 [&>svg]:translate-y-0.5 [&>svg]:text-current
  `,
  {
    variants: {
      variant: {
        default: 'bg-card text-card-foreground',
        info: `
          bg-card text-info
          *:data-[slot=alert-description]:text-info/90
          [&>svg]:text-current
        `,
        success:
          `
            bg-card text-success
            *:data-[slot=alert-description]:text-success/90
            [&>svg]:text-current
          `,
        warning:
          `
            bg-card text-warning
            *:data-[slot=alert-description]:text-warning/90
            [&>svg]:text-current
          `,
        destructive:
          `
            bg-card text-destructive
            *:data-[slot=alert-description]:text-destructive/90
            [&>svg]:text-current
          `,
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);

export function Alert({
  className,
  variant,
  ...props
}: React.ComponentProps<'div'> & VariantProps<typeof alertVariants>) {
  return (
    <div
      className={cn(alertVariants({ variant }), className)}
      data-slot="alert"
      role="alert"
      {...props}
    />
  );
}

export function AlertTitle({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="alert-title"
      className={cn(
        'col-start-2 line-clamp-1 min-h-4 font-medium tracking-tight',
        className,
      )}
      {...props}
    />
  );
}

export function AlertDescription({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="alert-description"
      className={cn(
        `
          col-start-2 grid justify-items-start gap-1 text-sm
          text-muted-foreground
          [&_p]:leading-relaxed
        `,
        className,
      )}
      {...props}
    />
  );
}
