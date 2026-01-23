# LoomGraph - High-Conversion Webinar Banner Generator

## Overview
LoomGraph is a form-based webinar banner generator that eliminates the cognitive load of design tools. Founders input webinar details and receive a professional LinkedIn-optimized banner (1200x627) in under 60 seconds.

## Problem Statement
Founders waste 20+ minutes in design tools like Canva "fiddling" with layers to announce webinars. They don't want a design tool; they want a result. LoomGraph solves this by providing a structured form that generates perfectly formatted banners instantly.

## User Stories

### 1. Core Banner Generation
**As a** founder announcing a webinar  
**I want to** input my webinar details into a simple form  
**So that** I can generate a professional LinkedIn banner in under 60 seconds

**Acceptance Criteria:**
- 1.1 User can input webinar title (text field)
- 1.2 User can input speaker name (text field)
- 1.3 User can input speaker title/company (text field)
- 1.4 User can input webinar date (date picker)
- 1.5 User can input webinar time (time picker)
- 1.6 Form updates preview in real-time as user types
- 1.7 Complete workflow takes less than 60 seconds

### 2. Speaker Photo Management
**As a** webinar host  
**I want to** upload my headshot and have it automatically formatted  
**So that** I don't need to crop or resize images manually

**Acceptance Criteria:**
- 2.1 User can upload an image file (JPG, PNG)
- 2.2 Uploaded image is automatically cropped to circular format
- 2.3 Image uses object-fit: cover to prevent distortion
- 2.4 Image is positioned correctly in the banner template
- 2.5 User can replace the uploaded image

### 3. Timezone Handling
**As a** webinar organizer with a global audience  
**I want to** automatically append timezone indicators  
**So that** attendees know when the webinar occurs in their region

**Acceptance Criteria:**
- 3.1 User can toggle timezone display on/off
- 3.2 User can select from common timezones (PT, ET, GMT, etc.)
- 3.3 Selected timezone is appended to the time display
- 3.4 Timezone formatting is consistent and readable

### 4. Template Selection
**As a** user with different branding needs  
**I want to** choose from pre-designed layout templates  
**So that** I can match the banner to my brand aesthetic

**Acceptance Criteria:**
- 4.1 User can view 3 template options: "The Minimalist," "The Bold Founder," "The Duo"
- 4.2 Templates are displayed as visual thumbnails in a horizontal selector
- 4.3 Clicking a template instantly updates the preview
- 4.4 Selected template is visually indicated
- 4.5 All templates maintain LinkedIn's 1200x627 dimensions

### 5. Brand Customization
**As a** founder with established brand colors  
**I want to** customize the accent color of my banner  
**So that** it aligns with my brand identity

**Acceptance Criteria:**
- 5.1 User can access a color picker input
- 5.2 Changing the color updates all accent elements (bars, highlights, buttons)
- 5.3 Color changes are reflected in real-time
- 5.4 Color picker supports hex, RGB, or visual selection
- 5.5 Default color is provided (Electric Blue or Deep Purple)

### 6. Smart Text Handling
**As a** user with varying content lengths  
**I want** text to automatically adjust to fit the layout  
**So that** my banner never looks broken or unprofessional

**Acceptance Criteria:**
- 6.1 Long titles automatically scale down font size
- 6.2 Text truncation uses "best fit" logic to maintain readability
- 6.3 Minimum font size prevents text from becoming unreadable
- 6.4 Layout remains balanced regardless of text length
- 6.5 User receives visual feedback if text is too long

### 7. Export Functionality
**As a** user ready to promote my webinar  
**I want to** download my banner as a high-quality image  
**So that** I can immediately post it to LinkedIn

**Acceptance Criteria:**
- 7.1 User can click a "Download Image" button
- 7.2 Banner exports as PNG or JPG format
- 7.3 Export is @2x resolution for high quality
- 7.4 Downloaded file is optimized for LinkedIn (1200x627)
- 7.5 Download completes within 3 seconds
- 7.6 File name is descriptive (e.g., "webinar-banner-[title].png")

## Design Constraints

### Visual Design
- UI follows "Soft Depth" Bento aesthetic (Notion minimalism + Linear/Figma subtle shadows)
- Bento Box modular layout: Left column (form controls), Right/Center (live preview)
- Neutral gray backgrounds (#F9FAFB) with single high-contrast action color
- 1px borders, rounded corners, subtle shadows
- High scannability with clean card-based sub-sections

### Technical Constraints
- Stack: React, TypeScript, Tailwind CSS, Lucide React (icons)
- Canvas rendering: HTML5 Canvas or html-to-image library
- Font pairings: Limited to 2 high-quality sans-serif options (Inter or Geist)
- No drag-and-drop functionality (locked design)
- No complex font pickers
- Focus on speed-to-export

### Behavioral Requirements
- Real-time binding: Form inputs update preview instantly
- No page refreshes or loading states for preview updates
- Responsive layout for desktop (mobile optional for MVP)

## Out of Scope (MVP)
- User authentication (Supabase integration deferred)
- Saving/loading banner designs
- Multiple speaker support beyond "The Duo" template
- Custom font uploads
- Drag-and-drop canvas editing
- Animation or video export
- Social media scheduling integration
- A/B testing different banner designs
- Analytics on banner performance

## Success Metrics
- Time to generate banner: < 60 seconds
- Export success rate: > 95%
- Preview update latency: < 100ms
- Image quality: Suitable for LinkedIn (no pixelation)
- User completes workflow without external help

## Technical Dependencies
- React 18+
- TypeScript 5+
- Tailwind CSS 3+
- Lucide React (icon library)
- html-to-image or HTML5 Canvas API
- Modern browser with Canvas support

## Future Enhancements (Post-MVP)
- Supabase authentication and storage
- Save/load banner templates
- Custom brand kit (fonts, colors, logos)
- Batch generation for webinar series
- Integration with calendar tools
- Social media auto-posting
- Template marketplace
