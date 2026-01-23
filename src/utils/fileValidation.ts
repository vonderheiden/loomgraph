/**
 * File validation utilities with magic number checking
 * Prevents file type spoofing and validates actual file content
 */

/**
 * Validate file by checking magic numbers (file headers)
 * This prevents MIME type spoofing attacks
 */
export function validateFileType(file: File): Promise<boolean> {
  return new Promise((resolve) => {
    const reader = new FileReader();
    
    reader.onload = (e) => {
      const arr = new Uint8Array(e.target?.result as ArrayBuffer).subarray(0, 4);
      let header = '';
      for (let i = 0; i < arr.length; i++) {
        header += arr[i].toString(16).padStart(2, '0');
      }
      
      // Check magic numbers for valid image types
      const validHeaders: Record<string, string> = {
        'ffd8ffe0': 'image/jpeg', // JPEG (JFIF)
        'ffd8ffe1': 'image/jpeg', // JPEG (Exif)
        'ffd8ffe2': 'image/jpeg', // JPEG (Canon)
        'ffd8ffe3': 'image/jpeg', // JPEG
        'ffd8ffe8': 'image/jpeg', // JPEG (SPIFF)
        '89504e47': 'image/png',  // PNG
      };
      
      const isValid = Object.keys(validHeaders).some(key => header.startsWith(key));
      resolve(isValid);
    };
    
    reader.onerror = () => resolve(false);
    reader.readAsArrayBuffer(file.slice(0, 4));
  });
}

/**
 * Validate image dimensions to prevent memory exhaustion
 */
export function validateImageDimensions(file: File): Promise<{ 
  valid: boolean; 
  width?: number; 
  height?: number;
  error?: string;
}> {
  return new Promise((resolve) => {
    const img = new Image();
    const url = URL.createObjectURL(file);
    
    img.onload = () => {
      URL.revokeObjectURL(url);
      const maxDimension = 4000;
      
      if (img.width > maxDimension || img.height > maxDimension) {
        resolve({ 
          valid: false, 
          width: img.width, 
          height: img.height,
          error: `Image dimensions too large (${img.width}x${img.height}). Maximum 4000x4000 pixels.`
        });
      } else {
        resolve({ valid: true, width: img.width, height: img.height });
      }
    };
    
    img.onerror = () => {
      URL.revokeObjectURL(url);
      resolve({ 
        valid: false,
        error: 'Failed to load image. File may be corrupted.'
      });
    };
    
    img.src = url;
  });
}

/**
 * Comprehensive file validation for uploads
 * Checks: file size, MIME type, magic numbers, and image dimensions
 */
export async function validateUploadedFile(file: File): Promise<{ 
  isValid: boolean; 
  error?: string;
}> {
  // Check file size (5MB limit)
  const maxSize = 5 * 1024 * 1024;
  if (file.size > maxSize) {
    return { 
      isValid: false, 
      error: 'File size must be less than 5MB' 
    };
  }
  
  // Check MIME type (first line of defense)
  const allowedTypes = ['image/jpeg', 'image/png'];
  if (!allowedTypes.includes(file.type)) {
    return { 
      isValid: false, 
      error: 'File must be JPG or PNG' 
    };
  }
  
  // Validate actual file content using magic numbers
  const isValidType = await validateFileType(file);
  if (!isValidType) {
    return { 
      isValid: false, 
      error: 'Invalid file format. File may be corrupted or not a real image.' 
    };
  }
  
  // Validate image dimensions
  const dimensions = await validateImageDimensions(file);
  if (!dimensions.valid) {
    return { 
      isValid: false, 
      error: dimensions.error || 'Invalid image dimensions'
    };
  }
  
  return { isValid: true };
}

/**
 * Simple synchronous validation for image files
 * Used by upload components for immediate feedback
 */
export function validateImageFile(file: File, maxSize: number = 5 * 1024 * 1024): { 
  isValid: boolean; 
  error?: string;
} {
  // Check file size
  if (file.size > maxSize) {
    const sizeMB = Math.round(maxSize / (1024 * 1024));
    return { 
      isValid: false, 
      error: `File size must be less than ${sizeMB}MB` 
    };
  }
  
  // Check MIME type
  const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
  if (!allowedTypes.includes(file.type)) {
    return { 
      isValid: false, 
      error: 'File must be JPG or PNG' 
    };
  }
  
  return { isValid: true };
}

/**
 * Validate company logo file (similar to headshot but with different size limits)
 */
export async function validateLogoFile(file: File): Promise<{ 
  isValid: boolean; 
  error?: string;
}> {
  // Check file size (2MB limit for logos)
  const maxSize = 2 * 1024 * 1024;
  if (file.size > maxSize) {
    return { 
      isValid: false, 
      error: 'Logo file size must be less than 2MB' 
    };
  }
  
  // Check MIME type
  const allowedTypes = ['image/jpeg', 'image/png'];
  if (!allowedTypes.includes(file.type)) {
    return { 
      isValid: false, 
      error: 'Logo must be JPG or PNG' 
    };
  }
  
  // Validate actual file content
  const isValidType = await validateFileType(file);
  if (!isValidType) {
    return { 
      isValid: false, 
      error: 'Invalid logo format. File may be corrupted.' 
    };
  }
  
  // Validate logo dimensions (smaller limits)
  const dimensions = await validateImageDimensions(file);
  if (!dimensions.valid) {
    return { 
      isValid: false, 
      error: dimensions.error || 'Invalid logo dimensions'
    };
  }
  
  // Check minimum dimensions for logos
  if (dimensions.width && dimensions.height) {
    if (dimensions.width < 50 || dimensions.height < 50) {
      return {
        isValid: false,
        error: 'Logo too small. Minimum 50x50 pixels.'
      };
    }
  }
  
  return { isValid: true };
}
