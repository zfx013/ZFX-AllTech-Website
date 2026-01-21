import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Combines class names using clsx and tailwind-merge
 * This ensures Tailwind classes are properly merged without conflicts
 *
 * @example
 * cn('px-2 py-1', 'px-4') // => 'py-1 px-4'
 * cn('text-red-500', condition && 'text-blue-500') // conditional classes
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Formats a date to a localized string
 *
 * @param date - Date object or ISO string
 * @param locale - Locale string (default: 'fr-FR')
 * @param options - Intl.DateTimeFormatOptions
 * @returns Formatted date string
 *
 * @example
 * formatDate(new Date()) // => "21 janvier 2026"
 * formatDate(new Date(), 'en-US') // => "January 21, 2026"
 */
export function formatDate(
  date: Date | string,
  locale: string = 'fr-FR',
  options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }
): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return new Intl.DateTimeFormat(locale, options).format(dateObj);
}

/**
 * Formats a number with locale-specific formatting
 *
 * @param value - Number to format
 * @param locale - Locale string (default: 'fr-FR')
 * @param options - Intl.NumberFormatOptions
 * @returns Formatted number string
 *
 * @example
 * formatNumber(1234.56) // => "1 234,56"
 * formatNumber(1234.56, 'en-US') // => "1,234.56"
 */
export function formatNumber(
  value: number,
  locale: string = 'fr-FR',
  options?: Intl.NumberFormatOptions
): string {
  return new Intl.NumberFormat(locale, options).format(value);
}

/**
 * Formats a price with currency
 *
 * @param amount - Amount to format
 * @param currency - Currency code (default: 'EUR')
 * @param locale - Locale string (default: 'fr-FR')
 * @returns Formatted price string
 *
 * @example
 * formatPrice(1234.56) // => "1 234,56 €"
 * formatPrice(1234.56, 'USD', 'en-US') // => "$1,234.56"
 */
export function formatPrice(
  amount: number,
  currency: string = 'EUR',
  locale: string = 'fr-FR'
): string {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
  }).format(amount);
}

/**
 * Truncates a string to a maximum length with ellipsis
 *
 * @param str - String to truncate
 * @param maxLength - Maximum length
 * @param suffix - Suffix to add (default: '...')
 * @returns Truncated string
 *
 * @example
 * truncate('Hello World', 8) // => "Hello..."
 */
export function truncate(str: string, maxLength: number, suffix: string = '...'): string {
  if (str.length <= maxLength) return str;
  return str.slice(0, maxLength - suffix.length) + suffix;
}

/**
 * Debounces a function call
 *
 * @param fn - Function to debounce
 * @param delay - Delay in milliseconds
 * @returns Debounced function
 *
 * @example
 * const debouncedSearch = debounce((query) => search(query), 300);
 */
export function debounce<T extends (...args: any[]) => any>(
  fn: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), delay);
  };
}

/**
 * Throttles a function call
 *
 * @param fn - Function to throttle
 * @param limit - Time limit in milliseconds
 * @returns Throttled function
 *
 * @example
 * const throttledScroll = throttle(() => handleScroll(), 100);
 */
export function throttle<T extends (...args: any[]) => any>(
  fn: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      fn(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

/**
 * Delays execution for a specified time
 *
 * @param ms - Milliseconds to delay
 * @returns Promise that resolves after delay
 *
 * @example
 * await sleep(1000); // Wait 1 second
 */
export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Generates a random ID
 *
 * @param length - Length of ID (default: 8)
 * @returns Random ID string
 *
 * @example
 * generateId() // => "a3f2c9b1"
 */
export function generateId(length: number = 8): string {
  return Math.random()
    .toString(36)
    .substring(2, 2 + length);
}

/**
 * Clamps a number between min and max values
 *
 * @param value - Value to clamp
 * @param min - Minimum value
 * @param max - Maximum value
 * @returns Clamped value
 *
 * @example
 * clamp(15, 0, 10) // => 10
 * clamp(-5, 0, 10) // => 0
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

/**
 * Linearly interpolates between two values
 *
 * @param start - Start value
 * @param end - End value
 * @param t - Interpolation factor (0-1)
 * @returns Interpolated value
 *
 * @example
 * lerp(0, 100, 0.5) // => 50
 */
export function lerp(start: number, end: number, t: number): number {
  return start * (1 - t) + end * t;
}

/**
 * Maps a value from one range to another
 *
 * @param value - Value to map
 * @param inMin - Input range minimum
 * @param inMax - Input range maximum
 * @param outMin - Output range minimum
 * @param outMax - Output range maximum
 * @returns Mapped value
 *
 * @example
 * mapRange(5, 0, 10, 0, 100) // => 50
 */
export function mapRange(
  value: number,
  inMin: number,
  inMax: number,
  outMin: number,
  outMax: number
): number {
  return ((value - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
}

/**
 * Checks if code is running in browser
 *
 * @returns True if in browser environment
 */
export function isBrowser(): boolean {
  return typeof window !== 'undefined';
}

/**
 * Checks if device is mobile
 *
 * @returns True if mobile device
 */
export function isMobile(): boolean {
  if (!isBrowser()) return false;
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );
}

/**
 * Smoothly scrolls to an element
 *
 * @param elementId - Element ID to scroll to
 * @param offset - Offset in pixels (default: 0)
 *
 * @example
 * scrollToElement('contact', -100); // Scroll to #contact with -100px offset
 */
export function scrollToElement(elementId: string, offset: number = 0): void {
  if (!isBrowser()) return;

  const element = document.getElementById(elementId);
  if (!element) return;

  const elementPosition = element.getBoundingClientRect().top;
  const offsetPosition = elementPosition + window.pageYOffset + offset;

  window.scrollTo({
    top: offsetPosition,
    behavior: 'smooth',
  });
}

/**
 * Copies text to clipboard
 *
 * @param text - Text to copy
 * @returns Promise that resolves when copied
 *
 * @example
 * await copyToClipboard('Hello World');
 */
export async function copyToClipboard(text: string): Promise<void> {
  if (!isBrowser()) return;

  try {
    await navigator.clipboard.writeText(text);
  } catch (err) {
    // Fallback for older browsers
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.opacity = '0';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
      document.execCommand('copy');
    } catch (err) {
      console.error('Failed to copy text:', err);
    }
    document.body.removeChild(textArea);
  }
}

/**
 * Validates an email address
 *
 * @param email - Email to validate
 * @returns True if valid email
 *
 * @example
 * isValidEmail('test@example.com') // => true
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Validates a phone number (French format)
 *
 * @param phone - Phone number to validate
 * @returns True if valid phone number
 *
 * @example
 * isValidPhone('0612345678') // => true
 * isValidPhone('+33612345678') // => true
 */
export function isValidPhone(phone: string): boolean {
  const phoneRegex = /^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/;
  return phoneRegex.test(phone.replace(/\s/g, ''));
}

/**
 * Formats a phone number (French format)
 *
 * @param phone - Phone number to format
 * @returns Formatted phone number
 *
 * @example
 * formatPhone('0612345678') // => "06 12 34 56 78"
 */
export function formatPhone(phone: string): string {
  const cleaned = phone.replace(/\D/g, '');
  const match = cleaned.match(/^(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})$/);
  if (match) {
    return `${match[1]} ${match[2]} ${match[3]} ${match[4]} ${match[5]}`;
  }
  return phone;
}

/**
 * Gets initials from a name
 *
 * @param name - Full name
 * @returns Initials
 *
 * @example
 * getInitials('John Doe') // => "JD"
 */
export function getInitials(name: string): string {
  return name
    .split(' ')
    .map((word) => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

/**
 * Capitalizes the first letter of a string
 *
 * @param str - String to capitalize
 * @returns Capitalized string
 *
 * @example
 * capitalize('hello world') // => "Hello world"
 */
export function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Converts a string to kebab-case
 *
 * @param str - String to convert
 * @returns Kebab-cased string
 *
 * @example
 * toKebabCase('Hello World') // => "hello-world"
 */
export function toKebabCase(str: string): string {
  return str
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/[\s_]+/g, '-')
    .toLowerCase();
}

/**
 * Converts a string to camelCase
 *
 * @param str - String to convert
 * @returns CamelCased string
 *
 * @example
 * toCamelCase('hello-world') // => "helloWorld"
 */
export function toCamelCase(str: string): string {
  return str
    .toLowerCase()
    .replace(/[^a-zA-Z0-9]+(.)/g, (_, chr) => chr.toUpperCase());
}
