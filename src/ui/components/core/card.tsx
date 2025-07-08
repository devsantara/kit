import * as React from 'react';

import { cn } from '~/ui/utils';

export function Card({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card"
      className={cn(
        `
          flex flex-col gap-6 rounded-xl border bg-card py-6
          text-card-foreground shadow-sm
        `,
        className,
      )}
      {...props}
    />
  );
}

export function CardHeader({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-header"
      className={cn(
        `
          @container/card-header grid auto-rows-min grid-rows-[auto_auto]
          items-start gap-1.5 px-6
          has-data-[slot=card-action]:grid-cols-[1fr_auto]
          [.border-b]:pb-6
        `,
        className,
      )}
      {...props}
    />
  );
}

export function CardTitle({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      className={cn('leading-none font-semibold', className)}
      data-slot="card-title"
      {...props}
    />
  );
}

export function CardDescription({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      className={cn('text-sm text-muted-foreground', className)}
      data-slot="card-description"
      {...props}
    />
  );
}

export function CardAction({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-action"
      className={cn(
        'col-start-2 row-span-2 row-start-1 self-start justify-self-end',
        className,
      )}
      {...props}
    />
  );
}

export function CardContent({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      className={cn('px-6', className)}
      data-slot="card-content"
      {...props}
    />
  );
}

export function CardFooter({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      className={cn('flex items-center px-6 [.border-t]:pt-6', className)}
      data-slot="card-footer"
      {...props}
    />
  );
}
