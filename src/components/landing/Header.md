# Header Component

## Overview

The `Header` component is a fixed navigation header for the LoomGraph landing page. It provides site navigation, branding, and a primary call-to-action button to launch the generator tool.

## Implementation

**Location:** `src/components/landing/Header.tsx`

## Features

### Layout Structure
- **Left**: LoomGraph logo with geometric icon
- **Center**: Navigation links (responsive - hidden on mobile)
- **Right**: "Launch Generator" CTA button

### Navigation Links
The header includes three anchor links that smoothly scroll to corresponding sections:
- **"How it Works"** → scrolls to `#how-it-works` section
- **"Templates"** → scrolls to `#templates` section
- **"Pricing"** → scrolls to `#pricing` section

### Smooth Scrolling
The component implements intelligent smooth scrolling with header offset calculation:
- Calculates the target section's position
- Accounts for the fixed header height (80px)
- Smoothly scrolls to the adjusted position
- Prevents content from being hidden behind the header

### Styling
- **Fixed positioning** at top of viewport (z-50)
- **Backdrop blur effect** for modern glass-morphism look
- **White background** with 95% opacity (`bg-white/95`)
- **1px bottom border** for subtle separation
- **Responsive height**: 64px (h-16)

### Responsive Behavior
- **Mobile (< 768px)**: Navigation links hidden, logo and CTA visible
- **Tablet/Desktop (≥ 768px)**: All elements visible in horizontal layout

## Usage

### Basic Usage

```tsx
import { Header } from './components/landing';

function LandingPage() {
  const navigateToGenerator = () => {
    // Switch to generator view
    setCurrentView('generator');
  };

  return (
    <div>
      <Header onNavigate={navigateToGenerator} />
      {/* Rest of landing page content */}
    </div>
  );
}
```

### With Section IDs

For the navigation links to work, your landing page must include sections with matching IDs:

```tsx
<div className="min-h-screen">
  <Header onNavigate={navigateToGenerator} />
  
  {/* Spacer for fixed header */}
  <div className="h-16" />
  
  {/* Sections with IDs for anchor links */}
  <section id="how-it-works">
    <HowItWorksSection />
  </section>
  
  <section id="templates">
    <TemplatesSection />
  </section>
  
  <section id="pricing">
    <PricingSection />
  </section>
</div>
```

## Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `onNavigate` | `() => void` | ✅ | Callback function triggered when "Launch Generator" CTA is clicked |

## Smooth Scroll Implementation

The `scrollToSection` function handles smooth scrolling with offset:

```typescript
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
```

### How It Works
1. **Find the target element** by ID
2. **Get element position** relative to viewport (`getBoundingClientRect().top`)
3. **Calculate absolute position** by adding current scroll position (`window.pageYOffset`)
4. **Subtract header offset** (80px) to prevent content from being hidden
5. **Smooth scroll** to the calculated position

## Accessibility

### Semantic HTML
- Uses `<header>` element for semantic meaning
- Uses `<nav>` element with `aria-label="Main navigation"`
- Navigation links are `<button>` elements (not `<a>` tags since they're not true links)

### ARIA Labels
- Each navigation button includes `aria-label` for screen readers
- Example: `aria-label="Navigate to How it Works section"`

### Keyboard Navigation
- All interactive elements are keyboard accessible
- Tab through logo, nav links, and CTA button
- Enter/Space to activate buttons
- Focus indicators visible on all focusable elements

## Components Used

### GeometricShape
- **Variant**: `logo`
- **Purpose**: Brand identity icon
- **Styling**: 8x8px gradient blue square

### CTAButton
- **Text**: "Launch Generator"
- **Variant**: `primary` (Electric Blue background)
- **Size**: `medium`
- **Action**: Triggers `onNavigate` callback

## Styling Details

### Container
```css
position: fixed
top: 0
left: 0
right: 0
background: rgba(255, 255, 255, 0.95)
backdrop-filter: blur(8px)
border-bottom: 1px solid #E5E7EB
z-index: 50
```

### Inner Container
```css
max-width: 1280px (max-w-7xl)
margin: 0 auto
padding: 0 1rem (sm: 1.5rem, lg: 2rem)
height: 64px (h-16)
display: flex
justify-content: space-between
align-items: center
```

### Navigation Links
```css
display: none (mobile)
display: flex (md: breakpoint and above)
gap: 2rem
color: #4B5563 (gray-600)
hover:color: #111827 (gray-900)
transition: colors
```

## Testing

### Manual Testing Checklist
- [ ] Header is fixed at top of viewport
- [ ] Logo and "LoomGraph" text visible
- [ ] Navigation links visible on desktop (≥ 768px)
- [ ] Navigation links hidden on mobile (< 768px)
- [ ] CTA button always visible
- [ ] Clicking "How it Works" scrolls to #how-it-works
- [ ] Clicking "Templates" scrolls to #templates
- [ ] Clicking "Pricing" scrolls to #pricing
- [ ] Smooth scroll animation works
- [ ] Content not hidden behind header after scroll
- [ ] Clicking CTA triggers onNavigate callback
- [ ] Backdrop blur effect visible
- [ ] Keyboard navigation works (Tab, Enter)
- [ ] Focus indicators visible

### Demo Component
A demo component is available at `src/components/landing/Header.demo.tsx` for manual testing. It includes:
- Header component with test callback
- Placeholder sections with correct IDs
- Visual testing checklist
- Instructions for testing

To use the demo:
```bash
# 1. Temporarily import in App.tsx
import { HeaderDemo } from './components/landing/Header.demo';

# 2. Replace App content with <HeaderDemo />

# 3. Run dev server
npm run dev

# 4. Test all features in browser
```

## Browser Compatibility

### Smooth Scrolling
The component uses `window.scrollTo({ behavior: 'smooth' })` which is supported in:
- ✅ Chrome 61+
- ✅ Firefox 36+
- ✅ Safari 15.4+
- ✅ Edge 79+

For older browsers, the scroll will still work but without the smooth animation (instant jump).

### Backdrop Blur
The `backdrop-blur-sm` effect is supported in:
- ✅ Chrome 76+
- ✅ Firefox 103+
- ✅ Safari 9+
- ✅ Edge 79+

For unsupported browsers, the header will still have the white background with 95% opacity.

## Requirements Validated

This component satisfies the following requirements from the landing page spec:

- ✅ **Requirement 2.1**: Displays "LoomGraph" logo with geometric icon
- ✅ **Requirement 2.2**: Includes navigation links for "How it Works," "Templates," and "Pricing"
- ✅ **Requirement 2.3**: Smooth scrolls to corresponding sections using anchor links
- ✅ **Requirement 2.4**: Displays "Launch Generator" CTA button with dark background and white text
- ✅ **Requirement 2.5**: Navigates to Generator_View when CTA is clicked
- ✅ **Requirement 2.6**: Remains accessible and readable on mobile viewports
- ✅ **Requirement 18.1**: Smoothly scrolls to anchor link targets
- ✅ **Requirement 18.3**: Accounts for fixed header height in scroll position

## Future Enhancements

Potential improvements for future iterations:
- Mobile hamburger menu for navigation links
- Active link highlighting based on scroll position
- Scroll-triggered header shadow (appears after scrolling down)
- Logo click to scroll to top
- Sticky behavior with hide-on-scroll-down, show-on-scroll-up
- Search functionality
- User account menu
- Language selector

## Related Components

- `GeometricShape` - Provides the logo icon
- `CTAButton` - Provides the "Launch Generator" button
- `LandingPage` - Container component that uses Header
- `HeroSection` - First section below the header
- `HowItWorksSection` - Target of "How it Works" navigation link
