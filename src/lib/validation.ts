/**
 * Form Validation Utilities
 *
 * @description
 * A collection of reusable validator functions for form validation.
 * Each validator returns either an error message string or null if valid.
 *
 * @example
 * ```typescript
 * import { required, minLength, email, selected } from '@/lib/validation';
 *
 * const validators = {
 *   name: required('Name'),
 *   message: minLength(10, 'Message'),
 *   email: email(),
 *   subject: selected('Subject'),
 * };
 *
 * const error = validators.name(''); // Returns "Name is required"
 * const valid = validators.name('John'); // Returns null
 * ```
 */

/**
 * Validator function type
 *
 * @description
 * A function that takes a string value and returns either an error message
 * string if validation fails, or null if validation passes.
 */
export type ValidatorFn = (value: string) => string | null;

/**
 * Creates a required field validator
 *
 * @description
 * Validates that a field is not empty after trimming whitespace.
 * Returns an error message if the trimmed value is empty.
 *
 * @param fieldName - The name of the field for the error message
 * @returns A validator function
 *
 * @example
 * ```typescript
 * const validateName = required('Name');
 * validateName('');      // Returns "Name is required"
 * validateName('  ');    // Returns "Name is required"
 * validateName('John');  // Returns null
 * ```
 */
export function required(fieldName: string): ValidatorFn {
  return (value: string): string | null => {
    const trimmed = (value ?? '').trim();
    return trimmed.length === 0 ? `${fieldName} is required` : null;
  };
}

/**
 * Creates a minimum length validator
 *
 * @description
 * Validates that a field's trimmed value meets a minimum character length.
 * Returns an error message if the trimmed value is shorter than the minimum.
 *
 * @param min - The minimum number of characters required
 * @param fieldName - The name of the field for the error message
 * @returns A validator function
 *
 * @example
 * ```typescript
 * const validateMessage = minLength(10, 'Message');
 * validateMessage('Hi');           // Returns "Message must be at least 10 characters"
 * validateMessage('Hello world!'); // Returns null
 * ```
 */
export function minLength(min: number, fieldName: string): ValidatorFn {
  return (value: string): string | null => {
    const trimmed = (value ?? '').trim();
    return trimmed.length < min
      ? `${fieldName} must be at least ${min} characters`
      : null;
  };
}

/**
 * Creates an email format validator
 *
 * @description
 * Validates that a field contains a valid email address format.
 * Uses a simple regex pattern that checks for: non-whitespace@non-whitespace.non-whitespace
 *
 * @returns A validator function
 *
 * @example
 * ```typescript
 * const validateEmail = email();
 * validateEmail('invalid');           // Returns "Please enter a valid email address"
 * validateEmail('test@');             // Returns "Please enter a valid email address"
 * validateEmail('test@example.com');  // Returns null
 * ```
 */
export function email(): ValidatorFn {
  return (value: string): string | null => {
    const trimmed = (value ?? '').trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(trimmed)
      ? null
      : 'Please enter a valid email address';
  };
}

/**
 * Creates a select field validator
 *
 * @description
 * Validates that a select field has a non-empty value selected.
 * Useful for dropdown menus where the default option has an empty value.
 *
 * @param fieldName - The name of the field for the error message
 * @returns A validator function
 *
 * @example
 * ```typescript
 * const validateSubject = selected('Subject');
 * validateSubject('');          // Returns "Please select a Subject"
 * validateSubject('support');   // Returns null
 * ```
 */
export function selected(fieldName: string): ValidatorFn {
  return (value: string): string | null => {
    const trimmed = (value ?? '').trim();
    return trimmed.length === 0 ? `Please select a ${fieldName}` : null;
  };
}
