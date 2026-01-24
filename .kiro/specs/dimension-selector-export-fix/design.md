# Design Document: Dimension Selector and Export Fix

## Overview

This design addresses critical export functionality bugs and adds dimension selection capabilities to the LoomGraph banner generator. The current export system produces images with garbled fonts and broken layouts due to improper handling of font loading and canvas scaling. Additionally, users need the ability to generate banners in multiple dimensions optimized for different social media contexts.

The solution involves:
1. Fixing font loading and rendering in the export pipeline
2. Correcting layout rendering to match preview exactly
3. Adding a dimension selector UI component
4. Extending the banner state to include dimension configuration
5. Adapting templates to support multiple aspect ratios
6. Updating export logic to handle variable dimensions

## Architecture

### Component Structure

```
src/
├── components/
│   ├── form/
│   │   └── DimensionSelector.tsx          # NEW: Dimension selection UI
│   ├── preview/
│   │   └── ExportButton.tsx               # MODIFIED: Enhanced export logic
│   └── templates/
│       ├── ProfessionalTemplate.tsx       # MODIFIED: Dimension-aware layout
│       ├── PanelTemplate.tsx              # MODIFIED: Dimension-aware layout
│       └── DuoTemplate.tsx                # MODIFIED: Dimension-aware layout
├── context/
│   └── BannerContext.tsx                  # MODIFIED: Add dimension state
├── types/
│   └── banner.types.ts                    # MODIFIED: Add dimension types
└── utils/
    └── exportHelpers.ts                   # MODIFIED: Dimension-aware filename
```

### Data Flow

1. User selects dimension → DimensionSelector updates BannerState
2. BannerState change triggers Preview_Canvas re-render with new aspect ratio
3. Templates receive dimension prop and adapt layout accordingly
4. Export button uses dimension from state to configure html2canvas
5. Exported image filename includes dimension specification


## Components and Interfaces

### DimensionSelector Component

A new form component that allows users to choose banner dimensions.

**Location:** `src/components/form/DimensionSelector.tsx`

**Props Interface:**
```typescript
interface DimensionSelectorProps {
  selectedDimension: BannerDimension;
  onDimensionChange: (dimension: BannerDimension) => void;
}
```

**UI Structure:**
- Radio button group with three options
- Each option displays: dimension label, pixel dimensions, and use case description
- Visual feedback for selected state
- Positioned near the top of FormPanel for easy access

**Behavior:**
- Calls `onDimensionChange` when user selects a dimension
- Maintains single selection (radio button pattern)
- Provides hover states for better UX

### Modified ExportButton Component

Enhanced export logic to fix font rendering and support variable dimensions.

**Key Changes:**
1. **Font Loading:** Use `document.fonts.ready` promise before rendering
2. **Dimension-Aware Rendering:** Read dimension from BannerState and configure html2canvas accordingly
3. **Proper Scaling:** Remove preview scale transform, render at target dimensions, then apply 2x scale
4. **Filename Generation:** Include dimension specification in filename

**Export Pipeline:**
```
1. Get dimension from state
2. Wait for document.fonts.ready
3. Wait for all images to load
4. Remove preview scale transform temporarily
5. Configure html2canvas with target dimensions and 2x scale
6. Generate canvas
7. Restore preview scale transform
8. Convert to blob
9. Download with dimension-aware filename
```


### Modified Template Components

All three templates (ProfessionalTemplate, PanelTemplate, DuoTemplate) need dimension-aware layouts.

**New Props:**
```typescript
interface TemplateProps {
  // ... existing props
  dimension: BannerDimension; // NEW
}
```

**Layout Adaptation Strategy:**

**Landscape (1200×627):**
- Horizontal layout (current design)
- Content flows left-to-right
- Wide title area with side-by-side elements

**Square (1080×1080):**
- Balanced layout
- Centered content with equal spacing
- Slightly larger fonts for readability
- Vertical stacking where appropriate

**Portrait (1080×1350):**
- Vertical layout
- Top-to-bottom content flow
- Larger vertical spacing
- Full-width elements

**Implementation Approach:**
- Use conditional rendering based on dimension prop
- Apply dimension-specific CSS classes
- Adjust font sizes, spacing, and element positioning
- Maintain visual hierarchy across all dimensions

### Modified BannerContext

**State Extension:**
```typescript
interface BannerState {
  // ... existing fields
  dimension: BannerDimension; // NEW: Selected banner dimension
}
```

**New Context Method:**
```typescript
updateDimension: (dimension: BannerDimension) => void;
```

**Default Value:** `{ width: 1200, height: 627, label: 'landscape' }`


## Data Models

### BannerDimension Type

```typescript
export interface BannerDimension {
  width: number;
  height: number;
  label: 'landscape' | 'square' | 'portrait';
  description: string;
}

export const BANNER_DIMENSIONS: Record<string, BannerDimension> = {
  landscape: {
    width: 1200,
    height: 627,
    label: 'landscape',
    description: 'Ideal for shared link previews',
  },
  square: {
    width: 1080,
    height: 1080,
    label: 'square',
    description: 'Works best for image-only posts',
  },
  portrait: {
    width: 1080,
    height: 1350,
    label: 'portrait',
    description: 'Works best for image-only posts',
  },
};
```

### Updated BannerState

```typescript
export interface BannerState {
  // Webinar Details
  title: string;
  speakerCount: 1 | 2 | 3;
  speakers: Speaker[];
  
  // Schedule
  date: string;
  time: string;
  timezone: 'PT' | 'ET' | 'GMT' | 'UTC' | 'CET';
  showTimezone: boolean;
  
  // Visual Customization
  template: 'professional' | 'duo' | 'panel';
  accentColor: string;
  backgroundId: string;
  customBackgroundUrl: string | null;
  customBackgroundFile: File | null;
  
  // NEW: Dimension Selection
  dimension: BannerDimension;
}
```

### Export Configuration

```typescript
interface ExportConfig {
  dimension: BannerDimension;
  scale: number; // Always 2 for high DPI
  format: 'png';
  quality: number; // 1.0 for PNG
}
```


## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system—essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

### Property 1: Font Loading Before Export

*For any* banner state, when the Export_System initiates export, the system should wait for `document.fonts.ready` to resolve before proceeding with canvas rendering.

**Validates: Requirements 1.1**

### Property 2: Canvas Dimensions Match Target

*For any* selected dimension, when the Export_System renders the canvas, the canvas width and height should exactly match the dimension's width and height (before 2x scaling is applied).

**Validates: Requirements 2.1**

### Property 3: Style Consistency Between Preview and Export

*For any* banner element, the computed CSS styles applied during export should match the computed CSS styles in the preview canvas.

**Validates: Requirements 2.2**

### Property 4: Color Value Preservation

*For any* color value (accent color, background color) in the banner state, the exported image should contain the exact same color values without conversion or loss.

**Validates: Requirements 2.4**

### Property 5: Dimension State Updates

*For any* dimension selection, when a user selects a dimension through the DimensionSelector, the Banner_State should update to store the selected dimension object.

**Validates: Requirements 3.2**

### Property 6: Preview Aspect Ratio Updates

*For any* dimension in the banner state, the Preview_Canvas should display with an aspect ratio equal to dimension.width / dimension.height.

**Validates: Requirements 3.3**

### Property 7: Template Dimension Adaptation

*For any* dimension and template combination, when the Template_Engine renders a template, it should receive the dimension prop and apply dimension-specific layout rules.

**Validates: Requirements 4.1**

### Property 8: Aspect Ratio Preservation During Scaling

*For any* dimension and scale factor, when the Preview_Canvas applies scaling for display, the resulting aspect ratio should equal the original dimension aspect ratio.

**Validates: Requirements 5.2**

### Property 9: Consistent Scaling Calculation

*For any* dimension, the scaling factor calculation used to fit the preview in the viewport should follow a consistent formula based on available space and dimension size.

**Validates: Requirements 5.4**

### Property 10: 2x Resolution Export

*For any* selected dimension, when the Export_System generates a PNG, the output image dimensions should be exactly 2 × dimension.width by 2 × dimension.height.

**Validates: Requirements 6.1**

### Property 11: Filename Includes Dimensions

*For any* banner export, the generated filename should contain a substring matching the pattern "{width}x{height}" where width and height are the selected dimension values.

**Validates: Requirements 8.1**

### Property 12: Filename Format Pattern

*For any* banner export, the generated filename should match the pattern "webinar-banner-{dimension}-{timestamp}.png" where dimension is in the format "WIDTHxHEIGHT".

**Validates: Requirements 8.5**


## Error Handling

### Font Loading Failures

**Scenario:** Fonts fail to load before export timeout

**Handling:**
1. Set a timeout (5 seconds) for `document.fonts.ready`
2. If timeout occurs, log warning to console
3. Proceed with export using fallback fonts (system sans-serif)
4. Display user-friendly error message suggesting retry

**Implementation:**
```typescript
const fontLoadPromise = Promise.race([
  document.fonts.ready,
  new Promise((_, reject) => 
    setTimeout(() => reject(new Error('Font load timeout')), 5000)
  )
]);

try {
  await fontLoadPromise;
} catch (error) {
  console.warn('Fonts failed to load, using fallback:', error);
  // Continue with export
}
```

### Image Loading Failures

**Scenario:** Headshot or logo images fail to load during export

**Handling:**
1. Wait for each image with individual timeout (10 seconds)
2. If image fails, log warning and continue
3. Export will show placeholder or initials instead of failed image
4. No blocking of export process

### Invalid Dimension Selection

**Scenario:** Dimension state becomes corrupted or invalid

**Handling:**
1. Validate dimension object has required fields (width, height, label)
2. If invalid, reset to default landscape dimension
3. Log error to console for debugging
4. Display toast notification to user

### Canvas Rendering Failures

**Scenario:** html2canvas fails to generate canvas

**Handling:**
1. Catch html2canvas errors
2. Provide specific error messages based on error type:
   - CORS errors → "Image loading issue. Try re-uploading images."
   - Empty canvas → "Preview not visible. Ensure content is displayed."
   - Timeout → "Export took too long. Try again."
3. Allow user to retry export
4. Log full error details to console

### Blob Creation Failures

**Scenario:** Canvas to blob conversion fails

**Handling:**
1. Check if blob size is > 0
2. If blob is empty, throw descriptive error
3. Retry once before showing error to user
4. Provide fallback suggestion to screenshot the preview


## Testing Strategy

### Dual Testing Approach

This feature requires both unit tests and property-based tests for comprehensive coverage:

**Unit Tests** focus on:
- Specific dimension selection examples (landscape, square, portrait)
- Font loading timeout scenarios
- Image loading failure handling
- Filename generation for each dimension
- UI component rendering and interaction
- Error handling edge cases

**Property Tests** focus on:
- Font loading always completes before export (for any banner state)
- Canvas dimensions always match selected dimension (for any dimension)
- Aspect ratio preservation during scaling (for any dimension and scale)
- 2x resolution export (for any dimension)
- Filename pattern compliance (for any banner state and dimension)
- State updates on dimension change (for any dimension selection)

### Property-Based Testing Configuration

**Library:** Use `fast-check` for TypeScript property-based testing

**Configuration:**
- Minimum 100 iterations per property test
- Each test tagged with feature name and property number
- Tag format: `Feature: dimension-selector-export-fix, Property {N}: {description}`

**Example Test Structure:**
```typescript
import fc from 'fast-check';

describe('Feature: dimension-selector-export-fix', () => {
  it('Property 10: 2x Resolution Export', () => {
    fc.assert(
      fc.property(
        fc.constantFrom(
          BANNER_DIMENSIONS.landscape,
          BANNER_DIMENSIONS.square,
          BANNER_DIMENSIONS.portrait
        ),
        async (dimension) => {
          const exportedDimensions = await exportBanner(dimension);
          expect(exportedDimensions.width).toBe(dimension.width * 2);
          expect(exportedDimensions.height).toBe(dimension.height * 2);
        }
      ),
      { numRuns: 100 }
    );
  });
});
```

### Unit Test Coverage

**DimensionSelector Component:**
- Renders three dimension options
- Shows correct labels and descriptions
- Updates state on selection
- Displays selected state visually
- Defaults to landscape when no selection

**ExportButton Component:**
- Waits for fonts before export
- Handles font loading timeout
- Generates correct filename with dimensions
- Applies 2x scaling
- Handles image loading failures
- Shows appropriate error messages

**Template Components:**
- Renders at correct dimensions
- Adapts layout for landscape
- Adapts layout for square
- Adapts layout for portrait
- Maintains visual hierarchy

**BannerContext:**
- Updates dimension state correctly
- Provides default dimension
- Validates dimension object

### Integration Testing

**End-to-End Flow:**
1. User selects dimension → State updates → Preview updates
2. User fills form → Preview shows correct aspect ratio
3. User clicks export → Font loading → Image loading → Canvas generation → Download
4. Downloaded file has correct dimensions and filename

**Manual Testing Requirements:**
- Test actual download in browser for each dimension
- Verify downloaded images match preview exactly
- Check font rendering quality in exported images
- Test with different browsers (Chrome, Firefox, Safari)
- Verify aspect ratios are correct for all dimensions
- Test with various content (long titles, multiple speakers, different images)

