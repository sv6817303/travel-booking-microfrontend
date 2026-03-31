export function isValidEmail(email: string) {
  const v = String(email || '').trim();
  // Simple, practical email validation for UI (not RFC-perfect).
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}

export function normalizePhone(phone: string) {
  return String(phone || '').replace(/[^\d]/g, '');
}

export function isValidPhone(phone: string) {
  const digits = normalizePhone(phone);
  // Accept 10-15 digits (international-friendly).
  return digits.length >= 10 && digits.length <= 15;
}

export function isNonEmpty(value: string) {
  return Boolean(String(value || '').trim());
}

