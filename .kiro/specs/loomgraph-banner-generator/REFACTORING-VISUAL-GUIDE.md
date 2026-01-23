# LoomGraph - Visual Refactoring Guide
## State Model & Architecture Changes

---

## 🔄 State Model Transformation

### BEFORE (Current - Phase 1A)
```
BannerState (Flat Structure)
├── title: string
├── speakerName: string          ❌ Single speaker only
├── speakerRole: string           ❌ Single speaker only
├── headshotUrl: string | null    ❌ Single speaker only
├── headshotFile: File | null     ❌ Single speaker only
├── date: string                  ❌ Flat structure
├── time: string                  ❌ Flat structure
├── timezone: string
├── showTimezone: boolean
├── template: string
└── accentColor: string           ❌ Should be branding.primaryColor
```

### AFTER (Required - Phase 1A-Revised)
```
BannerState (Nested Structure)
├── title: string
├── speakerCount: 1 | 2 | 3      ✅ NEW - Controls form
├── speakers: Speaker[]           ✅ NEW - Array of speakers
│   ├── [0] Speaker
│   │   ├── name: string
│   │   ├── title: string
│   │   ├── headshotUrl: string | null
│   │   ├── headshotFile: File | null
│   │   ├── companyLogoUrl: string | null    ✅ NEW
│   │   └── companyLogoFile: File | null     ✅ NEW
│   ├── [1] Speaker (if speakerCount >= 2)
│   └── [2] Speaker (if speakerCount === 3)
├── schedule: Schedule            ✅ NEW - Nested object
│   ├── date: string
│   ├── time: string
│   └── timezone: string
├── branding: Branding            ✅ NEW - Nested object
│   ├── primaryColor: string
│   ├── logoUrl: string | null
│   └── logoFile: File | null
├── template: string              ✅ UI-only
└── showTimezone: boolean         ✅ UI-only
```

---

## 🎨 Component Architecture Changes

### BEFORE (Current)
```
FormPanel
├── WebinarDetailsForm
│   ├── Title Input
│   ├── Speaker Name Input        ❌ Single speaker
│   ├── Speaker Role Input        ❌ Single speaker
│   └── (hardcoded fields)
├── DateTimeForm
├── HeadshotUploader              ❌ Single upload
└── ColorPicker
```

### AFTER (Required)
```
FormPanel
├── SpeakerCountSelector          ✅ NEW - Dropdown (1/2/3)
│   └── Updates speakerCount
├── WebinarDetailsForm
│   └── Title Input ONLY          ✅ Simplified
├── SpeakerSection (x speakerCount)  ✅ NEW - Dynamic
│   ├── Speaker 1
│   │   ├── Name Input
│   │   ├── Title Input
│   │   ├── HeadshotUploader      ✅ Reusable
│   │   └── CompanyLogoUploader   ✅ NEW
│   ├── Speaker 2 (if count >= 2)
│   └── Speaker 3 (if count === 3)
├── DateTimeForm
└── ColorPicker
```

---

## 🏗️ Template Architecture Changes

### BEFORE (Current)
```
BannerCanvas
└── MinimalistTemplate (hardcoded)
    └── Renders single speaker
```

### AFTER (Required)
```
BannerCanvas
└── Template Factory (switch on speakerCount)
    ├── speakerCount === 1
    │   └── ProfessionalTemplate
    │       └── Renders speakers[0]
    ├── speakerCount === 2
    │   └── DuoTemplate
    │       └── Renders speakers[0] + speakers[1]
    └── speakerCount === 3
        └── PanelTemplate
            └── Renders speakers[0] + speakers[1] + speakers[2]
```

---

## 🔀 Data Flow Changes

### BEFORE (Current)
```
User Input → updateField('speakerName', value)
           → state.speakerName = value
           → MinimalistTemplate receives state
           → Renders state.speakerName
```

### AFTER (Required)
```
User Input → updateSpeaker(0, { name: value })
           → state.speakers[0].name = value
           → Template Factory checks speakerCount
           → Selects appropriate template
           → Template receives speakers array
           → Renders speakers[0].name (or speakers[0-2])
```

---

## 📊 Speaker Count Flow

### User Selects Speaker Count
```
┌─────────────────────────────────────────────────┐
│ SpeakerCountSelector                            │
│ [Select: 1 ▼]  →  [Select: 2 ▼]  →  [Select: 3 ▼] │
└─────────────────────────────────────────────────┘
         ↓                  ↓                  ↓
    speakerCount = 1   speakerCount = 2   speakerCount = 3
         ↓                  ↓                  ↓
┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐
│ Form Shows:     │  │ Form Shows:     │  │ Form Shows:     │
│ • Speaker 1     │  │ • Speaker 1     │  │ • Speaker 1     │
│                 │  │ • Speaker 2     │  │ • Speaker 2     │
│                 │  │                 │  │ • Speaker 3     │
└─────────────────┘  └─────────────────┘  └─────────────────┘
         ↓                  ↓                  ↓
┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐
│ Template:       │  │ Template:       │  │ Template:       │
│ Professional    │  │ Duo             │  │ Panel           │
└─────────────────┘  └─────────────────┘  └─────────────────┘
```

---

## 🎯 Template Layouts Visual

### Professional Template (1 Speaker)
```
┌─────────────────────────────────────────────┐
│ [Logo]                            ╱╱╱       │
│                                             │
│ LARGE WEBINAR TITLE          ╭─────────╮   │
│ Subtitle or Description      │         │   │
│                              │ Speaker │   │
│ REGISTER NOW                 │ Headshot│   │
│ ─────────────                │         │   │
│                              ╰─────────╯   │
│ Speaker Name                                │
│ Speaker Title                               │
│ [Company Logo]                              │
│                                             │
│ 📅 Date & Time                              │
│ 📍 Location                                 │
└─────────────────────────────────────────────┘
```

### Duo Template (2 Speakers)
```
┌─────────────────────────────────────────────┐
│                                             │
│         LARGE WEBINAR TITLE                 │
│         "Subtitle or Topic"                 │
│                                             │
│     ╭─────────╮         ╭─────────╮        │
│     │         │         │         │        │
│     │Speaker 1│         │Speaker 2│        │
│     │Headshot │         │Headshot │        │
│     │         │         │         │        │
│     ╰─────────╯         ╰─────────╯        │
│    Speaker Name        Speaker Name        │
│    Speaker Title       Speaker Title       │
│    [Company Logo]      [Company Logo]      │
│                                             │
│ 📅 Date & Time              🌐 Website      │
│ 📍 Location                                 │
│                                             │
│ [Register Now]                              │
└─────────────────────────────────────────────┘
```

### Panel Template (3 Speakers)
```
┌─────────────────────────────────────────────┐
│ [Main Logo]                  [Partner Logo] │
│                                             │
│ [⏰ Time Badge]                             │
│                                             │
│ Large Webinar Title                         │
│ Spanning Multiple Lines                     │
│                                             │
│  ╭─────╮      ╭─────╮      ╭─────╮         │
│  │Spkr1│      │Spkr2│      │Spkr3│         │
│  ╰─────╯      ╰─────╯      ╰─────╯         │
│  Name         Name         Name            │
│  Title        Title        Title           │
│  [Logo]       [Logo]       [Logo]          │
│                                             │
│ 📅 Date Info              [Register Now!]  │
└─────────────────────────────────────────────┘
```

---

## 🔧 Context API Changes

### BEFORE (Current Methods)
```typescript
interface BannerContextType {
  state: BannerState;
  updateField: (field, value) => void;
  resetState: () => void;
}

// Usage:
updateField('speakerName', 'John Doe')
updateField('speakerRole', 'CEO')
```

### AFTER (Required Methods)
```typescript
interface BannerContextType {
  state: BannerState;
  updateField: (field, value) => void;
  updateSpeaker: (index, updates) => void;  ✅ NEW
  setSpeakerCount: (count) => void;         ✅ NEW
  resetState: () => void;
}

// Usage:
updateSpeaker(0, { name: 'John Doe' })
updateSpeaker(0, { title: 'CEO' })
setSpeakerCount(2)  // Adds empty speaker at index 1
```

---

## 📦 File Changes Summary

### Files to CREATE
```
✅ src/components/form/SpeakerCountSelector.tsx
✅ src/components/form/SpeakerSection.tsx
✅ src/components/form/CompanyLogoUploader.tsx
✅ src/components/templates/DuoTemplate.tsx
✅ src/components/templates/PanelTemplate.tsx
```

### Files to RENAME
```
🔄 src/components/templates/MinimalistTemplate.tsx
   → src/components/templates/ProfessionalTemplate.tsx
```

### Files to REFACTOR
```
🔧 src/types/banner.types.ts           (state model)
🔧 src/context/BannerContext.tsx       (add methods)
🔧 src/components/FormPanel.tsx        (dynamic speakers)
🔧 src/components/form/WebinarDetailsForm.tsx  (remove speaker fields)
🔧 src/components/form/HeadshotUploader.tsx    (add speakerIndex prop)
🔧 src/components/preview/BannerCanvas.tsx     (template factory)
🔧 src/components/templates/ProfessionalTemplate.tsx  (use speakers[0])
```

---

## 🎬 Implementation Sequence

### Step 1: State Model (CRITICAL - DO FIRST)
```
1. Update banner.types.ts
   ├── Add Speaker interface
   ├── Add speakerCount field
   ├── Change to speakers array
   └── Add Schedule and Branding interfaces

2. Update BannerContext.tsx
   ├── Update initial state
   ├── Add updateSpeaker method
   ├── Add setSpeakerCount method
   └── Update context type
```

### Step 2: Form Components (HIGH - DO SECOND)
```
3. Create SpeakerCountSelector.tsx
   └── Dropdown with 1/2/3 options

4. Create SpeakerSection.tsx
   ├── Name input
   ├── Title input
   ├── HeadshotUploader (reused)
   └── CompanyLogoUploader (new)

5. Create CompanyLogoUploader.tsx
   └── Similar to HeadshotUploader

6. Update FormPanel.tsx
   ├── Add SpeakerCountSelector
   └── Map over speakers array
```

### Step 3: Templates (HIGH - DO THIRD)
```
7. Update BannerCanvas.tsx
   └── Add template factory switch

8. Rename MinimalistTemplate → ProfessionalTemplate
   └── Update to use speakers[0]

9. Create DuoTemplate.tsx
   └── Layout for speakers[0] and speakers[1]

10. Create PanelTemplate.tsx
    └── Layout for speakers[0], [1], [2]
```

---

## ✅ Testing Checklist

### State Management Tests
- [ ] Can select 1 speaker
- [ ] Can select 2 speakers
- [ ] Can select 3 speakers
- [ ] Data preserved when switching from 1→2→3
- [ ] Data preserved when switching from 3→2→1
- [ ] Can update individual speaker fields
- [ ] Can upload headshot for each speaker
- [ ] Can upload company logo for each speaker

### Form Tests
- [ ] SpeakerCountSelector renders correctly
- [ ] Form shows 1 speaker section when count=1
- [ ] Form shows 2 speaker sections when count=2
- [ ] Form shows 3 speaker sections when count=3
- [ ] Speaker sections labeled correctly
- [ ] All inputs work correctly
- [ ] File uploads work for all speakers

### Template Tests
- [ ] ProfessionalTemplate renders with 1 speaker
- [ ] DuoTemplate renders with 2 speakers
- [ ] PanelTemplate renders with 3 speakers
- [ ] Template switches automatically
- [ ] Company logos display correctly
- [ ] Export works for all templates

---

## 🚨 Common Pitfalls to Avoid

### ❌ DON'T
1. Try to implement new features before refactoring
2. Keep flat state structure
3. Hardcode speaker count
4. Delete speaker data when count decreases
5. Skip TypeScript type updates
6. Forget to update all components
7. Skip testing speaker count switching

### ✅ DO
1. Complete state refactoring first
2. Use nested structure (speakers array)
3. Make speaker count dynamic
4. Preserve data when switching counts
5. Update all TypeScript types
6. Update all affected components
7. Test all speaker count combinations

---

## 📈 Progress Tracking

### Phase 1A-Revised: Multi-Speaker Foundation
```
State Model Refactoring
├── [ ] Update banner.types.ts
├── [ ] Update BannerContext.tsx
├── [ ] Update initial state
└── [ ] Add new context methods

Component Creation
├── [ ] Create SpeakerCountSelector
├── [ ] Create SpeakerSection
└── [ ] Create CompanyLogoUploader

Component Refactoring
├── [ ] Update FormPanel
├── [ ] Update WebinarDetailsForm
└── [ ] Update HeadshotUploader

Testing
├── [ ] Test speaker count switching
├── [ ] Test data preservation
└── [ ] Test all form inputs
```

### Phase 1B: Template Implementation
```
Template Factory
├── [ ] Add switch logic to BannerCanvas
└── [ ] Test template switching

Template Creation
├── [ ] Rename to ProfessionalTemplate
├── [ ] Create DuoTemplate
└── [ ] Create PanelTemplate

Template Styling
├── [ ] Add company logo display
├── [ ] Match design reference
└── [ ] Test all templates
```

### Phase 1C: Polish & Testing
```
Polish
├── [ ] Add geometric accents
├── [ ] Add gradient backgrounds
└── [ ] Improve typography

Testing
├── [ ] Validation for multi-speaker
├── [ ] Cross-browser testing
└── [ ] Export testing
```

---

## 🎯 Success Metrics

### Phase 1A-Revised Complete When:
✅ User can select 1, 2, or 3 speakers  
✅ Form dynamically shows/hides sections  
✅ Each speaker has all required fields  
✅ Data preserved when switching counts  
✅ No TypeScript errors  
✅ No console warnings  

### Phase 1B Complete When:
✅ Three templates exist  
✅ Templates auto-switch  
✅ Company logos display  
✅ Templates match design reference  
✅ Export works for all  

### Phase 1C Complete When:
✅ All validation working  
✅ UI polished  
✅ No bugs  
✅ Cross-browser tested  
✅ Production ready  

---

## 📞 Need Help?

### If You Get Stuck:
1. Review this visual guide
2. Check ARCHITECTURE-REVIEW-2026-01-22.md
3. Review design.md for updated specs
4. Check REQUIREMENTS-UPDATE-dynamic-speakers.md
5. Ask for clarification

### Key Documents:
- **This Guide**: Visual overview of changes
- **Architecture Review**: Detailed analysis and plan
- **Design Document**: Updated technical specs
- **Requirements Update**: Feature specifications
- **Tasks**: Implementation checklist

---

**Created**: January 22, 2026  
**Purpose**: Visual guide for refactoring  
**Audience**: Developers implementing changes  
**Status**: Ready for implementation
