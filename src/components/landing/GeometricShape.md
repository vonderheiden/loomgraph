# GeometricShape Component

## Overview

The `GeometricShape` component provides CSS-only geometric shapes for visual elements throughout the landing page. It uses pure CSS (divs with backgrounds, borders, and transforms) without any images or illustrations, maintaining fast load times and staying true to the minimalist Bento aesthetic.

## Implementation

**Location:** `src/components/landing/GeometricShape.tsx`

## Variants

### 1. Logo (`logo`)
- **Purpose:** Brand identity icon for the LoomGraph logo
- **Design:** Gradient blue square (8x8 pixels)
- **Colors:** Blue-500 to Blue-600 gradient
- **Usage:** Header component, branding elements

### 2. Hero Chaotic (`hero-chaotic`)
- **Purpose:** Represents the chaos of using Canva (before state)
- **Design:** Messy overlapping shapes with random rotations
- **Colors:** Red, yellow, green, purple, pink (various opacities)
- **Usage:** Hero section "Before" comparison

### 3. Hero Organized (`hero-organized`)
- **Purpose:** Represents LoomGraph's organized output (after state)
- **Design:** Clean 3-column grid with consistent spacing
- **Colors:** Blue shades (100, 200, 300) for cohesive palette
- **Usage:** Hero section "After" comparison

### 4. Transformation (`transformation`)
- **Purpose:** Simple before/after visual showing transformation
- **Design:** Gray square → Arrow → Blue square with shadow
- **Usage:** Solution section, transformation narratives

## Accessibility

All variants include:
- `role="img"` for semantic meaning
- `aria-label` describing the visual purpose
- Decorative elements marked with `aria-hidden="true"`

## Usage Example

```tsx
import { GeometricShape } from './components/landing';

// Logo in header
<div className="flex items-center gap-2">
  <GeometricShape variant="logo" />
  <span className="text-xl font-bold">LoomGraph</span>
</div>

// Before/After comparison in hero
<div className="grid grid-cols-2 gap-8">
  <div>
    <p className="text-sm text-gray-500 mb-2 text-center">Before (Canva)</p>
    <GeometricShape variant="hero-chaotic" />
  </div>
  <div>
    <p className="text-sm text-gray-500 mb-2 text-center">After (LoomGraph)</p>
    <GeometricShape variant="hero-organized" />
  </div>
</div>

// Transformation visual
<GeometricShape variant="transformation" />
```

## Custom Styling

The component accepts an optional `className` prop for additional customization:

```tsx
<GeometricShape variant="logo" className="w-12 h-12" />
```

## Demo

A visual demo is available at `src/components/landing/GeometricShape.demo.tsx` showing all variants with descriptions.

## Design Philosophy

The component follows the Bento design aesthetic:
- **Minimalist:** Pure CSS, no images
- **Fast:** Zero external assets to load
- **Cohesive:** Uses brand colors (blue shades)
- **Accessible:** Proper ARIA labels and semantic HTML

## Requirements Validated

**Requirement 12.7:** CSS geometric shapes for visual elements
- ✅ Logo: gradient blue square
- ✅ Hero-chaotic: messy overlapping shapes (Canva chaos)
- ✅ Hero-organized: clean grid of shapes (LoomGraph order)
- ✅ Transformation: simple before/after visual with arrow
