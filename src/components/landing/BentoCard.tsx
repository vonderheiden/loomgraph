import { BentoCardProps } from '../../types/landing.types';

/**
 * BentoCard Component
 * 
 * A reusable card component following the Bento design aesthetic.
 * Features white background, rounded corners, 1px border, subtle shadow,
 * and smooth hover effect.
 * 
 * Used throughout the landing page for pain points, benefits, testimonials, etc.
 * 
 * Accessibility:
 * - Uses semantic article element for content grouping
 * - Heading hierarchy with h3 for card titles
 * - Decorative icons marked with aria-hidden
 * 
 * @param title - Card heading text
 * @param description - Card body text
 * @param icon - Optional icon element to display above title
 * @param className - Optional additional CSS classes for customization
 */
export function BentoCard({ title, description, icon, className = '' }: BentoCardProps) {
  return (
    <article 
      className={`bg-white rounded-lg border border-gray-200 shadow-sm p-6 hover:shadow-md transition-shadow ${className}`}
    >
      {icon && (
        <div className="mb-4 text-blue-500" aria-hidden="true">
          {icon}
        </div>
      )}
      <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
    </article>
  );
}
