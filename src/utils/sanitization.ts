/**
 * Input sanitization utilities to prevent XSS attacks
 * All user inputs should be sanitized before storage or rendering
 */

/**
 * Sanitize text input to prevent XSS
 * Removes HTML tags, script patterns, and normalizes whitespace
 */
export function sanitizeText(input: string): string {
  if (!input) return '';
  
  // Remove any HTML tags
  let sanitized = input.replace(/<[^>]*>/g, '');
  
  // Remove script-like patterns
  sanitized = sanitized.replace(/javascript:/gi, '');
  sanitized = sanitized.replace(/on\w+\s*=/gi, '');
  
  // Remove data URIs
  sanitized = sanitized.replace(/data:.*?base64/gi, '');
  
  // Normalize whitespace
  sanitized = sanitized.trim().replace(/\s+/g, ' ');
  
  return sanitized;
}

/**
 * Validate text input doesn't contain malicious patterns
 */
export function isValidText(input: string): boolean {
  if (!input) return true;
  
  // Check for script tags
  if (/<script/i.test(input)) return false;
  
  // Check for event handlers
  if (/on\w+\s*=/i.test(input)) return false;
  
  // Check for javascript: protocol
  if (/javascript:/i.test(input)) return false;
  
  // Check for data: protocol with base64
  if (/data:.*base64/i.test(input)) return false;
  
  // Check for iframe tags
  if (/<iframe/i.test(input)) return false;
  
  // Check for object/embed tags
  if (/<(object|embed)/i.test(input)) return false;
  
  return true;
}

/**
 * Sanitize and validate user input
 * Returns sanitized text and validation status
 */
export function sanitizeAndValidate(input: string): { 
  sanitized: string; 
  isValid: boolean; 
  error?: string;
} {
  if (!input) {
    return {
      sanitized: '',
      isValid: true
    };
  }
  
  // Check for malicious patterns first
  if (!isValidText(input)) {
    return {
      sanitized: '',
      isValid: false,
      error: 'Input contains invalid characters or patterns'
    };
  }
  
  // Sanitize the input
  const sanitized = sanitizeText(input);
  
  return {
    sanitized,
    isValid: true
  };
}

/**
 * Sanitize URL input
 * Ensures URL is safe and doesn't contain javascript: or data: protocols
 */
export function sanitizeUrl(url: string): string {
  if (!url) return '';
  
  // Remove whitespace
  const sanitized = url.trim();
  
  // Check for dangerous protocols
  const dangerousProtocols = /^(javascript|data|vbscript|file):/i;
  if (dangerousProtocols.test(sanitized)) {
    return '';
  }
  
  // Ensure URL starts with http:// or https:// if it has a protocol
  if (sanitized.includes(':') && !sanitized.match(/^https?:\/\//i)) {
    return '';
  }
  
  return sanitized;
}

/**
 * Sanitize color hex code
 * Ensures color is a valid hex code
 */
export function sanitizeColor(color: string): string {
  if (!color) return '#3B82F6'; // Default blue
  
  // Remove whitespace
  let sanitized = color.trim();
  
  // Ensure it starts with #
  if (!sanitized.startsWith('#')) {
    sanitized = '#' + sanitized;
  }
  
  // Validate hex format (3 or 6 digits)
  const hexPattern = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
  if (!hexPattern.test(sanitized)) {
    return '#3B82F6'; // Return default if invalid
  }
  
  return sanitized;
}

/**
 * Escape HTML entities
 * Use this when rendering user input as HTML (though we should avoid this)
 */
export function escapeHtml(text: string): string {
  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;',
    '/': '&#x2F;',
  };
  
  return text.replace(/[&<>"'/]/g, (char) => map[char]);
}
