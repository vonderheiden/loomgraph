# Implementation Plan: LoomGraph Landing Page

## Overview

This implementation plan breaks down the landing page feature into incremental coding tasks. Each task builds on previous work, starting with foundational types and shared components, then implementing individual sections, and finally integrating everything with the existing generator view.

The approach prioritizes:
1. Type definitions and content configuration first
2. Reusable components (BentoCard, CTAButton, GeometricShape)
3. Individual section components in narrative order
4. View management and integration
5. Testing throughout (property tests marked as optional for faster MVP)

## Tasks

- [x] 1. Set up landing page foundation
  - [x] 1.1 Create type definitions for landing page components
    - Create `src/types/landing.types.ts` with ViewType, NavigationProps, BentoCardProps, CTAButtonProps, TestimonialData, FAQItem, StepData, PainPointData, BenefitData interfaces
    - _Requirements: 17.1, 17.2_
  
  - [x] 1.2 Create centralized content configuration
    - Create `src/constants/landingContent.ts` with CONTENT object containing all landing page copy, stats, testimonials, FAQ items, and section data
    - _Requirements: 16.1, 16.2, 16.3_
  
  - [x] 1.3 Create landing page directory structure
    - Create `src/components/landing/` directory for all landing page components
    - _Requirements: 17.1_

- [x] 2. Implement reusable components
  - [x] 2.1 Implement BentoCard component
    - Create `src/components/landing/BentoCard.tsx` with title, description, icon props
    - Apply Bento aesthetic: white background, rounded corners, 1px border, subtle shadow, hover effect
    - _Requirements: 12.3_
  
  - [ ]* 2.2 Write property test for BentoCard styling
    - **Property 7: Bento Card Styling Consistency**
    - **Validates: Requirements 12.3**
  
  - [x] 2.3 Implement CTAButton component
    - Create `src/components/landing/CTAButton.tsx` with text, onClick, variant (primary/secondary), size (small/medium/large) props
    - Primary variant: Electric Blue (#3B82F6) background, white text
    - Secondary variant: white background, gray border
    - Include focus states and accessibility attributes
    - _Requirements: 12.5, 14.2_
  
  - [ ]* 2.4 Write property tests for CTAButton
    - **Property 8: Primary CTA Color Consistency**
    - **Property 9: Touch Target Accessibility**
    - **Property 10: ARIA Label Presence**
    - **Validates: Requirements 12.5, 13.6, 14.2**
  
  - [x] 2.5 Implement GeometricShape component
    - Create `src/components/landing/GeometricShape.tsx` with variant prop (logo, hero-chaotic, hero-organized, transformation)
    - Use CSS-only geometric shapes (divs with backgrounds, borders, transforms)
    - _Requirements: 12.7_

- [x] 3. Implement Header component
  - [x] 3.1 Create Header component with navigation
    - Create `src/components/landing/Header.tsx` with logo, navigation links, and CTA button
    - Implement smooth scroll function for anchor links with header offset calculation
    - Fixed positioning with backdrop blur effect
    - Mobile-responsive: hide nav links on mobile, show on md: breakpoint
    - _Requirements: 2.1, 2.2, 2.3, 2.4, 18.1, 18.3_
  
  - [ ]* 3.2 Write property tests for Header navigation
    - **Property 3: Anchor Link Scrolling**
    - **Property 4: Scroll Position Offset**
    - **Validates: Requirements 2.3, 18.1, 18.3**
  
  - [ ]* 3.3 Write unit tests for Header
    - Test logo and navigation links render correctly
    - Test CTA button is present with correct text
    - Test mobile responsive behavior
    - _Requirements: 2.1, 2.2, 2.4, 2.6_

- [x] 4. Implement Hero section
  - [x] 4.1 Create HeroSection component
    - Create `src/components/landing/HeroSection.tsx` with headline, subtext, CTA, stats row, and visual comparison
    - Two-column layout on desktop (content left, visual right)
    - Stack vertically on mobile
    - Use GeometricShape components for before/after visual
    - _Requirements: 3.1, 3.2, 3.3, 3.5, 3.6, 3.7_
  
  - [ ]* 4.2 Write unit tests for HeroSection
    - Test all content renders from CONTENT.hero configuration
    - Test stats row displays three metrics
    - Test responsive layout behavior
    - _Requirements: 3.1, 3.2, 3.3, 3.6, 3.7_

- [x] 5. Implement Problem section
  - [x] 5.1 Create ProblemSection component
    - Create `src/components/landing/ProblemSection.tsx` with title, subtitle, and four pain point cards
    - Use BentoCard components for pain points
    - Grid layout: 4 columns on desktop, 2 on tablet, 1 on mobile
    - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.5, 4.6, 4.7, 4.8_
  
  - [ ]* 5.2 Write unit tests for ProblemSection
    - Test title and subtitle render correctly
    - Test four pain point cards render with correct content
    - Test responsive grid behavior
    - _Requirements: 4.1, 4.2, 4.3, 4.8_

- [x] 6. Implement Solution section
  - [x] 6.1 Create SolutionSection component
    - Create `src/components/landing/SolutionSection.tsx` with title, description, and transformation visual
    - Two-column layout on desktop (text left, visual right)
    - Stack vertically on mobile
    - Use GeometricShape component for transformation visual
    - _Requirements: 5.1, 5.2, 5.3, 5.4_
  
  - [ ]* 6.2 Write unit tests for SolutionSection
    - Test title and description render correctly
    - Test transformation visual is present
    - Test responsive layout behavior
    - _Requirements: 5.1, 5.2, 5.3, 5.4_

- [x] 7. Implement Benefits section
  - [x] 7.1 Create BenefitsSection component
    - Create `src/components/landing/BenefitsSection.tsx` with title and three benefit cards
    - Use BentoCard components with Lucide React icons
    - Grid layout: 3 columns on desktop/tablet, 1 on mobile
    - _Requirements: 6.1, 6.2, 6.3, 6.4, 6.5, 6.6_
  
  - [ ]* 7.2 Write unit tests for BenefitsSection
    - Test title renders correctly
    - Test three benefit cards render with correct content and icons
    - Test responsive grid behavior
    - _Requirements: 6.1, 6.2, 6.6_

- [x] 8. Implement How It Works section
  - [x] 8.1 Create HowItWorksSection component
    - Create `src/components/landing/HowItWorksSection.tsx` with title and three numbered step cards
    - Create custom step card component with large number, title, and description
    - Grid layout: 3 columns on desktop, 1 on mobile with vertical progression
    - _Requirements: 7.1, 7.2, 7.3, 7.4, 7.5, 7.6_
  
  - [ ]* 8.2 Write unit tests for HowItWorksSection
    - Test title renders correctly
    - Test three step cards render with correct numbers, titles, and descriptions
    - Test responsive layout behavior
    - _Requirements: 7.1, 7.2, 7.6_

- [x] 9. Implement Social Proof section
  - [x] 9.1 Create TestimonialCard component
    - Create `src/components/landing/TestimonialCard.tsx` with name, title, company, rating, headline, quote props
    - Display 5-star rating with filled/empty stars
    - Use BentoCard styling as base
    - _Requirements: 8.3_
  
  - [ ]* 9.2 Write property test for TestimonialCard
    - **Property 5: Testimonial Card Completeness**
    - **Validates: Requirements 8.3**
  
  - [x] 9.3 Create SocialProofSection component
    - Create `src/components/landing/SocialProofSection.tsx` with title and three testimonial cards
    - Map over CONTENT.testimonials.items to render TestimonialCard components
    - Grid layout: 3 columns on desktop, 1 on mobile
    - _Requirements: 8.1, 8.2, 8.4, 8.6_
  
  - [ ]* 9.4 Write unit tests for SocialProofSection
    - Test title renders correctly
    - Test three testimonial cards render with correct data
    - Test responsive grid behavior
    - _Requirements: 8.1, 8.2, 8.6_

- [x] 10. Implement FAQ section
  - [x] 10.1 Create FAQItem component
    - Create `src/components/landing/FAQItem.tsx` with question and answer props
    - Question: larger font, bold, dark gray
    - Answer: normal font, regular weight, medium gray
    - Clear visual hierarchy between question and answer
    - _Requirements: 9.6_
  
  - [ ]* 10.2 Write property test for FAQItem
    - **Property 6: FAQ Visual Hierarchy**
    - **Validates: Requirements 9.6**
  
  - [x] 10.3 Create FAQSection component
    - Create `src/components/landing/FAQSection.tsx` with title and three FAQ items
    - Map over CONTENT.faq.items to render FAQItem components
    - Single column layout with spacing between items
    - _Requirements: 9.1, 9.2, 9.3, 9.4, 9.5_
  
  - [ ]* 10.4 Write unit tests for FAQSection
    - Test title renders correctly
    - Test three FAQ items render with correct questions and answers
    - _Requirements: 9.1, 9.2_

- [x] 11. Implement Final CTA section
  - [x] 11.1 Create FinalCTASection component
    - Create `src/components/landing/FinalCTASection.tsx` with headline, subtext, and CTA button
    - Centered layout with high-contrast styling
    - Large CTA button with primary variant
    - _Requirements: 10.1, 10.2, 10.3, 10.5_
  
  - [ ]* 11.2 Write unit tests for FinalCTASection
    - Test headline and subtext render correctly
    - Test CTA button is present with correct text
    - Test high-contrast styling is applied
    - _Requirements: 10.1, 10.2, 10.3, 10.5_

- [x] 12. Implement Footer component
  - [x] 12.1 Create Footer component
    - Create `src/components/landing/Footer.tsx` with coming soon badge and copyright text
    - Neutral styling consistent with Bento aesthetic
    - Centered layout
    - _Requirements: 11.1, 11.2, 11.3_
  
  - [ ]* 12.2 Write unit tests for Footer
    - Test coming soon badge renders correctly
    - Test copyright text renders correctly
    - Test neutral styling is applied
    - _Requirements: 11.1, 11.2, 11.3_

- [x] 13. Implement LandingPage container
  - [x] 13.1 Create LandingPage container component
    - Create `src/components/landing/LandingPage.tsx` that composes all sections
    - Accept onNavigate callback prop for CTA buttons
    - Pass onNavigate to Header, HeroSection, and FinalCTASection
    - Apply background color #F9FAFB to container
    - Use semantic HTML: header, main, section, footer elements
    - Add section IDs for anchor link targets (how-it-works, templates, pricing)
    - _Requirements: 12.1, 14.1, 17.4_
  
  - [ ]* 13.2 Write unit tests for LandingPage
    - Test all sections render in correct order
    - Test onNavigate prop is passed to correct components
    - Test semantic HTML structure
    - Test background color is applied
    - _Requirements: 12.1, 14.1_

- [x] 14. Checkpoint - Ensure landing page renders correctly
  - Manually test that all sections render with correct content
  - Verify responsive behavior at mobile, tablet, and desktop breakpoints
  - Ensure all tests pass, ask the user if questions arise

- [x] 15. Integrate view management with App.tsx
  - [x] 15.1 Update App.tsx with view state management
    - Add useState hook for currentView: 'landing' | 'generator' (default: 'landing')
    - Create navigateToGenerator callback that sets view to 'generator' and scrolls to top
    - Conditionally render LandingPage or existing generator view based on currentView
    - Pass navigateToGenerator to LandingPage component
    - _Requirements: 1.1, 1.2, 1.4_
  
  - [ ]* 15.2 Write property tests for view management
    - **Property 1: CTA Navigation Consistency**
    - **Property 2: View State Persistence**
    - **Validates: Requirements 1.2, 1.4**
  
  - [ ]* 15.3 Write unit tests for App.tsx view management
    - Test landing page displays by default
    - Test navigateToGenerator switches to generator view
    - Test view state persists after navigation
    - _Requirements: 1.1, 1.2, 1.4_

- [x] 16. Implement accessibility features
  - [x] 16.1 Add keyboard navigation support
    - Ensure all interactive elements are keyboard accessible (Tab, Enter, Space)
    - Add visible focus indicators to all focusable elements
    - Test keyboard navigation flow through all sections
    - _Requirements: 14.3, 14.4_
  
  - [ ]* 16.2 Write property tests for accessibility
    - **Property 11: Keyboard Navigation Support**
    - **Property 12: Focus Indicator Visibility**
    - **Property 13: Text Contrast Compliance**
    - **Property 14: Meaningful Image Alt Text**
    - **Validates: Requirements 14.3, 14.4, 14.5, 14.6**
  
  - [x] 16.3 Add ARIA labels and semantic HTML
    - Add aria-label to all buttons and interactive elements
    - Add alt text to GeometricShape components where they convey meaning
    - Verify semantic HTML structure (header, nav, main, section, footer)
    - _Requirements: 14.2, 14.6_
  
  - [ ]* 16.4 Write unit tests for accessibility attributes
    - Test ARIA labels are present on interactive elements
    - Test alt text is present on meaningful images
    - Test semantic HTML structure
    - _Requirements: 14.1, 14.2, 14.6_

- [x] 17. Implement performance optimizations
  - [x] 17.1 Add lazy loading for below-the-fold sections
    - Use React.lazy() or dynamic imports for sections below the fold
    - Implement loading boundaries if needed
    - _Requirements: 15.1_
  
  - [x] 17.2 Optimize smooth scrolling
    - Add CSS scroll-behavior: smooth to global styles
    - Ensure smooth scroll function has fallback for unsupported browsers
    - _Requirements: 18.1, 18.2_
  
  - [ ]* 17.3 Write unit tests for performance features
    - Test lazy loading is implemented for below-fold sections
    - Test smooth scroll behavior
    - _Requirements: 15.1, 18.1_

- [x] 18. Final integration and polish
  - [x] 18.1 Add responsive design refinements
    - Test all breakpoints (mobile < 768px, tablet 768-1024px, desktop > 1024px)
    - Ensure no horizontal scrolling on any viewport size
    - Verify touch targets are minimum 44x44px on mobile
    - _Requirements: 13.2, 13.3, 13.4, 13.5, 13.6_
  
  - [x] 18.2 Add CSS scroll-behavior to global styles
    - Add `scroll-behavior: smooth;` to html element in index.css
    - _Requirements: 18.1_
  
  - [x] 18.3 Verify design system compliance
    - Confirm background color #F9FAFB is applied
    - Confirm Inter or Geist font is used throughout
    - Confirm Electric Blue #3B82F6 is used for primary CTAs
    - Confirm Bento card styling is consistent (shadows, borders)
    - _Requirements: 12.1, 12.2, 12.3, 12.5_
  
  - [ ]* 18.4 Write integration tests
    - Test complete user flow: landing page → click CTA → generator view
    - Test navigation between all sections via header links
    - Test responsive behavior across all breakpoints
    - _Requirements: 1.2, 2.3, 13.2, 13.3, 13.4_

- [x] 19. Final checkpoint - Complete testing and validation
  - Run all tests (unit and property tests)
  - Manually test complete user journey
  - Verify accessibility with keyboard navigation
  - Test on mobile, tablet, and desktop viewports
  - Ensure all tests pass, ask the user if questions arise

## Notes

- Tasks marked with `*` are optional and can be skipped for faster MVP
- Each task references specific requirements for traceability
- Checkpoints ensure incremental validation at key milestones
- Property tests validate universal correctness properties with 100+ iterations
- Unit tests validate specific examples, content rendering, and edge cases
- The landing page is architected for easy migration to React Router in the future
- All content is centralized in `landingContent.ts` for easy updates
- Reusable components (BentoCard, CTAButton, GeometricShape) are built first to accelerate section development
