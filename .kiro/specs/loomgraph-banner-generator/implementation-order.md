# LoomGraph - Recommended Implementation Order

## Overview
This document provides the exact order to implement tasks for rapid deployment with early feedback cycles.

## Phase 1A: Core MVP → Deploy to Render.com
**Goal**: Get a working app deployed ASAP for UI/UX feedback  
**Timeline**: 2-3 days  
**Deploy After**: This phase

### Day 1: Foundation & Forms

#### Morning (4 hours)
1. **Task 1.1-1.6**: Project Setup
   - Create Vite + React + TypeScript project
   - Install dependencies (Tailwind, Lucide React, html-to-image)
   - Configure Tailwind with Bento theme
   - Set up folder structure
   - Configure ESLint/Prettier

2. **Task 2.1-2.4**: Type Definitions (Simplified)
   ```typescript
   // Start with simple, flat structure
   interface BannerState {
     title: string;
     speakerName: string;
     speakerRole: string;
     headshotUrl: string | null;
     date: string;
     time: string;
     timezone: string;
     showTimezone: boolean;
     accentColor: string;
   }
   ```

3. **Task 3.1-3.5**: Banner Context
   - Create context with simplified state
   - Implement update functions
   - Create useBannerState hook

#### Afternoon (4 hours)
4. **Task 4.1-4.6**: WebinarDetailsForm
   - Title input with character count
   - Speaker name input
   - Speaker role input
   - Connect to context

5. **Task 5.1-5.6**: DateTimeForm
   - Date picker (HTML5 input type="date")
   - Time picker (HTML5 input type="time")
   - Timezone toggle
   - Timezone dropdown

6. **Task 6.1-6.6**: HeadshotUploader (Simplified)
   - File input (no drag-drop for MVP)
   - FileReader to convert to data URL
   - Circular preview with CSS
   - Remove button

### Day 2: Canvas & Preview

#### Morning (4 hours)
7. **Task 8.1-8.5**: ColorPicker
   - HTML5 color input
   - Hex input field
   - 3-4 preset swatches
   - Connect to context

8. **Task 9.1-9.5**: FormPanel
   - Left column layout
   - Organize forms into cards
   - Add section headers
   - Basic responsive behavior

9. **Task 10.1-10.5**: Canvas Utilities
   - Text measurement helper
   - Color manipulation helpers
   - File naming utility

#### Afternoon (4 hours)
10. **Task 11.1-11.7**: MinimalistTemplate (ONLY THIS ONE)
    - Create template component
    - Layout with Tailwind/CSS
    - Render title, speaker, date/time
    - Circular headshot with CSS
    - Accent color application

11. **Task 15.1-15.7**: BannerCanvas
    - Wrapper component for template
    - Use html-to-image library
    - Connect to context state
    - Real-time re-render on state change

12. **Task 16.1-16.5**: PreviewPanel
    - Right column layout
    - Canvas container
    - Preview border/shadow
    - Responsive scaling

### Day 3: Export & Deploy

#### Morning (3 hours)
13. **Task 17.1-17.6**: Export Functionality
    - html-to-image to blob conversion
    - File naming logic
    - Download trigger
    - PNG export at 2x resolution

14. **Task 18.1-18.5**: ExportButton
    - Button with Bento styling
    - Download icon
    - Loading state
    - Success feedback

15. **Task 19.1-19.7**: App Component
    - Root component
    - Two-column Bento layout
    - Wrap with BannerProvider
    - Add FormPanel and PreviewPanel
    - Global styles

16. **Task 20.1-20.7**: Validation System
    - Required field validation
    - Character limits
    - File size/type validation
    - Error message display

#### Afternoon (2 hours)
17. **Task 29.1-29.5**: Build Configuration
    - Production build settings
    - Environment variables
    - Test production build locally

18. **Deploy to Render.com**
    - Create GitHub repository
    - Push code to GitHub
    - Set up Render.com static site
    - Configure build settings
    - Deploy!

#### Evening (1 hour)
19. **Task 28.1**: Write README
    - Setup instructions
    - How to use
    - Deployment info

---

## 🎯 Phase 1A Checkpoint
**You should now have**:
- ✅ Working form with real-time preview
- ✅ Single template (Minimalist)
- ✅ Export to PNG functionality
- ✅ Deployed to Render.com
- ✅ GitHub repository

**Test & Review**:
- Create a banner end-to-end
- Test on Chrome, Firefox, Safari
- Share URL with stakeholders for feedback
- Note any issues or improvements

---

## Phase 1B: Templates & Polish → Deploy
**Goal**: Add remaining templates and polish UI  
**Timeline**: 1-2 days  
**Deploy After**: This phase

### Day 4: Templates

#### Morning (3 hours)
1. **Task 7.1-7.5**: TemplateSelector
   - Horizontal thumbnail gallery
   - Three template thumbnails
   - Active state indication
   - Click to switch templates

2. **Task 14.1-14.5**: TemplateRenderer
   - Template factory pattern
   - Switch between templates
   - Shared utilities

#### Afternoon (4 hours)
3. **Task 12.1-12.7**: BoldFounderTemplate
   - Bold, left-aligned layout
   - Color blocks
   - Headshot with accent border

4. **Task 13.1-13.7**: DuoTemplate
   - Split layout
   - Dual headshot positioning
   - Balanced typography

### Day 5: Polish

#### Morning (3 hours)
5. **Task 26.1-26.6**: UI/UX Refinements
   - Smooth transitions
   - Loading states
   - Toast notifications
   - Hover/focus states
   - Empty states

#### Afternoon (2 hours)
6. **Task 27.1-27.5**: Error Handling
   - Canvas render failures
   - Image load failures
   - Export failures
   - Fallback templates

7. **Deploy to Render.com**
   - Push to GitHub
   - Auto-deploy via Render

---

## 🎯 Phase 1B Checkpoint
**You should now have**:
- ✅ Three template options
- ✅ Template selector UI
- ✅ Polished UI with animations
- ✅ Better error handling

**Test & Review**:
- Test all three templates
- Verify template switching
- Test error scenarios
- Gather more feedback

---

## Phase 1C: Testing & Optimization → Deploy
**Goal**: Ensure quality and performance  
**Timeline**: 1 day  
**Deploy After**: This phase

### Day 6: Quality

#### Morning (3 hours)
1. **Task 21.1-21.5**: Unit Tests
   - Test utilities
   - Test validation
   - Test state management

2. **Task 23.1-23.5**: Integration Tests
   - Test form-to-canvas flow
   - Test template switching
   - Test export

#### Afternoon (3 hours)
3. **Task 24.1-24.6**: Accessibility
   - ARIA labels
   - Keyboard navigation
   - Focus indicators
   - Color contrast

4. **Task 25.1-25.5**: Performance Optimization
   - Lazy loading
   - Memoization
   - Image optimization
   - Bundle size optimization

5. **Task 30.1-30.6**: Final Testing
   - Cross-browser testing
   - Performance testing
   - End-to-end workflow
   - Final QA

6. **Task 28.2-28.5**: Documentation
   - Component API docs
   - User guide
   - Deployment docs

7. **Deploy to Render.com**
   - Push to GitHub
   - Auto-deploy via Render

---

## 🎯 Phase 1C Checkpoint (MVP Complete!)
**You should now have**:
- ✅ Comprehensive test suite
- ✅ Accessibility compliant
- ✅ Optimized performance
- ✅ Complete documentation
- ✅ Production-ready MVP

---

## Phase 2A: Supabase Foundation → Deploy
**Goal**: Add authentication and migrate state  
**Timeline**: 2 days  
**Deploy After**: This phase

### Day 7-8: Auth & State Migration

1. **Task 31.1-31.8**: Supabase Authentication
   - Install Supabase client
   - Configure Supabase
   - Create AuthProvider
   - Build AuthModal
   - Implement sign-in/sign-up

2. **Task 34.1-34.8**: State Refactoring
   - Migrate to AssetConfig structure
   - Update context
   - Update all form components
   - Ensure Preview is pure function
   - Test state synchronization

3. **Task 35.1-35.8**: Auto-Save Implementation
   - Create useDebounce hook
   - Implement useAutoSave hook
   - Add auto-save indicator
   - Draft restoration
   - Clear draft after save

4. **Deploy to Render.com**
   - Add Supabase env variables
   - Push to GitHub
   - Auto-deploy

---

## Phase 2B: Storage & Persistence → Deploy
**Goal**: Save banners to cloud  
**Timeline**: 2 days  
**Deploy After**: This phase

### Day 9-10: Cloud Storage

1. **Task 32.1-32.8**: Supabase Storage
   - Create storage buckets
   - Configure policies
   - Implement uploadHeadshot
   - Add image transformations
   - Update HeadshotUploader

2. **Task 33.1-33.8**: Database Persistence
   - Create saveGeneratedAsset
   - Save on download
   - Store template_id and config
   - Add loading states
   - Toast notifications

3. **Task 36.1-36.10**: Library Management
   - Create LibraryView
   - Asset listing
   - AssetCard component
   - Remix functionality
   - Delete assets
   - Search/filter

4. **Deploy to Render.com**
   - Push to GitHub
   - Auto-deploy

---

## Phase 2C: Profiles & Advanced → Deploy
**Goal**: Complete Supabase integration  
**Timeline**: 1-2 days  
**Deploy After**: This phase

### Day 11-12: Profiles

1. **Task 37.1-37.8**: User Profile Management
   - Profile creation
   - Settings page
   - Brand kit inputs
   - Auto-populate branding
   - Profile updates

2. **Task 22.1-22.8**: Property-Based Tests
   - Install fast-check
   - Write property tests
   - Test all properties

3. **Deploy to Render.com**
   - Push to GitHub
   - Auto-deploy

---

## 🎯 Phase 2 Complete!
**You should now have**:
- ✅ Full Supabase integration
- ✅ User authentication
- ✅ Cloud storage
- ✅ Banner library
- ✅ User profiles
- ✅ Comprehensive tests

---

## Quick Reference: Task Dependencies

### No Dependencies (Can start immediately)
- Task 1: Project Setup
- Task 28: Documentation (ongoing)

### Depends on Task 1 (Project Setup)
- Task 2: Type Definitions
- Task 3: Banner Context

### Depends on Task 3 (Context)
- Task 4-9: All form components (can be parallel)
- Task 10: Canvas Utilities

### Depends on Task 10 (Utilities)
- Task 11-13: Templates (can be parallel)

### Depends on Templates
- Task 14: TemplateRenderer
- Task 15: BannerCanvas

### Depends on Task 15 (Canvas)
- Task 16: PreviewPanel
- Task 17: Export Functionality

### Depends on Export
- Task 18: ExportButton

### Depends on All Components
- Task 19: App Component
- Task 20: Validation

### Can be done anytime after Phase 1A
- Task 21: Unit Tests
- Task 23: Integration Tests
- Task 24: Accessibility
- Task 25: Performance
- Task 26: UI Polish
- Task 27: Error Handling

---

## Git Workflow Recommendation

### Branch Strategy
```
main (production)
  ↓
develop (integration)
  ↓
feature/phase-1a-setup
feature/phase-1a-forms
feature/phase-1a-canvas
etc.
```

### Commit Strategy
- Commit after each subtask completion
- Use conventional commits: `feat:`, `fix:`, `docs:`, `style:`, `refactor:`
- Example: `feat: implement WebinarDetailsForm component`

### Deployment Strategy
- Push to `main` triggers auto-deploy on Render
- Test locally before pushing to `main`
- Use PR previews for major changes (optional)

---

## Environment Setup Checklist

### Before Starting Phase 1A
- [ ] Node.js 18+ installed
- [ ] Git installed
- [ ] VS Code (or preferred IDE) installed
- [ ] GitHub account created
- [ ] Render.com account created
- [ ] Supabase account created (for Phase 2)

### Phase 1A Setup
- [ ] Create GitHub repository
- [ ] Clone repository locally
- [ ] Run `npm create vite@latest`
- [ ] Install dependencies
- [ ] Configure Tailwind
- [ ] Set up ESLint/Prettier
- [ ] Make initial commit

### Render.com Setup (After Phase 1A code is ready)
- [ ] Connect GitHub repository
- [ ] Configure build settings
- [ ] Set environment variables
- [ ] Deploy!

---

## Success Criteria Per Phase

### Phase 1A Success
- [ ] App loads without errors
- [ ] Form inputs work
- [ ] Preview updates in real-time
- [ ] Export downloads PNG file
- [ ] Deployed URL is accessible
- [ ] Works on Chrome, Firefox, Safari

### Phase 1B Success
- [ ] All 3 templates render correctly
- [ ] Template switching is instant
- [ ] UI feels polished
- [ ] Animations are smooth
- [ ] Error messages are helpful

### Phase 1C Success
- [ ] Test coverage > 80%
- [ ] All tests passing
- [ ] WCAG 2.1 AA compliant
- [ ] Load time < 2 seconds
- [ ] Export time < 3 seconds

### Phase 2 Success
- [ ] Users can sign up/sign in
- [ ] Banners save to Supabase
- [ ] Library view works
- [ ] Remix functionality works
- [ ] Profile settings work

---

## Next Steps

1. **Review this implementation order**
2. **Set up development environment**
3. **Create GitHub repository**
4. **Start with Task 1.1: Create Vite project**
5. **Follow the day-by-day plan**
6. **Deploy after Phase 1A**
7. **Gather feedback**
8. **Iterate!**

Good luck! 🚀
