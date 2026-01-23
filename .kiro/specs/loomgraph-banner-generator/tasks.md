# LoomGraph - Implementation Tasks

## Phase 1: Project Setup & Foundation

- [ ] 1. Initialize React + TypeScript Project
  - [ ] 1.1 Create Vite project with React + TypeScript template
  - [ ] 1.2 Install core dependencies (Tailwind CSS, Lucide React)
  - [ ] 1.3 Configure Tailwind with custom Bento theme
  - [ ] 1.4 Set up project structure (components, context, utils, types)
  - [ ] 1.5 Configure TypeScript strict mode
  - [ ] 1.6 Set up ESLint and Prettier

- [ ] 2. Create Type Definitions
  - [ ] 2.1 Define BannerState interface
  - [ ] 2.2 Define TemplateConfig interfaces
  - [ ] 2.3 Define form validation types
  - [ ] 2.4 Create utility types for canvas rendering

- [ ] 3. Implement Banner Context
  - [ ] 3.1 Create BannerContext with initial state
  - [ ] 3.2 Implement updateField function
  - [ ] 3.3 Implement resetState function
  - [ ] 3.4 Add context provider wrapper
  - [ ] 3.5 Create useBannerState custom hook

## Phase 2: Form Components

- [ ] 4. Build WebinarDetailsForm Component
  - [ ] 4.1 Create form layout with Bento card styling
  - [ ] 4.2 Implement title input with character count
  - [ ] 4.3 Implement speaker name input
  - [ ] 4.4 Implement speaker title/company input
  - [ ] 4.5 Add real-time validation feedback
  - [ ] 4.6 Connect inputs to BannerContext

- [ ] 5. Build DateTimeForm Component
  - [ ] 5.1 Implement date picker input
  - [ ] 5.2 Implement time picker input
  - [ ] 5.3 Create timezone toggle switch
  - [ ] 5.4 Create timezone dropdown selector
  - [ ] 5.5 Add formatted preview display
  - [ ] 5.6 Connect to BannerContext

- [ ] 6. Build HeadshotUploader Component
  - [ ] 6.1 Create drag-and-drop upload zone
  - [ ] 6.2 Implement file input with validation
  - [ ] 6.3 Add image preview with circular crop
  - [ ] 6.4 Implement replace/remove functionality
  - [ ] 6.5 Add file size and format validation
  - [ ] 6.6 Connect to BannerContext

- [ ] 7. Build TemplateSelector Component
  - [ ] 7.1 Create horizontal thumbnail gallery layout
  - [ ] 7.2 Design template thumbnail previews
  - [ ] 7.3 Implement active state indication
  - [ ] 7.4 Add hover effects and transitions
  - [ ] 7.5 Connect to BannerContext

- [ ] 8. Build ColorPicker Component
  - [ ] 8.1 Implement color input with visual picker
  - [ ] 8.2 Add hex/RGB input support
  - [ ] 8.3 Create preset color swatches
  - [ ] 8.4 Add real-time preview updates
  - [ ] 8.5 Connect to BannerContext

- [ ] 9. Build FormPanel Container
  - [ ] 9.1 Create left column layout
  - [ ] 9.2 Organize form sections into cards
  - [ ] 9.3 Add section headers and spacing
  - [ ] 9.4 Implement responsive behavior
  - [ ] 9.5 Add scroll handling for long forms

## Phase 3: Canvas Rendering Engine

- [ ] 10. Implement Canvas Utilities
  - [ ] 10.1 Create text scaling algorithm
  - [ ] 10.2 Implement circular image clipping
  - [ ] 10.3 Create text measurement utilities
  - [ ] 10.4 Add color manipulation helpers
  - [ ] 10.5 Implement canvas initialization

- [ ] 11. Build MinimalistTemplate
  - [ ] 11.1 Define template configuration
  - [ ] 11.2 Implement background rendering
  - [ ] 11.3 Implement title rendering with scaling
  - [ ] 11.4 Implement speaker info rendering
  - [ ] 11.5 Implement date/time rendering
  - [ ] 11.6 Implement headshot rendering
  - [ ] 11.7 Add accent line at bottom

- [ ] 12. Build BoldFounderTemplate
  - [ ] 12.1 Define template configuration
  - [ ] 12.2 Implement background with color blocks
  - [ ] 12.3 Implement bold title rendering
  - [ ] 12.4 Implement speaker info with emphasis
  - [ ] 12.5 Implement date/time rendering
  - [ ] 12.6 Implement headshot with accent border
  - [ ] 12.7 Add strong visual hierarchy

- [ ] 13. Build DuoTemplate
  - [ ] 13.1 Define template configuration
  - [ ] 13.2 Implement split layout background
  - [ ] 13.3 Implement dual headshot positioning
  - [ ] 13.4 Implement shared title rendering
  - [ ] 13.5 Implement balanced speaker info
  - [ ] 13.6 Implement date/time rendering
  - [ ] 13.7 Add collaborative design elements

- [ ] 14. Build TemplateRenderer Component
  - [ ] 14.1 Create template factory pattern
  - [ ] 14.2 Implement template switching logic
  - [ ] 14.3 Add shared rendering utilities
  - [ ] 14.4 Implement accent color application
  - [ ] 14.5 Add error handling for render failures

- [ ] 15. Build BannerCanvas Component
  - [ ] 15.1 Initialize HTML5 Canvas element
  - [ ] 15.2 Set canvas dimensions (1200x627 @2x)
  - [ ] 15.3 Connect to BannerContext state
  - [ ] 15.4 Implement real-time re-render on state change
  - [ ] 15.5 Add debouncing for text input updates
  - [ ] 15.6 Integrate TemplateRenderer
  - [ ] 15.7 Add loading states

## Phase 4: Preview & Export

- [ ] 16. Build PreviewPanel Component
  - [ ] 16.1 Create right/center column layout
  - [ ] 16.2 Add canvas container with proper sizing
  - [ ] 16.3 Implement responsive preview scaling
  - [ ] 16.4 Add preview border and shadow
  - [ ] 16.5 Include export button placement

- [ ] 17. Implement Export Functionality
  - [ ] 17.1 Create canvas-to-blob conversion
  - [ ] 17.2 Implement file naming logic
  - [ ] 17.3 Create download trigger mechanism
  - [ ] 17.4 Add export quality settings (PNG @2x)
  - [ ] 17.5 Implement success feedback
  - [ ] 17.6 Add error handling for export failures

- [ ] 18. Build ExportButton Component
  - [ ] 18.1 Create button with Bento styling
  - [ ] 18.2 Add download icon from Lucide
  - [ ] 18.3 Implement loading state during export
  - [ ] 18.4 Add success animation
  - [ ] 18.5 Connect to export functionality

## Phase 5: Main App Integration

- [ ] 19. Build App Component
  - [ ] 19.1 Create root component structure
  - [ ] 19.2 Implement Bento Box two-column layout
  - [ ] 19.3 Wrap with BannerProvider
  - [ ] 19.4 Add FormPanel to left column
  - [ ] 19.5 Add PreviewPanel to right column
  - [ ] 19.6 Implement responsive breakpoints
  - [ ] 19.7 Add global styles and fonts

- [ ] 20. Implement Validation System
  - [ ] 20.1 Create validation utility functions
  - [ ] 20.2 Add title length validation (1-100 chars)
  - [ ] 20.3 Add speaker name validation (1-50 chars)
  - [ ] 20.4 Add date validation (future dates only)
  - [ ] 20.5 Add time format validation
  - [ ] 20.6 Add file upload validation (5MB, JPG/PNG)
  - [ ] 20.7 Implement error message display

## Phase 6: Testing & Quality Assurance

- [ ] 21. Write Unit Tests
  - [ ] 21.1 Test text scaling algorithm
  - [ ] 21.2 Test file upload validation
  - [ ] 21.3 Test state management functions
  - [ ] 21.4 Test export file naming logic
  - [ ] 21.5 Test color manipulation utilities

- [ ] 22. Write Property-Based Tests
  - [ ] 22.1 Property 1.1: Form input preservation
  - [ ] 22.2 Property 1.2: Real-time update consistency
  - [ ] 22.3 Property 2.1: Image format handling
  - [ ] 22.4 Property 3.1: Timezone formatting
  - [ ] 22.5 Property 4.1: Template dimension invariance
  - [ ] 22.6 Property 5.1: Color propagation
  - [ ] 22.7 Property 6.1: Text scaling bounds
  - [ ] 22.8 Property 7.1: Export fidelity

- [ ] 23. Write Integration Tests
  - [ ] 23.1 Test form-to-canvas data flow
  - [ ] 23.2 Test template switching
  - [ ] 23.3 Test color customization
  - [ ] 23.4 Test export functionality
  - [ ] 23.5 Test error handling

- [ ] 24. Implement Accessibility Features
  - [ ] 24.1 Add ARIA labels to all interactive elements
  - [ ] 24.2 Implement keyboard navigation
  - [ ] 24.3 Add focus indicators
  - [ ] 24.4 Test color contrast ratios
  - [ ] 24.5 Add screen reader announcements
  - [ ] 24.6 Implement keyboard shortcuts

## Phase 7: Polish & Optimization

- [ ] 25. Performance Optimization
  - [ ] 25.1 Implement lazy loading for templates
  - [ ] 25.2 Add memoization for canvas renders
  - [ ] 25.3 Optimize image compression
  - [ ] 25.4 Implement code splitting
  - [ ] 25.5 Measure and optimize bundle size

- [ ] 26. UI/UX Refinements
  - [ ] 26.1 Add smooth transitions and animations
  - [ ] 26.2 Implement loading states
  - [ ] 26.3 Add toast notifications for feedback
  - [ ] 26.4 Polish hover and focus states
  - [ ] 26.5 Add empty states and placeholders
  - [ ] 26.6 Implement responsive mobile view (optional)

- [ ] 27. Error Handling & Edge Cases
  - [ ] 27.1 Handle canvas rendering failures
  - [ ] 27.2 Handle image load failures
  - [ ] 27.3 Handle export failures
  - [ ] 27.4 Add fallback templates
  - [ ] 27.5 Implement graceful degradation

- [ ] 28. Documentation
  - [ ] 28.1 Write README with setup instructions
  - [ ] 28.2 Document component APIs
  - [ ] 28.3 Add inline code comments
  - [ ] 28.4 Create user guide
  - [ ] 28.5 Document deployment process

## Phase 8: Deployment Preparation

- [ ] 29. Build Configuration
  - [ ] 29.1 Configure production build settings
  - [ ] 29.2 Set up environment variables
  - [ ] 29.3 Optimize asset loading
  - [ ] 29.4 Configure source maps
  - [ ] 29.5 Test production build locally

- [ ] 30. Final Testing & Launch
  - [ ] 30.1 Cross-browser testing (Chrome, Firefox, Safari, Edge)
  - [ ] 30.2 Performance testing (load time, render time)
  - [ ] 30.3 End-to-end user workflow testing
  - [ ] 30.4 Security audit
  - [ ] 30.5 Final QA pass
  - [ ] 30.6 Deploy to production

## Future Enhancements (Post-MVP)

- [ ]* 31. Supabase Integration - Authentication
  - [ ]* 31.1 Install Supabase client library (@supabase/supabase-js)
  - [ ]* 31.2 Create Supabase client configuration (lib/supabase.ts)
  - [ ]* 31.3 Set up environment variables for Supabase URL and anon key
  - [ ]* 31.4 Create AuthProvider component with Supabase Auth
  - [ ]* 31.5 Implement useAuth hook for authentication state
  - [ ]* 31.6 Build AuthModal component with Supabase Auth UI
  - [ ]* 31.7 Implement "Save to Library" authentication check
  - [ ]* 31.8 Add sign-in/sign-up flow with email

- [ ]* 32. Supabase Integration - Storage
  - [ ]* 32.1 Create 'headshots' storage bucket in Supabase
  - [ ]* 32.2 Configure storage bucket policies (authenticated users only)
  - [ ]* 32.3 Implement uploadHeadshot utility function
  - [ ]* 32.4 Add image transformation support (resize, crop, quality)
  - [ ]* 32.5 Update HeadshotUploader to use Supabase Storage
  - [ ]* 32.6 Create 'generated-assets' storage bucket
  - [ ]* 32.7 Implement generated image upload to Storage
  - [ ]* 32.8 Add error handling for storage operations

- [ ]* 33. Supabase Integration - Database Persistence
  - [ ]* 33.1 Create saveGeneratedAsset utility function
  - [ ]* 33.2 Implement asset save on "Download" action
  - [ ]* 33.3 Store template_id and full assetConfig JSON
  - [ ]* 33.4 Extract title_preview from assetConfig
  - [ ]* 33.5 Save image_url from Storage upload
  - [ ]* 33.6 Add loading states for save operations
  - [ ]* 33.7 Implement success/error toast notifications
  - [ ]* 33.8 Add RLS policy testing

- [ ]* 34. State Management Refactoring
  - [ ]* 34.1 Update BannerState to use AssetConfig structure
  - [ ]* 34.2 Refactor context to use assetConfig as source of truth
  - [ ]* 34.3 Update all form components to work with AssetConfig
  - [ ]* 34.4 Ensure Preview component is pure function of assetConfig
  - [ ]* 34.5 Update speaker data structure to array of objects
  - [ ]* 34.6 Refactor schedule to nested object structure
  - [ ]* 34.7 Refactor branding to nested object structure
  - [ ]* 34.8 Test state synchronization with Supabase

- [ ]* 35. Auto-Save Implementation
  - [ ]* 35.1 Create useDebounce custom hook
  - [ ]* 35.2 Implement useAutoSave hook with localStorage
  - [ ]* 35.3 Add debounced save (1 second delay)
  - [ ]* 35.4 Implement draft restoration on page load
  - [ ]* 35.5 Add visual indicator for auto-save status
  - [ ]* 35.6 Handle localStorage errors gracefully
  - [ ]* 35.7 Clear draft after successful save to library
  - [ ]* 35.8 Add "Restore Draft" prompt on load

- [ ]* 36. Library & Asset Management
  - [ ]* 36.1 Create LibraryView component
  - [ ]* 36.2 Implement asset listing from generated_assets table
  - [ ]* 36.3 Build AssetCard component with thumbnail
  - [ ]* 36.4 Add "Remix" functionality to load asset for editing
  - [ ]* 36.5 Implement loadAssetForRemix utility function
  - [ ]* 36.6 Add delete asset functionality
  - [ ]* 36.7 Implement asset search/filter by title
  - [ ]* 36.8 Add pagination for asset list
  - [ ]* 36.9 Create SaveToLibraryButton component
  - [ ]* 36.10 Add "View in Library" link after save

- [ ]* 37. User Profile Management
  - [ ]* 37.1 Create profile creation on first sign-in
  - [ ]* 37.2 Implement profile settings page
  - [ ]* 37.3 Add company_name input field
  - [ ]* 37.4 Add brand_color picker (saved to profile)
  - [ ]* 37.5 Add logo_url upload functionality
  - [ ]* 37.6 Auto-populate branding from user profile
  - [ ]* 37.7 Implement profile update functionality
  - [ ]* 37.8 Add profile avatar/display name

- [ ]* 38. Advanced Features
  - [ ]* 38.1 Custom brand kit (fonts, colors, logos)
  - [ ]* 38.2 Batch generation for webinar series
  - [ ]* 38.3 Calendar integration
  - [ ]* 38.4 Social media auto-posting
  - [ ]* 38.5 Template marketplace
  - [ ]* 38.6 A/B testing different designs
  - [ ]* 38.7 Analytics dashboard
