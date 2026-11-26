/**
 * Helper utilities for WhatsApp CTAs
 */

export const DEFAULT_WHATSAPP_MESSAGE =
  'Hi Akash, I visited your portfolio website and would like to connect.';

/**
 * Strips all non-digit characters to generate a valid wa.me URL
 */
export function sanitizeWhatsAppNumber(rawNumber?: string): string {
  if (!rawNumber || rawNumber.includes('[YOUR-')) {
    return '919876543210'; // Placeholder fallback number
  }
  const digits = rawNumber.replace(/\D/g, '');
  return digits || '919876543210';
}

/**
 * Builds a direct wa.me link with prefilled message
 */
export function getWhatsAppUrl(
  rawNumber?: string,
  customMessage: string = DEFAULT_WHATSAPP_MESSAGE
): string {
  const digits = sanitizeWhatsAppNumber(rawNumber);
  const encodedText = encodeURIComponent(customMessage);
  return `https://wa.me/${digits}?text=${encodedText}`;
}

/**
 * Returns formatted display string for contact links
 */
export function formatWhatsAppDisplay(rawNumber?: string): string {
  if (!rawNumber || rawNumber.includes('[YOUR-')) {
    return '+91 98765 43210 [Placeholder]';
  }
  return rawNumber;
}
