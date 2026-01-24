# Requirements Document

## Introduction

This specification addresses critical export functionality bugs and adds dimension selection capabilities to the LoomGraph banner generator. Currently, exported images have garbled fonts and broken layouts that don't match the preview. Additionally, users need the ability to generate banners in multiple dimensions optimized for different social media use cases.

## Glossary

- **Export_System**: The component responsible for converting the canvas preview into a downloadable PNG image
- **Dimension_Selector**: The UI component that allows users to choose banner dimensions
- **Template_Engine**: The system that renders banner templates at specified dimensions
- **Banner_State**: The global state management system that stores user inputs and configuration
- **Preview_Canvas**: The visual representation of the banner shown to users before export
- **Font_Loader**: The system responsible for ensuring fonts are fully loaded before export
- **Aspect_Ratio**: The proportional relationship between width and height of the banner

## Requirements

### Requirement 1: Fix Font Rendering in Exports

**User Story:** As a user, I want exported banners to have clear, readable fonts, so that my downloaded images are professional and usable.

#### Acceptance Criteria

1. WHEN the Export_System generates a PNG, THE Export_System SHALL ensure all fonts are fully loaded before rendering
2. WHEN fonts are loading, THE Export_System SHALL wait for font load completion before proceeding with export
3. WHEN a font fails to load, THE Export_System SHALL log an error and use a fallback font
4. WHEN the exported image is downloaded, THE exported image SHALL display fonts identically to the Preview_Canvas

### Requirement 2: Fix Layout Rendering in Exports

**User Story:** As a user, I want exported banners to match the preview exactly, so that what I see is what I get.

#### Acceptance Criteria

1. WHEN the Export_System generates a PNG, THE Export_System SHALL render the layout at the target dimensions without scaling artifacts
2. WHEN templates are rendered for export, THE Template_Engine SHALL apply the same styles as the Preview_Canvas
3. WHEN the export process completes, THE exported image SHALL have identical element positioning to the Preview_Canvas
4. WHEN comparing preview and export, THE color values SHALL match exactly

### Requirement 3: Dimension Selection

**User Story:** As a user, I want to choose between different banner dimensions, so that I can optimize my banners for different social media contexts.

#### Acceptance Criteria

1. THE Dimension_Selector SHALL offer three dimension options: 1200×627 pixels (landscape), 1080×1080 pixels (square), and 1080×1350 pixels (portrait)
2. WHEN a user selects a dimension, THE Banner_State SHALL update to store the selected dimension
3. WHEN a dimension is selected, THE Preview_Canvas SHALL update to display the correct aspect ratio
4. WHEN no dimension is explicitly selected, THE Dimension_Selector SHALL default to 1200×627 pixels (landscape)
5. THE Dimension_Selector SHALL display descriptive labels indicating the optimal use case for each dimension

### Requirement 4: Template Adaptation to Dimensions

**User Story:** As a user, I want templates to look good at any dimension, so that my banners are always professional regardless of size.

#### Acceptance Criteria

1. WHEN a dimension is selected, THE Template_Engine SHALL adapt the layout to the selected aspect ratio
2. WHEN rendering a landscape dimension, THE Template_Engine SHALL use horizontal-optimized layouts
3. WHEN rendering a square dimension, THE Template_Engine SHALL use balanced layouts
4. WHEN rendering a portrait dimension, THE Template_Engine SHALL use vertical-optimized layouts
5. WHEN templates adapt to dimensions, THE Template_Engine SHALL maintain visual hierarchy and readability

### Requirement 5: Preview Scaling for Different Aspect Ratios

**User Story:** As a user, I want to see an accurate preview of my selected dimension, so that I can make informed design decisions.

#### Acceptance Criteria

1. WHEN a dimension is selected, THE Preview_Canvas SHALL display the banner at the correct aspect ratio
2. WHEN the Preview_Canvas scales for display, THE Preview_Canvas SHALL maintain the aspect ratio without distortion
3. WHEN the viewport size changes, THE Preview_Canvas SHALL scale proportionally to fit the available space
4. WHEN displaying different dimensions, THE Preview_Canvas SHALL apply consistent scaling factors for visual comparison

### Requirement 6: High-Quality Export at Selected Dimensions

**User Story:** As a user, I want exported banners to be high quality at my selected dimensions, so that my images look professional on social media.

#### Acceptance Criteria

1. WHEN the Export_System generates a PNG, THE Export_System SHALL render at 2x the selected dimensions for high DPI displays
2. WHEN exporting a 1200×627 banner, THE Export_System SHALL generate a 2400×1254 pixel image
3. WHEN exporting a 1080×1080 banner, THE Export_System SHALL generate a 2160×2160 pixel image
4. WHEN exporting a 1080×1350 banner, THE Export_System SHALL generate a 2160×2700 pixel image
5. WHEN the export completes, THE exported image SHALL have no compression artifacts or quality loss

### Requirement 7: Dimension Selector UI Integration

**User Story:** As a user, I want the dimension selector to be easy to find and use, so that I can quickly choose my preferred banner size.

#### Acceptance Criteria

1. THE Dimension_Selector SHALL be placed in the form panel near the top for easy access
2. WHEN displaying dimension options, THE Dimension_Selector SHALL show the pixel dimensions and use case description
3. WHEN a user hovers over a dimension option, THE Dimension_Selector SHALL provide visual feedback
4. WHEN a dimension is selected, THE Dimension_Selector SHALL visually indicate the active selection
5. THE Dimension_Selector SHALL use radio buttons or a similar single-selection UI pattern

### Requirement 8: Export Filename with Dimensions

**User Story:** As a user, I want downloaded files to include dimension information in the filename, so that I can easily identify different banner sizes.

#### Acceptance Criteria

1. WHEN the Export_System generates a filename, THE Export_System SHALL include the dimension specification
2. WHEN exporting a landscape banner, THE filename SHALL include "1200x627"
3. WHEN exporting a square banner, THE filename SHALL include "1080x1080"
4. WHEN exporting a portrait banner, THE filename SHALL include "1080x1350"
5. THE filename format SHALL follow the pattern: "webinar-banner-{dimension}-{timestamp}.png"
