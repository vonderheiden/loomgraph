import { CONTENT } from '../../constants/landingContent';
import { TestimonialCard } from './TestimonialCard';

/**
 * SocialProofSection Component
 * 
 * Displays customer testimonials to build trust and credibility.
 * Features three testimonials from founders and professionals who use LoomGraph.
 * 
 * Layout:
 * - Desktop: 3-column grid
 * - Mobile: Single column stack
 * 
 * Each testimonial includes:
 * - 5-star rating
 * - Attention-grabbing headline
 * - Customer quote
 * - Name, title, and company
 * 
 * Requirements: 8.1, 8.2, 8.4, 8.6
 */
export function SocialProofSection() {
  return (
    <section id="testimonials" className="py-16 px-4 sm:px-6 lg:px-8 bg-white" aria-labelledby="testimonials-title">
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <div className="text-center mb-12">
          <h2 id="testimonials-title" className="text-3xl sm:text-4xl font-bold text-gray-900">
            {CONTENT.testimonials.title}
          </h2>
        </div>
        
        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CONTENT.testimonials.items.map((testimonial, index) => (
            <TestimonialCard
              key={index}
              name={testimonial.name}
              title={testimonial.title}
              company={testimonial.company}
              rating={testimonial.rating}
              headline={testimonial.headline}
              quote={testimonial.quote}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
