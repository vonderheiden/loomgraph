import { CTAButtonProps } from '../../types/landing.types';

/**
 * CTAButton Component
 * 
 * A reusable call-to-action button component with multiple variants and sizes.
 * Designed for high conversion with clear visual hierarchy and accessibility.
 * 
 * Variants:
 * - primary: Electric Blue (#3B82F6) background with white text (high contrast)
 * - secondary: White background with gray border (subtle alternative)
 * 
 * Sizes:
 * - small: Compact button for secondary actions
 * - medium: Standard button size (default)
 * - large: Prominent button for primary CTAs
 * 
 * Accessibility:
 * - Includes focus ring for keyboard navigation
 * - ARIA label for screen readers
 * - Minimum touch target size (44x44px) on all sizes
 * 
 * @param text - Button label text
 * @param onClick - Click handler function
 * @param variant - Visual style variant (primary or secondary)
 * @param size - Button size (small, medium, or large)
 * @param className - Optional additional CSS classes for customization
 */
export function CTAButton({ 
  text, 
  onClick, 
  variant = 'primary', 
  size = 'medium',
  className = '' 
}: CTAButtonProps) {
  // Base styles: typography, border radius, transitions, focus states
  const baseStyles = 'font-semibold rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-offset-2';
  
  // Variant-specific styles: colors, backgrounds, borders, hover states
  const variantStyles = {
    primary: 'bg-[#3B82F6] text-white hover:bg-blue-600 focus:ring-blue-500',
    secondary: 'bg-white text-gray-900 border border-gray-300 hover:bg-gray-50 focus:ring-gray-500'
  };
  
  // Size-specific styles: padding and font size
  // All sizes meet minimum 44x44px touch target requirement
  const sizeStyles = {
    small: 'px-4 py-2 text-sm min-h-[44px]',
    medium: 'px-6 py-3 text-base min-h-[44px]',
    large: 'px-8 py-4 text-lg min-h-[44px]'
  };
  
  return (
    <button
      onClick={onClick}
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
      aria-label={text}
      type="button"
    >
      {text}
    </button>
  );
}
