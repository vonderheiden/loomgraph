# Requirements Document: UI/UX Overhaul

## Introduction

This document specifies the requirements for a comprehensive UI/UX overhaul of the LoomGraph banner generator. The overhaul focuses on optimizing the layout architecture, improving form usability, enhancing the preview experience with a "LinkedIn Stage" aesthetic, and ensuring mobile responsiveness while maintaining the Bento design language.

## Glossary

- **System**: The LoomGraph banner generator web application
- **Form_Panel**: The left-side panel containing form inputs for banner customization
- **Preview_Panel**: The right-side panel displaying the real-time banner preview
- **LinkedIn_Stage**: A centered canvas container with social media frame aesthetic
- **Dimension_Selector**: The UI component for choosing banner dimensions
- **Speaker_Section**: The accordion-based form section for speaker details
- **FAB**: Floating Action Button for mobile export functionality
- **Bento_Design**: The design system with 12px border-radius, ultra-thin borders, and soft shadows
- **Accent_Color**: The user-selected brand color that dynamically affects UI elements
- **Viewport**: The browser window's visible area
- **Breakpoint**: A specific screen width where layout changes occur

## Requirements

### Requirement 1: Layout Architecture

**User Story:** As a user, I want an optimized two-column layout with a persistent preview, so that I can see my banner changes without scrolling.

#### Acceptance Criteria

1. WHEN the viewport width is 768px or greater, THE System SHALL display a two-column layout with Form_Panel at 35% width and Preview_Panel at 65% width
2. WHEN the Form_Panel content exceeds viewport height, THE System SHALL allow vertical scrolling within Form_Panel while keeping Preview_Panel fixed
3. WHEN the user scrolls the Form_Panel, THE System SHALL maintain the Preview_Panel position in the viewport
4. THE System SHALL apply a sticky header to Form_Panel that remains visible during scrolling
5. THE Preview_Panel SHALL remain fully visible without any scrolling capability

### Requirement 2: Form Reordering and Optimization

**User Story:** As a user, I want a logical form flow with compact controls, so that I can efficiently input banner details.

#### Acceptance Criteria

1. THE System SHALL display form sections in the following order: Webinar Title, Date/Time, Dimension Selector, Speaker Count, Speaker Sections, Color Picker, Background Options
2. WHEN displaying the Dimension_Selector, THE System SHALL render it as a horizontal segmented control with a maximum height of 60px
3. WHEN displaying speaker input fields, THE System SHALL render Name and Title fields in a single row with 50/50 width split on viewports 768px or wider
4. THE Dimension_Selector SHALL display dimension options with icons and labels in a horizontal layout
5. THE System SHALL maintain accordion functionality for Speaker_Section components

### Requirement 3: Compact Dimension Selector

**User Story:** As a user, I want a space-efficient dimension selector, so that I can choose banner sizes without excessive vertical space consumption.

#### Acceptance Criteria

1. THE Dimension_Selector SHALL render as a horizontal segmented control with buttons arranged side-by-side
2. WHEN a dimension option is selected, THE System SHALL apply visual styling to indicate the active state
3. THE Dimension_Selector SHALL display an icon representing each dimension option
4. THE Dimension_Selector SHALL occupy approximately 60px of vertical height
5. WHEN viewport width is below 768px, THE Dimension_Selector SHALL display icon-only buttons without text labels

### Requirement 4: LinkedIn Stage Preview

**User Story:** As a user, I want a professional preview presentation, so that I can visualize how my banner will appear on social media.

#### Acceptance Criteria

1. THE System SHALL display the banner canvas within a LinkedIn_Stage container with shadow-lg and border styling
2. THE LinkedIn_Stage SHALL center the canvas horizontally and vertically within the Preview_Panel
3. THE System SHALL apply a #F3F4F6 background color to the Preview_Panel area
4. THE LinkedIn_Stage container SHALL use Bento_Design styling with 12px border-radius
5. THE System SHALL position the export button at the top-right of the Preview_Panel or within a header bar

### Requirement 5: Bento Design Language Consistency

**User Story:** As a user, I want a cohesive visual design, so that the interface feels polished and professional.

#### Acceptance Criteria

1. THE System SHALL apply 12px border-radius to all card components and containers
2. THE System SHALL use #E5E7EB (gray-100) for all border colors with 1px width
3. WHEN a form input receives focus, THE System SHALL display a focus ring using the current Accent_Color
4. THE System SHALL apply shadow-soft to card components and shadow-lg to the LinkedIn_Stage
5. THE System SHALL use consistent spacing following an 8px grid system

### Requirement 6: Dynamic Focus Colors

**User Story:** As a user, I want focus indicators that match my brand color, so that the interface feels personalized.

#### Acceptance Criteria

1. WHEN a user selects an Accent_Color, THE System SHALL update all focus ring colors to match the selected color
2. THE System SHALL apply the dynamic focus color to text inputs, select elements, and buttons when focused
3. THE System SHALL maintain sufficient contrast ratio (minimum 3:1) between focus rings and backgrounds
4. THE System SHALL update focus colors in real-time as the Accent_Color changes
5. THE System SHALL preserve default focus behavior for accessibility when Accent_Color is not set

### Requirement 7: Mobile Responsive Layout

**User Story:** As a mobile user, I want an optimized layout for small screens, so that I can create banners on any device.

#### Acceptance Criteria

1. WHEN viewport width is below 768px, THE System SHALL stack Form_Panel and Preview_Panel vertically
2. WHEN viewport width is below 768px, THE System SHALL display a collapsed mini preview at the top of the screen
3. WHEN viewport width is below 768px, THE System SHALL render a FAB for export functionality positioned at bottom-right
4. WHEN viewport width is below 400px, THE System SHALL stack date and time inputs vertically
5. THE System SHALL ensure all interactive elements have a minimum touch target size of 44x44 pixels on mobile

### Requirement 8: Mobile Touch Optimization

**User Story:** As a mobile user, I want touch-friendly controls, so that I can easily interact with the form on touchscreens.

#### Acceptance Criteria

1. THE System SHALL apply minimum 44x44 pixel touch targets to all buttons and interactive elements on mobile
2. WHEN viewport width is below 768px, THE System SHALL hide tooltip text and display info icons instead
3. THE Dimension_Selector SHALL display icon-only buttons on mobile viewports
4. THE System SHALL increase padding and spacing for form inputs on mobile viewports
5. THE FAB SHALL be positioned with sufficient margin from screen edges for comfortable thumb access

### Requirement 9: Accessibility Compliance

**User Story:** As a user with accessibility needs, I want keyboard navigation and screen reader support, so that I can use the application effectively.

#### Acceptance Criteria

1. THE System SHALL support full keyboard navigation for all interactive elements
2. THE System SHALL provide ARIA labels for all form inputs and buttons
3. THE System SHALL maintain WCAG 2.1 AA contrast ratios for all text and interactive elements
4. WHEN focus moves between elements, THE System SHALL provide visible focus indicators
5. THE System SHALL announce dynamic content changes to screen readers using ARIA live regions

### Requirement 10: Export Button Integration

**User Story:** As a user, I want easy access to the export function, so that I can download my banner quickly.

#### Acceptance Criteria

1. WHEN viewport width is 768px or greater, THE System SHALL display the export button at the top-right of the Preview_Panel
2. WHEN viewport width is below 768px, THE System SHALL display the export button as a FAB at bottom-right
3. THE export button SHALL remain accessible and visible at all scroll positions
4. THE export button SHALL maintain consistent styling with the Bento_Design language
5. WHEN the export button is clicked, THE System SHALL generate and download the banner image

### Requirement 11: Single-Row Input Optimization

**User Story:** As a user, I want compact form inputs, so that I can see more of the form without scrolling.

#### Acceptance Criteria

1. WHEN viewport width is 768px or greater, THE System SHALL display speaker Name and Title fields in a single row
2. THE System SHALL allocate 50% width to each field in single-row layouts
3. WHEN viewport width is below 768px, THE System SHALL stack Name and Title fields vertically
4. THE System SHALL maintain consistent spacing between fields in both horizontal and vertical layouts
5. THE System SHALL preserve input validation and error message display in both layouts

### Requirement 12: Responsive Breakpoints

**User Story:** As a user on various devices, I want the layout to adapt appropriately, so that I have an optimal experience on any screen size.

#### Acceptance Criteria

1. THE System SHALL implement a breakpoint at 768px for tablet and desktop layouts
2. THE System SHALL implement a breakpoint at 400px for small mobile layouts
3. WHEN viewport width crosses a breakpoint, THE System SHALL smoothly transition layout changes
4. THE System SHALL test and verify layout behavior at common device widths: 320px, 375px, 768px, 1024px, 1440px
5. THE System SHALL prevent horizontal scrolling at all breakpoints
