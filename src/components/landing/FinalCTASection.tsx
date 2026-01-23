import { CONTENT } from '../../constants/landingContent';
import { CTAButton } from './CTAButton';
import { NavigationProps } from '../../types/landing.types';

/**
 * FinalCTASection Component
 * 
 * The final call-to-action section at the bottom of the landing page.
 * Provides one last opportunity for visitors to start using the tool
 * after reading through all the benefits and social proof.
 * 
 * Features:
 * - Compelling headline focused on time savings
 * - Social proof subtext (number of users)
 * - Large, prominent CTA button
 * - High-contrast styling to draw attention
 * 
 * Layout:
 * - Centered content with generous padding
 * - Dark background for contrast (can be customized)
 * 
 * @param onNavigate - Callback function to navigate to the generator view
 * 
 * Requirements: 10.1, 10.2, 10.3, 10.5
 */
export function FinalCTASection({ onNavigate }: NavigationProps) {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-600 to-blue-700" aria-labelledby="final-cta-title">
      <div className="max-w-4xl mx-auto text-center">
        {/* Headline */}
        <h2 id="final-cta-title" className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
          {CONTENT.finalCTA.headline}
        </h2>
        
        {/* Subtext */}
        <p className="text-xl text-blue-100 mb-8 leading-relaxed">
          {CONTENT.finalCTA.subtext}
        </p>
        
        {/* CTA Button */}
        <CTAButton
          text={CONTENT.finalCTA.ctaText}
          onClick={onNavigate}
          variant="secondary"
          size="large"
          className="shadow-xl hover:shadow-2xl"
        />
      </div>
    </section>
  );
}
