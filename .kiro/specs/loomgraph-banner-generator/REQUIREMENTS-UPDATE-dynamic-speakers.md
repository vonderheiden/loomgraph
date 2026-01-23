# Requirements Update: Dynamic Speaker Management

## Date: January 23, 2026

## Overview
Added support for dynamic speaker count selection and company logo uploads for each speaker.

---

## 🆕 New Features

### 1. Number of Speakers Dropdown

**Location**: Top of form, before webinar details

**Functionality**:
- Dropdown with options: 1, 2, or 3 speakers
- Default: 1 speaker
- Changes form layout dynamically

**Behavior**:
- When user selects "1 speaker":
  - Shows 1 speaker section
  - Template switches to "The Professional"
  
- When user selects "2 speakers":
  - Shows 2 speaker sections
  - Template switches to "The Duo"
  
- When user selects "3 speakers":
  - Shows 3 speaker sections
  - Template switches to "The Panel"

**Data Preservation**:
- If user enters data for Speaker 1, then switches to 2 speakers, Speaker 1 data is preserved
- If user switches back to 1 speaker, Speaker 2 data is hidden but not deleted (in case they switch back)

---

### 2. Dynamic Speaker Sections

**Each Speaker Section Includes**:

```
┌─────────────────────────────────────┐
│ Speaker [1/2/3]                     │
├─────────────────────────────────────┤
│                                     │
│ Speaker Name *                      │
│ [text input]                        │
│                                     │
│ Speaker Title/Company *             │
│ [text input]                        │
│                                     │
│ Speaker Headshot *                  │
│ [image upload]                      │
│                                     │
│ Company Logo (Optional)             │
│ [image upload]                      │
│                                     │
└─────────────────────────────────────┘
```

**Field Details**:

1. **Speaker Name**
   - Required field
   - Max 50 characters
   - Example: "Jane Smith"

2. **Speaker Title/Company**
   - Required field
   - Max 50 characters
   - Example: "CEO at TechCorp"

3. **Speaker Headshot**
   - Required field
   - JPG or PNG
   - Max 5MB
   - Automatically cropped to circle

4. **Company Logo** (NEW!)
   - Optional field
   - PNG with transparency preferred (also supports JPG)
   - Max 2MB
   - Automatically sized to fit
   - Example: Google logo, Microsoft logo, etc.

---

### 3. Company Logo Upload

**Purpose**: 
Show which company each speaker represents (their employer)

**Use Cases**:
- Speaker works at Google → Upload Google logo
- Speaker works at Microsoft → Upload Microsoft logo
- Panel with speakers from different companies → Each has their own logo

**Display**:
- Positioned below speaker name/title
- 60-100px width
- Maintains aspect ratio
- Center-aligned with speaker info

**Difference from Main Logo**:
- **Main Logo** (top of banner): Organizer/host company
- **Speaker Company Logos** (below each speaker): Employer logos
- **Partner Logo** (optional, top-right): Co-host or sponsor

---

## 📋 Updated User Stories

### Story 1: Core Banner Generation
**Updated Acceptance Criteria**:
- 1.1 User can select number of speakers (dropdown: 1, 2, or 3) ← NEW
- 1.2 Form dynamically shows/hides speaker fields based on selection ← NEW
- 1.3 User can input webinar title
- 1.4 For each speaker, user can input: ← UPDATED
  - Speaker name
  - Speaker title/company
  - Speaker headshot
  - Company logo (optional) ← NEW
- 1.5-1.8 (unchanged)

### Story 2: Speaker Photo Management
**Updated to support multiple speakers**:
- 2.1 User can upload an image file for each speaker ← UPDATED
- 2.2 Number of upload fields matches selected speaker count (1-3) ← NEW
- 2.7 Each speaker section is clearly labeled ← NEW

### Story 2a: Company Logo Management (NEW!)
**New user story for speaker company logos**:
- Upload company logo for each speaker
- Optional field
- Displayed near speaker information
- Supports multiple different logos

### Story 3a: Dynamic Speaker Form (NEW!)
**New user story for dynamic form behavior**:
- Number of speakers dropdown
- Form sections show/hide dynamically
- Template auto-switches based on count
- Data preservation when switching

---

## 🎨 Visual Examples

### Single Speaker (1)
```
Form:
┌─────────────────────┐
│ Number of Speakers  │
│ [1] ▼               │
├─────────────────────┤
│ Speaker 1           │
│ Name: John Doe      │
│ Title: CEO          │
│ Headshot: [img]     │
│ Logo: [Google]      │
└─────────────────────┘

Banner:
┌─────────────────────────────────┐
│ [Main Logo]                     │
│                                 │
│ WEBINAR TITLE        ╭─────╮   │
│ Subtitle             │     │   │
│                      │ IMG │   │
│ John Doe             │     │   │
│ CEO                  ╰─────╯   │
│ [Google Logo]                   │
│                                 │
│ Date & Time                     │
└─────────────────────────────────┘
```

### Dual Speakers (2)
```
Form:
┌─────────────────────┐
│ Number of Speakers  │
│ [2] ▼               │
├─────────────────────┤
│ Speaker 1           │
│ Name: John Doe      │
│ Title: CEO          │
│ Headshot: [img]     │
│ Logo: [Google]      │
├─────────────────────┤
│ Speaker 2           │
│ Name: Jane Smith    │
│ Title: CTO          │
│ Headshot: [img]     │
│ Logo: [Microsoft]   │
└─────────────────────┘

Banner:
┌─────────────────────────────────┐
│      WEBINAR TITLE              │
│                                 │
│   ╭─────╮      ╭─────╮         │
│   │ IMG │      │ IMG │         │
│   ╰─────╯      ╰─────╯         │
│   John Doe     Jane Smith      │
│   CEO          CTO             │
│   [Google]     [Microsoft]     │
│                                 │
│ Date & Time                     │
└─────────────────────────────────┘
```

### Triple Speakers (3)
```
Form:
┌─────────────────────┐
│ Number of Speakers  │
│ [3] ▼               │
├─────────────────────┤
│ Speaker 1           │
│ Name: John Doe      │
│ Title: CEO          │
│ Headshot: [img]     │
│ Logo: [Google]      │
├─────────────────────┤
│ Speaker 2           │
│ Name: Jane Smith    │
│ Title: CTO          │
│ Headshot: [img]     │
│ Logo: [Microsoft]   │
├─────────────────────┤
│ Speaker 3           │
│ Name: Bob Johnson   │
│ Title: VP           │
│ Headshot: [img]     │
│ Logo: [Amazon]      │
└─────────────────────┘

Banner:
┌─────────────────────────────────┐
│ [Main]          [Partner]       │
│                                 │
│ WEBINAR TITLE                   │
│                                 │
│ ╭───╮    ╭───╮    ╭───╮        │
│ │IMG│    │IMG│    │IMG│        │
│ ╰───╯    ╰───╯    ╰───╯        │
│ John     Jane     Bob           │
│ CEO      CTO      VP            │
│ [Goog]   [MSFT]   [Amzn]       │
│                                 │
│ Date            [Register Now!] │
└─────────────────────────────────┘
```

---

## 🔧 Implementation Notes

### State Management
```typescript
interface BannerState {
  // New field
  speakerCount: 1 | 2 | 3;
  
  // Updated to array
  speakers: Speaker[];
  
  // Rest of state...
}

interface Speaker {
  name: string;
  title: string;
  headshotUrl: string | null;
  headshotFile: File | null;
  companyLogoUrl: string | null;  // NEW
  companyLogoFile: File | null;   // NEW
}
```

### Form Behavior
1. User selects speaker count from dropdown
2. `updateField('speakerCount', count)` is called
3. Form re-renders with appropriate number of speaker sections
4. Template automatically switches based on count
5. Preview updates immediately

### Validation
- All speaker names required
- All speaker titles required
- All speaker headshots required
- Company logos optional (can be null)

---

## ✅ Updated Requirements Summary

**New Acceptance Criteria**: 8
**Updated Acceptance Criteria**: 5
**New User Stories**: 2 (Story 2a, Story 3a)
**Updated User Stories**: 2 (Story 1, Story 2)

**Total Impact**:
- Form becomes dynamic based on speaker count
- Supports 1-3 speakers with individual fields
- Each speaker can have their own company logo
- Templates auto-switch based on speaker count

---

## 🚀 Next Steps

1. Update state management to support speaker arrays
2. Create dynamic form component that shows/hides sections
3. Add company logo upload fields
4. Update templates to display company logos
5. Test speaker count switching with data preservation

---

This update significantly enhances the flexibility of LoomGraph to handle various webinar configurations!
