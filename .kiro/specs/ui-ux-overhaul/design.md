# Design Document: UI/UX Overhaul

## Overview

This design document outlines the comprehensive UI/UX overhaul for the LoomGraph banner generator. The overhaul transforms the application from a basic two-column layout into a polished, professional interface with optimized form flow, a "LinkedIn Stage" preview experience, and full mobile responsiveness while maintaining the Bento design language.

The design follows a phased implementation approach to manage complexity and risk, with each phase building upon the previous one. The architecture maintains the existing React Context state management while focusing on layout, styling, and responsive behavior improvements.

## Architecture

### High-Level Structure

```
App.tsx (BannerProvider wrapper)
├── FormPanel (35% width, sticky header, scrollable content)
│   ├── FormHeader (sticky)
│   └── FormContent (scrollable)
│       ├── WebinarDetailsForm (title input)
│       ├── DateTimeForm (date/time inputs)
│       ├── DimensionSelector (compact horizontal)
│       ├── SpeakerCountSelector
│       ├── SpeakerSection[] (accordion, single-row inputs)
│       ├── ColorPicker
│       └── BackgroundOptions
└── PreviewPanel (65% width, fully sticky)
    ├── PreviewHeader (with export button)
    └── LinkedInStage (centered canvas container)
        └── BannerCanvas
```

### Layout System

**Desktop (≥768px):**
- Two-column flex layout with 35/65 split
- Form panel: sticky header + scrollable content
- Preview panel: fully sticky, no scrolling
- Export button: top-right of preview panel

**Tablet (≥768px, <1024px):**
- Same two-column layout with adjusted spacing
- Slightly reduced padding for better space utilization

**Mobile (<768px):**
- Vertical stack layout
- Mini preview pinned to top (collapsed state)
- Full form below preview
- FAB for export at bottom-right
- Increased touch targets and spacing

**Small Mobile (<400px):**
- Additional vertical stacking for date/time inputs
- Icon-only dimension selector
- Maximum vertical space optimization

### Responsive Breakpoints

```typescript
const breakpoints = {
  smallMobile: 400,  // Extra compact layout
  mobile: 768,       // Stack to vertical
  tablet: 1024,      // Optimize spacing
  desktop: 1440      // Full layout
};
```

## Components and Interfaces

### 1. App.tsx (Root Layout)

**Current State:**
```typescript
// Two-column layout with 40/60 split
<div className="flex">
  <FormPanel /> {/* 40% */}
  <PreviewPanel /> {/* 60% */}
</div>
```

**New Design:**
```typescript
// Two-column layout with 35/65 split and responsive stacking
<div className="flex flex-col lg:flex-row min-h-screen">
  <FormPanel className="w-full lg:w-[35%]" />
  <PreviewPanel className="w-full lg:w-[65%]" />
</div>
```

**Changes:**
- Update width percentages to 35/65
- Add responsive flex direction (column on mobile, row on desktop)
- Ensure full viewport height utilization

### 2. FormPanel Component

**Interface:**
```typescript
interface FormPanelProps {
  className?: string;
}

const FormPanel: React.FC<FormPanelProps> = ({ className }) => {
  return (
    <div className={cn("flex flex-col", className)}>
      <FormHeader /> {/* Sticky */}
      <FormContent /> {/* Scrollable */}
    </div>
  );
};
```

**FormHeader (New Component):**
```typescript
const FormHeader: React.FC = () => {
  return (
    <div className="sticky top-0 z-10 bg-bento-bg border-b border-bento-border p-6">
      <h1 className="text-2xl font-semibold text-gray-900">
        Create Your Banner
      </h1>
      <p className="text-sm text-gray-600 mt-1">
        Customize your webinar banner in real-time
      </p>
    </div>
  );
};
```

**FormContent:**
```typescript
const FormContent: React.FC = () => {
  return (
    <div className="flex-1 overflow-y-auto p-6 space-y-6">
      <WebinarDetailsForm />
      <DateTimeForm />
      <DimensionSelector />
      <SpeakerCountSelector />
      <SpeakerSections />
      <ColorPicker />
      <BackgroundOptions />
    </div>
  );
};
```

**Key Features:**
- Sticky header remains visible during scroll
- Scrollable content area with consistent spacing
- Reordered form sections for logical flow

### 3. DimensionSelector Component (Redesign)

**Current State:**
- Vertical list with radio buttons
- ~200px height
- Text-heavy labels

**New Design:**
```typescript
interface DimensionOption {
  value: BannerDimension;
  label: string;
  icon: LucideIcon;
  description: string;
}

const DimensionSelector: React.FC = () => {
  const { dimension, setDimension } = useBannerState();
  
  const options: DimensionOption[] = [
    {
      value: 'linkedin',
      label: 'LinkedIn',
      icon: Linkedin,
      description: '1200×627'
    },
    {
      value: 'twitter',
      label: 'Twitter',
      icon: Twitter,
      description: '1200×675'
    },
    {
      value: 'facebook',
      label: 'Facebook',
      icon: Facebook,
      description: '1200×630'
    }
  ];

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-gray-700">
        Banner Dimension
      </label>
      <div className="flex gap-2">
        {options.map((option) => (
          <button
            key={option.value}
            onClick={() => setDimension(option.value)}
            className={cn(
              "flex-1 flex flex-col items-center justify-center",
              "h-[60px] rounded-bento border border-bento-border",
              "transition-all duration-200",
              "hover:border-action-primary hover:bg-blue-50",
              "focus:outline-none focus:ring-2 focus:ring-offset-2",
              "lg:flex-row lg:gap-2",
              dimension === option.value && [
                "bg-blue-50 border-action-primary",
                "shadow-soft"
              ]
            )}
            style={{
              focusRing: `var(--accent-color, #3B82F6)`
            }}
          >
            <option.icon className="w-5 h-5 lg:w-4 lg:h-4" />
            <span className="hidden lg:inline text-sm font-medium">
              {option.label}
            </span>
            <span className="text-xs text-gray-500 lg:hidden">
              {option.description}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};
```

**Key Features:**
- Horizontal segmented control layout
- Icon + label on desktop, icon-only on mobile
- 60px height constraint
- Active state styling with brand color
- Smooth transitions

### 4. SpeakerSection Component (Enhanced)

**Current State:**
- Stacked name/title inputs
- Accordion functionality exists

**New Design:**
```typescript
const SpeakerSection: React.FC<SpeakerSectionProps> = ({ 
  index, 
  isExpanded, 
  onToggle 
}) => {
  return (
    <div className="rounded-bento border border-bento-border bg-white">
      <button
        onClick={onToggle}
        className="w-full p-4 flex items-center justify-between"
      >
        <span className="font-medium">Speaker {index + 1}</span>
        <ChevronDown className={cn(
          "w-5 h-5 transition-transform",
          isExpanded && "rotate-180"
        )} />
      </button>
      
      {isExpanded && (
        <div className="p-4 pt-0 space-y-4">
          <HeadshotUploader index={index} />
          
          {/* Single-row inputs on desktop */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                className="mt-1 w-full rounded-bento border border-bento-border px-3 py-2"
                placeholder="Speaker name"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">
                Title
              </label>
              <input
                type="text"
                className="mt-1 w-full rounded-bento border border-bento-border px-3 py-2"
                placeholder="Job title"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
```

**Key Features:**
- Maintains accordion functionality
- Single-row name/title inputs on desktop (≥768px)
- Stacked inputs on mobile (<768px)
- 50/50 width split in single-row layout

### 5. PreviewPanel Component (Redesign)

**Current State:**
```typescript
// Sticky header + sticky content with canvas and button below
<div className="sticky top-0">
  <PreviewHeader />
  <div className="sticky top-[header-height]">
    <BannerCanvas />
    <ExportButton />
  </div>
</div>
```

**New Design:**
```typescript
const PreviewPanel: React.FC = () => {
  return (
    <div className="hidden lg:flex lg:flex-col lg:sticky lg:top-0 lg:h-screen bg-[#F3F4F6]">
      <PreviewHeader />
      <LinkedInStage />
    </div>
  );
};

const PreviewHeader: React.FC = () => {
  return (
    <div className="flex items-center justify-between p-6 bg-white border-b border-bento-border">
      <div>
        <h2 className="text-lg font-semibold text-gray-900">Preview</h2>
        <p className="text-sm text-gray-600">Real-time banner preview</p>
      </div>
      <ExportButton />
    </div>
  );
};

const LinkedInStage: React.FC = () => {
  return (
    <div className="flex-1 flex items-center justify-center p-8">
      <div className="rounded-bento border border-bento-border bg-white shadow-lg p-4">
        <BannerCanvas />
      </div>
    </div>
  );
};
```

**Key Features:**
- Fully sticky panel (no scrolling)
- Export button in header at top-right
- LinkedIn Stage: centered canvas with frame aesthetic
- #F3F4F6 background for stage area
- Shadow-lg on canvas container

### 6. Mobile Preview (New Component)

**Design:**
```typescript
const MobilePreview: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  return (
    <div className="lg:hidden sticky top-0 z-20 bg-white border-b border-bento-border">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full p-4 flex items-center justify-between"
      >
        <span className="font-medium">Preview</span>
        <ChevronDown className={cn(
          "w-5 h-5 transition-transform",
          isExpanded && "rotate-180"
        )} />
      </button>
      
      {isExpanded ? (
        <div className="p-4 bg-[#F3F4F6]">
          <div className="rounded-bento border border-bento-border bg-white shadow-lg p-2">
            <BannerCanvas scale={0.5} />
          </div>
        </div>
      ) : (
        <div className="px-4 pb-4">
          <div className="h-16 rounded-bento border border-bento-border bg-[#F3F4F6] flex items-center justify-center">
            <span className="text-xs text-gray-500">Tap to expand preview</span>
          </div>
        </div>
      )}
    </div>
  );
};
```

**Key Features:**
- Collapsible preview at top of mobile layout
- Mini preview in collapsed state
- Full preview when expanded
- Sticky positioning

### 7. FloatingActionButton (New Component)

**Design:**
```typescript
const FloatingActionButton: React.FC = () => {
  return (
    <button
      onClick={handleExport}
      className={cn(
        "lg:hidden fixed bottom-6 right-6 z-30",
        "w-14 h-14 rounded-full",
        "bg-action-primary text-white",
        "shadow-lg hover:shadow-xl",
        "flex items-center justify-center",
        "transition-all duration-200",
        "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-action-primary"
      )}
      aria-label="Export banner"
    >
      <Download className="w-6 h-6" />
    </button>
  );
};
```

**Key Features:**
- Only visible on mobile (<768px)
- Fixed positioning at bottom-right
- 56px diameter (exceeds 44px touch target)
- High z-index for visibility
- Adequate margin from edges (24px)

## Data Models

No changes to existing data models. The BannerState interface remains unchanged:

```typescript
interface BannerState {
  title: string;
  speakers: Speaker[];
  speakerCount: number;
  dateTime: string;
  timezone: string;
  dimension: BannerDimension;
  accentColor: string;
  backgroundColor: string;
  // ... other fields
}
```

## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system—essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

### Property 1: Responsive Layout Width Distribution

*For any* viewport width ≥ 768px, the Form_Panel should occupy 35% of the viewport width and the Preview_Panel should occupy 65% of the viewport width (within a 2% tolerance).

**Validates: Requirements 1.1**

### Property 2: Form Panel Scroll Independence

*For any* Form_Panel content height that exceeds the viewport height, scrolling the Form_Panel should not affect the scroll position or visibility of the Preview_Panel.

**Validates: Requirements 1.2, 1.3**

### Property 3: Dimension Selector Compactness

*For any* viewport width ≥ 768px, the Dimension_Selector component should have a height ≤ 70px (allowing 10px tolerance from the 60px target).

**Validates: Requirements 2.2, 3.4**

### Property 4: Single-Row Input Layout

*For any* viewport width ≥ 768px, speaker Name and Title input fields should be rendered in a single row with each field occupying 50% of the container width (within 2% tolerance).

**Validates: Requirements 2.3, 11.1, 11.2**

### Property 5: Accordion Interaction Preservation

*For any* Speaker_Section component, clicking the accordion header should toggle the visibility of the section content (expanded ↔ collapsed).

**Validates: Requirements 2.5**

### Property 6: Active State Visual Feedback

*For any* selectable option in the Dimension_Selector, when that option is selected, it should have distinct visual styling (background color, border color, or shadow) different from unselected options.

**Validates: Requirements 3.2**

### Property 7: Mobile Icon-Only Display

*For any* viewport width < 768px, the Dimension_Selector should display only icons without text labels for dimension options.

**Validates: Requirements 3.5**

### Property 8: Bento Border Radius Consistency

*For any* card component or container element, the border-radius should be 12px (within 1px tolerance).

**Validates: Requirements 5.1**

### Property 9: Bento Border Styling Consistency

*For any* border in the UI, it should use color #E5E7EB and width 1px.

**Validates: Requirements 5.2**

### Property 10: Dynamic Focus Ring Color

*For any* form input element and any selected Accent_Color, when the input receives focus, the focus ring color should match the Accent_Color.

**Validates: Requirements 5.3, 6.1, 6.2, 6.4**

### Property 11: Focus Ring Contrast Compliance

*For any* Accent_Color selection, the contrast ratio between the focus ring and its background should be ≥ 3:1.

**Validates: Requirements 6.3**

### Property 12: Mobile Vertical Stack Layout

*For any* viewport width < 768px, the Form_Panel and Preview_Panel should be stacked vertically (not side-by-side).

**Validates: Requirements 7.1**

### Property 13: Mobile FAB Visibility

*For any* viewport width < 768px, a Floating Action Button for export should be visible and positioned at the bottom-right of the viewport.

**Validates: Requirements 7.3, 10.2**

### Property 14: Small Mobile Date/Time Stacking

*For any* viewport width < 400px, date and time input fields should be stacked vertically (not side-by-side).

**Validates: Requirements 7.4**

### Property 15: Mobile Touch Target Size

*For any* interactive element (button, input, link) on viewports < 768px, the element should have minimum dimensions of 44×44 pixels.

**Validates: Requirements 7.5, 8.1**

### Property 16: Mobile Spacing Increase

*For any* form input element on viewports < 768px, the padding should be greater than the padding on viewports ≥ 768px.

**Validates: Requirements 8.4**

### Property 17: Keyboard Navigation Completeness

*For any* interactive element in the UI, it should be reachable and operable using only keyboard navigation (Tab, Enter, Space, Arrow keys).

**Validates: Requirements 9.1**

### Property 18: ARIA Label Presence

*For any* form input or button element, it should have an accessible name provided by aria-label, aria-labelledby, or a visible label element.

**Validates: Requirements 9.2**

### Property 19: WCAG Contrast Compliance

*For any* text element or interactive element, the contrast ratio between foreground and background should meet WCAG 2.1 AA standards (4.5:1 for normal text, 3:1 for large text and UI components).

**Validates: Requirements 9.3**

### Property 20: Focus Indicator Visibility

*For any* interactive element, when it receives focus, a visible focus indicator should be present (outline, ring, or border change).

**Validates: Requirements 9.4**

### Property 21: Desktop Export Button Positioning

*For any* viewport width ≥ 768px, the export button should be positioned in the top-right area of the Preview_Panel.

**Validates: Requirements 10.1**

### Property 22: Export Button Persistent Visibility

*For any* scroll position in the application, the export button (either in header or as FAB) should remain visible in the viewport.

**Validates: Requirements 10.3**

### Property 23: Responsive Input Stacking

*For any* viewport width < 768px, speaker Name and Title fields should be stacked vertically (not in a single row).

**Validates: Requirements 11.3**

### Property 24: Layout Spacing Consistency

*For any* spacing value in the UI, it should be a multiple of 8px (the grid system base unit).

**Validates: Requirements 5.5**

### Property 25: Horizontal Scroll Prevention

*For any* viewport width, the application should not produce horizontal scrolling (document width should equal viewport width).

**Validates: Requirements 12.5**

## Error Handling

### Viewport Detection Errors

**Scenario:** Browser does not support window.matchMedia or viewport queries fail

**Handling:**
- Fallback to desktop layout as default
- Use JavaScript-based width detection as backup
- Log warning to console for debugging

**Implementation:**
```typescript
const useViewport = () => {
  const [width, setWidth] = useState(window.innerWidth);
  
  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    
    try {
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    } catch (error) {
      console.warn('Viewport detection failed, using default layout');
      return () => {};
    }
  }, []);
  
  return {
    isMobile: width < 768,
    isSmallMobile: width < 400,
    isTablet: width >= 768 && width < 1024,
    isDesktop: width >= 1024
  };
};
```

### Dynamic Focus Color Errors

**Scenario:** Invalid accent color provided or color contrast calculation fails

**Handling:**
- Validate color format before applying
- Fall back to default blue (#3B82F6) if invalid
- Ensure minimum contrast ratio is maintained

**Implementation:**
```typescript
const validateAccentColor = (color: string): string => {
  // Check if valid hex color
  if (!/^#[0-9A-F]{6}$/i.test(color)) {
    console.warn(`Invalid accent color: ${color}, using default`);
    return '#3B82F6';
  }
  
  // Check contrast ratio
  const contrastRatio = calculateContrast(color, '#FFFFFF');
  if (contrastRatio < 3) {
    console.warn(`Accent color contrast too low: ${contrastRatio}, using default`);
    return '#3B82F6';
  }
  
  return color;
};
```

### Mobile Preview Rendering Errors

**Scenario:** Canvas scaling fails on mobile or preview doesn't render

**Handling:**
- Catch rendering errors and display fallback message
- Provide retry mechanism
- Log error details for debugging

**Implementation:**
```typescript
const MobilePreview: React.FC = () => {
  const [error, setError] = useState<Error | null>(null);
  
  if (error) {
    return (
      <div className="p-4 bg-red-50 border border-red-200 rounded-bento">
        <p className="text-sm text-red-800">
          Preview unavailable. Please try refreshing.
        </p>
        <button
          onClick={() => setError(null)}
          className="mt-2 text-sm text-red-600 underline"
        >
          Retry
        </button>
      </div>
    );
  }
  
  return (
    <ErrorBoundary onError={setError}>
      {/* Preview content */}
    </ErrorBoundary>
  );
};
```

### Touch Target Size Validation Errors

**Scenario:** Interactive elements fail to meet 44×44px minimum on mobile

**Handling:**
- Development-time warnings via ESLint or custom validation
- Runtime checks in development mode
- Automatic padding adjustment where possible

**Implementation:**
```typescript
// Development-time validation hook
const useTouchTargetValidation = (ref: RefObject<HTMLElement>) => {
  useEffect(() => {
    if (process.env.NODE_ENV !== 'development') return;
    
    const element = ref.current;
    if (!element) return;
    
    const { width, height } = element.getBoundingClientRect();
    const isMobile = window.innerWidth < 768;
    
    if (isMobile && (width < 44 || height < 44)) {
      console.warn(
        `Touch target too small: ${width}×${height}px`,
        element
      );
    }
  }, [ref]);
};
```

## Testing Strategy

### Dual Testing Approach

This feature requires both unit tests and property-based tests to ensure comprehensive coverage:

**Unit Tests** focus on:
- Specific component rendering at exact breakpoints (768px, 400px)
- Accordion expand/collapse interactions
- Export button click handlers
- Error boundary behavior
- Specific CSS class applications

**Property Tests** focus on:
- Layout behavior across ranges of viewport widths
- Focus color updates across all possible accent colors
- Touch target sizes across all interactive elements
- Contrast ratios across all color combinations
- Spacing consistency across all components

### Property-Based Testing Configuration

**Library:** fast-check (for TypeScript/React)

**Configuration:**
- Minimum 100 iterations per property test
- Custom generators for viewport widths, colors, and DOM elements
- Each test tagged with feature name and property number

**Example Test Structure:**
```typescript
import fc from 'fast-check';

describe('Feature: ui-ux-overhaul, Property 1: Responsive Layout Width Distribution', () => {
  it('should maintain 35/65 split for viewports >= 768px', () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 768, max: 3840 }), // viewport width
        (viewportWidth) => {
          // Set viewport width
          window.innerWidth = viewportWidth;
          
          // Render component
          const { container } = render(<App />);
          
          // Measure panel widths
          const formPanel = container.querySelector('[data-testid="form-panel"]');
          const previewPanel = container.querySelector('[data-testid="preview-panel"]');
          
          const formWidth = formPanel?.getBoundingClientRect().width || 0;
          const previewWidth = previewPanel?.getBoundingClientRect().width || 0;
          const totalWidth = formWidth + previewWidth;
          
          const formPercentage = (formWidth / totalWidth) * 100;
          const previewPercentage = (previewWidth / totalWidth) * 100;
          
          // Assert 35/65 split within 2% tolerance
          expect(formPercentage).toBeGreaterThanOrEqual(33);
          expect(formPercentage).toBeLessThanOrEqual(37);
          expect(previewPercentage).toBeGreaterThanOrEqual(63);
          expect(previewPercentage).toBeLessThanOrEqual(67);
        }
      ),
      { numRuns: 100 }
    );
  });
});
```

### Unit Testing Examples

**Breakpoint Behavior:**
```typescript
describe('DimensionSelector responsive behavior', () => {
  it('should show labels on desktop (768px)', () => {
    window.innerWidth = 768;
    const { getByText } = render(<DimensionSelector />);
    expect(getByText('LinkedIn')).toBeInTheDocument();
  });
  
  it('should hide labels on mobile (767px)', () => {
    window.innerWidth = 767;
    const { queryByText } = render(<DimensionSelector />);
    expect(queryByText('LinkedIn')).not.toBeInTheDocument();
  });
});
```

**Accordion Interaction:**
```typescript
describe('SpeakerSection accordion', () => {
  it('should toggle content visibility on header click', () => {
    const { getByRole, queryByPlaceholderText } = render(
      <SpeakerSection index={0} />
    );
    
    const header = getByRole('button', { name: /speaker 1/i });
    
    // Initially collapsed
    expect(queryByPlaceholderText('Speaker name')).not.toBeInTheDocument();
    
    // Click to expand
    fireEvent.click(header);
    expect(queryByPlaceholderText('Speaker name')).toBeInTheDocument();
    
    // Click to collapse
    fireEvent.click(header);
    expect(queryByPlaceholderText('Speaker name')).not.toBeInTheDocument();
  });
});
```

### Integration Testing

**End-to-End Flow:**
1. Load application on desktop viewport
2. Verify 35/65 layout split
3. Fill out form fields
4. Verify preview updates in real-time
5. Resize to mobile viewport
6. Verify vertical stack layout
7. Verify FAB appears
8. Click FAB to export
9. Verify download initiates

**Accessibility Testing:**
1. Navigate entire form using only keyboard
2. Verify all elements receive focus
3. Verify focus indicators are visible
4. Run axe-core accessibility audit
5. Verify ARIA labels with screen reader
6. Test with high contrast mode

### Visual Regression Testing

Use tools like Percy or Chromatic to capture screenshots at key breakpoints:
- 320px (small mobile)
- 375px (mobile)
- 768px (tablet)
- 1024px (desktop)
- 1440px (large desktop)

Compare against baseline to catch unintended visual changes.

### Performance Testing

**Metrics to Monitor:**
- Layout shift (CLS) during responsive transitions
- Paint time for preview updates
- Scroll performance in Form_Panel
- FAB animation smoothness

**Targets:**
- CLS < 0.1
- Preview update < 16ms (60fps)
- Scroll at 60fps
- FAB animation at 60fps

### Manual Testing Checklist

Before deployment, manually verify:
- [ ] Desktop layout (1440px): 35/65 split, sticky preview
- [ ] Tablet layout (768px): Same split, adjusted spacing
- [ ] Mobile layout (375px): Vertical stack, FAB visible
- [ ] Small mobile (320px): Icon-only selector, stacked date/time
- [ ] Form reordering: Title → Date/Time → Dimension → Speakers
- [ ] Dimension selector: Horizontal, ~60px height, icons visible
- [ ] Speaker inputs: Single row on desktop, stacked on mobile
- [ ] LinkedIn Stage: Centered canvas, shadow-lg, #F3F4F6 background
- [ ] Export button: Top-right on desktop, FAB on mobile
- [ ] Focus colors: Match accent color selection
- [ ] Touch targets: All ≥44×44px on mobile
- [ ] Keyboard navigation: All elements reachable
- [ ] Screen reader: All labels announced correctly
- [ ] Contrast: All text meets WCAG AA
- [ ] No horizontal scroll at any viewport width
- [ ] Export functionality works on all viewports
