# Design Document: LoomGraph Landing Page

## Overview

The LoomGraph landing page is a high-conversion marketing page that serves as the primary entry point for new visitors. It communicates the product's value proposition through a structured narrative flow: problem identification → solution presentation → benefits explanation → social proof → call-to-action.

The design follows a "Soft Depth" Bento aesthetic with neutral backgrounds, card-based sections, and subtle shadows. The page uses conditional rendering to switch between the landing view and the existing generator tool, avoiding the complexity of React Router while maintaining the flexibility to migrate to routing in the future.

### Key Design Principles

1. **Conversion-Focused**: Every section guides users toward trying the generator
2. **Mobile-First**: Responsive design starting from mobile viewports
3. **Performance-Optimized**: Lazy loading and minimal bundle size
4. **Accessible**: Semantic HTML, ARIA labels, keyboard navigation
5. **Maintainable**: Modular components with centralized content management

## Architecture

### High-Level Structure

```
App.tsx
├── LandingPage (conditional)
│   ├── Header
│   ├── HeroSection
│   ├── ProblemSection
│   ├── SolutionSection
│   ├── BenefitsSection
│   ├── HowItWorksSection
│   ├── SocialProofSection
│   ├── FAQSection
│   ├── FinalCTASection
│   └── Footer
└── GeneratorView (conditional)
    └── [Existing generator components]
```

### View Management Pattern

The application uses a simple state-based view management system:

```typescript
// In App.tsx
const [currentView, setCurrentView] = useState<'landing' | 'generator'>('landing');

const navigateToGenerator = () => {
  setCurrentView('generator');
};

return (
  <>
    {currentView === 'landing' && <LandingPage onNavigate={navigateToGenerator} />}
    {currentView === 'generator' && <GeneratorView />}
  </>
);
```

This pattern provides:
- Simple implementation without routing dependencies
- Easy migration path to React Router (replace state with route matching)
- Clear separation between landing and generator views
- Predictable state management

### Component Hierarchy

```
src/
├── components/
│   ├── landing/
│   │   ├── LandingPage.tsx          # Container component
│   │   ├── Header.tsx               # Navigation header
│   │   ├── HeroSection.tsx          # Above-the-fold content
│   │   ├── ProblemSection.tsx       # Pain points
│   │   ├── SolutionSection.tsx      # Value proposition
│   │   ├── BenefitsSection.tsx      # Feature benefits
│   │   ├── HowItWorksSection.tsx    # Process steps
│   │   ├── SocialProofSection.tsx   # Testimonials
│   │   ├── FAQSection.tsx           # Questions & answers
│   │   ├── FinalCTASection.tsx      # Bottom conversion
│   │   ├── Footer.tsx               # Footer content
│   │   ├── BentoCard.tsx            # Reusable card component
│   │   ├── CTAButton.tsx            # Reusable CTA button
│   │   └── GeometricShape.tsx       # CSS-based visual elements
│   └── [existing components...]
├── constants/
│   └── landingContent.ts            # Centralized content
└── App.tsx                          # View management
```

## Components and Interfaces

### Core Types

```typescript
// src/types/landing.types.ts

export type ViewType = 'landing' | 'generator';

export interface NavigationProps {
  onNavigate: () => void;
}

export interface BentoCardProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
  className?: string;
}

export interface CTAButtonProps {
  text: string;
  onClick: () => void;
  variant?: 'primary' | 'secondary';
  size?: 'small' | 'medium' | 'large';
  className?: string;
}

export interface TestimonialData {
  name: string;
  title: string;
  company: string;
  rating: number;
  headline: string;
  quote: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface StepData {
  number: number;
  title: string;
  description: string;
}

export interface PainPointData {
  title: string;
  description: string;
  icon?: string;
}

export interface BenefitData {
  title: string;
  description: string;
  icon?: string;
}
```

### LandingPage Container

The main container component that composes all sections:

```typescript
interface LandingPageProps {
  onNavigate: () => void;
}

export function LandingPage({ onNavigate }: LandingPageProps) {
  return (
    <div className="min-h-screen bg-[#F9FAFB]">
      <Header onNavigate={onNavigate} />
      <main>
        <HeroSection onNavigate={onNavigate} />
        <ProblemSection />
        <SolutionSection />
        <BenefitsSection />
        <HowItWorksSection />
        <SocialProofSection />
        <FAQSection />
        <FinalCTASection onNavigate={onNavigate} />
      </main>
      <Footer />
    </div>
  );
}
```

### Header Component

Fixed header with logo, navigation links, and CTA:

```typescript
export function Header({ onNavigate }: NavigationProps) {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const headerOffset = 80; // Fixed header height
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-b border-gray-200 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <GeometricShape variant="logo" />
            <span className="text-xl font-bold text-gray-900">LoomGraph</span>
          </div>
          
          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <button onClick={() => scrollToSection('how-it-works')} className="text-gray-600 hover:text-gray-900">
              How it Works
            </button>
            <button onClick={() => scrollToSection('templates')} className="text-gray-600 hover:text-gray-900">
              Templates
            </button>
            <button onClick={() => scrollToSection('pricing')} className="text-gray-600 hover:text-gray-900">
              Pricing
            </button>
          </nav>
          
          {/* CTA */}
          <CTAButton 
            text="Launch Generator" 
            onClick={onNavigate}
            variant="primary"
          />
        </div>
      </div>
    </header>
  );
}
```

### BentoCard Component

Reusable card component following Bento aesthetic:

```typescript
export function BentoCard({ title, description, icon, className = '' }: BentoCardProps) {
  return (
    <div className={`bg-white rounded-lg border border-gray-200 shadow-sm p-6 hover:shadow-md transition-shadow ${className}`}>
      {icon && (
        <div className="mb-4 text-blue-500">
          {icon}
        </div>
      )}
      <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
    </div>
  );
}
```

### CTAButton Component

Reusable call-to-action button with variants:

```typescript
export function CTAButton({ 
  text, 
  onClick, 
  variant = 'primary', 
  size = 'medium',
  className = '' 
}: CTAButtonProps) {
  const baseStyles = 'font-semibold rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-offset-2';
  
  const variantStyles = {
    primary: 'bg-[#3B82F6] text-white hover:bg-blue-600 focus:ring-blue-500',
    secondary: 'bg-white text-gray-900 border border-gray-300 hover:bg-gray-50 focus:ring-gray-500'
  };
  
  const sizeStyles = {
    small: 'px-4 py-2 text-sm',
    medium: 'px-6 py-3 text-base',
    large: 'px-8 py-4 text-lg'
  };
  
  return (
    <button
      onClick={onClick}
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
      aria-label={text}
    >
      {text}
    </button>
  );
}
```

### GeometricShape Component

CSS-based geometric shapes for visual elements:

```typescript
type ShapeVariant = 'logo' | 'hero-chaotic' | 'hero-organized' | 'transformation';

interface GeometricShapeProps {
  variant: ShapeVariant;
  className?: string;
}

export function GeometricShape({ variant, className = '' }: GeometricShapeProps) {
  const shapes = {
    logo: (
      <div className={`w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg ${className}`} />
    ),
    'hero-chaotic': (
      <div className={`relative w-full h-64 ${className}`}>
        <div className="absolute top-4 left-8 w-20 h-20 bg-red-400 rounded-lg rotate-12 opacity-70" />
        <div className="absolute top-16 right-12 w-16 h-16 bg-yellow-400 rounded-full opacity-60" />
        <div className="absolute bottom-8 left-16 w-24 h-24 bg-green-400 rotate-45 opacity-50" />
        <div className="absolute top-32 left-32 w-12 h-12 bg-purple-400 rounded-lg -rotate-6 opacity-80" />
      </div>
    ),
    'hero-organized': (
      <div className={`relative w-full h-64 ${className}`}>
        <div className="grid grid-cols-3 gap-4 p-8">
          <div className="bg-blue-100 rounded-lg h-16" />
          <div className="bg-blue-200 rounded-lg h-16" />
          <div className="bg-blue-100 rounded-lg h-16" />
          <div className="bg-blue-200 rounded-lg h-16" />
          <div className="bg-blue-300 rounded-lg h-16" />
          <div className="bg-blue-200 rounded-lg h-16" />
        </div>
      </div>
    ),
    'transformation': (
      <div className={`flex items-center justify-center gap-4 ${className}`}>
        <div className="w-16 h-16 bg-gray-300 rounded-lg" />
        <div className="text-2xl text-gray-400">→</div>
        <div className="w-16 h-16 bg-blue-500 rounded-lg" />
      </div>
    )
  };
  
  return shapes[variant];
}
```

### Section Components

Each section follows a consistent pattern:

```typescript
// HeroSection.tsx
export function HeroSection({ onNavigate }: NavigationProps) {
  return (
    <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Content */}
          <div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
              {CONTENT.hero.headline}
            </h1>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              {CONTENT.hero.subtext}
            </p>
            <CTAButton 
              text={CONTENT.hero.ctaText}
              onClick={onNavigate}
              variant="primary"
              size="large"
            />
            
            {/* Stats Row */}
            <div className="mt-12 grid grid-cols-3 gap-4">
              {CONTENT.hero.stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Right: Visual */}
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
        </div>
      </div>
    </section>
  );
}

// ProblemSection.tsx
export function ProblemSection() {
  return (
    <section id="problem" className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            {CONTENT.problem.title}
          </h2>
          <p className="text-xl text-gray-600">
            {CONTENT.problem.subtitle}
          </p>
        </div>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {CONTENT.problem.painPoints.map((point, index) => (
            <BentoCard
              key={index}
              title={point.title}
              description={point.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

// Similar patterns for other sections...
```

## Data Models

### Content Configuration

All landing page content is centralized in a configuration file for easy maintenance:

```typescript
// src/constants/landingContent.ts

export const CONTENT = {
  hero: {
    headline: "Stop Fiddling with Canva. Generate Your Webinar Banners in 60 Seconds.",
    subtext: "The first-ever automated banner generator built for busy founders. High-converting LinkedIn layouts. Zero design skills required.",
    ctaText: "Create Your First Banner — It's Free",
    stats: [
      { value: "10,000+", label: "Banners Generated" },
      { value: "4.9/5", label: "User Rating" },
      { value: "95%", label: "Time Saved" }
    ]
  },
  
  problem: {
    title: "The 20-Minute Banner Struggle",
    subtitle: "Does this sound familiar?",
    painPoints: [
      {
        title: "The Canva Rabbit Hole",
        description: "Spending 15 minutes just picking a font"
      },
      {
        title: "Headshot Headaches",
        description: "Manually cropping circles and removing backgrounds"
      },
      {
        title: "The Timezone Trap",
        description: "Triple-checking PT vs. ET vs. GMT formatting"
      },
      {
        title: "Off-Brand Results",
        description: "Banners that look like 2010 corporate stock art"
      }
    ]
  },
  
  solution: {
    title: "Design as Infrastructure, Not a Chore.",
    description: "LoomGraph isn't a design tool. It's a generator. You provide the data; we provide the pixels. Optimized specifically for LinkedIn's feed to ensure your event gets the attention it deserves."
  },
  
  benefits: {
    title: "Why Work With Us",
    items: [
      {
        title: "Auto-Beautify Headshots",
        description: "Upload any photo; we handle the crop and background removal",
        icon: "image"
      },
      {
        title: "Timezone Intelligent",
        description: "Enter your time once; we format it for a global audience automatically",
        icon: "clock"
      },
      {
        title: "LinkedIn Optimized",
        description: "Safe zones guaranteed. No more text being cut off by the 'See More' button",
        icon: "linkedin"
      }
    ]
  },
  
  howItWorks: {
    title: "How It Works",
    steps: [
      {
        number: 1,
        title: "Input Data",
        description: "Fill out a simple 4-field form"
      },
      {
        number: 2,
        title: "Brand & Style",
        description: "Select your brand color and speaker layout"
      },
      {
        number: 3,
        title: "Instant Export",
        description: "Download your high-res, LinkedIn-ready asset"
      }
    ]
  },
  
  testimonials: {
    title: "What Founders Are Saying",
    items: [
      {
        name: "Sarah Chen",
        title: "Marketing Lead",
        company: "TechCorp",
        rating: 5,
        headline: "Total Lifesaver!",
        quote: "I used to spend 30 minutes per banner. Now it takes 2 minutes."
      },
      {
        name: "Michael Rodriguez",
        title: "Founder",
        company: "StartupXYZ",
        rating: 5,
        headline: "Game Changer",
        quote: "Finally, a tool that understands what founders actually need. No fluff, just results."
      },
      {
        name: "Emily Watson",
        title: "Event Manager",
        company: "ConferencePro",
        rating: 5,
        headline: "Incredibly Fast",
        quote: "I run 20+ webinars a month. LoomGraph saves me hours every week."
      }
    ]
  },
  
  faq: {
    title: "Frequently Asked Questions",
    items: [
      {
        question: "Is this better than Canva?",
        answer: "It's 10x faster for this specific task. Canva is a general-purpose design tool. LoomGraph is purpose-built for webinar banners, with LinkedIn optimization baked in."
      },
      {
        question: "Can I use my own brand colors?",
        answer: "Yes! You can customize the accent color to match your brand. We handle all the design work while keeping your brand identity intact."
      },
      {
        question: "What file types are supported?",
        answer: "We export high-resolution PNG files (2400x1254px) optimized for LinkedIn. Perfect for social media, email campaigns, and event pages."
      }
    ]
  },
  
  finalCTA: {
    headline: "Ready to save 2 hours a month?",
    subtext: "Join 500+ founders who have automated their webinar promotion.",
    ctaText: "Start Generating Now"
  },
  
  footer: {
    comingSoon: "🚀 Coming Soon: Takeaway Carousel Generator",
    copyright: "© 2026 LoomGraph. All rights reserved."
  }
};
```

### Responsive Breakpoints

```typescript
// Tailwind breakpoints used throughout
export const BREAKPOINTS = {
  mobile: '0px',      // default
  tablet: '768px',    // md:
  desktop: '1024px'   // lg:
} as const;
```

## Error Handling

### Navigation Error Handling

```typescript
// Graceful fallback if smooth scroll fails
const scrollToSection = (sectionId: string) => {
  try {
    const element = document.getElementById(sectionId);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    } else {
      console.warn(`Section with id "${sectionId}" not found`);
    }
  } catch (error) {
    console.error('Scroll error:', error);
    // Fallback to instant scroll
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView();
    }
  }
};
```

### View State Error Handling

```typescript
// In App.tsx - ensure valid view state
const [currentView, setCurrentView] = useState<ViewType>('landing');

const navigateToGenerator = useCallback(() => {
  try {
    setCurrentView('generator');
    // Scroll to top when switching views
    window.scrollTo({ top: 0, behavior: 'instant' });
  } catch (error) {
    console.error('Navigation error:', error);
    // Stay on current view if navigation fails
  }
}, []);
```

### Content Loading Error Handling

```typescript
// Graceful degradation if content is missing
export function BentoCard({ title, description, icon, className = '' }: BentoCardProps) {
  if (!title && !description) {
    console.warn('BentoCard rendered with no content');
    return null;
  }
  
  return (
    <div className={`bg-white rounded-lg border border-gray-200 shadow-sm p-6 ${className}`}>
      {icon && <div className="mb-4 text-blue-500">{icon}</div>}
      {title && <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>}
      {description && <p className="text-gray-600 text-sm leading-relaxed">{description}</p>}
    </div>
  );
}
```

## Testing Strategy

The landing page will be tested using a dual approach: unit tests for specific component behaviors and property-based tests for universal properties.

### Unit Testing Approach

Unit tests will focus on:
- Component rendering with various props
- Click handlers and navigation callbacks
- Responsive behavior at different breakpoints
- Accessibility attributes (ARIA labels, semantic HTML)
- Content rendering from configuration
- Error boundary behavior

### Property-Based Testing Approach

Property-based tests will verify universal properties across randomized inputs using a PBT library (fast-check for TypeScript). Each test will run a minimum of 100 iterations to ensure comprehensive coverage.

### Testing Tools

- **Vitest**: Test runner and assertion library
- **React Testing Library**: Component testing utilities
- **fast-check**: Property-based testing library
- **@testing-library/user-event**: User interaction simulation
- **@testing-library/jest-dom**: Custom matchers for DOM assertions

### Test Organization

```
src/
├── components/
│   └── landing/
│       ├── __tests__/
│       │   ├── LandingPage.test.tsx
│       │   ├── Header.test.tsx
│       │   ├── HeroSection.test.tsx
│       │   ├── BentoCard.test.tsx
│       │   ├── CTAButton.test.tsx
│       │   └── [other component tests]
│       └── __tests__/
│           └── properties/
│               ├── navigation.properties.test.tsx
│               ├── content.properties.test.tsx
│               └── accessibility.properties.test.tsx
```


## Correctness Properties

A property is a characteristic or behavior that should hold true across all valid executions of a system—essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.

### Property Reflection

After analyzing all acceptance criteria, I identified the following testable properties. Many requirements specify exact content or specific examples (e.g., "display headline X", "show 3 cards"), which are best tested as unit tests rather than properties. The properties below focus on universal behaviors that should hold across all instances of a component type or interaction pattern.

**Redundancy Analysis:**
- Properties 1.2, 2.5, 3.4, and 10.4 all test CTA button navigation → Combined into Property 1
- Properties about specific content rendering (headlines, descriptions, etc.) → Best tested as unit test examples, not properties
- Responsive layout behaviors at specific breakpoints → Best tested as unit test examples
- Properties 14.2-14.6 all test accessibility attributes → Combined into Properties 7-9 for clarity

### Properties

**Property 1: CTA Navigation Consistency**
*For any* CTA button on the landing page, clicking it should navigate to the Generator_View and update the view state accordingly.
**Validates: Requirements 1.2, 2.5, 3.4, 10.4**

**Property 2: View State Persistence**
*For any* view state change (landing ↔ generator), the React component state should accurately reflect the current view and remain stable until the next navigation action.
**Validates: Requirements 1.4**

**Property 3: Anchor Link Scrolling**
*For any* navigation anchor link in the header, clicking it should scroll to the corresponding section on the page.
**Validates: Requirements 2.3, 18.1**

**Property 4: Scroll Position Offset**
*For any* smooth scroll operation to a section, the final scroll position should account for the fixed header height to prevent content from being hidden behind the header.
**Validates: Requirements 18.3**

**Property 5: Testimonial Card Completeness**
*For any* testimonial data object, the rendered testimonial card should display all required fields: name, title, company, rating, headline, and quote.
**Validates: Requirements 8.3**

**Property 6: FAQ Visual Hierarchy**
*For any* FAQ item, the rendered output should have clear visual hierarchy with the question more prominent than the answer (e.g., larger font size, bold weight, or distinct color).
**Validates: Requirements 9.6**

**Property 7: Bento Card Styling Consistency**
*For any* Bento_Card component instance, it should have subtle shadows and 1px borders consistent with the Bento design aesthetic.
**Validates: Requirements 12.3**

**Property 8: Primary CTA Color Consistency**
*For any* primary CTA button, it should use Electric Blue (#3B82F6) as the background color.
**Validates: Requirements 12.5**

**Property 9: Touch Target Accessibility**
*For any* interactive element (button, link, input), it should have a minimum touch target size of 44x44 pixels to ensure mobile accessibility.
**Validates: Requirements 13.6**

**Property 10: ARIA Label Presence**
*For any* interactive element (button, link, input), it should include appropriate ARIA labels or accessible names for screen readers.
**Validates: Requirements 14.2**

**Property 11: Keyboard Navigation Support**
*For any* interactive element, it should be reachable and operable via keyboard navigation (Tab, Enter, Space keys).
**Validates: Requirements 14.3**

**Property 12: Focus Indicator Visibility**
*For any* focusable element, when it receives focus, it should display a visible focus indicator (outline, ring, or border).
**Validates: Requirements 14.4**

**Property 13: Text Contrast Compliance**
*For any* text element on the landing page, the color contrast ratio between text and background should be at least 4.5:1 for normal text.
**Validates: Requirements 14.5**

**Property 14: Meaningful Image Alt Text**
*For any* image or icon that conveys meaning (not purely decorative), it should have alternative text or an ARIA label describing its purpose.
**Validates: Requirements 14.6**

### Property Testing Implementation Notes

Each property will be implemented as a property-based test using fast-check with a minimum of 100 iterations. The tests will:

1. **Generate random test data** appropriate to the property (e.g., random testimonial objects, random viewport sizes, random color combinations)
2. **Render components** with the generated data
3. **Assert the property holds** for all generated inputs
4. **Tag each test** with the format: `Feature: landing-page, Property N: [property description]`

Example property test structure:

```typescript
import { fc } from 'fast-check';
import { render, screen } from '@testing-library/react';

// Feature: landing-page, Property 5: Testimonial Card Completeness
describe('Property 5: Testimonial Card Completeness', () => {
  it('should display all required fields for any testimonial data', () => {
    fc.assert(
      fc.property(
        fc.record({
          name: fc.string({ minLength: 1 }),
          title: fc.string({ minLength: 1 }),
          company: fc.string({ minLength: 1 }),
          rating: fc.integer({ min: 1, max: 5 }),
          headline: fc.string({ minLength: 1 }),
          quote: fc.string({ minLength: 1 })
        }),
        (testimonial) => {
          const { container } = render(<TestimonialCard {...testimonial} />);
          
          expect(screen.getByText(testimonial.name)).toBeInTheDocument();
          expect(screen.getByText(testimonial.title)).toBeInTheDocument();
          expect(screen.getByText(testimonial.company)).toBeInTheDocument();
          expect(screen.getByText(testimonial.headline)).toBeInTheDocument();
          expect(screen.getByText(testimonial.quote)).toBeInTheDocument();
          
          // Check rating stars are rendered
          const stars = container.querySelectorAll('[data-testid="star"]');
          expect(stars).toHaveLength(5);
        }
      ),
      { numRuns: 100 }
    );
  });
});
```

### Unit Test Coverage

While properties test universal behaviors, unit tests will cover:

- **Specific content rendering**: Exact headlines, descriptions, and copy from the content configuration
- **Specific layout behaviors**: Responsive breakpoints at 768px, 1024px
- **Component integration**: LandingPage composing all sections correctly
- **Edge cases**: Empty content, missing props, error states
- **Initial state**: Landing page displays by default on app load
- **Specific styling**: Background colors, font families, specific CSS classes
- **Performance metrics**: Bundle size thresholds, lazy loading behavior

This dual approach ensures both universal correctness (properties) and specific implementation details (unit tests) are thoroughly validated.
