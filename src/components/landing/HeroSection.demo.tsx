import { HeroSection } from './HeroSection';

/**
 * Demo component for HeroSection
 * 
 * This demo shows the HeroSection component with a mock navigation handler.
 * In the actual application, the onNavigate callback will switch from the
 * landing page view to the generator view.
 */
export default function HeroSectionDemo() {
  const handleNavigate = () => {
    console.log('Navigate to generator clicked');
    alert('In the full app, this would navigate to the banner generator');
  };

  return (
    <div className="min-h-screen bg-[#F9FAFB]">
      <HeroSection onNavigate={handleNavigate} />
    </div>
  );
}
