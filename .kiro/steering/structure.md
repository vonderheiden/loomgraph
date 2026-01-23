# Project Structure

## Directory Organization

```
src/
├── components/
│   ├── form/              # Form input components
│   │   ├── ColorPicker.tsx
│   │   ├── DateTimeForm.tsx
│   │   ├── HeadshotUploader.tsx
│   │   └── WebinarDetailsForm.tsx
│   ├── preview/           # Preview and export components
│   │   ├── BannerCanvas.tsx
│   │   ├── ExportButton.tsx
│   │   └── PreviewPanel.tsx
│   ├── templates/         # Banner template components
│   │   └── MinimalistTemplate.tsx
│   └── FormPanel.tsx      # Form container component
├── context/
│   └── BannerContext.tsx  # Global state management (React Context)
├── types/
│   └── banner.types.ts    # TypeScript type definitions
├── utils/
│   ├── colorHelpers.ts    # Color manipulation utilities
│   ├── exportHelpers.ts   # Export and formatting utilities
│   ├── fileValidation.ts  # File upload validation (magic numbers)
│   ├── sanitization.ts    # Input sanitization for security
│   ├── textScaling.ts     # Text measurement and scaling
│   └── validation.ts      # Form validation logic
├── constants/             # (Empty - reserved for future use)
├── hooks/                 # (Empty - reserved for custom hooks)
├── App.tsx                # Root component
├── main.tsx               # Application entry point
└── index.css              # Global styles and Tailwind imports
```

## Architecture Patterns

### State Management
- **React Context API** - Global state via `BannerContext`
- **Custom Hook** - `useBannerState()` for accessing context
- **Immutable Updates** - Spread operator for state changes
- **Callback Optimization** - `useCallback` for stable function references

### Component Structure
- **Functional Components** - All components use hooks
- **TypeScript Interfaces** - Strict typing for props and state
- **Separation of Concerns** - Form, preview, and template components isolated
- **Container/Presentational** - FormPanel and PreviewPanel as containers

### File Naming
- **PascalCase** - Component files (e.g., `FormPanel.tsx`)
- **camelCase** - Utility files (e.g., `textScaling.ts`)
- **kebab-case** - Type files (e.g., `banner.types.ts`)

### Import Conventions
- Relative imports from `src/` root
- Group imports: React → Third-party → Local components → Utils → Types

### Type Definitions
- Centralized in `src/types/banner.types.ts`
- Interface over type for extensibility
- Explicit return types on exported functions

## Key Files

### Entry Points
- `index.html` - HTML template
- `src/main.tsx` - React app mount point
- `src/App.tsx` - Root component with BannerProvider

### Configuration
- `vite.config.ts` - Vite configuration
- `tsconfig.json` - TypeScript compiler options
- `.eslintrc.cjs` - ESLint rules
- `postcss.config.js` - PostCSS/Tailwind config
- `render.yaml` - Render.com deployment config

### State Shape
See `BannerState` interface in `banner.types.ts` for the canonical state structure.

## Styling Approach
- **Tailwind Utility Classes** - Primary styling method
- **Custom Theme** - Bento design system colors
- **Responsive Design** - Mobile-first with `lg:` breakpoints
- **No CSS Modules** - All styles via Tailwind

## Security Files
- `src/utils/sanitization.ts` - Input sanitization
- `src/utils/fileValidation.ts` - File upload security
- `SECURITY.md` - Security policy documentation
