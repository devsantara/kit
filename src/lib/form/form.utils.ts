import type { AnyFieldApi } from '@tanstack/react-form';

/**
 * Symbol used to identify form-level errors.
 * Provides type-safe discrimination for error objects.
 */
export const FormErrorSymbol = Symbol('FORM_ERROR');

/** Represents a form-level error object set when form submission fails (e.g error from server). */
export type FormError = ReturnType<typeof createFormError>;

/** Checks if a field has been touched by the user and contains invalid data. */
export function checkIsInvalidField(field: AnyFieldApi) {
  return field.state.meta.isTouched && !field.state.meta.isValid;
}

/**
 * Creates a field-level error object with a message.
 * Used for validation errors on individual form fields.
 */
export function createFieldError(message: string) {
  return { message } as const;
}

/**
 * Creates a form-level error object with optional title and message.
 * Form-level errors are typically used for cross-field validation
 * or errors from server submissions.
 */
export function createFormError({
  title,
  message,
}: {
  title?: string;
  message?: string;
}) {
  return { _tag: FormErrorSymbol, title, message } as const;
}

/**
 * Type guard to check if a value is a FormError object.
 * Safely narrows the type for error handling.
 */
export function checkIsFormError(errors: unknown): errors is FormError {
  return (
    typeof errors === 'object' &&
    errors !== null &&
    '_tag' in errors &&
    errors?._tag === FormErrorSymbol
  );
}
