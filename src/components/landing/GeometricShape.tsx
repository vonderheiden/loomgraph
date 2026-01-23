/**
 * GeometricShape Component
 * 
 * CSS-only geometric shapes for visual elements throughout the landing page.
 * No images or illustrations - pure CSS divs with backgrounds, borders, and transforms.
 * 
 * Variants:
 * - logo: Gradient blue square for the LoomGraph logo icon
 * - hero-chaotic: Messy overlapping shapes representing Canva chaos (before state)
 * - hero-organized: Clean grid of shapes representing LoomGraph order (after state)
 * - transformation: Simple before/after visual with arrow showing transformation
 * 
 * These shapes provide visual interest while maintaining fast load times and
 * staying true to the minimalist Bento aesthetic.
 * 
 * @param variant - The type of geometric shape to render
 * @param className - Optional additional CSS classes for customization
 */

type ShapeVariant = 'logo' | 'hero-chaotic' | 'hero-organized' | 'transformation';

interface GeometricShapeProps {
  variant: ShapeVariant;
  className?: string;
}

export function GeometricShape({ variant, className = '' }: GeometricShapeProps) {
  const shapes = {
    // Logo: Simple gradient blue square for brand identity
    logo: (
      <div 
        className={`w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg ${className}`}
        role="img"
        aria-label="LoomGraph logo"
      />
    ),
    
    // Hero Chaotic: Messy overlapping shapes representing the chaos of Canva
    // Random rotations, overlapping positions, various colors - visual disorder
    'hero-chaotic': (
      <div 
        className={`relative w-full h-64 ${className}`}
        role="img"
        aria-label="Illustration of chaotic, disorganized design elements representing the complexity of traditional design tools"
      >
        <div className="absolute top-4 left-8 w-20 h-20 bg-red-400 rounded-lg rotate-12 opacity-70" aria-hidden="true" />
        <div className="absolute top-16 right-12 w-16 h-16 bg-yellow-400 rounded-full opacity-60" aria-hidden="true" />
        <div className="absolute bottom-8 left-16 w-24 h-24 bg-green-400 rotate-45 opacity-50" aria-hidden="true" />
        <div className="absolute top-32 left-32 w-12 h-12 bg-purple-400 rounded-lg -rotate-6 opacity-80" aria-hidden="true" />
        <div className="absolute bottom-16 right-16 w-14 h-14 bg-pink-400 rounded-full rotate-[25deg] opacity-65" aria-hidden="true" />
      </div>
    ),
    
    // Hero Organized: Clean grid of shapes representing LoomGraph's organized output
    // Consistent spacing, aligned elements, cohesive color palette - visual order
    'hero-organized': (
      <div 
        className={`relative w-full h-64 ${className}`}
        role="img"
        aria-label="Illustration of organized, structured design elements representing LoomGraph's automated output"
      >
        <div className="grid grid-cols-3 gap-4 p-8 h-full" aria-hidden="true">
          <div className="bg-blue-100 rounded-lg" />
          <div className="bg-blue-200 rounded-lg" />
          <div className="bg-blue-100 rounded-lg" />
          <div className="bg-blue-200 rounded-lg" />
          <div className="bg-blue-300 rounded-lg" />
          <div className="bg-blue-200 rounded-lg" />
        </div>
      </div>
    ),
    
    // Transformation: Simple before/after visual with arrow
    // Shows the transformation from generic to polished
    'transformation': (
      <div 
        className={`flex items-center justify-center gap-4 py-8 ${className}`}
        role="img"
        aria-label="Illustration showing transformation from generic gray design to polished blue design"
      >
        <div className="w-16 h-16 bg-gray-300 rounded-lg" aria-hidden="true" />
        <div className="text-2xl text-gray-400" aria-hidden="true">→</div>
        <div className="w-16 h-16 bg-blue-500 rounded-lg shadow-lg" aria-hidden="true" />
      </div>
    )
  };
  
  return shapes[variant];
}
