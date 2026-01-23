import { CONTENT } from '../../constants/landingContent';
import { GeometricShape } from './GeometricShape';

/**
 * SolutionSection Component
 * 
 * Presents LoomGraph's unique value proposition: "Design as Infrastructure, Not a Chore."
 * Explains how LoomGraph differs from traditional design tools by being a generator
 * rather than a manual design tool.
 * 
 * Layout:
 * - Desktop: Two-column layout (text left, visual right)
 * - Mobile: Stacked vertically
 * 
 * Visual: Transformation geometric shape showing the shift from generic to polished
 * 
 * Requirements: 5.1, 5.2, 5.3, 5.4
 */
export function SolutionSection() {
  return (
    <section id="solution" className="py-16 px-4 sm:px-6 lg:px-8 bg-[#F9FAFB]" aria-labelledby="solution-title">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Text Content */}
          <div>
            <h2 id="solution-title" className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6 leading-tight">
              {CONTENT.solution.title}
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              {CONTENT.solution.description}
            </p>
          </div>
          
          {/* Right: Transformation Visual */}
          <div className="flex justify-center">
            <GeometricShape variant="transformation" />
          </div>
        </div>
      </div>
    </section>
  );
}
