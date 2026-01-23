import { CONTENT } from '../../constants/landingContent';
import { BentoCard } from './BentoCard';

/**
 * ProblemSection Component
 * 
 * Displays the "20-Minute Banner Struggle" section that identifies
 * common pain points users face when creating webinar banners manually.
 * 
 * Features:
 * - Title and subtitle introducing the problem
 * - Four pain point cards using BentoCard components
 * - Responsive grid: 4 columns on desktop, 2 on tablet, 1 on mobile
 * - Section ID "problem" for anchor linking
 * 
 * Requirements: 4.1, 4.2, 4.3, 4.4, 4.5, 4.6, 4.7, 4.8
 */
export function ProblemSection() {
  return (
    <section id="problem" className="py-16 px-4 sm:px-6 lg:px-8 bg-white" aria-labelledby="problem-title">
      <div className="max-w-7xl mx-auto">
        {/* Title and Subtitle */}
        <div className="text-center mb-12">
          <h2 id="problem-title" className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            {CONTENT.problem.title}
          </h2>
          <p className="text-xl text-gray-600">
            {CONTENT.problem.subtitle}
          </p>
        </div>
        
        {/* Pain Point Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {CONTENT.problem.painPoints.map((point, index) => (
            <BentoCard
              key={index}
              title={point.title}
              description={point.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
