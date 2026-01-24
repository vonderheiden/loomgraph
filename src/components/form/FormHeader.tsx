import React from 'react';

/**
 * FormHeader Component
 * 
 * A sticky header for the form panel that displays the title and subtitle.
 * Remains visible at the top while the form content scrolls.
 * 
 * Features:
 * - Sticky positioning (stays at top during scroll)
 * - Bento design styling (12px border-radius, #E5E7EB borders)
 * - Consistent padding and spacing
 * - High z-index for proper layering
 */
const FormHeader: React.FC = () => {
  return (
    <div 
      className="sticky top-0 z-10 bg-white border-b border-bento-border px-6 py-4"
      data-testid="form-header"
    >
      <h1 className="text-2xl font-semibold text-gray-900">
        Create Your Banner
      </h1>
      <p className="text-sm text-gray-600 mt-2">
        Customize your webinar banner in real-time
      </p>
    </div>
  );
};

export default FormHeader;
