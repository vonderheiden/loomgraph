import { NavigationProps } from '../../types/landing.types';
import { CONTENT } from '../../constants/landingContent';
import { CTAButton } from './CTAButton';
import { GeometricShape } from './GeometricShape';

/**
 * HeroSection Component
 * 
 * The primary above-the-fold section that immediately communicates LoomGraph's
 * value proposition to visitors. This section is critical for conversion as it's
 * the first thing users see.
 * 
 * Layout:
 * - Desktop: Two-column layout with content on left, visual comparison on right
 * - Mobile: Stacked vertically for readability
 * 
 * Content:
 * - Headline: Bold, attention-grabbing statement of the core benefit
 * - Subtext: Supporting description that explains the unique value proposition
 * - Primary CTA: Large, high-contrast button to navigate to the generator
 * - Stats Row: Three key metrics that build credibility (social proof)
 * - Visual Comparison: Before/after representation using geometric shapes
 * 
 * The visual comparison uses CSS geometric shapes to show the contrast between
 * chaotic Canva workflows (before) and organized LoomGraph output (after).
 * 
 * Requirements: 3.1, 3.2, 3.3, 3.5, 3.6, 3.7
 * 
 * @param onNavigate - Callback function to navigate to the generator view
 */
export function HeroSection({ onNavigate }: NavigationProps) {
  return (
    <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8" aria-labelledby="hero-title">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column: Content */}
          <div>
            {/* Headline: Large, bold, attention-grabbing */}
            <h1 id="hero-title" className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
              {CONTENT.hero.headline}
            </h1>
            
            {/* Subtext: Supporting description */}
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              {CONTENT.hero.subtext}
            </p>
            
            {/* Primary CTA: Large, high-contrast button */}
            <CTAButton 
              text={CONTENT.hero.ctaText}
              onClick={onNavigate}
              variant="primary"
              size="large"
            />
            
            {/* Stats Row: Three key metrics for social proof */}
            <div className="mt-12 grid grid-cols-3 gap-4" role="region" aria-label="Key statistics">
              {CONTENT.hero.stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Right Column: Visual Comparison */}
          <div className="grid grid-cols-2 gap-8">
            {/* Before: Chaotic Canva workflow */}
            <div>
              <p className="text-sm text-gray-500 mb-2 text-center font-medium">
                Before (Canva)
              </p>
              <GeometricShape variant="hero-chaotic" />
            </div>
            
            {/* After: Organized LoomGraph output */}
            <div>
              <p className="text-sm text-gray-500 mb-2 text-center font-medium">
                After (LoomGraph)
              </p>
              <GeometricShape variant="hero-organized" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
