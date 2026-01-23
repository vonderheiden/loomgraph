# LoomGraph - Design Reference Guide

## Visual Design Inspiration

This document captures the design patterns and aesthetic from the reference webinar banner examples.

---

## 🎨 **Color Palette Patterns**

### Example 1: Corporate Professional
- **Primary**: Deep Blue-Teal (#2C5F6F, #3A7A8A)
- **Accent**: Light Blue (#7DD3E8)
- **Text**: White (#FFFFFF)
- **Style**: Diagonal accent stripes, professional corporate feel

### Example 2: Vibrant Energy
- **Primary**: Deep Purple (#4A1A6B, #5B2A7C)
- **Accent**: Lighter Purple tones
- **Text**: White (#FFFFFF)
- **Style**: Geometric dots pattern, modern and energetic

### Example 3: Modern Gradient
- **Primary**: Blue to Purple gradient (#1E5BA8 → #8B4FA8)
- **Accent**: Light blue/white elements
- **Text**: White (#FFFFFF)
- **Style**: Smooth gradient, rounded border frame, contemporary

---

## 📐 **Layout Patterns**

### Single Speaker Layout (Example 1)
```
┌─────────────────────────────────────────────┐
│ [Logo]                                      │
│                                             │
│ LARGE TITLE                    ╭─────╮     │
│ SUBTITLE                       │     │     │
│                                │ IMG │     │
│ REGISTER NOW                   │     │     │
│ ─────────────                  ╰─────╯     │
│ Date & Time                                 │
│ Contact Info                                │
│ Location                                    │
└─────────────────────────────────────────────┘
```

**Key Elements:**
- Logo: Top-left, ~120px width
- Title: Left side, 60% width, 64-72px font
- Headshot: Right side, 40% width, 300-400px diameter circle
- CTA: Left side, below title
- Date/Time: Left side, bottom area
- Accent: Diagonal stripes top-right

---

### Dual Speaker Layout (Example 2)
```
┌─────────────────────────────────────────────┐
│                                             │
│         LARGE TITLE                         │
│         "Subtitle or Topic"                 │
│                                             │
│     ╭─────╮           ╭─────╮              │
│     │     │           │     │              │
│     │ IMG │           │ IMG │              │
│     │     │           │     │              │
│     ╰─────╯           ╰─────╯              │
│   Speaker Name      Speaker Name           │
│   [Company Logo]    [Company Logo]         │
│                                             │
│ [Calendar] Date/Time    [Pin] Location     │
│                                             │
│ Register Now          www.website.com      │
└─────────────────────────────────────────────┘
```

**Key Elements:**
- Title: Top center, 56-64px font
- Headshots: Two circles, 200-250px each, centered
- Speaker names: Below each headshot, 24-28px font
- Company logos: Below speaker names, 60-80px width (optional)
- Date/Time: Bottom-left with icons
- CTA: Bottom-left
- Website: Bottom-right

---

### Triple Speaker Layout (Example 3)
```
┌─────────────────────────────────────────────┐
│ [Main Logo]              [Partner Logo]     │
│                                             │
│ [Badge] Time                                │
│                                             │
│ Large Title Text Spanning                   │
│ Multiple Lines if Needed                    │
│                                             │
│  ╭───╮      ╭───╮      ╭───╮               │
│  │IMG│      │IMG│      │IMG│               │
│  ╰───╯      ╰───╯      ╰───╯               │
│  Name       Name       Name                 │
│  Title      Title      Title                │
│  [Logo]     [Logo]     [Logo]               │
│                                             │
│ Date Info              [Register Now!]      │
└─────────────────────────────────────────────┘
```

**Key Elements:**
- Dual logos: Top-left (main) and top-right (partner/co-host)
- Time badge: Small pill shape, top-left below logos
- Title: Large, 48-64px font, left-aligned
- Headshots: Three circles, 180-220px each, horizontal row
- Speaker info: Name + title below each headshot
- Company logos: Below each speaker's title, 60-80px width (optional)
- Date: Bottom-left
- CTA: Bottom-right, button style

---

## 🖼️ **Headshot Treatment**

### Specifications:
- **Shape**: Perfect circle
- **Border**: 8-12px white border
- **Shadow**: Subtle drop shadow (optional)
- **Size by Layout**:
  - Single: 300-400px diameter
  - Dual: 200-250px diameter
  - Triple: 180-220px diameter
- **Position**: Centered within their section
- **Spacing**: 40-60px between headshots in multi-speaker layouts

### Image Quality:
- Professional photography preferred
- Good lighting and clear background
- Face should be centered and clearly visible
- Minimum resolution: 400x400px per headshot

---

## 🏢 **Company Logo Treatment**

### Specifications:
- **Format**: PNG with transparency preferred (also supports JPG)
- **Size**: 60-100px width (auto-height to maintain aspect ratio)
- **Position**: Below speaker name/title
- **Spacing**: 10-15px from speaker title text
- **Alignment**: Center-aligned with speaker info

### Usage Patterns:
- **Single Speaker**: Company logo below speaker title (optional)
- **Dual Speakers**: Each speaker can have their own company logo
- **Triple Speakers**: Each speaker can have their own company logo
- **Examples**: Google logo, Microsoft logo, Amazon logo, etc.

### Logo Quality:
- High resolution (minimum 200px width)
- Transparent background preferred
- Clear, recognizable branding
- Proper aspect ratio maintained

### Main Banner Logo vs Speaker Company Logos:
- **Main Logo**: Top-left or top-center (organizer/host company)
- **Speaker Company Logos**: Below each speaker's info (employer logos)
- **Partner Logo**: Top-right (co-host or sponsor, optional)

---

## 📝 **Typography Hierarchy**

### Title Text
- **Font Size**: 48-72px (varies by template and text length)
- **Font Weight**: Bold (700-900)
- **Color**: White or very light color
- **Line Height**: 1.1-1.2
- **Max Width**: 60-70% of banner width (single speaker)
- **Alignment**: Left or center (depends on template)

### Subtitle/Topic
- **Font Size**: 24-32px
- **Font Weight**: Regular or Medium (400-500)
- **Color**: White with 80-90% opacity
- **Style**: Often in quotes or italics

### Speaker Names
- **Font Size**: 24-32px
- **Font Weight**: Bold (600-700)
- **Color**: White or dark (depends on background)
- **Alignment**: Center (below headshot)

### Speaker Titles
- **Font Size**: 16-20px
- **Font Weight**: Regular (400)
- **Color**: White with 70-80% opacity
- **Alignment**: Center (below name)

### Date/Time/Location
- **Font Size**: 18-24px
- **Font Weight**: Regular to Medium (400-500)
- **Color**: White
- **Icons**: Small icons (20-24px) before text

### CTA Button
- **Font Size**: 20-24px
- **Font Weight**: Bold (600-700)
- **Style**: Button or underlined text
- **Color**: White on dark background or contrasting color

---

## 🎭 **Decorative Elements**

### Geometric Accents
1. **Diagonal Stripes** (Example 1)
   - 2-3 diagonal lines
   - Light blue color
   - Top-right corner
   - 45-degree angle
   - Varying widths (40-80px)

2. **Dot Patterns** (Example 2)
   - Small dots in grid pattern
   - Top-right corner
   - Same color as background but lighter
   - 5x5 or 6x6 grid

3. **Curved Shapes** (Example 1)
   - Subtle curved lines
   - Background layer
   - Same color family as main background
   - Adds depth without distraction

### Border Frames
- **Rounded corners**: 20-30px radius on entire banner
- **Border**: 2-4px white or light color
- **Padding**: 20-30px from edge
- **Style**: Modern, clean, frames the content

---

## 🎨 **Background Styles**

### Solid Color
- Rich, saturated colors
- Professional corporate colors
- High contrast with white text
- Examples: Deep blue, purple, teal, navy

### Gradient
- **Direction**: Diagonal (45°) or horizontal
- **Colors**: Two complementary colors
- **Transition**: Smooth, not abrupt
- **Examples**:
  - Blue → Purple
  - Teal → Blue
  - Purple → Pink

### Textured/Patterned
- Subtle geometric patterns
- Low opacity overlays
- Adds visual interest without distraction
- Examples: Dots, lines, curves

---

## 📏 **Spacing & Padding**

### Overall Banner
- **Padding**: 40-60px from edges
- **Safe Zone**: Keep important content 60px from edges

### Between Elements
- **Title to Headshot**: 40-60px
- **Headshot to Name**: 20-30px
- **Name to Title**: 10-15px
- **Between Headshots**: 40-60px
- **Sections**: 30-40px vertical spacing

---

## 🎯 **Call-to-Action Patterns**

### Style 1: Text with Underline
- "REGISTER NOW"
- Underline: 3-4px thick
- Width: Matches text width
- Color: White or accent color

### Style 2: Button
- "Register Now!"
- Rounded corners: 8-12px
- Padding: 16px 32px
- Background: White or contrasting color
- Text: Dark color for contrast

### Style 3: Text Only
- "Register Now"
- Bold, larger font
- No background
- High contrast color

---

## 🔤 **Font Recommendations**

### Primary Fonts (Titles)
- **Inter**: Modern, clean, highly readable
- **Poppins**: Friendly, geometric, professional
- **Montserrat**: Bold, impactful, contemporary
- **Raleway**: Elegant, sophisticated

### Secondary Fonts (Body)
- **Inter**: Consistent with title
- **Open Sans**: Highly readable
- **Roboto**: Clean, neutral

### Font Pairing
- **Recommended**: Use same font family for consistency
- **Alternative**: Pair geometric sans-serif (title) with humanist sans-serif (body)

---

## 📱 **Icon Usage**

### Common Icons
- **Calendar**: Date information
- **Clock**: Time information
- **Location Pin**: Venue/location
- **Phone**: Contact number
- **Globe/Link**: Website URL

### Icon Style
- **Size**: 20-28px
- **Color**: White or accent color
- **Style**: Line icons (not filled)
- **Spacing**: 8-12px from text

---

## ✨ **Key Takeaways**

1. **Bold, Vibrant Colors**: Don't be afraid of rich, saturated backgrounds
2. **Large Headshots**: Make speakers prominent and recognizable
3. **Clear Hierarchy**: Title → Speakers → Details → CTA
4. **White Space**: Don't overcrowd - let elements breathe
5. **Professional Photography**: High-quality headshots are essential
6. **Geometric Accents**: Add visual interest without distraction
7. **High Contrast**: Ensure text is always readable
8. **Consistent Branding**: Logo placement and colors should be consistent

---

## 🚀 **Implementation Priority**

### Phase 1A (Current - Minimal)
- Basic layout structure
- Single speaker support
- Simple solid background
- Basic text rendering

### Phase 1B (Next - Enhanced)
- All three template layouts
- Gradient backgrounds
- Geometric accent elements
- Logo upload support
- CTA customization

### Phase 1C (Polish)
- Advanced styling options
- Multiple background presets
- Icon integration
- Border frame options
- Fine-tuned spacing

---

This reference guide should inform all design decisions for LoomGraph templates.
