import { CONTENT } from '../../constants/landingContent';
import { BentoCard } from './BentoCard';
import { Image, Clock, Linkedin } from 'lucide-react';

/**
 * BenefitsSection Component
 * 
 * Displays the three key benefits of using LoomGraph:
 * 1. Auto-Beautify Headshots - Automatic cropping and background removal
 * 2. Timezone Intelligent - Automatic global time formatting
 * 3. LinkedIn Optimized - Safe zones to prevent text cutoff
 * 
 * Layout:
 * - Desktop/Tablet: 3-column grid
 * - Mobile: Single column stack
 * 
 * Uses BentoCard components with Lucide React icons for visual interest.
 * 
 * Requirements: 6.1, 6.2, 6.3, 6.4, 6.5, 6.6
 */
export function BenefitsSection() {
  // Map icon names from content to actual Lucide React icon components
  const iconMap = {
    image: <Image size={32} />,
    clock: <Clock size={32} />,
    linkedin: <Linkedin size={32} />
  };

  return (
    <section id="benefits" className="py-16 px-4 sm:px-6 lg:px-8 bg-white" aria-labelledby="benefits-title">
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <div className="text-center mb-12">
          <h2 id="benefits-title" className="text-3xl sm:text-4xl font-bold text-gray-900">
            {CONTENT.benefits.title}
          </h2>
        </div>
        
        {/* Benefits Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {CONTENT.benefits.items.map((benefit, index) => (
            <BentoCard
              key={index}
              title={benefit.title}
              description={benefit.description}
              icon={iconMap[benefit.icon as keyof typeof iconMap]}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
