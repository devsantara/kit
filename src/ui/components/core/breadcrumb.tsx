import { Slot } from '@radix-ui/react-slot';
import * as React from 'react';

import { Icons } from '~/ui/icons';
import { cn } from '~/ui/utils';

export function Breadcrumb({ ...props }: React.ComponentProps<'nav'>) {
  return <nav aria-label="breadcrumb" data-slot="breadcrumb" {...props} />;
}

export function BreadcrumbList({ className, ...props }: React.ComponentProps<'ol'>) {
  return (
    <ol
      data-slot="breadcrumb-list"
      className={cn(
        `
          flex flex-wrap items-center gap-1.5 text-sm break-words
          text-muted-foreground
          sm:gap-2.5
        `,
        className,
      )}
      {...props}
    />
  );
}

export function BreadcrumbItem({ className, ...props }: React.ComponentProps<'li'>) {
  return (
    <li
      className={cn('inline-flex items-center gap-1.5', className)}
      data-slot="breadcrumb-item"
      {...props}
    />
  );
}

export function BreadcrumbLink({
  asChild,
  className,
  ...props
}: React.ComponentProps<'a'> & {
  asChild?: boolean;
}) {
  const Comp = asChild ? Slot : 'a';

  return (
    <Comp
      className={cn('transition-colors hover:text-foreground', className)}
      data-slot="breadcrumb-link"
      {...props}
    />
  );
}

export function BreadcrumbPage({ className, ...props }: React.ComponentProps<'span'>) {
  return (
    <span
      aria-current="page"
      aria-disabled="true"
      className={cn('font-normal text-foreground', className)}
      data-slot="breadcrumb-page"
      role="link"
      {...props}
    />
  );
}

export function BreadcrumbSeparator({
  children,
  className,
  ...props
}: React.ComponentProps<'li'>) {
  return (
    <li
      aria-hidden="true"
      className={cn('[&>svg]:size-3.5', className)}
      data-slot="breadcrumb-separator"
      role="presentation"
      {...props}
    >
      {children ?? <Icons.ChevronRight />}
    </li>
  );
}

export function BreadcrumbEllipsis({
  className,
  ...props
}: React.ComponentProps<'span'>) {
  return (
    <span
      aria-hidden="true"
      className={cn('flex size-9 items-center justify-center', className)}
      data-slot="breadcrumb-ellipsis"
      role="presentation"
      {...props}
    >
      <Icons.MoreHorizontal className="size-4" />
      <span className="sr-only">More</span>
    </span>
  );
}
