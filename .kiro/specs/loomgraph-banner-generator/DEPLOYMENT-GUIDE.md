# Deployment Guide - Render.com

## Current Status
✅ **Phase 1A-Original MVP is ready for deployment**

This is a working single-speaker webinar banner generator with:
- Single speaker form (name, title, company, headshot)
- Webinar details (title, date/time)
- Color customization
- Minimalist template
- PNG export at 2x resolution
- Enterprise-grade security (CSP, file validation, input sanitization)

## Deployment Steps

### 1. Create Render.com Account
- Go to https://render.com
- Sign up or log in with your GitHub account

### 2. Create New Static Site
1. Click "New +" button in dashboard
2. Select "Static Site"
3. Connect your GitHub repository: `vonderheiden/loomgraph`
4. Authorize Render to access the repository

### 3. Configure Build Settings
```
Name: loomgraph
Branch: main
Build Command: npm run build
Publish Directory: dist
```

### 4. Environment Variables (Optional for Phase 1A)
Phase 1A doesn't require environment variables yet. These will be needed in Phase 1B when we add Supabase:
- `VITE_SUPABASE_URL` (not needed yet)
- `VITE_SUPABASE_ANON_KEY` (not needed yet)

### 5. Advanced Settings
Render automatically applies the security headers from `render.yaml`:
- Content-Security-Policy
- X-Frame-Options
- X-Content-Type-Options
- Referrer-Policy
- Permissions-Policy

### 6. Deploy
1. Click "Create Static Site"
2. Render will automatically:
   - Clone your repository
   - Run `npm install`
   - Run `npm run build`
   - Deploy the `dist` folder
3. Wait 2-3 minutes for first deployment

### 7. Access Your Site
- Render will provide a URL like: `https://loomgraph.onrender.com`
- You can add a custom domain later in Settings

## Auto-Deploy
✅ Auto-deploy is enabled by default. Every push to `main` branch will trigger a new deployment.

## Monitoring
- View build logs in Render dashboard
- Check deployment status
- Monitor site performance

## Testing After Deployment
1. Open the deployed URL
2. Fill in webinar details
3. Upload a headshot image
4. Customize colors
5. Click "Export as PNG"
6. Verify the downloaded banner looks correct

## Troubleshooting

### Build Fails
- Check build logs in Render dashboard
- Verify `package.json` scripts are correct
- Ensure all dependencies are in `package.json` (not just `devDependencies`)

### Site Loads But Looks Broken
- Check browser console for errors
- Verify Tailwind CSS is building correctly
- Check that `dist/` folder contains `index.html` and `assets/`

### Images Not Loading
- Verify file validation is working
- Check browser console for CSP violations
- Test with different image formats (PNG, JPG)

## Next Steps After Deployment
1. **Test the live site** - Verify all features work in production
2. **Gather feedback** - Share with stakeholders
3. **Monitor usage** - Check Render analytics
4. **Plan Phase 1B** - Multi-speaker support and enhanced templates

## Phase 1B Preview
After deployment and feedback, we'll implement:
- Dynamic speaker count selector (1, 2, or 3 speakers)
- Company logo uploads for each speaker
- Template auto-switching based on speaker count
- Professional, Duo, and Panel templates matching design reference
- Enhanced visual design (bold colors, geometric accents)

---

**Estimated Deployment Time**: 5-10 minutes
**Current Version**: Phase 1A-Original (Single Speaker MVP)
**Next Version**: Phase 1B (Multi-Speaker Enhancement)
