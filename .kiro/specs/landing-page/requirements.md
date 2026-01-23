# Requirements Document: LoomGraph Landing Page

## Introduction

This document specifies the requirements for a high-conversion marketing landing page for LoomGraph, a webinar banner generator. The landing page serves as the primary entry point for new users, communicating value propositions and guiding visitors to the banner generator tool through strategic calls-to-action.

## Glossary

- **Landing_Page**: The marketing page that serves as the entry point for new visitors
- **Generator_View**: The existing banner creation tool with form and preview components
- **CTA**: Call-to-action button or link that navigates users to the Generator_View
- **Bento_Card**: A card-style UI component with subtle shadows and 1px borders following the Bento design aesthetic
- **Anchor_Link**: An internal page link that scrolls to a specific section
- **Conditional_Rendering**: React pattern for showing/hiding components without routing libraries
- **Hero_Section**: The primary above-the-fold section containing the main headline and CTA
- **Responsive_Breakpoint**: Screen width threshold where layout changes (mobile, tablet, desktop)

## Requirements

### Requirement 1: Navigation and View Management

**User Story:** As a visitor, I want to seamlessly navigate between the landing page and generator tool, so that I can learn about the product and start creating banners without page reloads.

#### Acceptance Criteria

1. WHEN the application loads THEN the Landing_Page SHALL be displayed by default
2. WHEN a user clicks any CTA button THEN the system SHALL hide the Landing_Page and display the Generator_View
3. WHEN navigating between views THEN the system SHALL use conditional rendering without React Router
4. WHEN the view state changes THEN the system SHALL maintain the current view state in React component state
5. WHERE future routing is needed, THE system architecture SHALL support easy migration to React Router without major refactoring

### Requirement 2: Header Component

**User Story:** As a visitor, I want a clear navigation header, so that I can understand the site structure and access key sections quickly.

#### Acceptance Criteria

1. THE Header SHALL display the "LoomGraph" logo with a geometric icon on the left side
2. THE Header SHALL include navigation links for "How it Works," "Templates," and "Pricing"
3. WHEN a navigation link is clicked THEN the system SHALL smooth scroll to the corresponding section using anchor links
4. THE Header SHALL display a "Launch Generator" CTA button with dark background and white text
5. WHEN the "Launch Generator" button is clicked THEN the system SHALL navigate to the Generator_View
6. WHILE on mobile viewports THEN the Header SHALL remain accessible and readable

### Requirement 3: Hero Section

**User Story:** As a visitor, I want to immediately understand what LoomGraph does and why it's valuable, so that I can decide if it meets my needs.

#### Acceptance Criteria

1. THE Hero_Section SHALL display the headline "Stop Fiddling with Canva. Generate Your Webinar Banners in 60 Seconds."
2. THE Hero_Section SHALL display the subtext "The first-ever automated banner generator built for busy founders. High-converting LinkedIn layouts. Zero design skills required."
3. THE Hero_Section SHALL include a primary CTA button with text "Create Your First Banner — It's Free"
4. WHEN the primary CTA is clicked THEN the system SHALL navigate to the Generator_View
5. THE Hero_Section SHALL display a visual comparison using CSS geometric shapes (chaotic shapes vs. organized shapes)
6. THE Hero_Section SHALL display a stats row with three metrics: "10,000+ Banners Generated," "4.9/5 User Rating," and "95% Time Saved"
7. WHILE on mobile viewports THEN the Hero_Section SHALL stack elements vertically for readability

### Requirement 4: Problem Section

**User Story:** As a visitor, I want to see my pain points reflected back to me, so that I feel understood and motivated to try the solution.

#### Acceptance Criteria

1. THE Problem_Section SHALL display the title "The 20-Minute Banner Struggle"
2. THE Problem_Section SHALL display the subtitle "Does this sound familiar?"
3. THE Problem_Section SHALL display four Bento_Card components with pain points
4. THE first pain point card SHALL contain title "The Canva Rabbit Hole" and description "Spending 15 minutes just picking a font"
5. THE second pain point card SHALL contain title "Headshot Headaches" and description "Manually cropping circles and removing backgrounds"
6. THE third pain point card SHALL contain title "The Timezone Trap" and description "Triple-checking PT vs. ET vs. GMT formatting"
7. THE fourth pain point card SHALL contain title "Off-Brand Results" and description "Banners that look like 2010 corporate stock art"
8. WHILE on mobile viewports THEN the pain point cards SHALL stack vertically

### Requirement 5: Solution Section

**User Story:** As a visitor, I want to understand how LoomGraph solves my problems differently than existing tools, so that I can evaluate its unique value proposition.

#### Acceptance Criteria

1. THE Solution_Section SHALL display the title "Design as Infrastructure, Not a Chore."
2. THE Solution_Section SHALL display the description "LoomGraph isn't a design tool. It's a generator. You provide the data; we provide the pixels. Optimized specifically for LinkedIn's feed to ensure your event gets the attention it deserves."
3. THE Solution_Section SHALL display a visual representation using CSS geometric shapes showing transformation
4. WHILE on desktop viewports THEN the Solution_Section SHALL display text and visual side-by-side

### Requirement 6: Benefits Section

**User Story:** As a visitor, I want to understand the specific benefits of using LoomGraph, so that I can determine if it addresses my workflow needs.

#### Acceptance Criteria

1. THE Benefits_Section SHALL display the title "Why Work With Us"
2. THE Benefits_Section SHALL display three Bento_Card components with benefits
3. THE first benefit card SHALL contain title "Auto-Beautify Headshots" and description "Upload any photo; we handle the crop and background removal"
4. THE second benefit card SHALL contain title "Timezone Intelligent" and description "Enter your time once; we format it for a global audience automatically"
5. THE third benefit card SHALL contain title "LinkedIn Optimized" and description "Safe zones guaranteed. No more text being cut off by the 'See More' button"
6. WHILE on tablet and desktop viewports THEN the benefit cards SHALL display in a three-column grid

### Requirement 7: How It Works Section

**User Story:** As a visitor, I want to understand the process of creating a banner, so that I know what to expect before starting.

#### Acceptance Criteria

1. THE How_It_Works_Section SHALL display the title "How It Works"
2. THE How_It_Works_Section SHALL display three numbered step cards
3. THE first step card SHALL contain number "1", title "Input Data", and description "Fill out a simple 4-field form"
4. THE second step card SHALL contain number "2", title "Brand & Style", and description "Select your brand color and speaker layout"
5. THE third step card SHALL contain number "3", title "Instant Export", and description "Download your high-res, LinkedIn-ready asset"
6. WHILE on mobile viewports THEN the step cards SHALL stack vertically with clear visual progression

### Requirement 8: Social Proof Section

**User Story:** As a visitor, I want to see testimonials from other users, so that I can trust the product's effectiveness.

#### Acceptance Criteria

1. THE Social_Proof_Section SHALL display the title "What Founders Are Saying"
2. THE Social_Proof_Section SHALL display three testimonial Bento_Card components
3. WHEN displaying a testimonial card THEN the system SHALL show name, title, company, 5-star rating, headline, and quote
4. THE first testimonial SHALL contain name "Sarah Chen", title "Marketing Lead @ TechCorp", headline "Total Lifesaver!", and quote "I used to spend 30 minutes per banner. Now it takes 2 minutes."
5. THE testimonial data SHALL be stored in a structured format for easy replacement
6. WHILE on desktop viewports THEN the testimonial cards SHALL display in a three-column grid

### Requirement 9: FAQ Section

**User Story:** As a visitor, I want answers to common questions, so that I can make an informed decision without contacting support.

#### Acceptance Criteria

1. THE FAQ_Section SHALL display the title "Frequently Asked Questions"
2. THE FAQ_Section SHALL display three question-answer pairs
3. THE first FAQ SHALL have question "Is this better than Canva?" and answer "It's 10x faster for this specific task. Canva is a general-purpose design tool. LoomGraph is purpose-built for webinar banners, with LinkedIn optimization baked in."
4. THE second FAQ SHALL have question "Can I use my own brand colors?" and answer "Yes! You can customize the accent color to match your brand. We handle all the design work while keeping your brand identity intact."
5. THE third FAQ SHALL have question "What file types are supported?" and answer "We export high-resolution PNG files (2400x1254px) optimized for LinkedIn. Perfect for social media, email campaigns, and event pages."
6. WHEN an FAQ item is displayed THEN the system SHALL format it with clear visual hierarchy

### Requirement 10: Final CTA Section

**User Story:** As a visitor who has read through the landing page, I want a clear final call-to-action, so that I can easily start using the tool.

#### Acceptance Criteria

1. THE Final_CTA_Section SHALL display the headline "Ready to save 2 hours a month?"
2. THE Final_CTA_Section SHALL display the subtext "Join 500+ founders who have automated their webinar promotion."
3. THE Final_CTA_Section SHALL include a CTA button with text "Start Generating Now"
4. WHEN the CTA button is clicked THEN the system SHALL navigate to the Generator_View
5. THE Final_CTA_Section SHALL use high-contrast styling to draw attention

### Requirement 11: Footer Component

**User Story:** As a visitor, I want to see footer information including future features and copyright, so that I understand the product roadmap and legitimacy.

#### Acceptance Criteria

1. THE Footer SHALL display a "Coming Soon" badge with text "🚀 Coming Soon: Takeaway Carousel Generator"
2. THE Footer SHALL display copyright text "© 2026 LoomGraph. All rights reserved."
3. THE Footer SHALL use neutral styling consistent with the Bento aesthetic

### Requirement 12: Design System Compliance

**User Story:** As a user, I want a visually cohesive experience that matches the existing generator tool, so that the product feels professional and unified.

#### Acceptance Criteria

1. THE Landing_Page SHALL use background color #F9FAFB (neutral gray)
2. THE Landing_Page SHALL use Inter or Geist font family for all typography
3. WHEN displaying Bento_Card components THEN the system SHALL apply subtle shadows and 1px borders
4. THE Landing_Page SHALL use Lucide React icons for all iconography
5. THE Landing_Page SHALL use Electric Blue #3B82F6 for primary CTA buttons
6. WHEN applying animations THEN the system SHALL use subtle CSS transitions and transforms
7. THE Landing_Page SHALL use CSS geometric shapes for visual elements (no images or illustrations initially)

### Requirement 13: Responsive Design

**User Story:** As a mobile user, I want the landing page to be fully functional and readable on my device, so that I can access the tool from anywhere.

#### Acceptance Criteria

1. THE Landing_Page SHALL implement mobile-first responsive design
2. WHEN viewport width is below 768px THEN the system SHALL apply mobile layout styles
3. WHEN viewport width is between 768px and 1024px THEN the system SHALL apply tablet layout styles
4. WHEN viewport width is above 1024px THEN the system SHALL apply desktop layout styles
5. WHILE on any viewport size THEN all text SHALL remain readable without horizontal scrolling
6. WHILE on any viewport size THEN all interactive elements SHALL be easily tappable (minimum 44x44px touch targets)

### Requirement 14: Accessibility

**User Story:** As a user with accessibility needs, I want the landing page to be navigable and understandable, so that I can use the product regardless of my abilities.

#### Acceptance Criteria

1. THE Landing_Page SHALL use semantic HTML elements (header, nav, main, section, footer)
2. WHEN interactive elements are rendered THEN the system SHALL include appropriate ARIA labels
3. THE Landing_Page SHALL support full keyboard navigation for all interactive elements
4. WHEN focus moves between elements THEN the system SHALL display visible focus indicators
5. THE Landing_Page SHALL maintain color contrast ratios of at least 4.5:1 for normal text
6. WHEN images or icons convey meaning THEN the system SHALL provide alternative text

### Requirement 15: Performance Optimization

**User Story:** As a visitor, I want the landing page to load quickly, so that I don't abandon the site due to slow performance.

#### Acceptance Criteria

1. WHEN sections are below the fold THEN the system SHALL implement lazy loading
2. THE Landing_Page SHALL minimize initial JavaScript bundle size
3. WHEN smooth scrolling to anchor links THEN the system SHALL use native CSS scroll-behavior where supported
4. THE Landing_Page SHALL avoid layout shifts during initial render

### Requirement 16: Content Management

**User Story:** As a developer maintaining the landing page, I want content to be easily editable, so that I can update copy and data without searching through component code.

#### Acceptance Criteria

1. THE system SHALL store all landing page copy in a centralized constants file or configuration object
2. THE system SHALL store stats and metrics in a separate data structure for easy updates
3. THE system SHALL store testimonial data in a structured array format
4. WHEN content needs updating THEN developers SHALL be able to modify a single configuration file

### Requirement 17: Component Architecture

**User Story:** As a developer, I want a modular component structure, so that the codebase is maintainable and can scale for future features.

#### Acceptance Criteria

1. THE system SHALL create a `src/components/landing/` directory for all landing page components
2. THE system SHALL implement each major section as a separate React component
3. THE system SHALL create a shared Button component for all CTA buttons
4. THE system SHALL implement a LandingPage container component that composes all sections
5. WHERE React Router is added in the future, THE component architecture SHALL support migration without major refactoring

### Requirement 18: Smooth Scrolling

**User Story:** As a visitor, I want smooth scrolling when clicking navigation links, so that the experience feels polished and I can track where I'm going.

#### Acceptance Criteria

1. WHEN a user clicks an Anchor_Link in the header THEN the system SHALL smoothly scroll to the target section
2. THE smooth scroll animation SHALL complete within 500-800 milliseconds
3. WHEN smooth scrolling THEN the system SHALL account for fixed header height in scroll position
4. THE system SHALL use CSS scroll-behavior: smooth where supported by the browser
