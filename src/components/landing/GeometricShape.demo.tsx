/**
 * GeometricShape Demo
 * 
 * Visual demonstration of all GeometricShape variants.
 * This file is for development/testing purposes only.
 */

import { GeometricShape } from './GeometricShape';

export function GeometricShapeDemo() {
  return (
    <div className="min-h-screen bg-[#F9FAFB] p-8">
      <div className="max-w-6xl mx-auto space-y-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">GeometricShape Component Demo</h1>
        
        {/* Logo Variant */}
        <section className="bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Logo Variant</h2>
          <p className="text-gray-600 mb-4">Gradient blue square for the LoomGraph logo icon</p>
          <div className="flex items-center gap-4">
            <GeometricShape variant="logo" />
            <span className="text-xl font-bold text-gray-900">LoomGraph</span>
          </div>
        </section>
        
        {/* Hero Chaotic Variant */}
        <section className="bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Hero Chaotic Variant</h2>
          <p className="text-gray-600 mb-4">Messy overlapping shapes representing Canva chaos (before state)</p>
          <div className="bg-gray-50 rounded-lg p-4">
            <GeometricShape variant="hero-chaotic" />
          </div>
        </section>
        
        {/* Hero Organized Variant */}
        <section className="bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Hero Organized Variant</h2>
          <p className="text-gray-600 mb-4">Clean grid of shapes representing LoomGraph order (after state)</p>
          <div className="bg-gray-50 rounded-lg p-4">
            <GeometricShape variant="hero-organized" />
          </div>
        </section>
        
        {/* Transformation Variant */}
        <section className="bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Transformation Variant</h2>
          <p className="text-gray-600 mb-4">Simple before/after visual with arrow showing transformation</p>
          <div className="bg-gray-50 rounded-lg p-4">
            <GeometricShape variant="transformation" />
          </div>
        </section>
        
        {/* Side-by-Side Comparison */}
        <section className="bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Before/After Comparison</h2>
          <p className="text-gray-600 mb-4">How the shapes will appear in the hero section</p>
          <div className="grid grid-cols-2 gap-8">
            <div>
              <p className="text-sm text-gray-500 mb-2 text-center">Before (Canva)</p>
              <div className="bg-gray-50 rounded-lg p-4">
                <GeometricShape variant="hero-chaotic" />
              </div>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-2 text-center">After (LoomGraph)</p>
              <div className="bg-gray-50 rounded-lg p-4">
                <GeometricShape variant="hero-organized" />
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
