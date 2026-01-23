# HeroSection Component

## Overview

The HeroSection is the primary above-the-fold section of the LoomGraph landing page. It's the first thing visitors see and is critical for conversion. The component immediately communicates the product's value proposition through a compelling headline, supporting text, and a visual before/after comparison.

## Purpose

- **Grab Attention**: Bold headline that addresses the user's pain point
- **Communicate Value**: Clear subtext explaining the unique value proposition
- **Drive Action**: Prominent CTA button to navigate to the generator
- **Build Credibility**: Stats row showing social proof (banners generated, ratings, time saved)
- **Show Transformation**: Visual comparison of chaotic Canva workflow vs. organized LoomGraph output

## Props

```typescript
interface NavigationProps {
  onNavigate: () => void;
}
```

- `onNavigate`: Callback function that navigates to the generator view when the CTA button is clicked

## Layout

### Desktop (lg: breakpoint and above)
- Two-column grid layout
- Left column: Content (headline, subtext, CTA, stats)
- Right column: Visual comparison (before/after geometric shapes)

### Mobile (below lg: breakpoint)
- Stacked vertically
- Content appears first, then visual comparison
- Maintains readability and touch target sizes

## Content Source

All content is pulled from `CONTENT.hero` in `src/constants/landingContent.ts`:
- `headline`: Main attention-grabbing headline
- `subtext`: Supporting description
- `ctaText`: Call-to-action button text
- `stats`: Array of three metrics (value + label)

## Visual Elements

The component uses `GeometricShape` components to create a before/after comparison:
- **Before (Canva)**: `hero-chaotic` variant - messy, overlapping shapes representing design chaos
- **After (LoomGraph)**: `hero-organized` variant - clean grid of shapes representing organized output

## Accessibility

- Semantic HTML with `<section>` element
- Proper heading hierarchy (`<h1>` for main headline)
- Descriptive text for visual comparison labels
- CTA button includes ARIA labels and focus states

## Requirements Validated

- **3.1**: Displays headline from CONTENT.hero
- **3.2**: Displays subtext from CONTENT.hero
- **3.3**: Includes primary CTA button
- **3.5**: Visual comparison using geometric shapes
- **3.6**: Stats row with three metrics
- **3.7**: Responsive layout (stacks on mobile)

## Usage Example

```tsx
import { HeroSection } from './components/landing/HeroSection';

function LandingPage() {
  const navigateToGenerator = () => {
    setCurrentView('generator');
  };

  return (
    <div className="min-h-screen bg-[#F9FAFB]">
      <HeroSection onNavigate={navigateToGenerator} />
    </div>
  );
}
```

## Styling

- Background: Inherits from parent (typically #F9FAFB)
- Padding: Responsive padding (pt-24 for header clearance)
- Max width: 7xl container for content
- Typography: Large, bold headline with responsive sizing (4xl → 5xl → 6xl)
- Colors: Gray-900 for headlines, Gray-600 for body text

## Related Components

- `CTAButton`: Primary call-to-action button
- `GeometricShape`: CSS-based visual elements for before/after comparison
- `Header`: Fixed header that sits above this section

## Testing

Unit tests should verify:
- All content renders from CONTENT.hero configuration
- Stats row displays three metrics correctly
- CTA button calls onNavigate when clicked
- Responsive layout behavior at different breakpoints
- Visual comparison elements are present

## Future Enhancements

- Add animation on scroll (fade in, slide up)
- A/B test different headlines
- Add video demo option instead of geometric shapes
- Track CTA click-through rate
