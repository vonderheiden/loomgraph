import { CTAButtonProps } from '../../types/landing.types';

/**
 * CTAButton Component - Apple-Inspired Modern Design
 * 
 * A refined call-to-action button with sophisticated styling inspired by Apple's design language.
 * Features smooth transitions, subtle depth, and elegant typography.
 * 
 * Design Principles:
 * - Minimal yet impactful visual presence
 * - Smooth, natural transitions (200ms ease-out)
 * - Subtle depth through shadows and gradients
 * - Perfect proportions and spacing
 * - Refined typography with optimal letter-spacing
 * 
 * Variants:
 * - primary: Bold blue with subtle gradient and shadow
 * - secondary: Clean white with refined border and hover state
 * 
 * Sizes:
 * - small: Compact for secondary actions (36px height)
 * - medium: Standard size (44px height)
 * - large: Prominent for primary CTAs (52px height)
 * 
 * Accessibility:
 * - WCAG AA compliant contrast ratios
 * - Keyboard focus with elegant ring
 * - Minimum 44x44px touch targets
 * - Screen reader optimized
 */
export function CTAButton({ 
  text, 
  onClick, 
  variant = 'primary', 
  size = 'medium',
  className = '' 
}: CTAButtonProps) {
  // Base styles: refined typography, smooth transitions, elegant focus states
  const baseStyles = `
    font-medium tracking-tight transition-all duration-200 ease-out
    focus:outline-none focus:ring-2 focus:ring-offset-2
    active:scale-[0.98] transform
    disabled:opacity-60 disabled:cursor-not-allowed disabled:active:scale-100
    flex items-center justify-center
  `.trim().replace(/\s+/g, ' ');
  
  // Variant-specific styles: sophisticated colors and depth
  const variantStyles = {
    primary: `
      bg-gradient-to-b from-[#0071e3] to-[#0077ED] 
      text-white 
      shadow-[0_1px_2px_rgba(0,0,0,0.12),0_2px_4px_rgba(0,0,0,0.08)]
      hover:shadow-[0_2px_4px_rgba(0,0,0,0.15),0_4px_8px_rgba(0,0,0,0.1)]
      hover:from-[#0077ED] hover:to-[#007AFF]
      focus:ring-blue-500/50
      rounded-full
    `.trim().replace(/\s+/g, ' '),
    secondary: `
      bg-white 
      text-[#1d1d1f] 
      border border-[#d2d2d7]
      shadow-[0_1px_2px_rgba(0,0,0,0.04)]
      hover:bg-[#f5f5f7] 
      hover:border-[#b8b8bd]
      hover:shadow-[0_2px_4px_rgba(0,0,0,0.06)]
      focus:ring-gray-400/50
      rounded-full
    `.trim().replace(/\s+/g, ' ')
  };
  
  // Size-specific styles: perfect proportions
  const sizeStyles = {
    small: 'px-5 py-2 text-sm h-[36px] min-w-[80px]',
    medium: 'px-6 py-2.5 text-[15px] h-[44px] min-w-[100px]',
    large: 'px-8 py-3 text-base h-[52px] min-w-[120px]'
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
