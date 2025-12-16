import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Merges and combines CSS class names with Tailwind CSS support
 *
 * Combines multiple class values using `clsx` and then resolves
 * conflicting Tailwind CSS classes using `twMerge`. This utility
 * is useful for dynamically combining conditional and static
 * Tailwind classes without conflicts.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
