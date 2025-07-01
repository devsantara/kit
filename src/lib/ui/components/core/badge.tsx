import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '~/lib/ui/utils';

export const badgeVariants = cva(
  `
    inline-flex w-fit shrink-0 items-center justify-center gap-1 overflow-hidden
    rounded-md border px-2 py-0.5 text-xs font-medium whitespace-nowrap
    transition-[color,box-shadow]
    focus-visible:border-ring focus-visible:ring-[3px]
    focus-visible:ring-ring/50
    aria-invalid:border-destructive aria-invalid:ring-destructive/20
    dark:aria-invalid:ring-destructive/40
    [&>svg]:pointer-events-none [&>svg]:size-3
  `,
  {
    variants: {
      variant: {
        default:
          `
            border-transparent bg-primary text-primary-foreground
            [a&]:hover:bg-primary/90
          `,
        secondary:
          `
            border-transparent bg-secondary text-secondary-foreground
            [a&]:hover:bg-secondary/90
          `,
        outline:
          `
            text-foreground
            [a&]:hover:bg-accent [a&]:hover:text-accent-foreground
          `,
        info:
          `
            border-transparent bg-info text-white
            dark:bg-info/60 dark:[a&]:hover:bg-info/50
            [a&]:hover:bg-info/90
          `,
        success:
          `
            border-transparent bg-success text-white
            dark:bg-success/60 dark:[a&]:hover:bg-success/50
            [a&]:hover:bg-success/90
          `,
        warning:
          `
            border-transparent bg-warning text-white
            dark:bg-warning/60 dark:[a&]:hover:bg-warning/50
            [a&]:hover:bg-warning/90
          `,
        destructive:
          `
            border-transparent bg-destructive text-white
            dark:bg-destructive/60 dark:[a&]:hover:bg-destructive/50
            [a&]:hover:bg-destructive/90
          `,

      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);

export function Badge({
  className,
  variant,
  asChild = false,
  ...props
}: React.ComponentProps<'span'>
  & VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : 'span';

  return (
    <Comp
      className={cn(badgeVariants({ variant }), className)}
      data-slot="badge"
      {...props}
    />
  );
}
