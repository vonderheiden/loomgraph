// Type definitions for landing page components

/**
 * View type for application state management
 * Determines whether to show landing page or generator view
 */
export type ViewType = 'landing' | 'generator';

/**
 * Props for components that need navigation callback
 * Used by Header, HeroSection, and FinalCTASection
 */
export interface NavigationProps {
  onNavigate: () => void;
}

/**
 * Props for BentoCard component
 * Reusable card component following Bento design aesthetic
 */
export interface BentoCardProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
  className?: string;
}

/**
 * Props for CTAButton component
 * Reusable call-to-action button with variants and sizes
 */
export interface CTAButtonProps {
  text: string;
  onClick: () => void;
  variant?: 'primary' | 'secondary';
  size?: 'small' | 'medium' | 'large';
  className?: string;
}

/**
 * Data structure for testimonial content
 * Used in Social Proof section
 */
export interface TestimonialData {
  name: string;
  title: string;
  company: string;
  rating: number;
  headline: string;
  quote: string;
}

/**
 * Data structure for FAQ items
 * Used in FAQ section
 */
export interface FAQItem {
  question: string;
  answer: string;
}

/**
 * Data structure for "How It Works" steps
 * Used in How It Works section
 */
export interface StepData {
  number: number;
  title: string;
  description: string;
}

/**
 * Data structure for pain point cards
 * Used in Problem section
 */
export interface PainPointData {
  title: string;
  description: string;
  icon?: string;
}

/**
 * Data structure for benefit cards
 * Used in Benefits section
 */
export interface BenefitData {
  title: string;
  description: string;
  icon?: string;
}
