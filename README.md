# LoomGraph - Webinar Banner Generator

A fast, form-based webinar banner generator that creates professional LinkedIn-optimized banners (1200x627) in under 60 seconds.

## 🚀 Features

- **Real-time Preview**: See your banner update instantly as you type
- **Simple Form Interface**: No design skills needed - just fill in the details
- **Professional Templates**: Clean, minimalist design optimized for LinkedIn
- **High-Quality Export**: Download PNG at 2x resolution for crisp, professional results
- **Brand Customization**: Choose your accent color to match your brand
- **Timezone Support**: Automatically append timezone indicators for global audiences

## 📋 Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

## 🛠️ Installation

1. Clone the repository:
```bash
git clone https://github.com/YOUR_USERNAME/loomgraph.git
cd loomgraph
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser to `http://localhost:5173`

## 🏗️ Build for Production

```bash
npm run build
```

The production-ready files will be in the `dist/` directory.

## 📦 Tech Stack

- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Styling with custom Bento theme
- **html-to-image** - Canvas export functionality
- **Lucide React** - Icon library

## 🎨 Design System

LoomGraph uses a "Soft Depth" Bento aesthetic:
- Neutral gray backgrounds (#F9FAFB)
- Clean card-based sections
- Subtle shadows and 1px borders
- High-contrast action colors (Electric Blue #3B82F6)

## 📝 Usage

1. **Fill in Webinar Details**
   - Enter your webinar title
   - Add speaker name and title/company
   - Upload a headshot (optional)

2. **Set Date & Time**
   - Choose your webinar date
   - Set the time
   - Toggle timezone display and select your timezone

3. **Customize Branding**
   - Pick an accent color or use presets
   - The color applies to all accent elements

4. **Download**
   - Click "Download Banner"
   - Get a high-quality PNG optimized for LinkedIn

## 🚢 Deployment

### Render.com (Recommended)

1. Push your code to GitHub
2. Create a new Static Site on Render.com
3. Connect your GitHub repository
4. Configure build settings:
   - **Build Command**: `npm run build`
   - **Publish Directory**: `dist`
5. Deploy!

### Other Platforms

LoomGraph can be deployed to any static hosting service:
- Vercel
- Netlify
- GitHub Pages
- AWS S3 + CloudFront

## 🗂️ Project Structure

```
src/
├── components/
│   ├── form/              # Form input components
│   ├── preview/           # Preview and export components
│   ├── templates/         # Banner templates
│   └── FormPanel.tsx      # Form container
├── context/
│   └── BannerContext.tsx  # Global state management
├── types/
│   └── banner.types.ts    # TypeScript interfaces
├── utils/
│   ├── textScaling.ts     # Text measurement utilities
│   ├── colorHelpers.ts    # Color manipulation
│   ├── exportHelpers.ts   # Export and formatting
│   └── validation.ts      # Form validation
└── App.tsx                # Root component
```

## 🧪 Development

### Run Tests
```bash
npm run test
```

### Lint Code
```bash
npm run lint
```

### Type Check
```bash
npm run type-check
```

## 📄 License

MIT License - feel free to use this project for personal or commercial purposes.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 🐛 Known Issues

- None yet! This is Phase 1A MVP.

## 🗺️ Roadmap

### Phase 1B (Coming Soon)
- Additional templates (Bold Founder, Duo)
- Template selector UI
- Enhanced error handling

### Phase 2 (Future)
- User authentication (Supabase)
- Save banners to cloud
- Banner library
- Remix saved banners
- User profiles with brand kits

## 📧 Support

For issues or questions, please open an issue on GitHub.

---

Built with ❤️ for founders who want results, not design tools.
