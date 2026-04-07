// Phone number utilities

/**
 * Format phone number with country code
 */
export function formatPhoneNumber(countryCode: string, phoneNumber: string): string {
  // Remove any non-digit characters
  const cleanPhone = phoneNumber.replace(/\D/g, '');
  const cleanCode = countryCode.replace(/\D/g, '');
  
  return `+${cleanCode}${cleanPhone}`;
}

/**
 * Validate phone number format
 */
export function validatePhoneNumber(phoneNumber: string): boolean {
  // Check if phone number contains only digits and is between 7-15 characters
  const cleanPhone = phoneNumber.replace(/\D/g, '');
  return /^\d{7,15}$/.test(cleanPhone);
}

/**
 * Parse phone number to extract country code and number
 */
export function parsePhoneNumber(fullPhone: string): { countryCode: string; phoneNumber: string } {
  // Remove + and any non-digit characters
  const cleanPhone = fullPhone.replace(/\D/g, '');
  
  // Assume first 1-3 digits are country code
  // Common country codes: +1 (US), +44 (UK), +91 (India), +966 (Saudi Arabia)
  let countryCode = '';
  let phoneNumber = '';
  
  if (cleanPhone.startsWith('966')) {
    countryCode = '+966';
    phoneNumber = cleanPhone.substring(3);
  } else if (cleanPhone.startsWith('1')) {
    countryCode = '+1';
    phoneNumber = cleanPhone.substring(1);
  } else if (cleanPhone.startsWith('44')) {
    countryCode = '+44';
    phoneNumber = cleanPhone.substring(2);
  } else if (cleanPhone.startsWith('91')) {
    countryCode = '+91';
    phoneNumber = cleanPhone.substring(2);
  } else {
    // Default: assume first 3 digits are country code
    countryCode = `+${cleanPhone.substring(0, 3)}`;
    phoneNumber = cleanPhone.substring(3);
  }
  
  return { countryCode, phoneNumber };
}

/**
 * Format phone number for display (e.g., +966 50 123 4567)
 */
export function formatPhoneForDisplay(fullPhone: string): string {
  const { countryCode, phoneNumber } = parsePhoneNumber(fullPhone);
  
  // Format based on country code
  if (countryCode === '+91') {
    // Saudi format: +966 50 123 4567
    const match = phoneNumber.match(/^(\d{2})(\d{3})(\d{4})$/);
    if (match) {
      return `${countryCode} ${match[1]} ${match[2]} ${match[3]}`;
    }
  }
  
  // Default format: +XXX XXXXXXXXX
  return `${countryCode} ${phoneNumber}`;
}
