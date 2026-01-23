# ProblemSection Component

## Overview

The `ProblemSection` component displays the "20-Minute Banner Struggle" section that identifies common pain points users face when creating webinar banners manually. This section helps visitors relate to the problem before presenting the solution.

## Features

- **Title and Subtitle**: Introduces the problem with engaging copy
- **Four Pain Point Cards**: Uses `BentoCard` components to display common frustrations
- **Responsive Grid Layout**: 
  - Mobile (< 640px): 1 column
  - Tablet (640px - 1024px): 2 columns
  - Desktop (> 1024px): 4 columns
- **Section ID**: `"problem"` for anchor linking from header navigation
- **Centralized Content**: All copy comes from `CONTENT.problem` in `landingContent.ts`

## Usage

```tsx
import { ProblemSection } from './components/landing/ProblemSection';

function LandingPage() {
  return (
    <main>
      <ProblemSection />
    </main>
  );
}
```

## Content Structure

The component pulls content from `src/constants/landingContent.ts`:

```typescript
problem: {
  title: "The 20-Minute Banner Struggle",
  subtitle: "Does this sound familiar?",
  painPoints: [
    {
      title: "The Canva Rabbit Hole",
      description: "Spending 15 minutes just picking a font"
    },
    // ... 3 more pain points
  ]
}
```

## Styling

- **Background**: White (`bg-white`) to contrast with the gray landing page background
- **Padding**: Responsive vertical padding (`py-16`) and horizontal padding (`px-4 sm:px-6 lg:px-8`)
- **Max Width**: Constrained to `max-w-7xl` for optimal readability
- **Typography**: 
  - Title: `text-3xl sm:text-4xl font-bold text-gray-900`
  - Subtitle: `text-xl text-gray-600`
- **Grid Gap**: `gap-6` between cards for breathing room

## Accessibility

- Semantic HTML: Uses `<section>` element with `id="problem"`
- Heading hierarchy: `<h2>` for section title
- Content structure: Clear visual hierarchy with title → subtitle → cards
- Keyboard navigation: All cards are accessible via tab navigation (inherited from `BentoCard`)

## Requirements Satisfied

- **4.1**: Displays title "The 20-Minute Banner Struggle"
- **4.2**: Displays subtitle "Does this sound familiar?"
- **4.3**: Displays four Bento_Card components with pain points
- **4.4**: First pain point card contains "The Canva Rabbit Hole" title and description
- **4.5**: Second pain point card contains "Headshot Headaches" title and description
- **4.6**: Third pain point card contains "The Timezone Trap" title and description
- **4.7**: Fourth pain point card contains "Off-Brand Results" title and description
- **4.8**: Pain point cards stack vertically on mobile viewports

## Related Components

- **BentoCard**: Used to display each pain point with consistent styling
- **HeroSection**: Previous section in the landing page flow
- **SolutionSection**: Next section that presents the solution to these problems

## Testing

To test this component in isolation, use the demo file:

```tsx
import { ProblemSectionDemo } from './components/landing/ProblemSection.demo';

// Temporarily render in App.tsx to view
```

## Future Enhancements

- Add icons to pain point cards for visual interest
- Add subtle animations on scroll (fade-in, slide-up)
- Consider adding a "Sound familiar?" interactive element (e.g., poll or reaction buttons)
