# Supabase to PocketBase Migration Summary

## Overview

Successfully migrated LoomGraph from Supabase to PocketBase backend.

## Changes Made

### 1. Dependencies
- **Removed**: `@supabase/supabase-js` (v2.93.3)
- **Added**: `pocketbase` (v0.21.5)

### 2. New Files Created

#### `src/lib/pocketbase.ts`
- PocketBase client initialization
- Type definitions for User, Profile, and GeneratedAsset collections
- Configured with environment variable support

#### `pocketbase-schema.json`
- Complete database schema for import into PocketBase
- Includes 3 collections: users, profiles, generated_assets
- Configured with proper API rules and indexes

#### `POCKETBASE_SETUP.md`
- Comprehensive setup guide
- Step-by-step instructions for schema import
- OAuth2 configuration guide
- Troubleshooting section

#### `MIGRATION_SUMMARY.md`
- This file - documents all changes

### 3. Modified Files

#### `src/context/AuthContext.tsx`
- Replaced Supabase auth with PocketBase auth
- Updated signup flow to use PocketBase user creation
- Updated login to use `authWithPassword`
- Updated OAuth2 flow for Google Sign-In
- Updated session management with PocketBase authStore
- Fixed TypeScript type casting for PocketBase RecordModel

#### `src/services/bannerStorage.ts`
- Replaced Supabase storage with PocketBase file uploads
- Updated `saveBanner` to use FormData for file uploads
- Updated `getUserBanners` to use PocketBase filtering
- Updated `deleteBanner` to use PocketBase delete (auto-removes files)
- Added `getBannerImageUrl` helper function
- Changed field names: `user_id` → `user`, `image_url` → `image`, `created_at` → `created`

#### `src/components/auth/UserMenu.tsx`
- Updated user metadata access: `user.user_metadata?.name` → `user.name`
- Compatible with PocketBase User type

#### `package.json`
- Removed `@supabase/supabase-js` dependency
- Added `pocketbase` dependency

#### `.env.example`
- Removed Supabase configuration variables
- Added `VITE_POCKETBASE_URL` configuration
- Removed `VITE_ENABLE_SUPABASE` feature flag

#### `.kiro/steering/tech.md`
- Updated tech stack documentation
- Added PocketBase to core technologies
- Added PocketBase to key dependencies

### 4. Deleted Files

#### `src/lib/supabase.ts`
- Removed old Supabase client configuration

## Database Schema Comparison

### Supabase → PocketBase Mapping

| Supabase | PocketBase | Notes |
|----------|------------|-------|
| `auth.users` | `users` (auth collection) | Built-in auth with email/password |
| `public.profiles` | `profiles` (base collection) | User profile data |
| `public.generated_assets` | `generated_assets` (base collection) | Banner storage |
| Storage bucket | File field | Files stored directly in records |

### Field Name Changes

| Old (Supabase) | New (PocketBase) | Collection |
|----------------|------------------|------------|
| `user_id` | `user` | generated_assets |
| `image_url` | `image` | generated_assets |
| `created_at` | `created` | All collections |
| `updated_at` | `updated` | All collections |

## API Changes

### Authentication

**Before (Supabase):**
```typescript
const { data, error } = await supabase.auth.signUp({ email, password });
const { data, error } = await supabase.auth.signInWithPassword({ email, password });
await supabase.auth.signOut();
```

**After (PocketBase):**
```typescript
await pb.collection('users').create({ email, password, passwordConfirm: password });
await pb.collection('users').authWithPassword(email, password);
pb.authStore.clear();
```

### Data Operations

**Before (Supabase):**
```typescript
const { data, error } = await supabase.from('generated_assets').select('*');
const { data, error } = await supabase.from('generated_assets').insert({ ... });
```

**After (PocketBase):**
```typescript
const records = await pb.collection('generated_assets').getFullList();
const record = await pb.collection('generated_assets').create({ ... });
```

### File Storage

**Before (Supabase):**
```typescript
await supabase.storage.from('bucket').upload(path, file);
const { data } = supabase.storage.from('bucket').getPublicUrl(path);
```

**After (PocketBase):**
```typescript
const formData = new FormData();
formData.append('image', file);
const record = await pb.collection('generated_assets').create(formData);
const url = pb.files.getUrl(record, record.image);
```

## Benefits of PocketBase

1. **Simpler Setup**: Single binary, no separate storage service
2. **File Management**: Files stored directly with records
3. **Type Safety**: Better TypeScript integration
4. **Self-Hosted**: Full control over data and infrastructure
5. **Real-time**: Built-in real-time subscriptions (not yet used)
6. **Admin UI**: Built-in admin dashboard for data management

## Testing Checklist

- [x] Build passes without errors
- [x] Lint passes without warnings
- [x] TypeScript diagnostics clean
- [ ] Manual testing required:
  - [ ] User signup
  - [ ] User login
  - [ ] Google OAuth (if configured)
  - [ ] Banner generation
  - [ ] Banner saving
  - [ ] Banner retrieval
  - [ ] Banner deletion
  - [ ] User logout

## Next Steps

1. Import `pocketbase-schema.json` into your PocketBase instance
2. Configure `VITE_POCKETBASE_URL` in `.env.local`
3. Test all authentication flows
4. Test banner generation and storage
5. Configure OAuth2 providers if needed
6. Deploy updated application

## Rollback Plan

If issues arise:
1. Restore `@supabase/supabase-js` dependency
2. Restore `src/lib/supabase.ts`
3. Revert changes to AuthContext and bannerStorage
4. Run `npm install` to restore Supabase

## Notes

- PocketBase requires authentication before most operations
- File uploads use FormData instead of separate storage API
- Session management is handled by PocketBase authStore
- All API rules enforce user ownership of data
