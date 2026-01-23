/**
 * BentoCard Demo
 * 
 * This file demonstrates the BentoCard component with various configurations.
 * It can be temporarily imported into App.tsx for visual verification.
 * 
 * Usage:
 * import { BentoCardDemo } from './components/landing/BentoCard.demo';
 * Then render <BentoCardDemo /> in App.tsx
 */

import { BentoCard } from './BentoCard';
import { Image, Clock, Linkedin } from 'lucide-react';

export function BentoCardDemo() {
  return (
    <div className="min-h-screen bg-[#F9FAFB] p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">BentoCard Component Demo</h1>
        
        {/* Basic card without icon */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Basic Card (No Icon)</h2>
          <div className="max-w-md">
            <BentoCard
              title="The Canva Rabbit Hole"
              description="Spending 15 minutes just picking a font"
            />
          </div>
        </div>

        {/* Card with icon */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Card with Icon</h2>
          <div className="max-w-md">
            <BentoCard
              title="Auto-Beautify Headshots"
              description="Upload any photo; we handle the crop and background removal"
              icon={<Image size={32} />}
            />
          </div>
        </div>

        {/* Grid of cards */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Grid Layout (3 columns)</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <BentoCard
              title="Auto-Beautify Headshots"
              description="Upload any photo; we handle the crop and background removal"
              icon={<Image size={32} />}
            />
            <BentoCard
              title="Timezone Intelligent"
              description="Enter your time once; we format it for a global audience automatically"
              icon={<Clock size={32} />}
            />
            <BentoCard
              title="LinkedIn Optimized"
              description="Safe zones guaranteed. No more text being cut off by the 'See More' button"
              icon={<Linkedin size={32} />}
            />
          </div>
        </div>

        {/* Card with custom className */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Card with Custom Styling</h2>
          <div className="max-w-md">
            <BentoCard
              title="Custom Styled Card"
              description="This card has additional custom classes applied for demonstration"
              className="border-blue-300 bg-blue-50"
            />
          </div>
        </div>

        {/* Hover effect demonstration */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Hover Effect (Try hovering)</h2>
          <div className="max-w-md">
            <BentoCard
              title="Hover Over Me"
              description="Notice how the shadow becomes more prominent when you hover over this card. This provides subtle visual feedback."
            />
          </div>
        </div>
      </div>
    </div>
  );
}
