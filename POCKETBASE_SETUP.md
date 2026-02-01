# PocketBase Setup Guide

This guide will help you set up PocketBase for the LoomGraph application.

## Prerequisites

- A running PocketBase instance (self-hosted or cloud)
- Admin access to your PocketBase instance

## Step 1: Import Collections Schema

1. Log in to your PocketBase admin panel (usually at `https://your-instance.com/_/`)
2. Navigate to **Settings** → **Import collections**
3. Upload the `pocketbase-schema.json` file from the project root
4. Click **Import** to create all necessary collections

## Step 2: Configure Environment Variables

Create a `.env.local` file in the project root:

```env
VITE_POCKETBASE_URL=https://your-pocketbase-instance.com
```

Replace `https://your-pocketbase-instance.com` with your actual PocketBase URL.

## Collections Overview

### 1. users (Auth Collection)
- **Type**: Authentication collection
- **Purpose**: Stores user accounts with email/password authentication
- **Fields**:
  - `email` (email, required)
  - `password` (password, hidden)
  - `name` (text, optional) - Display name
  - `verified` (bool) - Email verification status
  - `emailVisibility` (bool) - Whether email is publicly visible

### 2. profiles (Base Collection)
- **Type**: Base collection
- **Purpose**: Stores user profile information and brand settings
- **Fields**:
  - `user` (relation to users, required) - One-to-one relationship
  - `company_name` (text, optional)
  - `brand_color` (text, optional) - Hex color code
  - `logo_url` (text, optional) - URL to company logo
- **Rules**: Users can only access their own profile

### 3. generated_assets (Base Collection)
- **Type**: Base collection
- **Purpose**: Stores generated webinar banners
- **Fields**:
  - `user` (relation to users, required) - Owner of the banner
  - `asset_type` (text, required) - Type of asset (e.g., "webinar_banner")
  - `template_id` (text, required) - Template used for generation
  - `content` (json, required) - Banner metadata and configuration
  - `title_preview` (text, required) - Display title
  - `image` (file, required) - The generated banner image (max 5MB)
- **Rules**: Users can only access their own banners
- **Indexes**: Optimized for querying by user and asset type

## Step 3: Configure OAuth2 (Optional)

To enable Google Sign-In:

1. Go to **Settings** → **Auth providers**
2. Enable **Google** provider
3. Add your Google OAuth2 credentials:
   - Client ID
   - Client Secret
4. Set the redirect URL to: `https://your-pocketbase-instance.com/api/oauth2-redirect`

## Step 4: Test the Connection

Run the application:

```bash
npm run dev
```

Try to:
1. Sign up with a new account
2. Log in with your credentials
3. Generate and save a banner
4. View your saved banners

## Security Notes

- All collections have Row Level Security (RLS) rules
- Users can only access their own data
- File uploads are validated and size-limited
- Passwords are automatically hashed by PocketBase

## Troubleshooting

### Connection Issues
- Verify your `VITE_POCKETBASE_URL` is correct
- Check that your PocketBase instance is running
- Ensure CORS is properly configured in PocketBase

### Authentication Issues
- Check that the users collection was created correctly
- Verify email/password requirements in PocketBase settings
- Check browser console for detailed error messages

### File Upload Issues
- Verify the `image` field in `generated_assets` allows files
- Check file size limits (default: 5MB)
- Ensure proper MIME types are configured

## Migration from Supabase

If you're migrating from Supabase:

1. Export your existing data from Supabase
2. Transform the data to match PocketBase schema
3. Import using PocketBase's import tools or API
4. Update environment variables
5. Test all functionality

## Additional Resources

- [PocketBase Documentation](https://pocketbase.io/docs/)
- [PocketBase JavaScript SDK](https://github.com/pocketbase/js-sdk)
- [PocketBase API Rules](https://pocketbase.io/docs/api-rules-and-filters/)
