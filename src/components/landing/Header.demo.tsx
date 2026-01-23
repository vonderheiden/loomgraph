import { Header } from './Header';

/**
 * Header Component Demo
 * 
 * This demo page allows manual testing of the Header component.
 * It includes placeholder sections to test the smooth scroll functionality.
 * 
 * To test:
 * 1. Run `npm run dev`
 * 2. Import this component in App.tsx temporarily
 * 3. Click navigation links to test smooth scrolling
 * 4. Click "Launch Generator" to test navigation callback
 * 5. Resize browser to test mobile responsiveness
 */
export function HeaderDemo() {
  const handleNavigate = () => {
    console.log('Navigate to generator clicked!');
    alert('Navigation callback triggered! In production, this would switch to the generator view.');
  };

  return (
    <div className="min-h-screen bg-[#F9FAFB]">
      {/* Header Component */}
      <Header onNavigate={handleNavigate} />
      
      {/* Spacer for fixed header */}
      <div className="h-16" />
      
      {/* Demo Content Sections */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-32">
        
        {/* Hero Section Placeholder */}
        <section className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Hero Section
            </h1>
            <p className="text-lg text-gray-600">
              Scroll down to test navigation links
            </p>
          </div>
        </section>
        
        {/* How It Works Section */}
        <section id="how-it-works" className="min-h-screen flex items-center justify-center bg-white rounded-lg p-12">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-lg text-gray-600">
              This section should be visible after clicking "How it Works" in the header
            </p>
            <p className="text-sm text-gray-500 mt-4">
              Notice how the content is not hidden behind the fixed header
            </p>
          </div>
        </section>
        
        {/* Templates Section */}
        <section id="templates" className="min-h-screen flex items-center justify-center bg-white rounded-lg p-12">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Templates
            </h2>
            <p className="text-lg text-gray-600">
              This section should be visible after clicking "Templates" in the header
            </p>
            <p className="text-sm text-gray-500 mt-4">
              The scroll should be smooth and account for header offset
            </p>
          </div>
        </section>
        
        {/* Pricing Section */}
        <section id="pricing" className="min-h-screen flex items-center justify-center bg-white rounded-lg p-12">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Pricing
            </h2>
            <p className="text-lg text-gray-600">
              This section should be visible after clicking "Pricing" in the header
            </p>
            <p className="text-sm text-gray-500 mt-4">
              Test complete! All navigation links working correctly.
            </p>
          </div>
        </section>
        
      </div>
      
      {/* Testing Instructions */}
      <div className="fixed bottom-4 right-4 bg-white border border-gray-200 rounded-lg p-4 shadow-lg max-w-sm">
        <h3 className="font-semibold text-gray-900 mb-2">Testing Checklist</h3>
        <ul className="text-sm text-gray-600 space-y-1">
          <li>✓ Header is fixed at top</li>
          <li>✓ Logo and text visible</li>
          <li>✓ Navigation links visible on desktop</li>
          <li>✓ Navigation links hidden on mobile</li>
          <li>✓ CTA button always visible</li>
          <li>✓ Smooth scroll to sections</li>
          <li>✓ Header offset calculation works</li>
          <li>✓ Backdrop blur effect applied</li>
        </ul>
      </div>
    </div>
  );
}
