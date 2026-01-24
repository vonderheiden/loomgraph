---
inclusion: always
---

# Testing Checklist

Before pushing any code to GitHub, always complete this checklist:

## Build & Compile Checks
- [ ] Run `npm run build` - must pass without errors
- [ ] Run `npm run lint` - must pass without warnings
- [ ] Check TypeScript diagnostics with getDiagnostics tool

## Feature-Specific Testing

### For Export/Download Features
- [ ] Test the actual download functionality in the browser
- [ ] Verify the downloaded file matches the preview
- [ ] Check file dimensions (should be 1200x627px for banners)
- [ ] Verify text is readable and fonts render correctly
- [ ] Test with different browsers if possible

### For UI Components
- [ ] Test responsive behavior (mobile, tablet, desktop)
- [ ] Verify all interactive elements work (buttons, forms, navigation)
- [ ] Check accessibility (keyboard navigation, ARIA labels)
- [ ] Test with real data, not just placeholder content

### For Form Components
- [ ] Test validation rules
- [ ] Test error states
- [ ] Verify data persistence
- [ ] Test edge cases (empty inputs, max length, special characters)

## Integration Testing
- [ ] Test the complete user flow end-to-end
- [ ] Verify state management works correctly
- [ ] Check for console errors or warnings
- [ ] Test with realistic user scenarios

## Before Git Push
- [ ] Review all changed files
- [ ] Ensure commit message is descriptive
- [ ] Verify no sensitive data or debug code is included
- [ ] Check that all new dependencies are necessary

## Critical Features Requiring Manual Testing
- Image export/download functionality
- File uploads (headshots, logos)
- Form submissions
- Navigation and routing
- Real-time preview updates
