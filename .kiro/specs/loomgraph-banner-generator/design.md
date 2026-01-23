# LoomGraph - Design Document

## Architecture Overview

LoomGraph follows a component-based React architecture with real-time state synchronization between form inputs and canvas preview. The application uses a unidirectional data flow pattern where form state drives the canvas rendering engine.

```
┌─────────────────────────────────────────────────────┐
│                   App Container                      │
│  ┌──────────────────┐      ┌───────────────────┐   │
│  │   Form Panel     │ ───> │   Preview Panel   │   │
│  │  (Input State)   │      │  (Canvas Render)  │   │
│  └──────────────────┘      └───────────────────┘   │
│           │                          │              │
│           └──────────┬───────────────┘              │
│                      ▼                               │
│              ┌───────────────┐                      │
│              │  Banner State │                      │
│              │   (Context)   │                      │
│              └───────────────┘                      │
└─────────────────────────────────────────────────────┘
```

## Component Structure

### 1. Core Components

#### `App.tsx`
- Root component managing global layout
- Implements Bento Box layout (two-column grid)
- Provides BannerContext to child components
- Handles responsive breakpoints

#### `BannerContext.tsx`
- Global state management for banner data
- Manages form inputs, template selection, and color customization
- Provides real-time update mechanism
- Type-safe state interface

#### `FormPanel.tsx`
- Left column container for all input controls
- Organizes form sections into cards
- Handles form validation and user feedback
- Implements auto-save behavior

#### `PreviewPanel.tsx`
- Right/center column for live banner preview
- Renders canvas-based banner
- Displays template in real-time
- Handles export functionality

### 2. Form Components

#### `WebinarDetailsForm.tsx`
- Inputs: Title, Speaker Name, Title/Company
- Real-time character count
- Validation feedback
- Smart truncation warnings

#### `DateTimeForm.tsx`
- Date picker component
- Time picker component
- Timezone toggle and selector
- Formatted display preview

#### `HeadshotUploader.tsx`
- Drag-and-drop file upload
- Image preview with circular crop
- File validation (size, format)
- Replace/remove functionality

#### `TemplateSelector.tsx`
- Horizontal thumbnail gallery
- Three template options with previews
- Active state indication
- Hover effects

#### `ColorPicker.tsx`
- Color input with visual picker
- Hex/RGB input support
- Preset color swatches
- Real-time accent color updates

### 3. Canvas Components

#### `BannerCanvas.tsx`
- HTML5 Canvas or html-to-image wrapper
- Renders banner based on current state
- Implements template layouts
- Handles text scaling and positioning

#### `TemplateRenderer.tsx`
- Template-specific rendering logic
- Three template implementations:
  - `MinimalistTemplate`
  - `BoldFounderTemplate`
  - `DuoTemplate`
- Shared rendering utilities

#### `ExportButton.tsx`
- Download trigger
- Canvas-to-image conversion
- File naming logic
- Download progress feedback

## Data Models

### AssetConfig Interface (Source of Truth)
The `assetConfig` object is the single source of truth that maps directly to the `content` JSONB column in Supabase. This design enables easy extension to new asset types (lead magnets, carousels) without database schema changes.

```typescript
interface AssetConfig {
  // Core content that varies by asset type
  title: string;
  speakers: Speaker[];
  schedule: Schedule;
  branding: Branding;
}

interface Speaker {
  name: string;
  role: string;
  headshotUrl: string;
}

interface Schedule {
  date: string; // ISO 8601 format
  time: string; // HH:MM format
  timezone: 'PT' | 'ET' | 'GMT' | 'UTC' | 'CET';
}

interface Branding {
  primaryColor: string; // Hex color
  logoUrl: string;
}
```

### BannerState Interface (UI State)
The UI state extends AssetConfig with additional UI-specific fields that don't need to be persisted.

```typescript
interface BannerState extends AssetConfig {
  // UI-only state
  template: 'minimalist' | 'bold-founder' | 'duo';
  showTimezone: boolean;
  
  // Transient upload state
  uploadingHeadshot: boolean;
  headshotFile: File | null;
}
```

### Supabase Data Models

```typescript
// Maps to 'profiles' table
interface UserProfile {
  id: string; // UUID from auth.users
  company_name: string | null;
  brand_color: string; // Default: '#6366f1'
  logo_url: string | null;
  updated_at: string; // ISO timestamp
}

// Maps to 'generated_assets' table
interface GeneratedAsset {
  id: string; // UUID
  user_id: string; // UUID reference to profiles
  asset_type: 'webinar' | 'lead_magnet' | 'carousel';
  template_id: string; // e.g., 'minimalist', 'bold-founder', 'duo'
  content: AssetConfig; // JSONB - the flexible content blob
  title_preview: string; // Extracted from content.title for search
  image_url: string | null; // URL to generated PNG in Supabase Storage
  created_at: string; // ISO timestamp
}
```

### Template Configuration
```typescript
interface TemplateConfig {
  id: string;
  name: string;
  thumbnail: string;
  layout: LayoutConfig;
  typography: TypographyConfig;
  spacing: SpacingConfig;
}

interface LayoutConfig {
  width: 1200;
  height: 627;
  padding: number;
  sections: SectionLayout[];
}

interface TypographyConfig {
  titleFont: string;
  titleSize: { min: number; max: number; default: number };
  bodyFont: string;
  bodySize: number;
}
```

## Template Designs

### Template 1: "The Minimalist"
- Clean, centered layout
- Large title with ample whitespace
- Circular headshot in top-right
- Thin accent line at bottom
- Minimal text hierarchy

### Template 2: "The Bold Founder"
- Left-aligned content
- Bold, oversized title
- Headshot with accent border
- Strong color blocks
- High contrast design

### Template 3: "The Duo"
- Split layout for two speakers
- Dual headshots (placeholder for second)
- Balanced typography
- Shared accent elements
- Collaborative aesthetic

## Rendering Engine

### Canvas Rendering Strategy
1. **Initialize Canvas**: Set dimensions to 1200x627 @2x (2400x1254)
2. **Draw Background**: Apply template background color/gradient
3. **Draw Accent Elements**: Render colored bars, borders, shapes
4. **Draw Headshot**: Circular clip path, centered positioning
5. **Draw Text Layers**: Title, speaker info, date/time with smart scaling
6. **Export**: Convert canvas to PNG/JPG blob

### Text Scaling Algorithm
```typescript
function calculateFontSize(text: string, maxWidth: number, maxSize: number, minSize: number): number {
  let fontSize = maxSize;
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  
  while (fontSize > minSize) {
    ctx.font = `${fontSize}px Inter`;
    const metrics = ctx.measureText(text);
    
    if (metrics.width <= maxWidth) {
      return fontSize;
    }
    
    fontSize -= 2;
  }
  
  return minSize;
}
```

### Image Processing
- Accept JPG, PNG formats
- Max file size: 5MB
- Auto-crop to 1:1 aspect ratio
- Apply circular mask
- Optimize for canvas rendering

## Styling System

### Tailwind Configuration
```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        'bento-bg': '#F9FAFB',
        'bento-border': '#E5E7EB',
        'bento-card': '#FFFFFF',
        'action-primary': '#3B82F6', // Electric Blue
        'action-secondary': '#8B5CF6', // Deep Purple
      },
      boxShadow: {
        'soft': '0 1px 3px rgba(0, 0, 0, 0.05), 0 1px 2px rgba(0, 0, 0, 0.1)',
        'soft-lg': '0 4px 6px rgba(0, 0, 0, 0.05), 0 2px 4px rgba(0, 0, 0, 0.06)',
      },
      borderRadius: {
        'bento': '12px',
      },
    },
  },
};
```

### Component Styling Patterns
- Cards: `bg-bento-card border border-bento-border rounded-bento shadow-soft`
- Inputs: `border-bento-border focus:border-action-primary focus:ring-2 focus:ring-action-primary/20`
- Buttons: `bg-action-primary hover:bg-action-primary/90 text-white rounded-lg px-4 py-2`

## State Management

### Unified State Architecture
The application uses a single `assetConfig` state object that serves as the source of truth. This object directly maps to the `content` JSONB column in Supabase, enabling seamless persistence and future extensibility.

### Context Provider Pattern
```typescript
export const BannerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [assetConfig, setAssetConfig] = useState<AssetConfig>(initialAssetConfig);
  const [template, setTemplate] = useState<string>('minimalist');
  const [showTimezone, setShowTimezone] = useState<boolean>(true);
  
  const updateAssetConfig = useCallback((updates: Partial<AssetConfig>) => {
    setAssetConfig(prev => ({ ...prev, ...updates }));
  }, []);
  
  const updateSpeaker = useCallback((index: number, updates: Partial<Speaker>) => {
    setAssetConfig(prev => ({
      ...prev,
      speakers: prev.speakers.map((speaker, i) => 
        i === index ? { ...speaker, ...updates } : speaker
      )
    }));
  }, []);
  
  const resetState = useCallback(() => {
    setAssetConfig(initialAssetConfig);
    setTemplate('minimalist');
  }, []);
  
  return (
    <BannerContext.Provider value={{ 
      assetConfig, 
      template,
      showTimezone,
      updateAssetConfig, 
      updateSpeaker,
      setTemplate,
      setShowTimezone,
      resetState 
    }}>
      {children}
    </BannerContext.Provider>
  );
};
```

### Real-time Update Mechanism
- Use `useEffect` hooks to trigger canvas re-render on state changes
- Debounce text input updates (100ms) to prevent excessive renders
- Immediate updates for template/color changes
- Optimistic UI updates for all interactions

### Auto-Save Hook
Implements local storage persistence to prevent data loss on page refresh.

```typescript
function useAutoSave(assetConfig: AssetConfig, delay: number = 1000) {
  const debouncedConfig = useDebounce(assetConfig, delay);
  
  useEffect(() => {
    if (debouncedConfig) {
      localStorage.setItem('loomgraph-draft', JSON.stringify(debouncedConfig));
    }
  }, [debouncedConfig]);
  
  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('loomgraph-draft');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // Restore state logic here
      } catch (e) {
        console.error('Failed to restore draft:', e);
      }
    }
  }, []);
}
```

## Export Functionality

### Export Process
1. User clicks "Download Image" button
2. Capture current canvas state
3. Convert canvas to blob using `toBlob()` or html-to-image
4. Create download link with descriptive filename
5. Trigger browser download
6. Show success feedback

### File Naming Convention
```typescript
function generateFileName(title: string): string {
  const sanitized = title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
  
  const timestamp = new Date().getTime();
  return `loomgraph-${sanitized}-${timestamp}.png`;
}
```

### Export Quality Settings
- Format: PNG (lossless) or JPG (quality: 0.95)
- Resolution: 2400x1254 (@2x for retina)
- Color space: sRGB
- Compression: Optimized for web

## Performance Considerations

### Optimization Strategies
1. **Lazy Loading**: Load template assets on demand
2. **Memoization**: Cache rendered canvas elements
3. **Debouncing**: Throttle text input updates
4. **Image Optimization**: Compress uploaded headshots
5. **Code Splitting**: Separate template renderers

### Performance Targets
- Initial load: < 2 seconds
- Preview update: < 100ms
- Export generation: < 3 seconds
- Memory usage: < 100MB

## Accessibility

### WCAG 2.1 AA Compliance
- Keyboard navigation for all form inputs
- ARIA labels for interactive elements
- Color contrast ratio ≥ 4.5:1 for text
- Focus indicators on all focusable elements
- Screen reader announcements for state changes

### Keyboard Shortcuts
- `Tab`: Navigate between form fields
- `Enter`: Trigger download (when focused on button)
- `Escape`: Close color picker
- `Arrow keys`: Navigate template selector

## Error Handling

### Validation Rules
- Title: 1-100 characters
- Speaker name: 1-50 characters
- Date: Must be future date
- Time: Valid time format
- Headshot: Max 5MB, JPG/PNG only

### Error States
- Inline validation messages
- Red border on invalid inputs
- Disabled export button when invalid
- Toast notifications for system errors

### Fallback Behavior
- Default template if rendering fails
- Placeholder image if headshot fails to load
- Graceful degradation for unsupported browsers

## Testing Strategy

### Unit Tests
- Form validation logic
- Text scaling algorithm
- File upload handling
- State management functions

### Integration Tests
- Form-to-canvas data flow
- Template switching
- Color customization
- Export functionality

### Property-Based Tests
Property-based testing will be used to verify correctness properties across the application.

**Testing Framework**: fast-check (JavaScript/TypeScript property-based testing library)

#### Correctness Properties

**Property 1.1: Form Input Preservation**
- **Validates**: Requirements 1.1, 1.2, 1.3, 1.4, 1.5
- **Property**: For any valid form input, the banner state must preserve the exact input values
- **Test Strategy**: Generate random valid inputs, verify state matches input

**Property 1.2: Real-time Update Consistency**
- **Validates**: Requirements 1.6
- **Property**: Any state change must trigger exactly one canvas re-render within 100ms
- **Test Strategy**: Generate state mutations, measure render timing and count

**Property 2.1: Image Format Handling**
- **Validates**: Requirements 2.1, 2.2, 2.3
- **Property**: For any valid image file (JPG/PNG), the circular crop must maintain aspect ratio
- **Test Strategy**: Generate various image dimensions, verify crop geometry

**Property 3.1: Timezone Formatting**
- **Validates**: Requirements 3.2, 3.3, 3.4
- **Property**: For any time input and timezone selection, the formatted output must be unambiguous
- **Test Strategy**: Generate time/timezone combinations, verify format consistency

**Property 4.1: Template Dimension Invariance**
- **Validates**: Requirements 4.5
- **Property**: All templates must produce exactly 1200x627 output regardless of content
- **Test Strategy**: Generate various content combinations, verify canvas dimensions

**Property 5.1: Color Propagation**
- **Validates**: Requirements 5.2, 5.3
- **Property**: Changing accent color must update all accent elements atomically
- **Test Strategy**: Generate random colors, verify all elements update simultaneously

**Property 6.1: Text Scaling Bounds**
- **Validates**: Requirements 6.1, 6.2, 6.3
- **Property**: Font size must always be within [minSize, maxSize] and text must fit within bounds
- **Test Strategy**: Generate strings of varying lengths, verify font size and text width

**Property 7.1: Export Fidelity**
- **Validates**: Requirements 7.2, 7.3, 7.4
- **Property**: Exported image must exactly match canvas dimensions and quality settings
- **Test Strategy**: Generate exports, verify file metadata and dimensions

### End-to-End Tests
- Complete user workflow
- Cross-browser compatibility
- Export on different devices

## Browser Support

### Target Browsers
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

### Required APIs
- HTML5 Canvas
- File API
- Blob API
- Download attribute support

## Deployment Considerations

### Build Configuration
- Vite or Create React App
- TypeScript strict mode
- Production optimizations enabled
- Source maps for debugging

### Environment Variables
```
VITE_APP_NAME=LoomGraph
VITE_MAX_FILE_SIZE=5242880
VITE_CANVAS_WIDTH=1200
VITE_CANVAS_HEIGHT=627
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

### Supabase Integration Architecture

#### Authentication Flow
1. User creates banner without authentication (guest mode)
2. On "Save to Library" click, check authentication status
3. If not authenticated, show Supabase Auth UI modal
4. Prompt for email (magic link or email/password)
5. After authentication, save asset to database
6. Redirect to user's library/dashboard

#### Storage Configuration
```typescript
// Supabase Storage bucket: 'headshots'
const STORAGE_CONFIG = {
  bucket: 'headshots',
  maxSize: 5 * 1024 * 1024, // 5MB
  allowedTypes: ['image/jpeg', 'image/png'],
  transformations: {
    width: 400,
    height: 400,
    resize: 'cover',
    quality: 85
  }
};
```

#### Headshot Upload Flow
```typescript
async function uploadHeadshot(file: File, userId: string): Promise<string> {
  // 1. Validate file
  if (!STORAGE_CONFIG.allowedTypes.includes(file.type)) {
    throw new Error('Invalid file type');
  }
  
  // 2. Generate unique filename
  const fileExt = file.name.split('.').pop();
  const fileName = `${userId}/${Date.now()}.${fileExt}`;
  
  // 3. Upload to Supabase Storage
  const { data, error } = await supabase.storage
    .from(STORAGE_CONFIG.bucket)
    .upload(fileName, file, {
      cacheControl: '3600',
      upsert: false
    });
  
  if (error) throw error;
  
  // 4. Get public URL with transformations
  const { data: { publicUrl } } = supabase.storage
    .from(STORAGE_CONFIG.bucket)
    .getPublicUrl(fileName, {
      transform: {
        width: STORAGE_CONFIG.transformations.width,
        height: STORAGE_CONFIG.transformations.height,
        resize: STORAGE_CONFIG.transformations.resize,
        quality: STORAGE_CONFIG.transformations.quality
      }
    });
  
  return publicUrl;
}
```

#### Asset Persistence Flow
```typescript
async function saveGeneratedAsset(
  assetConfig: AssetConfig,
  templateId: string,
  imageBlob: Blob,
  userId: string
): Promise<string> {
  // 1. Upload generated image to Storage
  const imagePath = `generated/${userId}/${Date.now()}.png`;
  const { data: imageData, error: imageError } = await supabase.storage
    .from('generated-assets')
    .upload(imagePath, imageBlob);
  
  if (imageError) throw imageError;
  
  // 2. Get public URL
  const { data: { publicUrl } } = supabase.storage
    .from('generated-assets')
    .getPublicUrl(imagePath);
  
  // 3. Save record to database
  const { data, error } = await supabase
    .from('generated_assets')
    .insert({
      user_id: userId,
      asset_type: 'webinar',
      template_id: templateId,
      content: assetConfig, // JSONB column
      title_preview: assetConfig.title,
      image_url: publicUrl
    })
    .select()
    .single();
  
  if (error) throw error;
  
  return data.id;
}
```

#### Remix/Edit Flow
```typescript
async function loadAssetForRemix(assetId: string): Promise<AssetConfig> {
  const { data, error } = await supabase
    .from('generated_assets')
    .select('content, template_id')
    .eq('id', assetId)
    .single();
  
  if (error) throw error;
  
  // Restore the exact state from JSONB
  return data.content as AssetConfig;
}
```

#### Row Level Security (RLS) Policies
Already implemented in database schema:
- Users can only view their own profiles
- Users can only update their own profiles
- Users can only view their own assets
- Users can only insert their own assets

### Supabase Client Setup
```typescript
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
});
```

### Component Integration Points

#### Preview Component as Pure Function
```typescript
interface PreviewProps {
  assetConfig: AssetConfig;
  template: string;
}

export const PreviewPanel: React.FC<PreviewProps> = ({ assetConfig, template }) => {
  // Pure function - no side effects, only renders based on props
  return (
    <div className="preview-container">
      <BannerCanvas config={assetConfig} template={template} />
    </div>
  );
};
```

#### Save to Library Button
```typescript
export const SaveToLibraryButton: React.FC = () => {
  const { assetConfig, template } = useBannerContext();
  const { user } = useAuth();
  const [saving, setSaving] = useState(false);
  
  const handleSave = async () => {
    // Check authentication
    if (!user) {
      // Show Supabase Auth UI
      await showAuthModal();
      return;
    }
    
    setSaving(true);
    try {
      // Generate canvas blob
      const blob = await generateCanvasBlob();
      
      // Save to Supabase
      const assetId = await saveGeneratedAsset(
        assetConfig,
        template,
        blob,
        user.id
      );
      
      // Show success message
      toast.success('Saved to your library!');
      
      // Optional: Navigate to library
      navigate(`/library/${assetId}`);
    } catch (error) {
      toast.error('Failed to save asset');
      console.error(error);
    } finally {
      setSaving(false);
    }
  };
  
  return (
    <button onClick={handleSave} disabled={saving}>
      {saving ? 'Saving...' : 'Save to Library'}
    </button>
  );
};
```

### Scalability Considerations

#### Content JSON as Source of Truth
The `content` JSONB column allows adding new asset types without schema changes:

```typescript
// Future: Lead Magnet asset type
interface LeadMagnetConfig extends AssetConfig {
  checklist: string[];
  ctaText: string;
  ctaUrl: string;
}

// Future: Carousel asset type
interface CarouselConfig extends AssetConfig {
  slides: Array<{
    title: string;
    content: string;
    imageUrl: string;
  }>;
}

// All stored in the same 'content' JSONB column
// Differentiated by 'asset_type' field
```

#### Template Extensibility
New templates can be added without database changes:
- Add new template renderer component
- Register in template factory
- Store template ID in `template_id` field
- All content remains in flexible JSONB structure

## Development Workflow

### Project Structure
```
src/
├── components/
│   ├── form/
│   │   ├── WebinarDetailsForm.tsx
│   │   ├── DateTimeForm.tsx
│   │   ├── HeadshotUploader.tsx
│   │   ├── TemplateSelector.tsx
│   │   └── ColorPicker.tsx
│   ├── preview/
│   │   ├── PreviewPanel.tsx
│   │   ├── BannerCanvas.tsx
│   │   └── ExportButton.tsx
│   ├── templates/
│   │   ├── TemplateRenderer.tsx
│   │   ├── MinimalistTemplate.tsx
│   │   ├── BoldFounderTemplate.tsx
│   │   └── DuoTemplate.tsx
│   ├── auth/
│   │   ├── AuthModal.tsx
│   │   ├── AuthProvider.tsx
│   │   └── ProtectedRoute.tsx
│   ├── library/
│   │   ├── LibraryView.tsx
│   │   ├── AssetCard.tsx
│   │   └── SaveToLibraryButton.tsx
│   ├── FormPanel.tsx
│   └── App.tsx
├── context/
│   └── BannerContext.tsx
├── types/
│   ├── banner.types.ts
│   └── supabase.types.ts
├── utils/
│   ├── textScaling.ts
│   ├── imageProcessing.ts
│   ├── exportCanvas.ts
│   └── validation.ts
├── hooks/
│   ├── useBannerState.ts
│   ├── useCanvasRenderer.ts
│   ├── useAutoSave.ts
│   ├── useAuth.ts
│   └── useSupabase.ts
├── lib/
│   └── supabase.ts
├── constants/
│   └── templates.ts
└── styles/
    └── index.css
```

### Development Commands
```bash
npm run dev          # Start development server
npm run build        # Production build
npm run test         # Run test suite
npm run test:watch   # Watch mode for tests
npm run lint         # ESLint
npm run type-check   # TypeScript validation
```

## Security Considerations

### File Upload Security
- Validate file types on client and server
- Sanitize file names
- Limit file size to 5MB
- Scan for malicious content (future)

### XSS Prevention
- Sanitize all user inputs
- Use React's built-in XSS protection
- Avoid dangerouslySetInnerHTML
- Content Security Policy headers

### Data Privacy
- No user data stored in MVP
- No analytics tracking
- No third-party scripts
- Local-only processing

## Monitoring & Analytics (Future)

### Metrics to Track
- Time to first banner generation
- Export success rate
- Template popularity
- Average session duration
- Error rates by type

### Performance Monitoring
- Canvas render time
- Export generation time
- Page load metrics
- Memory usage patterns
