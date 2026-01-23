# Tech Stack

## Core Technologies
- **React 18** - UI framework with hooks and functional components
- **TypeScript 5.2+** - Strict type safety enabled
- **Vite 5** - Build tool and dev server
- **Tailwind CSS 4** - Utility-first styling with custom Bento theme
- **html-to-image** - Canvas-to-PNG export functionality
- **Lucide React** - Icon library

## Build System
- **Package Manager**: npm
- **Module System**: ESNext with bundler resolution
- **Target**: ES2020
- **JSX**: react-jsx (automatic runtime)

## Common Commands

### Development
```bash
npm run dev          # Start dev server (http://localhost:5173)
npm run build        # Type check + production build
npm run preview      # Preview production build locally
npm run lint         # Run ESLint with TypeScript rules
```

### Type Checking
TypeScript strict mode enabled with:
- `noUnusedLocals`
- `noUnusedParameters`
- `noFallthroughCasesInSwitch`

## Code Quality Tools
- **ESLint** - TypeScript + React Hooks rules
- **Prettier** - Code formatting (config in `.prettierrc`)
- **TypeScript** - Strict type checking

## Key Dependencies
- `react` + `react-dom` - UI framework
- `html-to-image` - Export functionality
- `lucide-react` - Icons

## Dev Dependencies
- `@vitejs/plugin-react` - Vite React plugin
- `@typescript-eslint/*` - TypeScript linting
- `tailwindcss` + `autoprefixer` - Styling
- `eslint-plugin-react-hooks` - React Hooks linting
- `eslint-plugin-react-refresh` - Fast Refresh support

## Environment Variables
Optional `.env.local` file for configuration (see `.env.example`)

## Deployment
Static site deployment to:
- Render.com (recommended)
- Vercel, Netlify, GitHub Pages, AWS S3

Build output: `dist/` directory
