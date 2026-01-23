# LoomGraph - Comprehensive Architecture Review
## Date: January 22, 2026

---

## 🎯 Executive Summary

This review examines the current Phase 1A implementation against updated requirements for dynamic speaker management (1-3 speakers) and company logo uploads. Several critical architectural issues have been identified that must be addressed before implementing remaining features.

**Status**: ⚠️ **MAJOR REFACTORING REQUIRED**

**Key Findings**:
1. ✅ Current single-speaker implementation is solid
2. ❌ State model incompatible with multi-speaker requirements
3. ❌ Template architecture doesn't support dynamic speaker counts
4. ⚠️ Missing component structure for dynamic forms
5. ⚠️ Supabase integration design conflicts with current state model

---

## 📊 Current Implementation Analysis

### ✅ What's Working Well

#### 1. Project Foundation
- **Vite + React + TypeScript**: Solid foundation
- **Tailwind CSS v4**: Properly configured with Bento theme
- **Build System**: Working correctly (production builds successful)
- **Git/GitHub**: Repository set up, commits working

#### 2. Component Architecture
- **BannerContext**: Clean context pattern with type safety
- **Form Components**: Well-structured, reusable
- **Real-time Updates**: Debouncing working correctly
- **Validation**: Character limits and feedback implemented

#### 3. Rendering Engine
- **html-to-image**: Good choice for canvas rendering
- **MinimalistTemplate**: Clean implementation
- **Export Functionality**: Working correctly

#### 4. UI/UX
- **Bento Aesthetic**: Properly implemented
- **Responsive Layout**: Two-column layout working
- **Form Validation**: Real-time feedback working

---

## ❌ Critical Issues Identified

### Issue #1: State Model Incompatibility
**Severity**: 🔴 **CRITICAL - BLOCKS ALL MULTI-SPEAKER WORK**

**Current State Model**:
```typescript
interface BannerState {
  // Single speaker - flat structure
  speakerName: string;
  speakerRole: string;
  headshotUrl: string | null;
  headshotFile: File | null;
  // ... other fields
}
```

**Required State Model**:
```typescript
interface BannerState {
  // Multi-speaker - array structure
  speakerCount: 1 | 2 | 3;
  speakers: Speaker[];
  // ... other fields
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

**Impact**:
- Cannot implement dynamic speaker forms without refactoring
- All form components need to be updated
- Context methods need to support array operations
- Templates need to accept speaker arrays

**Resolution Required**: Complete state model refactoring

---

### Issue #2: Template Architecture Limitation
**Severity**: 🔴 **CRITICAL - BLOCKS TEMPLATE SWITCHING**

**Current Implementation**:
- Only `MinimalistTemplate` exists
- `BannerCanvas` hardcoded to render `MinimalistTemplate`
- No template factory or switching logic

**Required Implementation**:
- Three templates: Professional (1), Duo (2), Panel (3)
- Template factory pattern to select based on `speakerCount`
- Each template must handle different speaker array lengths

**Current Code**:
```typescript
// BannerCanvas.tsx - HARDCODED
return (
  <MinimalistTemplate state={state} />
);
```

**Required Code**:
```typescript
// BannerCanvas.tsx - DYNAMIC
const renderTemplate = () => {
  switch (state.speakerCount) {
    case 1: return <ProfessionalTemplate speakers={state.speakers} />;
    case 2: return <DuoTemplate speakers={state.speakers} />;
    case 3: return <PanelTemplate speakers={state.speakers} />;
  }
};
```

**Resolution Required**: Implement template factory and create missing templates

---

### Issue #3: Form Component Structure Gap
**Severity**: 🟡 **HIGH - BLOCKS DYNAMIC FORMS**

**Missing Components**:
1. `SpeakerCountSelector.tsx` - Dropdown for 1/2/3 speakers
2. `SpeakerSection.tsx` - Reusable speaker input section
3. `CompanyLogoUploader.tsx` - Logo upload component

**Current Structure**:
```
form/
├── WebinarDetailsForm.tsx  (single speaker fields)
├── DateTimeForm.tsx
├── HeadshotUploader.tsx    (single upload)
└── ColorPicker.tsx
```

**Required Structure**:
```
form/
├── WebinarDetailsForm.tsx  (title only)
├── SpeakerCountSelector.tsx  (NEW - dropdown)
├── SpeakerSection.tsx        (NEW - reusable per speaker)
├── DateTimeForm.tsx
├── HeadshotUploader.tsx      (refactor for reuse)
├── CompanyLogoUploader.tsx   (NEW)
└── ColorPicker.tsx
```

**Resolution Required**: Create new components and refactor existing ones

---

### Issue #4: Context API Limitations
**Severity**: 🟡 **HIGH - BLOCKS SPEAKER MANAGEMENT**

**Current Context Methods**:
```typescript
interface BannerContextType {
  state: BannerState;
  updateField: <K extends keyof BannerState>(field: K, value: BannerState[K]) => void;
  resetState: () => void;
}
```

**Required Context Methods**:
```typescript
interface BannerContextType {
  state: BannerState;
  updateField: <K extends keyof BannerState>(field: K, value: BannerState[K]) => void;
  updateSpeaker: (index: number, updates: Partial<Speaker>) => void;  // NEW
  addSpeaker: () => void;      // NEW (or handle via speakerCount)
  removeSpeaker: (index: number) => void;  // NEW (or handle via speakerCount)
  resetState: () => void;
}
```

**Missing Functionality**:
- No way to update individual speakers in array
- No way to add/remove speakers
- No way to preserve data when switching speaker counts

**Resolution Required**: Extend context with speaker array management methods

---

### Issue #5: Supabase Integration Conflict
**Severity**: 🟠 **MEDIUM - AFFECTS FUTURE PHASES**

**Design Document Specifies**:
```typescript
interface AssetConfig {
  title: string;
  speakers: Speaker[];  // Array structure
  schedule: Schedule;   // Nested object
  branding: Branding;   // Nested object
}
```

**Current Implementation**:
```typescript
interface BannerState {
  title: string;
  speakerName: string;  // Flat structure
  speakerRole: string;  // Flat structure
  date: string;         // Flat structure
  time: string;         // Flat structure
  // ...
}
```

**Conflict**:
- Current state model doesn't match Supabase JSONB structure
- Will require another refactoring when implementing Supabase
- Better to align now than refactor twice

**Recommendation**: 
- Refactor to `AssetConfig` structure now
- Add UI-only fields separately
- Avoid double refactoring

**Resolution Required**: Align state model with Supabase design

---

### Issue #6: Template Design Specifications Missing
**Severity**: 🟠 **MEDIUM - AFFECTS VISUAL QUALITY**

**Current Template**:
- `MinimalistTemplate`: Basic centered layout
- Does NOT match design reference examples
- Missing: bold colors, geometric accents, professional styling

**Design Reference Expectations**:
- Bold, vibrant backgrounds (deep blues, purples)
- Large circular headshots with white borders
- Geometric accent elements (stripes, dots)
- Company logos displayed
- Professional, high-impact design

**Current vs. Expected**:
```
Current:                    Expected:
┌─────────────────┐        ┌─────────────────┐
│                 │        │ [Logo]    ╱╱╱   │
│   TITLE         │        │                 │
│                 │        │ BIG TITLE  ●    │
│  ●  Name        │        │ Subtitle   ●    │
│     Title       │        │            ●    │
│                 │        │ REGISTER   ╭──╮ │
│  Date           │        │ ────────   │  │ │
│                 │        │ Date/Time  ╰──╯ │
│ ─────────       │        │ Location        │
└─────────────────┘        └─────────────────┘
  Minimal                    Professional
```

**Resolution Required**: Redesign templates to match reference examples

---

### Issue #7: Missing Validation for Multi-Speaker
**Severity**: 🟢 **LOW - NICE TO HAVE**

**Current Validation**:
- Title length (1-100 chars)
- Speaker name length (1-50 chars)
- File size/format for single headshot

**Missing Validation**:
- Validate all speakers have required fields
- Validate speaker count is 1-3
- Validate company logo file size/format
- Validate at least one speaker exists

**Resolution Required**: Extend validation system

---

## 🔧 Required Refactoring Plan

### Phase 1: State Model Refactoring (CRITICAL)
**Priority**: 🔴 **MUST DO FIRST**

**Tasks**:
1. Update `banner.types.ts`:
   - Add `Speaker` interface
   - Add `speakerCount` field
   - Change speaker fields to `speakers: Speaker[]`
   - Add company logo fields to Speaker

2. Update `BannerContext.tsx`:
   - Initialize with speaker array (default 1 speaker)
   - Add `updateSpeaker(index, updates)` method
   - Handle speaker count changes
   - Preserve data when switching counts

3. Update all form components:
   - `WebinarDetailsForm`: Remove speaker fields, keep title only
   - `HeadshotUploader`: Make reusable for any speaker index
   - Create `SpeakerSection`: Composite component for one speaker

**Estimated Effort**: 4-6 hours

---

### Phase 2: Dynamic Form Components (HIGH)
**Priority**: 🟡 **DO SECOND**

**Tasks**:
1. Create `SpeakerCountSelector.tsx`:
   - Dropdown with options 1, 2, 3
   - Updates `speakerCount` in context
   - Triggers form re-render

2. Create `SpeakerSection.tsx`:
   - Reusable component for one speaker
   - Props: `speakerIndex`, `speaker`, `updateSpeaker`
   - Contains: name, title, headshot, company logo

3. Create `CompanyLogoUploader.tsx`:
   - Similar to HeadshotUploader
   - Smaller preview size
   - Optional field

4. Update `FormPanel.tsx`:
   - Add SpeakerCountSelector at top
   - Render dynamic number of SpeakerSections
   - Map over `state.speakers` array

**Estimated Effort**: 3-4 hours

---

### Phase 3: Template Factory & New Templates (HIGH)
**Priority**: 🟡 **DO THIRD**

**Tasks**:
1. Create template factory in `BannerCanvas.tsx`:
   - Switch based on `speakerCount`
   - Pass `speakers` array to templates

2. Rename `MinimalistTemplate` to `ProfessionalTemplate`:
   - Update for single speaker from array
   - Add company logo display
   - Enhance styling to match design reference

3. Create `DuoTemplate.tsx`:
   - Layout for 2 speakers side-by-side
   - Display both company logos
   - Match design reference

4. Create `PanelTemplate.tsx`:
   - Layout for 3 speakers in row
   - Display all company logos
   - Match design reference

**Estimated Effort**: 6-8 hours

---

### Phase 4: Enhanced Template Styling (MEDIUM)
**Priority**: 🟠 **DO FOURTH**

**Tasks**:
1. Update all templates with design reference styling:
   - Bold, vibrant backgrounds
   - Geometric accent elements
   - Large headshots with white borders
   - Professional typography
   - Company logo positioning

2. Add gradient background support
3. Add geometric decorative elements
4. Improve spacing and hierarchy

**Estimated Effort**: 4-6 hours

---

### Phase 5: Validation & Error Handling (LOW)
**Priority**: 🟢 **DO LAST**

**Tasks**:
1. Extend validation system for multi-speaker
2. Add error messages for missing speaker data
3. Validate company logo uploads
4. Add form-level validation

**Estimated Effort**: 2-3 hours

---

## 📋 Updated Implementation Order

### Recommended Phased Approach

#### **Phase 1A-Revised: Multi-Speaker Foundation** (CURRENT PRIORITY)
**Goal**: Refactor state model and create dynamic forms

**Tasks**:
1. ✅ Refactor state model to support speaker arrays
2. ✅ Update BannerContext with speaker management methods
3. ✅ Create SpeakerCountSelector component
4. ✅ Create SpeakerSection component
5. ✅ Create CompanyLogoUploader component
6. ✅ Update FormPanel to render dynamic speakers
7. ✅ Test speaker count switching with data preservation

**Deliverable**: Working form that supports 1-3 speakers with company logos

**Estimated Time**: 8-10 hours

---

#### **Phase 1B: Template Implementation**
**Goal**: Create all three templates with proper styling

**Tasks**:
1. ✅ Implement template factory in BannerCanvas
2. ✅ Rename/update MinimalistTemplate → ProfessionalTemplate
3. ✅ Create DuoTemplate for 2 speakers
4. ✅ Create PanelTemplate for 3 speakers
5. ✅ Add company logo display to all templates
6. ✅ Enhance styling to match design reference
7. ✅ Test template switching

**Deliverable**: Three working templates that auto-switch based on speaker count

**Estimated Time**: 8-10 hours

---

#### **Phase 1C: Polish & Testing**
**Goal**: Refine UI/UX and ensure quality

**Tasks**:
1. ✅ Add geometric accent elements to templates
2. ✅ Implement gradient backgrounds
3. ✅ Improve typography and spacing
4. ✅ Add validation for multi-speaker
5. ✅ Test all speaker count combinations
6. ✅ Test export functionality for all templates
7. ✅ Cross-browser testing

**Deliverable**: Polished, production-ready MVP

**Estimated Time**: 6-8 hours

---

#### **Phase 2: Supabase Integration** (FUTURE)
**Goal**: Add authentication, storage, and persistence

**Tasks**: (Already documented in tasks.md, Tasks 31-37)
- Authentication with Supabase Auth
- Storage for headshots and logos
- Database persistence with JSONB
- Library and asset management
- User profiles

**Estimated Time**: 20-30 hours

---

## 🎯 Alignment with Design Document

### Current Misalignments

#### 1. State Model
**Design Doc Says**:
```typescript
interface AssetConfig {
  title: string;
  speakers: Speaker[];
  schedule: Schedule;
  branding: Branding;
}
```

**Current Implementation**:
```typescript
interface BannerState {
  title: string;
  speakerName: string;  // ❌ Should be speakers[]
  date: string;         // ❌ Should be schedule.date
  time: string;         // ❌ Should be schedule.time
  accentColor: string;  // ❌ Should be branding.primaryColor
}
```

**Recommendation**: Refactor to match `AssetConfig` structure now

---

#### 2. Template Architecture
**Design Doc Says**:
- Three templates: Minimalist, Bold Founder, Duo
- Template factory pattern
- Shared rendering utilities

**Current Implementation**:
- One template: Minimalist
- No factory pattern
- No shared utilities

**Recommendation**: Implement template factory and create missing templates

---

#### 3. Component Structure
**Design Doc Says**:
```
components/
├── form/
│   ├── WebinarDetailsForm.tsx
│   ├── DateTimeForm.tsx
│   ├── HeadshotUploader.tsx
│   ├── TemplateSelector.tsx
│   └── ColorPicker.tsx
├── templates/
│   ├── TemplateRenderer.tsx
│   ├── MinimalistTemplate.tsx
│   ├── BoldFounderTemplate.tsx
│   └── DuoTemplate.tsx
```

**Current Implementation**:
```
components/
├── form/
│   ├── WebinarDetailsForm.tsx
│   ├── DateTimeForm.tsx
│   ├── HeadshotUploader.tsx
│   └── ColorPicker.tsx
├── templates/
│   └── MinimalistTemplate.tsx
```

**Missing**:
- TemplateSelector component
- TemplateRenderer component
- BoldFounderTemplate
- DuoTemplate
- SpeakerCountSelector (not in original design doc)
- SpeakerSection (not in original design doc)
- CompanyLogoUploader (not in original design doc)

**Recommendation**: Create missing components

---

## 🔄 Supabase Integration Considerations

### Current State Model vs. Supabase JSONB

**Issue**: Current flat state model doesn't align with Supabase `content` JSONB column design.

**Supabase Design**:
```typescript
// generated_assets table
{
  content: {
    title: string;
    speakers: Speaker[];
    schedule: { date, time, timezone };
    branding: { primaryColor, logoUrl };
  }
}
```

**Current State**:
```typescript
{
  title: string;
  speakerName: string;  // Flat
  date: string;         // Flat
  accentColor: string;  // Flat
}
```

**Recommendation**: 
1. Refactor to nested structure now
2. Separate UI-only state from persisted state
3. Make `assetConfig` the source of truth
4. Add UI fields separately (template, showTimezone, etc.)

**Proposed Structure**:
```typescript
interface BannerState {
  // Persisted to Supabase (matches AssetConfig)
  assetConfig: {
    title: string;
    speakers: Speaker[];
    schedule: Schedule;
    branding: Branding;
  };
  
  // UI-only state (not persisted)
  ui: {
    template: string;
    showTimezone: boolean;
    uploadingHeadshot: boolean;
  };
}
```

**Benefits**:
- Direct mapping to Supabase JSONB
- Clear separation of concerns
- No refactoring needed when adding Supabase
- Easier to implement save/load functionality

---

## 📝 Updated Design Document Recommendations

### Sections to Update

#### 1. Data Models Section
**Add**:
- `Speaker` interface with company logo fields
- `speakerCount` field to BannerState
- Clarify difference between main logo and speaker company logos

#### 2. Component Structure Section
**Add**:
- `SpeakerCountSelector` component
- `SpeakerSection` component
- `CompanyLogoUploader` component
- Update `WebinarDetailsForm` description

#### 3. Template Designs Section
**Update**:
- Rename "The Minimalist" to "The Professional"
- Update "The Duo" to support 2 speakers
- Add "The Panel" for 3 speakers
- Add company logo display specifications

#### 4. State Management Section
**Update**:
- Add `updateSpeaker` method
- Add speaker count change handling
- Add data preservation logic

---

## 🚨 Breaking Changes Required

### 1. State Model Breaking Change
**Impact**: All components that use `state.speakerName`, `state.speakerRole`, `state.headshotUrl`

**Components Affected**:
- `WebinarDetailsForm.tsx`
- `MinimalistTemplate.tsx`
- `BannerCanvas.tsx`
- Any validation logic

**Migration Path**:
```typescript
// Before
state.speakerName

// After
state.speakers[0].name
```

---

### 2. Context API Breaking Change
**Impact**: All components that call `updateField` for speaker data

**Components Affected**:
- `WebinarDetailsForm.tsx`
- `HeadshotUploader.tsx`

**Migration Path**:
```typescript
// Before
updateField('speakerName', 'John Doe')

// After
updateSpeaker(0, { name: 'John Doe' })
```

---

### 3. Template Props Breaking Change
**Impact**: All template components

**Components Affected**:
- `MinimalistTemplate.tsx`

**Migration Path**:
```typescript
// Before
interface MinimalistTemplateProps {
  state: BannerState;
}

// After
interface ProfessionalTemplateProps {
  speakers: Speaker[];
  title: string;
  schedule: Schedule;
  branding: Branding;
}
```

---

## ✅ Action Items Summary

### Immediate Actions (Before Any New Features)

1. **Update State Model** (CRITICAL)
   - [ ] Add `Speaker` interface to `banner.types.ts`
   - [ ] Add `speakerCount` field
   - [ ] Change to `speakers: Speaker[]` array
   - [ ] Add company logo fields

2. **Update Context** (CRITICAL)
   - [ ] Add `updateSpeaker` method
   - [ ] Handle speaker count changes
   - [ ] Implement data preservation

3. **Create New Components** (HIGH)
   - [ ] `SpeakerCountSelector.tsx`
   - [ ] `SpeakerSection.tsx`
   - [ ] `CompanyLogoUploader.tsx`

4. **Refactor Existing Components** (HIGH)
   - [ ] `WebinarDetailsForm.tsx` - remove speaker fields
   - [ ] `HeadshotUploader.tsx` - make reusable
   - [ ] `FormPanel.tsx` - add dynamic speaker sections

5. **Implement Template Factory** (HIGH)
   - [ ] Add template switching logic to `BannerCanvas`
   - [ ] Rename `MinimalistTemplate` to `ProfessionalTemplate`
   - [ ] Create `DuoTemplate.tsx`
   - [ ] Create `PanelTemplate.tsx`

6. **Update Documentation** (MEDIUM)
   - [ ] Update design.md with new components
   - [ ] Update design.md with speaker array structure
   - [ ] Update design.md with company logo specs
   - [ ] Create migration guide for breaking changes

---

## 📊 Risk Assessment

### High Risk Items
1. **State Model Refactoring**: Touches all components, high chance of bugs
2. **Template Factory**: Complex logic, needs thorough testing
3. **Data Preservation**: Tricky to implement correctly

### Medium Risk Items
1. **Dynamic Form Rendering**: React rendering complexity
2. **Company Logo Upload**: New file upload logic
3. **Template Styling**: Design matching challenges

### Low Risk Items
1. **Validation Extension**: Straightforward addition
2. **Documentation Updates**: No code impact
3. **Component Creation**: Isolated new components

---

## 🎯 Success Criteria

### Phase 1A-Revised Completion
- [ ] User can select 1, 2, or 3 speakers
- [ ] Form dynamically shows/hides speaker sections
- [ ] Each speaker has name, title, headshot, company logo fields
- [ ] Data is preserved when switching speaker counts
- [ ] No console errors or warnings
- [ ] All TypeScript types are correct

### Phase 1B Completion
- [ ] Three templates exist and render correctly
- [ ] Template auto-switches based on speaker count
- [ ] Company logos display in all templates
- [ ] Templates match design reference examples
- [ ] Export works for all templates

### Phase 1C Completion
- [ ] All validation working for multi-speaker
- [ ] UI is polished and professional
- [ ] No bugs in speaker management
- [ ] Cross-browser tested
- [ ] Ready for production deployment

---

## 📚 References

- **Requirements**: `.kiro/specs/loomgraph-banner-generator/requirements.md`
- **Design Document**: `.kiro/specs/loomgraph-banner-generator/design.md`
- **Design Reference**: `.kiro/specs/loomgraph-banner-generator/design-reference.md`
- **Requirements Update**: `.kiro/specs/loomgraph-banner-generator/REQUIREMENTS-UPDATE-dynamic-speakers.md`
- **Tasks**: `.kiro/specs/loomgraph-banner-generator/tasks.md`

---

## 🏁 Conclusion

The current Phase 1A implementation provides a solid foundation, but **critical refactoring is required** before implementing multi-speaker support. The state model, context API, and template architecture must be updated to support dynamic speaker counts and company logos.

**Recommended Approach**:
1. **Stop** implementing new features
2. **Refactor** state model and context (Phase 1A-Revised)
3. **Implement** dynamic forms and template factory (Phase 1B)
4. **Polish** and test (Phase 1C)
5. **Then** proceed to Supabase integration (Phase 2)

**Estimated Total Time**: 22-28 hours for Phases 1A-Revised through 1C

**Risk Level**: Medium (manageable with careful refactoring)

**Recommendation**: Proceed with refactoring plan outlined above.

---

**Review Date**: January 22, 2026  
**Reviewer**: Kiro AI Assistant  
**Status**: ⚠️ **REFACTORING REQUIRED**
