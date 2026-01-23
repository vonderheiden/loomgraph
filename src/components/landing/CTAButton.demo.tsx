import { CTAButton } from './CTAButton';

/**
 * CTAButton Demo Component
 * 
 * Visual demonstration of all CTAButton variants and sizes.
 * Used for manual testing and visual verification.
 */
export function CTAButtonDemo() {
  const handleClick = () => {
    console.log('CTA Button clicked!');
  };

  return (
    <div className="p-8 bg-[#F9FAFB] min-h-screen">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">CTAButton Component Demo</h1>
      
      {/* Primary Variant - All Sizes */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Primary Variant</h2>
        <div className="flex flex-wrap gap-4 items-center">
          <CTAButton 
            text="Small Primary" 
            onClick={handleClick}
            variant="primary"
            size="small"
          />
          <CTAButton 
            text="Medium Primary" 
            onClick={handleClick}
            variant="primary"
            size="medium"
          />
          <CTAButton 
            text="Large Primary" 
            onClick={handleClick}
            variant="primary"
            size="large"
          />
        </div>
      </section>

      {/* Secondary Variant - All Sizes */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Secondary Variant</h2>
        <div className="flex flex-wrap gap-4 items-center">
          <CTAButton 
            text="Small Secondary" 
            onClick={handleClick}
            variant="secondary"
            size="small"
          />
          <CTAButton 
            text="Medium Secondary" 
            onClick={handleClick}
            variant="secondary"
            size="medium"
          />
          <CTAButton 
            text="Large Secondary" 
            onClick={handleClick}
            variant="secondary"
            size="large"
          />
        </div>
      </section>

      {/* Real-world Examples */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Real-world Examples</h2>
        <div className="space-y-6">
          {/* Hero CTA */}
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <h3 className="text-xl font-semibold mb-2">Hero Section CTA</h3>
            <CTAButton 
              text="Create Your First Banner — It's Free" 
              onClick={handleClick}
              variant="primary"
              size="large"
            />
          </div>

          {/* Header CTA */}
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <h3 className="text-xl font-semibold mb-2">Header CTA</h3>
            <CTAButton 
              text="Launch Generator" 
              onClick={handleClick}
              variant="primary"
              size="medium"
            />
          </div>

          {/* Final CTA */}
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <h3 className="text-xl font-semibold mb-2">Final CTA Section</h3>
            <CTAButton 
              text="Start Generating Now" 
              onClick={handleClick}
              variant="primary"
              size="large"
            />
          </div>
        </div>
      </section>

      {/* Accessibility Test */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Accessibility Test</h2>
        <p className="text-gray-600 mb-4">
          Try navigating with keyboard (Tab to focus, Enter/Space to click). 
          Focus rings should be visible.
        </p>
        <div className="flex flex-wrap gap-4">
          <CTAButton 
            text="Tab to me" 
            onClick={handleClick}
            variant="primary"
          />
          <CTAButton 
            text="Then to me" 
            onClick={handleClick}
            variant="secondary"
          />
          <CTAButton 
            text="Finally to me" 
            onClick={handleClick}
            variant="primary"
            size="large"
          />
        </div>
      </section>

      {/* Custom Styling */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Custom Styling</h2>
        <p className="text-gray-600 mb-4">
          CTAButton accepts className prop for additional customization
        </p>
        <div className="flex flex-wrap gap-4">
          <CTAButton 
            text="Full Width on Mobile" 
            onClick={handleClick}
            variant="primary"
            className="w-full sm:w-auto"
          />
          <CTAButton 
            text="With Shadow" 
            onClick={handleClick}
            variant="secondary"
            className="shadow-lg"
          />
        </div>
      </section>
    </div>
  );
}
