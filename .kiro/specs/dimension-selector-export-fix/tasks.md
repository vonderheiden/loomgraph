# Implementation Plan: Dimension Selector and Export Fix

## Overview

This implementation plan breaks down the dimension selector and export fix feature into discrete coding tasks. Each task builds incrementally, with testing integrated throughout. The focus is on fixing critical export bugs first, then adding dimension selection capabilities, and finally adapting templates to support multiple aspect ratios.

## Tasks

- [ ] 1. Update type definitions for dimension support
  - Add `BannerDimension` interface to `banner.types.ts`
  - Add `BANNER_DIMENSIONS` constant with three dimension configurations
  - Update `BannerState` interface to include `dimension` field
  - Update `TemplateProps` interfaces to include `dimension` prop
  - _Requirements: 3.1, 3.4_

- [ ] 2. Fix font loading in export system
  - [ ] 2.1 Implement font loading wait in ExportButton
    - Add `document.fonts.ready` promise before html2canvas call
    - Implement 5-second timeout with fallback handling
    - Add console logging for font loading status
    - _Requirements: 1.1, 1.3_
  
  - [ ]* 2.2 Write property test for font loading
    - **Property 1: Font Loading Before Export**
    - **Validates: Requirements 1.1**
  
  - [ ]* 2.3 Write unit test for font loading timeout
    - Test timeout scenario with mock fonts API
    - Verify fallback behavior
    - _Requirements: 1.3_

- [ ] 3. Fix canvas rendering dimensions
  - [ ] 3.1 Update ExportButton to use exact target dimensions
    - Remove hardcoded 1200x627 dimensions
    - Read dimension from banner state
    - Configure html2canvas with state dimensions
    - Maintain 2x scale for high DPI
    - _Requirements: 2.1, 6.1_
  
  - [ ]* 3.2 Write property test for canvas dimensions
    - **Property 2: Canvas Dimensions Match Target**
    - **Validates: Requirements 2.1**
  
  - [ ]* 3.3 Write property test for 2x resolution
    - **Property 10: 2x Resolution Export**
    - **Validates: Requirements 6.1**


- [ ] 4. Update BannerContext for dimension state
  - [ ] 4.1 Add dimension field to initial state
    - Set default to landscape dimension (1200×627)
    - Import BANNER_DIMENSIONS constant
    - _Requirements: 3.4_
  
  - [ ] 4.2 Implement updateDimension method
    - Add method to BannerContextType interface
    - Implement using useCallback for optimization
    - Update state immutably
    - _Requirements: 3.2_
  
  - [ ]* 4.3 Write property test for dimension state updates
    - **Property 5: Dimension State Updates**
    - **Validates: Requirements 3.2**
  
  - [ ]* 4.4 Write unit tests for BannerContext dimension methods
    - Test default dimension is landscape
    - Test updateDimension updates state correctly
    - Test state immutability
    - _Requirements: 3.2, 3.4_

- [ ] 5. Create DimensionSelector component
  - [ ] 5.1 Implement DimensionSelector UI component
    - Create component file in `src/components/form/`
    - Implement radio button group with three options
    - Display dimension labels, pixel dimensions, and descriptions
    - Add hover and selected state styling
    - Use Bento design system colors
    - _Requirements: 3.1, 3.5, 7.1, 7.4, 7.5_
  
  - [ ] 5.2 Connect DimensionSelector to BannerContext
    - Use `useBannerState` hook
    - Call `updateDimension` on selection change
    - Display currently selected dimension
    - _Requirements: 3.2_
  
  - [ ]* 5.3 Write unit tests for DimensionSelector
    - Test renders three dimension options
    - Test displays correct labels and descriptions
    - Test calls onDimensionChange when selected
    - Test shows selected state visually
    - _Requirements: 3.1, 3.5, 7.4, 7.5_

- [ ] 6. Integrate DimensionSelector into FormPanel
  - Add DimensionSelector near top of form (after WebinarDetailsForm)
  - Add section heading "Banner Dimensions"
  - Ensure proper spacing with Bento design system
  - _Requirements: 7.1_

- [ ] 7. Checkpoint - Test dimension selection flow
  - Ensure all tests pass, ask the user if questions arise.


- [ ] 8. Update preview canvas to support dynamic dimensions
  - [ ] 8.1 Modify BannerCanvas to use dimension from state
    - Read dimension from BannerContext
    - Apply dimension width and height to canvas container
    - Calculate appropriate scale factor for preview display
    - Maintain aspect ratio during scaling
    - _Requirements: 3.3, 5.2, 5.4_
  
  - [ ]* 8.2 Write property test for preview aspect ratio
    - **Property 6: Preview Aspect Ratio Updates**
    - **Validates: Requirements 3.3**
  
  - [ ]* 8.3 Write property test for aspect ratio preservation
    - **Property 8: Aspect Ratio Preservation During Scaling**
    - **Validates: Requirements 5.2**
  
  - [ ]* 8.4 Write property test for consistent scaling
    - **Property 9: Consistent Scaling Calculation**
    - **Validates: Requirements 5.4**

- [ ] 9. Update filename generation for dimension-aware exports
  - [ ] 9.1 Modify generateFileName in exportHelpers.ts
    - Accept dimension parameter
    - Include dimension in format "WIDTHxHEIGHT"
    - Follow pattern: "webinar-banner-{dimension}-{timestamp}.png"
    - _Requirements: 8.1, 8.5_
  
  - [ ]* 9.2 Write property test for filename includes dimensions
    - **Property 11: Filename Includes Dimensions**
    - **Validates: Requirements 8.1**
  
  - [ ]* 9.3 Write property test for filename format pattern
    - **Property 12: Filename Format Pattern**
    - **Validates: Requirements 8.5**
  
  - [ ]* 9.4 Write unit tests for filename generation
    - Test landscape dimension filename
    - Test square dimension filename
    - Test portrait dimension filename
    - _Requirements: 8.2, 8.3, 8.4_

- [ ] 10. Update ExportButton to use dimension-aware filename
  - Modify ExportButton to pass dimension to generateFileName
  - Update html2canvas configuration to use dimension from state
  - Ensure 2x scale is applied correctly
  - _Requirements: 6.1, 8.1_

- [ ] 11. Checkpoint - Test export functionality
  - Ensure all tests pass, ask the user if questions arise.


- [ ] 12. Adapt ProfessionalTemplate for multiple dimensions
  - [ ] 12.1 Add dimension prop to ProfessionalTemplate
    - Update interface to include dimension prop
    - Pass dimension from BannerCanvas
    - _Requirements: 4.1_
  
  - [ ] 12.2 Implement dimension-specific layouts
    - Create conditional rendering based on dimension.label
    - Landscape: Keep current horizontal layout
    - Square: Implement balanced centered layout
    - Portrait: Implement vertical stacked layout
    - Adjust font sizes and spacing for each dimension
    - _Requirements: 4.1, 4.2, 4.3, 4.4_
  
  - [ ]* 12.3 Write property test for template adaptation
    - **Property 7: Template Dimension Adaptation**
    - **Validates: Requirements 4.1**
  
  - [ ]* 12.4 Write unit tests for ProfessionalTemplate dimensions
    - Test renders correctly at landscape dimensions
    - Test renders correctly at square dimensions
    - Test renders correctly at portrait dimensions
    - _Requirements: 4.2, 4.3, 4.4_

- [ ] 13. Adapt DuoTemplate for multiple dimensions
  - [ ] 13.1 Add dimension prop to DuoTemplate
    - Update interface to include dimension prop
    - Pass dimension from BannerCanvas
    - _Requirements: 4.1_
  
  - [ ] 13.2 Implement dimension-specific layouts for two speakers
    - Landscape: Side-by-side speaker layout
    - Square: Diagonal or stacked speaker layout
    - Portrait: Vertical stacked speaker layout
    - Adjust spacing and sizing appropriately
    - _Requirements: 4.1, 4.2, 4.3, 4.4_
  
  - [ ]* 13.3 Write unit tests for DuoTemplate dimensions
    - Test renders correctly at landscape dimensions
    - Test renders correctly at square dimensions
    - Test renders correctly at portrait dimensions
    - _Requirements: 4.2, 4.3, 4.4_

- [ ] 14. Adapt PanelTemplate for multiple dimensions
  - [ ] 14.1 Add dimension prop to PanelTemplate
    - Update interface to include dimension prop
    - Pass dimension from BannerCanvas
    - _Requirements: 4.1_
  
  - [ ] 14.2 Implement dimension-specific layouts for three speakers
    - Landscape: Horizontal row of three speakers
    - Square: Triangle or grid layout
    - Portrait: Vertical stack of three speakers
    - Adjust spacing and sizing appropriately
    - _Requirements: 4.1, 4.2, 4.3, 4.4_
  
  - [ ]* 14.3 Write unit tests for PanelTemplate dimensions
    - Test renders correctly at landscape dimensions
    - Test renders correctly at square dimensions
    - Test renders correctly at portrait dimensions
    - _Requirements: 4.2, 4.3, 4.4_

- [ ] 15. Checkpoint - Test all templates at all dimensions
  - Ensure all tests pass, ask the user if questions arise.


- [ ] 16. Add error handling for export edge cases
  - [ ] 16.1 Implement font loading timeout handling
    - Add 5-second timeout for font loading
    - Log warning on timeout
    - Continue with fallback fonts
    - _Requirements: 1.3_
  
  - [ ] 16.2 Implement image loading error handling
    - Add individual timeouts for each image (10 seconds)
    - Log warnings for failed images
    - Continue export with placeholders
    - _Requirements: 2.1_
  
  - [ ] 16.3 Add dimension validation
    - Validate dimension object has required fields
    - Reset to default if invalid
    - Log error and show user notification
    - _Requirements: 3.4_
  
  - [ ]* 16.4 Write unit tests for error handling
    - Test font loading timeout
    - Test image loading failure
    - Test invalid dimension handling
    - _Requirements: 1.3_

- [ ] 17. Update export error messages
  - Improve error messages for CORS issues
  - Add specific guidance for empty canvas errors
  - Add retry suggestions for timeout errors
  - Ensure user-friendly language
  - _Requirements: 1.3_

- [ ] 18. Integration testing and polish
  - [ ] 18.1 Test complete user flow
    - Select dimension → Preview updates → Export downloads
    - Test with all three dimensions
    - Test with different templates
    - Test with various content (long titles, multiple speakers)
    - _Requirements: 3.2, 3.3, 6.1, 8.1_
  
  - [ ] 18.2 Verify export quality
    - Check font rendering in exported images
    - Verify layout matches preview exactly
    - Confirm dimensions are correct (2x resolution)
    - Test with different browsers
    - _Requirements: 1.4, 2.3, 6.1_
  
  - [ ] 18.3 Polish UI and UX
    - Ensure dimension selector is visually clear
    - Add loading states during export
    - Verify responsive behavior
    - Check accessibility (keyboard navigation, ARIA labels)
    - _Requirements: 7.3, 7.4_

- [ ] 19. Final checkpoint - Complete testing
  - Run `npm run build` - must pass without errors
  - Run `npm run lint` - must pass without warnings
  - Check TypeScript diagnostics with getDiagnostics tool
  - Test actual download functionality in browser for all dimensions
  - Verify downloaded files match preview exactly
  - Check file dimensions are correct (2400×1254, 2160×2160, 2160×2700)
  - Verify text is readable and fonts render correctly
  - Test with realistic user scenarios
  - Ensure all tests pass, ask the user if questions arise.

## Notes

- Tasks marked with `*` are optional and can be skipped for faster MVP
- Each task references specific requirements for traceability
- Checkpoints ensure incremental validation at key milestones
- Property tests validate universal correctness properties
- Unit tests validate specific examples and edge cases
- Manual testing is critical for export functionality - must verify actual downloads
- Focus on fixing export bugs first (tasks 1-3) before adding dimension selection
- Template adaptation (tasks 12-14) can be done incrementally per template
