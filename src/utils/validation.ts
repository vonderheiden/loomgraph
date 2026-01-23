import { BannerState, ValidationError, ValidationResult } from '../types/banner.types';

/**
 * Validate the banner state
 */
export function validateBannerState(state: BannerState): ValidationResult {
  const errors: ValidationError[] = [];

  // Title validation
  if (!state.title || state.title.trim().length === 0) {
    errors.push({ field: 'title', message: 'Title is required' });
  } else if (state.title.length > 100) {
    errors.push({ field: 'title', message: 'Title must be 100 characters or less' });
  }

  // Speaker name validation
  if (!state.speakerName || state.speakerName.trim().length === 0) {
    errors.push({ field: 'speakerName', message: 'Speaker name is required' });
  } else if (state.speakerName.length > 50) {
    errors.push({ field: 'speakerName', message: 'Speaker name must be 50 characters or less' });
  }

  // Speaker role validation
  if (!state.speakerRole || state.speakerRole.trim().length === 0) {
    errors.push({ field: 'speakerRole', message: 'Speaker title/company is required' });
  } else if (state.speakerRole.length > 50) {
    errors.push({ field: 'speakerRole', message: 'Speaker role must be 50 characters or less' });
  }

  // Date validation
  if (!state.date) {
    errors.push({ field: 'date', message: 'Date is required' });
  } else {
    const selectedDate = new Date(state.date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (selectedDate < today) {
      errors.push({ field: 'date', message: 'Date must be in the future' });
    }
  }

  // Time validation
  if (!state.time) {
    errors.push({ field: 'time', message: 'Time is required' });
  } else if (!/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/.test(state.time)) {
    errors.push({ field: 'time', message: 'Invalid time format' });
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

/**
 * Validate file upload
 */
export function validateFile(file: File): { isValid: boolean; error?: string } {
  const maxSize = 5 * 1024 * 1024; // 5MB
  const allowedTypes = ['image/jpeg', 'image/png'];

  if (!allowedTypes.includes(file.type)) {
    return { isValid: false, error: 'File must be JPG or PNG' };
  }

  if (file.size > maxSize) {
    return { isValid: false, error: 'File size must be less than 5MB' };
  }

  return { isValid: true };
}

/**
 * Check if banner is ready for export
 */
export function isReadyForExport(state: BannerState): boolean {
  const validation = validateBannerState(state);
  return validation.isValid;
}
