# Implementation Plan: UI/UX Overhaul

## Overview

This implementation plan breaks down the UI/UX overhaul into 5 phases, following the architecture review strategy. Each phase builds incrementally on the previous one, with checkpoints to ensure stability before proceeding. The plan focuses on coding tasks that can be executed by an AI agent, with testing integrated throughout.

## Tasks

### Phase 1: Foundation (Layout & Form Reordering)

- [x] 1. Update root layout structure in App.tsx
  - Change layout from 40/60 to 35/65 width split
  - Add responsive flex direction (column on mobile, row on desktop)
  - Add data-testid attributes for testing
  - Update Tailwind classes: `flex flex-col lg:flex-row min-h-screen`
  - _Requirements: 1.1_

- [x] 2. Create FormHeader component
  - Create new component at `src/components/form/FormHeader.tsx`
  - Implement sticky positioning with `sticky top-0 z-10`
  - Add title "Create Your Banner" and subtitle
  - Apply Bento styling: border-bottom, padding, background
  - _Requirements: 1.4_

- [x] 3. Refactor FormPanel to use FormHeader and FormContent structure
  - Split FormPanel into header (sticky) and content (scrollable) sections
  - Move existing form components into FormContent wrapper
  - Apply `overflow-y-auto` to content section
  - Ensure proper flex layout with `flex flex-col`
  - _Requirements: 1.2, 1.4_

- [x] 4. Reorder form components in FormContent
  - Rearrange components to: WebinarDetailsForm, DateTimeForm, DimensionSelector, SpeakerCountSelector, SpeakerSections, ColorPicker, BackgroundOptions
  - Update imports and component order in FormPanel
  - Maintain existing spacing with `space-y-6`
  - _Requirements: 2.1_

- [x] 5. Update global Bento design tokens
  - Update border-radius to 12px in Tailwind config (rounded-bento)
  - Ensure border colors use #E5E7EB (gray-100) consistently
  - Update shadow utilities: shadow-soft and shadow-lg
  - Apply 8px grid system for spacing
  - _Requirements: 5.1, 5.2, 5.5_

- [ ]* 6. Write property test for layout width distribution
  - **Property 1: Responsive Layout Width Distribution**
  - **Validates: Requirements 1.1**
  - Test that Form_Panel is 35% and Preview_Panel is 65% for viewports ≥ 768px
  - Use fast-check to generate viewport widths from 768-3840px
  - Assert width percentages within 2% tolerance

- [x] 7. Checkpoint - Verify Phase 1 foundation
  - Run `npm run build` to check for TypeScript errors
  - Run `npm run lint` to check for linting issues
  - Manually test layout at 1440px, 768px viewports
  - Verify form reordering is correct
  - Ensure all tests pass, ask the user if questions arise

### Phase 2: Component Updates (Compact Controls & LinkedIn Stage)

- [x] 8. Redesign DimensionSelector as horizontal segmented control
  - [x] 8.1 Create new horizontal layout with flex
    - Replace vertical radio list with horizontal button group
    - Add icon imports from lucide-react (Linkedin, Twitter, Facebook icons)
    - Implement 60px height constraint with `h-[60px]`
    - Add responsive classes: `flex-col lg:flex-row` for icon positioning
    - _Requirements: 2.2, 3.1, 3.4_
  
  - [x] 8.2 Implement active state styling
    - Add conditional classes for selected state
    - Apply blue-50 background and action-primary border when active
    - Add shadow-soft to active button
    - Include hover states with border-action-primary
    - _Requirements: 3.2_
  
  - [x] 8.3 Add icon-only mode for mobile
    - Hide text labels on mobile with `hidden lg:inline`
    - Show dimension description on mobile with `lg:hidden`
    - Ensure icons are visible at all breakpoints
    - _Requirements: 3.5_

- [ ]* 8.4 Write property test for dimension selector active state
  - **Property 6: Active State Visual Feedback**
  - **Validates: Requirements 3.2**
  - Test that selected option has distinct styling from unselected options
  - Generate random dimension selections
  - Assert background, border, or shadow differences

- [x] 9. Update SpeakerSection for single-row inputs
  - [x] 9.1 Modify input layout to use CSS Grid
    - Wrap Name and Title inputs in grid container
    - Apply `grid grid-cols-1 lg:grid-cols-2 gap-4`
    - Ensure 50/50 width split on desktop
    - Stack vertically on mobile (grid-cols-1)
    - _Requirements: 2.3, 11.1, 11.2, 11.3_
  
  - [x] 9.2 Verify accordion functionality is preserved
    - Test expand/collapse behavior
    - Ensure ChevronDown icon rotates correctly
    - Maintain existing state management
    - _Requirements: 2.5_

- [ ]* 9.3 Write property test for single-row input layout
  - **Property 4: Single-Row Input Layout**
  - **Validates: Requirements 2.3, 11.1, 11.2**
  - Test that Name and Title fields are in single row for viewports ≥ 768px
  - Generate viewport widths from 768-3840px
  - Assert each field is 50% width within 2% tolerance

- [x] 10. Create LinkedInStage component
  - [x] 10.1 Create new component at `src/components/preview/LinkedInStage.tsx`
    - Implement centered flex container with `flex items-center justify-center`
    - Add #F3F4F6 background to parent container
    - Create inner frame with rounded-bento, border, shadow-lg
    - Add padding to frame (p-4)
    - _Requirements: 4.1, 4.2, 4.3, 4.4_
  
  - [x] 10.2 Integrate BannerCanvas into LinkedInStage
    - Import and render BannerCanvas inside frame
    - Ensure canvas maintains proper dimensions
    - Test canvas rendering in new container
    - _Requirements: 4.1_

- [x] 11. Refactor PreviewPanel to use LinkedInStage
  - [x] 11.1 Create PreviewHeader component
    - Create new component at `src/components/preview/PreviewHeader.tsx`
    - Add title "Preview" and subtitle
    - Position ExportButton at top-right using flex justify-between
    - Apply border-bottom and padding
    - _Requirements: 4.5, 10.1_
  
  - [x] 11.2 Update PreviewPanel structure
    - Make entire panel sticky with `sticky top-0 h-screen`
    - Hide on mobile with `hidden lg:flex`
    - Apply #F3F4F6 background
    - Integrate PreviewHeader and LinkedInStage
    - Remove old ExportButton positioning
    - _Requirements: 1.5, 4.3_

- [ ]* 11.3 Write unit test for LinkedIn Stage styling
  - Test that LinkedInStage has shadow-lg class
  - Test that background is #F3F4F6
  - Test that border-radius is 12px
  - Test that canvas is centered
  - _Requirements: 4.1, 4.2, 4.3, 4.4_

- [x] 12. Checkpoint - Verify Phase 2 components
  - Run `npm run build` and `npm run lint`
  - Test DimensionSelector at 1440px (horizontal with labels) and 375px (icon-only)
  - Test SpeakerSection inputs at 1024px (single row) and 375px (stacked)
  - Verify LinkedIn Stage appearance and canvas centering
  - Verify ExportButton is in PreviewHeader top-right
  - Ensure all tests pass, ask the user if questions arise

### Phase 3: Dynamic Focus Colors & Design Polish

- [x] 13. Implement dynamic focus color system
  - [x] 13.1 Create CSS custom property for accent color
    - Add `--accent-color` CSS variable to root
    - Update variable when accentColor changes in BannerContext
    - Create utility function to set CSS variable
    - _Requirements: 5.3, 6.1_
  
  - [x] 13.2 Update input focus styles to use accent color
    - Modify all input components to use `focus:ring-[var(--accent-color)]`
    - Update button focus styles
    - Update select element focus styles
    - Ensure focus rings use dynamic color
    - _Requirements: 5.3, 6.2, 6.4_
  
  - [x] 13.3 Implement contrast ratio validation
    - Create utility function `validateAccentColor` in `src/utils/colorHelpers.ts`
    - Calculate contrast ratio between accent color and white background
    - Fall back to default #3B82F6 if contrast < 3:1
    - Add console warning for invalid colors
    - _Requirements: 6.3_

- [ ]* 13.4 Write property test for dynamic focus colors
  - **Property 10: Dynamic Focus Ring Color**
  - **Validates: Requirements 5.3, 6.1, 6.2, 6.4**
  - Generate random valid hex colors
  - Test that focus ring color matches accent color for all inputs
  - Verify real-time updates when accent color changes

- [ ]* 13.5 Write property test for focus ring contrast
  - **Property 11: Focus Ring Contrast Compliance**
  - **Validates: Requirements 6.3**
  - Generate random accent colors
  - Calculate contrast ratio with white background
  - Assert ratio ≥ 3:1 for all colors

- [x] 14. Apply Bento design consistency across all components
  - [x] 14.1 Audit and update border-radius
    - Search for all rounded- classes in components
    - Replace with rounded-bento (12px)
    - Update cards, buttons, inputs, containers
    - _Requirements: 5.1_
  
  - [x] 14.2 Audit and update border colors
    - Search for all border- color classes
    - Replace with border-bento-border (#E5E7EB)
    - Ensure 1px width (border not border-2)
    - _Requirements: 5.2_
  
  - [x] 14.3 Audit and update shadows
    - Apply shadow-soft to card components
    - Apply shadow-lg to LinkedIn Stage
    - Remove inconsistent shadow classes
    - _Requirements: 5.4_
  
  - [x] 14.4 Audit and update spacing
    - Verify all spacing uses 8px grid (space-2, space-4, space-6, etc.)
    - Update padding and margin to multiples of 8px
    - Ensure consistent gap values in flex/grid layouts
    - _Requirements: 5.5_

- [ ]* 14.5 Write property test for Bento border radius consistency
  - **Property 8: Bento Border Radius Consistency**
  - **Validates: Requirements 5.1**
  - Query all card and container elements
  - Assert border-radius is 12px (within 1px tolerance)

- [ ]* 14.6 Write property test for Bento border styling
  - **Property 9: Bento Border Styling Consistency**
  - **Validates: Requirements 5.2**
  - Query all elements with borders
  - Assert color is #E5E7EB and width is 1px

- [ ]* 14.7 Write property test for spacing consistency
  - **Property 24: Layout Spacing Consistency**
  - **Validates: Requirements 5.5**
  - Query all elements with padding or margin
  - Assert all spacing values are multiples of 8px

- [x] 15. Checkpoint - Verify Phase 3 polish
  - Run `npm run build` and `npm run lint`
  - Test focus colors with different accent color selections
  - Verify all borders are 12px radius and #E5E7EB color
  - Check spacing consistency across components
  - Ensure all tests pass, ask the user if questions arise

### Phase 4: Mobile Responsive Layout

- [x] 16. Implement mobile vertical stack layout
  - [x] 16.1 Update App.tsx for mobile stacking
    - Verify `flex-col lg:flex-row` is applied
    - Test layout at 767px and below
    - Ensure panels stack vertically
    - _Requirements: 7.1_
  
  - [x] 16.2 Hide desktop PreviewPanel on mobile
    - Add `hidden lg:flex` to PreviewPanel
    - Verify panel is hidden below 768px
    - _Requirements: 7.1_

- [ ]* 16.3 Write property test for mobile vertical stack
  - **Property 12: Mobile Vertical Stack Layout**
  - **Validates: Requirements 7.1**
  - Generate viewport widths from 320-767px
  - Assert Form_Panel and Preview_Panel are stacked vertically

- [x] 17. Create MobilePreview component
  - [x] 17.1 Create collapsible preview component
    - Create new component at `src/components/preview/MobilePreview.tsx`
    - Implement accordion with expand/collapse state
    - Add sticky positioning with `sticky top-0 z-20`
    - Show mini preview in collapsed state (h-16 placeholder)
    - Show full preview when expanded with scaled canvas
    - _Requirements: 7.2_
  
  - [x] 17.2 Integrate MobilePreview into App.tsx
    - Add MobilePreview above FormPanel in mobile layout
    - Apply `lg:hidden` to show only on mobile
    - Test expand/collapse functionality
    - _Requirements: 7.2_

- [x] 18. Create FloatingActionButton component
  - [x] 18.1 Create FAB component
    - Create new component at `src/components/preview/FloatingActionButton.tsx`
    - Implement fixed positioning: `fixed bottom-6 right-6 z-30`
    - Set dimensions to 56×56px (w-14 h-14)
    - Apply rounded-full for circular shape
    - Add Download icon from lucide-react
    - _Requirements: 7.3, 8.5_
  
  - [x] 18.2 Integrate FAB into App.tsx
    - Add FAB to root layout
    - Apply `lg:hidden` to show only on mobile
    - Connect to export functionality
    - Test click handler
    - _Requirements: 7.3, 10.2_

- [ ]* 18.3 Write property test for mobile FAB visibility
  - **Property 13: Mobile FAB Visibility**
  - **Validates: Requirements 7.3, 10.2**
  - Generate viewport widths from 320-767px
  - Assert FAB is visible and positioned at bottom-right

- [x] 19. Implement small mobile optimizations
  - [x] 19.1 Update DateTimeForm for vertical stacking
    - Add breakpoint at 400px for date/time inputs
    - Apply conditional grid: `grid-cols-1 sm:grid-cols-2`
    - Test at 399px and below
    - _Requirements: 7.4_
  
  - [x] 19.2 Update DimensionSelector for icon-only on mobile
    - Verify icon-only display is working (from Phase 2)
    - Test at various mobile widths
    - _Requirements: 3.5_

- [ ]* 19.3 Write property test for small mobile date/time stacking
  - **Property 14: Small Mobile Date/Time Stacking**
  - **Validates: Requirements 7.4**
  - Generate viewport widths from 320-399px
  - Assert date and time inputs are stacked vertically

- [x] 20. Implement mobile touch target sizes
  - [x] 20.1 Audit all interactive elements for touch targets
    - Check buttons, inputs, links, FAB
    - Ensure minimum 44×44px on mobile viewports
    - Add padding where needed to meet minimum
    - Update Tailwind classes: `min-h-[44px] min-w-[44px]` on mobile
    - _Requirements: 7.5, 8.1_
  
  - [x] 20.2 Increase mobile spacing and padding
    - Add responsive padding classes: `p-4 lg:p-6`
    - Increase input padding on mobile: `py-3 lg:py-2`
    - Update button padding for better touch targets
    - _Requirements: 8.4_

- [ ]* 20.3 Write property test for mobile touch target sizes
  - **Property 15: Mobile Touch Target Size**
  - **Validates: Requirements 7.5, 8.1**
  - Query all interactive elements on mobile viewports
  - Assert dimensions are ≥ 44×44px

- [ ]* 20.4 Write property test for mobile spacing increase
  - **Property 16: Mobile Spacing Increase**
  - **Validates: Requirements 8.4**
  - Compare padding on mobile vs desktop viewports
  - Assert mobile padding is greater than desktop

- [x] 21. Implement mobile tooltip to icon conversion
  - [x] 21.1 Update components with tooltips
    - Identify components with tooltip text
    - Add info icons from lucide-react
    - Hide tooltip text on mobile: `hidden lg:inline`
    - Show info icon on mobile: `lg:hidden`
    - _Requirements: 8.2_

- [x] 22. Checkpoint - Verify Phase 4 mobile responsive
  - Run `npm run build` and `npm run lint`
  - Test at 375px: vertical stack, mini preview, FAB visible
  - Test at 320px: date/time stacked, icon-only selector
  - Verify all touch targets ≥ 44×44px
  - Test FAB export functionality
  - Ensure all tests pass, ask the user if questions arise

### Phase 5: Accessibility & Final Polish

- [x] 23. Implement keyboard navigation
  - [x] 23.1 Audit tab order
    - Test keyboard navigation through entire form
    - Ensure logical tab order
    - Verify all interactive elements are reachable
    - _Requirements: 9.1_
  
  - [x] 23.2 Add keyboard event handlers
    - Ensure Enter/Space work on custom buttons
    - Add arrow key navigation for dimension selector
    - Test Escape key for closing accordions
    - _Requirements: 9.1_

- [ ]* 23.3 Write property test for keyboard navigation completeness
  - **Property 17: Keyboard Navigation Completeness**
  - **Validates: Requirements 9.1**
  - Query all interactive elements
  - Assert each is reachable via keyboard (has tabIndex or is naturally focusable)

- [x] 24. Implement ARIA labels and accessibility attributes
  - [x] 24.1 Add ARIA labels to all inputs
    - Audit all form inputs for labels
    - Add aria-label where visual label is missing
    - Add aria-labelledby for associated labels
    - _Requirements: 9.2_
  
  - [x] 24.2 Add ARIA attributes to interactive components
    - Add aria-expanded to accordion headers
    - Add aria-pressed to toggle buttons
    - Add aria-label to icon-only buttons (FAB, dimension selector on mobile)
    - _Requirements: 9.2_
  
  - [x] 24.3 Implement ARIA live regions
    - Add aria-live="polite" to preview area
    - Add aria-live="assertive" to error messages
    - Test with screen reader
    - _Requirements: 9.5_

- [ ]* 24.4 Write property test for ARIA label presence
  - **Property 18: ARIA Label Presence**
  - **Validates: Requirements 9.2**
  - Query all form inputs and buttons
  - Assert each has accessible name (aria-label, aria-labelledby, or label)

- [x] 25. Verify WCAG contrast compliance
  - [x] 25.1 Audit text contrast ratios
    - Check all text colors against backgrounds
    - Ensure 4.5:1 for normal text, 3:1 for large text
    - Update colors that fail contrast requirements
    - _Requirements: 9.3_
  
  - [x] 25.2 Audit interactive element contrast
    - Check button colors, borders, focus rings
    - Ensure 3:1 contrast for UI components
    - Update as needed
    - _Requirements: 9.3_

- [ ]* 25.3 Write property test for WCAG contrast compliance
  - **Property 19: WCAG Contrast Compliance**
  - **Validates: Requirements 9.3**
  - Query all text and interactive elements
  - Calculate contrast ratios
  - Assert ratios meet WCAG 2.1 AA standards

- [x] 26. Implement visible focus indicators
  - [x] 26.1 Ensure all interactive elements have focus styles
    - Audit all buttons, inputs, links
    - Add focus:ring-2 and focus:ring-offset-2 where missing
    - Use dynamic accent color for focus rings
    - _Requirements: 9.4_
  
  - [x] 26.2 Test focus visibility
    - Navigate with keyboard and verify focus indicators
    - Ensure sufficient contrast for focus rings
    - Test in high contrast mode
    - _Requirements: 9.4_

- [ ]* 26.3 Write property test for focus indicator visibility
  - **Property 20: Focus Indicator Visibility**
  - **Validates: Requirements 9.4**
  - Query all interactive elements
  - Simulate focus event
  - Assert visible focus indicator appears (outline, ring, or border change)

- [x] 27. Verify export button positioning and visibility
  - [x] 27.1 Test desktop export button positioning
    - Verify button is in PreviewHeader top-right at ≥768px
    - Test at various desktop widths
    - _Requirements: 10.1_
  
  - [x] 27.2 Test mobile FAB positioning
    - Verify FAB is visible at <768px
    - Test at various mobile widths
    - _Requirements: 10.2_
  
  - [x] 27.3 Test persistent visibility
    - Scroll form panel and verify export button stays visible
    - Test on both desktop and mobile
    - _Requirements: 10.3_

- [ ]* 27.4 Write property test for export button persistent visibility
  - **Property 22: Export Button Persistent Visibility**
  - **Validates: Requirements 10.3**
  - Simulate various scroll positions
  - Assert export button (header or FAB) remains visible in viewport

- [x] 28. Prevent horizontal scrolling
  - [x] 28.1 Audit for overflow issues
    - Test at all breakpoints: 320px, 375px, 768px, 1024px, 1440px
    - Check for elements exceeding viewport width
    - Add overflow-x-hidden where needed
    - _Requirements: 12.5_
  
  - [x] 28.2 Fix any overflow issues
    - Update max-width constraints
    - Adjust padding/margin on edge elements
    - Test canvas dimensions don't cause overflow
    - _Requirements: 12.5_

- [ ]* 28.3 Write property test for horizontal scroll prevention
  - **Property 25: Horizontal Scroll Prevention**
  - **Validates: Requirements 12.5**
  - Generate viewport widths from 320-3840px
  - Assert document width equals viewport width (no horizontal scroll)

- [x] 29. Final integration testing
  - [x] 29.1 Test complete user flow on desktop
    - Load app at 1440px
    - Fill out all form fields
    - Verify preview updates in real-time
    - Export banner
    - Verify download works
  
  - [x] 29.2 Test complete user flow on mobile
    - Load app at 375px
    - Expand mobile preview
    - Fill out form fields
    - Verify preview updates
    - Tap FAB to export
    - Verify download works
  
  - [x] 29.3 Test responsive transitions
    - Resize from desktop to mobile and back
    - Verify smooth layout transitions
    - Check for layout shift issues
    - Test at all breakpoints

- [x] 30. Final checkpoint - Complete verification
  - Run `npm run build` - must pass without errors
  - Run `npm run lint` - must pass without warnings
  - Run all property tests - must pass
  - Run all unit tests - must pass
  - Manual accessibility audit with screen reader
  - Manual testing at all breakpoints
  - Verify export functionality on all viewports
  - Check browser console for errors
  - Ensure all tests pass, ask the user if questions arise

## Notes

- Tasks marked with `*` are optional property-based tests that can be skipped for faster MVP
- Each task references specific requirements for traceability
- Checkpoints ensure incremental validation after each phase
- Property tests validate universal correctness properties across input ranges
- Unit tests validate specific examples and edge cases
- All interactive elements must maintain accessibility standards
- Export functionality must be tested manually after UI changes
- Use getDiagnostics tool instead of bash commands for TypeScript checking
