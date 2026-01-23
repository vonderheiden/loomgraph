# CTAButton Component

## Overview

The `CTAButton` component is a reusable call-to-action button designed for high conversion rates on the LoomGraph landing page. It provides multiple variants and sizes while maintaining accessibility and the Bento design aesthetic.

## Features

### Variants
- **Primary**: Electric Blue (#3B82F6) background with white text - used for main conversion actions
- **Secondary**: White background with gray border - used for alternative actions

### Sizes
- **Small**: Compact button (px-4 py-2, text-sm) - for secondary actions
- **Medium**: Standard button (px-6 py-3, text-base) - default size
- **Large**: Prominent button (px-8 py-4, text-lg) - for hero and final CTAs

### Accessibility
- ✅ Minimum 44x44px touch target on all sizes (mobile accessibility)
- ✅ ARIA labels for screen readers
- ✅ Visible focus indicators (2px ring with offset)
- ✅ Keyboard navigation support (Tab, Enter, Space)
- ✅ Semantic HTML button element

### Design System Compliance
- ✅ Electric Blue (#3B82F6) for primary variant
- ✅ Consistent with Bento aesthetic
- ✅ Smooth transitions and hover states
- ✅ Focus ring matches variant color

## Usage

### Basic Usage

```tsx
import { CTAButton } from './components/landing';

function MyComponent() {
  const handleClick = () => {
    console.log('Button clicked!');
  };

  return (
    <CTAButton 
      text="Get Started" 
      onClick={handleClick}
    />
  );
}
```

### All Variants and Sizes

```tsx
// Primary variants
<CTAButton text="Small Primary" onClick={handleClick} variant="primary" size="small" />
<CTAButton text="Medium Primary" onClick={handleClick} variant="primary" size="medium" />
<CTAButton text="Large Primary" onClick={handleClick} variant="primary" size="large" />

// Secondary variants
<CTAButton text="Small Secondary" onClick={handleClick} variant="secondary" size="small" />
<CTAButton text="Medium Secondary" onClick={handleClick} variant="secondary" size="medium" />
<CTAButton text="Large Secondary" onClick={handleClick} variant="secondary" size="large" />
```

### Real-world Examples

```tsx
// Hero Section CTA
<CTAButton 
  text="Create Your First Banner — It's Free" 
  onClick={navigateToGenerator}
  variant="primary"
  size="large"
/>

// Header CTA
<CTAButton 
  text="Launch Generator" 
  onClick={navigateToGenerator}
  variant="primary"
  size="medium"
/>

// Final CTA Section
<CTAButton 
  text="Start Generating Now" 
  onClick={navigateToGenerator}
  variant="primary"
  size="large"
/>
```

### Custom Styling

The component accepts a `className` prop for additional customization:

```tsx
// Full width on mobile, auto width on desktop
<CTAButton 
  text="Responsive Button" 
  onClick={handleClick}
  variant="primary"
  className="w-full sm:w-auto"
/>

// Add extra shadow
<CTAButton 
  text="With Shadow" 
  onClick={handleClick}
  variant="secondary"
  className="shadow-lg"
/>
```

## Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `text` | `string` | - | ✅ | Button label text |
| `onClick` | `() => void` | - | ✅ | Click handler function |
| `variant` | `'primary' \| 'secondary'` | `'primary'` | ❌ | Visual style variant |
| `size` | `'small' \| 'medium' \| 'large'` | `'medium'` | ❌ | Button size |
| `className` | `string` | `''` | ❌ | Additional CSS classes |

## Accessibility Features

### Keyboard Navigation
- **Tab**: Focus the button
- **Enter/Space**: Activate the button
- **Shift+Tab**: Focus previous element

### Screen Readers
- Button includes `aria-label` attribute with the button text
- Semantic `<button>` element ensures proper role announcement
- Focus states are visually distinct for keyboard users

### Touch Targets
All button sizes meet WCAG 2.1 Level AAA guidelines:
- Minimum touch target: 44x44px
- Adequate spacing between interactive elements
- Large enough for users with motor impairments

## Design Tokens

### Colors
```css
/* Primary Variant */
background: #3B82F6 (Electric Blue)
text: white
hover: #2563EB (darker blue)
focus-ring: #3B82F6

/* Secondary Variant */
background: white
text: #111827 (gray-900)
border: #D1D5DB (gray-300)
hover: #F9FAFB (gray-50)
focus-ring: #6B7280 (gray-500)
```

### Spacing
```css
/* Small */
padding: 0.5rem 1rem (py-2 px-4)
font-size: 0.875rem (text-sm)

/* Medium */
padding: 0.75rem 1.5rem (py-3 px-6)
font-size: 1rem (text-base)

/* Large */
padding: 1rem 2rem (py-4 px-8)
font-size: 1.125rem (text-lg)
```

### Border Radius
```css
border-radius: 0.5rem (rounded-lg)
```

## Testing

### Manual Testing Checklist
- [ ] Primary variant displays Electric Blue background
- [ ] Secondary variant displays white background with border
- [ ] All sizes meet 44x44px minimum touch target
- [ ] Hover states work correctly
- [ ] Focus rings are visible when tabbing
- [ ] Click handler fires on click
- [ ] Click handler fires on Enter/Space key
- [ ] ARIA label is present
- [ ] Button is keyboard accessible

### Visual Regression Testing
Use the `CTAButton.demo.tsx` file to visually verify all variants and sizes:

```bash
npm run dev
# Navigate to the demo component in your browser
```

## Requirements Validation

This component satisfies the following requirements from the landing page spec:

- ✅ **Requirement 12.5**: Uses Electric Blue (#3B82F6) for primary CTA buttons
- ✅ **Requirement 14.2**: Includes appropriate ARIA labels for interactive elements
- ✅ **Requirement 14.3**: Supports full keyboard navigation
- ✅ **Requirement 14.4**: Displays visible focus indicators
- ✅ **Requirement 13.6**: All interactive elements meet 44x44px minimum touch target

## Future Enhancements

Potential improvements for future iterations:
- Loading state with spinner
- Disabled state styling
- Icon support (left/right positioned)
- Full width variant
- Link variant (renders as `<a>` instead of `<button>`)
- Animation on click (ripple effect)
- Tooltip support

## Related Components

- `BentoCard` - Card component using similar design tokens
- `Header` - Uses CTAButton for "Launch Generator" action
- `HeroSection` - Uses CTAButton for primary CTA
- `FinalCTASection` - Uses CTAButton for final conversion action
