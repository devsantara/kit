import * as React from 'react';

import { Button, buttonVariants } from '~/ui/components/core/button';
import { Icons } from '~/ui/icons';
import { cn } from '~/ui/utils';

export function Pagination({ className, ...props }: React.ComponentProps<'nav'>) {
  return (
    <nav
      aria-label="pagination"
      className={cn('mx-auto flex w-full justify-center', className)}
      data-slot="pagination"
      role="navigation"
      {...props}
    />
  );
}

export function PaginationContent({
  className,
  ...props
}: React.ComponentProps<'ul'>) {
  return (
    <ul
      className={cn('flex flex-row items-center gap-1', className)}
      data-slot="pagination-content"
      {...props}
    />
  );
}

export function PaginationItem({ ...props }: React.ComponentProps<'li'>) {
  return <li data-slot="pagination-item" {...props} />;
}

type PaginationLinkProps = {
  isActive?: boolean;
} & Pick<React.ComponentProps<typeof Button>, 'size'>
& React.ComponentProps<'a'>;

export function PaginationLink({
  className,
  isActive,
  children,
  size = 'icon',
  ...props
}: PaginationLinkProps) {
  return (
    <a
      aria-current={isActive ? 'page' : undefined}
      data-active={isActive}
      data-slot="pagination-link"
      className={cn(
        buttonVariants({
          variant: isActive ? 'outline' : 'ghost',
          size,
        }),
        className,
      )}
      {...props}
    >
      {children}
    </a>
  );
}

export function PaginationPrevious({
  className,
  ...props
}: React.ComponentProps<typeof PaginationLink>) {
  return (
    <PaginationLink
      aria-label="Go to previous page"
      className={cn('gap-1 px-2.5 sm:pl-2.5', className)}
      size="default"
      {...props}
    >
      <Icons.ChevronLeft />
      <span className="hidden sm:block">Previous</span>
    </PaginationLink>
  );
}

export function PaginationNext({
  className,
  ...props
}: React.ComponentProps<typeof PaginationLink>) {
  return (
    <PaginationLink
      aria-label="Go to next page"
      className={cn('gap-1 px-2.5 sm:pr-2.5', className)}
      size="default"
      {...props}
    >
      <span className="hidden sm:block">Next</span>
      <Icons.ChevronRight />
    </PaginationLink>
  );
}

export function PaginationEllipsis({
  className,
  ...props
}: React.ComponentProps<'span'>) {
  return (
    <span
      aria-hidden
      className={cn('flex size-9 items-center justify-center', className)}
      data-slot="pagination-ellipsis"
      {...props}
    >
      <Icons.MoreHorizontal className="size-4" />
      <span className="sr-only">More pages</span>
    </span>
  );
}
