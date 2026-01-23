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
- 1.1 User can select number of speakers (dropdown: 1, 2, or 3)
- 1.2 Form dynamically shows/hides speaker fields based on selection
- 1.3 User can input webinar title (text field)
- 1.4 For each speaker, user can input:
  - Speaker name (text field)
  - Speaker title/company (text field)
  - Speaker headshot (image upload)
  - Company logo (image upload, optional)
- 1.5 User can input webinar date (date picker)
- 1.6 User can input webinar time (time picker)
- 1.7 Form updates preview in real-time as user types
- 1.8 Complete workflow takes less than 60 seconds

### 2. Speaker Photo Management
**As a** webinar host  
**I want to** upload headshots for each speaker and have them automatically formatted  
**So that** I don't need to crop or resize images manually

**Acceptance Criteria:**
- 2.1 User can upload an image file for each speaker (JPG, PNG)
- 2.2 Number of upload fields matches selected speaker count (1-3)
- 2.3 Uploaded images are automatically cropped to circular format
- 2.4 Images use object-fit: cover to prevent distortion
- 2.5 Images are positioned correctly in the banner template
- 2.6 User can replace uploaded images
- 2.7 Each speaker section is clearly labeled (Speaker 1, Speaker 2, Speaker 3)

### 2a. Company Logo Management
**As a** webinar organizer  
**I want to** upload company logos for each speaker's organization  
**So that** the banner shows which companies the speakers represent

**Acceptance Criteria:**
- 2a.1 User can upload a company logo for each speaker (PNG with transparency preferred)
- 2a.2 Logo upload is optional (can be left blank)
- 2a.3 Logos are displayed near or below speaker information
- 2a.4 Logos are automatically sized appropriately (max 80-100px width)
- 2a.5 Logos maintain aspect ratio and transparency
- 2a.6 User can replace or remove logos
- 2a.7 Multiple speakers can have different company logos (e.g., Google, Microsoft, Amazon)

### 3. Timezone Handling
**As a** webinar organizer with a global audience  
**I want to** automatically append timezone indicators  
**So that** attendees know when the webinar occurs in their region

**Acceptance Criteria:**
- 3.1 User can toggle timezone display on/off
- 3.2 User can select from common timezones (PT, ET, GMT, etc.)
- 3.3 Selected timezone is appended to the time display
- 3.4 Timezone formatting is consistent and readable

### 3a. Dynamic Speaker Form
**As a** user organizing webinars with varying numbers of speakers  
**I want to** select how many speakers to feature  
**So that** the form and banner adapt to my specific needs

**Acceptance Criteria:**
- 3a.1 User sees "Number of Speakers" dropdown at top of form
- 3a.2 Dropdown options are: 1, 2, or 3 speakers
- 3a.3 When selection changes, form immediately shows/hides speaker sections
- 3a.4 Each speaker section includes:
  - Speaker name input
  - Speaker title/company input
  - Headshot upload
  - Company logo upload (optional)
- 3a.5 Speaker sections are clearly labeled (Speaker 1, Speaker 2, Speaker 3)
- 3a.6 Template automatically switches based on speaker count:
  - 1 speaker → "The Professional" template
  - 2 speakers → "The Duo" template
  - 3 speakers → "The Panel" template
- 3a.7 Preview updates immediately when speaker count changes
- 3a.8 Previously entered data is preserved when switching between counts

### 4. Template Selection
**As a** user with different branding needs  
**I want to** choose from pre-designed layout templates  
**So that** I can match the banner to my brand aesthetic and speaker count

**Acceptance Criteria:**
- 4.1 User can view 3 template options optimized for different speaker counts
- 4.2 Templates are displayed as visual thumbnails in a horizontal selector
- 4.3 Clicking a template instantly updates the preview
- 4.4 Selected template is visually indicated
- 4.5 All templates maintain LinkedIn's 1200x627 dimensions

**Template Descriptions:**

**Template 1: "The Professional" (1 Speaker)**
- Bold, solid color background (customizable)
- Company logo in top-left corner
- Large title text on left side (60% width)
- Large circular headshot on right side (300-400px diameter) with white border
- Date/time/location info on left side below title
- "Register Now" CTA at bottom-left
- Diagonal accent stripe or geometric element (optional)

**Template 2: "The Duo" (2 Speakers)**
- Vibrant gradient or solid background
- Title at top center or top-left
- Two large circular headshots side-by-side (200-250px each) with white borders
- Speaker names and titles below each headshot
- Date/time info at bottom with icons
- Website or CTA at bottom-right

**Template 3: "The Panel" (3 Speakers)**
- Modern gradient background (blue-to-purple or customizable)
- Company logo and partner logo at top (split header)
- Title text prominently displayed
- Three circular headshots in horizontal row (180-220px each) with white borders
- Speaker names and titles below each headshot
- Date/time info at bottom-left
- "Register Now" CTA button at bottom-right

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

### 8. Company Branding
**As a** user representing a company  
**I want to** add my company logo to the banner  
**So that** the banner reflects my brand identity

**Acceptance Criteria:**
- 8.1 User can upload a company logo (PNG with transparency preferred)
- 8.2 Logo is positioned in top-left or top-center based on template
- 8.3 Logo is automatically sized appropriately (max 150px width)
- 8.4 User can replace or remove the logo
- 8.5 Logo maintains aspect ratio and quality

### 9. Background Customization
**As a** user with specific brand guidelines  
**I want to** customize the background color or gradient  
**So that** the banner matches my brand colors

**Acceptance Criteria:**
- 9.1 User can choose between solid color or gradient background
- 9.2 For solid: Color picker with preset brand colors
- 9.3 For gradient: Two-color picker with direction control
- 9.4 Preview updates in real-time
- 9.5 Presets available (e.g., "Corporate Blue", "Vibrant Purple", "Professional Teal")

### 10. Call-to-Action (CTA)
**As a** webinar organizer  
**I want to** add a registration CTA and website URL  
**So that** viewers know how to register

**Acceptance Criteria:**
- 10.1 User can input CTA text (default: "Register Now")
- 10.2 User can input website URL or registration link
- 10.3 CTA is prominently displayed on banner
- 10.4 CTA styling matches template design
- 10.5 URL is formatted cleanly (e.g., "www.example.com" not full URL)

## Design Constraints

### Visual Design - Banner Output
The generated banners should follow modern webinar announcement aesthetics:

**Color & Background:**
- Bold, vibrant background colors (deep blues, purples, teals, gradients)
- Geometric accent elements (diagonal stripes, dots, curved shapes)
- Professional, corporate feel with high visual impact
- Support for gradient backgrounds (e.g., blue-to-purple)

**Headshot Treatment:**
- Large, prominent circular headshots with white borders (8-12px)
- Professional photography quality expected
- Circular cutouts positioned strategically based on speaker count:
  - **1 Speaker**: Large headshot on right side (300-400px diameter)
  - **2 Speakers**: Side-by-side circular headshots (200-250px each)
  - **3 Speakers**: Horizontal row of circular headshots (180-220px each)

**Typography & Hierarchy:**
- Large, bold title text (48-72px) in white or light colors
- Company logo prominently displayed (top-left or top-center)
- Clear visual hierarchy: Logo → Title → Speakers → Date/Time → CTA
- Sans-serif fonts (Inter, Poppins, or similar modern fonts)
- High contrast for readability (white text on dark backgrounds)

**Layout Patterns:**
- **Single Speaker Layout**: Content on left 60%, large headshot on right 40%
- **Dual Speaker Layout**: Title at top, two headshots centered below, date/time at bottom
- **Triple Speaker Layout**: Title at top, three headshots in horizontal row, info at bottom

**Call-to-Action:**
- Prominent "Register Now" or similar CTA
- Can include website URL or registration link
- Positioned at bottom or bottom-left

**Decorative Elements:**
- Geometric shapes (circles, diagonal lines, dots patterns)
- Subtle background patterns or textures
- Border frames or rounded corners on entire banner (optional)

### Visual Design - UI/Form Interface
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
- User authentication (Supabase integration deferred to Phase 2)
- Saving/loading banner designs (Phase 2)
- Multiple speaker support beyond 3 speakers
- Custom font uploads
- Drag-and-drop canvas editing
- Animation or video export
- Social media scheduling integration
- A/B testing different banner designs
- Analytics on banner performance
- Custom geometric shape editor
- Advanced image editing (filters, effects)
- Multi-language support

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
