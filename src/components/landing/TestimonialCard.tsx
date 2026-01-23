import { Star } from 'lucide-react';
import { TestimonialData } from '../../types/landing.types';

/**
 * TestimonialCard Component
 * 
 * Displays a customer testimonial with:
 * - 5-star rating visualization (filled/empty stars)
 * - Testimonial headline (bold, attention-grabbing)
 * - Customer quote (main testimonial text)
 * - Customer name, title, and company
 * 
 * Uses BentoCard styling as base with additional testimonial-specific layout.
 * 
 * Accessibility:
 * - Uses semantic article element for content grouping
 * - Star rating has descriptive aria-label
 * - Quote is marked with proper semantic blockquote
 * 
 * @param name - Customer's full name
 * @param title - Customer's job title
 * @param company - Customer's company name
 * @param rating - Star rating (1-5)
 * @param headline - Short attention-grabbing headline
 * @param quote - Full testimonial quote
 * 
 * Requirements: 8.3
 */
export function TestimonialCard({ 
  name, 
  title, 
  company, 
  rating, 
  headline, 
  quote 
}: TestimonialData) {
  return (
    <article className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 hover:shadow-md transition-shadow">
      {/* Star Rating */}
      <div className="flex gap-1 mb-4" role="img" aria-label={`${rating} out of 5 stars`}>
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            size={20}
            className={star <= rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
            data-testid="star"
            aria-hidden="true"
          />
        ))}
      </div>
      
      {/* Headline */}
      <h3 className="text-lg font-bold text-gray-900 mb-3">
        {headline}
      </h3>
      
      {/* Quote */}
      <blockquote className="text-gray-600 leading-relaxed mb-4">
        "{quote}"
      </blockquote>
      
      {/* Customer Info */}
      <footer className="border-t border-gray-200 pt-4">
        <p className="font-semibold text-gray-900">{name}</p>
        <p className="text-sm text-gray-600">
          {title} @ {company}
        </p>
      </footer>
    </article>
  );
}
