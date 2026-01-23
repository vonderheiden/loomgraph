import { CONTENT } from '../../constants/landingContent';

/**
 * HowItWorksSection Component
 * 
 * Explains the three-step process for creating a banner with LoomGraph:
 * 1. Input Data - Fill out a simple 4-field form
 * 2. Brand & Style - Select your brand color and speaker layout
 * 3. Instant Export - Download your high-res, LinkedIn-ready asset
 * 
 * Layout:
 * - Desktop: 3-column grid with numbered step cards
 * - Mobile: Single column stack with vertical progression
 * 
 * Each step card features:
 * - Large prominent number
 * - Bold step title
 * - Descriptive text
 * 
 * Requirements: 7.1, 7.2, 7.3, 7.4, 7.5, 7.6
 */
export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="py-16 px-4 sm:px-6 lg:px-8 bg-[#F9FAFB]" aria-labelledby="how-it-works-title">
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <div className="text-center mb-12">
          <h2 id="how-it-works-title" className="text-3xl sm:text-4xl font-bold text-gray-900">
            {CONTENT.howItWorks.title}
          </h2>
        </div>
        
        {/* Steps Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {CONTENT.howItWorks.steps.map((step, index) => {
            // Map step numbers to actual filenames
            const imageFiles = [
              '1-Input data.png',
              '2-Brand Style.png',
              '3-Instant Export.png'
            ];
            
            return (
              <article 
                key={index}
                className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden hover:shadow-md transition-shadow"
                aria-labelledby={`step-${step.number}-title`}
              >
                {/* Step Image */}
                <div className="w-full h-64 bg-gray-50 overflow-hidden flex items-center justify-center p-4">
                  <img 
                    src={`/backgrounds/${imageFiles[index]}`}
                    alt={`${step.title} - ${step.description}`}
                    className="w-full h-full object-contain"
                  />
                </div>
                
                {/* Step Content */}
                <div className="p-8 text-center">
                  {/* Large Number */}
                  <div 
                    className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 text-blue-600 text-2xl font-bold mb-4"
                    aria-label={`Step ${step.number}`}
                  >
                    {step.number}
                  </div>
                  
                  {/* Step Title */}
                  <h3 id={`step-${step.number}-title`} className="text-xl font-semibold text-gray-900 mb-3">
                    {step.title}
                  </h3>
                  
                  {/* Step Description */}
                  <p className="text-gray-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
