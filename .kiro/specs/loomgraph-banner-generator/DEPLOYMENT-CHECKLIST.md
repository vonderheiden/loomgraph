# Deployment Checklist - Render.com

## ✅ Pre-Deployment Status
- ✅ Code is production-ready
- ✅ Security hardened (CSP, headers, validation)
- ✅ Build tested locally
- ✅ All files committed to GitHub
- ✅ Repository: `vonderheiden/loomgraph`

---

## 🚀 Deployment Steps (5-10 minutes)

### Step 1: Access Render.com
- [ ] Go to https://render.com
- [ ] Log in with your GitHub account

### Step 2: Create New Static Site
- [ ] Click "New +" button in dashboard
- [ ] Select "Static Site"
- [ ] Connect repository: `vonderheiden/loomgraph`
- [ ] Authorize Render if prompted

### Step 3: Configure Build Settings
```
Name: loomgraph
Branch: main
Build Command: npm run build
Publish Directory: dist
```

- [ ] Enter name: `loomgraph`
- [ ] Select branch: `main`
- [ ] Build command: `npm run build`
- [ ] Publish directory: `dist`

### Step 4: Advanced Settings (Optional)
Render will automatically use `render.yaml` for security headers.
No manual configuration needed.

- [ ] Verify auto-deploy is enabled (default)

### Step 5: Deploy
- [ ] Click "Create Static Site"
- [ ] Wait 2-3 minutes for build
- [ ] Monitor build logs for any errors

### Step 6: Verify Deployment
- [ ] Open the provided URL (e.g., `https://loomgraph.onrender.com`)
- [ ] Test the application:
  - [ ] Fill in webinar title
  - [ ] Enter speaker name, title, company
  - [ ] Upload a headshot image
  - [ ] Select date and time
  - [ ] Change accent color
  - [ ] Click "Export as PNG"
  - [ ] Verify downloaded banner looks correct

---

## 🧪 Post-Deployment Testing

### Functional Tests
- [ ] Form inputs work correctly
- [ ] Image upload accepts PNG/JPG
- [ ] Image upload rejects invalid files
- [ ] Color picker updates preview
- [ ] Date/time picker works
- [ ] Preview updates in real-time
- [ ] Export button downloads PNG
- [ ] Downloaded banner has correct content
- [ ] Downloaded banner is 2400x1260px (2x resolution)

### Security Tests
- [ ] Open browser DevTools → Console
- [ ] Verify no CSP violations
- [ ] Check Network tab → Response Headers:
  - [ ] `Content-Security-Policy` present
  - [ ] `X-Frame-Options: DENY` present
  - [ ] `X-Content-Type-Options: nosniff` present
  - [ ] `Referrer-Policy: strict-origin-when-cross-origin` present

### Performance Tests
- [ ] Page loads in < 3 seconds
- [ ] Preview updates smoothly
- [ ] Export completes in < 2 seconds
- [ ] No console errors

---

## 📊 Success Criteria

### Must Have (Critical)
- ✅ Site is accessible at public URL
- ✅ All form inputs work
- ✅ Image upload works
- ✅ Export generates valid PNG
- ✅ No critical errors in console
- ✅ Security headers present

### Should Have (Important)
- ✅ Preview updates in real-time
- ✅ UI looks polished (Bento design)
- ✅ Colors match theme
- ✅ Responsive on desktop
- ✅ Fast load times

### Nice to Have (Optional)
- ⚪ Custom domain configured
- ⚪ Analytics integrated
- ⚪ Error monitoring setup

---

## 🐛 Troubleshooting

### Build Fails
**Symptom**: Render shows "Build failed" error

**Solutions**:
1. Check build logs for specific error
2. Verify `package.json` has all dependencies
3. Test build locally: `npm run build`
4. Check Node version compatibility

### Site Loads But Looks Broken
**Symptom**: Plain HTML, no styling

**Solutions**:
1. Check browser console for errors
2. Verify Tailwind CSS built correctly
3. Check `dist/assets/` contains CSS files
4. Clear browser cache and reload

### Images Won't Upload
**Symptom**: File upload fails or shows error

**Solutions**:
1. Check file size (< 5MB)
2. Verify file type (PNG or JPG only)
3. Check browser console for CSP errors
4. Test with different image

### Export Doesn't Work
**Symptom**: Export button does nothing

**Solutions**:
1. Check browser console for errors
2. Verify html-to-image library loaded
3. Test in different browser
4. Check if preview is rendering

---

## 📝 Post-Deployment Actions

### Immediate (Today)
- [ ] Share URL with test users
- [ ] Create test banners
- [ ] Document any issues
- [ ] Monitor Render dashboard

### Short-term (This Week)
- [ ] Gather user feedback
- [ ] Track feature requests
- [ ] Monitor error logs
- [ ] Plan Phase 1B enhancements

### Medium-term (Next Week)
- [ ] Implement Phase 1B (multi-speaker)
- [ ] Add requested features
- [ ] Fix any reported bugs
- [ ] Deploy updated version

---

## 🎯 Next Steps After Deployment

### Phase 1B: Multi-Speaker Enhancement (8-10 hours)
**Features to Add**:
1. Speaker count dropdown (1, 2, or 3)
2. Dynamic form sections per speaker
3. Company logo upload per speaker
4. Three templates (Professional, Duo, Panel)
5. Template auto-switching based on count
6. Enhanced styling matching design reference

**Timeline**: 1-2 weeks
**Deployment**: Automatic via GitHub push

---

## 📞 Support Resources

### Render.com Documentation
- Static Sites: https://render.com/docs/static-sites
- Build Configuration: https://render.com/docs/configure-build
- Custom Domains: https://render.com/docs/custom-domains

### Project Documentation
- README: `README.md`
- Security: `SECURITY.md`
- Deployment Guide: `DEPLOYMENT-GUIDE.md`
- Architecture: `.kiro/specs/loomgraph-banner-generator/`

---

## ✅ Deployment Complete!

Once all checklist items are complete:
- [ ] Mark deployment as successful
- [ ] Share URL with stakeholders
- [ ] Begin gathering feedback
- [ ] Plan Phase 1B implementation

**Deployed URL**: ___________________ (fill in after deployment)
**Deployment Date**: ___________________ (fill in after deployment)
**Version**: Phase 1A-Original (Single Speaker MVP)

---

**Created**: January 22, 2026  
**Status**: Ready for deployment  
**Next**: Follow checklist to deploy to Render.com
